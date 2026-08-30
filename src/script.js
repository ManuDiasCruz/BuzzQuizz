'use strict';

const { escapeHTML, safeImage, integerInRange, shuffle, scoreQuiz, normalizeQuiz } = QuizCore;
const API_URL = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
let quizz = { title: '', image: '', questions: [], levels: [] };
let quizzescolhido;
let identificador;
let catalogo = new Map(QUIZ_SAMPLES.map(quiz => [String(quiz.id), quiz]));
let respondidas = new Set();
let proximoTimer;
let requestVersion = 0;
let envioEmAndamento = false;
let carregandoComunidade = false;

let qtdadePerguntas = 0;
const MIN_PERGUNTAS = 3;
let listaPerguntas = [];

let qtdadeNiveis = 0;
const MIN_NIVEIS = 2;
let listaNiveis = [];

let listaMeusQuizzes = [];

let quizzRecemCriado;


function sendQuizz(quizzPronto) {
    if (envioEmAndamento) return;
    envioEmAndamento = true;
    try {
        const saved = { ...structuredClone(quizzPronto), id: `local-${crypto.randomUUID()}` };
        guardaMeusQuizzesLocalmente(saved);
        quizzRecemCriado = saved;
        catalogo.set(saved.id, saved);
        chamarTelaSucessoCriacaoQuizz();
    } catch {
        mostrarErro(document.querySelector('.cria-niveis'), 'Não foi possível salvar. Verifique o espaço e a permissão de armazenamento. Seus campos foram preservados.');
    } finally { envioEmAndamento = false; }
}

function mandouQuizz(response) {
    const saved = normalizeQuiz(response.data);
    if (!saved?.id) throw new Error('Resposta inválida do servidor.');
    const previousId = quizzRecemCriado.id;
    QuizCore.saveStoredQuiz(localStorage, saved, previousId);
    catalogo.delete(previousId);
    catalogo.set(saved.id, saved);
    quizzRecemCriado = saved;
    const status = document.querySelector('.publish-status');
    if (status) status.textContent = 'Publicado na comunidade e salvo neste navegador.';
    const button = document.querySelector('.publicar-quizz');
    if (button) button.hidden = true;
}

function falhouEnvio() {
    const status = document.querySelector('.publish-status');
    if (status) status.textContent = 'Não foi possível confirmar a publicação. Sua cópia local está salva. Verifique a comunidade antes de tentar novamente.';
}

function guardaMeusQuizzesLocalmente(quiz) {
    return QuizCore.saveStoredQuiz(localStorage, quiz);
}

function getAllQuizzesLocais() {
    try {
        const result = QuizCore.readStoredQuizzes(localStorage);
        listaMeusQuizzes = result.quizzes;
        document.querySelector('.storage-status').textContent = result.warning;
    } catch {
        listaMeusQuizzes = [];
        document.querySelector('.storage-status').textContent = 'Armazenamento indisponível. Você ainda pode jogar os quizzes.';
    }
    listaMeusQuizzes.forEach(quiz => catalogo.set(quiz.id, quiz));
}

function getAllQuizz() {
    getAllQuizzesLocais();
    pegaMeusQuizzes();
    renderCards(document.querySelector('.destaques'), QUIZ_SAMPLES, 'Coleção BuzzQuizz');
    carregarComunidade();
}

function getQuizz(id) {
    identificador = String(id);
    if (catalogo.has(identificador)) {
        abrirQuizz({ data: catalogo.get(identificador) });
        return;
    }
    const version = ++requestVersion;
    apiRequest(`${API_URL}/${encodeURIComponent(id)}`).then(data => {
        if (version === requestVersion) abrirQuizz({ data });
    }).catch(() => { if (version === requestVersion) erroPegouQuizz(); });
}

function pegouQuizz(resposta) {
    if (!Array.isArray(resposta.data)) throw new Error('Catálogo inválido.');
    const seen = new Set(listaMeusQuizzes.map(quiz => quiz.id));
    const valid = [];
    for (const candidate of resposta.data) {
        const quiz = normalizeQuiz(candidate);
        if (!quiz?.id || seen.has(quiz.id)) continue;
        seen.add(quiz.id);
        catalogo.set(quiz.id, quiz);
        valid.push(quiz);
    }
    renderCards(document.querySelector('.quizzes'), valid.slice(0, 60), 'Comunidade');
    document.querySelector('.community-status').textContent = valid.length ?
        `${Math.min(valid.length, 60)} quizzes disponíveis. Conteúdo público, criado pela comunidade.` :
        'Nenhum quizz da comunidade disponível. Experimente nossa coleção ou crie o seu!';
}

