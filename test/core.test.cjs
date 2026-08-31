const {test} = require('node:test');
const assert = require('node:assert/strict');
const core = require('../src/core.js');
const quizzes = require('../src/quizzes.js');
const validImage = 'https://example.org/photo.jpg';
const validQuestion = () => ({title:'Uma pergunta com vinte caracteres?',color:'#ffffff', answers:[
    {text:'Correta',image:validImage,isCorrectAnswer:true}, {text:'Errada',image:validImage,isCorrectAnswer:false}]});
const validLevel = () => ({title:'Nível iniciante',minValue:0,image:validImage,text:'Uma descrição completa com pelo menos trinta caracteres.'});
function storage(values = {}) {
    const map = new Map(Object.entries(values));
    return {get length(){return map.size;}, key:i=>[...map.keys()][i], getItem:k=>map.get(k)??null, setItem:(k,v)=>map.set(k,v)};
}
test('scoring handles zero, partial, full and empty results', () => {
    assert.deepEqual([core.score(0,3),core.score(1,3),core.score(2,3),core.score(3,3),core.score(0,0)], [0,33,67,100,0]);
});
test('highest eligible level wins, independently of array order', () => {
    const levels = [{minValue:100},{minValue:0},{minValue:'50'},{minValue:75}];
    assert.equal(core.selectLevel(levels,0).minValue,0);
    assert.equal(core.selectLevel(levels,74).minValue,'50');
    assert.equal(core.selectLevel(levels,75).minValue,75);
    assert.equal(core.selectLevel(levels,100).minValue,100);
});
test('shuffle does not mutate the quiz answer array', () => {
    const input = [1,2,3,4];
    assert.deepEqual(core.shuffle(input,()=>0),[2,3,4,1]);
    assert.deepEqual(input,[1,2,3,4]);
});
test('reject unsafe, relative, credential-bearing and HTTP user URLs', () => {
    for (const url of ['javascript:alert(1)','data:image/svg+xml,test','http://example.org/a','example.org/a','//example.org/a','https://user:password@example.org']) assert.equal(core.validURL(url),false,url);
    assert.equal(core.validURL('https://example.org/A%20B.jpg?width=900&crop=1'),true);
});
test('image rendering restricts bundled paths and uses a fallback', () => {
    assert.equal(core.imageURL('img/gallery/panda.jpg'),'img/gallery/panda.jpg');
    assert.equal(core.imageURL('../private.png'),'img/fallback.svg');
    assert.equal(core.imageURL('javascript:alert(1)'),'img/fallback.svg');
});
test('untrusted markup is escaped in templates', () => {
    assert.equal(core.escapeHTML('<img src="x" onerror=\'alert(1)\'> &'), '&lt;img src=&quot;x&quot; onerror=&#39;alert(1)&#39;&gt; &amp;');
});
test('basic validation enforces title bounds and integer counts', () => {
    assert.deepEqual(core.basicErrors('Um título de quizz válido',validImage,3,2),[]);
    for(const count of ['',NaN,'3.7',2,21]) assert.ok(core.basicErrors('Um título de quizz válido',validImage,count,2).length);
    assert.ok(core.basicErrors('a'.repeat(66),validImage,3,2).length);
    assert.ok(core.basicErrors(' '.repeat(20),validImage,3,2).length);
});
test('optional answers must have text and image in the same row', () => {
    const q = validQuestion();
    assert.deepEqual(core.questionErrors(q),[]);
    q.answers.push({text:'Opcional',image:'',isCorrectAnswer:false},{text:'',image:validImage,isCorrectAnswer:false});
    assert.ok(core.questionErrors(q).some(e=>e.includes('Cada resposta')));
});
test('duplicate answers and invalid correct-answer counts are rejected', () => {
    const q = validQuestion(); q.answers[1].text=' correta ';
    assert.ok(core.questionErrors(q).some(e=>e.includes('diferentes')));
    q.answers[1].isCorrectAnswer=true;
    assert.ok(core.questionErrors(q).some(e=>e.includes('uma resposta correta')));
});
test('each level is validated and blank percentages are not zero', () => {
    assert.deepEqual(core.levelErrors(validLevel()),[]);
    for(const minValue of ['',NaN,-1,101,2.5]) assert.ok(core.levelErrors({...validLevel(),minValue}).length);
    assert.ok(core.levelErrors({...validLevel(),title:'short'}).length);
});
test('all curated quizzes are playable, have independent records and local images', () => {
    assert.equal(quizzes.length,3);
    const photos = new Set();
    for(const quiz of quizzes) {
        assert.ok(core.playable(quiz));
        assert.equal(quiz.questions.length,3);
        quiz.questions.forEach(q=>q.answers.forEach(a=>photos.add(a.image)));
        assert.equal(new Set(quiz.questions).size,3);
        assert.equal(new Set(quiz.levels).size,3);
        assert.equal(core.selectLevel(quiz.levels,0).minValue,0);
    }
    assert.equal(photos.size,7);
});
test('malformed community data cannot start a broken quiz', () => {
    for(const q of [null,{}, {...quizzes[0],questions:[]}, {...quizzes[0],levels:[{...validLevel(),minValue:50}]},
        {...quizzes[0],questions:[{...validQuestion(),answers:[null,null]}]}]) assert.equal(core.playable(q),false);
});
test('storage ignores other apps, corrupt JSON and invalid legacy records', () => {
    const legacy={...quizzes[0],id:123};
    const s=storage({'other-app':'not json','123':JSON.stringify(legacy),'456':'{broken','789':JSON.stringify({title:'Not a quiz'})});
    assert.equal(core.readQuizzes(s).length,1);
    assert.equal(core.readQuizzes(s)[0].id,123);
    assert.equal(s.getItem('other-app'),'not json');
});
test('storage deduplicates and strips API secrets without mutating original', () => {
    const quiz={...quizzes[0],id:123,key:'secret-not-for-storage'};
    const s=storage({'123':JSON.stringify(quiz)});
    core.saveQuiz(s,quiz); core.saveQuiz(s,{...quiz,title:'Updated title'});
    assert.equal(core.readQuizzes(s).length,1);
    assert.equal(core.readQuizzes(s)[0].title,'Updated title');
    assert.ok(!s.getItem(core.STORAGE_KEY).includes('secret-not-for-storage'));
    assert.equal(quiz.key,'secret-not-for-storage');
});
test('blocked and corrupt storage do not crash the catalog', () => {
    assert.deepEqual(core.readQuizzes({getItem(){throw Error('blocked')}}),[]);
    assert.deepEqual(core.readQuizzes(storage({[core.STORAGE_KEY]:'{}'})),[]);
    assert.deepEqual(core.readQuizzes(storage({[core.STORAGE_KEY]:'{broken'})),[]);
});
test('question colors select readable text', () => {
    assert.equal(core.contrastText('#ffffff'),'#17202a');
    assert.equal(core.contrastText('#000000'),'#ffffff');
});
