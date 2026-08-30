const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../src/core.js');
const { QUIZ_SAMPLES } = require('../src/samples.js');

function storage(entries = {}) {
    const map = new Map(Object.entries(entries));
    return { get length() { return map.size; }, key: index => [...map.keys()][index],
        getItem: key => map.get(key) ?? null, setItem: (key, value) => map.set(key, value) };
}

test('score chooses highest eligible minimum regardless of level order', () => {
    const levels = [{ minValue: 100 }, { minValue: 0 }, { minValue: 60 }];
    for (const [correct, expected, minimum] of [[0, 0, 0], [1, 33, 0], [2, 67, 60], [3, 100, 100]]) {
        const result = core.scoreQuiz(correct, 3, levels);
        assert.equal(result.percentage, expected);
        assert.equal(result.level.minValue, minimum);
    }
    assert.equal(core.scoreQuiz(1, 2, [{ minValue: 0 }]).percentage, 50);
});

test('image URLs reject relative hosts, credentials, mixed content and script URLs', () => {
    for (const value of ['example.com/a.jpg', '//example.com/a.jpg', 'http://example.com/a.jpg', 'javascript:alert(1)', 'data:image/svg+xml,x', 'https://user:secret@example.com/a.jpg', '']) {
        assert.equal(core.validImageURL(value), false, value);
    }
    assert.equal(core.validImageURL('https://example.com/a.jpg?width=800'), true);
    assert.equal(core.validImageURL('img/pixabay/panda.jpg'), true);
    assert.equal(core.safeImage('broken'), core.FALLBACK_IMAGE);
});

test('counts and percentages require bounded integers and reject empty values', () => {
    for (const value of ['', ' ', '3.5', 'no', NaN, Infinity, 31]) assert.equal(core.integerInRange(value, 3, 30), false);
    assert.equal(core.integerInRange('3', 3, 30), true);
    assert.equal(core.integerInRange('0', 0, 100), true);
});

test('shuffle is nonmutating and preserves all answer objects', () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = core.shuffle(input, () => 0);
    assert.deepEqual(input.map(item => item.id), [1, 2, 3]);
    assert.deepEqual(result.map(item => item.id), [2, 3, 1]);
});

test('all editorial quizzes are playable and normalizing never mutates them', () => {
    for (const quiz of QUIZ_SAMPLES) {
        const normalized = core.normalizeQuiz(quiz);
        assert.ok(normalized);
        normalized.questions[0].answers[0].text = 'changed';
        assert.notEqual(quiz.questions[0].answers[0].text, 'changed');
    }
});

test('malformed API quizzes are excluded while image failures get a fallback', () => {
    const quiz = structuredClone(QUIZ_SAMPLES[0]);
    quiz.image = 'javascript:alert(1)';
    quiz.questions[0].color = 'red; background:url(evil)';
    assert.equal(core.normalizeQuiz(quiz).image, core.FALLBACK_IMAGE);
    assert.equal(core.normalizeQuiz(quiz).questions[0].color, '#434ca0');
    quiz.questions[0].answers[0].isCorrectAnswer = false;
    assert.equal(core.normalizeQuiz(quiz), null);
    assert.equal(core.normalizeQuiz({ title: 'empty', questions: [], levels: [] }), null);
});

test('storage ignores unrelated data, recovers valid legacy entries and deduplicates', () => {
    const quiz = { ...QUIZ_SAMPLES[0], id: '12' };
    const local = storage({ theme: 'dark', 12: JSON.stringify(quiz), 13: '{broken', [core.STORAGE_KEY]: JSON.stringify([quiz]) });
    const result = core.readStoredQuizzes(local);
    assert.equal(result.quizzes.length, 1);
    assert.ok(result.warning);
    core.saveStoredQuiz(local, { ...quiz, title: 'Updated title', token: 'do-not-save' });
    assert.equal(local.getItem('theme'), 'dark');
    assert.equal(local.getItem('13'), '{broken');
    assert.equal(core.readStoredQuizzes(local).quizzes[0].title, 'Updated title');
    assert.equal(local.getItem(core.STORAGE_KEY).includes('do-not-save'), false);
});

test('storage quota failure is not reported as successful save', () => {
    const local = storage();
    local.setItem = () => { throw new Error('Quota exceeded'); };
    assert.throws(() => core.saveStoredQuiz(local, QUIZ_SAMPLES[0]), /Quota/);
});

test('HTML escaping keeps untrusted quiz titles as text', () => {
    assert.equal(core.escapeHTML('<img src=x onerror="bad()">'), '&lt;img src=x onerror=&quot;bad()&quot;&gt;');
});