function pegaMeusQuizzes() {
    const hasQuizzes = listaMeusQuizzes.length > 0;
    document.querySelector('.meus-quizzes').style.display = hasQuizzes ? 'flex' : 'none';
    document.querySelector('.criarprimeiroquizz').style.display = hasQuizzes ? 'none' : 'flex';
    renderCards(document.querySelector('.quizzes-criados'), listaMeusQuizzes, 'Seu quizz');
}

function embaralha(answers) {
    return shuffle(answers);
}

function abrirQuizz(respostaquizz) {
    const quiz = normalizeQuiz(respostaquizz.data);
    if (!quiz) { erroPegouQuizz(); return; }
    mostrarTela('.pagina-quizz');
    quizzescolhido = quiz;
    identificador = quiz.id;
    questoesrespondidas = 0;
    acertos = 0;
    respondidas = new Set();
    document.querySelector('.fim').innerHTML = '';
    const tela = document.querySelector('.pagina-quizz');
    tela.innerHTML = `<section class="titulo-quizz">
        <img class="quiz-cover" src="${escapeHTML(safeImage(quiz.image))}" alt="">
        <div><p class="eyebrow">HORA DO DESAFIO · ${quiz.questions.length} PERGUNTAS</p>
        <h2 tabindex="-1">${escapeHTML(quiz.title)}</h2></div></section>
        <div class="quiz-toolbar"><button class="secondary" onclick="paginaInicial()">← Voltar ao início</button>
        <p class="quiz-progress" role="status">0 de ${quiz.questions.length} respondidas</p></div>`;
    quiz.questions.forEach((question, x) => {
        question.answers = embaralha(question.answers);
        const section = document.createElement('section');
        section.className = 'perguntas';
        section.innerHTML = `<article data-identifier="question" class="pergunta" id="questao-${x}">
            <p class="question-number">PERGUNTA ${x + 1} DE ${quiz.questions.length}</p>
            <div class="titulo-pergunta" style="background-color:${question.color};color:${corDoTexto(question.color)}">
                <h3 tabindex="-1">${escapeHTML(question.title)}</h3></div>
            <div class="bloco-respostas esse${x}">${question.answers.map((answer, y) => `
                <button data-identifier="answer" class="resposta" data-answer="${y}" onclick="quizzSelecionado(${x},${y})">
                    <img src="${escapeHTML(safeImage(answer.image))}" alt="" loading="lazy" decoding="async">
                    <span>${escapeHTML(answer.text)}</span><small class="answer-feedback"></small>
                </button>`).join('')}</div></article>`;
        tela.append(section);
    });
    instalarFallbacks(tela);
    tela.querySelector('h2').focus({ preventScroll: true });
}

let questoesrespondidas = 0;
let acertos = 0;

function quizzSelecionado(numerodaquestao, opcao) {
    const question = quizzescolhido?.questions[numerodaquestao];
    if (!question?.answers[opcao] || respondidas.has(numerodaquestao)) return;
    respondidas.add(numerodaquestao);
    questoesrespondidas = respondidas.size;
    if (question.answers[opcao].isCorrectAnswer) acertos++;
    document.querySelectorAll(`.esse${numerodaquestao} .resposta`).forEach((button, index) => {
        const correct = question.answers[index].isCorrectAnswer;
        button.disabled = true;
        button.classList.add(correct ? 'acertou' : 'errou');
        if (index === opcao) button.classList.add('escolhida');
        else button.classList.add('nop');
        button.querySelector('.answer-feedback').textContent = correct ? '✓ Resposta correta' : index === opcao ? '✕ Sua resposta' : '';
    });
    document.querySelector('.quiz-progress').textContent = `${questoesrespondidas} de ${quizzescolhido.questions.length} respondidas`;
    clearTimeout(proximoTimer);
    proximoTimer = setTimeout(() => {
        if (questoesrespondidas === quizzescolhido.questions.length) resultadoQuizz();
        else {
            const next = quizzescolhido.questions.findIndex((_, index) => !respondidas.has(index));
            focarElemento(document.querySelector(`#questao-${next} h3`));
        }
    }, 700);
}

