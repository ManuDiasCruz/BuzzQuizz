const API_URL = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
const STORAGE_PREFIX = "buzzquizz:v2:";
const MIN_PERGUNTAS = 3;
const MIN_NIVEIS = 2;
const FALLBACK_IMAGES = [
    "img/pixabay/aurora.jpg",
    "img/pixabay/coral-reef.jpg",
    "img/pixabay/galaxy.jpg",
    "img/pixabay/hummingbird.jpg",
    "img/pixabay/mountain-lake.jpg",
    "img/pixabay/red-panda.jpg"
];

const FEATURED_QUIZ = {
    id: "natureza-em-foco-v2",
    title: "Natureza em foco: do recife ao céu",
    image: "img/pixabay/aurora.jpg",
    isLocal: true,
    questions: [
        {
            title: "Qual destes animais consegue pairar no ar durante o voo?",
            color: "#176B5B",
            answers: [
                { text: "Beija-flor", image: "img/pixabay/hummingbird.jpg", isCorrectAnswer: true },
                { text: "Panda-vermelho", image: "img/pixabay/red-panda.jpg", isCorrectAnswer: false },
                { text: "Peixe de recife", image: "img/pixabay/coral-reef.jpg", isCorrectAnswer: false },
                { text: "Nenhum deles", image: "img/pixabay/mountain-lake.jpg", isCorrectAnswer: false }
            ]
        },
        {
            title: "Em qual ambiente encontramos colônias formadas por corais?",
            color: "#1565A8",
            answers: [
                { text: "Recife tropical", image: "img/pixabay/coral-reef.jpg", isCorrectAnswer: true },
                { text: "Lago alpino", image: "img/pixabay/mountain-lake.jpg", isCorrectAnswer: false },
                { text: "Espaço profundo", image: "img/pixabay/galaxy.jpg", isCorrectAnswer: false },
                { text: "Céu polar", image: "img/pixabay/aurora.jpg", isCorrectAnswer: false }
            ]
        },
        {
            title: "Qual fenômeno surge quando partículas solares interagem com a atmosfera?",
            color: "#57348C",
            answers: [
                { text: "Aurora polar", image: "img/pixabay/aurora.jpg", isCorrectAnswer: true },
                { text: "Formação de recifes", image: "img/pixabay/coral-reef.jpg", isCorrectAnswer: false },
                { text: "Erosão de montanhas", image: "img/pixabay/mountain-lake.jpg", isCorrectAnswer: false },
                { text: "Rotação de galáxias", image: "img/pixabay/galaxy.jpg", isCorrectAnswer: false }
            ]
        }
    ],
    levels: [
        {
            title: "Observador curioso",
            image: "img/pixabay/red-panda.jpg",
            text: "Você começou a explorar a natureza e já encontrou bons motivos para continuar descobrindo.",
            minValue: 0
        },
        {
            title: "Explorador da natureza",
            image: "img/pixabay/mountain-lake.jpg",
            text: "Você conectou diferentes ambientes e fenômenos. Seu olhar para a natureza está bem afiado.",
            minValue: 67
        },
        {
            title: "Especialista do planeta",
            image: "img/pixabay/galaxy.jpg",
            text: "Pontuação perfeita! Você reconhece fenômenos da vida, dos oceanos e até do céu noturno.",
            minValue: 100
        }
    ]
};

let qtdadePerguntas = 0;
let qtdadeNiveis = 0;
let listaPerguntas = [];
let listaNiveis = [];
let listaMeusQuizzes = [];
let quizzRecemCriado = null;
let quizzescolhido = null;
let quizBaseAtual = null;
let identificador = null;
let questoesrespondidas = 0;
let acertos = 0;
let porcentagemarredondada = 0;

let quizz = novoQuizzVazio();

function novoQuizzVazio() {
    return {
        title: "",
        image: "",
        questions: [],
        levels: []
    };
}

function clonarDados(dados) {
    return JSON.parse(JSON.stringify(dados));
}

