const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const QuizCore = require('../src/core.js');
const quizzes = require('../src/quizzes.js');
// Test the real app functions with small DOM/API doubles; never POST to the public API.
const source = fs.readFileSync(require.resolve('../src/script.js'),'utf8').split("document.addEventListener('error'")[0];
function harness() {
    const controls = new Map();
    const context = vm.createContext({QuizCore, BUILTIN_QUIZZES:quizzes, URL, AbortController, crypto:require('node:crypto').webcrypto,
        setTimeout,clearTimeout,console,window:{scrollTo(){}},
        document:{querySelector:selector=>controls.get(selector)},
        fetch:()=>Promise.reject(Error('No network allowed in tests')),
        localStorage:{get length(){return 0;},getItem:()=>null,setItem(){}}});
    vm.runInContext(source,context);
    return {controls,context,run:code=>vm.runInContext(code,context)};
}
function form(values, correct = false) {
    return {querySelector:selector=>({value:values[selector]}),classList:{contains:()=>correct}};
}
test('answer, question and level factories return independent objects', () => {
    const h=harness();
    h.context.first=form({'.texto-resposta':'Correta','.url-resposta':'https://example.org/1.jpg'},true);
    h.context.second=form({'.texto-resposta':'Errada','.url-resposta':'https://example.org/2.jpg'});
    assert.equal(h.run('montarNovaResposta(first) === montarNovaResposta(second)'),false);
    assert.equal(h.run("montarNovaPergunta('First','#000000',[]) === montarNovaPergunta('Second','#ffffff',[])"),false);
    h.context.level=form({'.titulo-nivel':'Primeiro nível','.url-nivel':'https://example.org/1.jpg','.descricao-nivel':'Uma descrição que é longa o bastante.','.percentual-nivel':'0'});
    assert.equal(h.run('montarNovoNivel(level) === montarNovoNivel(level)'),false);
});
test('collapsed/unfilled question cards block advancing without destroying fields', () => {
    const h=harness();
    h.controls.set('.cria-perguntas',{querySelectorAll:()=>[]});
    h.run("qtdadePerguntas = 3; formError = (screen,errors) => { capturedErrors = errors; return errors.length > 0; }; chamarTelaCriarNiveis = () => { advanced = true; }; var advanced = false; var capturedErrors;");
    h.run('validarTodasPerguntas()');
    assert.equal(h.run('advanced'),false);
    assert.ok(h.run('capturedErrors[0]').includes('todas'));
});
test('all levels, including later levels, are validated without reloading', () => {
    const h=harness();
    const good=form({'.titulo-nivel':'Primeiro nível','.url-nivel':'https://example.org/1.jpg','.descricao-nivel':'Uma descrição que é longa o bastante.','.percentual-nivel':'0'});
    const bad=form({'.titulo-nivel':'x','.url-nivel':'','.descricao-nivel':'x','.percentual-nivel':''});
    h.controls.set('.cria-niveis',{querySelectorAll:()=>[good,bad]});
    h.run('qtdadeNiveis=2; var submitted=false; var capturedErrors; formError=(screen,errors)=>{capturedErrors=errors;return errors.length>0;}; sendQuizz=()=>{submitted=true;}; validarTodosNiveis();');
    assert.equal(h.run('submitted'),false);
    assert.ok(h.run("capturedErrors.some(e=>e.startsWith('Nível 2:'))"));
    assert.equal(bad.open,true);
});
test('save waits for the server and prevents duplicate concurrent submissions', async () => {
    const h=harness(); let resolve; let calls=0;
    h.context.fetch=()=>{calls++;return new Promise(r=>{resolve=r;});};
    const button={disabled:false,textContent:''};
    h.controls.set('.finaliza-quizz',button); h.controls.set('#publish-online',{checked:true});
    h.controls.set('#save-detail',{});
    h.context.ready={...quizzes[0],id:42};
    h.run('var successful=false; chamarTelaSucessoCriacaoQuizz=()=>{successful=true;};');
    const pending=h.run('sendQuizz(ready)');
    await h.run('sendQuizz(ready)');
    assert.equal(calls,1); assert.equal(button.disabled,true); assert.equal(h.run('successful'),false);
    resolve({ok:true,json:async()=>h.context.ready}); await pending;
    assert.equal(h.run('successful'),true); assert.equal(button.disabled,false);
});
test('failed publication keeps creation data and does not show success', async () => {
    const h=harness(); h.controls.set('.finaliza-quizz',{}); h.controls.set('#publish-online',{checked:true});
    h.context.ready={...quizzes[0],id:42};
    h.run('var successful=false; var capturedErrors; chamarTelaSucessoCriacaoQuizz=()=>{successful=true;}; formError=(screen,errors)=>{capturedErrors=errors;};');
    await h.run('sendQuizz(ready)');
    assert.equal(h.run('successful'),false); assert.ok(h.run('capturedErrors[0]').includes('confirmar'));
    assert.equal(h.run('ready.questions.length'),3);
});
test('local save never calls the public API', async () => {
    const h=harness(); let calls=0; h.context.fetch=()=>{calls++;throw Error('Unexpected POST');};
    h.controls.set('.finaliza-quizz',{});h.controls.set('#publish-online',{checked:false});h.controls.set('#save-detail',{});
    h.context.ready=quizzes[0]; h.run('var successful=false; chamarTelaSucessoCriacaoQuizz=()=>{successful=true;};');
    await h.run('sendQuizz(ready)');
    assert.equal(calls,0); assert.equal(h.run('successful'),true);
    assert.ok(h.run('quizzRecemCriado.id').startsWith('local-'));
});
test('storage quota failure does not report a local quiz as saved', async () => {
    const h=harness();h.controls.set('.finaliza-quizz',{});h.controls.set('#publish-online',{checked:false});
    h.context.localStorage.setItem=()=>{throw Error('QuotaExceededError');}; h.context.ready=quizzes[0];
    h.run('var successful=false; var capturedErrors; chamarTelaSucessoCriacaoQuizz=()=>{successful=true;}; formError=(screen,errors)=>{capturedErrors=errors;};');
    await h.run('sendQuizz(ready)');
    assert.equal(h.run('successful'),false); assert.ok(h.run('capturedErrors[0]').includes('armazenamento'));
});
test('stale quiz responses cannot reopen a screen after navigation', async () => {
    const h=harness();let resolve;
    h.context.fetch=()=>new Promise(r=>{resolve=r;});h.controls.set('#app-status',{});
    h.run('var opened=false; abrirQuizz=()=>{opened=true;};');
    const pending=h.run('getQuizz(42)');h.run('navigationVersion++');
    resolve({ok:true,json:async()=>({...quizzes[0],id:42})});await pending;
    assert.equal(h.run('opened'),false);
});