function quantidadeAcertos() {
    return scoreQuiz(acertos, quizzescolhido.questions.length, quizzescolhido.levels);
}

function resultadoQuizz() {
    const { percentage, level } = quantidadeAcertos();
    if (!level) return;
    const resultado = document.querySelector('.fim');
    resultado.innerHTML = `<article class="resultado" data-identifier="quizz-result">
        <p class="eyebrow">DESAFIO CONCLUÍDO · ${acertos} DE ${quizzescolhido.questions.length} ACERTOS</p>
        <div class="titulo-resultado"><h3 tabindex="-1">${percentage}% — ${escapeHTML(level.title)}</h3></div>
        <div class="conteudo-reultado"><img src="${escapeHTML(safeImage(level.image))}" alt="Imagem do resultado" decoding="async">
        <span>${escapeHTML(level.text)}</span></div></article>
        <div class="botoes"><button class="reiniciar-quizz" onclick="reiniciarQuizz()">Jogar novamente</button>
        <button class="voltar-inicio" onclick="paginaInicial()">Voltar ao início</button></div>`;
    instalarFallbacks(resultado);
    focarElemento(resultado.querySelector('h3'));
}

function paginaInicial() {
    mostrarTela('.paginaum');
    document.querySelector('.fim').innerHTML = '';
    getAllQuizzesLocais();
    pegaMeusQuizzes();
}

function reiniciarQuizz() {
    abrirQuizz({ data: quizzescolhido });
}

function erroPegouQuizz() {
    document.querySelector('.community-status').textContent = 'Este quizz não está disponível. Escolha outro da coleção ou tente atualizar a comunidade.';
    paginaInicial();
}

function chamarTelaCriarQuizz() {
    mostrarTela('.vamos-comecar');
    melhorarFormulario(document.querySelector('.vamos-comecar'));
}

function validarDadosBasicos() {
    const tela = document.querySelector('.vamos-comecar');
    const titulo = tela.querySelector('.titulo-quizz').value.trim();
    const imagem = tela.querySelector('.url-quizz').value.trim();
    const perguntas = tela.querySelector('.numero-perguntas').value;
    const niveis = tela.querySelector('.quantidade-niveis').value;
    if (titulo.length < 20 || titulo.length > 65) return mostrarErro(tela, 'Use um título com 20 a 65 caracteres.', '.titulo-quizz');
    if (!validarURL(imagem)) return mostrarErro(tela, 'Use uma URL HTTPS completa ou escolha uma foto da coleção.', '.url-quizz');
    if (!integerInRange(perguntas, 3, 30)) return mostrarErro(tela, 'Escolha um número inteiro de 3 a 30 perguntas.', '.numero-perguntas');
    if (!integerInRange(niveis, 2, 10)) return mostrarErro(tela, 'Escolha um número inteiro de 2 a 10 níveis.', '.quantidade-niveis');
    qtdadePerguntas = Number(perguntas);
    qtdadeNiveis = Number(niveis);
    quizz.title = titulo;
    quizz.image = imagem;
    limparErros(tela);
    chamarTelaCriarPerguntas();
}

function chamarTelaCriarPerguntas() {
    const tela = document.querySelector('.cria-perguntas');
    if (Number(tela.dataset.count) !== qtdadePerguntas) {
        montarTelaCriarPerguntas(tela);
        tela.dataset.count = qtdadePerguntas;
    }
    mostrarTela('.cria-perguntas');
    melhorarFormulario(tela);
}

