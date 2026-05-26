const FEATURED_QUIZZES = [{
        id: "featured-pandas",
        title: "Pandas, bambu e bichos parecidos",
        image: "https://cdn.pixabay.com/photo/2016/09/04/22/44/panda-1645495_640.jpg",
        questions: [{
                title: "Qual destes animais e conhecido como pequeno panda?",
                color: "#D87449",
                answers: [{
                        text: "Panda vermelho",
                        image: "https://cdn.pixabay.com/photo/2018/06/30/19/02/panda-3508153_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Urso negro",
                        image: "https://cdn.pixabay.com/photo/2019/12/22/14/04/black-bear-4712621_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Urso pardo",
                        image: "https://cdn.pixabay.com/photo/2019/09/21/15/36/animal-4494180_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual foto mostra o panda gigante classico?",
                color: "#435761",
                answers: [{
                        text: "Panda gigante",
                        image: "https://cdn.pixabay.com/photo/2016/09/04/22/44/panda-1645495_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Panda vermelho",
                        image: "https://cdn.pixabay.com/photo/2018/06/30/19/02/panda-3508153_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Urso negro",
                        image: "https://cdn.pixabay.com/photo/2019/12/22/14/04/black-bear-4712621_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual alternativa mais combina com a dieta do panda gigante?",
                color: "#4D8A57",
                answers: [{
                        text: "Muita rotina de bambu",
                        image: "https://cdn.pixabay.com/photo/2016/09/04/22/44/panda-1645495_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Caca pesada de grande porte",
                        image: "https://cdn.pixabay.com/photo/2019/09/21/15/36/animal-4494180_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Vida de floresta sem nenhuma planta",
                        image: "https://cdn.pixabay.com/photo/2019/12/22/14/04/black-bear-4712621_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [{
                title: "Comecando no bambuzal",
                image: "https://cdn.pixabay.com/photo/2019/12/22/14/04/black-bear-4712621_640.jpg",
                text: "Voce reconheceu alguns sinais, mas ainda trocou alguns ursos no caminho. O quiz continua facil de repetir.",
                minValue: 0
            },
            {
                title: "Mestre dos pandas",
                image: "https://cdn.pixabay.com/photo/2018/06/30/19/02/panda-3508153_640.jpg",
                text: "Boa leitura visual. Voce separou panda gigante, panda vermelho e os ursos usados como distração sem tropeçar.",
                minValue: 70
            }
        ]
    },
    {
        id: "featured-selva",
        title: "Cores e sons da floresta tropical",
        image: "https://cdn.pixabay.com/photo/2018/01/30/22/48/rainforest-3119822_640.jpg",
        questions: [{
                title: "Qual ave tropical aparece com bico grande e colorido?",
                color: "#2D7D6A",
                answers: [{
                        text: "Tucano",
                        image: "https://cdn.pixabay.com/photo/2024/12/31/01/02/costa-rica-9301364_1280.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Papagaio verde",
                        image: "https://cdn.pixabay.com/photo/2024/12/28/03/20/parrot-9295172_1280.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Borboleta",
                        image: "https://cdn.pixabay.com/photo/2018/06/18/15/38/peacock-butterfly-3482707_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual imagem mostra um anfibio que vive bem em mata umida?",
                color: "#385D8A",
                answers: [{
                        text: "Sapo arboricola",
                        image: "https://cdn.pixabay.com/photo/2023/07/11/10/40/tree-frog-8120111_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Tucano",
                        image: "https://cdn.pixabay.com/photo/2024/12/31/01/02/costa-rica-9301364_1280.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Papagaio verde",
                        image: "https://cdn.pixabay.com/photo/2024/12/28/03/20/parrot-9295172_1280.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual cena representa melhor o ambiente da floresta tropical?",
                color: "#5A7C2A",
                answers: [{
                        text: "Mata fechada com agua corrente",
                        image: "https://cdn.pixabay.com/photo/2018/01/30/22/48/rainforest-3119822_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Borboleta em flores de lavanda",
                        image: "https://cdn.pixabay.com/photo/2018/06/18/15/38/peacock-butterfly-3482707_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Close do papagaio",
                        image: "https://cdn.pixabay.com/photo/2024/12/28/03/20/parrot-9295172_1280.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [{
                title: "Explorador iniciante",
                image: "https://cdn.pixabay.com/photo/2018/06/18/15/38/peacock-butterfly-3482707_640.jpg",
                text: "Voce ja reconhece algumas cores da mata, mas ainda pode treinar melhor aves, anfibios e ambiente.",
                minValue: 0
            },
            {
                title: "Olho afiado da selva",
                image: "https://cdn.pixabay.com/photo/2024/12/31/01/02/costa-rica-9301364_1280.jpg",
                text: "Boa leitura da floresta tropical. Voce pegou ave, anfibio e cenario certo com consistencia.",
                minValue: 70
            }
        ]
    }
];

const STORAGE_PREFIX = "buzzquizz:";

let quizz = {
    title: "Titulo do quizz",
    image: "https://cdn.pixabay.com/photo/2016/09/04/22/44/panda-1645495_640.jpg",
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
let quizzescolhido = null;
let identificador = null;
let questoesrespondidas = 0;
let acertos = 0;
let porcentagemarredondada = 0;
let nivelSelecionado = null;

function createQuizz() {
    return clonarQuizz(FEATURED_QUIZZES[0]);
}

function sendQuizz(quizzPronto) {
    const promise = requestJson("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", {
        method: "POST",
        body: quizzPronto
    });
    promise.then(mandouQuizz);
    promise.catch(falhouEnvio);
}

function mandouQuizz(response) {
    let quizz = response.data;
    guardaMeusQuizzesLocalmente(quizz);
    alert("Seu quizz foi adicionado ao servidor, com o id: " + quizz.id);
    quizzRecemCriado = quizz;
}

function falhouEnvio(error) {
    const detalhe = error.response ? error.response.data : error.message;
    alert(`
        Infelizmente seu quizz não pôde ser enviado ao servidor.
        ${detalhe}
    `);
}

function guardaMeusQuizzesLocalmente(quizz) {
    const quizzSerializado = JSON.stringify(quizz);
    localStorage.setItem(`${STORAGE_PREFIX}${quizz.id}`, quizzSerializado);
}

function getMeuQuizzLocal(quizz) {
    const quizzSerializado = localStorage.getItem(`${STORAGE_PREFIX}${quizz.id}`) || localStorage.getItem(quizz.id);
    const meuQuizz = JSON.parse(quizzSerializado);

    return meuQuizz;
}

function getMeuUltimoQuizzLocal(quizz) {
    const quizzSerializado = localStorage.getItem(`${STORAGE_PREFIX}${quizz.id}`) || localStorage.getItem(quizz.id);
    const meuQuizz = JSON.parse(quizzSerializado);

    return meuQuizz;
}

function getAllQuizzesLocais() {
    listaMeusQuizzes = [];
    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        if (!chave || (!chave.startsWith(STORAGE_PREFIX) && !/^\d+$/.test(chave))) {
            continue;
        }
        try {
            const quizzSerializado = localStorage.getItem(chave);
            const meuQuizz = JSON.parse(quizzSerializado);
            if (meuQuizz && meuQuizz.id && meuQuizz.title) {
                listaMeusQuizzes.push(meuQuizz);
            }
        } catch (erro) {
            console.warn("Quiz local ignorado por estar inválido.");
        }
    }
}

function getAllQuizz() {
    const containerStatus = document.querySelector(".app-notice");
    getAllQuizzesLocais();
    document.querySelector(".paginaum .quizzes").innerHTML = "";
    document.querySelector(".paginaum .quizzes-criados").innerHTML = "";
    document.querySelector(".paginaum .novo-quizz").style.display = "none";
    document.querySelector(".paginaum .quizzes-criados").style.display = "none";

    if (listaMeusQuizzes.length > 0) {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "none";
        document.querySelector(".paginaum .meus-quizzes").style.display = "flex";
        document.querySelector(".paginaum .novo-quizz").style.display = "flex";
        document.querySelector(".paginaum .quizzes-criados").style.display = "inline-flex";
        pegaMeusQuizzes();
    } else {
        document.querySelector(".paginaum .meus-quizzes").style.display = "none";
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "flex";
    }

    renderizarQuizzesDisponiveis(FEATURED_QUIZZES);
    if (containerStatus) {
        containerStatus.textContent = "Quizzes em destaque carregados. Buscando quizzes do servidor...";
    }
    const promise = requestJson("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(pegouQuizz);
    promise.catch(erroPegouQuizz);
}

function getQuizz(here) {
    identificador = here;
    const quizzLocal = FEATURED_QUIZZES.find((item) => String(item.id) === String(here));
    if (quizzLocal) {
        abrirQuizz(clonarQuizz(quizzLocal));
        return;
    }
    const meuQuizz = listaMeusQuizzes.find((item) => String(item.id) === String(here));
    if (meuQuizz) {
        abrirQuizz(clonarQuizz(meuQuizz));
        return;
    }
    const promise = requestJson("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + here);
    promise.then(abrirQuizz);
    promise.catch(erroPegouQuizz);
}

function pegouQuizz(resposta) {
    const quizzesDoServidor = filtrarQuizzesDoServidor(Array.isArray(resposta.data) ? resposta.data : []);
    const containerStatus = document.querySelector(".app-notice");
    renderizarQuizzesDisponiveis([...FEATURED_QUIZZES, ...quizzesDoServidor]);
    if (containerStatus) {
        containerStatus.textContent = `${FEATURED_QUIZZES.length} quizzes em destaque e ${quizzesDoServidor.length} quizzes públicos exibidos.`;
    }
}

function renderizarQuizzesDisponiveis(quizzesDisponiveis) {
    const todosQuizzes = document.querySelector(".quizzes");
    todosQuizzes.innerHTML = "";
    for (let i = 0; i < quizzesDisponiveis.length; i++) {
        todosQuizzes.appendChild(criarCardQuizz(quizzesDisponiveis[i], "quizz-remoto"));
    }
}

function pegaMeusQuizzes() {
    const meusQuizzes = document.querySelector(".quizzes-criados");
    meusQuizzes.innerHTML = "";
    for (let i = 0; i < listaMeusQuizzes.length; i++) {
        meusQuizzes.appendChild(criarCardQuizz(listaMeusQuizzes[i], "meu-quizz"));
    }
}

function criarCardQuizz(quizzItem, classeBase) {
    const artigo = document.createElement("article");
    artigo.className = classeBase;
    artigo.onclick = () => getQuizz(quizzItem.id);
    artigo.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${quizzItem.image}')`;
    artigo.innerHTML = `<h3>${quizzItem.title}</h3>`;
    return artigo;
}

function clonarQuizz(quizzOriginal) {
    return {
        ...quizzOriginal,
        questions: (quizzOriginal.questions || []).map((questionItem) => ({
            ...questionItem,
            answers: (questionItem.answers || []).map((answerItem) => ({ ...answerItem }))
        })),
        levels: (quizzOriginal.levels || []).map((levelItem) => ({ ...levelItem }))
    };
}

function filtrarQuizzesDoServidor(quizzesDoServidor) {
    const assinaturaVista = new Set();
    const imagemVista = new Set();
    return quizzesDoServidor.filter((quizzItem) => {
        const titulo = String(quizzItem.title || "").trim();
        const imagem = String(quizzItem.image || "").trim();
        const assinatura = `${titulo}|${imagem}`;
        const urlInutil = /(example\.com|placeholder|amazon\.com)/i.test(imagem);
        const tituloDeTeste = /(automated|integration|sample|delete|update|temp test|test quiz|teste|automático|automatico|validação|validacao)/i.test(titulo);
        const tituloRepetidoSemSentido = /^(.)\1{10,}$/.test(titulo);

        if (!titulo || titulo.length < 20 || !imagem || !validarURL(imagem) || assinaturaVista.has(assinatura) || imagemVista.has(imagem) ||
            urlInutil || tituloDeTeste || tituloRepetidoSemSentido) {
            return false;
        }
        if (!Array.isArray(quizzItem.questions) || quizzItem.questions.length === 0) {
            return false;
        }
        if (!Array.isArray(quizzItem.levels) || quizzItem.levels.length === 0) {
            return false;
        }

        assinaturaVista.add(assinatura);
        imagemVista.add(imagem);
        return true;
    });
}

function requestJson(url, options) {
    const requestOptions = {
        method: options && options.method ? options.method : "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (options && options.body !== undefined) {
        requestOptions.body = JSON.stringify(options.body);
    }

    return fetch(url, requestOptions).then(async (response) => {
        const data = await response.json().catch(() => null);
        if (!response.ok) {
            throw {
                response: { data },
                message: `Erro ${response.status}`
            };
        }
        return { data };
    });
}

function embaralha() {
    return Math.random() - 0.5;
}

function abrirQuizz(respostaquizz) {
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "block";
    quizzescolhido = respostaquizz && respostaquizz.data ? respostaquizz.data : respostaquizz;
    quizzescolhido = clonarQuizz(quizzescolhido);
    questoesrespondidas = 0;
    acertos = 0;
    porcentagemarredondada = 0;
    nivelSelecionado = null;
    document.querySelector(".fim").innerHTML = "";
    let titulo = document.querySelector(".pagina-quizz");
    titulo.innerHTML = `      
        <section class="titulo-quizz">
            <h2> <span>${quizzescolhido.title}</span></h2>
        </section>`
    const umquizz = document.querySelector(".titulo-quizz");
    umquizz.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('${quizzescolhido.image}')`;
    for (let x = 0; x < quizzescolhido.questions.length; x++) {
        quizzescolhido.questions[x].answers.sort(embaralha);
        titulo.innerHTML += `
            <section class="perguntas" id="depoisdesse">
                <article data-identifier="question" class="pergunta questao-${x}" id="pergunta">
                    <div class="titulo-pergunta" style="background-color: ${quizzescolhido.questions[x].color}">
                        <h3>${quizzescolhido.questions[x].title}</h3>
                    </div>
                    <div class="bloco-respostas esse${x}"></div>
                </article>
            </section>`
        let classpergunta = document.querySelector(`.esse${x}`);
        for (let y = 0; y < quizzescolhido.questions[x].answers.length; y++) {
            classpergunta.innerHTML += `
            <div data-identifier="answer" id="pergunta${x}${y}" class="resposta pergunta${x}${y} ${quizzescolhido.questions[x].answers[y].isCorrectAnswer}" onclick="quizzSelecionado(${x},${y})">
                <img src="${quizzescolhido.questions[x].answers[y].image}" alt="">
                <h4>${quizzescolhido.questions[x].answers[y].text}</h4>
            </div> `
        }
    }
    window.scrollTo(0, 0)
}

function quizzSelecionado(numerodaquestao, opcao) {
    let escolha = document.querySelector(`.pergunta${numerodaquestao}${opcao}`);
    escolha.classList.add("escolhida");
    for (let z = 0; z < quizzescolhido.questions[numerodaquestao].answers.length; z++) {
        let umaopcao = document.querySelector(`.pergunta${numerodaquestao}${z}`);
        umaopcao.removeAttribute('onclick');
        if (umaopcao != escolha) {
            umaopcao.classList.add("nop");
        }
        if (umaopcao.classList.contains(false)) {
            umaopcao.classList.add("errou");
        } else {
            umaopcao.classList.add("acertou");
        }
    }

    if (escolha.classList.contains(true)) {
        acertos += 1;
    }
    questoesrespondidas += 1;
    quantidadeAcertos();

    setTimeout(() => {
        if (questoesrespondidas === quizzescolhido.questions.length) {
            resultadoQuizz();
            return;
        }
        const proximaQuestao = document.querySelector(`.questao-${numerodaquestao + 1}`);
        if (proximaQuestao) {
            proximaQuestao.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, 1200);
}

function quantidadeAcertos() {
    porcentagemarredondada = Math.round((acertos / quizzescolhido.questions.length) * 100);
    const niveisOrdenados = [...quizzescolhido.levels].sort((nivelA, nivelB) => Number(nivelA.minValue) - Number(nivelB.minValue));
    nivelSelecionado = niveisOrdenados[0];

    for (let i = 0; i < niveisOrdenados.length; i++) {
        if (porcentagemarredondada >= Number(niveisOrdenados[i].minValue)) {
            nivelSelecionado = niveisOrdenados[i];
        }
    }
    return nivelSelecionado;
}

function resultadoQuizz() {
    quantidadeAcertos();
    let perguntas = document.querySelector(".fim");
    perguntas.innerHTML = `
        <article class="resultado" data-identifier="quizz-result">
            <div class="titulo-resultado">
                <h3>${porcentagemarredondada}% ${nivelSelecionado.title}</h3>
            </div>
            <div class="conteudo-reultado">
                <img src="${nivelSelecionado.image}" alt="Imagem do resultado">
                <span>${nivelSelecionado.text}</span>
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
    const irpara = document.querySelector(".voltar-inicio")
    irpara.scrollIntoView()
}

function paginaInicial() {
    window.location.reload();
}

function reiniciarQuizz() {
    document.querySelector(".fim").innerHTML = "";
    getQuizz(identificador);
}

function erroPegouQuizz(error) {
    const containerStatus = document.querySelector(".app-notice");
    const detalhe = error && error.response ? error.response.data : (error ? error.message : "");
    if (containerStatus) {
        containerStatus.textContent = "O servidor não respondeu agora. Os quizzes em destaque continuam disponíveis.";
    }
    console.warn("Falha ao buscar quizzes do servidor.", detalhe);
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
    if (!Number.isInteger(qtdadePerguntas) || qtdadePerguntas < 3) {
        alert("A quantidade de perguntas deve ser no mínimo 3.");
    }
    qtdadeNiveis = parseInt(document.querySelector(".vamos-comecar .quantidade-niveis").value);
    if (!Number.isInteger(qtdadeNiveis) || qtdadeNiveis < 2) {
        alert("A quantidade de níveis deve ser no mínimo 2.");
    }
    if ((tituloQuizz.length >= 20) && (validarURL(imagemQuizz)) && Number.isInteger(qtdadePerguntas) && (qtdadePerguntas >= 3) &&
        Number.isInteger(qtdadeNiveis) && (qtdadeNiveis >= 2)) {
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

    const divsPerguntas = document.querySelectorAll(".cria-quizz .cria-perguntas .pergunta");

    if (divsPerguntas.length !== qtdadePerguntas) {
        alert(`Abra e preencha todas as ${qtdadePerguntas} perguntas antes de prosseguir.`);
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
            <input class="titulo-nivel" type="text" placeholder="Título do nível" minlength="10" />
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
        <input class="titulo-nivel" type="text" placeholder="Título do nível" minlength="10" />
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
    const divsNiveis = document.querySelectorAll(".cria-quizz .cria-niveis .nivel");
    let contPercentualNivelZero = 0;

    if (divsNiveis.length !== qtdadeNiveis) {
        alert(`Abra e preencha todos os ${qtdadeNiveis} níveis antes de finalizar.`);
        return;
    }

    for (let i = 0; i < divsNiveis.length; i++) {
        if (Number(divsNiveis[i].querySelector(".percentual-nivel").value) === 0) {
            contPercentualNivelZero++;
        }
    }

    if (contPercentualNivelZero === 0) {
        alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%.");
        return;
    } else {
        for (let i = 0; i < divsNiveis.length; i++) {
            if (!validarDadosNivel(divsNiveis[i])) {
                return;
            }
            listaNiveis.push(montarNovoNivel(divsNiveis[i]));
        }

        listaNiveis.sort((nivelA, nivelB) => nivelA.minValue - nivelB.minValue);
        quizz.levels = listaNiveis;
        chamarTelaSucessoCriacaoQuizz();
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
        <button class="acessar-quizz" onclick="acessarQuizzCriado()">
            <p>Acessar Quizz</p>
        </button>
        <button class="voltar-inicio" onclick="voltarInicio()">
            <p>Voltar pra home</p>
        </button>    
    `;

    telaSucessoCriacaoQuizz.querySelector("figure").style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("${quizz.image}")`;
    telaSucessoCriacaoQuizz.style.display = "flex";
}

function acessarQuizzCriado() {
    if (!quizzRecemCriado || !quizzRecemCriado.id) {
        alert("O quiz ainda não recebeu confirmação do servidor.");
        return;
    }
    getQuizz(quizzRecemCriado.id);
    document.querySelector(".sucesso-quizz").style.display = "none";
}

function voltarInicio() {
    getAllQuizzesLocais();
    document.querySelector(".sucesso-quizz").style.display = "none";
    document.querySelector(".paginaum").style.display = "flex";
    document.querySelector(".paginaum .todososquizzes").style.display = "flex";
    if (listaMeusQuizzes.length > 0) {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "none";
        document.querySelector(".paginaum .meus-quizzes").style.display = "flex";
        document.querySelector(".paginaum .novo-quizz").style.display = "flex";
        document.querySelector(".paginaum .quizzes-criados").style.display = "inline-flex";
        pegaMeusQuizzes();
    } else {
        document.querySelector(".paginaum .meus-quizzes").style.display = "none";
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "flex";
    }
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

function validarDadosNivel(elementoNivel) {
    const elemento = elementoNivel || document.querySelector(".nivel");
    let tituloNivel = elemento.querySelector(".titulo-nivel").value;
    let percentualNivel = parseInt(elemento.querySelector(".percentual-nivel").value);
    let urlNivel = elemento.querySelector(".url-nivel").value;
    let descricaoNivel = elemento.querySelector(".descricao-nivel").value;


    if ((tituloNivel.length < 10) || (!Number.isInteger(percentualNivel)) || ((percentualNivel < 0) || (percentualNivel > 100)) || (!validarURL(urlNivel)) ||
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
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(texto);
}

getAllQuizz();
