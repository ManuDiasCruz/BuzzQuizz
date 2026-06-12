// =====================================================================
// BuzzQuizz — lógica do aplicativo.
// Cria e responde quizzes consumindo a API mock da Driven e guarda os
// quizzes do usuário no localStorage. (Antes deste ponto havia um grande
// objeto `quizzTeste` de exemplo que não era mais utilizado — removido.)
// =====================================================================

// Endpoint da API mock da Driven usada para listar/criar quizzes.
const URL_API = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

// Imagens locais (licença Pixabay) usadas como fallback quando uma URL de imagem quebra.
const IMAGEM_PADRAO = "img/fallback.jpg"; // contextos pequenos (cards, respostas, resultado)
const IMAGEM_CAPA = "img/quiz-cover.jpg"; // contextos grandes (capa do quizz, tela de sucesso)

// Tamanho mínimo do título de um nível (mantém o código e a mensagem de erro consistentes).
const MIN_TITULO_NIVEL = 3;

// Quizz em construção (preenchido ao longo do fluxo de criação).
let quizz = {
    title: "Título do quizz",
    image: IMAGEM_PADRAO,
    questions: [],
    levels: []
};

// Estado do quizz que está sendo respondido / listagem geral.
let quizzescolhido;
let identificador;
let listaTodosQuizzes = [];

let qtdadePerguntas = 0;
const MIN_PERGUNTAS = 3;
let listaPerguntas = [];

let qtdadeNiveis = 0;
const MIN_NIVEIS = 2;
let listaNiveis = [];

let listaMeusQuizzes = [];

let quizzRecemCriado;
let existeQuizzUsuario = false;