function montarTelaCriarPerguntas(telaCriarPerguntas) {
    telaCriarPerguntas.innerHTML = `
        <p class="step-label">PASSO 2 DE 3</p><h1>Crie suas perguntas</h1><button class="secondary back-step" onclick="chamarTelaCriarQuizz()">← Editar dados básicos</button>
        <div class="pergunta" data-identifier="question">
            <h2>Pergunta 1</h2>
            <div class="cabecalho-pergunta">
                <input class="texto-pergunta" type="text" placeholder="Texto da pergunta" minlength="20" />
                <input class="cor-pergunta" type="color" placeholder="Cor de fundo da pergunta" />
            </div>
            <h2>Resposta correta</h2>
            <div class="resposta-correta">
                <input class="texto-resposta" type="text" placeholder="Resposta correta"  />
                <input class="url-resposta" type="text" inputmode="url" placeholder="URL da imagem" />
            </div>
            <h2>Respostas incorretas</h2>
            <div class="resposta">
                <input class="texto-resposta" type="text" placeholder="Resposta incorreta 1"  />
                <input class="url-resposta" type="text" inputmode="url" placeholder="URL da imagem 1" />
            </div>
            <div class="resposta">
                <input class="texto-resposta" type="text" placeholder="Resposta incorreta 2"  />
                <input class="url-resposta" type="text" inputmode="url" placeholder="URL da imagem 2" />
            </div>
            <div class="resposta">
                <input class="texto-resposta" type="text" placeholder="Resposta incorreta 3"  />
                <input class="url-resposta" type="text" inputmode="url" placeholder="URL da imagem 3" />
            </div>
        </div>
        <div class="nova-pergunta" data-identifier="expand">
            <h2>Pergunta 2</h2>
            <button type="button" class="botaoEditar secondary" onclick="abrirNovaPergunta(this)">Preencher pergunta</button>
        </div>
        <div class="nova-pergunta" data-identifier="expand">
            <h2>Pergunta 3</h2>
            <button type="button" class="botaoEditar secondary" onclick="abrirNovaPergunta(this)">Preencher pergunta</button>
        </div>
    `;

    for (let i = 0; i < (qtdadePerguntas - MIN_PERGUNTAS); i++) {
        telaCriarPerguntas.innerHTML += `
            <div class="nova-pergunta" data-identifier="expand">
                <h2>Pergunta ${MIN_PERGUNTAS+i+1}</h2>
                <button type="button" class="botaoEditar secondary" onclick="abrirNovaPergunta(this)">Preencher pergunta</button>
            </div>
        `;
    }

    telaCriarPerguntas.innerHTML += `
        <button class="prosseguir" onclick="validarTodasPerguntas()">
            <p>Prosseguir pra criar níveis</p>
        </button>
    `;
    telaCriarPerguntas.style.display = "flex";
}

function abrirNovaPergunta(elemento) {
    const novapergunta = elemento.parentNode;
    novapergunta.classList.add("pergunta");
    novapergunta.classList.remove("nova-pergunta");
    novapergunta.removeChild(elemento);
    novapergunta.innerHTML += `
        <div class="cabecalho-pergunta">
            <input class="texto-pergunta" type="text" placeholder="Texto da pergunta" minlength="20" />
            <input class="cor-pergunta" type="color" placeholder="Cor de fundo da pergunta" />
        </div>
        <h2>Resposta correta</h2>
        <div class="resposta-correta">
            <input class="texto-resposta" type="text" placeholder="Resposta correta"  />
            <input class="url-resposta" type="text" inputmode="url" placeholder="URL da imagem" />
        </div>
        <h2>Respostas incorretas</h2>
        <div class="resposta">
            <input class="texto-resposta" type="text" placeholder="Resposta incorreta 1"  />
            <input class="url-resposta" type="text" inputmode="url" placeholder="URL da imagem 1" />
        </div>
        <div class="resposta">
            <input class="texto-resposta" type="text" placeholder="Resposta incorreta 2"  />
            <input class="url-resposta" type="text" inputmode="url" placeholder="URL da imagem 2" />
        </div>
        <div class="resposta">
            <input class="texto-resposta" type="text" placeholder="Resposta incorreta 3"  />
            <input class="url-resposta" type="text" inputmode="url" placeholder="URL da imagem 3" />
        </div>
    `;

    melhorarFormulario(novapergunta);
    novapergunta.style.display = "flex";
    novapergunta.style.flexDirection = "column";
    novapergunta.style.justifyContent = "center";
}

function montarNovaResposta(elementoResposta) {
    return {
        text: elementoResposta.querySelector('.texto-resposta').value.trim(),
        image: elementoResposta.querySelector('.url-resposta').value.trim(),
        isCorrectAnswer: elementoResposta.classList.contains('resposta-correta')
    };
}

function validarTodasPerguntas() {
    const tela = document.querySelector('.cria-perguntas');
    const perguntas = [...tela.querySelectorAll('.pergunta')];
    if (perguntas.length !== qtdadePerguntas) return mostrarErro(tela, 'Abra e preencha todas as perguntas antes de continuar.');
    limparErros(tela);
    for (const pergunta of perguntas) if (!validarDadosPergunta(pergunta)) return;
    listaPerguntas = perguntas.map(pergunta => montarNovaPergunta(
        pergunta.querySelector('.texto-pergunta').value.trim(), pergunta.querySelector('.cor-pergunta').value,
        [...pergunta.querySelectorAll('.resposta-correta, .resposta')].map(montarNovaResposta).filter(answer => answer.text)
    ));
    quizz.questions = listaPerguntas;
    chamarTelaCriarNiveis();
}

