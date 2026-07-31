const API_URL = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

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
let quizzescolhido;
let identificador;

function sendQuizz(quizzPronto) {
    const promise = axios.post(API_URL, quizzPronto);
    promise.then(mandouQuizz);
    promise.catch(falhouEnvio);
}

function mandouQuizz(response) {
    quizzRecemCriado = response.data;
    guardaMeusQuizzesLocalmente(quizzRecemCriado);
    chamarTelaSucessoCriacaoQuizz();
}

function falhouEnvio(error) {
    alert(`
        Infelizmente seu quizz não pôde ser enviado ao servidor. Tente novamente.
        ${error.message}
    `);
}

function guardaMeusQuizzesLocalmente(quizz) {
    const quizzSerializado = JSON.stringify(quizz);
    localStorage.setItem(quizz.id, quizzSerializado);
}

function getAllQuizzesLocais() {
    listaMeusQuizzes = [];
    for (var i = 0; i < localStorage.length; i++) {
        try {
            listaMeusQuizzes.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        } catch (e) {
            // ignora chaves do localStorage que não são quizzes serializados
        }
    }
}

function getAllQuizz() {
    document.querySelector(".paginaum .novo-quizz").style.display = "none";
    document.querySelector(".paginaum .quizzes-criados").style.display = "none";
    if (localStorage.length !== 0) {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "none";
        document.querySelector(".paginaum .meus-quizzes").style.display = "flex";
        document.querySelector(".paginaum .novo-quizz").style.display = "flex";
        document.querySelector(".paginaum .quizzes-criados").style.display = "inline-flex";
        document.querySelector(".paginaum .todososquizzes").style.display = "flex";
        pegaMeusQuizzes();
    }
    const promise = axios.get(API_URL);
    promise.then(pegouQuizz);
    promise.catch(erroPegouQuizz);
}

function getQuizz(here) {
    identificador = here;
    const promise = axios.get(API_URL + "/" + identificador);
    promise.then(abrirQuizz);
    promise.catch(erroPegouQuizz);
}

function pegouQuizz(resposta) {
    const listaQuizzes = resposta.data;
    let todos_quizzes = document.querySelector(".quizzes");
    todos_quizzes.innerHTML = "";
    for (let i = 0; i < listaQuizzes.length; i++) {
        todos_quizzes.innerHTML += `
        <article class="quizz-todos${i}" onclick="getQuizz(${listaQuizzes[i].id})">
            <h3>${listaQuizzes[i].title}</h3>
        </article>`
        let umQuizz = todos_quizzes.querySelector(`.quizz-todos${i}`);
        umQuizz.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${listaQuizzes[i].image}')`;
    }
}

function pegaMeusQuizzes() {
    getAllQuizzesLocais();
    let meusQuizzes = document.querySelector(".quizzes-criados");
    meusQuizzes.innerHTML = "";
    for (let i = 0; i < listaMeusQuizzes.length; i++) {
        meusQuizzes.innerHTML += `
        <article class="quizz-meu${i}" onclick="getQuizz(${listaMeusQuizzes[i].id})">
            <h3>${listaMeusQuizzes[i].title}</h3>
        </article>`
        let umQuizz = meusQuizzes.querySelector(`.quizz-meu${i}`);
        umQuizz.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${listaMeusQuizzes[i].image}')`;
    }
}

function embaralha() {
    return Math.random() - 0.5;
}

