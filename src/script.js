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

const API_URL = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
const STORAGE_PREFIX = "buzzquizz:";
const FALLBACK_IMAGE = "img/pixabay/aurora.jpg";
const QUIZZ_LOCAL = {
    id: "natureza-em-foco",
    title: "Natureza em foco: você reconhece estas maravilhas?",
    image: "img/pixabay/aurora.jpg",
    questions: [
        {
            title: "Qual destes animais consegue pairar no ar enquanto se alimenta?",
            color: "#0F766E",
            answers: [
                { text: "Beija-flor", image: "img/pixabay/hummingbird.jpg", isCorrectAnswer: true },
                { text: "Panda-vermelho", image: "img/pixabay/red-panda.jpg", isCorrectAnswer: false },
                { text: "Peixe de recife", image: "img/pixabay/coral-reef.jpg", isCorrectAnswer: false }
            ]
        },
        {
            title: "Em qual ambiente encontramos corais e peixes tropicais?",
            color: "#0369A1",
            answers: [
                { text: "Recife tropical", image: "img/pixabay/coral-reef.jpg", isCorrectAnswer: true },
                { text: "Lago alpino", image: "img/pixabay/mountain-lake.jpg", isCorrectAnswer: false },
                { text: "Espaço profundo", image: "img/pixabay/galaxy.jpg", isCorrectAnswer: false }
            ]
        },
        {
            title: "Que fenômeno luminoso aparece próximo às regiões polares?",
            color: "#6D28D9",
            answers: [
                { text: "Aurora polar", image: "img/pixabay/aurora.jpg", isCorrectAnswer: true },
                { text: "Formação de recifes", image: "img/pixabay/coral-reef.jpg", isCorrectAnswer: false },
                { text: "Rotação de galáxias", image: "img/pixabay/galaxy.jpg", isCorrectAnswer: false }
            ]
        }
    ],
    levels: [
        {
            title: "Explorador curioso",
            image: "img/pixabay/red-panda.jpg",
            text: "Você está começando a observar os detalhes da natureza. Continue explorando: cada habitat reserva novas descobertas.",
            minValue: 0
        },
        {
            title: "Olhar de naturalista",
            image: "img/pixabay/mountain-lake.jpg",
            text: "Muito bem! Você reconhece animais, ambientes e fenômenos naturais com segurança.",
            minValue: 67
        }
    ]
};

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

function falhouEnvio(error) {
    const botao = document.querySelector(".cria-niveis .finaliza-quizz");
    if (botao) {
        botao.disabled = false;
        botao.textContent = "Finalizar quiz";
    }
    const mensagem = error?.response?.data?.message || "Tente novamente em instantes.";
    alert(`Infelizmente seu quiz não pôde ser enviado ao servidor. ${mensagem}`);
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

function ehQuizzValido(valor) {
    return Boolean(valor && typeof valor === "object" && valor.id !== undefined &&
        typeof valor.title === "string" && Array.isArray(valor.questions) && Array.isArray(valor.levels));
}

function escapeHtml(valor) {
    return String(valor ?? "").replace(/[&<>'"]/g, caractere => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;"
    }[caractere]));
}

function urlImagemSegura(valor) {
    if (typeof valor === "string" && /^img\/[a-z0-9_./-]+$/i.test(valor)) {
        return valor;
    }
    try {
        const url = new URL(valor);
        return ["http:", "https:"].includes(url.protocol) ? url.href : FALLBACK_IMAGE;
    } catch (_) {
        return FALLBACK_IMAGE;
    }
}

function corSegura(valor) {
    return /^#[0-9a-f]{6}$/i.test(valor) ? valor : "#434CA0";
}

function getAllQuizzesLocais() {
    listaMeusQuizzes = [];
    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        if (!chave || !chave.startsWith(STORAGE_PREFIX)) continue;
        try {
            const salvo = JSON.parse(localStorage.getItem(chave));
            if (ehQuizzValido(salvo)) listaMeusQuizzes.push(salvo);
        } catch (_) {
            // Ignora dados incompletos sem impedir que a home carregue.
        }
    }
    return listaMeusQuizzes;
}

