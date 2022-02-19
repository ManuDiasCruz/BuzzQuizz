let quizzTeste = [];
let listaQuizz = [];

// Estrutura objeto respota
let answerTrue = {
    text: "Texto da resposta 1",
    image: "https://http.cat/411.jpg",
    isCorrectAnswer: true
};

let answerWrong = {
    text: "Texto da resposta 1",
    image: "https://http.cat/411.jpg",
    isCorrectAnswer: true
};

// Estrutura objeto quizz
let receivedQuizz = {
    id: 1,
    title: "Título do quizz",
    image: "https://http.cat/411.jpg",
    questions: [],
    levels: []
};

let newQuizz = {
    title: "Texto de pelo menos 20 caracteres",
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

// NÃO MEXER NA FUNCAO CARLA VAI USAR!
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
    console.log(quizzTeste);
    return quizz;
}

function sendQuizz() {
    quizzTeste = createQuizz();
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizzTeste);
    promise.then(mandouQuizz);
    promise.catch(falhouEnvio);
}

function mandouQuizz() {
    console.log("O post do quizz deu certo!");
    console.log(quizzTeste);
}

function falhouEnvio(error) {
    alert(error);
}

function getAllQuizz() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(pegouQuizz);
    promise.catch(erroPegouQuizz);
}

function getQuizz(here) {
    identificador= here
    console.log(identificador)
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + identificador);
    promise.then(abrirQuizz);
    promise.catch(erroPegouQuizz);
}

function pegouQuizz(resposta) {
    document.querySelector(".cria-quizz").style.display="none";
    quizzTeste = resposta.data;
    let todos_quizzes = document.querySelector(".quizzes");
    for(let i = 0 ; i < quizzTeste.length ; i++){
        todos_quizzes.innerHTML += `               
        <article class="quizz${i}" onclick="getQuizz(${quizzTeste[i].id})">
            <h3>${quizzTeste[i].title}</h3>
        </article>`
        umquizz = document.querySelector(`.quizz${i}`);
        umquizz.style.backgroundImage=`url('${quizzTeste[i].image}')`;
    }

}

function abrirQuizz() {
    document.querySelector(".paginaum").style.display="none";
    document.querySelector(".pagina-quizz").style.display="block";
}


function erroPegouQuizz(error) {
    alert(error);
}

function chamarTelaCriarQuizz() {
    console.log("Entrei na função: chamarTelaCriarQuizz()");
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "flex";
    console.log("  Troquei da Tela 1.1 para a 3.1!");
}

function chamarTelaCriarPerguntas() {
    console.log("Entrei na função: chamaTelaCriarPerguntas()");
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "none";

    // Limpando a página para criar perguntas antes de entrar com as perguntas de um novo Quizz
    const telaCriarPerguntas = document.querySelector(".cria-quizz .cria-perguntas").innerHTML = "";

    montarTelaCriarPerguntas(telaCriarPerguntas);
    console.log("  Troquei da Tela 3.1 para a 3.2!");
}

