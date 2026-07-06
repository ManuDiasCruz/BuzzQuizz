const API_URL = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
const STORAGE_PREFIX = "buzzquizz:";

const fallbackQuiz = {
    id: "pixabay-pandas",
    title: "Você conhece o mundo dos pandas?",
    image: "img/pixabay-red-panda-3869112.jpg",
    questions: [
        {
            title: "Qual destas imagens mostra um panda-vermelho?",
            color: "#176B58",
            answers: [
                { text: "Este pequeno mamífero ruivo", image: "img/pixabay-red-panda-4211083.jpg", isCorrectAnswer: true },
                { text: "Este panda-gigante", image: "img/pixabay-red-panda-3508153.jpg", isCorrectAnswer: false },
                { text: "Este urso na floresta", image: "img/pixabay-animal-4418773.jpg", isCorrectAnswer: false },
                { text: "Este filhote preto e branco", image: "img/pixabay-red-panda-3508116.jpg", isCorrectAnswer: false }
            ]
        },
        {
            title: "Qual panda é famoso pela pelagem preta e branca?",
            color: "#3157A4",
            answers: [
                { text: "Panda-gigante", image: "img/pixabay-red-panda-3508153.jpg", isCorrectAnswer: true },
                { text: "Panda-vermelho", image: "img/pixabay-red-panda-1851650.jpg", isCorrectAnswer: false },
                { text: "Outro panda-vermelho", image: "img/pixabay-red-panda-1851590.jpg", isCorrectAnswer: false },
                { text: "Urso-pardo", image: "img/pixabay-animal-1236875.jpg", isCorrectAnswer: false }
            ]
        },
        {
            title: "Qual foto destaca a cauda anelada de um panda-vermelho?",
            color: "#D24E32",
            answers: [
                { text: "Panda-vermelho entre galhos", image: "img/pixabay-little-panda-7504633.jpg", isCorrectAnswer: true },
                { text: "Panda-gigante descansando", image: "img/pixabay-red-panda-3508116.jpg", isCorrectAnswer: false },
                { text: "Urso caminhando", image: "img/pixabay-animal-4418773.jpg", isCorrectAnswer: false },
                { text: "Panda-vermelho em primeiro plano", image: "img/pixabay-red-panda-1851661.jpg", isCorrectAnswer: false }
            ]
        }
    ],
    levels: [
        {
            title: "Explorador de pandas",
            image: "img/pixabay-red-panda-1851590.jpg",
            text: "Você começou bem! Continue observando as diferenças entre o panda-gigante e o panda-vermelho — duas espécies muito diferentes que compartilham um apelido irresistível.",
            minValue: 0
        },
        {
            title: "Especialista em pandas",
            image: "img/pixabay-red-panda-3869112.jpg",
            text: "Excelente! Você reconhece detalhes de espécies e pelagens. As fotos deste quiz vieram do Pixabay e foram selecionadas para dar mais variedade visual à experiência.",
            minValue: 67
        }
    ]
};

