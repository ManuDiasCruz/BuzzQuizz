/**
 * Quizzes de exemplo usados como fallback quando a API publica esta fora do ar
 * (antes a home simplesmente ficava vazia). Todas as imagens vem do Pixabay,
 * sob a Pixabay Content License (uso livre, sem necessidade de atribuicao).
 * Fonte: https://pixabay.com/images/search/
 */
const QUIZZES_EXEMPLO = [{
        id: "exemplo-panda",
        title: "Qual panda fofinho voce e? Descubra agora!",
        image: "https://cdn.pixabay.com/photo/2014/10/27/15/44/panda-505149_640.jpg",
        questions: [{
                title: "Outro urso fofinho tambem e um tipo de panda... qual?",
                color: "#F05C5C",
                answers: [{
                        text: "O pandinha vermelho",
                        image: "https://cdn.pixabay.com/photo/2016/11/23/01/03/red-panda-1851590_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "O urso pardo das montanhas",
                        image: "https://cdn.pixabay.com/photo/2015/07/24/18/22/brown-bear-858720_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "O urso negro americano",
                        image: "https://cdn.pixabay.com/photo/2017/08/19/16/03/black-bear-2659033_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "O urso polar do Artico",
                        image: "https://cdn.pixabay.com/photo/2013/10/16/14/04/polar-bear-196318_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Voce e um panda agora! Qual sua comida favorita?",
                color: "#55DD65",
                answers: [{
                        text: "Um gostoso e nutritivo bambu",
                        image: "https://cdn.pixabay.com/photo/2013/07/26/02/27/bamboo-167285_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Folhinhas fininhas e verdinhas",
                        image: "https://cdn.pixabay.com/photo/2013/05/05/19/26/leaves-108969_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Musguinho cheio de bichinhos",
                        image: "https://cdn.pixabay.com/photo/2020/03/10/13/56/moss-4919093_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "E qual das duas paletas de cor combina com voce?",
                color: "#6ACAE2",
                answers: [{
                        text: "Ruivo e alaranjado, como o panda vermelho",
                        image: "https://cdn.pixabay.com/photo/2016/11/23/13/15/red-panda-1852789_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Preto e branco, um classico que nunca sai de moda",
                        image: "https://cdn.pixabay.com/photo/2013/02/21/00/12/zebra-84073_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [{
                title: "Panda Master",
                image: "https://cdn.pixabay.com/photo/2016/02/16/10/46/panda-1203101_640.jpg",
                text: "PARABENS! Voce e um mestre em pandas! Sabe ate que existem duas fofuras nesse mundo com pesos bem diferentes: o Panda Gigante pesa de 65 a 110 kg, e o pequenino Panda Vermelho apenas de 3,7 a 6,2 kg.",
                minValue: 60
            },
            {
                title: "Iniciante no mundo panda",
                image: "https://cdn.pixabay.com/photo/2018/06/28/12/34/panda-3503779_640.jpg",
                text: "Meu caro amigo, voce ainda e um jovem padawan que tem muito a aprender sobre os pandas. Alem do famoso Panda Gigante preto e branco, existe um pequeno fofinho chamado Panda Vermelho que sempre rouba a cena.",
                minValue: 0
            }
        ]
    },
    {
        id: "exemplo-espaco",
        title: "Quanto voce conhece do nosso Sistema Solar?",
        image: "https://cdn.pixabay.com/photo/2014/10/04/12/13/milky-way-472971_640.jpg",
        questions: [{
                title: "Qual corpo celeste chamamos de Planeta Azul?",
                color: "#2D6CDF",
                answers: [{
                        text: "A Terra, nossa casa",
                        image: "https://cdn.pixabay.com/photo/2011/12/13/17/07/earth-11048_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Saturno e seus aneis",
                        image: "https://cdn.pixabay.com/photo/2014/05/10/18/10/saturn-341379_640.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "A Via Lactea inteira",
                        image: "https://cdn.pixabay.com/photo/2016/12/13/07/21/cosmos-1903435_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Quem pisou na Lua pela primeira vez, em 1969?",
                color: "#8E44AD",
                answers: [{
                        text: "Um astronauta da missao Apollo",
                        image: "https://cdn.pixabay.com/photo/2011/12/14/12/11/astronaut-11080_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Um foguete, sozinho e sem tripulacao",
                        image: "https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual missao levou os primeiros humanos a Lua?",
                color: "#E67E22",
                answers: [{
                        text: "A missao Apollo 11",
                        image: "https://cdn.pixabay.com/photo/2012/10/10/11/06/apollo-11-60617_640.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Uma expedicao saida de um castelo medieval",
                        image: "https://cdn.pixabay.com/photo/2016/02/03/01/12/castle-1176422_640.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [{
                title: "Astronauta veterano",
                image: "https://cdn.pixabay.com/photo/2016/01/20/15/11/astronaut-and-astronaut-1151684_640.jpg",
                text: "Excelente! Voce conhece o Sistema Solar como a palma da mao e ja pode assumir o comando da proxima missao tripulada.",
                minValue: 70
            },
            {
                title: "Cadete espacial",
                image: "https://cdn.pixabay.com/photo/2012/11/28/10/35/rocket-launch-67646_640.jpg",
                text: "Bom comeco! Ainda faltam algumas voltas em torno da orbita para virar especialista, mas a contagem regressiva ja comecou.",
                minValue: 0
            }
        ]
    }
];

// Imagem local (Pixabay Content License) usada quando uma URL remota falha.
const IMAGEM_FALLBACK = "img/quizz-placeholder.jpg";
const FALLBACK_ONERROR = "this.onerror=null;this.src='" + IMAGEM_FALLBACK + "';this.classList.add('imagem-fallback')";

let quizz = {
    title: "Título do quizz",
    image: IMAGEM_FALLBACK,
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

// Antes eram globais implicitas criadas dentro das funcoes (quebravam em modo estrito).
let identificador;
let quizzescolhido;

function sendQuizz(quizzPronto) {
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizzPronto);
    promise.then(mandouQuizz);
    promise.catch(falhouEnvio);
}

function mandouQuizz(response) {
    const quizzSalvo = response.data;
    guardaMeusQuizzesLocalmente(quizzSalvo);
    quizzRecemCriado = quizzSalvo;
    // A tela de sucesso agora aparece depois da confirmacao do servidor: antes
    // ela era exibida antes do POST e podia mentir sobre um envio que falhou.
    chamarTelaSucessoCriacaoQuizz();
}

function falhouEnvio(error) {
    // "error.data" era sempre undefined; a mensagem util fica em error.response.
    const detalhe = (error.response && error.response.data) || error.message || "";
    alert("Infelizmente seu quizz nao pode ser enviado ao servidor.\n" + detalhe);
}

function guardaMeusQuizzesLocalmente(quizz) {
    const quizzSerializado = JSON.stringify(quizz);
    localStorage.setItem(quizz.id, quizzSerializado);
}

function getMeuQuizzLocal(quizz) {
    const quizzSerializado = localStorage.getItem(quizz.id);
    const meuQuizz = JSON.parse(quizzSerializado);

    return meuQuizz;
}

function getMeuUltimoQuizzLocal(quizz) {
    const quizzSerializado = localStorage.getItem(quizz.id);
    const meuQuizz = JSON.parse(quizzSerializado);

    return meuQuizz;
}

function getAllQuizzesLocais() {
    // Reconstroi a lista do zero (antes duplicava a cada chamada) e ignora
    // chaves de localStorage que nao sejam quizzes validos (antes o JSON.parse
    // estourava e derrubava a renderizacao da home).
    listaMeusQuizzes = [];
    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        try {
            const quizzLocal = JSON.parse(localStorage.getItem(chave));
            if (quizzLocal && quizzLocal.id && quizzLocal.title) {
                listaMeusQuizzes.push(quizzLocal);
            }
        } catch (e) {
            // chave que nao pertence ao BuzzQuizz: apenas ignora
        }
    }
}

function getAllQuizz() {
    document.querySelector(".paginaum .novo-quizz").style.display = "none";
    document.querySelector(".paginaum .quizzes-criados").style.display = "none";
    getAllQuizzesLocais();
    if (listaMeusQuizzes.length !== 0) {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "none";
        document.querySelector(".paginaum .novo-quizz").style.display = "flex";
        document.querySelector(".paginaum .quizzes-criados").style.display = "inline-flex";
        document.querySelector(".paginaum .todososquizzes").style.display = "flex";
        document.querySelector(".paginaum .meus-quizzes").style.display = "flex";
        pegaMeusQuizzes();
    }
    document.querySelector(".quizzes").innerHTML = `<p class="carregando">Carregando quizzes...</p>`;
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(pegouQuizz);
    promise.catch(erroListaQuizzes);
}

function getQuizz(here) {
    identificador = here;

    const exemplo = QUIZZES_EXEMPLO.find((q) => q.id === here);
    if (exemplo) {
        // Quizz de exemplo: abre direto, sem depender da API.
        abrirQuizz({ data: JSON.parse(JSON.stringify(exemplo)) });
        return;
    }

    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + identificador);
    promise.then(abrirQuizz);
    promise.catch(erroPegouQuizz);
}

function pegouQuizz(resposta) {
    // Classes com prefixo proprio: "todos os quizzes" e "meus quizzes" usavam
    // ambos ".quizz0", ".quizz1"..., e o querySelector pegava sempre o primeiro
    // match, aplicando a capa no cartao errado.
    renderizarCartoes(document.querySelector(".quizzes"), resposta.data, "todos");
}

function renderizarCartoes(container, lista, prefixo) {
    container.innerHTML = lista
        .map((umQuizz, i) => `
        <article class="cartao-quizz ${prefixo}-quizz-${i}" onclick="getQuizz(${JSON.stringify(umQuizz.id)})">
            <h3>${umQuizz.title}</h3>
        </article>`)
        .join("");

    lista.forEach((umQuizz, i) => {
        const cartao = container.querySelector(`.${prefixo}-quizz-${i}`);
        cartao.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${umQuizz.image}'), url('${IMAGEM_FALLBACK}')`;
    });
}

function pegaMeusQuizzes() {
    getAllQuizzesLocais();
    renderizarCartoes(document.querySelector(".quizzes-criados"), listaMeusQuizzes, "meus");
}

/**
 * Fisher-Yates: distribuicao uniforme e sem mutar o array recebido.
 * "sort(() => Math.random() - 0.5)" e enviesado e depende da implementacao.
 */
function embaralhaLista(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function abrirQuizz(respostaquizz) {
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "block";
    quizzescolhido = respostaquizz.data;

    // Zera o estado da rodada anterior: sem isso, reiniciar um quizz mantinha os
    // acertos antigos e o resultado podia aparecer na hora errada.
    reiniciarContadores();

    const paginaQuizz = document.querySelector(".pagina-quizz");
    let html = `
        <section class="titulo-quizz">
            <h2> <span>${quizzescolhido.title}</span></h2>
        </section>`;

    for (let x = 0; x < quizzescolhido.questions.length; x++) {
        const pergunta = quizzescolhido.questions[x];
        pergunta.answers = embaralhaLista(pergunta.answers);

        let respostasHtml = "";
        for (let y = 0; y < pergunta.answers.length; y++) {
            const resposta = pergunta.answers[y];
            respostasHtml += `
                <div data-identifier="answer" id="resposta-${x}-${y}" class="resposta pergunta-${x}-${y}" onclick="quizzSelecionado(${x},${y})">
                    <img src="${resposta.image}" alt="${resposta.text}" onerror="${FALLBACK_ONERROR}">
                    <h4>${resposta.text}</h4>
                </div>`;
        }

        // Ids unicos com separador: antes "pergunta1" + resposta "2" colidia com
        // "pergunta12" + resposta "" em quizzes com 10+ perguntas/respostas.
        html += `
            <section class="perguntas">
                <article data-identifier="question" class="pergunta" id="pergunta-${x}">
                    <div class="titulo-pergunta" style="background-color: ${pergunta.color}">
                        <h3>${pergunta.title}</h3>
                    </div>
                    <div class="bloco-respostas">${respostasHtml}</div>
                </article>
            </section>`;
    }

    // Uma unica atribuicao de innerHTML em vez de "+=" dentro do laco.
    paginaQuizz.innerHTML = html;

    const umquizz = document.querySelector(".titulo-quizz");
    umquizz.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('${quizzescolhido.image}'), url('${IMAGEM_FALLBACK}')`;

    document.querySelector(".fim").innerHTML = "";
    window.scrollTo(0, 0);
}

function reiniciarContadores() {
    questoesrespondidas = 0;
    acertos = 0;
    perguntasRespondidas = new Set();
    porcentagemarredondada = 0;
    nivelAlcancado = null;
}

let questoesrespondidas = 0;
let acertos = 0;
let perguntasRespondidas = new Set();

const TEMPO_ATE_PROXIMA_PERGUNTA = 2000;

function quizzSelecionado(numerodaquestao, opcao) {
    // Uma pergunta ja respondida nao pode ser respondida de novo.
    if (perguntasRespondidas.has(numerodaquestao)) {
        return;
    }
    perguntasRespondidas.add(numerodaquestao);

    const respostas = quizzescolhido.questions[numerodaquestao].answers;
    const escolha = document.querySelector(`.pergunta-${numerodaquestao}-${opcao}`);
    escolha.classList.add("escolhida");

    for (let z = 0; z < respostas.length; z++) {
        const umaopcao = document.querySelector(`.pergunta-${numerodaquestao}-${z}`);
        umaopcao.removeAttribute("onclick");
        if (umaopcao !== escolha) {
            umaopcao.classList.add("nop");
        }
        // Le a resposta correta do proprio dado, e nao de uma classe "true"/"false".
        umaopcao.classList.add(respostas[z].isCorrectAnswer ? "acertou" : "errou");
    }

    if (respostas[opcao].isCorrectAnswer) {
        acertos += 1;
    }
    questoesrespondidas += 1;

    setTimeout(() => {
        if (questoesrespondidas === quizzescolhido.questions.length) {
            resultadoQuizz();
        } else {
            irParaProximaPerguntaNaoRespondida();
        }
    }, TEMPO_ATE_PROXIMA_PERGUNTA);
}

/** Rola para a proxima pergunta sem resposta (antes rolava para uma resposta). */
function irParaProximaPerguntaNaoRespondida() {
    for (let i = 0; i < quizzescolhido.questions.length; i++) {
        if (!perguntasRespondidas.has(i)) {
            const proxima = document.querySelector(`#pergunta-${i}`);
            if (proxima) {
                proxima.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            return;
        }
    }
}

let porcentagemarredondada = 0;
let nivelAlcancado = null;

/**
 * Percentual de acerto do usuario: acertos / total de perguntas.
 * A versao anterior somava os "minValue" dos niveis para achar o total, o que
 * gerava percentuais errados e ainda acumulava entre chamadas.
 */
function calcularPorcentagem() {
    const totalPerguntas = quizzescolhido.questions.length;
    if (totalPerguntas === 0) {
        return 0;
    }
    return Math.round((acertos / totalPerguntas) * 100);
}

/**
 * O nivel alcancado e o de maior "minValue" que o percentual do usuario atinge.
 * A API devolve os niveis em ordem arbitraria, por isso ordenamos antes de
 * comparar. Se nenhum nivel for atingido, cai no nivel mais baixo.
 */
function encontrarNivel(porcentagem) {
    const niveis = quizzescolhido.levels
        .map((nivel) => ({ ...nivel, minValue: Number(nivel.minValue) || 0 }))
        .sort((a, b) => a.minValue - b.minValue);

    let alcancado = niveis[0];
    for (const nivel of niveis) {
        if (porcentagem >= nivel.minValue) {
            alcancado = nivel;
        }
    }
    return alcancado;
}

function quantidadeAcertos() {
    porcentagemarredondada = calcularPorcentagem();
    nivelAlcancado = encontrarNivel(porcentagemarredondada);
    return nivelAlcancado;
}

function resultadoQuizz() {
    quantidadeAcertos();
    const nivel = nivelAlcancado;
    let perguntas = document.querySelector(".fim");
    perguntas.innerHTML = `
        <article class="resultado" data-identifier="quizz-result">
            <div class="titulo-resultado">
                <h3>${porcentagemarredondada}% ${nivel.title}</h3>
            </div>
            <div class="conteudo-reultado">
                <img src="${nivel.image}" alt="Imagem do resultado" onerror="${FALLBACK_ONERROR}">
                <span>${nivel.text}</span>
                <p class="placar-resultado">Voce acertou ${acertos} de ${quizzescolhido.questions.length} perguntas.</p>
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
    irpara = document.querySelector(".voltar-inicio")
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
    const detalhe = (error.response && error.response.status) || error.message || "";
    alert("Infelizmente nao foi possivel abrir esse quizz no servidor.\n" + detalhe);
}

/** Erro ao carregar a LISTA: mostra aviso na propria pagina, sem alert bloqueante. */
function erroListaQuizzes() {
    const container = document.querySelector(".quizzes");
    container.innerHTML =
        `<p class="carregando">Nao foi possivel carregar os quizzes do servidor. Enquanto isso, jogue os nossos exemplos:</p>`;
    const exemplos = document.createElement("div");
    exemplos.className = "quizzes";
    container.parentNode.appendChild(exemplos);
    renderizarCartoes(exemplos, QUIZZES_EXEMPLO, "exemplo");
}

function chamarTelaCriarQuizz() {
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "none";
    document.querySelector(".fim").innerHTML = "";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "flex";
    window.scrollTo(0, 0);
}

function validarDadosBasicos() {
    const tituloQuizz = document.querySelector(".vamos-comecar .titulo-quizz").value;
    const imagemQuizz = document.querySelector(".vamos-comecar .url-quizz").value;
    qtdadePerguntas = parseInt(document.querySelector(".vamos-comecar .numero-perguntas").value);
    qtdadeNiveis = parseInt(document.querySelector(".vamos-comecar .quantidade-niveis").value);

    // Junta tudo em UM aviso (antes o usuario levava ate 4 alerts em sequencia)
    // e passa a checar tambem o maximo de 65 caracteres, que era ignorado.
    const erros = [];
    if (tituloQuizz.length < 20 || tituloQuizz.length > 65) {
        erros.push("- O título do quizz deve ter entre 20 e 65 caracteres.");
    }
    if (!validarURL(imagemQuizz)) {
        erros.push("- A imagem do quizz deve ser uma URL válida.");
    }
    if (!(qtdadePerguntas >= MIN_PERGUNTAS)) {
        erros.push(`- A quantidade de perguntas deve ser no mínimo ${MIN_PERGUNTAS}.`);
    }
    if (!(qtdadeNiveis >= MIN_NIVEIS)) {
        erros.push(`- A quantidade de níveis deve ser no mínimo ${MIN_NIVEIS}.`);
    }

    if (erros.length > 0) {
        alert("Revise os dados do seu quizz:\n" + erros.join("\n"));
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

    // Antes esta funcao mutava e devolvia SEMPRE o mesmo objeto global "answer",
    // entao todas as respostas do quizz acabavam iguais a ultima preenchida.
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

    for (let i = 0; i < divsPerguntas.length; i++) {
        listaRespostas = [];
        if (!validarDadosPergunta(divsPerguntas[i])) {
            erroPreenchimento++;
        }
    }

    if (erroPreenchimento > 0) {
        // Antes remontava a tela e apagava tudo o que o usuario havia digitado.
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
    // Mesmo problema do objeto global compartilhado: agora devolve um novo objeto.
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
    let nivel;
    const divsNiveis = document.querySelectorAll(".cria-quizz .nivel");
    let contPercentualNivelZero = 0;
    let menorPercentual = 100;

    for (let i = 0; i < divsNiveis.length; i++) {

        if (divsNiveis[i].querySelector(".percentual-nivel").value == 0) {
            contPercentualNivelZero++;
        }
    }

    if (contPercentualNivelZero === 0) {
        alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%.");
        return;
    } else {
        for (let i = 0; i < divsNiveis.length; i++) {
            // Antes um nivel invalido dava "location.reload()" e o usuario perdia
            // TODO o quizz preenchido. Agora so interrompe e mantem a tela.
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
    // Objeto novo por nivel, e minValue como numero (a API espera number).
    return {
        title: nivel.querySelector(".titulo-nivel").value,
        image: nivel.querySelector(".url-nivel").value,
        text: nivel.querySelector(".descricao-nivel").value,
        minValue: Number(nivel.querySelector(".percentual-nivel").value) || 0
    };
}

function chamarTelaSucessoCriacaoQuizz() {
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    const telaSucessoCriacaoQuizz = document.querySelector(".cria-quizz .sucesso-quizz");
    montarTelaSucessoCriacaoQuizz(telaSucessoCriacaoQuizz);
}

function montarTelaSucessoCriacaoQuizz(telaSucessoCriacaoQuizz) {
    // Removido: aqui o codigo sobrescrevia quizz.image por uma URL truncada
    // ("…-family-...jpg", HTTP 400) ANTES do POST, entao todo quizz criado ia
    // para o servidor com a capa quebrada.
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

    // Era ".background" (propriedade inexistente no elemento) em vez de ".style.background".
    telaSucessoCriacaoQuizz.querySelector("figure").style.backgroundImage =
        `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("${quizz.image}"), url("${IMAGEM_FALLBACK}")`;
    telaSucessoCriacaoQuizz.style.display = "flex";
}

function acessarQuizzCriado() {
    if (!quizzRecemCriado) {
        alert("Seu quizz ainda esta sendo salvo. Tente novamente em instantes.");
        return;
    }
    document.querySelector(".sucesso-quizz").style.display = "none";
    getQuizz(quizzRecemCriado.id);
}

function voltarInicio() {
    document.querySelector(".sucesso-quizz").style.display = "none";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "none";
    document.querySelector(".cria-quizz .cria-perguntas").style.display = "none";
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "none";
    document.querySelector(".paginaum").style.display = "block";

    getAllQuizzesLocais();
    if (listaMeusQuizzes.length !== 0) {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "none";
        document.querySelector(".paginaum .meus-quizzes").style.display = "flex";
        document.querySelector(".paginaum .novo-quizz").style.display = "flex";
        document.querySelector(".paginaum .quizzes-criados").style.display = "inline-flex";
        document.querySelector(".paginaum .todososquizzes").style.display = "flex";
        // Antes so redesenhava a lista quando havia EXATAMENTE 1 quizz salvo,
        // entao a partir do segundo quizz a home voltava vazia.
        pegaMeusQuizzes();
    } else {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "flex";
    }
    window.scrollTo(0, 0);
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
    // Antes a funcao ignorava o parametro e lia sempre o PRIMEIRO nivel da tela,
    // ou seja, os niveis 2..N nunca eram validados de verdade.
    const nivel = elemento || document.querySelector(".cria-niveis .nivel");
    let tituloNivel = nivel.querySelector(".titulo-nivel").value;
    let percentualNivel = parseInt(nivel.querySelector(".percentual-nivel").value);
    let urlNivel = nivel.querySelector(".url-nivel").value;
    let descricaoNivel = nivel.querySelector(".descricao-nivel").value;


    if ((tituloNivel.length < 10) || ((percentualNivel < 0) || (percentualNivel > 100)) || (!validarURL(urlNivel)) ||
        (descricaoNivel.length < 30)) {
        alert(`
            ERRO! Dados incompletos, verifique se os campos do seu nível cumprem os seguintes requisitos:
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

// "Voltar pra home" recarrega a pagina, e o navegador restaurava a rolagem
// anterior: o usuario caia no meio da lista em vez do topo da home.
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

getAllQuizz();
