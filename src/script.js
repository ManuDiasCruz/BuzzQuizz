const API_BASE = "https://mock-api.driven.com.br/api/v4/buzzquizz";
const FALLBACK_IMG = "img/placeholder.svg";
const QUIZZ_DEFAULT_COVER = "https://cdn.pixabay.com/photo/2017/02/15/10/57/panda-2068818_1280.jpg";

const MIN_PERGUNTAS = 3;
const MIN_NIVEIS = 2;

let qtdadePerguntas = 0;
let qtdadeNiveis = 0;
let listaPerguntas = [];
let listaNiveis = [];
let listaMeusQuizzes = [];

let quizz = { title: "", image: "", questions: [], levels: [] };
let quizzRecemCriado;
let quizzescolhido;
let identificador;

let questoesrespondidas = 0;
let acertos = 0;
let porcentagemarredondada = 0;
let nivelAtingidoIdx = 0;

// Default sample data shown while the mock-api responds (kept for resilience).
const quizzTesteFallback = {
    title: "Qual panda fofinho você é?",
    image: "https://cdn.pixabay.com/photo/2017/02/15/10/57/panda-2068818_1280.jpg",
    questions: [
        {
            title: "Outro urso fofinho também é um tipo de panda... qual?",
            color: "#F05C5C",
            answers: [
                { text: "O pandinha vermelho", image: "https://cdn.pixabay.com/photo/2020/02/17/13/47/red-panda-4856213_1280.jpg", isCorrectAnswer: true },
                { text: "Panda indiano da floresta", image: "https://cdn.pixabay.com/photo/2016/11/29/05/45/bear-1867462_1280.jpg", isCorrectAnswer: false },
                { text: "Panda puma das montanhas", image: "https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782_1280.jpg", isCorrectAnswer: false },
                { text: "Panda albino chinês", image: "https://cdn.pixabay.com/photo/2014/11/27/15/00/bear-547053_1280.jpg", isCorrectAnswer: false }
            ]
        }
    ],
    levels: [
        { title: "Panda Master", image: "https://cdn.pixabay.com/photo/2017/02/15/10/57/panda-2068818_1280.jpg", text: "PARABÉNS! Você é um mestre em pandas!", minValue: 60 },
        { title: "Iniciante no mundo panda", image: "https://cdn.pixabay.com/photo/2016/11/29/05/45/bear-1867462_1280.jpg", text: "Você ainda tem muito a aprender sobre os pandas.", minValue: 0 }
    ]
};

function sendQuizz(quizzPronto) {
    const promise = axios.post(`${API_BASE}/quizzes`, quizzPronto);
    promise.then(mandouQuizz);
    promise.catch(falhouEnvio);
}

function mandouQuizz(response) {
    const quizzCriado = response.data;
    guardaMeusQuizzesLocalmente(quizzCriado);
    quizzRecemCriado = quizzCriado;
    alert("Seu quizz foi adicionado ao servidor, com o id: " + quizzCriado.id);
}

function falhouEnvio(error) {
    alert(
        "Infelizmente seu quizz não pôde ser enviado ao servidor.\n" +
        (error && error.message ? error.message : "")
    );
}

function guardaMeusQuizzesLocalmente(quizzCriado) {
    localStorage.setItem(String(quizzCriado.id), JSON.stringify(quizzCriado));
}

function getAllQuizzesLocais() {
    listaMeusQuizzes = [];
    for (let i = 0; i < localStorage.length; i++) {
        const raw = localStorage.getItem(localStorage.key(i));
        try {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.id) listaMeusQuizzes.push(parsed);
        } catch (_) {
            // ignore non-quizz items in localStorage
        }
    }
}

function getAllQuizz() {
    document.querySelector(".paginaum .novo-quizz").style.display = "none";
    document.querySelector(".paginaum .quizzes-criados").style.display = "none";
    getAllQuizzesLocais();
    if (listaMeusQuizzes.length !== 0) {
        document.querySelector(".paginaum .criarprimeiroquizz").style.display = "none";
        document.querySelector(".paginaum .meus-quizzes").style.display = "flex";
        document.querySelector(".paginaum .novo-quizz").style.display = "flex";
        document.querySelector(".paginaum .quizzes-criados").style.display = "inline-flex";
        document.querySelector(".paginaum .todososquizzes").style.display = "flex";
        pegaMeusQuizzes(listaMeusQuizzes);
    }
    const promise = axios.get(`${API_BASE}/quizzes`);
    promise.then(pegouQuizz);
    promise.catch(erroPegouQuizz);
}