function montarNovaPergunta(titulo, cor, listaRespostas) {
    return { title: titulo, color: cor, answers: listaRespostas };
}

function chamarTelaCriarNiveis() {
    const tela = document.querySelector('.cria-niveis');
    if (Number(tela.dataset.count) !== qtdadeNiveis) {
        montarTelaCriarNiveis(tela);
        tela.dataset.count = qtdadeNiveis;
    }
    mostrarTela('.cria-niveis');
    melhorarFormulario(tela);
}

function montarTelaCriarNiveis(telaCriarNiveis) {
    telaCriarNiveis.innerHTML = `
        <p class="step-label">PASSO 3 DE 3</p><h1>Agora, decida os níveis!</h1><button class="secondary back-step" onclick="chamarTelaCriarPerguntas()">← Editar perguntas</button>
        <div class="nivel" data-identifier="level">
            <h2>Nível 1</h2>
            <input class="titulo-nivel" type="text" placeholder="Título do nível" minlength="10" />
            <input class="percentual-nivel" type="number" placeholder="% de acerto mínima" min="0" max="100" />
            <input class="url-nivel" type="text" inputmode="url" placeholder="URL da imagem do nível" />
            <textarea class="descricao-nivel" type="text" placeholder="Descrição do nível" minlength="30"></textarea>
        </div>
        <div class="novo-nivel" data-identifier="expand">
            <h2>Nível 2</h2>
            <button type="button" class="botaoEditar secondary" onclick="abrirNovoNivel(this)">Preencher nível</button>
        </div>        
    `;
    for (let i = 0; i < (qtdadeNiveis - MIN_NIVEIS); i++) {
        telaCriarNiveis.innerHTML += `
            <div class="novo-nivel" data-identifier="expand">
                <h2>Nível ${MIN_NIVEIS+i+1}</h2>
                <button type="button" class="botaoEditar secondary" onclick="abrirNovoNivel(this)">Preencher nível</button>
            </div>
        `;
    }

    telaCriarNiveis.innerHTML += `
        <button class="finaliza-quizz" onclick="validarTodosNiveis()">
            <p>Salvar quizz neste navegador</p>
        </button>
    `;
    telaCriarNiveis.style.display = "flex";
}

function abrirNovoNivel(elemento) {
    const novoNível = elemento.parentNode;
    novoNível.classList.add("nivel");
    novoNível.classList.remove("novo-nivel");
    novoNível.removeChild(elemento);
    novoNível.innerHTML += `
        <input class="titulo-nivel" type="text" placeholder="Título do nível" minlength="10" />
        <input class="percentual-nivel" type="number" placeholder="% de acerto mínima" min="0" max="100" />
        <input class="url-nivel" type="text" inputmode="url" placeholder="URL da imagem do nível" />
        <textarea class="descricao-nivel" type="text" placeholder="Descrição do nível" minlength="30"></textarea>
    `;

    melhorarFormulario(novoNível);
    novoNível.style.display = "flex";
    novoNível.style.flexDirection = "column";
    novoNível.style.justifyContent = "center";
}

function validarTodosNiveis() {
    const tela = document.querySelector('.cria-niveis');
    const niveis = [...tela.querySelectorAll('.nivel')];
    if (niveis.length !== qtdadeNiveis) return mostrarErro(tela, 'Abra e preencha todos os níveis antes de salvar.');
    limparErros(tela);
    for (const nivel of niveis) if (!validarDadosNivel(nivel)) return;
    listaNiveis = niveis.map(montarNovoNivel);
    if (!listaNiveis.some(nivel => nivel.minValue === 0)) return mostrarErro(tela, 'Inclua um nível com pontuação mínima de 0%.');
    if (new Set(listaNiveis.map(nivel => nivel.minValue)).size !== listaNiveis.length) return mostrarErro(tela, 'Cada nível deve ter uma pontuação mínima diferente.');
    quizz.levels = listaNiveis;
    sendQuizz(quizz);
}

function montarNovoNivel(nivel) {
    return {
        title: nivel.querySelector('.titulo-nivel').value.trim(),
        image: nivel.querySelector('.url-nivel').value.trim(),
        text: nivel.querySelector('.descricao-nivel').value.trim(),
        minValue: Number(nivel.querySelector('.percentual-nivel').value)
    };
}

