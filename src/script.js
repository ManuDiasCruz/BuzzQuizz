"use strict";

const API = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
const MIN_PERGUNTAS = 3;
const MIN_NIVEIS = 2;
let qtdadePerguntas = 0;
let qtdadeNiveis = 0;
let quizz = { title: "", image: "", questions: [], levels: [] };
let listaMeusQuizzes = [];
let comunidade = [];
let quizzRecemCriado;
let quizzescolhido;
let questoesrespondidas = new Set();
let acertos = 0;
let pendingSave = false;
let pendingCatalog = false;
let navigationVersion = 0;
let storageWarning = "";
const $ = selector => document.querySelector(selector);

function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}
function button(text, handler, className = "") {
    const node = element("button", className, text);
    node.type = "button";
    node.addEventListener("click", handler);
    return node;
}
function safeImage(value) {
    const bundled = typeof value === "string" ? value.replace("https://manudiascruz.github.io/BuzzQuizzBeen/", "") : "";
    if (IMAGE_LIBRARY.some(photo => photo.path === bundled)) return bundled;
    // Only bundled assets or HTTPS. Never interpret user input as markup.
    return /^img\/collection\/[a-z-]+\.webp$/.test(value) || QuizCore.imageURL(value) ? value : "img/fallback.svg";
}
function picture(value, alt, eager = false) {
    const img = element("img");
    img.alt = alt;
    img.loading = eager ? "eager" : "lazy";
    img.decoding = "async";
    img.src = safeImage(value);
    img.addEventListener("error", () => {
        img.removeAttribute("srcset");
        img.src = "img/fallback.svg";
        img.alt = alt + " (imagem indisponível)";
    }, { once: true });
    return img;
}
function notice(message, error = false) {
    const target = $("#app-status");
    target.textContent = message;
    target.classList.toggle("error", error);
    target.hidden = !message;
}
function showScreen(selector) {
    navigationVersion++;
    for (const node of document.querySelectorAll(".paginaum, .pagina-quizz, .cria-quizz main")) node.style.display = "none";
    $(".fim").replaceChildren();
    $(selector).style.display = selector === ".pagina-quizz" ? "block" : "flex";
    notice("");
    window.scrollTo({ top: 0, behavior: "instant" });
    const heading = $(selector).querySelector("h1, h2");
    if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
}
async function request(path = "", options = {}) {
    const response = await fetch(API + path, { ...options, signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("HTTP " + response.status);
    return response.json();
}
function getAllQuizzesLocais() {
    try { listaMeusQuizzes = QuizCore.readSaved(localStorage); }
    catch { listaMeusQuizzes = []; storageWarning = "O armazenamento está bloqueado neste navegador."; }
}
function guardaMeusQuizzesLocalmente(quiz) {
    listaMeusQuizzes = [...listaMeusQuizzes.filter(item => String(item.id) !== String(quiz.id)), quiz];
    try {
        localStorage.setItem("buzzquizz:been:v2", JSON.stringify(listaMeusQuizzes));
        storageWarning = "";
        return true;
    } catch {
        storageWarning = "Não foi possível salvar neste navegador. Mantenha esta aba aberta; o quizz só ficará disponível nesta sessão.";
        return false;
    }
}
function quizCard(quiz, label) {
    const card = button("", () => getQuizz(quiz.id), "quiz-card");
    card.append(picture(quiz.image, "", label === "Coleção BuzzQuizz"));
    const content = element("div", "card-content");
    content.append(element("span", "card-label", label), element("h3", "", quiz.title));
    content.append(element("span", "card-meta", `${quiz.questions?.length || "?"} perguntas  ·  Jogar ↗`));
    card.append(content);
    return card;
}
function renderHome() {
    $(".quizzes-criados").replaceChildren(...listaMeusQuizzes.map(quiz => quizCard(quiz, quiz.localOnly ? "Salvo neste navegador" : "Seu quizz")));
    $(".meus-quizzes").style.display = listaMeusQuizzes.length ? "flex" : "none";
    $(".criarprimeiroquizz").style.display = listaMeusQuizzes.length ? "none" : "flex";
    $("#collection").replaceChildren(...BUILTIN_QUIZZES.map(quiz => quizCard(quiz, "Coleção BuzzQuizz")));
    renderCommunity();
}
function renderCommunity() {
    const search = $("#quiz-search").value.trim().toLocaleLowerCase("pt-BR");
    const owned = new Set(listaMeusQuizzes.map(q => String(q.id)));
    const filtered = comunidade.filter(q => !owned.has(String(q.id)) && q.title.toLocaleLowerCase("pt-BR").includes(search));
    $(".quizzes").replaceChildren(...filtered.slice(0, 24).map(q => quizCard(q, "Comunidade")));
    $("#community-count").textContent = `${filtered.length} quizzes${filtered.length > 24 ? " · mostrando os primeiros 24; refine a busca" : ""}`;
    $("#empty-search").hidden = !search || filtered.length > 0;
}
async function getAllQuizz() {
    if (pendingCatalog) return;
    pendingCatalog = true;
    $("#refresh-quizzes").disabled = true;
    $("#community-status").textContent = "Carregando quizzes da comunidade…";
    try {
        const data = await request();
        if (!Array.isArray(data)) throw new Error("Invalid catalog");
        comunidade = [...new Map(data.filter(q => q && q.id != null && typeof q.title === "string" && q.title.trim()).map(q => [String(q.id), q])).values()];
        renderCommunity();
        $("#community-status").textContent = comunidade.length ? "Quizzes públicos, criados pela comunidade. O conteúdo pode variar." : "Ainda não há quizzes da comunidade. Experimente nossa coleção.";
    } catch {
        $("#community-status").textContent = "A comunidade está indisponível agora. A coleção e seus quizzes salvos continuam funcionando. Tente atualizar.";
    } finally { pendingCatalog = false; $("#refresh-quizzes").disabled = false; }
}
async function getQuizz(id) {
    const local = [...BUILTIN_QUIZZES, ...listaMeusQuizzes].find(q => String(q.id) === String(id));
    if (local) { abrirQuizz({ data: local }); return; }
    const version = ++navigationVersion;
    notice("Abrindo quizz…");
    try {
        const quiz = await request("/" + encodeURIComponent(id));
        if (version !== navigationVersion) return;
        abrirQuizz({ data: quiz });
    } catch { if (version === navigationVersion) notice("Não foi possível abrir este quizz. Tente novamente ou escolha um da coleção.", true); }
}
function abrirQuizz(response) {
    if (!QuizCore.playable(response.data)) { notice("Este quizz tem perguntas ou níveis inválidos. Escolha outro quizz.", true); return; }
    quizzescolhido = { ...response.data, questions: response.data.questions.map(q => ({ ...q, answers: QuizCore.shuffle(q.answers) })) };
    questoesrespondidas = new Set();
    acertos = 0;
    const screen = $(".pagina-quizz");
    screen.replaceChildren();
    screen.append(button("← Voltar aos quizzes", paginaInicial, "back-link"));
    const hero = element("section", "titulo-quizz");
    hero.append(picture(quizzescolhido.image, "", true), element("h1", "", quizzescolhido.title));
    screen.append(hero);
    const progress = element("p", "quiz-progress", `0 de ${quizzescolhido.questions.length} respondidas`);
    progress.id = "quiz-progress"; progress.setAttribute("role", "status");
    screen.append(progress);
    const questions = element("section", "perguntas");
    quizzescolhido.questions.forEach((question, i) => {
        const article = element("article", "pergunta");
        article.id = `question-${i}`; article.dataset.identifier = "question";
        const title = element("div", "titulo-pergunta");
        const color = /^#[a-f\d]{6}$/i.test(question.color) ? question.color : "#9e342d";
        title.style.backgroundColor = color;
        const rgb = color.slice(1).match(/../g).map(c => parseInt(c, 16));
        const linear = rgb.map(c => c / 255 <= .04045 ? c / 255 / 12.92 : ((c / 255 + .055) / 1.055) ** 2.4);
        const luminance = linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
        title.style.color = luminance > .179 ? "#000000" : "#ffffff";
        title.append(element("span", "eyebrow", `PERGUNTA ${String(i + 1).padStart(2, "0")}`), element("h2", "", question.title));
        const answers = element("div", "bloco-respostas");
        question.answers.forEach((answer, j) => {
            const choice = button("", () => quizzSelecionado(i, j), "resposta");
            choice.dataset.identifier = "answer";
            choice.append(picture(answer.image, ""), element("span", "answer-text", answer.text));
            answers.append(choice);
        });
        article.append(title, answers);
        questions.append(article);
    });
    screen.append(questions);
    showScreen(".pagina-quizz");
}
function quizzSelecionado(index, option) {
    if (questoesrespondidas.has(index)) return;
    const question = quizzescolhido.questions[index];
    if (!question?.answers[option]) return;
    questoesrespondidas.add(index);
    const correct = question.answers[option].isCorrectAnswer;
    if (correct) acertos++;
    const article = $(`#question-${index}`);
    article.querySelectorAll(".resposta").forEach((choice, i) => {
        choice.disabled = true;
        choice.classList.add(question.answers[i].isCorrectAnswer ? "acertou" : "errou");
        choice.classList.toggle("escolhida", i === option);
        choice.append(element("small", "answer-feedback", question.answers[i].isCorrectAnswer ? "✓ Resposta correta" : i === option ? "✕ Sua resposta" : ""));
    });
    const feedback = element("p", "question-feedback", correct ? "Muito bem! Você acertou." : "Quase! A resposta correta está indicada acima.");
    feedback.setAttribute("role", "status");
    article.append(feedback);
    $("#quiz-progress").textContent = `${questoesrespondidas.size} de ${quizzescolhido.questions.length} respondidas`;
    if (questoesrespondidas.size === quizzescolhido.questions.length) resultadoQuizz();
    else article.append(button("Próxima pergunta ↓", () => {
        const next = quizzescolhido.questions.findIndex((_, i) => !questoesrespondidas.has(i));
        if (next === -1) { $(".resultado")?.scrollIntoView({ block: "start" }); return; }
        const target = $(`#question-${next}`);
        target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
        target.querySelector("button").focus({ preventScroll: true });
    }, "next-question"));
}
function resultadoQuizz() {
    document.querySelectorAll(".next-question").forEach(node => node.remove());
    const { percentage, level } = QuizCore.result(quizzescolhido, acertos);
    const article = element("article", "resultado");
    article.dataset.identifier = "quizz-result";
    article.tabIndex = -1;
    article.append(element("p", "eyebrow", "DESAFIO CONCLUÍDO"), element("h2", "score", percentage + "%"), element("h3", "", level.title));
    article.append(element("p", "", `${acertos} de ${quizzescolhido.questions.length} respostas corretas`), picture(level.image, ""), element("p", "result-description", level.text));
    article.append(button("Jogar novamente", reiniciarQuizz, "primary"), button("Voltar aos quizzes", paginaInicial, "secondary"));
    $(".fim").replaceChildren(article);
    article.focus({ preventScroll: true });
    article.scrollIntoView({ behavior: "instant", block: "start" });
}
function reiniciarQuizz() { abrirQuizz({ data: quizzescolhido }); }
function paginaInicial() { if (pendingSave) return; renderHome(); showScreen(".paginaum"); if (storageWarning) notice(storageWarning, true); }
function voltarInicio() { paginaInicial(); }
function chamarTelaCriarQuizz() {
    if (pendingSave) return;
    quizz = { title: "", image: "", questions: [], levels: [] };
    quizzRecemCriado = undefined;
    $(".cria-perguntas").replaceChildren(); $(".cria-niveis").replaceChildren();
    $(".vamos-comecar").querySelectorAll("input").forEach(input => input.value = "");
    showScreen(".vamos-comecar");
    prepararFormulario($(".vamos-comecar"));
}
function formError(container, message) {
    let error = container.querySelector(".form-error");
    if (!error) { error = element("p", "form-error"); error.setAttribute("role", "alert"); container.prepend(error); }
    error.textContent = message;
    error.tabIndex = -1;
    error.focus();
    error.scrollIntoView({ block: "center", behavior: "instant" });
    return false;
}
function clearErrors(container) { container.querySelectorAll(".form-error").forEach(node => node.remove()); }
function validarDadosBasicos() {
    const form = $(".vamos-comecar"); clearErrors(form);
    const candidate = { title: form.querySelector(".titulo-quizz").value.trim(), image: form.querySelector(".url-quizz").value.trim() };
    const questionCount = form.querySelector(".numero-perguntas").value;
    const levelCount = form.querySelector(".quantidade-niveis").value;
    const error = QuizCore.basicError(candidate, questionCount, levelCount);
    if (error) return formError(form, error);
    Object.assign(quizz, candidate);
    qtdadePerguntas = Number(questionCount); qtdadeNiveis = Number(levelCount);
    chamarTelaCriarPerguntas();
}
function chamarTelaCriarPerguntas() { montarTelaCriarPerguntas($(".cria-perguntas")); showScreen(".cria-perguntas"); }
function montarNovaResposta(node) {
    return { text: node.querySelector(".texto-resposta").value.trim(), image: node.querySelector(".url-resposta").value.trim(), isCorrectAnswer: node.classList.contains("resposta-correta") };
}
function montarNovaPergunta(title, color, answers) { return { title: title.trim(), color, answers }; }
function readQuestion(node) {
    const answers = [...node.querySelectorAll(".resposta-correta, .resposta")].map(montarNovaResposta).filter(a => a.isCorrectAnswer || a.text || a.image);
    return montarNovaPergunta(node.querySelector(".texto-pergunta").value, node.querySelector(".cor-pergunta").value, answers);
}
function validarTodasPerguntas() {
    const form = $(".cria-perguntas"); clearErrors(form);
    form.querySelectorAll(".nova-pergunta .botaoEditar").forEach(abrirNovaPergunta);
    const nodes = [...form.querySelectorAll(".pergunta")];
    const questions = nodes.map(readQuestion);
    for (let i = 0; i < questions.length; i++) {
        const error = QuizCore.questionError(questions[i]);
        if (error) return formError(nodes[i], `Pergunta ${i + 1}: ${error}`);
    }
    if (questions.length !== qtdadePerguntas) return formError(form, "Preencha todas as perguntas.");
    quizz.questions = questions;
    chamarTelaCriarNiveis();
}
function chamarTelaCriarNiveis() { montarTelaCriarNiveis($(".cria-niveis")); showScreen(".cria-niveis"); }
function montarNovoNivel(node) {
    return { title: node.querySelector(".titulo-nivel").value.trim(), image: node.querySelector(".url-nivel").value.trim(), text: node.querySelector(".descricao-nivel").value.trim(), minValue: node.querySelector(".percentual-nivel").value };
}
function validarTodosNiveis() {
    if (pendingSave) return;
    const form = $(".cria-niveis"); clearErrors(form);
    form.querySelectorAll(".novo-nivel .botaoEditar").forEach(abrirNovoNivel);
    const nodes = [...form.querySelectorAll(".nivel")];
    const levels = nodes.map(montarNovoNivel);
    for (let i = 0; i < levels.length; i++) {
        const error = QuizCore.levelError(levels[i]);
        if (error) return formError(nodes[i], `Nível ${i + 1}: ${error}`);
    }
    const error = QuizCore.levelsError(levels);
    if (error) return formError(form, error);
    if (levels.length !== qtdadeNiveis) return formError(form, "Preencha todos os níveis.");
    quizz.levels = levels.map(level => ({ ...level, minValue: Number(level.minValue) }));
    sendQuizz(quizz);
}
async function sendQuizz(ready) {
    if (pendingSave) return;
    pendingSave = true;
    const save = $(".finaliza-quizz"); save.disabled = true; save.textContent = "Salvando…";
    document.querySelectorAll("header button, .cancel-creation").forEach(node => node.disabled = true);
    // Save locally before posting. A failed request must never destroy the quiz.
    const draft = { ...structuredClone(ready), id: "local-" + crypto.randomUUID(), localOnly: true };
    guardaMeusQuizzesLocalmente(draft);
    quizzRecemCriado = draft;
    try {
        // Relative bundled photos must resolve on the published site, not localhost.
        const payload = JSON.parse(JSON.stringify(ready), (key, value) => key === "image" && /^img\/collection\//.test(value) ? new URL(value, "https://manudiascruz.github.io/BuzzQuizzBeen/").href : value);
        const saved = await request("", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        if (!QuizCore.playable(saved) || saved.id == null) throw new Error("Invalid save response");
        // Whitelist public data: never persist edit secrets returned by the API.
        const publicQuiz = { id: saved.id, title: saved.title, image: saved.image, questions: saved.questions, levels: saved.levels };
        listaMeusQuizzes = listaMeusQuizzes.filter(q => q.id !== draft.id);
        guardaMeusQuizzesLocalmente(publicQuiz);
        quizzRecemCriado = publicQuiz;
    } catch { /* Keep the labeled local copy. Never automatically retry a POST. */ }
    finally {
        pendingSave = false;
        document.querySelectorAll("header button, .cancel-creation").forEach(node => node.disabled = false);
        save.disabled = false; save.textContent = "Finalizar Quizz";
    }
    chamarTelaSucessoCriacaoQuizz();
}
function chamarTelaSucessoCriacaoQuizz() {
    const screen = $(".sucesso-quizz"); screen.replaceChildren();
    screen.append(element("p", "eyebrow", "FEITO POR VOCÊ"), element("h1", "", "Seu quizz está pronto!"));
    const saveMessage = quizzRecemCriado.localOnly ? (storageWarning ? "A publicação não foi confirmada. Você pode jogar nesta sessão, mas não há uma cópia persistente salva." : "A publicação não foi confirmada. Seu quizz foi mantido neste navegador e não é compartilhável por link.") : "Quizz publicado na comunidade e disponível neste navegador.";
    screen.append(element("p", "save-message", saveMessage));
    screen.append(quizCard(quizzRecemCriado, "Seu novo quizz"), button("Acessar Quizz", acessarQuizzCriado, "primary"), button("Voltar aos quizzes", voltarInicio, "secondary"));
    showScreen(".sucesso-quizz");
    if (storageWarning) notice(storageWarning, true);
}
function acessarQuizzCriado() { if (quizzRecemCriado) abrirQuizz({ data: quizzRecemCriado }); }
function prepararFormulario(container) {
    container.querySelectorAll("input, textarea").forEach(input => {
        if (!input.id) input.id = "field-" + crypto.randomUUID();
        if (!input.labels?.length) {
            const label = element("label", "field-label", input.placeholder || "Cor da pergunta");
            label.htmlFor = input.id; input.before(label);
        }
        if (input.type !== "url" || input.nextElementSibling?.classList.contains("image-choices")) return;
        const choices = element("details", "image-choices");
        choices.append(element("summary", "", "Escolher foto da galeria Pixabay"));
        const grid = element("div", "image-grid");
        IMAGE_LIBRARY.forEach(photo => {
            const pick = button("", () => {
                input.value = photo.path;
                choices.open = false;
                input.focus();
            }, "image-choice");
            pick.setAttribute("aria-label", `Usar foto: ${photo.label}`);
            pick.append(picture(photo.path, photo.label)); grid.append(pick);
        });
        choices.append(grid); input.after(choices);
    });
    container.querySelectorAll(".botaoEditar").forEach(btn => btn.setAttribute("aria-label", "Editar " + btn.parentNode.querySelector("h2").textContent));
}
getAllQuizzesLocais();
renderHome();
$("#quiz-search").addEventListener("input", renderCommunity);
getAllQuizz();
