const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const storage = new Map();
const context = {
    console,
    alert() {},
    localStorage: {
        get length() { return storage.size; },
        key(index) { return Array.from(storage.keys())[index] ?? null; },
        getItem(key) { return storage.get(String(key)) ?? null; },
        setItem(key, value) { storage.set(String(key), String(value)); },
        removeItem(key) { storage.delete(String(key)); }
    },
    setTimeout,
    clearTimeout
};

vm.createContext(context);
vm.runInContext(fs.readFileSync("src/quizzes-exemplo.js", "utf8"), context);

let script = fs.readFileSync("src/script.js", "utf8");
script = script.replace(/getAllQuizz\(\);\s*$/, "");
script += `
    globalThis.__test = {
        escapeHTML,
        urlParaCSS,
        validarURL,
        montarNovaResposta,
        montarNovaPergunta,
        montarNovoNivel,
        carregarLocais: () => { getAllQuizzesLocais(); return listaMeusQuizzes; },
        exemplos: QUIZZES_EXEMPLO,
        calcular: (quiz, respostasCorretas) => {
            quizzescolhido = quiz;
            acertos = respostasCorretas;
            calcularResultado();
            return { porcentagem: porcentagemarredondada, nivel: nivelResultado.title };
        }
    };
`;
vm.runInContext(script, context);

const app = context.__test;
const quiz = app.exemplos[0];

assert.equal(app.calcular(quiz, 0).porcentagem, 0);
assert.equal(app.calcular(quiz, 0).nivel, "Filhote curioso");
assert.equal(app.calcular(quiz, 2).porcentagem, 67);
assert.equal(app.calcular(quiz, 2).nivel, "Explorador da natureza");
assert.equal(app.calcular(quiz, 3).porcentagem, 100);
assert.equal(app.calcular(quiz, 3).nivel, "Mestre dos animais");

const unorderedLevelsQuiz = {
    questions: [{}, {}, {}, {}],
    levels: [
        { title: "Avançado", minValue: 75 },
        { title: "Iniciante", minValue: 0 },
        { title: "Intermediário", minValue: 50 }
    ]
};
assert.equal(app.calcular(unorderedLevelsQuiz, 2).nivel, "Intermediário");

assert.equal(app.validarURL("https://pixabay.com/photos/owl-123/"), true);
assert.equal(app.validarURL("pixabay.com/photos/owl-123/"), false);
assert.equal(app.escapeHTML(`<img src=x onerror="alert(1)">`), "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
assert.equal(app.urlParaCSS(`url'); color: red; (`), "url; color: red; ");

storage.set("some-other-app", "{not json");
storage.set("also-not-a-quiz", JSON.stringify({ title: "Other data" }));
storage.set("buzzquizz_12", JSON.stringify({ id: 12, title: "Mine", questions: [], levels: [] }));
assert.deepEqual(JSON.parse(JSON.stringify(app.carregarLocais())), [
    { id: 12, title: "Mine", questions: [], levels: [] }
]);

function answerElement(text, image, correct) {
    return {
        children: [{ value: text }, { value: image }],
        classList: { contains: (value) => value === "resposta-correta" && correct }
    };
}

const firstAnswer = app.montarNovaResposta(answerElement("Primeira", "https://example.com/1.jpg", true));
const secondAnswer = app.montarNovaResposta(answerElement("Segunda", "https://example.com/2.jpg", false));
const firstQuestion = app.montarNovaPergunta("Primeira pergunta completa", "#112233", [firstAnswer]);
const secondQuestion = app.montarNovaPergunta("Segunda pergunta completa", "#445566", [secondAnswer]);
assert.notStrictEqual(firstAnswer, secondAnswer);
assert.notStrictEqual(firstQuestion, secondQuestion);
assert.equal(firstQuestion.answers[0].text, "Primeira");

function levelElement(title, image, text, minimum) {
    const values = {
        ".titulo-nivel": title,
        ".url-nivel": image,
        ".descricao-nivel": text,
        ".percentual-nivel": String(minimum)
    };
    return { querySelector: (selector) => ({ value: values[selector] }) };
}

const firstLevel = app.montarNovoNivel(levelElement("Nível inicial", "https://example.com/a.jpg", "Descrição longa do primeiro nível criado.", 0));
const secondLevel = app.montarNovoNivel(levelElement("Nível avançado", "https://example.com/b.jpg", "Descrição longa do segundo nível criado.", 70));
assert.notStrictEqual(firstLevel, secondLevel);
assert.equal(firstLevel.minValue, 0);
assert.equal(secondLevel.minValue, 70);

console.log("Logic smoke tests passed (scoring, creation models, URL/HTML safety, and localStorage isolation).");
