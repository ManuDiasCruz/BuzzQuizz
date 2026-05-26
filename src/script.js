const API_URL = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
const LOCAL_STORAGE_PREFIX = "buzzquizz:";
const FALLBACK_IMAGE = "https://cdn.pixabay.com/photo/2016/03/04/22/54/animal-1236875_1280.jpg";

const FALLBACK_QUIZZES = [
    {
        id: "fallback-pandas",
        title: "Qual panda fofinho voce e?",
        image: "https://cdn.pixabay.com/photo/2019/09/08/19/54/panda-4461766_1280.jpg",
        questions: [
            {
                title: "Outro urso fofinho tambem e conhecido como panda menor. Qual e?",
                color: "#F05C5C",
                answers: [
                    {
                        text: "Panda-vermelho",
                        image: "https://cdn.pixabay.com/photo/2023/01/29/12/53/red-panda-7753226_1280.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Panda-gigante",
                        image: "https://cdn.pixabay.com/photo/2019/09/08/19/54/panda-4461766_1280.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Urso-pardo",
                        image: "https://cdn.pixabay.com/photo/2017/03/12/21/37/bear-2138184_1280.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Raposa-vermelha",
                        image: "https://cdn.pixabay.com/photo/2015/10/12/22/43/fox-985292_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual alimento aparece com frequencia na dieta do panda-gigante?",
                color: "#55AA65",
                answers: [
                    {
                        text: "Bambu",
                        image: "https://cdn.pixabay.com/photo/2019/03/28/20/46/bamboo-4088009_1280.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Panquecas",
                        image: "https://cdn.pixabay.com/photo/2017/05/07/08/56/pancakes-2291908_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Espaguete",
                        image: "https://cdn.pixabay.com/photo/2017/11/08/22/18/spaghetti-2931846_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Pateis",
                        image: "https://cdn.pixabay.com/photo/2017/03/10/13/57/cooking-2132874_1280.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual imagem mostra um panda-gigante em vez de um panda-vermelho?",
                color: "#6ACAE2",
                answers: [
                    {
                        text: "Panda com bambu",
                        image: "https://cdn.pixabay.com/photo/2019/09/08/19/54/panda-4461766_1280.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Panda-vermelho no tronco",
                        image: "https://cdn.pixabay.com/photo/2016/02/11/20/45/red-panda-1194504_1280.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Urso-pardo",
                        image: "https://cdn.pixabay.com/photo/2017/03/12/21/37/bear-2138184_1280.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Raposa-vermelha",
                        image: "https://cdn.pixabay.com/photo/2015/10/12/22/43/fox-985292_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: "Panda Master",
                image: "https://cdn.pixabay.com/photo/2019/09/08/19/54/panda-4461766_1280.jpg",
                text: "Parabens! Voce reconhece pandas, habitos e detalhes importantes com bastante seguranca.",
                minValue: 67
            },
            {
                title: "Explorador panda",
                image: "https://cdn.pixabay.com/photo/2023/01/29/12/53/red-panda-7753226_1280.jpg",
                text: "Voce ja conhece algumas curiosidades, mas ainda pode explorar mais sobre pandas gigantes e pandas-vermelhos.",
                minValue: 34
            },
            {
                title: "Aprendiz panda",
                image: "https://cdn.pixabay.com/photo/2016/02/11/20/45/red-panda-1194504_1280.jpg",
                text: "Voce esta comecando agora. Vale revisar os habitos, imagens e diferencas entre as especies.",
                minValue: 0
            }
        ]
    },
    {
        id: "fallback-pontos-turisticos",
        title: "Voce reconhece estes pontos turisticos?",
        image: "https://cdn.pixabay.com/photo/2024/02/24/20/48/palais-royal-8594719_1280.jpg",
        questions: [
            {
                title: "Qual destes monumentos fica em Paris, na Franca?",
                color: "#EC362D",
                answers: [
                    {
                        text: "Torre Eiffel",
                        image: "https://cdn.pixabay.com/photo/2024/11/30/15/55/eiffel-tower-9235220_1280.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Coliseu",
                        image: "https://cdn.pixabay.com/photo/2025/03/31/21/30/italy-9505450_1280.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Taj Mahal",
                        image: "https://cdn.pixabay.com/photo/2019/04/07/07/52/taj-mahal-4109110_1280.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Space Needle",
                        image: "https://cdn.pixabay.com/photo/2023/05/29/22/29/seattle-8027337_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "O Coliseu e um anfiteatro antigo localizado em qual cidade?",
                color: "#434CA0",
                answers: [
                    {
                        text: "Roma",
                        image: "https://cdn.pixabay.com/photo/2025/03/31/21/30/italy-9505450_1280.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Paris",
                        image: "https://cdn.pixabay.com/photo/2019/02/21/18/52/paris-4011964_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Agra",
                        image: "https://cdn.pixabay.com/photo/2019/04/07/07/52/taj-mahal-4109110_1280.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Seattle",
                        image: "https://cdn.pixabay.com/photo/2023/05/29/22/29/seattle-8027337_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual imagem representa o Taj Mahal, um mausoleu famoso da India?",
                color: "#2A9D8F",
                answers: [
                    {
                        text: "Taj Mahal",
                        image: "https://cdn.pixabay.com/photo/2019/04/07/07/52/taj-mahal-4109110_1280.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Palais-Royal",
                        image: "https://cdn.pixabay.com/photo/2024/02/24/20/48/palais-royal-8594719_1280.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Torre Eiffel",
                        image: "https://cdn.pixabay.com/photo/2024/09/21/15/07/eiffel-tower-9064240_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Coliseu",
                        image: "https://cdn.pixabay.com/photo/2025/03/31/21/30/italy-9505450_1280.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: "Viajante expert",
                image: "https://cdn.pixabay.com/photo/2024/11/30/15/55/eiffel-tower-9235220_1280.jpg",
                text: "Voce reconhece pontos turisticos famosos e consegue ligar imagens a suas cidades com facilidade.",
                minValue: 67
            },
            {
                title: "Roteiro em progresso",
                image: "https://cdn.pixabay.com/photo/2024/02/24/20/48/palais-royal-8594719_1280.jpg",
                text: "Voce acertou parte do caminho. Revisar cidades e monumentos vai deixar seu roteiro mais seguro.",
                minValue: 34
            },
            {
                title: "Primeiro passaporte",
                image: "https://cdn.pixabay.com/photo/2023/05/29/22/29/seattle-8027337_640.jpg",
                text: "Voce ainda esta no comeco da viagem. Use as imagens como pista e tente novamente depois.",
                minValue: 0
            }
        ]
    }
];

let quizzTeste = FALLBACK_QUIZZES[0];
let level = {
    title: "Titulo do nivel 1",
    image: FALLBACK_IMAGE,
    text: "Descricao do nivel 1",
    minValue: 0
};
let question = {
    title: "Titulo da pergunta 1",
    color: "#123456",
    answers: []
};
let answer = {
    text: "Texto da resposta 1",
    image: FALLBACK_IMAGE,
    isCorrectAnswer: false
};
let quizz = criarQuizzVazio();

let qtdadePerguntas = 0;
const MIN_PERGUNTAS = 3;
let listaPerguntas = [];

let qtdadeNiveis = 0;
const MIN_NIVEIS = 2;
let listaNiveis = [];

let listaMeusQuizzes = [];
let quizzRecemCriado;
let existeQuizzUsuario = false;
let identificador;
let quizzescolhido;
let quizzAtualOriginal;
let questoesrespondidas = 0;
let acertos = 0;
let porcentagem = 0;
let leveltotal = 0;
let umacerto = 0;
let porcentagemarredondada = 0;
let numeronoarray = 0;
let u = 0;

function criarQuizzVazio() {
    return {
        title: "Titulo do quizz",
        image: FALLBACK_IMAGE,
        questions: [],
        levels: []
    };
}

function createQuizz() {
    return FALLBACK_QUIZZES[0];
}

function escapeHTML(value) {
    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function normalizarURLImagem(url) {
    return validarURL(url) ? url : FALLBACK_IMAGE;
}

function normalizarCor(cor) {
    return /^#[0-9A-F]{6}$/i.test(cor) ? cor : "#EC362D";
}

function embaralha() {
    return Math.random() - 0.5;
}

function quizEhValido(quiz) {
    return Boolean(
        quiz &&
        quiz.id !== undefined &&
        quiz.title &&
        quiz.image &&
        Array.isArray(quiz.questions) &&
        Array.isArray(quiz.levels)
    );
}

function quizPodeSerJogado(quiz) {
    return Boolean(
        quizEhValido(quiz) &&
        quiz.questions.length > 0 &&
        quiz.levels.length > 0 &&
        quiz.questions.every((pergunta) => Array.isArray(pergunta.answers) && pergunta.answers.length >= 2)
    );
}

function getAllQuizzesLocais() {
    listaMeusQuizzes = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const quizzSerializado = localStorage.getItem(key);

        try {
            const quizLocal = JSON.parse(quizzSerializado);
            if (quizEhValido(quizLocal)) {
                listaMeusQuizzes.push(quizLocal);
            }
        } catch (error) {
            // Ignora outros itens do localStorage que nao pertencem ao BuzzQuizz.
        }
    }

    existeQuizzUsuario = listaMeusQuizzes.length > 0;
    return listaMeusQuizzes;
}

function getMeuQuizzLocal(quizzLocal) {
    const id = quizzLocal && quizzLocal.id;
    return buscarQuizzLocalPorId(id);
}

function getMeuUltimoQuizzLocal(quizzLocal) {
    return getMeuQuizzLocal(quizzLocal);
}

function buscarQuizzLocalPorId(id) {
    const idTexto = String(id);
    const chavesPossiveis = [`${LOCAL_STORAGE_PREFIX}${idTexto}`, idTexto];

    for (const chave of chavesPossiveis) {
        const quizzSerializado = localStorage.getItem(chave);
        if (!quizzSerializado) {
            continue;
        }

        try {
            const quizLocal = JSON.parse(quizzSerializado);
            if (quizEhValido(quizLocal)) {
                return quizLocal;
            }
        } catch (error) {
            return null;
        }
    }

    return getAllQuizzesLocais().find((quizLocal) => String(quizLocal.id) === idTexto) || null;
}

function buscarQuizzFallbackPorId(id) {
    return FALLBACK_QUIZZES.find((quizFallback) => String(quizFallback.id) === String(id)) || null;
}

function setFeedback(mensagem, tipo = "info") {
    const feedback = document.querySelector(".quizzes-feedback");
    if (!feedback) {
        return;
    }

    feedback.textContent = mensagem;
    feedback.className = `feedback quizzes-feedback ${tipo}`;
    feedback.style.display = mensagem ? "block" : "none";
}

function prepararTelaInicial() {
    document.querySelector(".paginaum").style.display = "flex";
    document.querySelector(".pagina-quizz").style.display = "none";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "none";
    document.querySelector(".cria-quizz .cria-perguntas").style.display = "none";
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    document.querySelector(".cria-quizz .sucesso-quizz").style.display = "none";
    document.querySelector(".fim").innerHTML = "";
}

function getAllQuizz() {
    prepararTelaInicial();

    const meusQuizzes = getAllQuizzesLocais();
    document.querySelector(".quizzes").innerHTML = "";
    document.querySelector(".quizzes-criados").innerHTML = "";

    if (meusQuizzes.length > 0) {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "none";
        document.querySelector(".paginaum .meus-quizzes").style.display = "flex";
        document.querySelector(".paginaum .novo-quizz").style.display = "flex";
        document.querySelector(".paginaum .quizzes-criados").style.display = "inline-flex";
        pegaMeusQuizzes(meusQuizzes);
    } else {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "flex";
        document.querySelector(".paginaum .meus-quizzes").style.display = "none";
    }

    document.querySelector(".paginaum .todososquizzes").style.display = "flex";
    setFeedback("Carregando quizzes...", "info");

    const promise = axios.get(API_URL);
    promise.then(pegouQuizz);
    promise.catch(erroPegouQuizz);
}

function getQuizz(id) {
    identificador = id;

    const quizLocal = buscarQuizzLocalPorId(id);
    const quizFallback = buscarQuizzFallbackPorId(id);
    if (quizLocal || quizFallback) {
        abrirQuizz({ data: quizLocal || quizFallback });
        return;
    }

    const promise = axios.get(`${API_URL}/${id}`);
    promise.then(abrirQuizz);
    promise.catch(erroPegouQuizz);
}

function abrirQuizzLocal(id) {
    getQuizz(id);
}

function renderizarCardsQuizzes(quizzes, container) {
    container.innerHTML = "";

    quizzes.forEach((quiz) => {
        const card = document.createElement("article");
        card.className = "quizz-card";
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `Abrir quizz ${quiz.title}`);
        card.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url("${normalizarURLImagem(quiz.image)}")`;

        const titulo = document.createElement("h3");
        titulo.textContent = quiz.title;
        card.appendChild(titulo);

        card.addEventListener("click", () => getQuizz(quiz.id));
        card.addEventListener("keydown", (evento) => {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                getQuizz(quiz.id);
            }
        });

        container.appendChild(card);
    });
}

function pegouQuizz(resposta) {
    const quizzesRemotos = Array.isArray(resposta.data) ? resposta.data.filter(quizEhValido) : [];
    const idsFallback = new Set(FALLBACK_QUIZZES.map((quiz) => String(quiz.id)));
    const quizzesSemDuplicidade = quizzesRemotos.filter((quiz) => !idsFallback.has(String(quiz.id)));
    const todosQuizzes = [...FALLBACK_QUIZZES, ...quizzesSemDuplicidade];

    quizzTeste = todosQuizzes;
    renderizarCardsQuizzes(todosQuizzes, document.querySelector(".quizzes"));
    setFeedback("", "info");
}

function pegaMeusQuizzes(meusQuizzes = listaMeusQuizzes) {
    renderizarCardsQuizzes(meusQuizzes, document.querySelector(".quizzes-criados"));
}

function abrirQuizz(respostaquizz) {
    const quizRecebido = respostaquizz.data || respostaquizz;

    if (!quizPodeSerJogado(quizRecebido)) {
        alert("Este quizz esta incompleto ou possui dados invalidos.");
        return;
    }

    quizzAtualOriginal = quizRecebido;
    questoesrespondidas = 0;
    acertos = 0;
    porcentagem = 0;
    leveltotal = 0;
    umacerto = 0;
    porcentagemarredondada = 0;
    numeronoarray = 0;
    u = 0;

    quizzescolhido = {
        ...quizRecebido,
        questions: quizRecebido.questions.map((pergunta) => ({
            ...pergunta,
            answers: [...pergunta.answers].sort(embaralha)
        }))
    };

    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".cria-quizz .sucesso-quizz").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "block";
    document.querySelector(".fim").innerHTML = "";

    const paginaQuizz = document.querySelector(".pagina-quizz");
    paginaQuizz.innerHTML = `
        <section class="titulo-quizz">
            <h2><span>${escapeHTML(quizzescolhido.title)}</span></h2>
        </section>
        <section class="perguntas"></section>
    `;

    const titulo = paginaQuizz.querySelector(".titulo-quizz");
    titulo.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url("${normalizarURLImagem(quizzescolhido.image)}")`;

    const perguntas = paginaQuizz.querySelector(".perguntas");
    quizzescolhido.questions.forEach((pergunta, indicePergunta) => {
        const section = document.createElement("section");
        section.className = "perguntas";
        section.innerHTML = `
            <article data-identifier="question" data-question-index="${indicePergunta}" class="pergunta" id="pergunta-${indicePergunta}">
                <div class="titulo-pergunta" style="background-color: ${normalizarCor(pergunta.color)}">
                    <h3>${escapeHTML(pergunta.title)}</h3>
                </div>
                <div class="bloco-respostas esse${indicePergunta}"></div>
            </article>
        `;

        const blocoRespostas = section.querySelector(".bloco-respostas");
        pergunta.answers.forEach((resposta, indiceResposta) => {
            blocoRespostas.innerHTML += `
                <div data-identifier="answer" data-correct="${Boolean(resposta.isCorrectAnswer)}" id="pergunta${indicePergunta}${indiceResposta}" class="resposta pergunta${indicePergunta}${indiceResposta}" onclick="quizzSelecionado(${indicePergunta}, ${indiceResposta})">
                    <img src="${normalizarURLImagem(resposta.image)}" alt="${escapeHTML(resposta.text)}" loading="lazy" onerror="this.src='${FALLBACK_IMAGE}'">
                    <h4>${escapeHTML(resposta.text)}</h4>
                </div>
            `;
        });

        perguntas.appendChild(section);
    });

    window.scrollTo(0, 0);
}

function quizzSelecionado(numerodaquestao, opcao) {
    const pergunta = document.querySelector(`[data-question-index="${numerodaquestao}"]`);
    if (!pergunta || pergunta.dataset.respondida === "true") {
        return;
    }

    const escolha = document.querySelector(`.pergunta${numerodaquestao}${opcao}`);
    if (!escolha) {
        return;
    }

    pergunta.dataset.respondida = "true";
    escolha.classList.add("escolhida");

    const opcoes = pergunta.querySelectorAll(".resposta");
    opcoes.forEach((umaOpcao) => {
        umaOpcao.removeAttribute("onclick");

        if (umaOpcao !== escolha) {
            umaOpcao.classList.add("nop");
        }

        if (umaOpcao.dataset.correct === "true") {
            umaOpcao.classList.add("acertou");
        } else {
            umaOpcao.classList.add("errou");
        }
    });

    if (escolha.dataset.correct === "true") {
        acertos += 1;
    }

    questoesrespondidas += 1;

    setTimeout(() => {
        if (questoesrespondidas === quizzescolhido.questions.length) {
            resultadoQuizz();
            return;
        }

        const proximaPergunta = document.querySelector(`[data-question-index="${numerodaquestao + 1}"]`);
        if (proximaPergunta) {
            proximaPergunta.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, 2000);
}

function quantidadeAcertos() {
    porcentagemarredondada = Math.round((acertos / quizzescolhido.questions.length) * 100);
    return porcentagemarredondada;
}

function buscarNivelResultado(percentual) {
    const niveisOrdenados = [...quizzescolhido.levels].sort((nivelA, nivelB) => Number(nivelB.minValue) - Number(nivelA.minValue));
    return niveisOrdenados.find((nivelAtual) => percentual >= Number(nivelAtual.minValue)) || niveisOrdenados[niveisOrdenados.length - 1];
}

function resultadoQuizz() {
    quantidadeAcertos();
    const nivelResultado = buscarNivelResultado(porcentagemarredondada);
    const fim = document.querySelector(".fim");

    fim.innerHTML = `
        <article class="resultado" data-identifier="quizz-result">
            <div class="titulo-resultado">
                <h3>${porcentagemarredondada}% ${escapeHTML(nivelResultado.title)}</h3>
            </div>
            <div class="conteudo-resultado conteudo-reultado">
                <img src="${normalizarURLImagem(nivelResultado.image)}" alt="Imagem do resultado" onerror="this.src='${FALLBACK_IMAGE}'">
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
        </div>
    `;

    fim.querySelector(".resultado").scrollIntoView({ behavior: "smooth", block: "start" });
}

function paginaInicial() {
    window.location.reload();
}

function reiniciarQuizz() {
    if (quizzAtualOriginal) {
        abrirQuizz({ data: quizzAtualOriginal });
        return;
    }

    if (identificador) {
        getQuizz(identificador);
    }
}

function erroPegouQuizz(error) {
    renderizarCardsQuizzes(FALLBACK_QUIZZES, document.querySelector(".quizzes"));
    setFeedback("Nao foi possivel carregar o servidor agora. Mostrando quizzes locais de exemplo.", "warning");
    console.error("Falha ao carregar quizzes", error);
}

function chamarTelaCriarQuizz() {
    quizz = criarQuizzVazio();
    listaPerguntas = [];
    listaNiveis = [];
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "none";
    document.querySelector(".fim").innerHTML = "";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "flex";
}

function validarDadosBasicos() {
    const tituloQuizz = document.querySelector(".vamos-comecar .titulo-quizz").value.trim();
    const imagemQuizz = document.querySelector(".vamos-comecar .url-quizz").value.trim();
    qtdadePerguntas = parseInt(document.querySelector(".vamos-comecar .numero-perguntas").value, 10);
    qtdadeNiveis = parseInt(document.querySelector(".vamos-comecar .quantidade-niveis").value, 10);

    const erros = [];
    if (tituloQuizz.length < 20 || tituloQuizz.length > 65) {
        erros.push("O titulo do quizz deve ter entre 20 e 65 caracteres.");
    }
    if (!validarURL(imagemQuizz)) {
        erros.push("A imagem do quizz deve ser uma URL http ou https valida.");
    }
    if (!Number.isInteger(qtdadePerguntas) || qtdadePerguntas < MIN_PERGUNTAS) {
        erros.push("A quantidade de perguntas deve ser no minimo 3.");
    }
    if (!Number.isInteger(qtdadeNiveis) || qtdadeNiveis < MIN_NIVEIS) {
        erros.push("A quantidade de niveis deve ser no minimo 2.");
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
                <input class="cor-pergunta" type="color" value="#EC362D" placeholder="Cor de fundo da pergunta" />
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
    const novapergunta = elemento.parentNode;
    novapergunta.classList.add("pergunta");
    novapergunta.classList.remove("nova-pergunta");
    novapergunta.removeChild(elemento);
    novapergunta.innerHTML += `
        <div class="cabecalho-pergunta">
            <input class="texto-pergunta" type="text" placeholder="Texto da pergunta" minlength="20" />
            <input class="cor-pergunta" type="color" value="#EC362D" placeholder="Cor de fundo da pergunta" />
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

    novapergunta.style.display = "flex";
    novapergunta.style.flexDirection = "column";
    novapergunta.style.justifyContent = "center";
}

function montarNovaResposta(elementoResposta) {
    const textoResposta = elementoResposta.querySelector(".texto-resposta").value.trim();
    const urlResposta = elementoResposta.querySelector(".url-resposta").value.trim();
    const ehRespostaCorreta = elementoResposta.classList.contains("resposta-correta");

    return {
        text: textoResposta,
        image: urlResposta,
        isCorrectAnswer: ehRespostaCorreta
    };
}

function validarTodasPerguntas() {
    listaPerguntas = [];
    const divsPerguntas = Array.from(document.querySelectorAll(".cria-quizz .cria-perguntas .pergunta"));

    if (divsPerguntas.length !== qtdadePerguntas) {
        alert("Abra e preencha todas as perguntas antes de prosseguir.");
        return;
    }

    for (const divPergunta of divsPerguntas) {
        if (!validarDadosPergunta(divPergunta)) {
            return;
        }

        const listaRespostas = [
            montarNovaResposta(divPergunta.querySelector(".resposta-correta"))
        ];

        divPergunta.querySelectorAll(".resposta").forEach((respostaIncorreta) => {
            const texto = respostaIncorreta.querySelector(".texto-resposta").value.trim();
            const url = respostaIncorreta.querySelector(".url-resposta").value.trim();

            if (texto !== "" && url !== "") {
                listaRespostas.push(montarNovaResposta(respostaIncorreta));
            }
        });

        listaPerguntas.push(montarNovaPergunta(
            divPergunta.querySelector(".texto-pergunta").value.trim(),
            divPergunta.querySelector(".cor-pergunta").value,
            listaRespostas
        ));
    }

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

    novoNivel.style.display = "flex";
    novoNivel.style.flexDirection = "column";
    novoNivel.style.justifyContent = "center";
}

function validarTodosNiveis() {
    listaNiveis = [];
    const divsNiveis = Array.from(document.querySelectorAll(".cria-quizz .cria-niveis .nivel"));

    if (divsNiveis.length !== qtdadeNiveis) {
        alert("Abra e preencha todos os niveis antes de finalizar.");
        return;
    }

    for (const divNivel of divsNiveis) {
        if (!validarDadosNivel(divNivel)) {
            return;
        }

        listaNiveis.push(montarNovoNivel(divNivel));
    }

    if (!listaNiveis.some((nivelAtual) => Number(nivelAtual.minValue) === 0)) {
        alert("E obrigatorio existir pelo menos 1 nivel cuja % de acerto minima seja 0%.");
        return;
    }

    quizz.levels = listaNiveis.sort((nivelA, nivelB) => Number(nivelA.minValue) - Number(nivelB.minValue));
    sendQuizz(quizz);
}

function montarNovoNivel(nivelElemento) {
    return {
        title: nivelElemento.querySelector(".titulo-nivel").value.trim(),
        image: nivelElemento.querySelector(".url-nivel").value.trim(),
        text: nivelElemento.querySelector(".descricao-nivel").value.trim(),
        minValue: Number(nivelElemento.querySelector(".percentual-nivel").value)
    };
}

function setEstadoEnvio(enviando) {
    const botao = document.querySelector(".finaliza-quizz");
    if (!botao) {
        return;
    }

    botao.disabled = enviando;
    botao.querySelector("p").textContent = enviando ? "Enviando..." : "Finalizar Quizz";
}

function sendQuizz(quizzPronto) {
    setEstadoEnvio(true);
    const promise = axios.post(API_URL, quizzPronto);
    promise.then(mandouQuizz);
    promise.catch(falhouEnvio);
    promise.finally(() => setEstadoEnvio(false));
}

function mandouQuizz(response) {
    const quizEnviado = response.data;
    guardaMeusQuizzesLocalmente(quizEnviado);
    quizzRecemCriado = quizEnviado;
    chamarTelaSucessoCriacaoQuizz();
}

function falhouEnvio(error) {
    const mensagem = error.response && error.response.data ? JSON.stringify(error.response.data) : "Tente novamente em instantes.";
    alert(`Infelizmente seu quizz nao pode ser enviado ao servidor.\n${mensagem}`);
}

function guardaMeusQuizzesLocalmente(quizLocal) {
    const quizzSerializado = JSON.stringify(quizLocal);
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${quizLocal.id}`, quizzSerializado);
}

function chamarTelaSucessoCriacaoQuizz() {
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    const telaSucessoCriacaoQuizz = document.querySelector(".cria-quizz .sucesso-quizz");
    montarTelaSucessoCriacaoQuizz(telaSucessoCriacaoQuizz);
}

function montarTelaSucessoCriacaoQuizz(telaSucessoCriacaoQuizz) {
    telaSucessoCriacaoQuizz.innerHTML = `
        <h1>Seu quizz esta pronto!</h1>
        <figure class="fim-criacao-quizz">
            <figcaption>${escapeHTML(quizzRecemCriado ? quizzRecemCriado.title : quizz.title)}</figcaption>
        </figure>
        <button class="acessar-quizz" onclick="acessarQuizzCriado()">
            <p>Acessar Quizz</p>
        </button>
        <button class="voltar-inicio" onclick="voltarInicio()">
            <p>Voltar pra home</p>
        </button>
    `;

    const imagemSucesso = quizzRecemCriado ? quizzRecemCriado.image : quizz.image;
    telaSucessoCriacaoQuizz.querySelector("figure").style.backgroundImage =
        `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("${normalizarURLImagem(imagemSucesso)}")`;
    telaSucessoCriacaoQuizz.style.display = "flex";
}

function acessarQuizzCriado() {
    if (!quizzRecemCriado || !quizzRecemCriado.id) {
        alert("Aguarde o envio do quizz terminar antes de acessar.");
        return;
    }

    document.querySelector(".sucesso-quizz").style.display = "none";
    getQuizz(quizzRecemCriado.id);
}

function entrarQuizz() {
    acessarQuizzCriado();
}

function voltarInicio() {
    paginaInicial();
}

function validarDadosPergunta(elemento) {
    const textoPergunta = elemento.querySelector(".cabecalho-pergunta .texto-pergunta").value.trim();
    const respostaCorreta = elemento.querySelector(".resposta-correta .texto-resposta").value.trim();
    const urlRespostaCorreta = elemento.querySelector(".resposta-correta .url-resposta").value.trim();
    const respostasIncorretas = Array.from(elemento.querySelectorAll(".resposta"));
    let respostasIncorretasValidas = 0;

    for (const respostaIncorreta of respostasIncorretas) {
        const texto = respostaIncorreta.querySelector(".texto-resposta").value.trim();
        const url = respostaIncorreta.querySelector(".url-resposta").value.trim();

        if (texto === "" && url === "") {
            continue;
        }

        if (texto === "" || !validarURL(url)) {
            alert("Cada resposta incorreta preenchida precisa ter texto e uma URL valida.");
            return false;
        }

        respostasIncorretasValidas++;
    }

    if (
        textoPergunta.length < 20 ||
        respostaCorreta === "" ||
        !validarURL(urlRespostaCorreta) ||
        respostasIncorretasValidas === 0
    ) {
        alert(`
ERRO! Verifique se os campos da sua pergunta cumprem os seguintes requisitos:
1. O texto da pergunta deve ter no minimo 20 caracteres.
2. A resposta correta e obrigatoria.
3. A resposta correta precisa de uma URL de imagem valida.
4. Pelo menos 1 resposta incorreta completa e obrigatoria.
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
        !Number.isFinite(percentualNivel) ||
        percentualNivel < 0 ||
        percentualNivel > 100 ||
        !validarURL(urlNivel) ||
        descricaoNivel.length < 30
    ) {
        alert(`
ERRO! Verifique se os campos do nivel cumprem os seguintes requisitos:
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
    try {
        const url = new URL(texto);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (error) {
        return false;
    }
}

getAllQuizz();
