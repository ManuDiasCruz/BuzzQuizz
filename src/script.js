// Imagens locais (Pixabay License - uso livre) adicionadas na v2 para
// substituir URLs externas quebradas/instáveis.
let quizzTeste = {
    title: "Qual panda fofinho você é?",
    image: "img/quiz-panda-cover.jpg",
    questions: [{
            title: "Outro urso fofinho também é um tipo de panda... qual?",
            color: "#F05C5C",
            answers: [{
                    text: "O pandinha vermelho",
                    image: "img/red-panda.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Panda indiano da floresta",
                    image: "img/brown-bear.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Panda puma das montanhas",
                    image: "img/black-bear.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Panda albino chinês",
                    image: "img/giant-panda.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Você é um Panda agora! Qual sua comida favorita?",
            color: "#55DD65",
            answers: [{
                    text: "Um gostoso e nutritivo bambu",
                    image: "img/bamboo.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Folhinhas fininhas e verdinhas",
                    image: "img/green-leaf.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Musguinho cheio de bichinhos",
                    image: "img/moss-fern.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Qual sua cor favorita?",
            color: "#6ACAE2",
            answers: [{
                    text: "Preto ou vermelho, depende do dia",
                    image: "img/red-panda.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Branco e preto, um clássico que nunca sai de moda...",
                    image: "img/giant-panda.jpg",
                    isCorrectAnswer: false
                }
            ]
        }
    ],
    levels: [{
            title: "Panda Master",
            image: "img/panda-master.jpg",
            text: "PARABÉNS! Você é um mestre em pandas! Sabe até que existem duas fofuras nesse mundo de diferentes pesos... O famoso Panda Gigante pesa de 65 a 110 Kg, e o pequenino Panda Vermelho apenas de 3,7 a 6,2 Kg.",
            minValue: 60
        },
        {
            title: "Iniciante no mundo panda",
            image: "img/panda-beginner.jpg",
            text: "Meu caro amigo, você ainda é um jovem padawan que tem muito a aprender sobre os pandas. Então, vai lá pesquisar: Além do famoso Panda Gigante preto e Branco, existe um pequeno fofinho chamado Panda Vermelho que sempre rouba a cena.",
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
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizzPronto);
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
    alert(`
        Infelizmente seu quizz não pôde ser enviado ao servidor.
        ${error.data}
    `);
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
    // Bug fix (v2): limpa a lista antes de preencher para não duplicar os
    // "meus quizzes" a cada chamada.
    listaMeusQuizzes = [];
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
    document.querySelector(".fim").innerHTML = "";
    // Bug fix (v2): zera o estado a cada abertura/reinício do quizz. Antes os
    // contadores acumulavam entre jogadas, gerando resultados incorretos.
    reiniciarEstado();
    quizzescolhido = respostaquizz.data;
    let titulo = document.querySelector(".pagina-quizz")
    titulo.innerHTML = `      
        <section class="titulo-quizz">
            <h2> <span>${quizzescolhido.title}</span></h2>
        </section>`
    umquizz = document.querySelector(".titulo-quizz");
    umquizz.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('${quizzescolhido.image}')`;
    for (let x = 0; x < quizzescolhido.questions.length; x++) {
        quizzescolhido.questions[x].answers.sort(embaralha)
        titulo.innerHTML += `
            <section class="perguntas" id="depoisdesse">
                <article data-identifier="question" class="pergunta" id="pergunta">
                    <div class="titulo-pergunta" style="background-color: ${quizzescolhido.questions[x].color}">
                        <h3>${quizzescolhido.questions[x].title}</h3>
                    </div>
                    <div class="bloco-respostas esse${x}"></div>
                </article>
            </section>`
        let classpergunta = document.querySelector(`.esse${x}`);
        for (let y = 0; y < quizzescolhido.questions[x].answers.length; y++) {
            const resposta = quizzescolhido.questions[x].answers[y];
            classpergunta.innerHTML += `
            <div data-identifier="answer" data-correct="${resposta.isCorrectAnswer}" id="pergunta${x}${y}" class="resposta pergunta${x}${y} ${resposta.isCorrectAnswer}" onclick="quizzSelecionado(${x},${y})">
                <img src="${resposta.image}" alt="${resposta.text}" loading="lazy">
                <h4>${resposta.text}</h4>
            </div> `
        }
    }
    window.scrollTo(0, 0)
}

let questoesrespondidas = 0;
let acertos = 0;
let porcentagemarredondada = 0;
let nivelResultado = 0;

// Bug fix (v2): centraliza o reset de todo o estado de uma jogada.
function reiniciarEstado() {
    questoesrespondidas = 0;
    acertos = 0;
    porcentagemarredondada = 0;
    nivelResultado = 0;
}

function quizzSelecionado(numerodaquestao, opcao) {
    let escolha = document.querySelector(`.pergunta${numerodaquestao}${opcao}`);
    escolha.classList.add("escolhida");
    for (let z = 0; z < quizzescolhido.questions[numerodaquestao].answers.length; z++) {
        let umaopcao = document.querySelector(`.pergunta${numerodaquestao}${z}`);
        umaopcao.removeAttribute('onclick');
        // Bug fix (v2): usa data-correct em vez de classList.contains(true/false)
        // (que coagia booleanos para string de forma frágil). Revela a resposta
        // certa/errada em todas as opções.
        if (umaopcao.dataset.correct === "true") {
            umaopcao.classList.add("acertou");
        } else {
            umaopcao.classList.add("errou");
        }
        if (umaopcao !== escolha) {
            umaopcao.classList.add("nop");
        }
    }

    if (escolha.dataset.correct === "true") {
        acertos += 1;
    }
    questoesrespondidas += 1;

    // Bug fix (v2): o resultado agora dispara de forma confiável quando todas as
    // perguntas foram respondidas (antes ficava preso num laço mal condicionado).
    if (questoesrespondidas === quizzescolhido.questions.length) {
        calcularResultado();
        setTimeout(resultadoQuizz, 2000);
    } else {
        const proxima = document.querySelector(`.esse${numerodaquestao + 1}`);
        if (proxima) {
            setTimeout(() => proxima.scrollIntoView({ behavior: "smooth" }), 2000);
        }
    }
}

// Bug fix (v2): cálculo de resultado reescrito. Percentual = acertos/total de
// perguntas; o nível é o de maior minValue que o percentual alcança.
function calcularResultado() {
    porcentagemarredondada = Math.round((acertos / quizzescolhido.questions.length) * 100);

    const niveisOrdenados = [...quizzescolhido.levels].sort((a, b) => a.minValue - b.minValue);
    let nivelEscolhido = niveisOrdenados[0];
    for (const nivel of niveisOrdenados) {
        if (porcentagemarredondada >= Number(nivel.minValue)) {
            nivelEscolhido = nivel;
        }
    }
    nivelResultado = quizzescolhido.levels.indexOf(nivelEscolhido);
}

function resultadoQuizz() {
    const nivel = quizzescolhido.levels[nivelResultado];
    let perguntas = document.querySelector(".fim");
    perguntas.innerHTML = `
        <article class="resultado" data-identifier="quizz-result">
            <div class="titulo-resultado">
                <h3>${porcentagemarredondada}% ${nivel.title}</h3>
            </div>
            <div class="conteudo-reultado">
                <img src="${nivel.image}" alt="${nivel.title}">
                <span>${nivel.text}</span>
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
    getQuizz(identificador);
    apagarresultado = document.querySelector(".fim");
    apagarresultado.innerHTML = ""
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

    // Bug fix (v2): retornamos um objeto novo a cada resposta. Antes um único
    // objeto global era reutilizado, fazendo todas as respostas apontarem para
    // o mesmo dado (a última sobrescrevia as anteriores).
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
    // Bug fix (v2): objeto novo por pergunta (ver montarNovaResposta).
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
        chamarTelaCriarNiveis();
    } else {
        for (let i = 0; i < divsNiveis.length; i++) {
            if (!validarDadosNivel(divsNiveis[i])) {
                document.location.reload(true);
            }
            listaNiveis.push(montarNovoNivel(divsNiveis[i]));
        }

        quizz.levels = listaNiveis;
        chamarTelaSucessoCriacaoQuizz();
        sendQuizz(quizz);
    }
}

function montarNovoNivel(nivel) {
    // Bug fix (v2): objeto novo por nível (ver montarNovaResposta).
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
    // Bug fix (v2): a linha antiga sobrescrevia a imagem escolhida pelo
    // usuário com uma URL quebrada. Mantemos a imagem informada no quizz.
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

    telaSucessoCriacaoQuizz.querySelector("figure").style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("${quizz.image}")`;
    telaSucessoCriacaoQuizz.querySelector("figure").style.backgroundSize = "cover";
    telaSucessoCriacaoQuizz.style.display = "flex";
}

function acessarQuizzCriado() {
    getQuizz(quizzRecemCriado.id);
    document.querySelector(".sucesso-quizz").style.display = "none";
}

function voltarInicio() {
    if (localStorage.length !== 0) {
        document.querySelector(".sucesso-quizz").style.display = "none";
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "none";
        document.querySelector(".paginaum .meus-quizzes").style.display = "flex";
        document.querySelector(".paginaum .todososquizzes").style.display = "flex";
        if (localStorage.length === 1) {
            pegaMeusQuizzes(listaMeusQuizzes);
        }
    } else {
        document.querySelector(".sucesso-quizz").style.display = "none";
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

function validarDadosNivel() {
    let tituloNivel = document.querySelector(".nivel .titulo-nivel").value;
    let percentualNivel = parseInt(document.querySelector(".nivel .percentual-nivel").value);
    let urlNivel = document.querySelector(".nivel .url-nivel").value;
    let descricaoNivel = document.querySelector(".nivel .descricao-nivel").value;


    if ((tituloNivel.length < 10) || ((percentualNivel < 0) || (percentualNivel > 100)) || (!validarURL(urlNivel)) ||
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