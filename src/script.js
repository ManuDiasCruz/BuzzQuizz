/* BuzzQuizz v2: original screens and creation workflow, with explicit state. */
'use strict';
const API_URL = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
const MIN_PERGUNTAS = 3;
const MIN_NIVEIS = 2;
let qtdadePerguntas = 0;
let qtdadeNiveis = 0;
let listaPerguntas = [];
let listaNiveis = [];
let listaMeusQuizzes = [];
let quizz = {title: '', image: '', questions: [], levels: []};
let quizzRecemCriado;
let quizzescolhido;
let identificador;
let acertos = 0;
let respondidas = new Set();
let scrollTimer;
let navigationVersion = 0;
let saving = false;
let community = [];
let visibleCommunity = 12;
const esc = QuizCore.escapeHTML;

function notice(message = '') {
    const element = document.querySelector('#app-status');
    element.textContent = message;
    element.hidden = !message;
}

function formError(screen, errors) {
    let message = screen.querySelector('.form-error');
    if (!message) {
        message = document.createElement('p');
        message.className = 'form-error';
        message.setAttribute('role', 'alert');
        message.tabIndex = -1;
        screen.insertBefore(message, screen.children[1] || null);
    }
    message.textContent = errors.join(' ');
    message.hidden = errors.length === 0;
    if (errors.length) {
        message.focus();
        message.scrollIntoView({block: 'center'});
    }
    return errors.length > 0;
}

function showScreen(selector) {
    clearTimeout(scrollTimer);
    navigationVersion++;
    document.querySelectorAll('.paginaum, .pagina-quizz, .cria-quizz > main').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelector('.fim').innerHTML = '';
    const screen = document.querySelector(selector);
    screen.style.display = selector === '.pagina-quizz' ? 'block' : 'flex';
    notice();
    window.scrollTo(0, 0);
    const heading = screen.querySelector('h1, h2');
    if (heading) {
        heading.tabIndex = -1;
        heading.focus({preventScroll: true});
    }
}

async function requestAPI(path = '', options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
        const response = await fetch(API_URL + path, {...options, signal: controller.signal});
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return await response.json();
    } finally { clearTimeout(timeout); }
}

async function sendQuizz(quizzPronto) {
    if (saving) return;
    saving = true;
    const button = document.querySelector('.finaliza-quizz');
    const publish = document.querySelector('#publish-online').checked;
    button.disabled = true;
    button.textContent = 'Salvando…';
    try {
        const result = publish
            ? await requestAPI('', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(quizzPronto)})
            : {...quizzPronto, id: 'local-' + crypto.randomUUID()};
        if (!QuizCore.playable(result) || !/^(?:\d+|local-[\w-]+)$/.test(String(result.id)))
            throw new Error('Resposta inválida do servidor');
        quizzRecemCriado = QuizCore.publicQuiz(result);
        let persisted = true;
        try { guardaMeusQuizzesLocalmente(quizzRecemCriado); } catch { persisted = false; }
        if (!persisted && !publish) {
            formError(document.querySelector('.cria-niveis'), ['O navegador não permitiu salvar. Libere o armazenamento e tente novamente. Seus campos foram mantidos.']);
            return;
        }
        chamarTelaSucessoCriacaoQuizz();
        document.querySelector('#save-detail').textContent = publish
            ? (persisted ? 'Publicado na comunidade e salvo neste navegador.' : 'Publicado na comunidade. O navegador não permitiu guardar uma cópia local.')
            : 'Salvo somente neste navegador. Limpar os dados do site remove seus quizzes.';
    } catch {
        formError(document.querySelector('.cria-niveis'), [publish
            ? 'Não foi possível confirmar a publicação. Seus dados continuam aqui. Confira a comunidade antes de reenviar para evitar duplicatas, ou desmarque a publicação na etapa inicial para salvar localmente.'
            : 'Não foi possível salvar o quizz. Seus dados continuam aqui.']);
    } finally {
        saving = false;
        button.disabled = false;
        button.textContent = 'Finalizar Quizz';
    }
}

function guardaMeusQuizzesLocalmente(quiz) {
    QuizCore.saveQuiz(localStorage, quiz);
    listaMeusQuizzes = QuizCore.readQuizzes(localStorage);
}

function getAllQuizzesLocais() {
    try { listaMeusQuizzes = QuizCore.readQuizzes(localStorage); }
    catch { listaMeusQuizzes = []; }
}

