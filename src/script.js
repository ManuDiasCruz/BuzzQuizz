const API_URL = "https://mock-api.driven.com.br/api/v4/buzzquizz";
const MIN_PERGUNTAS = 3;
const MIN_NIVEIS = 2;
const FALLBACK_IMAGE = "img/pandavermelho.jpg";
const LOCAL_STORAGE_PREFIX = "buzzquizz-v2:";
const SHOWCASE_QUIZZES = [
    {
        id: "show-pandas",
        title: "Qual panda combina mais com você?",
        image: "https://cdn.pixabay.com/photo/2014/07/27/13/50/panda-400277_640.jpg",
        questions: [
            {
                title: "Qual detalhe mais combina com o panda vermelho?",
                color: "#D94C3D",
                answers: [
                    {
                        text: "Cauda longa e avermelhada",
                        image: "https://cdn.pixabay.com/photo/2018/06/28/18/44/red-panda-3445380_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Pelagem preta e branca clássica",
                        image: "https://cdn.pixabay.com/photo/2016/03/04/22/54/animal-1236875_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Escamas brilhantes",
                        image: "https://cdn.pixabay.com/photo/2017/08/07/12/47/ocean-2603504_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Casco resistente",
                        image: "https://cdn.pixabay.com/photo/2011/12/14/12/13/lunar-surface-11088_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual cenário combina melhor com um panda?",
                color: "#5C8A3B",
                answers: [
                    {
                        text: "Bosques com bambu por perto",
                        image: "https://cdn.pixabay.com/photo/2019/09/23/15/21/panda-4504579_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Dunas lunares",
                        image: "https://cdn.pixabay.com/photo/2011/12/14/12/13/lunar-surface-11088_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Praias abertas",
                        image: "https://cdn.pixabay.com/photo/2017/08/07/12/47/ocean-2603504_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual imagem costuma representar o panda gigante?",
                color: "#39495E",
                answers: [
                    {
                        text: "Um animal preto e branco",
                        image: "https://cdn.pixabay.com/photo/2016/03/04/22/54/animal-1236875_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Um astronauta em órbita",
                        image: "https://cdn.pixabay.com/photo/2011/12/14/12/11/astronaut-11080_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Um veleiro entre montanhas",
                        image: "https://cdn.pixabay.com/photo/2018/09/16/22/26/sailboat-4436708_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: "Explorador iniciante",
                image: "https://cdn.pixabay.com/photo/2016/03/04/22/54/animal-1236875_640.jpg",
                text: "Você passou pelo quizz, mas ainda pode observar melhor os detalhes e diferenças entre os pandas.",
                minValue: 0
            },
            {
                title: "Especialista em pandas",
                image: "https://cdn.pixabay.com/photo/2019/09/23/15/21/panda-4504579_640.jpg",
                text: "Você acertou o essencial e percebeu bem o contraste entre espécies, habitats e aparências.",
                minValue: 60
            }
        ]
    },
    {
        id: "show-space",
        title: "Até onde vai seu olhar para o espaço?",
        image: "https://cdn.pixabay.com/photo/2011/12/14/12/26/astronaut-11118_1280.jpg",
        questions: [
            {
                title: "Qual imagem remete melhor a uma caminhada espacial?",
                color: "#23395B",
                answers: [
                    {
                        text: "Astronauta visto do lado de fora da nave",
                        image: "https://cdn.pixabay.com/photo/2011/12/14/12/11/astronaut-11080_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Uma praia em dia aberto",
                        image: "https://cdn.pixabay.com/photo/2017/08/07/12/47/ocean-2603504_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Um panda em descanso",
                        image: "https://cdn.pixabay.com/photo/2016/03/04/22/54/animal-1236875_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual cenário representa melhor a superfície da Lua?",
                color: "#4A5568",
                answers: [
                    {
                        text: "Solo claro e rochoso",
                        image: "https://cdn.pixabay.com/photo/2011/12/14/12/13/lunar-surface-11088_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Montanhas com nuvens",
                        image: "https://cdn.pixabay.com/photo/2017/11/29/22/22/mountains-2987219_1280.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Floresta com bambu",
                        image: "https://cdn.pixabay.com/photo/2019/09/23/15/21/panda-4504579_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual imagem mais parece uma foto de equipamento espacial?",
                color: "#1D3557",
                answers: [
                    {
                        text: "Traje e capacete de astronauta",
                        image: "https://cdn.pixabay.com/photo/2016/11/19/20/16/astronaut-1840936_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Veleiro entre montanhas",
                        image: "https://cdn.pixabay.com/photo/2018/09/16/22/26/sailboat-4436708_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Panda ilustrado",
                        image: "https://cdn.pixabay.com/photo/2014/07/27/13/50/panda-400277_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Astronauta surreal refletido na agua",
                        image: "https://cdn.pixabay.com/photo/2019/04/06/06/44/astronaut-4106766_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: "Observador terrestre",
                image: "https://cdn.pixabay.com/photo/2011/12/14/12/13/lunar-surface-11088_640.jpg",
                text: "Você identificou algumas pistas, mas ainda há espaço para explorar melhor a missão e o cenário.",
                minValue: 0
            },
            {
                title: "Tripulante atento",
                image: "https://cdn.pixabay.com/photo/2011/12/14/12/11/astronaut-11080_640.jpg",
                text: "Você reconheceu bem as imagens clássicas do tema espacial e passou pelo quizz com firmeza.",
                minValue: 60
            }
        ]
    },
    {
        id: "show-travel",
        title: "Que estilo de viagem parece mais com você?",
        image: "https://cdn.pixabay.com/photo/2017/11/29/22/22/mountains-2987219_1280.jpg",
        questions: [
            {
                title: "Qual paisagem costuma aparecer em um roteiro de aventura?",
                color: "#3B6C87",
                answers: [
                    {
                        text: "Montanhas altas e ar aberto",
                        image: "https://cdn.pixabay.com/photo/2017/11/29/22/22/mountains-2987219_1280.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Solo lunar sem vegetacao",
                        image: "https://cdn.pixabay.com/photo/2011/12/14/12/13/lunar-surface-11088_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Astronauta na nave",
                        image: "https://cdn.pixabay.com/photo/2016/11/19/20/16/astronaut-1840936_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual imagem combina mais com um passeio costeiro?",
                color: "#2F7D8C",
                answers: [
                    {
                        text: "Um veleiro entre montanhas",
                        image: "https://cdn.pixabay.com/photo/2018/09/16/22/26/sailboat-4436708_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Panda em galho",
                        image: "https://cdn.pixabay.com/photo/2016/03/04/22/54/animal-1236875_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Caminhada espacial",
                        image: "https://cdn.pixabay.com/photo/2011/12/14/12/11/astronaut-11080_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual cena lembra melhor um dia simples de praia?",
                color: "#9B613C",
                answers: [
                    {
                        text: "Criancas brincando perto do mar",
                        image: "https://cdn.pixabay.com/photo/2017/08/07/12/47/ocean-2603504_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Montanhas e nuvens altas",
                        image: "https://cdn.pixabay.com/photo/2017/11/29/22/22/mountains-2987219_1280.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Panda com bambu",
                        image: "https://cdn.pixabay.com/photo/2019/09/23/15/21/panda-4504579_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: "Planejador inicial",
                image: "https://cdn.pixabay.com/photo/2017/08/07/12/47/ocean-2603504_640.jpg",
                text: "Você percebeu parte das imagens, mas ainda há espaço para diferenciar melhor clima, cenário e intenção.",
                minValue: 0
            },
            {
                title: "Roteirista atento",
                image: "https://cdn.pixabay.com/photo/2018/09/16/22/26/sailboat-4436708_640.jpg",
                text: "Você leu bem os sinais visuais do roteiro e atravessou o quizz com escolhas consistentes.",
                minValue: 60
            }
        ]
    }
];

let quizzTeste = clonarQuizz(SHOWCASE_QUIZZES[0]);
let qtdadePerguntas = 0;
let listaPerguntas = [];
let qtdadeNiveis = 0;
let listaNiveis = [];
let listaMeusQuizzes = [];
let listaTodosQuizzes = clonarQuizz(SHOWCASE_QUIZZES);
let quizzRecemCriado = null;
let quizzAtual = null;
let identificador = null;
let questoesrespondidas = 0;
let acertos = 0;
let porcentagemarredondada = 0;
let resultadoMostrado = false;
let nivelResultadoAtual = null;
let quizz = criarRascunhoQuizz();

function criarRascunhoQuizz() {
    return {
        title: "",
        image: FALLBACK_IMAGE,
        questions: [],
        levels: []
    };
}

function clonarQuizz(quizzOriginal) {
    return JSON.parse(JSON.stringify(quizzOriginal));
}

function embaralha() {
    return Math.random() - 0.5;
}

function ordenarNiveis(niveis) {
    return [...niveis].sort((a, b) => Number(a.minValue) - Number(b.minValue));
}

function normalizarId(id) {
    return String(id);
}

function possuiEstruturaCompleta(quiz) {
    return Boolean(quiz && Array.isArray(quiz.questions) && Array.isArray(quiz.levels));
}

function urlDeImagemValida(url) {
    return validarURL(url) ? url : FALLBACK_IMAGE;
}

function aplicarImagemDeFundo(elemento, url) {
    const imagem = urlDeImagemValida(url);
    elemento.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${imagem}')`;
}

function configurarImagem(elemento, url, alt) {
    elemento.src = urlDeImagemValida(url);
    elemento.alt = alt || "Imagem do quizz";
    elemento.addEventListener("error", () => {
        if (elemento.src.endsWith(FALLBACK_IMAGE)) {
            return;
        }
        elemento.src = FALLBACK_IMAGE;
    }, { once: true });
}

function createQuizz() {
    return clonarQuizz(SHOWCASE_QUIZZES[0]);
}

function chaveLocalStorage(id) {
    return `${LOCAL_STORAGE_PREFIX}${id}`;
}

function guardaMeusQuizzesLocalmente(quiz) {
    const quizzSerializado = JSON.stringify(quiz);
    localStorage.setItem(chaveLocalStorage(quiz.id), quizzSerializado);
}

function getMeuQuizzLocal(quiz) {
    const serializado = localStorage.getItem(chaveLocalStorage(quiz.id)) || localStorage.getItem(quiz.id);
    return serializado ? JSON.parse(serializado) : null;
}

function getMeuUltimoQuizzLocal(quiz) {
    return getMeuQuizzLocal(quiz);
}

function getAllQuizzesLocais() {
    listaMeusQuizzes = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const valor = localStorage.getItem(key);
        try {
            const quiz = JSON.parse(valor);
            if (possuiEstruturaCompleta(quiz) && quiz.id !== undefined && quiz.id !== null) {
                listaMeusQuizzes.push(quiz);
            }
        } catch (error) {
            console.warn(`Item ignorado no localStorage: ${key}`);
        }
    }
    return listaMeusQuizzes;
}

function atualizarStatusFeed(texto) {
    const status = document.querySelector(".feed-status");
    if (!status) {
        return;
    }
    status.textContent = texto;
    status.style.display = texto ? "block" : "none";
}

function quizPublicoConsistente(quiz) {
    if (!quiz || !quiz.title || !quiz.image) {
        return false;
    }

    const tituloNormalizado = quiz.title.toLowerCase();
    const imagemNormalizada = quiz.image.toLowerCase();
    const pareceTeste = /(test|integration|demo|delete|update|automatico|automated)/i.test(tituloNormalizado);
    const usaHostTemporario = [
        "example.com",
        "via.placeholder.com",
        "picsum.photos",
        "placeholder.com"
    ].some((host) => imagemNormalizada.includes(host));
    const pareceImagem = /\.(jpe?g|png|gif|webp)(\?|$)/i.test(imagemNormalizada);

    return !pareceTeste && !usaHostTemporario && pareceImagem;
}

function mesclarQuizzesPublicos(quizzesExternos) {
    const vistos = new Set();
    const assinaturas = new Set();
    const combinados = [];
    const externosFiltrados = quizzesExternos.filter((quiz) => quizPublicoConsistente(quiz));
    for (const quiz of [...SHOWCASE_QUIZZES, ...externosFiltrados]) {
        if (!quiz || quiz.id === undefined || quiz.id === null) {
            continue;
        }
        const id = normalizarId(quiz.id);
        const assinatura = `${(quiz.title || "").trim().toLowerCase()}::${(quiz.image || "").trim().toLowerCase()}`;
        if (vistos.has(id) || assinaturas.has(assinatura)) {
            continue;
        }
        vistos.add(id);
        assinaturas.add(assinatura);
        combinados.push(quiz);
    }
    return combinados;
}

function criarCardQuizz(quiz) {
    const card = document.createElement("article");
    card.className = "quiz-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("data-identifier", "quizz-card");
    aplicarImagemDeFundo(card, quiz.image);

    const titulo = document.createElement("h3");
    titulo.textContent = quiz.title || "Quizz sem titulo";
    card.appendChild(titulo);

    card.addEventListener("click", () => getQuizz(quiz.id));
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            getQuizz(quiz.id);
        }
    });
    return card;
}

function renderizarCards(container, quizzes) {
    if (!container) {
        return;
    }
    container.innerHTML = "";
    quizzes.forEach((quiz) => container.appendChild(criarCardQuizz(quiz)));
}

function renderizarMeusQuizzes() {
    getAllQuizzesLocais();
    const secaoMeusQuizzes = document.querySelector(".paginaum .meus-quizzes");
    const cabecalhoMeusQuizzes = document.querySelector(".paginaum .novo-quizz");
    const listaQuizzesCriados = document.querySelector(".paginaum .quizzes-criados");
    const criarPrimeiroQuizz = document.querySelector(".paginaum .criarprimeiroquizz");

    if (listaMeusQuizzes.length === 0) {
        secaoMeusQuizzes.style.display = "none";
        cabecalhoMeusQuizzes.style.display = "none";
        listaQuizzesCriados.style.display = "none";
        criarPrimeiroQuizz.style.display = "flex";
        return;
    }

    secaoMeusQuizzes.style.display = "flex";
    cabecalhoMeusQuizzes.style.display = "flex";
    listaQuizzesCriados.style.display = "flex";
    criarPrimeiroQuizz.style.display = "none";
    renderizarCards(listaQuizzesCriados, listaMeusQuizzes);
}

function renderizarTodosQuizzes(quizzes) {
    const listaQuizzes = document.querySelector(".quizzes");
    renderizarCards(listaQuizzes, quizzes);
}

function getAllQuizz() {
    renderizarMeusQuizzes();
    renderizarTodosQuizzes(listaTodosQuizzes);
    atualizarStatusFeed("");

    if (typeof axios === "undefined") {
        listaTodosQuizzes = clonarQuizz(SHOWCASE_QUIZZES);
        renderizarTodosQuizzes(listaTodosQuizzes);
        atualizarStatusFeed("Mostrando quizzes de demonstracao.");
        return;
    }

    const promise = axios.get(`${API_URL}/quizzes`);
    promise.then(pegouQuizz);
    promise.catch(() => {
        listaTodosQuizzes = clonarQuizz(SHOWCASE_QUIZZES);
        renderizarTodosQuizzes(listaTodosQuizzes);
        atualizarStatusFeed("Mostrando quizzes de demonstracao enquanto o servidor nao responde.");
    });
}

function pegouQuizz(resposta) {
    const quizzesExternos = Array.isArray(resposta.data) ? resposta.data : [];
    listaTodosQuizzes = mesclarQuizzesPublicos(quizzesExternos);
    quizzTeste = listaTodosQuizzes;
    renderizarTodosQuizzes(listaTodosQuizzes);
    atualizarStatusFeed(quizzesExternos.length === 0 ? "Mostrando quizzes de demonstracao." : "");
}

function pegaMeusQuizzes() {
    renderizarMeusQuizzes();
}

function encontrarQuizzLocalOuShowcase(id) {
    const alvo = normalizarId(id);
    getAllQuizzesLocais();
    const quizLocal = listaMeusQuizzes.find((quiz) => normalizarId(quiz.id) === alvo);
    if (quizLocal) {
        return quizLocal;
    }
    return SHOWCASE_QUIZZES.find((quiz) => normalizarId(quiz.id) === alvo) || null;
}

function getQuizz(here) {
    identificador = here;
    const quizDisponivelOffline = encontrarQuizzLocalOuShowcase(here);
    if (quizDisponivelOffline) {
        abrirQuizz({ data: clonarQuizz(quizDisponivelOffline) });
        return;
    }

    if (typeof axios === "undefined") {
        erroPegouQuizz(new Error("Servidor indisponivel."));
        return;
    }

    const promise = axios.get(`${API_URL}/quizzes/${here}`);
    promise.then(abrirQuizz);
    promise.catch(() => {
        if (quizDisponivelOffline) {
            abrirQuizz({ data: clonarQuizz(quizDisponivelOffline) });
            return;
        }
        erroPegouQuizz(new Error("Quizz nao encontrado."));
    });
}

function resetarEstadoQuizz() {
    questoesrespondidas = 0;
    acertos = 0;
    porcentagemarredondada = 0;
    resultadoMostrado = false;
    nivelResultadoAtual = null;
    document.querySelector(".fim").innerHTML = "";
}

function abrirQuizz(respostaquizz) {
    const quizEscolhido = respostaquizz.data;
    if (!possuiEstruturaCompleta(quizEscolhido)) {
        erroPegouQuizz(new Error("Dados do quizz incompletos."));
        return;
    }

    resetarEstadoQuizz();
    quizzAtual = clonarQuizz(quizEscolhido);

    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "block";
    document.querySelector(".cria-quizz .sucesso-quizz").style.display = "none";

    const paginaQuizz = document.querySelector(".pagina-quizz");
    paginaQuizz.innerHTML = "";

    const hero = document.createElement("section");
    hero.className = "titulo-quizz";
    aplicarImagemDeFundo(hero, quizzAtual.image);
    hero.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('${urlDeImagemValida(quizzAtual.image)}')`;

    const heroTitle = document.createElement("h2");
    const heroTitleText = document.createElement("span");
    heroTitleText.textContent = quizzAtual.title || "Quizz";
    heroTitle.appendChild(heroTitleText);
    hero.appendChild(heroTitle);
    paginaQuizz.appendChild(hero);

    quizzAtual.questions.forEach((pergunta, indicePergunta) => {
        const secaoPerguntas = document.createElement("section");
        secaoPerguntas.className = "perguntas";

        const cardPergunta = document.createElement("article");
        cardPergunta.className = "pergunta";
        cardPergunta.setAttribute("data-identifier", "question");

        const tituloPergunta = document.createElement("div");
        tituloPergunta.className = "titulo-pergunta";
        tituloPergunta.style.backgroundColor = pergunta.color || "#434CA0";

        const perguntaTitulo = document.createElement("h3");
        perguntaTitulo.textContent = pergunta.title || `Pergunta ${indicePergunta + 1}`;
        tituloPergunta.appendChild(perguntaTitulo);

        const blocoRespostas = document.createElement("div");
        blocoRespostas.className = `bloco-respostas esse${indicePergunta}`;
        blocoRespostas.dataset.respondida = "false";

        const respostasEmbaralhadas = [...pergunta.answers].sort(embaralha);
        respostasEmbaralhadas.forEach((resposta, indiceResposta) => {
            const respostaCard = document.createElement("div");
            respostaCard.className = `resposta pergunta${indicePergunta}${indiceResposta}`;
            respostaCard.setAttribute("data-identifier", "answer");
            respostaCard.dataset.correct = resposta.isCorrectAnswer ? "true" : "false";
            respostaCard.addEventListener("click", () => quizzSelecionado(indicePergunta, indiceResposta));

            const respostaImagem = document.createElement("img");
            configurarImagem(respostaImagem, resposta.image, resposta.text || "Imagem da resposta");

            const respostaTexto = document.createElement("h4");
            respostaTexto.textContent = resposta.text || "Resposta";

            respostaCard.appendChild(respostaImagem);
            respostaCard.appendChild(respostaTexto);
            blocoRespostas.appendChild(respostaCard);
        });

        cardPergunta.appendChild(tituloPergunta);
        cardPergunta.appendChild(blocoRespostas);
        secaoPerguntas.appendChild(cardPergunta);
        paginaQuizz.appendChild(secaoPerguntas);
    });

    window.scrollTo(0, 0);
}

function quizzSelecionado(numerodaquestao, opcao) {
    if (!quizzAtual || resultadoMostrado) {
        return;
    }

    const blocoPergunta = document.querySelector(`.esse${numerodaquestao}`);
    if (!blocoPergunta || blocoPergunta.dataset.respondida === "true") {
        return;
    }

    blocoPergunta.dataset.respondida = "true";
    const respostas = blocoPergunta.querySelectorAll(".resposta");
    const escolha = blocoPergunta.querySelector(`.pergunta${numerodaquestao}${opcao}`);
    if (!escolha) {
        return;
    }

    escolha.classList.add("escolhida");
    respostas.forEach((respostaCard) => {
        respostaCard.style.pointerEvents = "none";
        if (respostaCard !== escolha) {
            respostaCard.classList.add("nop");
        }
        if (respostaCard.dataset.correct === "true") {
            respostaCard.classList.add("acertou");
        } else {
            respostaCard.classList.add("errou");
        }
    });

    if (escolha.dataset.correct === "true") {
        acertos += 1;
    }
    questoesrespondidas += 1;
    quantidadeAcertos();

    setTimeout(() => {
        if (questoesrespondidas === quizzAtual.questions.length) {
            resultadoQuizz();
            return;
        }
        const perguntasNaTela = document.querySelectorAll(".pagina-quizz .pergunta");
        const proximaPergunta = perguntasNaTela[numerodaquestao + 1];
        if (proximaPergunta) {
            proximaPergunta.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, 1200);
}

function quantidadeAcertos() {
    if (!quizzAtual || quizzAtual.questions.length === 0) {
        porcentagemarredondada = 0;
        nivelResultadoAtual = null;
        return null;
    }

    porcentagemarredondada = Math.round((acertos / quizzAtual.questions.length) * 100);
    const niveisOrdenados = ordenarNiveis(quizzAtual.levels);
    nivelResultadoAtual = niveisOrdenados[0] || null;

    niveisOrdenados.forEach((nivel) => {
        if (porcentagemarredondada >= Number(nivel.minValue)) {
            nivelResultadoAtual = nivel;
        }
    });

    return nivelResultadoAtual;
}

function resultadoQuizz() {
    if (resultadoMostrado) {
        return;
    }

    resultadoMostrado = true;
    const nivelAtual = quantidadeAcertos();
    if (!nivelAtual) {
        return;
    }

    const fim = document.querySelector(".fim");
    fim.innerHTML = `
        <article class="resultado" data-identifier="quizz-result">
            <div class="titulo-resultado">
                <h3>${porcentagemarredondada}% ${nivelAtual.title}</h3>
            </div>
            <div class="conteudo-resultado">
                <img src="${urlDeImagemValida(nivelAtual.image)}" alt="Imagem do resultado">
                <span>${nivelAtual.text}</span>
            </div>
        </article>
        <div class="botoes">
            <button class="reiniciar-quizz" onclick="reiniciarQuizz()">
                <p>Reiniciar Quizz</p>
            </button>
            <button class="voltar-inicio" onclick="paginaInicial()">
                <p>Voltar pra home</p>
            </button>
        </div>`;

    const imagemResultado = fim.querySelector("img");
    if (imagemResultado) {
        configurarImagem(imagemResultado, nivelAtual.image, "Imagem do resultado");
    }
    const resultado = document.querySelector(".fim .resultado");
    if (resultado) {
        resultado.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function mostrarPaginaInicial() {
    resetarEstadoQuizz();
    document.querySelector(".pagina-quizz").style.display = "none";
    document.querySelector(".paginaum").style.display = "flex";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "none";
    document.querySelector(".cria-quizz .cria-perguntas").style.display = "none";
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    document.querySelector(".cria-quizz .sucesso-quizz").style.display = "none";
    getAllQuizz();
    window.scrollTo(0, 0);
}

function paginaInicial() {
    mostrarPaginaInicial();
}

function reiniciarQuizz() {
    if (!quizzAtual) {
        return;
    }
    abrirQuizz({ data: clonarQuizz(quizzAtual) });
}

function erroPegouQuizz(error) {
    alert(`Infelizmente nao foi possivel abrir este quizz.\n${error.message || ""}`);
}

function prepararQuizzLocalmente() {
    const quizzLocal = clonarQuizz(quizz);
    quizzLocal.id = `local-${Date.now()}`;
    quizzRecemCriado = quizzLocal;
    guardaMeusQuizzesLocalmente(quizzLocal);
    return quizzLocal;
}

function sendQuizz(quizzPronto) {
    if (typeof axios === "undefined") {
        falhouEnvio(new Error("Servidor indisponivel."));
        return;
    }
    const promise = axios.post(`${API_URL}/quizzes`, quizzPronto);
    promise.then(mandouQuizz);
    promise.catch(falhouEnvio);
}

function mandouQuizz() {
    const status = document.querySelector(".sucesso-quizz .criacao-status");
    if (status) {
        status.textContent = "Salvo neste dispositivo e enviado ao servidor.";
    }
}

function falhouEnvio() {
    const status = document.querySelector(".sucesso-quizz .criacao-status");
    if (status) {
        status.textContent = "Salvo neste dispositivo. O servidor nao respondeu desta vez.";
    }
}

function chamarTelaCriarQuizz() {
    quizz = criarRascunhoQuizz();
    quizzRecemCriado = null;
    listaPerguntas = [];
    listaNiveis = [];

    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "none";
    document.querySelector(".fim").innerHTML = "";
    document.querySelector(".cria-quizz .cria-perguntas").style.display = "none";
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    document.querySelector(".cria-quizz .sucesso-quizz").style.display = "none";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "flex";
    window.scrollTo(0, 0);
}

function validarDadosBasicos() {
    const tituloQuizz = document.querySelector(".vamos-comecar .titulo-quizz").value.trim();
    const imagemQuizz = document.querySelector(".vamos-comecar .url-quizz").value.trim();
    qtdadePerguntas = parseInt(document.querySelector(".vamos-comecar .numero-perguntas").value, 10);
    qtdadeNiveis = parseInt(document.querySelector(".vamos-comecar .quantidade-niveis").value, 10);

    let houveErro = false;
    if (tituloQuizz.length < 20 || tituloQuizz.length > 65) {
        alert("O titulo do quizz deve ter no minimo 20 e no maximo 65 caracteres.");
        houveErro = true;
    }
    if (!validarURL(imagemQuizz)) {
        alert("A imagem deve ser uma URL valida.");
        houveErro = true;
    }
    if (Number.isNaN(qtdadePerguntas) || qtdadePerguntas < MIN_PERGUNTAS) {
        alert("A quantidade de perguntas deve ser no minimo 3.");
        houveErro = true;
    }
    if (Number.isNaN(qtdadeNiveis) || qtdadeNiveis < MIN_NIVEIS) {
        alert("A quantidade de niveis deve ser no minimo 2.");
        houveErro = true;
    }

    if (houveErro) {
        return;
    }

    quizz.title = tituloQuizz;
    quizz.image = imagemQuizz;
    chamarTelaCriarPerguntas();
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
                <input class="url-resposta" type="url" placeholder="URL da imagem" />
            </div>
            <h2>Respostas incorretas</h2>
            <div class="resposta">
                <input class="texto-resposta" type="text" placeholder="Resposta incorreta 1" required="required" />
                <input class="url-resposta" type="url" placeholder="URL da imagem 1" />
            </div>
            <div class="resposta">
                <input class="texto-resposta" type="text" placeholder="Resposta incorreta 2" required="required" />
                <input class="url-resposta" type="url" placeholder="URL da imagem 2" />
            </div>
            <div class="resposta">
                <input class="texto-resposta" type="text" placeholder="Resposta incorreta 3" required="required" />
                <input class="url-resposta" type="url" placeholder="URL da imagem 3" />
            </div>
        </div>
        <div class="nova-pergunta" data-identifier="expand">
            <h2>Pergunta 2</h2>
            <img class="botaoEditar" src="img/editar.png" alt="Botao editar" onclick="abrirNovaPergunta(this)">
        </div>
        <div class="nova-pergunta" data-identifier="expand">
            <h2>Pergunta 3</h2>
            <img class="botaoEditar" src="img/editar.png" alt="Botao editar" onclick="abrirNovaPergunta(this)">
        </div>
    `;

    for (let i = 0; i < (qtdadePerguntas - MIN_PERGUNTAS); i++) {
        telaCriarPerguntas.innerHTML += `
            <div class="nova-pergunta" data-identifier="expand">
                <h2>Pergunta ${MIN_PERGUNTAS + i + 1}</h2>
                <img class="botaoEditar" src="img/editar.png" alt="Botao editar" onclick="abrirNovaPergunta(this)">
            </div>
        `;
    }

    telaCriarPerguntas.innerHTML += `
        <button class="prosseguir" onclick="validarTodasPerguntas()">
            <p>Prosseguir pra criar niveis</p>
        </button>
    `;
    telaCriarPerguntas.style.display = "flex";
}

function abrirNovaPergunta(elemento) {
    const novaPergunta = elemento.parentNode;
    novaPergunta.classList.add("pergunta");
    novaPergunta.classList.remove("nova-pergunta");
    novaPergunta.removeChild(elemento);
    novaPergunta.innerHTML += `
        <div class="cabecalho-pergunta">
            <input class="texto-pergunta" type="text" placeholder="Texto da pergunta" minlength="20" />
            <input class="cor-pergunta" type="color" placeholder="Cor de fundo da pergunta" />
        </div>
        <h2>Resposta correta</h2>
        <div class="resposta-correta">
            <input class="texto-resposta" type="text" placeholder="Resposta correta" required="required" />
            <input class="url-resposta" type="url" placeholder="URL da imagem" />
        </div>
        <h2>Respostas incorretas</h2>
        <div class="resposta">
            <input class="texto-resposta" type="text" placeholder="Resposta incorreta 1" required="required" />
            <input class="url-resposta" type="url" placeholder="URL da imagem 1" />
        </div>
        <div class="resposta">
            <input class="texto-resposta" type="text" placeholder="Resposta incorreta 2" required="required" />
            <input class="url-resposta" type="url" placeholder="URL da imagem 2" />
        </div>
        <div class="resposta">
            <input class="texto-resposta" type="text" placeholder="Resposta incorreta 3" required="required" />
            <input class="url-resposta" type="url" placeholder="URL da imagem 3" />
        </div>
    `;
    novaPergunta.style.display = "flex";
}

function montarNovaResposta(elementoResposta) {
    return {
        text: elementoResposta.children[0].value.trim(),
        image: elementoResposta.children[1].value.trim(),
        isCorrectAnswer: elementoResposta.classList.contains("resposta-correta")
    };
}

function montarNovaPergunta(titulo, cor, listaRespostasPergunta) {
    return {
        title: titulo.trim(),
        color: cor || "#434CA0",
        answers: [...listaRespostasPergunta]
    };
}

function validarTodasPerguntas() {
    listaPerguntas = [];
    const divsPerguntas = document.querySelectorAll(".cria-quizz .cria-perguntas .pergunta");
    if (divsPerguntas.length !== qtdadePerguntas) {
        alert("Abra e preencha todas as perguntas antes de continuar.");
        return;
    }

    for (let i = 0; i < divsPerguntas.length; i++) {
        if (!validarDadosPergunta(divsPerguntas[i])) {
            return;
        }
    }

    for (let i = 0; i < divsPerguntas.length; i++) {
        const respostasPergunta = [];
        respostasPergunta.push(montarNovaResposta(divsPerguntas[i].querySelector(".resposta-correta")));
        respostasPergunta.push(montarNovaResposta(divsPerguntas[i].querySelectorAll(".resposta")[0]));

        const respostasOpcionais = divsPerguntas[i].querySelectorAll(".resposta");
        if (respostasOpcionais[1].children[0].value.trim() !== "") {
            respostasPergunta.push(montarNovaResposta(respostasOpcionais[1]));
        }
        if (respostasOpcionais[2].children[0].value.trim() !== "") {
            respostasPergunta.push(montarNovaResposta(respostasOpcionais[2]));
        }

        listaPerguntas.push(montarNovaPergunta(
            divsPerguntas[i].querySelector(".texto-pergunta").value,
            divsPerguntas[i].querySelector(".cor-pergunta").value,
            respostasPergunta
        ));
    }

    quizz.questions = listaPerguntas;
    chamarTelaCriarNiveis();
}

function chamarTelaCriarNiveis() {
    document.querySelector(".cria-quizz .cria-perguntas").style.display = "none";
    const telaCriarNiveis = document.querySelector(".cria-quizz .cria-niveis");
    montarTelaCriarNiveis(telaCriarNiveis);
}

function montarTelaCriarNiveis(telaCriarNiveis) {
    telaCriarNiveis.innerHTML = `
        <h1>Agora, decida os niveis!</h1>
        <div class="nivel" data-identifier="level">
            <h2>Nivel 1</h2>
            <input class="titulo-nivel" type="text" placeholder="Titulo do nivel" minlength="10" />
            <input class="percentual-nivel" type="number" placeholder="% de acerto minima" min="0" max="100" />
            <input class="url-nivel" type="url" placeholder="URL da imagem do nivel" />
            <textarea class="descricao-nivel" type="text" placeholder="Descricao do nivel" minlength="30"></textarea>
        </div>
        <div class="novo-nivel" data-identifier="expand">
            <h2>Nivel 2</h2>
            <img class="botaoEditar" src="img/editar.png" alt="Botao editar" onclick="abrirNovoNivel(this)">
        </div>
    `;

    for (let i = 0; i < (qtdadeNiveis - MIN_NIVEIS); i++) {
        telaCriarNiveis.innerHTML += `
            <div class="novo-nivel" data-identifier="expand">
                <h2>Nivel ${MIN_NIVEIS + i + 1}</h2>
                <img class="botaoEditar" src="img/editar.png" alt="Botao editar" onclick="abrirNovoNivel(this)">
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
    const novoNivel = elemento.parentNode;
    novoNivel.classList.add("nivel");
    novoNivel.classList.remove("novo-nivel");
    novoNivel.removeChild(elemento);
    novoNivel.innerHTML += `
        <input class="titulo-nivel" type="text" placeholder="Titulo do nivel" minlength="10" />
        <input class="percentual-nivel" type="number" placeholder="% de acerto minima" min="0" max="100" />
        <input class="url-nivel" type="url" placeholder="URL da imagem do nivel" />
        <textarea class="descricao-nivel" type="text" placeholder="Descricao do nivel" minlength="30"></textarea>
    `;
}

function montarNovoNivel(nivel) {
    return {
        title: nivel.querySelector(".titulo-nivel").value.trim(),
        image: nivel.querySelector(".url-nivel").value.trim(),
        text: nivel.querySelector(".descricao-nivel").value.trim(),
        minValue: Number(nivel.querySelector(".percentual-nivel").value)
    };
}

function validarTodosNiveis() {
    listaNiveis = [];
    const divsNiveis = document.querySelectorAll(".cria-quizz .cria-niveis .nivel");
    if (divsNiveis.length !== qtdadeNiveis) {
        alert("Abra e preencha todos os niveis antes de finalizar.");
        return;
    }

    for (let i = 0; i < divsNiveis.length; i++) {
        if (!validarDadosNivel(divsNiveis[i])) {
            return;
        }
        listaNiveis.push(montarNovoNivel(divsNiveis[i]));
    }

    const niveisComZero = listaNiveis.filter((nivel) => Number(nivel.minValue) === 0);
    if (niveisComZero.length === 0) {
        alert("E obrigatorio existir pelo menos 1 nivel cuja % de acerto minima seja 0%.");
        return;
    }

    quizz.levels = ordenarNiveis(listaNiveis);
    const quizzLocal = prepararQuizzLocalmente();
    chamarTelaSucessoCriacaoQuizz(quizzLocal);
    sendQuizz(clonarQuizz(quizz));
}

function chamarTelaSucessoCriacaoQuizz(quizzCriado) {
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    const telaSucessoCriacaoQuizz = document.querySelector(".cria-quizz .sucesso-quizz");
    montarTelaSucessoCriacaoQuizz(telaSucessoCriacaoQuizz, quizzCriado);
}

function montarTelaSucessoCriacaoQuizz(telaSucessoCriacaoQuizz, quizzCriado) {
    const quizFinal = quizzCriado || quizzRecemCriado || quizz;
    telaSucessoCriacaoQuizz.innerHTML = `
        <h1>Seu quizz esta pronto!</h1>
        <figure class="fim-criacao-quizz"><h3></h3></figure>
        <p class="criacao-status">Salvo neste dispositivo.</p>
        <button class="acessar-quizz" onclick="acessarQuizzCriado()">
            <p>Acessar Quizz</p>
        </button>
        <button class="voltar-inicio" onclick="voltarInicio()">
            <p>Voltar pra home</p>
        </button>
    `;

    const figura = telaSucessoCriacaoQuizz.querySelector("figure");
    aplicarImagemDeFundo(figura, quizFinal.image);
    const tituloFigura = figura.querySelector("h3");
    tituloFigura.textContent = quizFinal.title;
    telaSucessoCriacaoQuizz.style.display = "flex";
    window.scrollTo(0, 0);
}

function acessarQuizzCriado() {
    if (!quizzRecemCriado) {
        return;
    }
    document.querySelector(".sucesso-quizz").style.display = "none";
    abrirQuizz({ data: clonarQuizz(quizzRecemCriado) });
}

function voltarInicio() {
    mostrarPaginaInicial();
}

function validarDadosPergunta(elemento) {
    const textoPergunta = elemento.querySelector(".cabecalho-pergunta .texto-pergunta").value.trim();
    const respostaCorreta = elemento.querySelector(".resposta-correta .texto-resposta").value.trim();
    const urlRespostaCorreta = elemento.querySelector(".resposta-correta .url-resposta").value.trim();
    const respostasIncorretas = elemento.querySelectorAll(".resposta");

    let contaRespostasIncorretas = 0;
    let contaUrlsValidas = 0;

    respostasIncorretas.forEach((resposta) => {
        const texto = resposta.querySelector(".texto-resposta").value.trim();
        const url = resposta.querySelector(".url-resposta").value.trim();
        if (texto !== "") {
            contaRespostasIncorretas += 1;
        }
        if (texto !== "" && validarURL(url)) {
            contaUrlsValidas += 1;
        }
    });

    const respostaValida = textoPergunta.length >= 20 &&
        respostaCorreta !== "" &&
        validarURL(urlRespostaCorreta) &&
        contaRespostasIncorretas >= 1 &&
        contaRespostasIncorretas === contaUrlsValidas;

    if (!respostaValida) {
        alert(`
            ERRO! Dados incompletos, verifique se os campos da sua pergunta cumprem os seguintes requisitos:
            1. O texto da pergunta deve ter no minimo 20 caracteres.
            2. A insercao da resposta correta e obrigatoria.
            3. A insercao de pelo menos 1 resposta errada e obrigatoria.
            4. A imagem deve ser uma URL valida.
            5. Cada resposta deve ter um texto e uma imagem com uma URL valida a ela associada.
        `);
        return false;
    }

    return true;
}

function validarDadosNivel(elemento) {
    const tituloNivel = elemento.querySelector(".titulo-nivel").value.trim();
    const percentualNivel = Number(elemento.querySelector(".percentual-nivel").value);
    const urlNivel = elemento.querySelector(".url-nivel").value.trim();
    const descricaoNivel = elemento.querySelector(".descricao-nivel").value.trim();

    if (
        tituloNivel.length < 10 ||
        Number.isNaN(percentualNivel) ||
        percentualNivel < 0 ||
        percentualNivel > 100 ||
        !validarURL(urlNivel) ||
        descricaoNivel.length < 30
    ) {
        alert(`
            ERRO! Dados incompletos, verifique se os campos do seu nivel cumprem os seguintes requisitos:
            1. O titulo do nivel deve ter no minimo 10 caracteres.
            2. O percentual de acerto minimo deve ser um numero entre 0 e 100.
            3. A imagem do nivel deve ser uma URL valida.
            4. A descricao do nivel deve ter no minimo 30 caracteres.
        `);
        return false;
    }
    return true;
}

function validarURL(texto) {
    const pattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    return !!pattern.test(texto);
}

getAllQuizz();