function sendQuizz(quizzPronto) {
    const promise = axios.post(URL_API, quizzPronto);
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

function carregarMeusQuizzesLocais() {
    listaMeusQuizzes = []; // recomeça do zero — antes acumulava duplicatas a cada chamada
    for (let i = 0; i < localStorage.length; i++) {
        const quizzSerializado = localStorage.getItem(localStorage.key(i));
        try {
            listaMeusQuizzes.push(JSON.parse(quizzSerializado));
        } catch (e) {
            // ignora entradas do localStorage que não sejam JSON de quizz
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
    // (antes havia um console.log que, como efeito colateral, exibia "Seus Quizzes"
    //  mesmo no primeiro acesso — agora isso só acontece quando há quizzes salvos.)
    const promise = axios.get(URL_API);
    promise.then(pegouQuizz);
    promise.catch(erroPegouQuizz);
}

function getQuizz(here) {
    identificador = here;
    const promise = axios.get(URL_API + "/" + identificador);
    promise.then(abrirQuizz);
    promise.catch(erroPegouQuizz);
}

// Monta o HTML de um card de quizz. A última camada de background é a imagem local de
// fallback: se a URL do quizz quebrar, aquela camada some e o fallback aparece atrás.
function montarCardQuizz(quizz) {
    const fundo = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${quizz.image}'), url('${IMAGEM_PADRAO}')`;
    return `
        <article class="card-quizz" onclick="getQuizz(${quizz.id})"
                 style="background-image: ${fundo}; background-size: cover; background-position: center;">
            <h3>${quizz.title}</h3>
        </article>`;
}

function pegouQuizz(resposta) {
    listaTodosQuizzes = resposta.data;
    const todos_quizzes = document.querySelector(".quizzes");
    todos_quizzes.innerHTML = ""; // evita duplicar cards se a lista for recarregada
    for (let i = 0; i < listaTodosQuizzes.length; i++) {
        todos_quizzes.innerHTML += montarCardQuizz(listaTodosQuizzes[i]);
    }
}

function pegaMeusQuizzes() {
    carregarMeusQuizzesLocais();
    const meusQuizzes = document.querySelector(".quizzes-criados");
    meusQuizzes.innerHTML = "";
    for (let i = 0; i < listaMeusQuizzes.length; i++) {
        meusQuizzes.innerHTML += montarCardQuizz(listaMeusQuizzes[i]);
    }
}

function embaralha() {
    return Math.random() - 0.5;
}

// Fallback de imagem: muitos quizzes do servidor têm URLs que não são imagens
// (páginas da Amazon, posts do Instagram, etc.). Quando uma <img> falha ao carregar,
// trocamos pela imagem local padrão para não exibir um ícone de imagem quebrada.
function imagemQuebrada(img) {
    if (img && !img.src.endsWith(IMAGEM_PADRAO)) {
        img.src = IMAGEM_PADRAO;
    }
}

function abrirQuizz(respostaquizz) {
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "block";
    quizzescolhido = respostaquizz.data;
    questoesrespondidas = 0; // zera o progresso ao (re)abrir um quizz — corrige o "reiniciar"
    acertos = 0;

    const titulo = document.querySelector(".pagina-quizz");
    titulo.innerHTML = `
        <section class="titulo-quizz">
            <h2> <span>${quizzescolhido.title}</span></h2>
        </section>`;
    const capa = document.querySelector(".titulo-quizz");
    capa.style.backgroundImage =
        `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('${quizzescolhido.image}'), url('${IMAGEM_CAPA}')`;
    capa.style.backgroundSize = "cover";
    capa.style.backgroundPosition = "center";

    for (let x = 0; x < quizzescolhido.questions.length; x++) {
        quizzescolhido.questions[x].answers.sort(embaralha);
        titulo.innerHTML += `
            <section class="perguntas">
                <article data-identifier="question" class="pergunta" id="questao${x}">
                    <div class="titulo-pergunta" style="background-color: ${quizzescolhido.questions[x].color}">
                        <h3>${quizzescolhido.questions[x].title}</h3>
                    </div>
                    <div class="bloco-respostas esse${x}"></div>
                </article>
            </section>`;
        const blocoRespostas = document.querySelector(`.esse${x}`);
        for (let y = 0; y < quizzescolhido.questions[x].answers.length; y++) {
            const resp = quizzescolhido.questions[x].answers[y];
            blocoRespostas.innerHTML += `
            <div data-identifier="answer" id="pergunta${x}${y}" class="resposta pergunta${x}${y} ${resp.isCorrectAnswer}" onclick="quizzSelecionado(${x},${y})">
                <img src="${resp.image}" alt="${resp.text}" onerror="imagemQuebrada(this)">
                <h4>${resp.text}</h4>
            </div> `;
        }
    }
    window.scrollTo(0, 0);
}

let questoesrespondidas = 0;
let acertos = 0;

function quizzSelecionado(numerodaquestao, opcao) {
    const escolha = document.querySelector(`.pergunta${numerodaquestao}${opcao}`);
    if (!escolha || escolha.classList.contains("escolhida")) {
        return; // ignora cliques repetidos na mesma pergunta
    }
    escolha.classList.add("escolhida");

    const respostas = quizzescolhido.questions[numerodaquestao].answers;
    for (let z = 0; z < respostas.length; z++) {
        const umaopcao = document.querySelector(`.pergunta${numerodaquestao}${z}`);
        umaopcao.removeAttribute("onclick"); // trava todas as opções desta pergunta
        umaopcao.style.cursor = "default";
        // Revela certas/erradas com base no dado (antes usava classList.contains(true/false)).
        umaopcao.classList.add(respostas[z].isCorrectAnswer ? "acertou" : "errou");
        if (umaopcao !== escolha) {
            umaopcao.classList.add("nop"); // esmaece as não escolhidas
        }
    }

    if (respostas[opcao].isCorrectAnswer) {
        acertos += 1;
    }
    questoesrespondidas += 1;

    if (questoesrespondidas === quizzescolhido.questions.length) {
        setTimeout(resultadoQuizz, 2000); // mostra o resultado após responder a última
    } else {
        const proxima = document.querySelector(`#questao${numerodaquestao + 1}`);
        if (proxima) {
            setTimeout(() => proxima.scrollIntoView({ behavior: "smooth" }), 2000);
        }
    }
}

let porcentagemFinal = 0;
let nivelResultado = null;

// Calcula a porcentagem de acertos e o nível correspondente.
// Regra correta: o nível é aquele com o MAIOR minValue que ainda seja <= à porcentagem.
// (A versão anterior acumulava `leveltotal` entre chamadas, dividia por ele — podendo dar
//  NaN/divisão por zero — e usava um índice global `u` que sobrava do loop, mostrando o nível errado.)
function calcularResultado() {
    const totalPerguntas = quizzescolhido.questions.length;
    porcentagemFinal = totalPerguntas > 0 ? Math.round((acertos / totalPerguntas) * 100) : 0;

    const niveisOrdenados = [...quizzescolhido.levels].sort(
        (a, b) => Number(a.minValue) - Number(b.minValue)
    );
    nivelResultado = niveisOrdenados[0];
    for (const nivel of niveisOrdenados) {
        if (porcentagemFinal >= Number(nivel.minValue)) {
            nivelResultado = nivel;
        }
    }
}

function resultadoQuizz() {
    calcularResultado();
    const perguntas = document.querySelector(".fim");
    perguntas.innerHTML = `
        <article class="resultado" data-identifier="quizz-result">
            <div class="titulo-resultado">
                <h3>${porcentagemFinal}% ${nivelResultado.title}</h3>
            </div>
            <div class="conteudo-reultado">
                <img src="${nivelResultado.image}" alt="${nivelResultado.title}" onerror="imagemQuebrada(this)">
                <span>${nivelResultado.text}</span>
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
    perguntas.querySelector(".voltar-inicio").scrollIntoView();
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
    // Cria um objeto novo a cada chamada. Antes reutilizava um objeto global único,
    // então todas as respostas acabavam sendo a mesma referência (a última preenchida).
    return {
        text: elementoResposta.children[0].value,
        image: elementoResposta.children[1].value,
        isCorrectAnswer: elementoResposta.classList.contains("resposta-correta"),
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
    // Objeto novo a cada chamada (evita compartilhar a mesma referência entre perguntas).
    return {
        title: titulo,
        color: cor,
        answers: listaRespostas,
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

    // Regra: pelo menos um nível precisa ter 0% de acerto mínimo.
    let contPercentualNivelZero = 0;
    for (let i = 0; i < divsNiveis.length; i++) {
        if (parseInt(divsNiveis[i].querySelector(".percentual-nivel").value) === 0) {
            contPercentualNivelZero++;
        }
    }
    if (contPercentualNivelZero === 0) {
        alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%.");
        return; // mantém a tela e os dados já digitados (antes recriava a tela e apagava tudo)
    }

    // Valida TODOS os níveis. Antes, um nível inválido chamava document.location.reload(true),
    // que recarregava a página inteira e apagava tudo o que o usuário tinha preenchido.
    let erros = 0;
    for (let i = 0; i < divsNiveis.length; i++) {
        if (!validarDadosNivel(divsNiveis[i])) {
            erros++;
        }
    }
    if (erros > 0) {
        return; // mensagens já exibidas; não recarrega a página nem perde os dados
    }

    for (let i = 0; i < divsNiveis.length; i++) {
        listaNiveis.push(montarNovoNivel(divsNiveis[i]));
    }
    quizz.levels = listaNiveis;
    chamarTelaSucessoCriacaoQuizz();
    sendQuizz(quizz);
}

function montarNovoNivel(nivel) {
    // Objeto novo a cada chamada; minValue como número para ordenação/comparação corretas.
    return {
        title: nivel.querySelector(".titulo-nivel").value,
        image: nivel.querySelector(".url-nivel").value,
        text: nivel.querySelector(".descricao-nivel").value,
        minValue: Number(nivel.querySelector(".percentual-nivel").value),
    };
}

function chamarTelaSucessoCriacaoQuizz() {
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    const telaSucessoCriacaoQuizz = document.querySelector(".cria-quizz .sucesso-quizz");
    montarTelaSucessoCriacaoQuizz(telaSucessoCriacaoQuizz);
}

function montarTelaSucessoCriacaoQuizz(telaSucessoCriacaoQuizz) {
    // (Antes, esta função sobrescrevia quizz.image com uma URL truncada/inválida
    //  ("https://cdn.pixabay.com/…-family-5074732_1280.jpg"), salvando o quizz com a
    //  imagem quebrada. Removido — usamos a imagem que o usuário escolheu.)
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

    const figura = telaSucessoCriacaoQuizz.querySelector("figure");
    // Era `.background` (propriedade inexistente, sem efeito); o correto é `.style.background`.
    figura.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("${quizz.image}"), url("${IMAGEM_CAPA}")`;
    figura.style.backgroundSize = "cover";
    figura.style.backgroundPosition = "center";
    telaSucessoCriacaoQuizz.style.display = "flex";
}

function acessarQuizzCriado() {
    getQuizz(quizzRecemCriado.id);
    document.querySelector(".sucesso-quizz").style.display = "none";
}

function voltarInicio() {
    // Antes a página inicial (.paginaum) continuava escondida (display:none vindo do fluxo de
    // criação), então "Voltar pra home" mostrava uma tela vazia. Agora a reexibimos de fato.
    document.querySelector(".sucesso-quizz").style.display = "none";
    document.querySelector(".cria-quizz").style.display = "none";
    document.querySelector(".paginaum").style.display = "flex";
    if (localStorage.length !== 0) {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "none";
        document.querySelector(".paginaum .meus-quizzes").style.display = "flex";
        document.querySelector(".paginaum .novo-quizz").style.display = "flex";
        document.querySelector(".paginaum .quizzes-criados").style.display = "inline-flex";
        document.querySelector(".paginaum .todososquizzes").style.display = "flex";
        pegaMeusQuizzes(); // sempre atualiza a lista (antes só atualizava quando havia exatamente 1)
    } else {
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

function validarDadosNivel(elemento) {
    // Antes ignorava o parâmetro e validava SEMPRE o primeiro `.nivel`, então os níveis
    // 2+ nunca eram de fato verificados. Agora valida o elemento que recebe.
    const escopo = elemento || document.querySelector(".cria-niveis .nivel");
    const tituloNivel = escopo.querySelector(".titulo-nivel").value;
    const percentualNivel = parseInt(escopo.querySelector(".percentual-nivel").value);
    const urlNivel = escopo.querySelector(".url-nivel").value;
    const descricaoNivel = escopo.querySelector(".descricao-nivel").value;

    if ((tituloNivel.length < MIN_TITULO_NIVEL) ||
        (isNaN(percentualNivel) || percentualNivel < 0 || percentualNivel > 100) ||
        (!validarURL(urlNivel)) || (descricaoNivel.length < 30)) {
        alert(`
            ERRO! Dados incompletos, verifique se os campos do seu nível cumprem os seguintes requisitos:
            1. O título do nível deve ter no mínimo ${MIN_TITULO_NIVEL} caracteres.
            2. O percentual (%) de acerto mínimo deve ser um número entre 0 e 100.
            3. A imagem do nível deve ser uma URL válida.
            4. A descrição do nível deve ter no mínimo 30 caracteres.
        `);
        return false;
    }
    return true;
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