function montarCartaoQuizz(item) {
    const idSeguro = String(item.id).replace(/[^a-z0-9_-]/gi, "");
    return `
        <article class="cartao-quizz" tabindex="0" role="button"
            data-quizz-id="${escapeHtml(idSeguro)}"
            data-image="${escapeHtml(urlImagemSegura(item.image))}"
            onclick="getQuizz(this.dataset.quizzId)"
            onkeydown="if(event.key === 'Enter' || event.key === ' '){ event.preventDefault(); getQuizz(this.dataset.quizzId); }">
            <h3>${escapeHtml(item.title)}</h3>
        </article>`;
}

function aplicarImagensCartoes(container) {
    container.querySelectorAll(".cartao-quizz").forEach(cartao => {
        cartao.style.backgroundImage = `linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, .55) 64%, #000 100%), url('${cartao.dataset.image}')`;
    });
}

function renderizarQuizzes(container, itens) {
    container.innerHTML = itens.map(montarCartaoQuizz).join("");
    aplicarImagensCartoes(container);
}

function getAllQuizz() {
    const meusQuizzes = getAllQuizzesLocais();
    const secaoMeusQuizzes = document.querySelector(".paginaum .meus-quizzes");
    const estadoVazio = document.querySelector(".paginaum .criarprimeiroquizz");
    const containerMeusQuizzes = document.querySelector(".paginaum .quizzes-criados");
    secaoMeusQuizzes.style.display = meusQuizzes.length ? "flex" : "none";
    estadoVazio.style.display = meusQuizzes.length ? "none" : "flex";
    if (meusQuizzes.length) renderizarQuizzes(containerMeusQuizzes, meusQuizzes);

    renderizarQuizzes(document.querySelector(".quizzes"), [QUIZZ_LOCAL]);
    const status = document.querySelector(".status-quizzes");
    if (status) status.textContent = "Carregando quizzes da comunidade…";

    axios.get(API_URL)
        .then(pegouQuizz)
        .catch(erroPegouQuizz);
}

function getQuizz(id) {
    identificador = id;
    if (id === String(QUIZZ_LOCAL.id)) {
        abrirQuizzDireto(QUIZZ_LOCAL);
        return;
    }
    axios.get(`${API_URL}/${encodeURIComponent(id)}`)
        .then(abrirQuizz)
        .catch(() => alert("Não foi possível abrir este quiz. Tente novamente em instantes."));
}

function pegouQuizz(resposta) {
    const quizzesRemotos = Array.isArray(resposta.data) ? resposta.data.filter(ehQuizzValido) : [];
    renderizarQuizzes(document.querySelector(".quizzes"), [QUIZZ_LOCAL, ...quizzesRemotos]);
    const status = document.querySelector(".status-quizzes");
    if (status) status.textContent = quizzesRemotos.length ? "" : "Nenhum quiz da comunidade disponível no momento.";
}

function pegaMeusQuizzes() {
    renderizarQuizzes(document.querySelector(".quizzes-criados"), getAllQuizzesLocais());
}

function embaralhar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

let quizzescolhido;
let identificador;
let questoesrespondidas = 0;
let acertos = 0;
let porcentagemarredondada = 0;

function abrirQuizz(respostaquizz) {
    abrirQuizzDireto(respostaquizz.data);
}