function abrirQuizz(respostaquizz) {
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "block";
    questoesrespondidas = 0;
    acertos = 0;
    quizzescolhido = respostaquizz.data;
    const telaQuizz = document.querySelector(".pagina-quizz");
    telaQuizz.innerHTML = `
        <section class="titulo-quizz">
            <h2> <span>${quizzescolhido.title}</span></h2>
        </section>`
    const tituloQuizz = telaQuizz.querySelector(".titulo-quizz");
    tituloQuizz.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('${quizzescolhido.image}')`;
    for (let x = 0; x < quizzescolhido.questions.length; x++) {
        quizzescolhido.questions[x].answers.sort(embaralha)
        telaQuizz.innerHTML += `
            <section class="perguntas">
                <article data-identifier="question" class="pergunta">
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
                <img src="${quizzescolhido.questions[x].answers[y].image}" onerror="this.onerror=null;this.src='img/resposta-indisponivel.png'" alt="Imagem da opção de resposta">
                <h4>${quizzescolhido.questions[x].answers[y].text}</h4>
            </div> `
        }
    }
    window.scrollTo(0, 0)
}

let questoesrespondidas = 0;
let acertos = 0;

function quizzSelecionado(numerodaquestao, opcao) {
    let escolha = document.querySelector(`.pergunta${numerodaquestao}${opcao}`);
    escolha.classList.add("escolhida");
    for (let z = 0; z < quizzescolhido.questions[numerodaquestao].answers.length; z++) {
        let umaopcao = document.querySelector(`.pergunta${numerodaquestao}${z}`);
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

    setTimeout(() => {
        if (questoesrespondidas >= quizzescolhido.questions.length) {
            resultadoQuizz();
        } else {
            const proxima = proximaPerguntaSemResposta();
            if (proxima !== null) {
                proxima.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, 2000);
}

let porcentagemarredondada = 0;

function proximaPerguntaSemResposta() {
    const blocos = document.querySelectorAll(".pagina-quizz .bloco-respostas");
    for (let i = 0; i < blocos.length; i++) {
        if (blocos[i].querySelector(".escolhida") === null) {
            return blocos[i].parentNode;
        }
    }
    return null;
}

function calcularNivel() {
    porcentagemarredondada = Math.round((acertos / quizzescolhido.questions.length) * 100);
    let indiceNivel = 0;
    let maiorMinimo = -1;
    for (let i = 0; i < quizzescolhido.levels.length; i++) {
        const minimo = Number(quizzescolhido.levels[i].minValue);
        if (minimo <= porcentagemarredondada && minimo > maiorMinimo) {
            maiorMinimo = minimo;
            indiceNivel = i;
        }
    }
    return indiceNivel;
}

function resultadoQuizz() {
    const nivel = quizzescolhido.levels[calcularNivel()];
    let perguntas = document.querySelector(".fim");
    perguntas.innerHTML = `
        <article class="resultado" data-identifier="quizz-result">
            <div class="titulo-resultado">
                <h3>${porcentagemarredondada}% ${nivel.title}</h3>
            </div>
            <div class="conteudo-reultado">
                <img src="${nivel.image}" onerror="this.onerror=null;this.src='img/resposta-indisponivel.png'" alt="Imagem do resultado">
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
    perguntas.querySelector(".voltar-inicio").scrollIntoView({ behavior: "smooth" });
}

function paginaInicial() {
    window.location.reload();
}

function reiniciarQuizz() {
    document.querySelector(".fim").innerHTML = "";
    getQuizz(identificador);
}

function erroPegouQuizz(error) {
    alert(`
        Infelizmente não foi possível pegar seu Quizz no servidor.
        ${error.message}
    `);
}

function chamarTelaCriarQuizz() {
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "flex";
}