function escaparHtml(texto) {
    return String(texto ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function indiceImagemFallback(valor) {
    const texto = String(valor ?? "fallback");
    const total = [...texto].reduce((soma, caractere) => soma + caractere.charCodeAt(0), 0);
    return total % FALLBACK_IMAGES.length;
}

function imagemSegura(url, referencia = "") {
    if (typeof url === "string" && (url.startsWith("img/") || QuizUtils.isValidHttpUrl(url))) {
        return url;
    }

    return FALLBACK_IMAGES[indiceImagemFallback(referencia)];
}

function usarImagemFallback(imagem, referencia = "") {
    imagem.onerror = null;
    imagem.src = FALLBACK_IMAGES[indiceImagemFallback(referencia)];
}

function criarCardQuiz(quiz, { destaque = false, proprio = false } = {}) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "quiz-card";
    card.setAttribute("aria-label", `Abrir quiz: ${quiz.title}`);

    const imagem = document.createElement("img");
    imagem.src = imagemSegura(quiz.image, quiz.id || quiz.title);
    imagem.alt = "";
    imagem.loading = "lazy";
    imagem.addEventListener("error", () => usarImagemFallback(imagem, quiz.id || quiz.title));

    const sobreposicao = document.createElement("span");
    sobreposicao.className = "quiz-card-overlay";

    const titulo = document.createElement("h3");
    titulo.textContent = quiz.title;
    sobreposicao.appendChild(titulo);

    if (destaque || proprio) {
        const selo = document.createElement("span");
        selo.className = "quiz-card-badge";
        selo.textContent = destaque ? "Destaque v2" : "Seu quiz";
        card.appendChild(selo);
    }

    card.append(imagem, sobreposicao);
    card.addEventListener("click", () => {
        if (quiz.isLocal) {
            abrirQuizz({ data: quiz });
        } else {
            getQuizz(quiz.id);
        }
    });

    return card;
}

function renderizarCards(container, quizzes, opcoes = {}) {
    if (!opcoes.adicionar) {
        container.replaceChildren();
    }

    quizzes.forEach((quizAtual) => {
        container.appendChild(criarCardQuiz(quizAtual, opcoes));
    });
}

function guardaMeusQuizzesLocalmente(quizCriado) {
    localStorage.setItem(`${STORAGE_PREFIX}${quizCriado.id}`, JSON.stringify(quizCriado));
}

function getAllQuizzesLocais() {
    listaMeusQuizzes = [];

    for (let indice = 0; indice < localStorage.length; indice++) {
        const chave = localStorage.key(indice);
        const ehChaveAtual = chave?.startsWith(STORAGE_PREFIX);
        const ehChaveLegada = /^\d+$/.test(chave || "");

        if (!ehChaveAtual && !ehChaveLegada) {
            continue;
        }

        try {
            const quizLocal = JSON.parse(localStorage.getItem(chave));
            if (quizLocal?.id && quizLocal?.title && Array.isArray(quizLocal.questions)) {
                listaMeusQuizzes.push(quizLocal);
            }
        } catch (_error) {
            // Ignora apenas entradas inválidas, sem afetar os demais dados da origem.
        }
    }

    return listaMeusQuizzes;
}

function pegaMeusQuizzes() {
    const quizzesLocais = getAllQuizzesLocais();
    const secaoMeusQuizzes = document.querySelector(".paginaum .meus-quizzes");
    const introducaoCriacao = document.querySelector(".paginaum .criarprimeiroquizz");

    if (quizzesLocais.length === 0) {
        secaoMeusQuizzes.style.display = "none";
        introducaoCriacao.style.display = "flex";
        return;
    }

    introducaoCriacao.style.display = "none";
    secaoMeusQuizzes.style.display = "flex";
    renderizarCards(document.querySelector(".quizzes-criados"), quizzesLocais, { proprio: true });
}

function getAllQuizz() {
    pegaMeusQuizzes();

    const todosOsQuizzes = document.querySelector(".quizzes");
    const status = document.querySelector("#quiz-status");
    renderizarCards(todosOsQuizzes, [FEATURED_QUIZ], { destaque: true });
    status.textContent = "Carregando quizzes da comunidade…";

    if (typeof axios === "undefined") {
        erroPegouQuizz();
        return;
    }

    axios.get(API_URL)
        .then(pegouQuizz)
        .catch(erroPegouQuizz);
}

function pegouQuizz(resposta) {
    const quizzesServidor = Array.isArray(resposta.data) ? resposta.data : [];
    const todosOsQuizzes = document.querySelector(".quizzes");
    const status = document.querySelector("#quiz-status");

    renderizarCards(todosOsQuizzes, quizzesServidor, { adicionar: true });
    status.textContent = quizzesServidor.length > 0
        ? `${quizzesServidor.length + 1} quizzes disponíveis`
        : "O quiz em destaque está disponível para jogar.";
}

function getQuizz(idDoQuiz) {
    identificador = idDoQuiz;

    if (typeof axios === "undefined") {
        erroPegouQuizz();
        return;
    }

    axios.get(`${API_URL}/${encodeURIComponent(idDoQuiz)}`)
        .then(abrirQuizz)
        .catch(erroPegouQuizz);
}

function resetarEstadoDoQuiz() {
    questoesrespondidas = 0;
    acertos = 0;
    porcentagemarredondada = 0;
    document.querySelector(".fim").replaceChildren();
}

function abrirQuizz(respostaquizz) {
    const quizRecebido = respostaquizz?.data;

    if (!quizRecebido?.title || !Array.isArray(quizRecebido.questions) || quizRecebido.questions.length === 0) {
        erroPegouQuizz();
        return;
    }

    resetarEstadoDoQuiz();
    quizBaseAtual = clonarDados(quizRecebido);
    quizzescolhido = clonarDados(quizRecebido);

    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "none";

    const paginaQuiz = document.querySelector(".pagina-quizz");
    paginaQuiz.style.display = "block";
    paginaQuiz.replaceChildren();

    const hero = document.createElement("section");
    hero.className = "titulo-quizz";
    const imagemDoQuiz = imagemSegura(quizzescolhido.image, quizzescolhido.title);
    hero.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.42)), url("${imagemDoQuiz}")`;

    const tituloHero = document.createElement("h2");
    tituloHero.textContent = quizzescolhido.title;
    hero.appendChild(tituloHero);
    paginaQuiz.appendChild(hero);

    quizzescolhido.questions.forEach((perguntaAtual, indicePergunta) => {
        const secao = document.createElement("section");
        secao.className = "perguntas";

        const artigo = document.createElement("article");
        artigo.className = "pergunta";
        artigo.id = `question-${indicePergunta}`;
        artigo.dataset.identifier = "question";

        const cabecalho = document.createElement("div");
        cabecalho.className = "titulo-pergunta";
        cabecalho.style.backgroundColor = /^#[0-9a-f]{6}$/i.test(perguntaAtual.color) ? perguntaAtual.color : "#434ca0";

        const tituloPergunta = document.createElement("h3");
        const contador = document.createElement("span");
        contador.className = "question-counter";
        contador.textContent = `Pergunta ${indicePergunta + 1} de ${quizzescolhido.questions.length}`;
        tituloPergunta.append(contador, document.createTextNode(perguntaAtual.title));
        cabecalho.appendChild(tituloPergunta);

        const blocoRespostas = document.createElement("div");
        blocoRespostas.className = "bloco-respostas";

        const respostasEmbaralhadas = QuizUtils.shuffle(perguntaAtual.answers || []);
        respostasEmbaralhadas.forEach((respostaAtual, indiceResposta) => {
            const resposta = document.createElement("button");
            resposta.type = "button";
            resposta.className = "resposta";
            resposta.dataset.identifier = "answer";
            resposta.dataset.questionIndex = String(indicePergunta);
            resposta.dataset.correct = String(Boolean(respostaAtual.isCorrectAnswer));

            const imagem = document.createElement("img");
            imagem.src = imagemSegura(respostaAtual.image, `${indicePergunta}-${indiceResposta}`);
            imagem.alt = respostaAtual.text;
            imagem.loading = "lazy";
            imagem.addEventListener("error", () => usarImagemFallback(imagem, `${indicePergunta}-${indiceResposta}`));

            const texto = document.createElement("h4");
            texto.textContent = respostaAtual.text;
            resposta.append(imagem, texto);
            resposta.addEventListener("click", () => quizzSelecionado(indicePergunta, resposta));
            blocoRespostas.appendChild(resposta);
        });

        artigo.append(cabecalho, blocoRespostas);
        secao.appendChild(artigo);
        paginaQuiz.appendChild(secao);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function quizzSelecionado(numeroDaQuestao, escolha) {
    if (escolha.disabled) {
        return;
    }

    const opcoes = document.querySelectorAll(`[data-question-index="${numeroDaQuestao}"]`);
    opcoes.forEach((opcao) => {
        opcao.disabled = true;
        const ehCorreta = opcao.dataset.correct === "true";
        opcao.classList.add(ehCorreta ? "acertou" : "errou");

        if (opcao !== escolha) {
            opcao.classList.add("nop");
        }
    });

    escolha.classList.add("escolhida");
    if (escolha.dataset.correct === "true") {
        acertos++;
    }

    questoesrespondidas++;
    quantidadeAcertos();

    window.setTimeout(() => {
        if (questoesrespondidas === quizzescolhido.questions.length) {
            resultadoQuizz();
            return;
        }

        document.querySelector(`#question-${numeroDaQuestao + 1}`)?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 650);
}