function quizCard(quiz, label) {
    const article = document.createElement('article');
    article.className = 'quiz-card';
    article.innerHTML = `<button type="button" class="card-button">
        <img src="${esc(QuizCore.imageURL(quiz.image))}" alt="" loading="lazy" width="640" height="400">
        <span class="card-content"><span class="card-tag">${esc(label)}</span>
        <span class="card-title">${esc(quiz.title)}</span><span class="card-action">Jogar quizz <span aria-hidden="true">↗</span></span></span>
        </button>`;
    article.querySelector('button').addEventListener('click', () => getQuizz(quiz.id));
    return article;
}

function pegaMeusQuizzes() {
    getAllQuizzesLocais();
    const container = document.querySelector('.quizzes-criados');
    container.replaceChildren(...listaMeusQuizzes.map(q => quizCard(q, String(q.id).startsWith('local-') ? 'Neste navegador' : 'Seu quizz')));
    document.querySelector('.meus-quizzes').style.display = listaMeusQuizzes.length ? 'flex' : 'none';
    document.querySelector('.criarprimeiroquizz').style.display = listaMeusQuizzes.length ? 'none' : 'flex';
}

async function getAllQuizz() {
    pegaMeusQuizzes();
    document.querySelector('.featured-quizzes').replaceChildren(...BUILTIN_QUIZZES.map(q => quizCard(q, q.category + ' · 3 perguntas')));
    const status = document.querySelector('#community-status');
    status.textContent = 'Carregando quizzes da comunidade…';
    const retry = document.querySelector('#retry-community');
    retry.hidden = true;
    try {
        const response = await requestAPI();
        if (!Array.isArray(response)) throw new Error('Catálogo inválido');
        community = response.filter(q => q && /^\d+$/.test(String(q.id)) && QuizCore.text(q.title) && typeof q.image === 'string');
        renderCommunity();
        status.textContent = community.length ? 'Criados pela comunidade. Conteúdo e imagens de terceiros, sem curadoria.' : 'Ainda não há quizzes na comunidade.';
    } catch {
        status.textContent = 'A comunidade está indisponível. Os quizzes em destaque e os salvos neste navegador continuam disponíveis.';
        retry.hidden = false;
    }
}

function renderCommunity() {
    const search = document.querySelector('#quiz-search').value.trim().toLocaleLowerCase('pt-BR');
    const matches = community.filter(q => q.title.toLocaleLowerCase('pt-BR').includes(search));
    document.querySelector('.quizzes').replaceChildren(...matches.slice(0, visibleCommunity).map(q => quizCard(q, 'Comunidade')));
    document.querySelector('#more-quizzes').hidden = matches.length <= visibleCommunity;
    document.querySelector('#search-status').textContent = search && !matches.length ? 'Nenhum quizz encontrado. Tente outro termo.' : '';
}

async function getQuizz(id) {
    clearTimeout(scrollTimer);
    const version = ++navigationVersion;
    identificador = id;
    const saved = [...BUILTIN_QUIZZES, ...listaMeusQuizzes].find(q => String(q.id) === String(id));
    notice('Abrindo quizz…');
    try {
        const result = saved || await requestAPI('/' + encodeURIComponent(id));
        if (version !== navigationVersion) return;
        if (!QuizCore.playable(result)) throw new Error('Quizz incompleto');
        abrirQuizz({data: result});
    } catch {
        if (version === navigationVersion) notice('Este quizz está indisponível ou incompleto. Escolha outro ou tente novamente.');
    }
}

function abrirQuizz(response) {
    showScreen('.pagina-quizz');
    acertos = 0;
    respondidas = new Set();
    quizzescolhido = QuizCore.publicQuiz(response.data);
    quizzescolhido.questions.forEach(q => { q.answers = QuizCore.shuffle(q.answers); });
    const screen = document.querySelector('.pagina-quizz');
    screen.innerHTML = `<section class="titulo-quizz">
        <img src="${esc(QuizCore.imageURL(quizzescolhido.image))}" alt="" width="1280" height="400">
        <div><span class="eyebrow">HORA DO DESAFIO</span><h2 tabindex="-1">${esc(quizzescolhido.title)}</h2></div>
        </section><div class="quiz-toolbar"><button type="button" class="text-button" onclick="paginaInicial()">← Voltar ao início</button>
        <span id="quiz-progress" role="status">0 de ${quizzescolhido.questions.length} respondidas</span></div>
        <div class="perguntas"></div>`;
    const questions = screen.querySelector('.perguntas');
    quizzescolhido.questions.forEach((q, index) => {
        const color = /^#[0-9a-f]{6}$/i.test(q.color) ? q.color : '#434ca0';
        const article = document.createElement('article');
        article.className = 'pergunta';
        article.id = 'question-' + index;
        article.dataset.identifier = 'question';
        article.innerHTML = `<div class="titulo-pergunta" style="background-color:${color};color:${QuizCore.contrastText(color)}">
            <span class="question-number">PERGUNTA ${index + 1} / ${quizzescolhido.questions.length}</span>
            <h3>${esc(q.title)}</h3></div><div class="bloco-respostas"></div><p class="answer-feedback" role="status"></p>`;
        q.answers.forEach((answer, choice) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'resposta';
            button.dataset.identifier = 'answer';
            button.innerHTML = `<img src="${esc(QuizCore.imageURL(answer.image))}" alt="" loading="lazy" width="480" height="300">
                <span class="answer-label">${esc(answer.text)}</span><span class="answer-mark"></span>`;
            button.addEventListener('click', () => quizzSelecionado(index, choice));
            article.querySelector('.bloco-respostas').append(button);
        });
        questions.append(article);
    });
    screen.querySelector('h2').focus({preventScroll: true});
}