function validarDadosBasicos() {
    const tituloQuizz = document.querySelector(".vamos-comecar .titulo-quizz").value;
    const imagemQuizz = document.querySelector(".vamos-comecar .url-quizz").value;
    qtdadePerguntas = parseInt(document.querySelector(".vamos-comecar .numero-perguntas").value);
    qtdadeNiveis = parseInt(document.querySelector(".vamos-comecar .quantidade-niveis").value);

    const erros = [];
    if (tituloQuizz.length < 20 || tituloQuizz.length > 65) {
        erros.push("O título do quizz deve ter no mínimo 20 e no máximo 65 caracteres.");
    }
    if (!validarURL(imagemQuizz)) {
        erros.push("A imagem deve ser uma URL válida.");
    }
    if (isNaN(qtdadePerguntas) || qtdadePerguntas < MIN_PERGUNTAS) {
        erros.push(`A quantidade de perguntas deve ser no mínimo ${MIN_PERGUNTAS}.`);
    }
    if (isNaN(qtdadeNiveis) || qtdadeNiveis < MIN_NIVEIS) {
        erros.push(`A quantidade de níveis deve ser no mínimo ${MIN_NIVEIS}.`);
    }

    if (erros.length > 0) {
        alert("Confira os dados do seu quizz:\n\n- " + erros.join("\n- "));
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
    let erroPreenchimento = 0;

    const divsPerguntas = document.querySelectorAll(".cria-quizz .pergunta");

    if (divsPerguntas.length < qtdadePerguntas) {
        alert(`Você declarou ${qtdadePerguntas} perguntas, mas preencheu apenas ${divsPerguntas.length}. Clique no ícone de editar de cada pergunta e preencha todas antes de prosseguir.`);
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
    const divsNiveis = document.querySelectorAll(".cria-quizz .nivel");
    let contPercentualNivelZero = 0;

    if (divsNiveis.length < qtdadeNiveis) {
        alert(`Você declarou ${qtdadeNiveis} níveis, mas preencheu apenas ${divsNiveis.length}. Clique no ícone de editar de cada nível e preencha todos antes de finalizar.`);
        return;
    }

    for (let i = 0; i < divsNiveis.length; i++) {
        if (!validarDadosNivel(divsNiveis[i])) {
            return;
        }
        if (parseInt(divsNiveis[i].querySelector(".percentual-nivel").value) === 0) {
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
    sendQuizz(quizz);
}

function montarNovoNivel(nivel) {
    return {
        title: nivel.querySelector(".titulo-nivel").value,
        image: nivel.querySelector(".url-nivel").value,
        text: nivel.querySelector(".descricao-nivel").value,
        minValue: parseInt(nivel.querySelector(".percentual-nivel").value)
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

    telaSucessoCriacaoQuizz.querySelector("figure").style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("${quizz.image}") center / cover no-repeat`;
    telaSucessoCriacaoQuizz.style.display = "flex";
}

function acessarQuizzCriado() {
    getQuizz(quizzRecemCriado.id);
    document.querySelector(".sucesso-quizz").style.display = "none";
}

function voltarInicio() {
    document.querySelector(".sucesso-quizz").style.display = "none";
    if (localStorage.length !== 0) {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "none";
        document.querySelector(".paginaum .meus-quizzes").style.display = "flex";
        document.querySelector(".paginaum .novo-quizz").style.display = "flex";
        document.querySelector(".paginaum .quizzes-criados").style.display = "inline-flex";
        document.querySelector(".paginaum .todososquizzes").style.display = "flex";
        pegaMeusQuizzes();
    } else {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "flex";
    }
    document.querySelector(".paginaum").style.display = "flex";
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
            ERRO! Dados incompletos, verifique se os campos da sua pergunta cumprem os seguintes requisitos:
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
    let tituloNivel = elemento.querySelector(".titulo-nivel").value;
    let percentualNivel = parseInt(elemento.querySelector(".percentual-nivel").value);
    let urlNivel = elemento.querySelector(".url-nivel").value;
    let descricaoNivel = elemento.querySelector(".descricao-nivel").value;

    if ((tituloNivel.length < 10) || isNaN(percentualNivel) || (percentualNivel < 0) || (percentualNivel > 100) ||
        (!validarURL(urlNivel)) || (descricaoNivel.length < 30)) {
        alert(`
            ERRO! Dados incompletos, verifique se os campos do seu nível cumprem os seguintes requisitos:
            1. O título do nível deve ter no mínimo 10 caracteres.
            2. O percentual(%) de acerto mínimo deve ser um número entre 0 e 100.
            3. A imagem do nível deve ser uma URL válida.
            4. A descrição do nível deve ter no mínimo 30 caracteres.
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