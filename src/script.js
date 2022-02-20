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

let listaIDQuizzesSerializados = [];

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

function getMeusQuizzesLocais(quizz) {
    const quizzSerializado = localStorage.getItem(quizz.id);
    const meuQuizz = JSON.parse(quizzSerializado);

    return meuQuizz;
}

function getAllQuizzesLocais() {
    for (var i = 0; i < localStorage.length; i++) {
        listaIDQuizzesSerializados.push(localStorage.getItem(localStorage.key(i)));
    }
    console.log("Meus quizzes locais:");
    console.log(listaIDQuizzesSerializados);
}

function getAllQuizz() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(pegouQuizz);
    promise.catch(erroPegouQuizz);
}

function getQuizz(here) {
    identificador = here
    console.log(identificador)
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + identificador);
    promise.then(abrirQuizz);
    promise.catch(erroPegouQuizz);
}

function pegouQuizz(resposta) {
    // document.querySelector(".cria-quizz").style.display = "none";
    quizzTeste = resposta.data;
    let todos_quizzes = document.querySelector(".quizzes");
    for (let i = 0; i < quizzTeste.length; i++) {
        todos_quizzes.innerHTML += `               
        <article class="quizz${i}" onclick="getQuizz(${quizzTeste[i].id})">
            <h3>${quizzTeste[i].title}</h3>
        </article>`
        umquizz = document.querySelector(`.quizz${i}`);
        umquizz.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${quizzTeste[i].image}')`;
    }

}

function embaralha() {
    return Math.random() - 0.5;
}

let opcao0;
let opcao1;
let opcao2;
let opcao3;
let pergunta0;
let pergunta1;
let pergunta2;

function abrirQuizz(respostaquizz) {
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "block";
    quizzescolhido = respostaquizz.data;
    titulo = document.querySelector(".pagina-quizz")
    titulo.innerHTML = `      
        <section class="titulo-quizz">
            <h2> <span>${quizzescolhido.title}</span></h2>
        </section>`
    umquizz = document.querySelector(".titulo-quizz");

    umquizz.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('${quizzescolhido.image}')`;
    quizzescolhido.questions.sort(embaralha)
    for (let x = 0; x < quizzescolhido.questions.length; x++) {
        titulo.innerHTML += `
            <section class="perguntas">
                <article data-identifier="question" class="pergunta">
                    <div class="titulo-pergunta" style="background-color: ${quizzescolhido.questions[x].color}">
                        <h3>${quizzescolhido.questions[x].title}</h3>
                    </div>
                    <div class="bloco-respostas esse${x}"></div>
                </article>
            </section`
        let classpergunta = document.querySelector(`.esse${x}`);
        for (let y = 0; y < quizzescolhido.questions[x].answers.length; y++) {
            classpergunta.innerHTML += `
            <div data-identifier="answer" class="resposta pergunta${x}${y} ${quizzescolhido.questions[x].answers[y].isCorrectAnswer}" onclick="quizzSelecionado(${x},${y})">
                <img src="${quizzescolhido.questions[x].answers[y].image}" alt="">
                <h4>${quizzescolhido.questions[x].answers[y].text}</h4>
            </div> `
        }
    }
}

// numero da questao => x
// numero da opcao => y

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
}

function erroPegouQuizz(error) {
    alert(`
        Infelizmente não foi possível pegar seu Quizz no servidor.
        ${error.data}
    `);
}

function chamarTelaCriarQuizz() {
    console.log("Entrei na função: chamarTelaCriarQuizz()");
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "flex";
    console.log("  Troquei da Tela 1.1 para a 3.1!");
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
        quizz.title = tituloQuizz;
        quizz.image = imagemQuizz;
        console.log("==> Quizz ao final da função validarDadosBasicos() :\\/      " + quizz);
        console.log("      qtdadePerguntas :" + qtdadePerguntas);
        console.log("      listaPerguntas.l:" + listaPerguntas.length);
        console.log("      listaNiveis.l   :" + listaNiveis.length);
        chamarTelaCriarPerguntas();
    }
}

function chamarTelaCriarPerguntas() {
    console.log("Entrei na função: chamaTelaCriarPerguntas()");
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "none";

    // Limpando a página para criar perguntas antes de entrar com as perguntas de um novo Quizz
    const telaCriarPerguntas = document.querySelector(".cria-quizz .cria-perguntas");

    montarTelaCriarPerguntas(telaCriarPerguntas);
    console.log("  Troquei da Tela 3.1 para a 3.2!");
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
    console.log(telaCriarPerguntas);
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
    // Vou deixar só para resgistrar que fiz minha 1ª arrow function 
    // sem precisar olhar nas aulas de Diego (O.O') kkkkkkkk
    setTimeout(() => console.log(elemento.parentNode), 2000);

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

    answer.text = textoResposta;
    answer.image = urlResposta;
    answer.isCorrectAnswer = ehRespostaCorreta;

    return answer;
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

        console.log("Ao final de validarTodasPerguntas:");
        console.log(listaPerguntas);
        console.log(quizz.questions);
        console.log(quizz);
    }
}

function montarNovaPergunta(titulo, cor, listaRespostas) {
    question.title = titulo;
    question.color = cor;
    question.answers = listaRespostas;
    return question;
}

function chamarTelaCriarNiveis() {
    console.log("Entrei na função: chamaTelaCriarNiveis()");
    document.querySelector(".cria-quizz .cria-perguntas").style.display = "none";

    const telaCriarNiveis = document.querySelector(".cria-quizz .cria-niveis");
    montarTelaCriarNiveis(telaCriarNiveis);
    // document.querySelector(".cria-quizz .cria-niveis").style.display = "flex";
    console.log("  Troquei da Tela 3.2 para a 3.3!");
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
    console.log(telaCriarNiveis);
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
    // Vou deixar só para resgistrar que fiz minha 1ª arrow function 
    // sem precisar olhar nas aulas de Diego (O.O') kkkkkkkk
    setTimeout(() => console.log(elemento.parentNode), 2000);

    novoNível.style.display = "flex";
    novoNível.style.flexDirection = "column";
    novoNível.style.justifyContent = "center";
}

function validarTodosNiveis() {
    listaNiveis = [];
    let nivel;
    const divsNiveis = document.querySelectorAll(".cria-quizz .nivel");
    console.log("Entrei em validar todos níveis:");
    console.log(divsNiveis);
    let contPercentualNivelZero = 0;
    let menorPercentual = 100;

    for (let i = 0; i < divsNiveis.length; i++) {
        // if (divsNiveis[i].querySelector(".percentual-nivel").value < menorPercentual) {
        //     menorPercentual = divsNiveis[i].querySelector(".percentual-nivel").value;
        //     console.log(i + ", menor percentual: " + menorPercentual);
        // }
        if (divsNiveis[i].querySelector(".percentual-nivel").value == 0) {
            contPercentualNivelZero++;
        }
    }

    // console.log("Menor percentual: " + menorPercentual);

    if (contPercentualNivelZero === 0) {
        alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%, então o nível com menor percentual será reeditado para valor percentual mínimo igual a 0.");
        chamarTelaCriarNiveis();
    } else {
        for (let i = 0; i < divsNiveis.length; i++) {
            // console.log("Entrei no for com i : " + i + ", o value é: " + divsNiveis[i].querySelector(".percentual-nivel").value);
            // if (divsNiveis[i].querySelector(".percentual-nivel").value == menorPercentual) {
            //     console.log("Achei o igual: " + divsNiveis[i].querySelector(".percentual-nivel").value);
            //     divsNiveis[i].querySelector(".percentual-nivel").value = 0;
            //     console.log("O igual após mudança: " + divsNiveis[i].querySelector(".percentual-nivel").value);
            // }
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
    level.title = nivel.querySelector(".titulo-nivel").value;
    level.image = nivel.querySelector(".url-nivel").value;
    level.text = nivel.querySelector(".descricao-nivel").value;
    level.minValue = nivel.querySelector(".percentual-nivel").value;

    return level;
}

function chamarTelaSucessoCriacaoQuizz() {
    console.log("Entrei na função: chamaTelaSucessoCriacaoQuizz()");
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    const telaSucessoCriacaoQuizz = document.querySelector(".cria-quizz .sucesso-quizz");
    montarTelaSucessoCriacaoQuizz(telaSucessoCriacaoQuizz);
}

function montarTelaSucessoCriacaoQuizz(telaSucessoCriacaoQuizz) {
    telaSucessoCriacaoQuizz.innerHTML = `
        <h1>Seu quizz está pronto!</h1>
        <figure class="fim-criacao-quizz"></figure>
        <button class="acessar-quizz" onclick="abrirQuizz()">
            <p>Acessar Quizz</p>
        </button>
        <button class="voltar-inicio" onclick="voltarInicio()">
            <p>Voltar pra home</p>
        </button>    
    `;
    telaSucessoCriacaoQuizz.querySelector("figure").backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("${quizz.image}");`;

    telaSucessoCriacaoQuizz.style.display = "block";
    console.log(telaSucessoCriacaoQuizz);
}