function quizzSelecionado(index, choice) {
    if (respondidas.has(index)) return;
    const question = quizzescolhido.questions[index];
    const answer = question?.answers[choice];
    if (!answer) return;
    respondidas.add(index);
    if (answer.isCorrectAnswer) acertos++;
    const article = document.querySelector('#question-' + index);
    article.querySelectorAll('.resposta').forEach((button, i) => {
        button.disabled = true;
        button.classList.toggle('escolhida', i === choice);
        button.classList.add(question.answers[i].isCorrectAnswer ? 'acertou' : 'errou');
        button.querySelector('.answer-mark').textContent = question.answers[i].isCorrectAnswer ? '✓ Correta' : (i === choice ? '✕ Sua resposta' : '');
    });
    article.querySelector('.answer-feedback').textContent = answer.isCorrectAnswer
        ? 'Isso mesmo! Você acertou.' : 'Não foi dessa vez. A resposta correta está marcada acima.';
    document.querySelector('#quiz-progress').textContent = respondidas.size + ' de ' + quizzescolhido.questions.length + ' respondidas';
    clearTimeout(scrollTimer);
    if (respondidas.size === quizzescolhido.questions.length) {
        resultadoQuizz();
    } else {
        const version = navigationVersion;
        const next = quizzescolhido.questions.findIndex((q, i) => !respondidas.has(i));
        scrollTimer = setTimeout(() => {
            if (version === navigationVersion) document.querySelector('#question-' + next)?.scrollIntoView({behavior: motion(), block: 'start'});
        }, 1100);
    }
}

function motion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

function resultadoQuizz() {
    const percentage = QuizCore.score(acertos, quizzescolhido.questions.length);
    const level = QuizCore.selectLevel(quizzescolhido.levels, percentage);
    const result = document.querySelector('.fim');
    result.innerHTML = `<article class="resultado" data-identifier="quizz-result">
        <div class="titulo-resultado"><span>DESAFIO CONCLUÍDO</span><h3 tabindex="-1">${percentage}% · ${esc(level.title)}</h3></div>
        <div class="conteudo-reultado"><img src="${esc(QuizCore.imageURL(level.image))}" alt="" width="640" height="400">
        <div><p class="result-score">${acertos} de ${quizzescolhido.questions.length} respostas corretas</p><p>${esc(level.text)}</p></div></div>
        </article><div class="botoes"><button class="reiniciar-quizz" onclick="reiniciarQuizz()">Jogar novamente</button>
        <button class="voltar-inicio" onclick="paginaInicial()">Explorar outros quizzes</button></div>`;
    result.querySelector('h3').focus({preventScroll: true});
    result.scrollIntoView({behavior: motion(), block: 'start'});
}

function paginaInicial() {
    if (saving) return;
    showScreen('.paginaum');
    pegaMeusQuizzes();
}

function reiniciarQuizz() {
    abrirQuizz({data: quizzescolhido});
}

function chamarTelaCriarQuizz() {
    if (saving) return;
    showScreen('.vamos-comecar');
}

function validarDadosBasicos() {
    const screen = document.querySelector('.vamos-comecar');
    const title = screen.querySelector('.titulo-quizz').value.trim();
    const image = screen.querySelector('.url-quizz').value.trim();
    const questions = screen.querySelector('.numero-perguntas').value;
    const levels = screen.querySelector('.quantidade-niveis').value;
    if (formError(screen, QuizCore.basicErrors(title, image, questions, levels))) return;
    const rebuildQuestions = qtdadePerguntas !== Number(questions);
    const rebuildLevels = qtdadeNiveis !== Number(levels);
    qtdadePerguntas = Number(questions);
    qtdadeNiveis = Number(levels);
    quizz.title = title;
    quizz.image = image;
    if (rebuildQuestions) syncCreatorCount('.cria-perguntas', '.pergunta', qtdadePerguntas, questionFields);
    if (rebuildLevels) syncCreatorCount('.cria-niveis', '.nivel', qtdadeNiveis, levelFields);
    chamarTelaCriarPerguntas();
}

