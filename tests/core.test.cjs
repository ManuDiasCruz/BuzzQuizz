const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const core = require('../src/core.js');
const { BUILTIN_QUIZZES, IMAGE_LIBRARY } = require('../src/collection.js');
const quiz = () => structuredClone(BUILTIN_QUIZZES[0]);

test('all curated quizzes meet creator rules and reference real local assets', () => {
    for (const q of BUILTIN_QUIZZES) {
        assert.ok(core.playable(q));
        assert.equal(core.basicError(q, q.questions.length, q.levels.length), '');
        for (const item of q.questions) assert.equal(core.questionError(item), '');
        for (const item of q.levels) assert.equal(core.levelError(item), '');
        assert.equal(core.levelsError(q.levels), '');
    }
    for (const image of IMAGE_LIBRARY) assert.ok(fs.existsSync(path.resolve(__dirname, '..', image.path)));
});
test('score is based only on correct answers, including zero', () => {
    const q = quiz();
    assert.equal(core.result(q, 0).percentage, 0);
    assert.equal(core.result(q, 1).percentage, 33);
    assert.equal(core.result(q, 2).percentage, 67);
    assert.equal(core.result(q, 3).percentage, 100);
});
test('highest eligible level wins even with unsorted or string thresholds', () => {
    const q = quiz(); q.levels.reverse(); q.levels[0].minValue = '100';
    assert.equal(core.result(q, 3).level.minValue, '100');
    assert.equal(core.result(q, 2).level.minValue, 60);
    assert.equal(core.result(q, 0).level.minValue, 0);
});
test('zero-only legacy thresholds never produce NaN', () => {
    const q = quiz(); q.levels = [q.levels[0]];
    assert.equal(core.result(q, 3).percentage, 100);
});
test('shuffle preserves input arrays and answer identity values', () => {
    const answers = quiz().questions[0].answers;
    const snapshot = structuredClone(answers);
    const shuffled = core.shuffle(answers, () => 0);
    assert.deepEqual(answers, snapshot);
    assert.notEqual(shuffled, answers);
    assert.notEqual(shuffled[0], answers[1]);
    assert.deepEqual(shuffled, [...snapshot].reverse());
});
test('image URLs exclude executable, insecure, credential-bearing and relative arbitrary URLs', () => {
    for (const bad of ['', 'example.com/x.jpg', 'http://example.com/x.jpg', 'javascript:alert(1)', 'data:image/svg+xml,x', 'https://user:secret@example.com/x.jpg', '../private.png', 'img/collection/missing.webp']) assert.equal(core.imageURL(bad), false, bad);
    assert.equal(core.imageURL('https://example.com/photo.jpg?size=800'), true);
    assert.equal(core.imageURL('img/collection/panda.webp'), true);
});
test('basic validation rejects whitespace titles, oversized titles, blank and fractional counts', () => {
    const q = quiz();
    for (const title of [' '.repeat(30), 'short', 'x'.repeat(66)]) assert.ok(core.basicError({ ...q, title }, 3, 2));
    for (const count of ['', NaN, '3.5', 0, -1, 21, Infinity]) assert.ok(core.basicError(q, count, 2));
    for (const count of ['', '2.2', 1, 11]) assert.ok(core.basicError(q, 3, count));
});
test('optional answers must have paired text and image, not just matching counts', () => {
    const q = quiz().questions[0];
    q.answers.push({ text: 'Only text', image: '', isCorrectAnswer: false }, { text: '', image: 'https://example.com/a.jpg', isCorrectAnswer: false });
    assert.ok(core.questionError(q));
});
test('duplicate answers and multiple correct answers are invalid', () => {
    const q = quiz().questions[0];
    q.answers[1].text = q.answers[0].text.toUpperCase(); assert.ok(core.questionError(q));
    q.answers[1].text = 'Another answer'; q.answers[1].isCorrectAnswer = true; assert.ok(core.questionError(q));
});
test('level validation checks each level, including blank percentages', () => {
    for (const minValue of ['', ' ', -1, 101, '2.5', NaN]) assert.ok(core.levelError({ ...quiz().levels[0], minValue }));
    const levels = quiz().levels; levels[1].title = 'bad';
    assert.equal(core.levelError(levels[0]), ''); assert.ok(core.levelError(levels[1]));
});
test('levels require explicit zero and unique thresholds', () => {
    assert.ok(core.levelsError([{ minValue: '' }, { minValue: 60 }]));
    assert.ok(core.levelsError([{ minValue: 0 }, { minValue: '0' }]));
    assert.equal(core.levelsError([{ minValue: '0' }, { minValue: 60 }]), '');
});
test('malformed remote quizzes are rejected before play', () => {
    for (const invalid of [null, {}, { ...quiz(), questions: [] }, { ...quiz(), levels: [] }]) assert.equal(core.playable(invalid), false);
    const q = quiz(); q.questions[0].answers[0].isCorrectAnswer = 'true'; assert.equal(core.playable(q), false);
    q.questions[0].answers[0].isCorrectAnswer = false; assert.equal(core.playable(q), false);
});
function storage(data) { return { length: Object.keys(data).length, key: i => Object.keys(data)[i], getItem: key => data[key] ?? null }; }
test('saved quizzes ignore unrelated storage, corrupt numeric entries and duplicate IDs', () => {
    const q = { ...quiz(), id: 5 };
    const store = storage({ theme: 'dark', 7: '{broken', 8: JSON.stringify({ token: 'not-a-quiz' }), 5: JSON.stringify(q), 'buzzquizz:been:v2': JSON.stringify([q]) });
    assert.deepEqual(core.readSaved(store), [q]);
    assert.equal(core.readSaved(store).length, 1); // Reload is idempotent.
});
test('blocked storage does not crash startup', () => {
    assert.deepEqual(core.readSaved({ getItem() { throw new Error('denied'); } }), []);
});
test('creation factories produce independent objects (original shared-reference regression)', () => {
    // Evaluate real handlers without running startup or replacing browser behavior.
    const source = fs.readFileSync(path.join(__dirname, '../src/script.js'), 'utf8').split('\ngetAllQuizzesLocais();')[0];
    const context = vm.createContext({ document: {}, QuizCore: core }); vm.runInContext(source, context);
    const first = context.montarNovaPergunta('First question title', '#000000', [{ text: 'First' }]);
    const second = context.montarNovaPergunta('Second question title', '#ffffff', [{ text: 'Second' }]);
    assert.notEqual(first, second); assert.equal(first.title, 'First question title'); assert.equal(first.answers[0].text, 'First');
    const answerNode = (text, correct) => ({ querySelector: selector => ({ value: selector.includes('texto') ? text : 'https://example.com/image.jpg' }), classList: { contains: () => correct } });
    const a = context.montarNovaResposta(answerNode('Correct', true)); const b = context.montarNovaResposta(answerNode('Wrong', false));
    assert.notEqual(a, b); assert.equal(a.isCorrectAnswer, true); assert.equal(b.isCorrectAnswer, false);
});
