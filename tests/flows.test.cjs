const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const core = require('../src/core.js');
const { QUIZ_SAMPLES, QUIZ_IMAGES } = require('../src/samples.js');

function runtime() {
    const context = vm.createContext({ QuizCore: core, QUIZ_SAMPLES, QUIZ_IMAGES, structuredClone, setTimeout, clearTimeout, crypto: require('node:crypto').webcrypto });
    vm.runInContext(fs.readFileSync(require.resolve('../src/script.js'), 'utf8'), context);
    return context;
}
const field = value => ({ value });
const form = values => ({ querySelector: selector => field(values[selector]), classList: { contains: name => name === 'resposta-correta' } });

test('creator builds independent answer, question and level objects', () => {
    const app = runtime();
    const a = app.montarNovaResposta(form({ '.texto-resposta': 'A', '.url-resposta': 'img/pixabay/panda.jpg' }));
    const b = app.montarNovaResposta(form({ '.texto-resposta': 'B', '.url-resposta': 'img/pixabay/river.jpg' }));
    assert.equal(a.text, 'A'); assert.notEqual(a, b);
    const q1 = app.montarNovaPergunta('First', '#ffffff', [a]);
    const q2 = app.montarNovaPergunta('Second', '#000000', [b]);
    assert.equal(q1.title, 'First'); assert.notEqual(q1, q2);
    const levelForm = percent => form({ '.titulo-nivel': 'A long level title', '.url-nivel': 'img/pixabay/panda.jpg', '.descricao-nivel': 'A sufficiently long description of the level.', '.percentual-nivel': percent });
    const l1 = app.montarNovoNivel(levelForm('0'));
    const l2 = app.montarNovoNivel(levelForm('60'));
    assert.equal(l1.minValue, 0); assert.equal(l2.minValue, 60); assert.notEqual(l1, l2);
});

test('validates each level rather than always reading the first one', () => {
    const app = runtime();
    app.mostrarErro = () => false;
    const valid = { '.titulo-nivel': 'A long level title', '.url-nivel': 'img/pixabay/panda.jpg', '.descricao-nivel': 'A sufficiently long description of the level.', '.percentual-nivel': '0' };
    assert.equal(app.validarDadosNivel(form(valid)), true);
    for (const invalid of [{ '.percentual-nivel': '' }, { '.percentual-nivel': '2.5' }, { '.titulo-nivel': 'short' }, { '.url-nivel': 'example.com' }]) {
        assert.equal(app.validarDadosNivel(form({ ...valid, ...invalid })), false);
    }
});

test('cannot skip collapsed questions and invalid submission preserves entered fields', () => {
    const app = runtime();
    app.mostrarErro = () => false;
    app.document = { querySelector: () => ({ querySelectorAll: () => [] }) };
    vm.runInContext('qtdadePerguntas = 3', app);
    let advanced = false;
    app.chamarTelaCriarNiveis = () => { advanced = true; };
    app.validarTodasPerguntas();
    assert.equal(advanced, false);
    const inputs = { '.titulo-quizz': field('A valid quiz title here'), '.url-quizz': field('example.com/image.jpg'), '.numero-perguntas': field('3'), '.quantidade-niveis': field('2') };
    app.document = { querySelector: () => ({ querySelector: selector => inputs[selector] }) };
    app.validarDadosBasicos();
    assert.equal(inputs['.titulo-quizz'].value, 'A valid quiz title here');
    assert.equal(inputs['.url-quizz'].value, 'example.com/image.jpg');
});

test('repeated answer activation scores a question only once', () => {
    const app = runtime();
    app.document = { querySelectorAll: () => [], querySelector: () => ({ textContent: '' }) };
    app.setTimeout = () => 1;
    vm.runInContext('quizzescolhido = structuredClone(QUIZ_SAMPLES[0])', app);
    app.quizzSelecionado(0, 0);
    app.quizzSelecionado(0, 0);
    assert.equal(vm.runInContext('acertos', app), 1);
    assert.equal(vm.runInContext('questoesrespondidas', app), 1);
});

test('save failure does not show success or discard the form', () => {
    const app = runtime();
    app.document = { querySelector: () => ({}) };
    app.guardaMeusQuizzesLocalmente = () => { throw new Error('Quota'); };
    let message = '';
    app.mostrarErro = (_, value) => { message = value; };
    app.chamarTelaSucessoCriacaoQuizz = () => assert.fail('Must not show success');
    app.sendQuizz(QUIZ_SAMPLES[0]);
    assert.match(message, /campos foram preservados/);
    assert.equal(vm.runInContext('envioEmAndamento', app), false);
});

test('API HTTP failures and invalid JSON reject cleanly', async () => {
    const app = runtime();
    app.AbortController = AbortController;
    app.fetch = async () => ({ ok: false, status: 503 });
    await assert.rejects(app.apiRequest('https://example.com'), /503/);
    app.fetch = async () => ({ ok: true, json: async () => { throw new SyntaxError('Invalid JSON'); } });
    await assert.rejects(app.apiRequest('https://example.com'), /Invalid JSON/);
});