function chamarTelaCriarPerguntas() {
    const screen = document.querySelector('.cria-perguntas');
    if (!screen.querySelector('.pergunta')) montarTelaCriarPerguntas(screen);
    showScreen('.cria-perguntas');
}

function montarTelaCriarPerguntas(screen) {
    screen.innerHTML = '<h1>Crie suas perguntas</h1><p class="step-label">Etapa 2 de 3 · Uma correta, até três incorretas</p>';
    for (let i = 0; i < qtdadePerguntas; i++) screen.insertAdjacentHTML('beforeend', questionFields(i));
    screen.insertAdjacentHTML('beforeend', '<div class="form-actions"><button class="text-button" onclick="showScreen(\'.vamos-comecar\')">← Dados básicos</button><button class="prosseguir" onclick="validarTodasPerguntas()">Prosseguir pra criar níveis</button></div>');
}

function questionFields(index) {
    return `<details class="pergunta" data-identifier="question" ${index === 0 ? 'open' : ''}>
        <summary>Pergunta ${index + 1}</summary>
        <div class="cabecalho-pergunta">
            <label>Texto da pergunta (mínimo 20 caracteres)<input class="texto-pergunta" type="text" minlength="20" maxlength="300" placeholder="O que você quer perguntar?"></label>
            <label>Cor de fundo<input class="cor-pergunta" type="color" value="#434ca0"></label>
        </div>
        ${[0,1,2,3].map(i => `<div class="${i === 0 ? 'resposta-correta' : 'resposta'}">
            <h2>${i === 0 ? 'Resposta correta' : 'Resposta incorreta ' + i + (i > 1 ? ' (opcional)' : '')}</h2>
            <label>Texto da resposta<input class="texto-resposta" type="text" maxlength="200"></label>
            <label>Imagem da resposta (HTTPS)<input class="url-resposta" type="url" placeholder="https://…"></label>
        </div>`).join('')}
    </details>`;
}

function syncCreatorCount(selector, itemSelector, count, fields) {
    const screen = document.querySelector(selector);
    const items = [...screen.querySelectorAll(itemSelector)];
    if (!items.length) return;
    items.slice(count).forEach(item => item.remove());
    for (let i = items.length; i < count; i++) screen.querySelector('.form-actions').insertAdjacentHTML('beforebegin', fields(i));
}

function montarNovaResposta(elemento) {
    return {
        text: elemento.querySelector('.texto-resposta').value.trim(),
        image: elemento.querySelector('.url-resposta').value.trim(),
        isCorrectAnswer: elemento.classList.contains('resposta-correta')
    };
}

function validarTodasPerguntas() {
    const screen = document.querySelector('.cria-perguntas');
    const elements = [...screen.querySelectorAll('.pergunta')];
    listaPerguntas = elements.map(element => montarNovaPergunta(
        element.querySelector('.texto-pergunta').value.trim(),
        element.querySelector('.cor-pergunta').value,
        [...element.querySelectorAll('.resposta-correta, .resposta')].map(montarNovaResposta)
            .filter(a => a.isCorrectAnswer || a.text || a.image)));
    const errors = [];
    if (listaPerguntas.length !== qtdadePerguntas) errors.push('Preencha todas as perguntas solicitadas.');
    listaPerguntas.forEach((q, i) => {
        const issues = QuizCore.questionErrors(q);
        if (issues.length) elements[i].open = true;
        errors.push(...issues.map(message => 'Pergunta ' + (i + 1) + ': ' + message));
    });
    if (formError(screen, errors)) return;
    quizz.questions = listaPerguntas;
    chamarTelaCriarNiveis();
}

function montarNovaPergunta(title, color, answers) {
    return {title, color, answers};
}

function chamarTelaCriarNiveis() {
    const screen = document.querySelector('.cria-niveis');
    if (!screen.querySelector('.nivel')) montarTelaCriarNiveis(screen);
    showScreen('.cria-niveis');
}