function quantidadeAcertos() {
    porcentagemarredondada = QuizUtils.calculatePercentage(acertos, quizzescolhido.questions.length);
    return porcentagemarredondada;
}

function resultadoQuizz() {
    const nivel = QuizUtils.selectLevel(quizzescolhido.levels, porcentagemarredondada);
    const areaResultado = document.querySelector(".fim");

    if (!nivel) {
        areaResultado.innerHTML = '<p class="status-message">Este quiz não possui níveis de resultado válidos.</p>';
        return;
    }

    areaResultado.innerHTML = `
        <article class="resultado" data-identifier="quizz-result">
            <div class="titulo-resultado">
                <h3>${porcentagemarredondada}% — ${escaparHtml(nivel.title)}</h3>
            </div>
            <div class="conteudo-resultado">
                <img src="${escaparHtml(imagemSegura(nivel.image, nivel.title))}" alt="Resultado: ${escaparHtml(nivel.title)}">
                <p>${escaparHtml(nivel.text)}</p>
            </div>
        </article>
        <div class="botoes">
            <button class="reiniciar-quizz" type="button" onclick="reiniciarQuizz()">Reiniciar quiz</button>
            <button class="voltar-inicio" type="button" onclick="paginaInicial()">Voltar para o início</button>
        </div>`;

    const imagemResultado = areaResultado.querySelector("img");
    imagemResultado.addEventListener("error", () => usarImagemFallback(imagemResultado, nivel.title));
    areaResultado.querySelector(".resultado").scrollIntoView({ behavior: "smooth", block: "start" });
}

