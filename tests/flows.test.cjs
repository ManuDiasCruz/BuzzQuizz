const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const core = require('../src/core.js');
const { BUILTIN_QUIZZES } = require('../src/collection.js');
const source = fs.readFileSync(path.join(__dirname, '../src/script.js'), 'utf8').split('\ngetAllQuizzesLocais();')[0];
function setup(fetch, blockedStorage = false) {
    const save = { disabled: false, textContent: 'Finalizar Quizz' };
    const writes = new Map();
    const context = vm.createContext({
        document: { querySelector: () => save, querySelectorAll: () => [] },
        QuizCore: core, structuredClone, URL, AbortSignal,
        crypto: { randomUUID: () => 'test-uuid' }, fetch,
        localStorage: { setItem: (key, value) => { if (blockedStorage) throw new Error('Quota'); writes.set(key, value); } }
    });
    vm.runInContext(source, context);
    vm.runInContext('var successCount = 0; chamarTelaSucessoCriacaoQuizz = () => successCount++;', context);
    return { context, save, writes };
}
test('saving awaits response, prevents double posting and excludes edit secrets', async () => {
    let finish; let posts = 0; let body;
    const app = setup(async (_, options) => {
        posts++; body = JSON.parse(options.body);
        return new Promise(resolve => { finish = () => resolve({ ok: true, json: async () => ({ ...body, id: 42, key: 'secret' }) }); });
    });
    const pending = app.context.sendQuizz(structuredClone(BUILTIN_QUIZZES[0]));
    await app.context.sendQuizz(structuredClone(BUILTIN_QUIZZES[0]));
    assert.equal(posts, 1); assert.equal(app.save.disabled, true); assert.equal(app.context.successCount, 0);
    assert.ok(body.image.startsWith('https://manudiascruz.github.io/BuzzQuizzBeen/'));
    finish(); await pending;
    assert.equal(app.context.successCount, 1); assert.equal(app.save.disabled, false);
    const saved = JSON.parse(app.writes.get('buzzquizz:been:v2'));
    assert.equal(saved.length, 1); assert.equal(saved[0].id, 42); assert.equal(saved[0].key, undefined);
});
test('network failure retains complete playable local copy without false publication', async () => {
    const app = setup(async () => { throw new TypeError('offline'); });
    await app.context.sendQuizz(structuredClone(BUILTIN_QUIZZES[0]));
    const saved = JSON.parse(app.writes.get('buzzquizz:been:v2'))[0];
    assert.equal(saved.localOnly, true); assert.ok(core.playable(saved));
    assert.equal(app.context.successCount, 1); assert.equal(app.save.disabled, false);
});
test('malformed save response retains local copy', async () => {
    const app = setup(async () => ({ ok: true, json: async () => ({ id: 4 }) }));
    await app.context.sendQuizz(structuredClone(BUILTIN_QUIZZES[0]));
    assert.equal(JSON.parse(app.writes.get('buzzquizz:been:v2'))[0].localOnly, true);
});
test('quota failure keeps in-memory quiz and explicit warning', async () => {
    const app = setup(async () => { throw new TypeError('offline'); }, true);
    await app.context.sendQuizz(structuredClone(BUILTIN_QUIZZES[0]));
    assert.equal(app.writes.size, 0);
    assert.ok(vm.runInContext('storageWarning.includes("sessão")', app.context));
    assert.ok(vm.runInContext('QuizCore.playable(quizzRecemCriado)', app.context));
});
test('stale quiz response cannot replace a more recent navigation', async () => {
    let resolve;
    const app = setup(() => new Promise(r => { resolve = r; }));
    vm.runInContext('var opened = 0; notice = () => {}; abrirQuizz = () => opened++;', app.context);
    app.context.BUILTIN_QUIZZES = [];
    const pending = app.context.getQuizz(5);
    vm.runInContext('navigationVersion++;', app.context);
    resolve({ ok: true, json: async () => BUILTIN_QUIZZES[0] });
    await pending; assert.equal(app.context.opened, 0);
});