function getQuizz(here) {
    identificador = here;
    const promise = axios.get(`${API_BASE}/quizzes/${identificador}`);
    promise.then(abrirQuizz);
    promise.catch(erroPegouQuizz);
}

function imgFallbackAttr() {
    return `onerror="this.onerror=null;this.src='${FALLBACK_IMG}';"`;
}

function pegouQuizz(resposta) {
    const todos = Array.isArray(resposta.data) ? resposta.data : [];
    const container = document.querySelector(".quizzes");
    container.innerHTML = "";
    if (todos.length === 0) {
        container.innerHTML = `<p class="aviso-vazio">Nenhum quizz disponível no servidor no momento.</p>`;
        return;
    }
    for (let i = 0; i < todos.length; i++) {
        const q = todos[i];
        const cover = q.image || QUIZZ_DEFAULT_COVER;
        const article = document.createElement("article");
        article.className = `quizz-card quizz${i}`;
        article.setAttribute("role", "button");
        article.setAttribute("tabindex", "0");
        article.innerHTML = `<h3>${escapeHtml(q.title || "Quizz sem título")}</h3>`;
        article.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${cover}')`;
        article.addEventListener("click", () => getQuizz(q.id));
        article.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                getQuizz(q.id);
            }
        });
        container.appendChild(article);
    }
}

function pegaMeusQuizzes(lista) {
    const meusQuizzes = document.querySelector(".quizzes-criados");
    meusQuizzes.innerHTML = "";
    for (let i = 0; i < lista.length; i++) {
        const q = lista[i];
        const cover = q.image || QUIZZ_DEFAULT_COVER;
        const article = document.createElement("article");
        article.className = `quizz-card meu-quizz${i}`;
        article.setAttribute("role", "button");
        article.setAttribute("tabindex", "0");
        article.innerHTML = `<h3>${escapeHtml(q.title || "Quizz sem título")}</h3>`;
        article.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${cover}')`;
        article.addEventListener("click", () => getQuizz(q.id));
        article.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                getQuizz(q.id);
            }
        });
        meusQuizzes.appendChild(article);
    }
}

function embaralha() {
    return Math.random() - 0.5;
}

function escapeHtml(s) {
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function abrirQuizz(respostaquizz) {
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "block";
    document.querySelector(".fim").innerHTML = "";

    // Reset run state when entering a quizz
    questoesrespondidas = 0;
    acertos = 0;
    porcentagemarredondada = 0;
    nivelAtingidoIdx = 0;

    quizzescolhido = respostaquizz.data;
    const pagina = document.querySelector(".pagina-quizz");
    const cover = quizzescolhido.image || QUIZZ_DEFAULT_COVER;
    pagina.innerHTML = `
        <section class="titulo-quizz">
            <h2><span>${escapeHtml(quizzescolhido.title)}</span></h2>
        </section>`;
    const titulo = pagina.querySelector(".titulo-quizz");
    titulo.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('${cover}')`;

    for (let x = 0; x < quizzescolhido.questions.length; x++) {
        // Shuffle a copy so we don't mutate the source.
        const question = quizzescolhido.questions[x];
        const shuffled = question.answers.slice().sort(embaralha);
        const sectionHtml = `
            <section class="perguntas">
                <article data-identifier="question" class="pergunta">
                    <div class="titulo-pergunta" style="background-color: ${escapeHtml(question.color || "#434CA0")}">
                        <h3>${escapeHtml(question.title)}</h3>
                    </div>
                    <div class="bloco-respostas esse${x}"></div>
                </article>
            </section>`;
        pagina.insertAdjacentHTML("beforeend", sectionHtml);
        const bloco = pagina.querySelector(`.esse${x}`);
        for (let y = 0; y < shuffled.length; y++) {
            const ans = shuffled[y];
            const correctClass = ans.isCorrectAnswer ? "correct" : "incorrect";
            bloco.innerHTML += `
                <div data-identifier="answer" id="pergunta${x}${y}" class="resposta pergunta${x}${y} ${correctClass}" onclick="quizzSelecionado(${x},${y},${ans.isCorrectAnswer ? "true" : "false"})">
                    <img src="${ans.image || FALLBACK_IMG}" alt="Imagem da resposta" ${imgFallbackAttr()}>
                    <h4>${escapeHtml(ans.text)}</h4>
                </div>`;
        }
    }
    window.scrollTo(0, 0);
}

function quizzSelecionado(numerodaquestao, opcao, acertou) {
    const escolha = document.querySelector(`.pergunta${numerodaquestao}${opcao}`);
    if (!escolha || escolha.classList.contains("escolhida")) return;
    escolha.classList.add("escolhida");

    const todasOpcoes = document.querySelectorAll(`[id^="pergunta${numerodaquestao}"]`);
    todasOpcoes.forEach((opt) => {
        opt.removeAttribute("onclick");
        if (opt !== escolha) opt.classList.add("nop");
        if (opt.classList.contains("correct")) {
            opt.classList.add("acertou");
        } else {
            opt.classList.add("errou");
        }
    });

    if (acertou) acertos += 1;
    questoesrespondidas += 1;

    if (questoesrespondidas === quizzescolhido.questions.length) {
        setTimeout(() => {
            calcularResultado();
            resultadoQuizz();
        }, 2000);
    } else {
        setTimeout(() => {
            const proxima = document.querySelector(`#pergunta${numerodaquestao + 1}0`);
            if (proxima) proxima.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 2000);
    }
}

