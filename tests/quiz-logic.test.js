const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const scriptPath = path.join(__dirname, "..", "src", "script.js");
const source = fs.readFileSync(scriptPath, "utf8").replace(/getAllQuizz\(\);\s*$/, "");
const context = vm.createContext({ URL, console, setTimeout, clearTimeout });

vm.runInContext(source, context, { filename: scriptPath });

const makeAnswerNode = (text, image, correct) => ({
    children: [{ value: text }, { value: image }],
    classList: { contains: (name) => name === "resposta-correta" && correct }
});

context.firstAnswerNode = makeAnswerNode("Resposta A", "https://example.com/a.jpg", true);
context.secondAnswerNode = makeAnswerNode("Resposta B", "https://example.com/b.jpg", false);
vm.runInContext(`
    firstAnswer = montarNovaResposta(firstAnswerNode);
    secondAnswer = montarNovaResposta(secondAnswerNode);
`, context);

assert.notStrictEqual(context.firstAnswer, context.secondAnswer, "answers must not share an object reference");
assert.equal(context.firstAnswer.text, "Resposta A");
assert.equal(context.secondAnswer.text, "Resposta B");

context.answerList = [context.firstAnswer, context.secondAnswer];
vm.runInContext(`
    builtQuestion = montarNovaPergunta("Uma pergunta longa o bastante", "#123456", answerList);
`, context);
assert.notStrictEqual(context.builtQuestion.answers[0], context.firstAnswer, "question answers should be cloned");

context.levelNode = {
    querySelector: (selector) => ({ value: {
        ".titulo-nivel": "Conhecedor de pandas",
        ".url-nivel": "https://example.com/level.jpg",
        ".descricao-nivel": "Descrição de nível válida com mais de trinta caracteres.",
        ".percentual-nivel": "67"
    }[selector] })
};
vm.runInContext("builtLevel = montarNovoNivel(levelNode);", context);
assert.equal(context.builtLevel.minValue, 67, "level percentages should be numbers");

vm.runInContext(`
    quizzescolhido = {
        questions: [{}, {}, {}],
        levels: [
            { title: "Intermediário", minValue: 34 },
            { title: "Iniciante", minValue: 0 },
            { title: "Especialista", minValue: 67 }
        ]
    };
    acertos = 2;
    selectedLevelIndex = quantidadeAcertos();
`, context);
assert.equal(vm.runInContext("porcentagemarredondada", context), 67);
assert.equal(vm.runInContext("quizzescolhido.levels[selectedLevelIndex].title", context), "Especialista");

assert.equal(vm.runInContext("validarURL('https://example.com/image.jpg')", context), true);
assert.equal(vm.runInContext("validarURL('javascript:alert(1)')", context), false);
assert.equal(vm.runInContext("safeImageUrl('not a url')", context), "img/pixabay-red-panda-3869112.jpg");

console.log("BuzzQuizz logic checks passed.");