function montarTelaCriarNiveis(screen) {
    screen.innerHTML = '<h1>Agora, decida os níveis!</h1><p class="step-label">Etapa 3 de 3 · Inclua um nível com mínimo de 0%</p>';
    for (let i = 0; i < qtdadeNiveis; i++) screen.insertAdjacentHTML('beforeend', levelFields(i));
    screen.insertAdjacentHTML('beforeend', '<div class="form-actions"><button class="text-button" onclick="if (!saving) showScreen(\'.cria-perguntas\')">← Perguntas</button><button class="finaliza-quizz" onclick="validarTodosNiveis()">Finalizar Quizz</button></div>');
}

function levelFields(index) {
    return `<details class="nivel" data-identifier="level" ${index === 0 ? 'open' : ''}>
        <summary>Nível ${index + 1}</summary>
        <label>Título do nível (mínimo 10 caracteres)<input class="titulo-nivel" type="text" minlength="10" maxlength="150"></label>
        <label>Acerto mínimo (%)<input class="percentual-nivel" type="number" min="0" max="100" step="1"></label>
        <label>Imagem do nível (HTTPS)<input class="url-nivel" type="url" placeholder="https://…"></label>
        <label>Descrição (mínimo 30 caracteres)<textarea class="descricao-nivel" minlength="30" maxlength="1500"></textarea></label>
    </details>`;
}

function validarTodosNiveis() {
    if (saving) return;
    const screen = document.querySelector('.cria-niveis');
    const elements = [...screen.querySelectorAll('.nivel')];
    listaNiveis = elements.map(montarNovoNivel);
    const errors = [];
    if (listaNiveis.length !== qtdadeNiveis) errors.push('Preencha todos os níveis solicitados.');
    listaNiveis.forEach((level, i) => {
        const issues = QuizCore.levelErrors(level);
        if (issues.length) elements[i].open = true;
        errors.push(...issues.map(message => 'Nível ' + (i + 1) + ': ' + message));
    });
    if (!listaNiveis.some(l => l.minValue !== '' && Number(l.minValue) === 0)) errors.push('Inclua um nível com percentual mínimo de 0%.');
    if (new Set(listaNiveis.map(l => Number(l.minValue))).size !== listaNiveis.length) errors.push('Cada nível deve ter um percentual mínimo diferente.');
    if (formError(screen, errors)) return;
    quizz.levels = listaNiveis.map(l => ({...l, minValue: Number(l.minValue)}));
    sendQuizz(quizz);
}

function montarNovoNivel(elemento) {
    return {
        title: elemento.querySelector('.titulo-nivel').value.trim(),
        image: elemento.querySelector('.url-nivel').value.trim(),
        text: elemento.querySelector('.descricao-nivel').value.trim(),
        minValue: elemento.querySelector('.percentual-nivel').value
    };
}

function chamarTelaSucessoCriacaoQuizz() {
    montarTelaSucessoCriacaoQuizz(document.querySelector('.sucesso-quizz'));
    showScreen('.sucesso-quizz');
}

function montarTelaSucessoCriacaoQuizz(screen) {
    screen.innerHTML = `<span class="success-icon" aria-hidden="true">✓</span><h1>Seu quizz está pronto!</h1><p id="save-detail"></p>
        <figure class="fim-criacao-quizz"><img src="${esc(QuizCore.imageURL(quizzRecemCriado.image))}" alt="" width="640" height="400"><figcaption>${esc(quizzRecemCriado.title)}</figcaption></figure>
        <button class="acessar-quizz" onclick="acessarQuizzCriado()">Acessar Quizz</button>
        <button class="voltar-inicio text-button" onclick="voltarInicio()">Voltar ao início</button>`;
    document.querySelectorAll('.vamos-comecar input').forEach(input => {
        if (input.type === 'checkbox') input.checked = false;
        else input.value = '';
    });
    document.querySelector('.cria-perguntas').innerHTML = '';
    document.querySelector('.cria-niveis').innerHTML = '';
    qtdadePerguntas = 0;
    qtdadeNiveis = 0;
}

function acessarQuizzCriado() {
    if (quizzRecemCriado) abrirQuizz({data: quizzRecemCriado});
}

function voltarInicio() {
    paginaInicial();
}


document.addEventListener('error', event => {
    const image = event.target;
    if (image.tagName === 'IMG' && !image.dataset.fallback) {
        image.dataset.fallback = 'true';
        image.src = 'img/fallback.svg';
        image.alt = 'Imagem indisponível';
    }
}, true);
document.querySelector('#quiz-search').addEventListener('input', () => {
    visibleCommunity = 12;
    renderCommunity();
});
document.querySelector('#more-quizzes').addEventListener('click', () => {
    visibleCommunity += 12;
    renderCommunity();
});
getAllQuizz();
