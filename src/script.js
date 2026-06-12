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

let quizzescolhido;
let identificador;

function escapeHTML(texto) {
    return String(texto ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function urlParaCSS(url) {
    return String(url ?? "").replace(/["'()\\]/g, "");
}

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
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizzPronto);
    promise.then(mandouQuizz);
    promise.catch(falhouEnvio);
}

function mandouQuizz(response) {
    const quizzCriado = response.data;
    guardaMeusQuizzesLocalmente(quizzCriado);
    quizzRecemCriado = quizzCriado;
    chamarTelaSucessoCriacaoQuizz();
}

function falhouEnvio(error) {
    console.error(error);
    reativarBotaoFinalizar();
    alert("Infelizmente seu quizz não pôde ser enviado ao servidor. Verifique sua conexão e tente novamente.");
}

function reativarBotaoFinalizar() {
    const botao = document.querySelector(".cria-niveis .finaliza-quizz");
    if (botao !== null) {
        botao.disabled = false;
        botao.querySelector("p").textContent = "Finalizar Quizz";
    }
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
    let quizzSerializado;
    for (var i = 0; i < localStorage.length; i++) {
        quizzSerializado = localStorage.getItem(localStorage.key(i));
        listaMeusQuizzes.push(JSON.parse(quizzSerializado));
    }
}

function getAllQuizz() {
    document.querySelector(".paginaum .novo-quizz").style.display = "none";
    document.querySelector(".paginaum .quizzes-criados").style.display = "none";
    if (localStorage.length !== 0) {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "none";
        document.querySelector(".paginaum .novo-quizz").style.display = "flex";
        document.querySelector(".paginaum .quizzes-criados").style.display = "inline-flex";
        document.querySelector(".paginaum .todososquizzes").style.display = "flex";
        pegaMeusQuizzes(listaMeusQuizzes);
    }
    console.log(document.querySelector(".paginaum .meus-quizzes").style.display = "flex");
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(pegouQuizz);
    promise.catch(erroPegouQuizz);
}

function getQuizz(here) {
    identificador = here;
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + identificador);
    promise.then(abrirQuizz);
    promise.catch(erroPegouQuizz);
}

function pegouQuizz(resposta) {
    quizzTeste = resposta.data;
    let todos_quizzes = document.querySelector(".quizzes");
    for (let i = 0; i < quizzTeste.length; i++) {
        todos_quizzes.innerHTML += `               
        <article class="quizz${i}" onclick="getQuizz(${quizzTeste[i].id})">
            <h3>${quizzTeste[i].title}</h3>
        </article>`
        let umQuizz = document.querySelector(`.quizz${i}`);
        umQuizz.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${quizzTeste[i].image}')`;
    }
}

function pegaMeusQuizzes(listaMeusQuizzes) {
    getAllQuizzesLocais();
    let meusQuizzes = document.querySelector(".quizzes-criados");
    for (let i = 0; i < listaMeusQuizzes.length; i++) {
        meusQuizzes.innerHTML += `               
        <article class="quizz${i}" onclick="getQuizz(${listaMeusQuizzes[i].id})">
            <h3>${listaMeusQuizzes[i].title}</h3>
        </article>`
        let umQuizz = document.querySelector(`.quizz${i}`);
        umQuizz.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${listaMeusQuizzes[i].image}')`;
    }
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
    timeoutsAgendados.forEach(clearTimeout);
    timeoutsAgendados = [];
    document.querySelector(".fim").innerHTML = "";

    let titulo = document.querySelector(".pagina-quizz")
    titulo.innerHTML = `
        <section class="titulo-quizz">
            <h2> <span>${escapeHTML(quizzescolhido.title)}</span></h2>
        </section>`
    let umquizz = document.querySelector(".titulo-quizz");
    umquizz.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('${urlParaCSS(quizzescolhido.image)}')`;
    for (let x = 0; x < quizzescolhido.questions.length; x++) {
        quizzescolhido.questions[x].answers.sort(embaralha)
        titulo.innerHTML += `
            <section class="perguntas">
                <article data-identifier="question" class="pergunta">
                    <div class="titulo-pergunta" style="background-color: ${escapeHTML(quizzescolhido.questions[x].color)}">
                        <h3>${escapeHTML(quizzescolhido.questions[x].title)}</h3>
                    </div>
                    <div class="bloco-respostas esse${x}"></div>
                </article>
            </section>`
        let classpergunta = document.querySelector(`.pagina-quizz .esse${x}`);
        for (let y = 0; y < quizzescolhido.questions[x].answers.length; y++) {
            classpergunta.innerHTML += `
            <div data-identifier="answer" class="resposta pergunta${x}-${y} ${quizzescolhido.questions[x].answers[y].isCorrectAnswer}" onclick="quizzSelecionado(${x},${y})">
                <img src="${escapeHTML(quizzescolhido.questions[x].answers[y].image)}" alt="${escapeHTML(quizzescolhido.questions[x].answers[y].text)}">
                <h4>${escapeHTML(quizzescolhido.questions[x].answers[y].text)}</h4>
            </div> `
        }
    }
    window.scrollTo(0, 0)
}

let questoesrespondidas = 0;
let acertos = 0;
let timeoutsAgendados = [];

function quizzSelecionado(numerodaquestao, opcao) {
    let escolha = document.querySelector(`.pergunta${numerodaquestao}-${opcao}`);
    escolha.classList.add("escolhida");
    for (let z = 0; z < quizzescolhido.questions[numerodaquestao].answers.length; z++) {
        let umaopcao = document.querySelector(`.pergunta${numerodaquestao}-${z}`);
        umaopcao.removeAttribute('onclick');
        if (umaopcao != escolha) {
            umaopcao.classList.add("nop");
        }
        if (umaopcao.classList.contains("false")) {
            umaopcao.classList.add("errou");
        } else {
            umaopcao.classList.add("acertou");
        }
    }

    if (escolha.classList.contains("true")) {
        acertos += 1;
    }
    questoesrespondidas += 1;
    escolha.closest(".perguntas").classList.add("respondida");

    const acabouQuizz = (questoesrespondidas >= quizzescolhido.questions.length);
    timeoutsAgendados.push(setTimeout(() => {
        if (acabouQuizz) {
            resultadoQuizz();
        } else {
            const proximaPergunta = document.querySelector(".pagina-quizz .perguntas:not(.respondida)");
            if (proximaPergunta !== null) {
                proximaPergunta.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, 2000));
}

let porcentagemarredondada = 0;
let nivelResultado = null;

function calcularResultado() {
    porcentagemarredondada = Math.round((acertos / quizzescolhido.questions.length) * 100);

    // Nível alcançado: o de maior % mínima que seja <= pontuação.
    // Se nenhum foi alcançado (quizz sem nível 0%), vale o de menor exigência.
    nivelResultado = quizzescolhido.levels[0];
    for (let i = 1; i < quizzescolhido.levels.length; i++) {
        const nivel = quizzescolhido.levels[i];
        const minDoNivel = Number(nivel.minValue);
        const minDoAtual = Number(nivelResultado.minValue);
        const nivelAlcancado = (minDoNivel <= porcentagemarredondada);
        const atualAlcancado = (minDoAtual <= porcentagemarredondada);
        if ((nivelAlcancado && (!atualAlcancado || minDoNivel > minDoAtual)) ||
            (!nivelAlcancado && !atualAlcancado && minDoNivel < minDoAtual)) {
            nivelResultado = nivel;
        }
    }
}

function resultadoQuizz() {
    calcularResultado();
    let perguntas = document.querySelector(".fim");
    perguntas.innerHTML = `
        <article class="resultado" data-identifier="quizz-result">
            <div class="titulo-resultado">
                <h3>${porcentagemarredondada}% ${escapeHTML(nivelResultado.title)}</h3>
            </div>
            <div class="conteudo-reultado">
                <img src="${escapeHTML(nivelResultado.image)}" alt="Imagem do resultado">
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
    perguntas.scrollIntoView({ behavior: "smooth" });
}

function paginaInicial() {
    window.location.reload();
}

function reiniciarQuizz() {
    document.querySelector(".fim").innerHTML = "";
    abrirQuizz({ data: quizzescolhido });
}

function erroPegouQuizz(error) {
    alert(`
        Infelizmente não foi possível pegar seu Quizz no servidor.
        ${error.data}
    `);
}

function chamarTelaCriarQuizz() {
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "flex";
}

function validarDadosBasicos() {
    const erros = [];
    let tituloQuizz = document.querySelector(".vamos-comecar .titulo-quizz").value.trim();
    if ((tituloQuizz.length < 20) || (tituloQuizz.length > 65)) {
        erros.push("O título do quizz deve ter no mínimo 20 e no máximo 65 caracteres.");
    }
    let imagemQuizz = document.querySelector(".vamos-comecar .url-quizz").value.trim();
    if (!validarURL(imagemQuizz)) {
        erros.push("A imagem deve ser uma URL válida, começando com http:// ou https://.");
    }
    qtdadePerguntas = parseInt(document.querySelector(".vamos-comecar .numero-perguntas").value, 10);
    if (!(qtdadePerguntas >= MIN_PERGUNTAS)) {
        erros.push("A quantidade de perguntas deve ser no mínimo 3.");
    }
    qtdadeNiveis = parseInt(document.querySelector(".vamos-comecar .quantidade-niveis").value, 10);
    if (!(qtdadeNiveis >= MIN_NIVEIS)) {
        erros.push("A quantidade de níveis deve ser no mínimo 2.");
    }
    if (erros.length > 0) {
        alert("Confira os dados básicos do seu quizz:\n\n- " + erros.join("\n- "));
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
    return {
        text: elementoResposta.children[0].value.trim(),
        image: elementoResposta.children[1].value.trim(),
        isCorrectAnswer: elementoResposta.classList.contains("resposta-correta")
    };
}

function validarTodasPerguntas() {
    listaPerguntas = [];
    let listaRespostas = [];

    const perguntasFechadas = document.querySelectorAll(".cria-perguntas .nova-pergunta").length;
    if (perguntasFechadas > 0) {
        alert(`Você declarou ${qtdadePerguntas} perguntas, mas ainda há ${perguntasFechadas} sem preencher. Clique no lápis para abrir e preencher cada uma.`);
        return;
    }

    const divsPerguntas = document.querySelectorAll(".cria-quizz .pergunta");

    for (let i = 0; i < divsPerguntas.length; i++) {
        if (!validarDadosPergunta(divsPerguntas[i], i + 1)) {
            return;
        }
    }

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

function montarNovaPergunta(titulo, cor, listaRespostas) {
    return {
        title: titulo.trim(),
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

    const niveisFechados = document.querySelectorAll(".cria-niveis .novo-nivel").length;
    if (niveisFechados > 0) {
        alert(`Você declarou ${qtdadeNiveis} níveis, mas ainda há ${niveisFechados} sem preencher. Clique no lápis para abrir e preencher cada um.`);
        return;
    }

    const divsNiveis = document.querySelectorAll(".cria-quizz .nivel");

    for (let i = 0; i < divsNiveis.length; i++) {
        if (!validarDadosNivel(divsNiveis[i], i + 1)) {
            return;
        }
    }

    let contPercentualNivelZero = 0;
    for (let i = 0; i < divsNiveis.length; i++) {
        if (parseInt(divsNiveis[i].querySelector(".percentual-nivel").value, 10) === 0) {
            contPercentualNivelZero++;
        }
    }

    if (contPercentualNivelZero === 0) {
        alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%.");
        return;
    }

    for (let i = 0; i < divsNiveis.length; i++) {
        listaNiveis.push(montarNovoNivel(divsNiveis[i]));
    }

    quizz.levels = listaNiveis;

    const botao = document.querySelector(".cria-niveis .finaliza-quizz");
    if (botao !== null) {
        botao.disabled = true;
        botao.querySelector("p").textContent = "Enviando...";
    }
    sendQuizz(quizz);
}

function montarNovoNivel(nivel) {
    return {
        title: nivel.querySelector(".titulo-nivel").value.trim(),
        image: nivel.querySelector(".url-nivel").value.trim(),
        text: nivel.querySelector(".descricao-nivel").value.trim(),
        minValue: parseInt(nivel.querySelector(".percentual-nivel").value, 10)
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

    telaSucessoCriacaoQuizz.querySelector("figure").style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("${urlParaCSS(quizz.image)}") center / cover no-repeat`;
    telaSucessoCriacaoQuizz.style.display = "flex";
}

function acessarQuizzCriado() {
    if (!quizzRecemCriado) {
        alert("Aguarde um instante: seu quizz ainda está sendo enviado ao servidor.");
        return;
    }
    document.querySelector(".sucesso-quizz").style.display = "none";
    getQuizz(quizzRecemCriado.id);
}

function voltarInicio() {
    window.location.reload();
}

function validarDadosPergunta(elemento, numeroPergunta) {
    let textoPergunta = elemento.querySelector(".cabecalho-pergunta .texto-pergunta").value.trim();
    let respostaCorreta = elemento.querySelector(".resposta-correta .texto-resposta").value.trim();
    let urlRespostaCorreta = elemento.querySelector(".resposta-correta .url-resposta").value.trim();
    let respostasIncorretas = elemento.querySelectorAll(".resposta .texto-resposta");
    let contaRespostasIncorretas = 0;

    for (let i = 0; i < respostasIncorretas.length; i++) {
        if (respostasIncorretas[i].value.trim() !== "") {
            contaRespostasIncorretas++;
        }
    }

    let urlRespostasIncorretas = elemento.querySelectorAll(".resposta .url-resposta");
    let contaUrlRespostasIncorretas = 0;

    for (let i = 0; i < urlRespostasIncorretas.length; i++) {
        if (urlRespostasIncorretas[i].value.trim() !== "") {
            if (validarURL(urlRespostasIncorretas[i].value.trim())) {
                contaUrlRespostasIncorretas++;
            }
        }
    }

    if ((textoPergunta.length < 20) || (respostaCorreta === "") || (!validarURL(urlRespostaCorreta)) ||
        ((contaRespostasIncorretas == 0)) || (contaUrlRespostasIncorretas == 0) ||
        (contaRespostasIncorretas !== contaUrlRespostasIncorretas)) {
        alert(`Confira os dados da Pergunta ${numeroPergunta} (seu preenchimento foi mantido):
            1. O texto da pergunta deve ter no mínimo 20 caracteres.
            2. A inserção da resposta correta é obrigatória.
            3. A inserção de pelo menos 1 resposta errada é obrigatória!
            4. A imagem deve ser uma URL válida, começando com http:// ou https://.
            5. Cada resposta deve ter um texto e uma imagem com uma url válida a ela associada.
        `);
        return false;
    } else {
        return true;
    }
}

function validarDadosNivel(elemento, numeroNivel) {
    let tituloNivel = elemento.querySelector(".titulo-nivel").value.trim();
    let percentualNivel = parseInt(elemento.querySelector(".percentual-nivel").value, 10);
    let urlNivel = elemento.querySelector(".url-nivel").value.trim();
    let descricaoNivel = elemento.querySelector(".descricao-nivel").value.trim();

    if ((tituloNivel.length < 10) || (isNaN(percentualNivel)) || ((percentualNivel < 0) || (percentualNivel > 100)) ||
        (!validarURL(urlNivel)) || (descricaoNivel.length < 30)) {
        alert(`Confira os dados do Nível ${numeroNivel} (seu preenchimento foi mantido):
            1. O título do nível deve ter no mínimo 10 caracteres.
            2. O percentual(%) de acerto mínimo deve ser um número entre 0 e 100.
            3. A imagem do nível deve ser uma URL válida, começando com http:// ou https://.
            4. A descrição do nível deve ter no mínimo 30 caracteres.
        `);
        return false;
    } else {
        return true;
    }
}

// Adaptado de:
// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
// O protocolo é obrigatório: URLs sem http(s):// viram caminhos relativos e
// quebram as imagens quando o site é servido de um subdiretório (GitHub Pages).
function validarURL(texto) {
    var pattern = new RegExp('^(https?:\\/\\/)' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(texto);
}

getAllQuizz();