function chamarTelaSucessoCriacaoQuizz() {
    montarTelaSucessoCriacaoQuizz(document.querySelector('.sucesso-quizz'));
    mostrarTela('.sucesso-quizz');
    document.querySelector('.cria-perguntas').removeAttribute('data-count');
    document.querySelector('.cria-niveis').removeAttribute('data-count');
    document.querySelectorAll('.vamos-comecar input').forEach(input => { input.value = ''; });
}

function montarTelaSucessoCriacaoQuizz(tela) {
    tela.innerHTML = `<p class="step-label">PRONTO PARA JOGAR</p><h1>Seu quizz está pronto!</h1>
        <figure class="fim-criacao-quizz"><img src="${escapeHTML(safeImage(quizzRecemCriado.image))}" alt="Capa do seu quizz">
        <figcaption>${escapeHTML(quizzRecemCriado.title)}</figcaption></figure>
        <p class="publish-status" role="status">Salvo neste navegador. Limpar os dados do site remove seus quizzes.</p>
        <button class="acessar-quizz" onclick="acessarQuizzCriado()">Jogar meu quizz</button>
        <button class="publicar-quizz secondary" onclick="publicarQuizz()">Publicar na comunidade (público)</button>
        <p class="helper">Publicar envia o título, perguntas, respostas, níveis e URLs das imagens à API pública da Driven. Não inclua dados pessoais.</p>
        <button class="voltar-inicio secondary" onclick="voltarInicio()">Voltar ao início</button>`;
    instalarFallbacks(tela);
}

function acessarQuizzCriado() {
    getQuizz(quizzRecemCriado.id);
    document.querySelector(".sucesso-quizz").style.display = "none";
}

function voltarInicio() {
    paginaInicial();
}

function validarDadosPergunta(elemento) {
    const titulo = elemento.querySelector('.texto-pergunta').value.trim();
    if (titulo.length < 20 || titulo.length > 200) return mostrarErro(elemento, 'Escreva uma pergunta com 20 a 200 caracteres.', '.texto-pergunta');
    const blocos = [...elemento.querySelectorAll('.resposta-correta, .resposta')];
    let incorretas = 0;
    for (const bloco of blocos) {
        const answer = montarNovaResposta(bloco);
        if (!answer.text && !answer.image && !answer.isCorrectAnswer) continue;
        if (!answer.text || answer.text.length > 200 || !validarURL(answer.image)) return mostrarErro(bloco, 'Preencha texto (até 200 caracteres) e imagem HTTPS da mesma resposta.', !answer.text ? '.texto-resposta' : '.url-resposta');
        if (!answer.isCorrectAnswer) incorretas++;
    }
    if (!incorretas) return mostrarErro(elemento, 'Inclua pelo menos uma resposta incorreta completa.');
    return true;
}

function validarDadosNivel(elemento) {
    const titulo = elemento.querySelector('.titulo-nivel').value.trim();
    const percentual = elemento.querySelector('.percentual-nivel').value;
    const imagem = elemento.querySelector('.url-nivel').value.trim();
    const descricao = elemento.querySelector('.descricao-nivel').value.trim();
    if (titulo.length < 10 || titulo.length > 100) return mostrarErro(elemento, 'Use um título de nível com 10 a 100 caracteres.', '.titulo-nivel');
    if (!integerInRange(percentual, 0, 100)) return mostrarErro(elemento, 'Informe um percentual inteiro entre 0 e 100. Não deixe vazio.', '.percentual-nivel');
    if (!validarURL(imagem)) return mostrarErro(elemento, 'Escolha uma foto ou informe uma URL HTTPS completa.', '.url-nivel');
    if (descricao.length < 30 || descricao.length > 1000) return mostrarErro(elemento, 'Use uma descrição com 30 a 1000 caracteres.', '.descricao-nivel');
    return true;
}

function validarURL(texto) {
    return QuizCore.validImageURL(texto);
}


async function apiRequest(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } finally { clearTimeout(timeout); }
}

async function carregarComunidade() {
    if (carregandoComunidade) return;
    carregandoComunidade = true;
    const button = document.querySelector('.retry-community');
    button.disabled = true;
    document.querySelector('.community-status').textContent = 'Buscando quizzes da comunidade…';
    try { pegouQuizz({ data: await apiRequest(API_URL) }); }
    catch { document.querySelector('.community-status').textContent = 'Comunidade indisponível no momento. A coleção e seus quizzes salvos continuam funcionando.'; }
    finally { carregandoComunidade = false; button.disabled = false; }
}

