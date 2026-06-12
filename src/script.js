const API_URL = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
const STORAGE_PREFIX = "buzzquizz:";
const FALLBACK_IMAGE = "img/pandavermelho.jpg";

const PIXABAY_IMAGES = {
    redPanda: "https://cdn.pixabay.com/photo/2022/10/07/09/24/little-panda-7504633_1280.jpg",
    giantPanda: "https://cdn.pixabay.com/photo/2016/09/04/22/44/panda-1645495_640.jpg",
    bambooForest: "https://cdn.pixabay.com/photo/2016/03/27/19/49/bamboo-1283976_1280.jpg",
    bambooClose: "https://cdn.pixabay.com/photo/2017/12/08/21/14/bamboo-3006747_640.jpg",
    quizCard: "https://cdn.pixabay.com/photo/2016/11/05/11/10/quiz-1799934_640.png"
};

const FEATURED_QUIZZES = [{
    id: "local-panda-pixabay",
    title: "Qual panda fofinho você é?",
    image: PIXABAY_IMAGES.redPanda,
    questions: [{
            title: "Qual animal também é conhecido como panda-vermelho?",
            color: "#E85D4F",
            answers: [{
                    text: "O pequeno panda-vermelho",
                    image: PIXABAY_IMAGES.redPanda,
                    isCorrectAnswer: true
                },
                {
                    text: "Um panda gigante jovem",
                    image: PIXABAY_IMAGES.giantPanda,
                    isCorrectAnswer: false
                },
                {
                    text: "Um bosque de bambu",
                    image: PIXABAY_IMAGES.bambooForest,
                    isCorrectAnswer: false
                },
                {
                    text: "Um desenho genérico de quiz",
                    image: PIXABAY_IMAGES.quizCard,
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Qual alimento aparece com mais frequência na dieta do panda gigante?",
            color: "#4AA96C",
            answers: [{
                    text: "Bambu",
                    image: PIXABAY_IMAGES.bambooClose,
                    isCorrectAnswer: true
                },
                {
                    text: "Frutas cítricas",
                    image: PIXABAY_IMAGES.quizCard,
                    isCorrectAnswer: false
                },
                {
                    text: "Areia de praia",
                    image: PIXABAY_IMAGES.bambooForest,
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Qual imagem combina melhor com o habitat natural do panda?",
            color: "#3C8DAD",
            answers: [{
                    text: "Floresta de bambu",
                    image: PIXABAY_IMAGES.bambooForest,
                    isCorrectAnswer: true
                },
                {
                    text: "Cartão de perguntas",
                    image: PIXABAY_IMAGES.quizCard,
                    isCorrectAnswer: false
                },
                {
                    text: "Retrato em fundo neutro",
                    image: PIXABAY_IMAGES.giantPanda,
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Ao terminar um quiz, o que define o nível exibido?",
            color: "#EC362D",
            answers: [{
                    text: "A porcentagem de respostas corretas",
                    image: PIXABAY_IMAGES.quizCard,
                    isCorrectAnswer: true
                },
                {
                    text: "A ordem em que as imagens carregam",
                    image: PIXABAY_IMAGES.redPanda,
                    isCorrectAnswer: false
                },
                {
                    text: "A quantidade de quizzes na página inicial",
                    image: PIXABAY_IMAGES.giantPanda,
                    isCorrectAnswer: false
                }
            ]
        }
    ],
    levels: [{
            title: "Especialista em pandas",
            image: PIXABAY_IMAGES.redPanda,
            text: "Você acertou a maior parte das perguntas e mostrou atenção aos detalhes do quiz. Seu resultado ficou no nível mais alto.",
            minValue: 75
        },
        {
            title: "Explorador do bambuzal",
            image: PIXABAY_IMAGES.bambooForest,
            text: "Você reconhece alguns pontos importantes, mas ainda dá para melhorar observando as perguntas e respostas com calma.",
            minValue: 40
        },
        {
            title: "Visitante curioso",
            image: PIXABAY_IMAGES.giantPanda,
            text: "Você está começando agora. Refaça o quiz, compare as imagens e tente alcançar um resultado melhor.",
            minValue: 0
        }
    ]
}];

let quizzTeste = FEATURED_QUIZZES[0];

let quizz = {
    title: "",
    image: PIXABAY_IMAGES.quizCard,
    questions: [],
    levels: []
};

let qtdadePerguntas = 0;
const MIN_PERGUNTAS = 3;
let listaPerguntas = [];

let qtdadeNiveis = 0;
const MIN_NIVEIS = 2;
let listaNiveis = [];

let listaMeusQuizzes = [];

let quizzRecemCriado;
let identificador = null;
let quizzescolhido = null;

function sendQuizz(quizzPronto) {
    const promise = axios.post(API_URL, quizzPronto);
    promise.then(mandouQuizz);
    promise.catch(falhouEnvio);
    return promise;
}

function mandouQuizz(response) {
    let quizz = response.data;
    guardaMeusQuizzesLocalmente(quizz);
    quizzRecemCriado = quizz;
    chamarTelaSucessoCriacaoQuizz();
}

function falhouEnvio(error) {
    const detalheErro = (error.response && error.response.data) ? JSON.stringify(error.response.data) : "Tente novamente em alguns instantes.";
    alert(`
        Infelizmente seu quizz não pôde ser enviado ao servidor.
        ${detalheErro}
    `);
}

function guardaMeusQuizzesLocalmente(quizz) {
    const quizzSerializado = JSON.stringify(quizz);
    localStorage.setItem(STORAGE_PREFIX + quizz.id, quizzSerializado);
}

function getMeuQuizzLocal(quizz) {
    const quizzSerializado = localStorage.getItem(STORAGE_PREFIX + quizz.id) || localStorage.getItem(quizz.id);
    const meuQuizz = JSON.parse(quizzSerializado);

    return meuQuizz;
}

function getMeuUltimoQuizzLocal(quizz) {
    const quizzSerializado = localStorage.getItem(STORAGE_PREFIX + quizz.id) || localStorage.getItem(quizz.id);
    const meuQuizz = JSON.parse(quizzSerializado);

    return meuQuizz;
}

function getAllQuizzesLocais() {
    listaMeusQuizzes = [];
    for (var i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        const quizzSerializado = localStorage.getItem(chave);

        try {
            const quizzLocal = JSON.parse(quizzSerializado);
            if (quizzLocal && quizzLocal.id && quizzLocal.title && quizzLocal.image && Array.isArray(quizzLocal.questions) && Array.isArray(quizzLocal.levels)) {
                listaMeusQuizzes.push(quizzLocal);
            }
        } catch (error) {
            // Ignora entradas antigas ou de outras aplicações no localStorage.
        }
    }

    return listaMeusQuizzes;
}

function getAllQuizz() {
    const meusQuizzes = getAllQuizzesLocais();
    document.querySelector(".paginaum .novo-quizz").style.display = "none";
    document.querySelector(".paginaum .quizzes-criados").style.display = "none";
    document.querySelector(".paginaum .quizzes-criados").innerHTML = "";
    document.querySelector(".paginaum .quizzes").innerHTML = "";
    if (meusQuizzes.length !== 0) {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "none";
        document.querySelector(".paginaum .novo-quizz").style.display = "flex";
        document.querySelector(".paginaum .quizzes-criados").style.display = "inline-flex";
        document.querySelector(".paginaum .todososquizzes").style.display = "flex";
        pegaMeusQuizzes(meusQuizzes);
    } else {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "flex";
        document.querySelector(".paginaum .todososquizzes").style.display = "flex";
    }
    document.querySelector(".paginaum .meus-quizzes").style.display = meusQuizzes.length ? "flex" : "none";
    const promise = axios.get(API_URL);
    promise.then(pegouQuizz);
    promise.catch(erroPegouListaQuizzes);
}

function getQuizz(here) {
    identificador = here;
    const quizzLocal = buscarQuizzLocal(here);
    if (quizzLocal) {
        abrirQuizz({ data: quizzLocal });
        return;
    }
    const promise = axios.get(API_URL + "/" + identificador);
    promise.then(abrirQuizz);
    promise.catch(erroPegouQuizz);
}

function pegouQuizz(resposta) {
    quizzTeste = Array.isArray(resposta.data) ? resposta.data : [];
    renderTodosQuizzes(quizzTeste);
}

function pegaMeusQuizzes(listaMeusQuizzes) {
    let meusQuizzes = document.querySelector(".quizzes-criados");
    meusQuizzes.innerHTML = "";
    for (let i = 0; i < listaMeusQuizzes.length; i++) {
        adicionarCardQuizz(meusQuizzes, listaMeusQuizzes[i]);
    }
}

function buscarQuizzLocal(id) {
    const idNormalizado = String(id);
    const quizzDestaque = FEATURED_QUIZZES.find((quizz) => String(quizz.id) === idNormalizado);
    if (quizzDestaque) {
        return quizzDestaque;
    }

    return getAllQuizzesLocais().find((quizz) => String(quizz.id) === idNormalizado);
}

function renderTodosQuizzes(quizzesApi) {
    const todosQuizzes = document.querySelector(".quizzes");
    todosQuizzes.innerHTML = "";
    const quizzes = FEATURED_QUIZZES.concat(quizzesApi);

    for (let i = 0; i < quizzes.length; i++) {
        adicionarCardQuizz(todosQuizzes, quizzes[i]);
    }
}

function adicionarCardQuizz(container, quizz) {
    const card = document.createElement("article");
    card.classList.add("quizz-card");
    card.addEventListener("click", () => getQuizz(quizz.id));

    const titulo = document.createElement("h3");
    titulo.textContent = quizz.title;
    card.appendChild(titulo);
    const imageUrl = getImagemSegura(quizz.image);
    aplicarImagemDeFundo(card, imageUrl);
    testarImagem(imageUrl, () => aplicarImagemDeFundo(card, FALLBACK_IMAGE));
    container.appendChild(card);
}

function getImagemSegura(url) {
    if (!validarURL(url)) {
        return FALLBACK_IMAGE;
    }

    const hostname = new URL(url).hostname.toLowerCase();
    if (hostname === "example.com" || hostname.endsWith(".example.com")) {
        return FALLBACK_IMAGE;
    }

    return url;
}

function aplicarImagemDeFundo(elemento, url) {
    elemento.style.backgroundImage = "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('" + url + "')";
}

function aplicarImagemTitulo(elemento, url) {
    elemento.style.backgroundImage = "linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('" + url + "')";
}

function testarImagem(url, aoFalhar) {
    if (url === FALLBACK_IMAGE) {
        return;
    }

    const imagem = new Image();
    imagem.onerror = aoFalhar;
    imagem.src = url;
}

function escapeHTML(valor) {
    const div = document.createElement("div");
    div.textContent = valor || "";
    return div.innerHTML;
}

function escapeAttribute(valor) {
    return escapeHTML(valor).replace(/"/g, "&quot;");
}

function embaralha() {
    return Math.random() - 0.5;
}

function abrirQuizz(respostaquizz) {
    questoesrespondidas = 0;
    acertos = 0;
    porcentagem = 0;
    porcentagemarredondada = 0;
    document.querySelector(".fim").innerHTML = "";
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "none";
    document.querySelector(".cria-quizz .cria-perguntas").style.display = "none";
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    document.querySelector(".cria-quizz .sucesso-quizz").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "block";
    quizzescolhido = respostaquizz.data;
    let titulo = document.querySelector(".pagina-quizz")
    titulo.innerHTML = `
        <section class="titulo-quizz">
            <h2><span>${escapeHTML(quizzescolhido.title)}</span></h2>
        </section>
        <section class="perguntas"></section>`;
    const umquizz = document.querySelector(".titulo-quizz");
    const perguntasContainer = titulo.querySelector(".perguntas");
    const imagemTitulo = getImagemSegura(quizzescolhido.image);
    aplicarImagemTitulo(umquizz, imagemTitulo);
    testarImagem(imagemTitulo, () => aplicarImagemTitulo(umquizz, FALLBACK_IMAGE));
    for (let x = 0; x < quizzescolhido.questions.length; x++) {
        quizzescolhido.questions[x].answers.sort(embaralha)
        perguntasContainer.innerHTML += `
                <article data-identifier="question" class="pergunta" data-question-index="${x}">
                    <div class="titulo-pergunta" style="background-color: ${quizzescolhido.questions[x].color}">
                        <h3>${escapeHTML(quizzescolhido.questions[x].title)}</h3>
                    </div>
                    <div class="bloco-respostas esse${x}"></div>
                </article>`;
        let classpergunta = document.querySelector(`.esse${x}`);
        for (let y = 0; y < quizzescolhido.questions[x].answers.length; y++) {
            classpergunta.innerHTML += `
            <div data-identifier="answer" data-answer-index="${y}" data-correct="${quizzescolhido.questions[x].answers[y].isCorrectAnswer}" id="pergunta${x}${y}" class="resposta pergunta${x}${y}" onclick="quizzSelecionado(${x},${y})">
                <img src="${getImagemSegura(quizzescolhido.questions[x].answers[y].image)}" alt="${escapeAttribute(quizzescolhido.questions[x].answers[y].text)}" onerror="this.src='${FALLBACK_IMAGE}'">
                <h4>${escapeHTML(quizzescolhido.questions[x].answers[y].text)}</h4>
            </div> `
        }
    }
    window.scrollTo(0, 0)
}

let questoesrespondidas = 0;
let acertos = 0;

function quizzSelecionado(numerodaquestao, opcao) {
    const pergunta = document.querySelector(`[data-question-index="${numerodaquestao}"]`);
    if (!pergunta || pergunta.classList.contains("respondida")) {
        return;
    }

    pergunta.classList.add("respondida");
    let escolha = document.querySelector(`.pergunta${numerodaquestao}${opcao}`);
    escolha.classList.add("escolhida");
    const respostas = pergunta.querySelectorAll(".resposta");
    for (let z = 0; z < respostas.length; z++) {
        let umaopcao = respostas[z];
        umaopcao.removeAttribute('onclick');
        if (umaopcao != escolha) {
            umaopcao.classList.add("nop");
        }
        if (umaopcao.dataset.correct === "true") {
            umaopcao.classList.add("acertou");
        } else {
            umaopcao.classList.add("errou");
        }
    }

    if (escolha.dataset.correct === "true") {
        acertos += 1;
    }
    questoesrespondidas += 1;
    quantidadeAcertos();

    setTimeout(() => {
        if (questoesrespondidas === quizzescolhido.questions.length) {
            resultadoQuizz();
        } else {
            const proximaPergunta = document.querySelector(`[data-question-index="${numerodaquestao + 1}"]`);
            if (proximaPergunta) {
                proximaPergunta.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, 1200);
}

let porcentagem = 0;
let porcentagemarredondada = 0;

function quantidadeAcertos() {
    porcentagem = (acertos / quizzescolhido.questions.length) * 100;
    porcentagemarredondada = Math.round(porcentagem);
    return porcentagemarredondada;
}

function calcularNivelResultado() {
    const niveisOrdenados = quizzescolhido.levels
        .map((nivel) => ({ ...nivel, minValue: Number(nivel.minValue) }))
        .sort((a, b) => b.minValue - a.minValue);

    return niveisOrdenados.find((nivel) => porcentagemarredondada >= nivel.minValue) || niveisOrdenados[niveisOrdenados.length - 1];
}

function resultadoQuizz() {
    const nivelResultado = calcularNivelResultado();
    let perguntas = document.querySelector(".fim");
    perguntas.innerHTML = `
        <article class="resultado" data-identifier="quizz-result">
            <div class="titulo-resultado">
                <h3>${porcentagemarredondada}% ${escapeHTML(nivelResultado.title)}</h3>
            </div>
            <div class="conteudo-resultado">
                <img src="${getImagemSegura(nivelResultado.image)}" alt="Imagem do resultado" onerror="this.src='${FALLBACK_IMAGE}'">
                <span>${escapeHTML(nivelResultado.text)}</span>
            </div>
        </article>
        <div class="botoes">
            <button class="reiniciar-quizz" onclick="reiniciarQuizz()">
                <p>Reiniciar Quizz</p>
            </button>
            <button class="voltar-inicio" onclick="paginaInicial()">
                <p>Voltar pra home</p>
            </button>
        </div>`
    const irpara = document.querySelector(".resultado")
    irpara.scrollIntoView()
}

function paginaInicial() {
    document.querySelector(".pagina-quizz").style.display = "none";
    document.querySelector(".fim").innerHTML = "";
    document.querySelector(".paginaum").style.display = "flex";
    getAllQuizz();
    window.scrollTo(0, 0);
}

function reiniciarQuizz() {
    if (quizzescolhido) {
        abrirQuizz({ data: quizzescolhido });
    } else {
        getQuizz(identificador);
    }
}

function erroPegouQuizz(error) {
    const detalheErro = (error.response && error.response.data) ? JSON.stringify(error.response.data) : "Tente novamente em alguns instantes.";
    alert(`
        Infelizmente não foi possível pegar seu Quizz no servidor.
        ${detalheErro}
    `);
}

function erroPegouListaQuizzes() {
    renderTodosQuizzes([]);
}

function chamarTelaCriarQuizz() {
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "flex";
}

function validarDadosBasicos() {
    let tituloQuizz = document.querySelector(".vamos-comecar .titulo-quizz").value;
    if (tituloQuizz.length < 20 || tituloQuizz.length > 65) {
        alert("O título do quizz deve ter no mínimo 20 e no máximo 65 caracteres.");
    }
    let imagemQuizz = document.querySelector(".vamos-comecar .url-quizz").value;
    if (!validarURL(imagemQuizz)) {
        alert("A imagem deve ser uma URL válida.");
    }
    qtdadePerguntas = parseInt(document.querySelector(".vamos-comecar .numero-perguntas").value);
    if (Number.isNaN(qtdadePerguntas) || qtdadePerguntas < 3) {
        alert("A quantidade de perguntas deve ser no mínimo 3.");
    }
    qtdadeNiveis = parseInt(document.querySelector(".vamos-comecar .quantidade-niveis").value);
    if (Number.isNaN(qtdadeNiveis) || qtdadeNiveis < 2) {
        alert("A quantidade de níveis deve ser no mínimo 2.");
    }
    if ((tituloQuizz.length >= 20) && (tituloQuizz.length <= 65) && (validarURL(imagemQuizz)) && (qtdadePerguntas >= 3) && (qtdadeNiveis >= 2)) {
        quizz.title = tituloQuizz;
        quizz.image = imagemQuizz;
        quizz.questions = [];
        quizz.levels = [];
        chamarTelaCriarPerguntas();
    }
}

function chamarTelaCriarPerguntas() {
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "none";

    const telaCriarPerguntas = document.querySelector(".cria-quizz .cria-perguntas");

    montarTelaCriarPerguntas(telaCriarPerguntas);
}

function montarTelaCriarPerguntas(telaCriarPerguntas) {
    telaCriarPerguntas.innerHTML = `
        <h1>Crie suas perguntas</h1>
        <div class="pergunta" data-identifier="question">
            <h2>Pergunta 1</h2>
            <div class="cabecalho-pergunta">
                <input class="texto-pergunta" type="text" placeholder="Texto da pergunta" minlength="20" />
                <input class="cor-pergunta" type="color" placeholder="Cor de fundo da pergunta" />
            </div>
            <h2>Resposta correta</h2>
            <div class="resposta-correta">
                <input class="texto-resposta" type="text" placeholder="Resposta correta" required="required" />
                <input class="url-resposta" type="url" placeholder="URl da imagem" />
            </div>
            <h2>Respostas incorretas</h2>
            <div class="resposta">
                <input class="texto-resposta" type="text" placeholder="Resposta incorreta 1" required="required" />
                <input class="url-resposta" type="url" placeholder="URl da imagem 1" />
            </div>
            <div class="resposta">
                <input class="texto-resposta" type="text" placeholder="Resposta incorreta 2" required="required" />
                <input class="url-resposta" type="url" placeholder="URl da imagem 2" />
            </div>
            <div class="resposta">
                <input class="texto-resposta" type="text" placeholder="Resposta incorreta 3" required="required" />
                <input class="url-resposta" type="url" placeholder="URl da imagem 3" />
            </div>
        </div>
        <div class="nova-pergunta" data-identifier="expand">
            <h2>Pergunta 2</h2>
            <img class="botaoEditar" src="img/editar.png" alt="Botão editar" onclick="abrirNovaPergunta(this)">
        </div>
        <div class="nova-pergunta" data-identifier="expand">
            <h2>Pergunta 3</h2>
            <img class="botaoEditar" src="img/editar.png" alt="Botão editar" onclick="abrirNovaPergunta(this)">
        </div>
    `;

    for (let i = 0; i < (qtdadePerguntas - MIN_PERGUNTAS); i++) {
        telaCriarPerguntas.innerHTML += `
            <div class="nova-pergunta" data-identifier="expand">
                <h2>Pergunta ${MIN_PERGUNTAS+i+1}</h2>
                <img class="botaoEditar" src="img/editar.png" alt="Botão editar" onclick="abrirNovaPergunta(this)">
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
            <input class="texto-resposta" type="text" placeholder="Resposta correta" required="required" />
            <input class="url-resposta" type="url" placeholder="URl da imagem" />
        </div>
        <h2>Respostas incorretas</h2>
        <div class="resposta">
            <input class="texto-resposta" type="text" placeholder="Resposta incorreta 1" required="required" />
            <input class="url-resposta" type="url" placeholder="URl da imagem 1" />
        </div>
        <div class="resposta">
            <input class="texto-resposta" type="text" placeholder="Resposta incorreta 2" required="required" />
            <input class="url-resposta" type="url" placeholder="URl da imagem 2" />
        </div>
        <div class="resposta">
            <input class="texto-resposta" type="text" placeholder="Resposta incorreta 3" required="required" />
            <input class="url-resposta" type="url" placeholder="URl da imagem 3" />
        </div>
    `;

    novapergunta.style.display = "flex";
    novapergunta.style.flexDirection = "column";
    novapergunta.style.justifyContent = "center";
}

function montarNovaResposta(elementoResposta) {
    return {
        text: elementoResposta.children[0].value.trim(),
        image: elementoResposta.children[1].value.trim(),
        isCorrectAnswer: elementoResposta.classList.contains("resposta-correta")
    };
}

function validarTodasPerguntas() {
    listaPerguntas = [];
    let listaRespostas = [];
    let erroPreenchimento = 0;

    const divsPerguntas = document.querySelectorAll(".cria-quizz .pergunta");

    if (divsPerguntas.length !== qtdadePerguntas) {
        alert("Abra e preencha todas as perguntas antes de continuar.");
        return;
    }

    for (let i = 0; i < divsPerguntas.length; i++) {
        listaRespostas = [];
        if (!validarDadosPergunta(divsPerguntas[i])) {
            erroPreenchimento++;
        }
    }

    if (erroPreenchimento > 0) {
        return;
    } else {

        for (let i = 0; i < divsPerguntas.length; i++) {
            listaRespostas = [];

            listaRespostas.push(montarNovaResposta(divsPerguntas[i].querySelector(".resposta-correta")));
            const respostasIncorretas = divsPerguntas[i].querySelectorAll(".resposta");

            for (let j = 0; j < respostasIncorretas.length; j++) {
                if (respostasIncorretas[j].children[0].value.trim() !== "") {
                    listaRespostas.push(montarNovaResposta(respostasIncorretas[j]));
                }
            }

            listaPerguntas.push(montarNovaPergunta(divsPerguntas[i].querySelector(".texto-pergunta").value,
                divsPerguntas[i].querySelector(".cor-pergunta").value, listaRespostas));
        }

        quizz.questions = listaPerguntas;

        chamarTelaCriarNiveis();
    }
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

    const telaCriarNiveis = document.querySelector(".cria-quizz .cria-niveis");

    montarTelaCriarNiveis(telaCriarNiveis);
}

function montarTelaCriarNiveis(telaCriarNiveis) {
    telaCriarNiveis.innerHTML = `
        <h1>Agora, decida os níveis!</h1>
        <div class="nivel" data-identifier="level">
            <h2>Nível 1</h2>
            <input class="titulo-nivel" type="text" placeholder="Título do nível" minlength="5" />
            <input class="percentual-nivel" type="number" placeholder="% de acerto mínima" min="0" max="100" />
            <input class="url-nivel" type="url" placeholder="URL da imagem do nível" />
            <textarea class="descricao-nivel" type="text" placeholder="Descrição do nível" minlength="30"></textarea>
        </div>
        <div class="novo-nivel" data-identifier="expand">
            <h2>Nível 2</h2>
            <img class="botaoEditar" src="img/editar.png" alt="Botão editar" onclick="abrirNovoNivel(this)">
        </div>        
    `;
    for (let i = 0; i < (qtdadeNiveis - MIN_NIVEIS); i++) {
        telaCriarNiveis.innerHTML += `
            <div class="novo-nivel" data-identifier="expand">
                <h2>Nível ${MIN_NIVEIS+i+1}</h2>
                <img class="botaoEditar" src="img/editar.png" alt="Botão editar" onclick="abrirNovoNivel(this)">
            </div>
        `;
    }

    telaCriarNiveis.innerHTML += `
        <button class="finaliza-quizz" onclick="validarTodosNiveis()">
            <p>Finalizar Quizz</p>
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
        <input class="titulo-nivel" type="text" placeholder="Título do nível" minlength="5" />
        <input class="percentual-nivel" type="number" placeholder="% de acerto mínima" min="0" max="100" />
        <input class="url-nivel" type="url" placeholder="URL da imagem do nível" />
        <textarea class="descricao-nivel" type="text" placeholder="Descrição do nível" minlength="30"></textarea>
    `;

    novoNível.style.display = "flex";
    novoNível.style.flexDirection = "column";
    novoNível.style.justifyContent = "center";
}

function validarTodosNiveis() {
    listaNiveis = [];
    const divsNiveis = document.querySelectorAll(".cria-quizz .nivel");
    let contPercentualNivelZero = 0;

    if (divsNiveis.length !== qtdadeNiveis) {
        alert("Abra e preencha todos os níveis antes de finalizar o quizz.");
        return;
    }

    for (let i = 0; i < divsNiveis.length; i++) {

        if (divsNiveis[i].querySelector(".percentual-nivel").value == 0) {
            contPercentualNivelZero++;
        }
    }

    if (contPercentualNivelZero === 0) {
        alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%.");
    } else {
        for (let i = 0; i < divsNiveis.length; i++) {
            if (!validarDadosNivel(divsNiveis[i])) {
                return;
            }
            listaNiveis.push(montarNovoNivel(divsNiveis[i]));
        }

        quizz.levels = listaNiveis;
        sendQuizz(quizz);
    }
}

function montarNovoNivel(nivel) {
    return {
        title: nivel.querySelector(".titulo-nivel").value.trim(),
        image: nivel.querySelector(".url-nivel").value.trim(),
        text: nivel.querySelector(".descricao-nivel").value.trim(),
        minValue: Number(nivel.querySelector(".percentual-nivel").value)
    };
}

function chamarTelaSucessoCriacaoQuizz() {
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    const telaSucessoCriacaoQuizz = document.querySelector(".cria-quizz .sucesso-quizz");
    montarTelaSucessoCriacaoQuizz(telaSucessoCriacaoQuizz);
}

function montarTelaSucessoCriacaoQuizz(telaSucessoCriacaoQuizz) {
    telaSucessoCriacaoQuizz.innerHTML = `
        <h1>Seu quizz está pronto!</h1>
        <figure class="fim-criacao-quizz">
            <h3>${escapeHTML(quizz.title)}</h3>
        </figure>
        <button class="acessar-quizz" onclick="acessarQuizzCriado()">
            <p>Acessar Quizz</p>
        </button>
        <button class="voltar-inicio" onclick="voltarInicio()">
            <p>Voltar pra home</p>
        </button>    
    `;

    const figure = telaSucessoCriacaoQuizz.querySelector("figure");
    const imagemSucesso = getImagemSegura(quizz.image);
    aplicarImagemDeFundo(figure, imagemSucesso);
    testarImagem(imagemSucesso, () => aplicarImagemDeFundo(figure, FALLBACK_IMAGE));
    telaSucessoCriacaoQuizz.style.display = "flex";
}

function acessarQuizzCriado() {
    if (!quizzRecemCriado || !quizzRecemCriado.id) {
        alert("Aguarde o quizz terminar de ser salvo antes de acessá-lo.");
        return;
    }
    getQuizz(quizzRecemCriado.id);
    document.querySelector(".sucesso-quizz").style.display = "none";
}

function voltarInicio() {
    document.querySelector(".sucesso-quizz").style.display = "none";
    document.querySelector(".paginaum").style.display = "flex";
    getAllQuizz();
    window.scrollTo(0, 0);
}

function validarDadosPergunta(elemento) {
    let textoPergunta = elemento.querySelector(".cabecalho-pergunta .texto-pergunta").value.trim();
    let respostaCorreta = elemento.querySelector(".resposta-correta .texto-resposta").value.trim();
    let urlRespostaCorreta = elemento.querySelector(".resposta-correta .url-resposta").value.trim();
    let respostasIncorretas = elemento.querySelectorAll(".resposta");
    let contaRespostasIncorretasValidas = 0;
    let existeRespostaIncompleta = false;

    for (let i = 0; i < respostasIncorretas.length; i++) {
        const textoResposta = respostasIncorretas[i].querySelector(".texto-resposta").value.trim();
        const urlResposta = respostasIncorretas[i].querySelector(".url-resposta").value.trim();

        if (textoResposta !== "" && validarURL(urlResposta)) {
            contaRespostasIncorretasValidas++;
        } else if (textoResposta !== "" || urlResposta !== "") {
            existeRespostaIncompleta = true;
        }
    }

    if ((textoPergunta.length < 20) || (respostaCorreta === "") || (!validarURL(urlRespostaCorreta)) ||
        (contaRespostasIncorretasValidas === 0) || existeRespostaIncompleta) {
        alert(`
            ERRO! Dados incompletos, verifique se os campos da sua pergunta cumprem os seguintes requisitos:
            1. O texto da pergunta deve ter no mínimo 20 caracteres.
            2. A inserção da resposta correta é obrigatória.
            3. A inserção de pelo menos 1 resposta errada é obrigatória!
            4. A imagem deve ser uma URL válida.
            5. Cada resposta deve ter um texto e uma imagem com uma url válida a ela associada.
        `);
        return false;
    } else {
        return true;
    }
}

function validarDadosNivel(elemento) {
    let tituloNivel = elemento.querySelector(".titulo-nivel").value.trim();
    let percentualNivel = parseInt(elemento.querySelector(".percentual-nivel").value);
    let urlNivel = elemento.querySelector(".url-nivel").value.trim();
    let descricaoNivel = elemento.querySelector(".descricao-nivel").value.trim();


    if ((tituloNivel.length < 10) || Number.isNaN(percentualNivel) || ((percentualNivel < 0) || (percentualNivel > 100)) || (!validarURL(urlNivel)) ||
        (descricaoNivel.length < 30)) {
        alert(`
            ERRO! Dados incompletos, verifique se os campos do nível cumprem os seguintes requisitos:
            1. O título do nível deve ter no mínimo 10 caracteres.
            2. O percentual(%) de acerto mínimo de ser um número entre 0 e 100.
            3. A imagem do nível deve ser uma URL válida.
            4. A descrição do nível de ter no mínimo 30 caracteres.
        `);
        return false;
    } else {
        return true;
    }
}

function validarURL(texto) {
    try {
        const url = new URL(texto);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (error) {
        return false;
    }
}

getAllQuizz();