function paginaInicial() {
    window.location.reload();
}

function reiniciarQuizz() {
    if (quizBaseAtual) {
        abrirQuizz({ data: quizBaseAtual });
    }
}

function erroPegouQuizz(error) {
    const status = document.querySelector("#quiz-status");
    if (status) {
        status.textContent = "Não foi possível carregar a comunidade agora. O quiz em destaque continua disponível.";
    }

    if (error && document.querySelector(".paginaum").style.display === "none") {
        alert("Não foi possível abrir este quiz. Tente novamente em instantes.");
    }
}

function chamarTelaCriarQuizz() {
    quizz = novoQuizzVazio();
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "none";
    document.querySelector(".fim").replaceChildren();
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "flex";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function validarDadosBasicos() {
    const tituloQuizz = document.querySelector(".vamos-comecar .titulo-quizz").value.trim();
    const imagemQuizz = document.querySelector(".vamos-comecar .url-quizz").value.trim();
    qtdadePerguntas = Number.parseInt(document.querySelector(".vamos-comecar .numero-perguntas").value, 10);
    qtdadeNiveis = Number.parseInt(document.querySelector(".vamos-comecar .quantidade-niveis").value, 10);

    const erros = [];
    if (tituloQuizz.length < 20 || tituloQuizz.length > 65) {
        erros.push("O título deve ter entre 20 e 65 caracteres.");
    }
    if (!validarURL(imagemQuizz)) {
        erros.push("Informe uma URL http ou https válida para a imagem.");
    }
    if (!Number.isInteger(qtdadePerguntas) || qtdadePerguntas < MIN_PERGUNTAS) {
        erros.push(`O quiz deve ter pelo menos ${MIN_PERGUNTAS} perguntas.`);
    }
    if (!Number.isInteger(qtdadeNiveis) || qtdadeNiveis < MIN_NIVEIS) {
        erros.push(`O quiz deve ter pelo menos ${MIN_NIVEIS} níveis.`);
    }

    if (erros.length > 0) {
        alert(erros.join("\n"));
        return;
    }

    quizz.title = tituloQuizz;
    quizz.image = imagemQuizz;
    chamarTelaCriarPerguntas();
}

function chamarTelaCriarPerguntas() {
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "none";
    montarTelaCriarPerguntas(document.querySelector(".cria-quizz .cria-perguntas"));
}

function camposPergunta(numero) {
    return `
        <h2>Pergunta ${numero}</h2>
        <div class="cabecalho-pergunta">
            <input class="texto-pergunta" type="text" placeholder="Texto da pergunta" minlength="20" aria-label="Texto da pergunta ${numero}">
            <input class="cor-pergunta" type="color" value="#434ca0" aria-label="Cor da pergunta ${numero}">
        </div>
        <h2>Resposta correta</h2>
        <div class="resposta-correta">
            <input class="texto-resposta" type="text" placeholder="Resposta correta" aria-label="Resposta correta da pergunta ${numero}">
            <input class="url-resposta" type="url" placeholder="URL da imagem" aria-label="Imagem da resposta correta da pergunta ${numero}">
        </div>
        <h2>Respostas incorretas</h2>
        ${[1, 2, 3].map((indice) => `
            <div class="resposta">
                <input class="texto-resposta" type="text" placeholder="Resposta incorreta ${indice}" aria-label="Resposta incorreta ${indice} da pergunta ${numero}">
                <input class="url-resposta" type="url" placeholder="URL da imagem ${indice}" aria-label="Imagem da resposta incorreta ${indice} da pergunta ${numero}">
            </div>`).join("")}`;
}

function montarTelaCriarPerguntas(telaCriarPerguntas) {
    telaCriarPerguntas.innerHTML = "<h1>Crie suas perguntas</h1>";

    for (let numero = 1; numero <= qtdadePerguntas; numero++) {
        if (numero === 1) {
            telaCriarPerguntas.insertAdjacentHTML("beforeend", `<div class="pergunta" data-identifier="question">${camposPergunta(numero)}</div>`);
        } else {
            telaCriarPerguntas.insertAdjacentHTML("beforeend", `
                <div class="nova-pergunta" data-identifier="expand">
                    <h2>Pergunta ${numero}</h2>
                    <button class="botaoEditar" type="button" onclick="abrirNovaPergunta(this)" aria-label="Editar pergunta ${numero}">
                        <img src="img/editar.png" alt="">
                    </button>
                </div>`);
        }
    }

    telaCriarPerguntas.insertAdjacentHTML("beforeend", `
        <button class="prosseguir" type="button" onclick="validarTodasPerguntas()">Prosseguir para criar níveis</button>`);
    telaCriarPerguntas.style.display = "flex";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function abrirNovaPergunta(elemento) {
    const novaPergunta = elemento.parentNode;
    const numero = novaPergunta.querySelector("h2").textContent.match(/\d+/)?.[0];
    novaPergunta.classList.add("pergunta");
    novaPergunta.classList.remove("nova-pergunta");
    novaPergunta.innerHTML = camposPergunta(numero);
}

function montarNovaResposta(elementoResposta) {
    return {
        text: elementoResposta.querySelector(".texto-resposta").value.trim(),
        image: elementoResposta.querySelector(".url-resposta").value.trim(),
        isCorrectAnswer: elementoResposta.classList.contains("resposta-correta")
    };
}

function validarTodasPerguntas() {
    const divsPerguntas = document.querySelectorAll(".cria-quizz .cria-perguntas .pergunta");
    if (divsPerguntas.length !== qtdadePerguntas) {
        alert("Abra e preencha todas as perguntas antes de continuar.");
        return;
    }

    for (const perguntaAtual of divsPerguntas) {
        if (!validarDadosPergunta(perguntaAtual)) {
            perguntaAtual.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }
    }

    listaPerguntas = [...divsPerguntas].map((perguntaAtual) => {
        const respostas = [montarNovaResposta(perguntaAtual.querySelector(".resposta-correta"))];

        perguntaAtual.querySelectorAll(":scope > .resposta").forEach((respostaIncorreta) => {
            if (respostaIncorreta.querySelector(".texto-resposta").value.trim()) {
                respostas.push(montarNovaResposta(respostaIncorreta));
            }
        });

        return montarNovaPergunta(
            perguntaAtual.querySelector(".texto-pergunta").value.trim(),
            perguntaAtual.querySelector(".cor-pergunta").value,
            respostas
        );
    });

    quizz.questions = listaPerguntas;
    chamarTelaCriarNiveis();
}

function montarNovaPergunta(titulo, cor, listaRespostas) {
    return {
        title: titulo,
        color: cor,
        answers: listaRespostas
    };
}

function chamarTelaCriarNiveis() {
    document.querySelector(".cria-quizz .cria-perguntas").style.display = "none";
    montarTelaCriarNiveis(document.querySelector(".cria-quizz .cria-niveis"));
}

function camposNivel(numero) {
    return `
        <h2>Nível ${numero}</h2>
        <input class="titulo-nivel" type="text" placeholder="Título do nível" minlength="10" aria-label="Título do nível ${numero}">
        <input class="percentual-nivel" type="number" placeholder="% de acerto mínima" min="0" max="100" aria-label="Percentual mínimo do nível ${numero}">
        <input class="url-nivel" type="url" placeholder="URL da imagem do nível" aria-label="Imagem do nível ${numero}">
        <textarea class="descricao-nivel" placeholder="Descrição do nível" minlength="30" aria-label="Descrição do nível ${numero}"></textarea>`;
}

function montarTelaCriarNiveis(telaCriarNiveis) {
    telaCriarNiveis.innerHTML = "<h1>Agora, decida os níveis!</h1>";

    for (let numero = 1; numero <= qtdadeNiveis; numero++) {
        if (numero === 1) {
            telaCriarNiveis.insertAdjacentHTML("beforeend", `<div class="nivel" data-identifier="level">${camposNivel(numero)}</div>`);
        } else {
            telaCriarNiveis.insertAdjacentHTML("beforeend", `
                <div class="novo-nivel" data-identifier="expand">
                    <h2>Nível ${numero}</h2>
                    <button class="botaoEditar" type="button" onclick="abrirNovoNivel(this)" aria-label="Editar nível ${numero}">
                        <img src="img/editar.png" alt="">
                    </button>
                </div>`);
        }
    }

    telaCriarNiveis.insertAdjacentHTML("beforeend", `
        <button class="finaliza-quizz" type="button" onclick="validarTodosNiveis()">Finalizar quiz</button>`);
    telaCriarNiveis.style.display = "flex";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function abrirNovoNivel(elemento) {
    const novoNivel = elemento.parentNode;
    const numero = novoNivel.querySelector("h2").textContent.match(/\d+/)?.[0];
    novoNivel.classList.add("nivel");
    novoNivel.classList.remove("novo-nivel");
    novoNivel.innerHTML = camposNivel(numero);
}

function validarTodosNiveis() {
    const divsNiveis = document.querySelectorAll(".cria-quizz .cria-niveis .nivel");
    if (divsNiveis.length !== qtdadeNiveis) {
        alert("Abra e preencha todos os níveis antes de finalizar.");
        return;
    }

    for (const nivelAtual of divsNiveis) {
        if (!validarDadosNivel(nivelAtual)) {
            nivelAtual.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }
    }

    const percentuais = [...divsNiveis].map((nivelAtual) => Number(nivelAtual.querySelector(".percentual-nivel").value));
    if (!percentuais.includes(0)) {
        alert("É obrigatório existir pelo menos um nível com percentual mínimo de 0%.");
        return;
    }

    if (new Set(percentuais).size !== percentuais.length) {
        alert("Use percentuais mínimos diferentes para cada nível.");
        return;
    }

    listaNiveis = [...divsNiveis].map(montarNovoNivel);
    quizz.levels = listaNiveis;

    const botaoFinalizar = document.querySelector(".finaliza-quizz");
    botaoFinalizar.disabled = true;
    botaoFinalizar.textContent = "Publicando quiz…";
    sendQuizz(quizz);
}

function montarNovoNivel(nivel) {
    return {
        title: nivel.querySelector(".titulo-nivel").value.trim(),
        image: nivel.querySelector(".url-nivel").value.trim(),
        text: nivel.querySelector(".descricao-nivel").value.trim(),
        minValue: Number(nivel.querySelector(".percentual-nivel").value)
    };
}

function sendQuizz(quizzPronto) {
    if (typeof axios === "undefined") {
        falhouEnvio();
        return;
    }

    axios.post(API_URL, quizzPronto)
        .then(mandouQuizz)
        .catch(falhouEnvio);
}

function mandouQuizz(response) {
    quizzRecemCriado = response.data;
    guardaMeusQuizzesLocalmente(quizzRecemCriado);
    chamarTelaSucessoCriacaoQuizz();
}

function falhouEnvio(error) {
    const botaoFinalizar = document.querySelector(".finaliza-quizz");
    if (botaoFinalizar) {
        botaoFinalizar.disabled = false;
        botaoFinalizar.textContent = "Finalizar quiz";
    }

    const detalhe = error?.response?.data?.message || "Confira sua conexão e tente novamente.";
    alert(`Não foi possível publicar o quiz. ${detalhe}`);
}

function chamarTelaSucessoCriacaoQuizz() {
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    montarTelaSucessoCriacaoQuizz(document.querySelector(".cria-quizz .sucesso-quizz"));
}

function montarTelaSucessoCriacaoQuizz(telaSucessoCriacaoQuizz) {
    telaSucessoCriacaoQuizz.innerHTML = `
        <h1>Seu quiz está pronto!</h1>
        <figure class="fim-criacao-quizz"><figcaption>${escaparHtml(quizzRecemCriado.title)}</figcaption></figure>
        <button class="acessar-quizz" type="button" onclick="acessarQuizzCriado()">Acessar quiz</button>
        <button class="voltar-inicio" type="button" onclick="voltarInicio()">Voltar para o início</button>`;

    const capa = imagemSegura(quizzRecemCriado.image, quizzRecemCriado.id);
    telaSucessoCriacaoQuizz.querySelector("figure").style.backgroundImage = `url("${capa}")`;
    telaSucessoCriacaoQuizz.style.display = "flex";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function acessarQuizzCriado() {
    if (quizzRecemCriado?.id) {
        document.querySelector(".sucesso-quizz").style.display = "none";
        getQuizz(quizzRecemCriado.id);
    }
}

function voltarInicio() {
    paginaInicial();
}

function validarDadosPergunta(elemento) {
    const textoPergunta = elemento.querySelector(".texto-pergunta").value.trim();
    const respostaCorreta = elemento.querySelector(".resposta-correta .texto-resposta").value.trim();
    const urlRespostaCorreta = elemento.querySelector(".resposta-correta .url-resposta").value.trim();
    const respostasIncorretas = [...elemento.querySelectorAll(":scope > .resposta")];
    const preenchidas = respostasIncorretas.filter((resposta) => resposta.querySelector(".texto-resposta").value.trim());

    const dadosIncorretosCompletos = preenchidas.every((resposta) => {
        return validarURL(resposta.querySelector(".url-resposta").value.trim());
    });
    const existemUrlsSemTexto = respostasIncorretas.some((resposta) => {
        const texto = resposta.querySelector(".texto-resposta").value.trim();
        const url = resposta.querySelector(".url-resposta").value.trim();
        return !texto && Boolean(url);
    });

    if (textoPergunta.length < 20 || !respostaCorreta || !validarURL(urlRespostaCorreta)
        || preenchidas.length === 0 || !dadosIncorretosCompletos || existemUrlsSemTexto) {
        alert([
            "Revise esta pergunta:",
            "• o texto deve ter pelo menos 20 caracteres;",
            "• a resposta correta precisa de texto e URL válida;",
            "• inclua ao menos uma resposta incorreta com texto e URL válida."
        ].join("\n"));
        return false;
    }

    return true;
}

function validarDadosNivel(elemento) {
    const tituloNivel = elemento.querySelector(".titulo-nivel").value.trim();
    const percentualNivel = Number(elemento.querySelector(".percentual-nivel").value);
    const urlNivel = elemento.querySelector(".url-nivel").value.trim();
    const descricaoNivel = elemento.querySelector(".descricao-nivel").value.trim();

    if (tituloNivel.length < 10 || !Number.isFinite(percentualNivel) || percentualNivel < 0
        || percentualNivel > 100 || !validarURL(urlNivel) || descricaoNivel.length < 30) {
        alert([
            "Revise este nível:",
            "• o título deve ter pelo menos 10 caracteres;",
            "• o percentual deve estar entre 0 e 100;",
            "• a imagem deve usar uma URL válida;",
            "• a descrição deve ter pelo menos 30 caracteres."
        ].join("\n"));
        return false;
    }

    return true;
}

function validarURL(texto) {
    return QuizUtils.isValidHttpUrl(texto);
}

getAllQuizz();