function calcularResultado() {
    const totalPerguntas = quizzescolhido.questions.length || 1;
    const porcentagem = (acertos * 100) / totalPerguntas;
    porcentagemarredondada = Math.round(porcentagem);

    // Pick the highest level whose minValue is <= reached percentage.
    const niveisOrdenados = quizzescolhido.levels
        .map((lvl, idx) => ({ lvl, idx }))
        .sort((a, b) => Number(b.lvl.minValue) - Number(a.lvl.minValue));
    let escolhido = niveisOrdenados[niveisOrdenados.length - 1];
    for (const entry of niveisOrdenados) {
        if (porcentagemarredondada >= Number(entry.lvl.minValue)) {
            escolhido = entry;
            break;
        }
    }
    nivelAtingidoIdx = escolhido.idx;
}

function resultadoQuizz() {
    const nivel = quizzescolhido.levels[nivelAtingidoIdx];
    const perguntas = document.querySelector(".fim");
    const imagem = nivel.image || QUIZZ_DEFAULT_COVER;
    perguntas.innerHTML = `
        <article class="resultado" data-identifier="quizz-result">
            <div class="titulo-resultado">
                <h3>${porcentagemarredondada}% ${escapeHtml(nivel.title)}</h3>
            </div>
            <div class="conteudo-reultado">
                <img src="${imagem}" alt="Imagem do resultado" ${imgFallbackAttr()}>
                <span>${escapeHtml(nivel.text)}</span>
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
    const irpara = document.querySelector(".fim .resultado");
    if (irpara) irpara.scrollIntoView({ behavior: "smooth" });
}

function paginaInicial() {
    window.location.reload();
}

function reiniciarQuizz() {
    document.querySelector(".fim").innerHTML = "";
    questoesrespondidas = 0;
    acertos = 0;
    porcentagemarredondada = 0;
    nivelAtingidoIdx = 0;
    getQuizz(identificador);
}

function erroPegouQuizz(error) {
    alert(
        "Infelizmente não foi possível pegar seu Quizz no servidor.\n" +
        (error && error.message ? error.message : "")
    );
}

function chamarTelaCriarQuizz() {
    document.querySelector(".paginaum").style.display = "none";
    const tela = document.querySelector(".cria-quizz .vamos-comecar");
    tela.innerHTML = `
        <h1>Comece pelo começo</h1>
        <div class="primeiro-forms">
            <input class="titulo-quizz" type="text" placeholder="Título do seu quizz" minlength="20" maxlength="65" />
            <input class="url-quizz" type="url" placeholder="URL da imagem do seu quizz" />
            <input class="numero-perguntas" type="number" placeholder="Quantidade de perguntas do quizz" min="3" />
            <input class="quantidade-niveis" type="number" placeholder="Quantidade de níveis do quizz" min="2" />
        </div>
        <button class="prosseguir" onclick="validarDadosBasicos()">
            <p>Prosseguir pra criar perguntas</p>
        </button>`;
    tela.style.display = "flex";
}

function validarDadosBasicos() {
    const tituloQuizz = document.querySelector(".vamos-comecar .titulo-quizz").value.trim();
    const imagemQuizz = document.querySelector(".vamos-comecar .url-quizz").value.trim();
    qtdadePerguntas = parseInt(document.querySelector(".vamos-comecar .numero-perguntas").value, 10);
    qtdadeNiveis = parseInt(document.querySelector(".vamos-comecar .quantidade-niveis").value, 10);

    const erros = [];
    if (tituloQuizz.length < 20 || tituloQuizz.length > 65) {
        erros.push("Título: entre 20 e 65 caracteres.");
    }
    if (!validarURL(imagemQuizz)) {
        erros.push("Imagem do quizz: URL inválida.");
    }
    if (!(qtdadePerguntas >= 3)) {
        erros.push("Quantidade de perguntas: mínimo 3.");
    }
    if (!(qtdadeNiveis >= 2)) {
        erros.push("Quantidade de níveis: mínimo 2.");
    }
    if (erros.length > 0) {
        alert("Corrija os campos:\n- " + erros.join("\n- "));
        return;
    }
    quizz.title = tituloQuizz;
    quizz.image = imagemQuizz;
    chamarTelaCriarPerguntas();
}

function chamarTelaCriarPerguntas() {
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "none";
    const tela = document.querySelector(".cria-quizz .cria-perguntas");
    montarTelaCriarPerguntas(tela);
}

function blocoPerguntaHtml(numero) {
    return `
        <div class="pergunta" data-identifier="question">
            <h2>Pergunta ${numero}</h2>
            <div class="cabecalho-pergunta">
                <input class="texto-pergunta" type="text" placeholder="Texto da pergunta" minlength="20" />
                <input class="cor-pergunta" type="color" placeholder="Cor de fundo da pergunta" />
            </div>
            <h2>Resposta correta</h2>
            <div class="resposta-correta">
                <input class="texto-resposta" type="text" placeholder="Resposta correta" required="required" />
                <input class="url-resposta" type="url" placeholder="URL da imagem" />
            </div>
            <h2>Respostas incorretas</h2>
            <div class="resposta">
                <input class="texto-resposta" type="text" placeholder="Resposta incorreta 1" required="required" />
                <input class="url-resposta" type="url" placeholder="URL da imagem 1" />
            </div>
            <div class="resposta">
                <input class="texto-resposta" type="text" placeholder="Resposta incorreta 2" />
                <input class="url-resposta" type="url" placeholder="URL da imagem 2" />
            </div>
            <div class="resposta">
                <input class="texto-resposta" type="text" placeholder="Resposta incorreta 3" />
                <input class="url-resposta" type="url" placeholder="URL da imagem 3" />
            </div>
        </div>`;
}

function montarTelaCriarPerguntas(telaCriarPerguntas) {
    let html = `<h1>Crie suas perguntas</h1>` + blocoPerguntaHtml(1);
    for (let i = 2; i <= qtdadePerguntas; i++) {
        html += `
            <div class="nova-pergunta" data-identifier="expand">
                <h2>Pergunta ${i}</h2>
                <img class="botaoEditar" src="img/editar.png" alt="Botão editar" onclick="abrirNovaPergunta(this)">
            </div>`;
    }
    html += `
        <button class="prosseguir" onclick="validarTodasPerguntas()">
            <p>Prosseguir pra criar níveis</p>
        </button>`;
    telaCriarPerguntas.innerHTML = html;
    telaCriarPerguntas.style.display = "flex";
}

function abrirNovaPergunta(elemento) {
    const card = elemento.parentNode;
    const titulo = card.querySelector("h2") ? card.querySelector("h2").textContent : "Pergunta";
    const numero = (titulo.replace(/^\D+/, "").trim() || "?");
    card.outerHTML = blocoPerguntaHtml(numero);
}

function montarNovaResposta(elementoResposta) {
    const textoResposta = elementoResposta.children[0].value;
    const urlResposta = elementoResposta.children[1].value;
    const ehRespostaCorreta = elementoResposta.classList.contains("resposta-correta");
    return { text: textoResposta, image: urlResposta, isCorrectAnswer: ehRespostaCorreta };
}

function validarTodasPerguntas() {
    listaPerguntas = [];
    const divsPerguntas = document.querySelectorAll(".cria-quizz .cria-perguntas .pergunta");
    let erroPreenchimento = 0;

    for (let i = 0; i < divsPerguntas.length; i++) {
        if (!validarDadosPergunta(divsPerguntas[i])) erroPreenchimento++;
    }

    if (erroPreenchimento > 0) return;

    for (let i = 0; i < divsPerguntas.length; i++) {
        const listaRespostas = [];
        listaRespostas.push(montarNovaResposta(divsPerguntas[i].querySelector(".resposta-correta")));
        const incorretas = divsPerguntas[i].querySelectorAll(".resposta");
        for (let j = 0; j < incorretas.length; j++) {
            if (incorretas[j].children[0].value !== "") {
                listaRespostas.push(montarNovaResposta(incorretas[j]));
            }
        }
        listaPerguntas.push({
            title: divsPerguntas[i].querySelector(".texto-pergunta").value,
            color: divsPerguntas[i].querySelector(".cor-pergunta").value,
            answers: listaRespostas
        });
    }
    quizz.questions = listaPerguntas;
    chamarTelaCriarNiveis();
}

function chamarTelaCriarNiveis() {
    document.querySelector(".cria-quizz .cria-perguntas").style.display = "none";
    const tela = document.querySelector(".cria-quizz .cria-niveis");
    montarTelaCriarNiveis(tela);
}

function blocoNivelHtml(numero) {
    return `
        <div class="nivel" data-identifier="level">
            <h2>Nível ${numero}</h2>
            <input class="titulo-nivel" type="text" placeholder="Título do nível" minlength="10" />
            <input class="percentual-nivel" type="number" placeholder="% de acerto mínima" min="0" max="100" />
            <input class="url-nivel" type="url" placeholder="URL da imagem do nível" />
            <textarea class="descricao-nivel" placeholder="Descrição do nível" minlength="30"></textarea>
        </div>`;
}

function montarTelaCriarNiveis(telaCriarNiveis) {
    let html = `<h1>Agora, decida os níveis!</h1>` + blocoNivelHtml(1);
    for (let i = 2; i <= qtdadeNiveis; i++) {
        html += `
            <div class="novo-nivel" data-identifier="expand">
                <h2>Nível ${i}</h2>
                <img class="botaoEditar" src="img/editar.png" alt="Botão editar" onclick="abrirNovoNivel(this)">
            </div>`;
    }
    html += `
        <button class="finaliza-quizz" onclick="validarTodosNiveis()">
            <p>Finalizar Quizz</p>
        </button>`;
    telaCriarNiveis.innerHTML = html;
    telaCriarNiveis.style.display = "flex";
}

function abrirNovoNivel(elemento) {
    const card = elemento.parentNode;
    const titulo = card.querySelector("h2") ? card.querySelector("h2").textContent : "Nível";
    const numero = (titulo.replace(/^\D+/, "").trim() || "?");
    card.outerHTML = blocoNivelHtml(numero);
}

function validarTodosNiveis() {
    listaNiveis = [];
    const divsNiveis = document.querySelectorAll(".cria-quizz .cria-niveis .nivel");
    let contPercentualNivelZero = 0;

    for (let i = 0; i < divsNiveis.length; i++) {
        if (Number(divsNiveis[i].querySelector(".percentual-nivel").value) === 0) {
            contPercentualNivelZero++;
        }
    }

    if (contPercentualNivelZero === 0) {
        alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%.");
        return;
    }
    for (let i = 0; i < divsNiveis.length; i++) {
        if (!validarDadosNivel(divsNiveis[i])) return;
        listaNiveis.push({
            title: divsNiveis[i].querySelector(".titulo-nivel").value,
            image: divsNiveis[i].querySelector(".url-nivel").value,
            text: divsNiveis[i].querySelector(".descricao-nivel").value,
            minValue: Number(divsNiveis[i].querySelector(".percentual-nivel").value)
        });
    }
    quizz.levels = listaNiveis;
    chamarTelaSucessoCriacaoQuizz();
    sendQuizz(quizz);
}

function chamarTelaSucessoCriacaoQuizz() {
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    const tela = document.querySelector(".cria-quizz .sucesso-quizz");
    montarTelaSucessoCriacaoQuizz(tela);
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
        </button>`;
    const fig = telaSucessoCriacaoQuizz.querySelector("figure");
    const cover = quizz.image || QUIZZ_DEFAULT_COVER;
    fig.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("${cover}")`;
    fig.style.backgroundSize = "cover";
    fig.style.backgroundPosition = "center";
    telaSucessoCriacaoQuizz.style.display = "flex";
}

function acessarQuizzCriado() {
    if (!quizzRecemCriado) {
        alert("Aguarde o quizz ser enviado ao servidor.");
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
    document.querySelector(".paginaum").style.display = "flex";
    getAllQuizz();
}

function validarDadosPergunta(elemento) {
    const textoPergunta = elemento.querySelector(".cabecalho-pergunta .texto-pergunta").value;
    const respostaCorreta = elemento.querySelector(".resposta-correta .texto-resposta").value;
    const urlRespostaCorreta = elemento.querySelector(".resposta-correta .url-resposta").value;
    const respostasIncorretas = elemento.querySelectorAll(".resposta .texto-resposta");
    const urlRespostasIncorretas = elemento.querySelectorAll(".resposta .url-resposta");

    let contaRespostasIncorretas = 0;
    for (let i = 0; i < respostasIncorretas.length; i++) {
        if (respostasIncorretas[i].value !== "") contaRespostasIncorretas++;
    }
    let contaUrlRespostasIncorretas = 0;
    for (let i = 0; i < urlRespostasIncorretas.length; i++) {
        if (urlRespostasIncorretas[i].value !== "" && validarURL(urlRespostasIncorretas[i].value)) {
            contaUrlRespostasIncorretas++;
        }
    }
    if (textoPergunta.length < 20 || respostaCorreta === "" || !validarURL(urlRespostaCorreta) ||
        contaRespostasIncorretas === 0 || contaUrlRespostasIncorretas === 0 ||
        contaRespostasIncorretas !== contaUrlRespostasIncorretas) {
        alert(
            "ERRO! Dados incompletos. Verifique:\n" +
            "1. Texto da pergunta com no mínimo 20 caracteres.\n" +
            "2. Resposta correta com texto e URL de imagem válida.\n" +
            "3. Pelo menos 1 resposta incorreta com texto e URL de imagem válida.\n" +
            "4. Cada resposta preenchida precisa de texto e URL de imagem válida."
        );
        return false;
    }
    return true;
}

function validarDadosNivel(elemento) {
    const tituloNivel = elemento.querySelector(".titulo-nivel").value;
    const percentualNivel = parseInt(elemento.querySelector(".percentual-nivel").value, 10);
    const urlNivel = elemento.querySelector(".url-nivel").value;
    const descricaoNivel = elemento.querySelector(".descricao-nivel").value;
    if (tituloNivel.length < 10 || isNaN(percentualNivel) || percentualNivel < 0 || percentualNivel > 100 ||
        !validarURL(urlNivel) || descricaoNivel.length < 30) {
        alert(
            "ERRO! Dados incompletos do nível. Verifique:\n" +
            "1. Título com no mínimo 10 caracteres.\n" +
            "2. Percentual entre 0 e 100.\n" +
            "3. URL da imagem válida.\n" +
            "4. Descrição com no mínimo 30 caracteres."
        );
        return false;
    }
    return true;
}

// URL validation regex (https://stackoverflow.com/questions/5717093)
function validarURL(texto) {
    if (!texto) return false;
    const pattern = new RegExp("^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$", "i");
    return pattern.test(texto);
}

window.addEventListener("DOMContentLoaded", () => {
    getAllQuizz();
});