function montarTelaCriarPerguntas(telaCriarPerguntas) {
    const elemento = document.querySelector(".cria-perguntas");
    elemento.innerHTML = `
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
        elemento.innerHTML += `
            <div class="nova-pergunta" data-identifier="expand">
                <h2>Pergunta ${MIN_PERGUNTAS+i+1}</h2>
                <img class="botaoEditar" src="img/editar.png" alt="Botão editar" onclick="abrirNovaPergunta(this)">
            </div>
        `;
    }

    elemento.innerHTML += `
        <button class="prosseguir" onclick="validarDadosPergunta()">
            <p>Prosseguir pra criar níveis</p>
        </button>
    `;
    elemento.style.display = "flex";
    console.log(elemento);
}

function abrirNovaPergunta(elemento) {
    const novapergunta = elemento.parentNode;
    novapergunta.classList.add("pergunta");
    novapergunta.dataset.identifier = "question";
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
    // Vou deixar só para resgistrar que fiz minha 1ª arrow function 
    // sem precisar olhar nas aulas de Diego (O.O') kkkkkkkk
    setTimeout(() => console.log(elemento.parentNode), 2000);

    novapergunta.style.display = "flex";
    novapergunta.style.flexDirection = "column";
    novapergunta.style.justifyContent = "center";
}

function chamarTelaCriarNiveis() {
    console.log("Entrei na função: chamaTelaCriarNiveis()");
    document.querySelector(".cria-quizz .cria-perguntas").style.display = "none";
    document.querySelector(".cria-quizz .cria-niveis").style.display = "flex";
    console.log("  Troquei da Tela 3.2 para a 3.3!");
}

function chamarTelaSucessoCriacaoQuizz() {
    console.log("Entrei na função: chamaTelaSucessoCriacaoQuizz()");
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    document.querySelector(".cria-quizz .sucesso-quizz").style.display = "block";
    console.log("  Troquei da Tela 3.3 para a 3.4!");
}

function chamarTelaSucessoCriacaoQuizz() {
    console.log("Entrei na função: chamaTelaSucessoCriacaoQuizz()");
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    document.querySelector(".cria-quizz .sucesso-quizz").style.display = "block";
    console.log("  Troquei da Tela 3.3 para a 3.4!");
}

function validarDadosBasicos() {
    console.log("Entrei na função: validarDadosBasicos()");
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
        newQuizz.title = tituloQuizz;
        newQuizz.image = imagemQuizz;
        console.log("==> Quizz ao final da função validarDadosBasicos() :\\/      " + newQuizz);
        console.log("      qtdadePerguntas :" + qtdadePerguntas);
        console.log("      listaPerguntas.l:" + listaPerguntas.length);
        console.log("      listaNiveis.l   :" + listaNiveis.length);
        chamarTelaCriarPerguntas();
    }
}

function validarDadosPergunta() {
    console.log("Entrei em  validarDadosPergunta");
    let textoPergunta = document.querySelector(".cabecalho-pergunta .texto-pergunta").value;
    if (textoPergunta.length < 20) {
        alert("O texto da pergunta deve ter no mínimo 20 caracteres.");
    }
    let respostaCorreta = document.querySelector(".resposta-correta .texto-resposta").value;
    if (respostaCorreta === "") {
        alert("A inserção da resposta correta é obrigatória!");
    }
    let urlRespostaCorreta = document.querySelector(".resposta-correta .url-resposta").value;
    if (!validarURL(urlRespostaCorreta)) {
        alert("A imagem deve ser uma URL válida.");
    }
    let respostasIncorretas = document.querySelectorAll(".resposta .texto-resposta");
    console.log(respostasIncorretas.length);
    let contaRespostasIncorretas = 0;
    for (let i = 0; i < respostasIncorretas.length; i++) {
        if (respostasIncorretas[i].value !== "") {
            contaRespostasIncorretas++;
        }
    }
    if (contaRespostasIncorretas == 0) {
        alert("A inserção de pelo menos 1 resposta errada é obrigatória!");
    }
    let urlRespostasIncorretas = document.querySelectorAll(".resposta .url-resposta");
    let contaUrlRespostasIncorretas = 0;
    let urlBoa = 0;
    for (let i = 0; i < urlRespostasIncorretas.length; i++) {
        if (urlRespostasIncorretas[i].value !== "") {
            contaUrlRespostasIncorretas++;
            if (validarURL(urlRespostasIncorretas[i].value)) {
                urlBoa++;
            }
        }
    }
    console.log("contaRespostasIncorretas: " + contaRespostasIncorretas + ", contaUrlRespostasIncorretas: " + contaUrlRespostasIncorretas + ", urlBoa: " + urlBoa);
    if ((contaUrlRespostasIncorretas != contaRespostasIncorretas) && (urlBoa > contaRespostasIncorretas)) {
        alert("Cada resposta deve ter um texto e uma imagem com uma url válida a ela associada.");
    } else {
        if (contaUrlRespostasIncorretas != contaRespostasIncorretas) {
            alert("Cada resposta deve ter uma imagem a ela associada.");
        }
        if (urlBoa < contaUrlRespostasIncorretas) {
            alert("Cada imagem deve ser uma URL válida.");
        }
    }
}

function validarDadosNivel() {
    console.log("Entrei na função: validarDadosNivel()");
    let tituloNivel = document.querySelector(".nivel .titulo-nivel").value;
    if (tituloNivel.length < 10) {
        alert("O título do nível deve ter no mínimo 10 caracteres.");
    }
    let percentualNivel = parseInt(document.querySelector(".nivel .percentual-nivel").value);
    if ((percentualNivel < 0) || (percentualNivel > 100)) {
        alert("O percentual(%) de acerto mínimo de ser um número entre 0 e 100.");
    }
    let urlNivel = document.querySelector(".nivel .url-nivel").value;
    if (!validarURL(urlNivel)) {
        alert("A imagem do nível deve ser uma URL válida.");
    }
    let descricaoNivel = document.querySelector(".nivel .descricao-nivel").value;
    console.log(descricaoNivel);
    if (descricaoNivel.length < 10) {
        alert("A descrição do nível de ter no mínimo 30 caracteres.");
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

getAllQuizz()