function abrirQuizzDireto(dadosDoQuizz) {
    if (!ehQuizzValido(dadosDoQuizz)) {
        alert("Este quiz possui dados incompletos e não pode ser exibido.");
        return;
    }
    quizzescolhido = dadosDoQuizz;
    questoesrespondidas = 0;
    acertos = 0;
    porcentagemarredondada = 0;
    document.querySelector(".fim").innerHTML = "";
    document.querySelector(".paginaum").style.display = "none";
    const pagina = document.querySelector(".pagina-quizz");
    pagina.style.display = "block";

    const perguntasHtml = dadosDoQuizz.questions.map((pergunta, indicePergunta) => {
        const respostasHtml = embaralhar(pergunta.answers).map((resposta, indiceResposta) => `
            <button type="button" data-identifier="answer" class="resposta"
                data-correct="${Boolean(resposta.isCorrectAnswer)}"
                onclick="quizzSelecionado(${indicePergunta}, ${indiceResposta}, this)">
                <img src="${escapeHtml(urlImagemSegura(resposta.image))}" alt="" loading="lazy"
                    onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'">
                <span>${escapeHtml(resposta.text)}</span>
            </button>`).join("");

        return `
            <article data-identifier="question" data-question-index="${indicePergunta}" class="pergunta">
                <div class="titulo-pergunta" style="background-color: ${corSegura(pergunta.color)}">
                    <h3>${escapeHtml(pergunta.title)}</h3>
                </div>
                <div class="bloco-respostas">${respostasHtml}</div>
            </article>`;
    }).join("");

    pagina.innerHTML = `
        <section class="titulo-quizz">
            <h2><span>${escapeHtml(dadosDoQuizz.title)}</span></h2>
        </section>
        <section class="perguntas">${perguntasHtml}</section>`;
    pagina.querySelector(".titulo-quizz").style.backgroundImage =
        `linear-gradient(rgba(0, 0, 0, .58), rgba(0, 0, 0, .58)), url('${urlImagemSegura(dadosDoQuizz.image)}')`;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function quizzSelecionado(numerodaquestao, _opcao, escolha) {
    const pergunta = escolha.closest(".pergunta");
    if (pergunta.dataset.respondida === "true") return;
    pergunta.dataset.respondida = "true";

    const opcoes = pergunta.querySelectorAll(".resposta");
    opcoes.forEach(opcao => {
        opcao.disabled = true;
        opcao.classList.toggle("acertou", opcao.dataset.correct === "true");
        opcao.classList.toggle("errou", opcao.dataset.correct !== "true");
        if (opcao !== escolha) opcao.classList.add("nop");
    });
    escolha.classList.add("escolhida");
    if (escolha.dataset.correct === "true") acertos++;
    questoesrespondidas++;

    setTimeout(() => {
        if (questoesrespondidas === quizzescolhido.questions.length) {
            resultadoQuizz();
            return;
        }
        const perguntas = [...document.querySelectorAll(".pagina-quizz .pergunta")];
        const proximaSequencial = document.querySelector(`[data-question-index="${numerodaquestao + 1}"]`);
        const proxima = proximaSequencial?.dataset.respondida !== "true"
            ? proximaSequencial
            : perguntas.find(item => item.dataset.respondida !== "true");
        if (proxima) {
            proxima.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, 700);
}

function selecionarNivel(porcentagem) {
    const niveisOrdenados = [...quizzescolhido.levels].sort((a, b) => Number(a.minValue) - Number(b.minValue));
    return niveisOrdenados.reduce((selecionado, nivel) =>
        Number(nivel.minValue) <= porcentagem ? nivel : selecionado, niveisOrdenados[0]);
}

function calcularPorcentagem(totalAcertos, totalPerguntas) {
    return totalPerguntas > 0 ? Math.round((totalAcertos / totalPerguntas) * 100) : 0;
}

function resultadoQuizz() {
    porcentagemarredondada = calcularPorcentagem(acertos, quizzescolhido.questions.length);
    const nivel = selecionarNivel(porcentagemarredondada);
    const resultado = document.querySelector(".fim");
    resultado.innerHTML = `
        <article class="resultado" data-identifier="quizz-result">
            <div class="titulo-resultado">
                <h3>${porcentagemarredondada}% de acerto — ${escapeHtml(nivel.title)}</h3>
            </div>
            <div class="conteudo-reultado">
                <img src="${escapeHtml(urlImagemSegura(nivel.image))}" alt="Imagem do resultado"
                    onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'">
                <span>${escapeHtml(nivel.text)}</span>
            </div>
        </article>
        <div class="botoes">
            <button type="button" class="reiniciar-quizz" onclick="reiniciarQuizz()">Reiniciar quiz</button>
            <button type="button" class="voltar-inicio" onclick="paginaInicial()">Voltar para a home</button>
        </div>`;
    resultado.querySelector(".resultado").scrollIntoView({ behavior: "smooth", block: "start" });
}

function paginaInicial() {
    window.location.reload();
}

function reiniciarQuizz() {
    abrirQuizzDireto(quizzescolhido);
}

function erroPegouQuizz(error) {
    const status = document.querySelector(".status-quizzes");
    if (status) {
        status.textContent = "A comunidade está indisponível agora. Você ainda pode jogar o quiz em destaque.";
    }
}

function chamarTelaCriarQuizz() {
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "flex";
}

function validarDadosBasicos() {
    let tituloQuizz = document.querySelector(".vamos-comecar .titulo-quizz").value.trim();
    if (tituloQuizz.length < 20) {
        alert("O título do quizz deve ter no mínimo 20 e no máximo 65 caracteres.");
    }
    let imagemQuizz = document.querySelector(".vamos-comecar .url-quizz").value.trim();
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
    return { title: titulo.trim(), color: cor, answers: [...listaRespostas] };
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
        alert("Abra e preencha todos os níveis antes de finalizar o quiz.");
        return;
    }

    for (let i = 0; i < divsNiveis.length; i++) {

        if (divsNiveis[i].querySelector(".percentual-nivel").value == 0) {
            contPercentualNivelZero++;
        }
    }

    if (contPercentualNivelZero !== 1) {
        alert("É obrigatório existir exatamente 1 nível cuja % de acerto mínima seja 0%.");
        return;
    }

    for (let i = 0; i < divsNiveis.length; i++) {
        if (!validarDadosNivel(divsNiveis[i])) return;
        listaNiveis.push(montarNovoNivel(divsNiveis[i]));
    }

    quizz.levels = listaNiveis;
    const botao = document.querySelector(".cria-niveis .finaliza-quizz");
    botao.disabled = true;
    botao.textContent = "Salvando quiz…";
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

    telaSucessoCriacaoQuizz.querySelector("figure").style.backgroundImage = `linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, .5) 65%, rgba(0, 0, 0, .8) 100%), url("${urlImagemSegura(quizz.image)}")`;
    telaSucessoCriacaoQuizz.querySelector("figure").style.backgroundPosition = "center";
    telaSucessoCriacaoQuizz.querySelector("figure").style.backgroundSize = "cover";
    telaSucessoCriacaoQuizz.style.display = "flex";
}

function acessarQuizzCriado() {
    if (!quizzRecemCriado) return;
    abrirQuizzDireto(quizzRecemCriado);
    document.querySelector(".sucesso-quizz").style.display = "none";
}

function voltarInicio() {
    paginaInicial();
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
    let tituloNivel = elemento.querySelector(".titulo-nivel").value.trim();
    let percentualNivel = Number(elemento.querySelector(".percentual-nivel").value);
    let urlNivel = elemento.querySelector(".url-nivel").value.trim();
    let descricaoNivel = elemento.querySelector(".descricao-nivel").value.trim();


    if ((tituloNivel.length < 5) || !Number.isFinite(percentualNivel) || ((percentualNivel < 0) || (percentualNivel > 100)) || (!validarURL(urlNivel)) ||
        (descricaoNivel.length < 30)) {
        alert(`
            ERRO! Dados imcompletos, verifique se os campos da sua pergunta cumprem os seguintes requisitos:
            1. O título do nível deve ter no mínimo 5 caracteres.
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
        return ["http:", "https:"].includes(url.protocol);
    } catch (_) {
        return false;
    }
}

getAllQuizz();
