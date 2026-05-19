"use strict";

const IMG_FALLBACK = "img/svg/placeholder.svg";

let quizzescolhido = null;
let identificador = null;

let quizzTeste = {
    title: "Qual panda fofinho você é?",
    image: "https://cdn.pixabay.com/photo/2017/01/02/22/41/red-panda-1948828_1280.jpg",
    questions: [{
            title: "Outro urso fofinho também é um tipo de panda... qual?",
            color: "#F05C5C",
            answers: [{
                    text: "O pandinha vermelho",
                    image: "https://cdn.pixabay.com/photo/2018/06/12/01/16/red-panda-3469130_1280.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Panda indiano da floresta",
                    image: "https://cdn.pixabay.com/photo/2016/11/14/04/45/brown-bear-1822522_1280.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Panda puma das montanhas",
                    image: "https://cdn.pixabay.com/photo/2020/05/01/19/19/puma-5117468_1280.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Panda albino chinês",
                    image: "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Você é um Panda agora! Qual sua comida favorita?",
            color: "#55DD65",
            answers: [{
                    text: "Um gostoso e nutritivo bambu",
                    image: "https://cdn.pixabay.com/photo/2017/01/15/22/56/bamboo-1982496_1280.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Folhinhas fininhas e verdinhas",
                    image: "https://cdn.pixabay.com/photo/2016/03/27/19/43/leaves-1283147_1280.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Musguinho cheio de bichinhos",
                    image: "https://cdn.pixabay.com/photo/2015/04/27/19/50/moss-743278_1280.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Qual sua cor favorita?",
            color: "#6ACAE2",
            answers: [{
                    text: "Preto ou vermelho, depende do dia",
                    image: "img/svg/color-red.svg",
                    isCorrectAnswer: true
                },
                {
                    text: "Branco e preto, um clássico que nunca sai de moda...",
                    image: "img/svg/color-bw.svg",
                    isCorrectAnswer: false
                }
            ]
        }
    ],
    levels: [{
            title: "Panda Master",
            image: "https://cdn.pixabay.com/photo/2014/12/09/12/07/panda-562241_1280.jpg",
            text: "PARABÉNS! Você é um mestre em pandas! Sabe até que existem duas fofuras nesse mundo de diferentes pesos... O famoso Panda Gigante pesa de 65 a 110 Kg, e o pequenino Panda Vermelho apenas de 3,7 a 6,2 Kg.",
            minValue: 60
        },
        {
            title: "Iniciante no mundo panda",
            image: "https://cdn.pixabay.com/photo/2015/03/26/09/41/panda-690293_1280.jpg",
            text: "Meu caro amigo, você ainda é um jovem padawan que tem muito a aprender sobre os pandas. Então, vai lá pesquisar: Além do famoso Panda Gigante preto e Branco, existe um pequeno fofinho chamado Panda Vermelho que sempre rouba a cena.",
            minValue: 0
        }
    ]
};

let quizz = {
    title: "",
    image: "",
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

function getAllQuizzesLocais() {
    listaMeusQuizzes = [];
    for (let i = 0; i < localStorage.length; i++) {
        const quizzSerializado = localStorage.getItem(localStorage.key(i));
        try {
            const parsed = JSON.parse(quizzSerializado);
            if (parsed && parsed.id) {
                listaMeusQuizzes.push(parsed);
            }
        } catch (_) {
            // skip non-quizz entries in localStorage
        }
    }
}

function getAllQuizz() {
    const novoQuizz = document.querySelector(".paginaum .novo-quizz");
    const quizzesCriados = document.querySelector(".paginaum .quizzes-criados");
    novoQuizz.style.display = "none";
    quizzesCriados.style.display = "none";
    if (localStorage.length !== 0) {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "none";
        document.querySelector(".paginaum .meus-quizzes").style.display = "flex";
        novoQuizz.style.display = "flex";
        quizzesCriados.style.display = "inline-flex";
        document.querySelector(".paginaum .todososquizzes").style.display = "flex";
        pegaMeusQuizzes();
    }
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

const CARD_GRADIENT = "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%)";

function pegouQuizz(resposta) {
    renderListaQuizzes(document.querySelector(".quizzes"), resposta.data || [], "quizz");
}

function pegaMeusQuizzes() {
    getAllQuizzesLocais();
    renderListaQuizzes(document.querySelector(".quizzes-criados"), listaMeusQuizzes, "meu-quizz");
}

function renderListaQuizzes(container, quizzes, classPrefix) {
    if (!container) return;
    let html = "";
    for (let i = 0; i < quizzes.length; i++) {
        const q = quizzes[i];
        html += `
        <article class="${classPrefix}-${i}" onclick="getQuizz(${q.id})">
            <h3>${escapeHtml(q.title)}</h3>
        </article>`;
    }
    container.innerHTML = html;

    for (let i = 0; i < quizzes.length; i++) {
        const q = quizzes[i];
        const cardEl = container.querySelector(`.${classPrefix}-${i}`);
        if (!cardEl) continue;
        aplicarBackgroundComFallback(cardEl, q.image, CARD_GRADIENT);
    }
}

function escapeHtml(value) {
    if (value === null || value === undefined) return "";
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function embaralha() {
    return Math.random() - 0.5;
}

function abrirQuizz(respostaquizz) {
    resetEstadoPartida();
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "block";
    document.querySelector(".fim").innerHTML = "";
    quizzescolhido = respostaquizz.data;
    const pagina = document.querySelector(".pagina-quizz");

    let html = `
        <section class="titulo-quizz">
            <h2><span>${escapeHtml(quizzescolhido.title)}</span></h2>
        </section>`;

    for (let x = 0; x < quizzescolhido.questions.length; x++) {
        quizzescolhido.questions[x].answers.sort(embaralha);
        let respostasHtml = "";
        for (let y = 0; y < quizzescolhido.questions[x].answers.length; y++) {
            const ans = quizzescolhido.questions[x].answers[y];
            const corretaClass = ans.isCorrectAnswer ? "correta" : "incorreta";
            respostasHtml += `
                <div data-identifier="answer" id="pergunta${x}${y}" class="resposta pergunta${x}${y} ${corretaClass}" onclick="quizzSelecionado(${x},${y})">
                    <img src="${ans.image}" alt="" onerror="this.onerror=null;this.src='${IMG_FALLBACK}';">
                    <h4>${escapeHtml(ans.text)}</h4>
                </div>`;
        }
        html += `
            <section class="perguntas" id="bloco-pergunta-${x}">
                <article data-identifier="question" class="pergunta">
                    <div class="titulo-pergunta" style="background-color: ${quizzescolhido.questions[x].color}">
                        <h3>${escapeHtml(quizzescolhido.questions[x].title)}</h3>
                    </div>
                    <div class="bloco-respostas esse${x}">${respostasHtml}</div>
                </article>
            </section>`;
    }

    pagina.innerHTML = html;

    const tituloEl = document.querySelector(".pagina-quizz .titulo-quizz");
    aplicarBackgroundComFallback(
        tituloEl,
        quizzescolhido.image,
        `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57))`
    );

    window.scrollTo(0, 0);
}

function aplicarBackgroundComFallback(elemento, url, gradiente) {
    const apply = (finalUrl) => {
        elemento.style.backgroundImage = `${gradiente}, url('${finalUrl}')`;
    };
    const probe = new Image();
    probe.onload = () => apply(url);
    probe.onerror = () => apply(IMG_FALLBACK);
    probe.src = url;
}

function resetEstadoPartida() {
    questoesrespondidas = 0;
    acertos = 0;
    porcentagem = 0;
    leveltotal = 0;
    umacerto = 0;
    porcentagemarredondada = 0;
    numeronoarray = 0;
    u = 0;
}

let questoesrespondidas = 0;
let acertos = 0;

function quizzSelecionado(numerodaquestao, opcao) {
    const escolha = document.querySelector(`.pergunta${numerodaquestao}${opcao}`);
    if (!escolha || escolha.classList.contains("respondida")) return;
    escolha.classList.add("escolhida");

    for (let z = 0; z < quizzescolhido.questions[numerodaquestao].answers.length; z++) {
        const umaopcao = document.querySelector(`.pergunta${numerodaquestao}${z}`);
        umaopcao.removeAttribute("onclick");
        umaopcao.classList.add("respondida");
        if (umaopcao !== escolha) {
            umaopcao.classList.add("nop");
        }
        if (umaopcao.classList.contains("incorreta")) {
            umaopcao.classList.add("errou");
        } else {
            umaopcao.classList.add("acertou");
        }
    }

    if (escolha.classList.contains("correta")) {
        acertos += 1;
    }
    questoesrespondidas += 1;

    const proximaQuestao = numerodaquestao + 1;
    if (proximaQuestao < quizzescolhido.questions.length) {
        setTimeout(() => {
            const irpara = document.querySelector(`#bloco-pergunta-${proximaQuestao}`);
            if (irpara) irpara.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 2000);
    } else {
        setTimeout(() => {
            resultadoQuizz();
        }, 2000);
    }
}

let porcentagem = 0;
let leveltotal = 0;
let umacerto = 0;
let porcentagemarredondada = 0;
let numeronoarray = 0;
let u = 0

function quantidadeAcertos() {
    const totalQuestoes = quizzescolhido.questions.length || 1;
    porcentagem = (acertos * 100) / totalQuestoes;
    porcentagemarredondada = Math.round(porcentagem);

    // Pick the highest level whose minValue <= percentage. Levels may arrive in any order.
    const niveisOrdenados = quizzescolhido.levels
        .map((nivel, idx) => ({ nivel, idx }))
        .sort((a, b) => a.nivel.minValue - b.nivel.minValue);

    let escolhido = niveisOrdenados[0];
    for (const item of niveisOrdenados) {
        if (porcentagemarredondada >= Number(item.nivel.minValue)) {
            escolhido = item;
        }
    }
    u = escolhido.idx;
    return u;
}

function resultadoQuizz() {
    quantidadeAcertos();
    const nivelAtual = quizzescolhido.levels[u];
    const perguntas = document.querySelector(".fim");
    perguntas.innerHTML = `
        <article class="resultado" data-identifier="quizz-result">
            <div class="titulo-resultado">
                <h3>${porcentagemarredondada}% ${escapeHtml(nivelAtual.title)}</h3>
            </div>
            <div class="conteudo-reultado">
                <img src="${nivelAtual.image}" alt="Imagem do resultado" onerror="this.onerror=null;this.src='${IMG_FALLBACK}';">
                <span>${escapeHtml(nivelAtual.text)}</span>
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
    const alvo = perguntas.querySelector(".resultado");
    if (alvo) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
}

function paginaInicial() {
    document.querySelector(".pagina-quizz").style.display = "none";
    document.querySelector(".pagina-quizz").innerHTML = "";
    document.querySelector(".fim").innerHTML = "";
    document.querySelector(".paginaum").style.display = "flex";
    resetEstadoPartida();
    window.scrollTo(0, 0);
}

function reiniciarQuizz() {
    document.querySelector(".fim").innerHTML = "";
    resetEstadoPartida();
    if (identificador !== null && identificador !== undefined) {
        getQuizz(identificador);
    }
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
    const tituloQuizz = document.querySelector(".vamos-comecar .titulo-quizz").value;
    const imagemQuizz = document.querySelector(".vamos-comecar .url-quizz").value;
    qtdadePerguntas = parseInt(document.querySelector(".vamos-comecar .numero-perguntas").value, 10);
    qtdadeNiveis = parseInt(document.querySelector(".vamos-comecar .quantidade-niveis").value, 10);

    const erros = [];
    if (tituloQuizz.length < 20 || tituloQuizz.length > 65) {
        erros.push("O título do quizz deve ter entre 20 e 65 caracteres.");
    }
    if (!validarURL(imagemQuizz)) {
        erros.push("A imagem do quizz deve ser uma URL válida.");
    }
    if (!(qtdadePerguntas >= 3)) {
        erros.push("A quantidade de perguntas deve ser no mínimo 3.");
    }
    if (!(qtdadeNiveis >= 2)) {
        erros.push("A quantidade de níveis deve ser no mínimo 2.");
    }
    if (erros.length > 0) {
        alert("Por favor corrija os campos:\n\n- " + erros.join("\n- "));
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
        text: elementoResposta.children[0].value,
        image: elementoResposta.children[1].value,
        isCorrectAnswer: elementoResposta.classList.contains("resposta-correta")
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
    const divsNiveis = document.querySelectorAll(".cria-quizz .nivel");
    let contPercentualNivelZero = 0;
    let erros = 0;

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
        if (!validarDadosNivel(divsNiveis[i])) {
            erros++;
        }
    }

    if (erros > 0) return;

    for (let i = 0; i < divsNiveis.length; i++) {
        listaNiveis.push(montarNovoNivel(divsNiveis[i]));
    }

    quizz.levels = listaNiveis;
    chamarTelaSucessoCriacaoQuizz();
    sendQuizz(quizz);
}

function montarNovoNivel(nivel) {
    return {
        title: nivel.querySelector(".titulo-nivel").value,
        image: nivel.querySelector(".url-nivel").value,
        text: nivel.querySelector(".descricao-nivel").value,
        minValue: parseInt(nivel.querySelector(".percentual-nivel").value, 10) || 0
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

    const figure = telaSucessoCriacaoQuizz.querySelector("figure");
    aplicarBackgroundComFallback(
        figure,
        quizz.image,
        `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%)`
    );
    telaSucessoCriacaoQuizz.style.display = "flex";
}

function acessarQuizzCriado() {
    getQuizz(quizzRecemCriado.id);
    document.querySelector(".sucesso-quizz").style.display = "none";
}

function voltarInicio() {
    document.querySelector(".sucesso-quizz").style.display = "none";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "none";
    document.querySelector(".cria-quizz .cria-perguntas").style.display = "none";
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    document.querySelector(".paginaum").style.display = "flex";
    if (localStorage.length !== 0) {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "none";
        document.querySelector(".paginaum .meus-quizzes").style.display = "flex";
        document.querySelector(".paginaum .todososquizzes").style.display = "flex";
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
    const escopo = elemento || document.querySelector(".nivel");
    const tituloNivel = escopo.querySelector(".titulo-nivel").value;
    const percentualNivel = parseInt(escopo.querySelector(".percentual-nivel").value, 10);
    const urlNivel = escopo.querySelector(".url-nivel").value;
    const descricaoNivel = escopo.querySelector(".descricao-nivel").value;


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