function validarDadosPergunta(elemento) {
    console.log("Entrei em  validarDadosPergunta");

    let textoPergunta = elemento.querySelector(".cabecalho-pergunta .texto-pergunta").value;
    console.log("textoPergunta: " + textoPergunta);

    let corPergunta = elemento.querySelector(".cabecalho-pergunta .cor-pergunta").value;
    console.log("corPergunta: " + corPergunta);

    let respostaCorreta = elemento.querySelector(".resposta-correta .texto-resposta").value;
    console.log("textoPergunta: " + textoPergunta);

    let urlRespostaCorreta = elemento.querySelector(".resposta-correta .url-resposta").value;
    console.log("urlRespostaCorreta: " + urlRespostaCorreta);

    let respostasIncorretas = elemento.querySelectorAll(".resposta .texto-resposta");
    console.log("respostasIncorretas: " + respostasIncorretas.length);
    let contaRespostasIncorretas = 0;
    for (let i = 0; i < respostasIncorretas.length; i++) {
        if (respostasIncorretas[i].value !== "") {
            console.log("  respostasIncorretas: " + respostasIncorretas[i]);
            contaRespostasIncorretas++;
        }
    }

    let urlRespostasIncorretas = elemento.querySelectorAll(".resposta .url-resposta");
    console.log("urlRespostasIncorretas: " + urlRespostasIncorretas.length);
    let contaUrlRespostasIncorretas = 0;
    for (let i = 0; i < urlRespostasIncorretas.length; i++) {
        if (urlRespostasIncorretas[i].value !== "") {
            if (validarURL(urlRespostasIncorretas[i].value)) {
                console.log("  urlRespostasIncorretas: " + urlRespostasIncorretas[i]);
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
    console.log("Entrei na função: validarDadosNivel()");
    let tituloNivel = document.querySelector(".nivel .titulo-nivel").value;

    let percentualNivel = parseInt(document.querySelector(".nivel .percentual-nivel").value);

    let urlNivel = document.querySelector(".nivel .url-nivel").value;

    let descricaoNivel = document.querySelector(".nivel .descricao-nivel").value;


    if ((tituloNivel.length < 10) || ((percentualNivel < 0) || (percentualNivel > 100)) || (!validarURL(urlNivel)) ||
        (descricaoNivel.length < 30)) {
        console.log("_____________________________________");
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