async function publicarQuizz() {
    if (envioEmAndamento || !quizzRecemCriado?.id.startsWith('local-')) return;
    envioEmAndamento = true;
    const button = document.querySelector('.publicar-quizz');
    button.disabled = true;
    document.querySelector('.publish-status').textContent = 'Publicando… Sua cópia local já está salva.';
    try {
        const payload = structuredClone(quizzRecemCriado);
        delete payload.id;
        const absolute = value => new URL(value, document.baseURI).href;
        payload.image = absolute(payload.image);
        payload.questions.forEach(question => question.answers.forEach(answer => { answer.image = absolute(answer.image); }));
        payload.levels.forEach(level => { level.image = absolute(level.image); });
        mandouQuizz({ data: await apiRequest(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }) });
    } catch { falhouEnvio(); }
    finally { envioEmAndamento = false; button.disabled = false; }
}

function mostrarTela(selector) {
    clearTimeout(proximoTimer);
    requestVersion++;
    document.querySelectorAll('.paginaum, .pagina-quizz, .cria-quizz main').forEach(tela => { tela.style.display = 'none'; });
    document.querySelector('.fim').innerHTML = '';
    const tela = document.querySelector(selector);
    tela.style.display = selector === '.pagina-quizz' ? 'block' : 'flex';
    const heading = tela.querySelector('h1, h2');
    if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function focarElemento(elemento) {
    if (!elemento) return;
    elemento.focus({ preventScroll: true });
    elemento.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
}

function corDoTexto(hex) {
    const rgb = [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255)
        .map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722 > 0.179 ? '#161616' : '#ffffff';
}

function instalarFallbacks(container) {
    container.querySelectorAll('img').forEach(image => {
        image.addEventListener('error', () => { image.src = QuizCore.FALLBACK_IMAGE; }, { once: true });
        if (image.complete && !image.naturalWidth) image.src = QuizCore.FALLBACK_IMAGE;
    });
}

function renderCards(container, quizzes, label) {
    container.replaceChildren();
    quizzes.forEach(quiz => {
        const card = document.createElement('button');
        card.className = 'quiz-card';
        card.type = 'button';
        card.innerHTML = `<img src="${escapeHTML(safeImage(quiz.image))}" alt="" loading="lazy" decoding="async">
            <span class="card-info"><small>${escapeHTML(label)} · ${quiz.questions.length} perguntas</small>
            <strong>${escapeHTML(quiz.title)}</strong><span class="card-cta">Jogar agora <span aria-hidden="true">↗</span></span></span>`;
        card.addEventListener('click', () => getQuizz(quiz.id));
        container.append(card);
    });
    instalarFallbacks(container);
}

function limparErros(container) {
    container.querySelectorAll('.form-error').forEach(error => error.remove());
    container.querySelectorAll('[aria-invalid]').forEach(input => { input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby'); });
}

let fieldId = 0;
function mostrarErro(container, message, selector) {
    limparErros(container);
    const error = document.createElement('p');
    error.className = 'form-error';
    error.id = `erro-${++fieldId}`;
    error.setAttribute('role', 'alert');
    error.tabIndex = -1;
    error.textContent = message;
    container.prepend(error);
    const input = selector ? container.querySelector(selector) : null;
    if (input) { input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', error.id); }
    focarElemento(input || error);
    return false;
}

function melhorarFormulario(container) {
    container.querySelectorAll('input, textarea').forEach(input => {
        if (input.dataset.enhanced) return;
        input.dataset.enhanced = 'true';
        input.id = `campo-${++fieldId}`;
        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = input.placeholder || 'Cor de fundo da pergunta';
        input.before(label);
        if (input.className.includes('url-')) {
            const select = document.createElement('select');
            select.setAttribute('aria-label', `Escolher foto: ${label.textContent}`);
            select.innerHTML = '<option value="">Ou escolha uma foto da coleção…</option>' + QUIZ_IMAGES.map(image =>
                `<option value="${image.path}">${image.label}</option>`).join('');
            select.addEventListener('change', () => { if (select.value) input.value = select.value; });
            input.after(select);
        }
    });
}

if (typeof document !== 'undefined') getAllQuizz();