let quizzTeste = {
    title: "Qual panda fofinho você é?",
    image: "https://s4.static.brasilescola.uol.com.br/img/2019/09/panda.jpg",
    questions: [{
            title: "Outro urso fofinho também é um tipo de panda... qual?",
            color: "#F05C5C",
            answers: [{
                    text: "O pandinha vermelho",
                    image: "https://www.gpabrasil.com.br/wp-content/uploads/2018/04/Panda-Vermelho-e1516040786209.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Panda indiano da floresta",
                    image: "https://www.portaldosanimais.com.br/wp-content/uploads/2017/02/Urso-Pardo-Foto-e1486489128243.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Panda puma das montanhas",
                    image: "https://s2.glbimg.com/k5mU1Hc5HBv8dxzS9jV2Jh9zeec=/0x0:2000x1333/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/M/k/ieluGOT1irpcymwJqyVA/urso-negro.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Panda albino chinês",
                    image: "https://oicanada.com.br/wp-content/uploads/2012/02/pbpic-Day63lg_OK.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Você é um Panda agora! Qual sua comida favorita?",
            color: "#55DD65",
            answers: [{
                    text: "Um gostoso e nutritivo bambu",
                    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Bambusa_oldhamii_joint.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Folhinhas fininhas e verdinhas",
                    image: "https://static.mundoeducacao.uol.com.br/mundoeducacao/conteudo_legenda/987f9d1bbec46326832e6ef3162e9674.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Musguinho cheio de bichinhos",
                    image: "https://registrodemarca.arenamarcas.com.br/wp-content/uploads/2020/06/brio%CC%81fitas-musgos.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Qual sua cor favorita?",
            color: "#6ACAE2",
            answers: [{
                    text: "Preto ou vermelho, depende do dia",
                    image: "https://www.cabanamagazine.com.br/image/catalog/cores/Preto%20+%20Vermelho.png",
                    isCorrectAnswer: true
                },
                {
                    text: "Branco e preto, um clássico que nunca sai de moda...",
                    image: "https://cdn.leroymerlin.com.br/products/_piso_vinilico_em_manta_komeco_preto_e_branco_54m2_bobina_89002564_b39a_600x600.jpg",
                    isCorrectAnswer: false
                }
            ]
        }
    ],
    levels: [{
            title: "Panda Master",
            image: "https://conexaoplaneta.com.br/wp-content/uploads/2016/12/curiosidade-animal-conexao-planeta-panda-vermelho-mathias-appel.jpg",
            text: "PARABÉNS! Você é um mestre em pandas! Sabe até que existem duas fofuras nesse mundo de diferentes pesos... O famoso Panda Gigante pesa de 65 a 110 Kg, e o pequenino Panda Vermelho apenas de 3,7 a 6,2 Kg.",
            minValue: 60
        },
        {
            title: "Iniciante no mundo panda",
            image: "https://i.pinimg.com/236x/ac/b4/f9/acb4f92520f9dab8b92a5375f3da10f5--nature-animals.jpg",
            text: "Meu caro amigo, você ainda é um jovem padawan que tem muito a aprender sobre os pandas. Então, vai lá pesquisar: Além do famoso Panda Gigante preto e Branco, existe um pequeno fofinho chamado Panda Vermelho que sempre ourba a cena.",
            minValue: 0
        }
    ]
};

let level = {
    title: "Título do nível 1",
    image: "https://http.cat/411.jpg",
    text: "Descrição do nível 1",
    minValue: 0
};

let question = {
    title: "Título da pergunta 1",
    color: "#123456",
    answers: []
};

let answer = {
    text: "Texto da resposta 1",
    image: "https://http.cat/411.jpg",
    isCorrectAnswer: false
};

let quizz = {
    title: "Título do quizz",
    image: "https://http.cat/411.jpg",
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
let existeQuizzUsuario = false;

function createQuizz() {
    const quizz = {
        title: "Lessa Squad - Grupo 5",
        image: "https://http.cat/411.jpg",
        questions: [{
                title: "Título da pergunta 1",
                color: "#123456",
                answers: [{
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 2",
                color: "#123456",
                answers: [{
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 3",
                color: "#123456",
                answers: [{
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [{
                title: "Título do nível 1",
                image: "https://http.cat/411.jpg",
                text: "Descrição do nível 1",
                minValue: 0
            },
            {
                title: "Título do nível 2",
                image: "https://http.cat/412.jpg",
                text: "Descrição do nível 2",
                minValue: 50
            }
        ]
    };
    return quizzTeste;
}

function sendQuizz(quizzPronto) {
    const promise = axios.post(API_URL, quizzPronto);
    promise.then(mandouQuizz);
    promise.catch(falhouEnvio);
}

function mandouQuizz(response) {
    let quizz = response.data;
    guardaMeusQuizzesLocalmente(quizz);
    quizzRecemCriado = quizz;
    chamarTelaSucessoCriacaoQuizz();
}

function falhouEnvio() {
    const localQuiz = JSON.parse(JSON.stringify(quizz));
    localQuiz.id = `local-${Date.now()}`;
    guardaMeusQuizzesLocalmente(localQuiz);
    quizzRecemCriado = localQuiz;
    chamarTelaSucessoCriacaoQuizz();
    const status = document.querySelector(".sucesso-quizz .save-status");
    if (status) {
        status.textContent = "O servidor de quizzes não respondeu. Seu quiz foi salvo somente neste navegador.";
    }
}

function guardaMeusQuizzesLocalmente(quizz) {
    const quizzSerializado = JSON.stringify(quizz);
    localStorage.setItem(`${STORAGE_PREFIX}${quizz.id}`, quizzSerializado);
}

function getMeuQuizzLocal(quizz) {
    const quizzSerializado = localStorage.getItem(`${STORAGE_PREFIX}${quizz.id}`);
    const meuQuizz = JSON.parse(quizzSerializado);

    return meuQuizz;
}

function getMeuUltimoQuizzLocal(quizz) {
    const quizzSerializado = localStorage.getItem(`${STORAGE_PREFIX}${quizz.id}`);
    const meuQuizz = JSON.parse(quizzSerializado);

    return meuQuizz;
}

function getAllQuizzesLocais() {
    listaMeusQuizzes = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith(STORAGE_PREFIX)) continue;
        try {
            const parsedQuiz = JSON.parse(localStorage.getItem(key));
            if (parsedQuiz && parsedQuiz.id && parsedQuiz.title) {
                listaMeusQuizzes.push(parsedQuiz);
            }
        } catch (error) {
            console.warn(`Ignoring invalid BuzzQuizz data in ${key}.`, error);
        }
    }
    return listaMeusQuizzes;
}

function getAllQuizz() {
    getAllQuizzesLocais();
    document.querySelector(".paginaum .novo-quizz").style.display = "none";
    document.querySelector(".paginaum .quizzes-criados").style.display = "none";
    if (listaMeusQuizzes.length !== 0) {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "none";
        document.querySelector(".paginaum .novo-quizz").style.display = "flex";
        document.querySelector(".paginaum .quizzes-criados").style.display = "inline-flex";
        document.querySelector(".paginaum .todososquizzes").style.display = "flex";
        pegaMeusQuizzes(listaMeusQuizzes);
    }
    document.querySelector(".paginaum .meus-quizzes").style.display = "flex";
    const promise = axios.get(API_URL, { timeout: 8000 });
    promise.then(pegouQuizz);
    promise.catch(erroPegouQuizz);
}

function getQuizz(here) {
    identificador = here;
    if (String(here) === String(fallbackQuiz.id)) {
        abrirQuizz({ data: JSON.parse(JSON.stringify(fallbackQuiz)) });
        return;
    }
    const localQuiz = listaMeusQuizzes.find((quiz) => String(quiz.id) === String(here));
    if (localQuiz) {
        abrirQuizz({ data: JSON.parse(JSON.stringify(localQuiz)) });
        return;
    }
    const promise = axios.get(`${API_URL}/${encodeURIComponent(here)}`, { timeout: 8000 });
    promise.then(abrirQuizz);
    promise.catch(erroPegouQuizz);
}

function pegouQuizz(resposta) {
    const remoteQuizzes = Array.isArray(resposta.data) ? resposta.data : [];
    quizzTeste = [fallbackQuiz, ...remoteQuizzes];
    renderQuizCards(document.querySelector(".quizzes"), quizzTeste, "all");
    setQuizStatus(remoteQuizzes.length > 0 ? "" : "O servidor não retornou quizzes; exibindo a seleção local.");
}

function pegaMeusQuizzes(listaMeusQuizzes) {
    renderQuizCards(document.querySelector(".quizzes-criados"), listaMeusQuizzes, "mine");
}

function renderQuizCards(container, quizzes, context) {
    container.innerHTML = "";
    quizzes.forEach((quiz, index) => {
        const card = document.createElement("button");
        card.className = "quiz-card";
        card.type = "button";
        card.setAttribute("aria-label", `Abrir quiz: ${quiz.title}`);
        card.style.backgroundImage = `linear-gradient(180deg, rgba(12, 18, 30, 0.02) 0%, rgba(12, 18, 30, 0.82) 100%), url('${safeImageUrl(quiz.image)}')`;
        card.innerHTML = `<span>${escapeHtml(quiz.title)}</span>`;
        card.addEventListener("click", () => getQuizz(quiz.id));
        card.dataset.context = context;
        card.dataset.index = String(index);
        container.appendChild(card);
    });
}

function setQuizStatus(message) {
    const status = document.querySelector(".quiz-status");
    if (!status) return;
    status.textContent = message;
    status.style.display = message ? "block" : "none";
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function safeImageUrl(value) {
    const url = String(value ?? "").trim();
    if (/^(https?:\/\/|img\/)[^\s]+$/i.test(url)) return url.replaceAll('"', "%22").replaceAll("'", "%27");
    return fallbackQuiz.image;
}

function embaralha() {
    return Math.random() - 0.5;
}

function abrirQuizz(respostaquizz) {
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "block";
    quizzescolhido = respostaquizz.data;
    questoesrespondidas = 0;
    acertos = 0;
    porcentagemarredondada = 0;
    document.querySelector(".fim").innerHTML = "";
    const paginaQuizz = document.querySelector(".pagina-quizz");
    paginaQuizz.innerHTML = `
        <section class="titulo-quizz">
            <h2><span>${escapeHtml(quizzescolhido.title)}</span></h2>
        </section>
        <section class="perguntas" aria-label="Perguntas do quiz"></section>`;
    const quizHero = paginaQuizz.querySelector(".titulo-quizz");
    quizHero.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('${safeImageUrl(quizzescolhido.image)}')`;
    const questionList = paginaQuizz.querySelector(".perguntas");
    for (let x = 0; x < quizzescolhido.questions.length; x++) {
        quizzescolhido.questions[x].answers.sort(embaralha);
        questionList.innerHTML += `
                <article data-identifier="question" data-question-index="${x}" class="pergunta">
                    <div class="titulo-pergunta" style="background-color: ${quizzescolhido.questions[x].color}">
                        <h3>${escapeHtml(quizzescolhido.questions[x].title)}</h3>
                    </div>
                    <div class="bloco-respostas esse${x}"></div>
                </article>`;
        const answerBlock = questionList.querySelector(`.esse${x}`);
        for (let y = 0; y < quizzescolhido.questions[x].answers.length; y++) {
            const currentAnswer = quizzescolhido.questions[x].answers[y];
            answerBlock.innerHTML += `
            <button type="button" data-identifier="answer" data-correct="${currentAnswer.isCorrectAnswer}" id="pergunta${x}${y}" class="resposta pergunta${x}${y}" onclick="quizzSelecionado(${x},${y})">
                <img src="${safeImageUrl(currentAnswer.image)}" alt="${escapeHtml(currentAnswer.text)}" loading="lazy">
                <span>${escapeHtml(currentAnswer.text)}</span>
            </button> `;
        }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
}

let questoesrespondidas = 0;
let acertos = 0;

function quizzSelecionado(numerodaquestao, opcao) {
    let escolha = document.querySelector(`.pergunta${numerodaquestao}${opcao}`);
    if (!escolha || escolha.disabled) return;
    escolha.classList.add("escolhida");
    for (let z = 0; z < quizzescolhido.questions[numerodaquestao].answers.length; z++) {
        let umaopcao = document.querySelector(`.pergunta${numerodaquestao}${z}`);
        umaopcao.removeAttribute('onclick');
        umaopcao.disabled = true;
        if (umaopcao != escolha) {
            umaopcao.classList.add("nop");
        }
        if (umaopcao.dataset.correct === "false") {
            umaopcao.classList.add("errou");
        } else {
            umaopcao.classList.add("acertou");
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
            return;
        }
        const nextQuestion = document.querySelector(`[data-question-index="${numerodaquestao + 1}"]`);
        if (nextQuestion) nextQuestion.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 700);
}

let porcentagem = 0;
let leveltotal = 0;
let umacerto = 0;
let porcentagemarredondada = 0;
let numeronoarray = 0;
let u = 0

function quantidadeAcertos() {
    porcentagem = (acertos / quizzescolhido.questions.length) * 100;
    porcentagemarredondada = Math.round(porcentagem);
    const sortedLevels = [...quizzescolhido.levels].sort((a, b) => Number(a.minValue) - Number(b.minValue));
    u = sortedLevels.reduce((selectedIndex, currentLevel, index) =>
        porcentagemarredondada >= Number(currentLevel.minValue) ? index : selectedIndex, 0);
    quizzescolhido.levels = sortedLevels;
    return u;
}

function resultadoQuizz() {
    let perguntas = document.querySelector(".fim");
    perguntas.innerHTML = `
        <article class="resultado" data-identifier="quizz-result">
            <div class="titulo-resultado">
                <h3>${porcentagemarredondada}% — ${escapeHtml(quizzescolhido.levels[u].title)}</h3>
            </div>
            <div class="conteudo-reultado">
                <img src="${safeImageUrl(quizzescolhido.levels[u].image)}" alt="Imagem do resultado">
                <span>${escapeHtml(quizzescolhido.levels[u].text)}</span>
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
    const resultCard = document.querySelector(".resultado");
    resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

function paginaInicial() {
    window.location.reload();
}

function reiniciarQuizz() {
    questoesrespondidas = 0;
    acertos = 0;
    getQuizz(identificador);
    const apagarresultado = document.querySelector(".fim");
    apagarresultado.innerHTML = "";
}

function erroPegouQuizz() {
    const paginaInicialVisivel = document.querySelector(".paginaum").style.display !== "none";
    if (paginaInicialVisivel) {
        quizzTeste = [fallbackQuiz];
        renderQuizCards(document.querySelector(".quizzes"), quizzTeste, "fallback");
        setQuizStatus("O catálogo on-line está indisponível. Você ainda pode jogar o quiz local em destaque.");
        return;
    }
    setQuizStatus("Não foi possível abrir esse quiz. Tente novamente ou escolha o quiz em destaque.");
    paginaInicial();
}

function chamarTelaCriarQuizz() {
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "flex";
}

function validarDadosBasicos() {
    let tituloQuizz = document.querySelector(".vamos-comecar .titulo-quizz").value;
    if (tituloQuizz.length < 20) {
        alert("O título do quizz deve ter no mínimo 20 e no máximo 65 caracteres.");
    }
    let imagemQuizz = document.querySelector(".vamos-comecar .url-quizz").value;
    if (!validarURL(imagemQuizz)) {
        alert("A imagem deve ser uma URL válida.");
    }
    qtdadePerguntas = parseInt(document.querySelector(".vamos-comecar .numero-perguntas").value);
    if (qtdadePerguntas < 3) {
        alert("A quantidade de perguntas deve ser no mínimo 3.");
    }
    qtdadeNiveis = parseInt(document.querySelector(".vamos-comecar .quantidade-niveis").value);
    if (qtdadeNiveis < 2) {
        alert("A quantidade de níveis deve ser no mínimo 2.");
    }
    if ((tituloQuizz.length >= 20) && (validarURL(imagemQuizz)) && (qtdadePerguntas >= 3) && (qtdadeNiveis >= 2)) {
        quizz.title = tituloQuizz;
        quizz.image = imagemQuizz;
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
    let textoResposta = "";
    let urlResposta = "";
    let ehRespostaCorreta = false;

    textoResposta = elementoResposta.children[0].value;
    urlResposta = elementoResposta.children[1].value;
    if (elementoResposta.classList.contains("resposta-correta")) {
        ehRespostaCorreta = true;
    }

    return {
        text: textoResposta,
        image: urlResposta,
        isCorrectAnswer: ehRespostaCorreta
    };
}

function validarTodasPerguntas() {
    listaPerguntas = [];
    let listaRespostas = [];
    let answers = [];
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
        chamarTelaCriarPerguntas();
    } else {

        for (let i = 0; i < divsPerguntas.length; i++) {
            listaRespostas = [];

            listaRespostas.push(montarNovaResposta(divsPerguntas[i].querySelector(".resposta-correta")));
            listaRespostas.push(montarNovaResposta(divsPerguntas[i].querySelectorAll(".resposta")[0]));

            if (divsPerguntas[i].querySelectorAll(".resposta")[1].children[0].value !== "") {
                listaRespostas.push(montarNovaResposta(divsPerguntas[i].querySelectorAll(".resposta")[1]));
            }
            if (divsPerguntas[i].querySelectorAll(".resposta")[2].children[0].value !== "") {
                listaRespostas.push(montarNovaResposta(divsPerguntas[i].querySelectorAll(".resposta")[2]));
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
        answers: listaRespostas.map((resposta) => ({ ...resposta }))
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
    let nivel;
    const divsNiveis = document.querySelectorAll(".cria-quizz .nivel");
    let contPercentualNivelZero = 0;
    let menorPercentual = 100;

    if (divsNiveis.length !== qtdadeNiveis) {
        alert("Abra e preencha todos os níveis antes de finalizar o quiz.");
        return;
    }

    for (let i = 0; i < divsNiveis.length; i++) {

        if (divsNiveis[i].querySelector(".percentual-nivel").value == 0) {
            contPercentualNivelZero++;
        }
    }

    if (contPercentualNivelZero === 0) {
        alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%.");
        chamarTelaCriarNiveis();
    } else {
        for (let i = 0; i < divsNiveis.length; i++) {
            if (!validarDadosNivel(divsNiveis[i])) return;
            listaNiveis.push(montarNovoNivel(divsNiveis[i]));
        }

        quizz.levels = listaNiveis;
        sendQuizz(quizz);
    }
}

function montarNovoNivel(nivel) {
    return {
        title: nivel.querySelector(".titulo-nivel").value,
        image: nivel.querySelector(".url-nivel").value,
        text: nivel.querySelector(".descricao-nivel").value,
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
        <figure class="fim-criacao-quizz"></figure>
        <p class="save-status" role="status">Quiz salvo com sucesso.</p>
        <button class="acessar-quizz" onclick="acessarQuizzCriado()">
            <p>Acessar Quizz</p>
        </button>
        <button class="voltar-inicio" onclick="voltarInicio()">
            <p>Voltar pra home</p>
        </button>    
    `;

    telaSucessoCriacaoQuizz.querySelector("figure").style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("${safeImageUrl(quizzRecemCriado.image)}")`;
    telaSucessoCriacaoQuizz.querySelector("figure").style.backgroundSize = "cover";
    telaSucessoCriacaoQuizz.querySelector("figure").style.backgroundPosition = "center";
    telaSucessoCriacaoQuizz.style.display = "flex";
}

function acessarQuizzCriado() {
    getQuizz(quizzRecemCriado.id);
    document.querySelector(".sucesso-quizz").style.display = "none";
}

function voltarInicio() {
    window.location.reload();
}

function validarDadosPergunta(elemento) {
    let textoPergunta = elemento.querySelector(".cabecalho-pergunta .texto-pergunta").value;
    let corPergunta = elemento.querySelector(".cabecalho-pergunta .cor-pergunta").value;
    let respostaCorreta = elemento.querySelector(".resposta-correta .texto-resposta").value;
    let urlRespostaCorreta = elemento.querySelector(".resposta-correta .url-resposta").value;
    let respostasIncorretas = elemento.querySelectorAll(".resposta .texto-resposta");
    let contaRespostasIncorretas = 0;

    for (let i = 0; i < respostasIncorretas.length; i++) {
        if (respostasIncorretas[i].value !== "") {
            contaRespostasIncorretas++;
        }
    }

    let urlRespostasIncorretas = elemento.querySelectorAll(".resposta .url-resposta");
    let contaUrlRespostasIncorretas = 0;

    for (let i = 0; i < urlRespostasIncorretas.length; i++) {
        if (urlRespostasIncorretas[i].value !== "") {
            if (validarURL(urlRespostasIncorretas[i].value)) {
                contaUrlRespostasIncorretas++;
            }
        }
    }

    if ((textoPergunta.length < 20) || (respostaCorreta === "") || (!validarURL(urlRespostaCorreta)) ||
        ((contaRespostasIncorretas == 0)) || (contaUrlRespostasIncorretas == 0) ||
        (contaRespostasIncorretas !== contaUrlRespostasIncorretas)) {
        alert(`
            ERRO! Dados imcompletos, verifique se os campos da sua pergunta cumprem os seguintes requisitos:
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
    const tituloNivel = elemento.querySelector(".titulo-nivel").value;
    const percentualNivel = Number(elemento.querySelector(".percentual-nivel").value);
    const urlNivel = elemento.querySelector(".url-nivel").value;
    const descricaoNivel = elemento.querySelector(".descricao-nivel").value;


    if ((tituloNivel.length < 10) || (!Number.isFinite(percentualNivel)) || ((percentualNivel < 0) || (percentualNivel > 100)) || (!validarURL(urlNivel)) ||
        (descricaoNivel.length < 30)) {
        alert(`
            ERRO! Dados imcompletos, verifique se os campos da sua pergunta cumprem os seguintes requisitos:
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

// Código de retirado de:
// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function validarURL(texto) {
    try {
        const url = new URL(texto);
        return url.protocol === "https:" || url.protocol === "http:";
    } catch (error) {
        return false;
    }
}

getAllQuizz();
