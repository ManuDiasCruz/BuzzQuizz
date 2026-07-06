const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const sourcePath = path.join(__dirname, "..", "src", "script.js");
const source = fs.readFileSync(sourcePath, "utf8").replace(/\ngetAllQuizz\(\);\s*$/, "");
const context = vm.createContext({
    URL,
    alert() {},
    console,
    document: {
        querySelector() { return null; },
        querySelectorAll() { return []; }
    },
    localStorage: {
        length: 0,
        getItem() { return null; },
        key() { return null; },
        setItem() {}
    },
    Math,
    setTimeout
});
vm.runInContext(source, context);

function run(expression) {
    return vm.runInContext(expression, context);
}

test("URL validation only accepts HTTP and HTTPS URLs", () => {
    assert.equal(run("validarURL('https://pixabay.com/photos/aurora-7589302/')"), true);
    assert.equal(run("validarURL('http://example.com/image.jpg')"), true);
    assert.equal(run("validarURL('javascript:alert(1)')"), false);
    assert.equal(run("validarURL('pixabay.com/image.jpg')"), false);
});

test("unsafe image values fall back to a bundled image", () => {
    assert.equal(run("urlImagemSegura('img/pixabay/aurora.jpg')"), "img/pixabay/aurora.jpg");
    assert.equal(run("urlImagemSegura('javascript:alert(1)')"), "img/pixabay/aurora.jpg");
});

test("invalid question colors fall back to the original safe color", () => {
    assert.equal(run("corSegura('#12Ab90')"), "#12Ab90");
    assert.equal(run("corSegura('red; background: url(evil)')"), "#434CA0");
});

test("HTML from remote quiz data is escaped", () => {
    assert.equal(run("escapeHtml('<img src=x onerror=alert(1)>')"), "&lt;img src=x onerror=alert(1)&gt;");
});

test("score percentages and level boundaries are calculated correctly", () => {
    assert.equal(run("calcularPorcentagem(0, 3)"), 0);
    assert.equal(run("calcularPorcentagem(2, 3)"), 67);
    assert.equal(run("calcularPorcentagem(3, 3)"), 100);
    assert.equal(run("calcularPorcentagem(0, 0)"), 0);

    assert.equal(run(`
        quizzescolhido = { levels: [
            { title: 'Mestre', minValue: 67 },
            { title: 'Iniciante', minValue: 0 }
        ] };
        selecionarNivel(66).title;
    `), "Iniciante");
    assert.equal(run("selecionarNivel(67).title"), "Mestre");
});

test("quiz creation builds independent answer, question and level objects", () => {
    const objectsAreIndependent = run(`
        (() => {
            const fakeAnswer = (text, image, correct) => ({
                children: [{ value: text }, { value: image }],
                classList: { contains: () => correct }
            });
            const answerA = montarNovaResposta(fakeAnswer('A', 'https://example.com/a.jpg', true));
            const answerB = montarNovaResposta(fakeAnswer('B', 'https://example.com/b.jpg', false));
            const questionA = montarNovaPergunta('Pergunta válida número um', '#112233', [answerA]);
            const questionB = montarNovaPergunta('Pergunta válida número dois', '#445566', [answerB]);
            return answerA !== answerB && questionA !== questionB && questionA.answers !== questionB.answers &&
                answerA.text === 'A' && questionA.title.includes('um');
        })()
    `);
    assert.equal(objectsAreIndependent, true);
});

test("featured quiz uses diverse, bundled Pixabay assets", () => {
    assert.equal(run(`
        (() => {
            const images = [
                QUIZZ_LOCAL.image,
                ...QUIZZ_LOCAL.questions.flatMap(question => question.answers.map(answer => answer.image)),
                ...QUIZZ_LOCAL.levels.map(level => level.image)
            ];
            return images.every(image => image.startsWith('img/pixabay/')) && new Set(images).size >= 6;
        })()
    `), true);
});
