const URL_API = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
const CHAVE_MEUS_QUIZZES = "buzzquizz:meus-quizzes";
const ESPERA_PROXIMA_PERGUNTA = 2000;

const MIN_PERGUNTAS = 3;
const MIN_NIVEIS = 2;
const MIN_CARACTERES_TITULO_QUIZZ = 20;
const MAX_CARACTERES_TITULO_QUIZZ = 65;
const MIN_CARACTERES_TITULO_NIVEL = 10;
const MIN_CARACTERES_PERGUNTA = 20;
const MIN_CARACTERES_DESCRICAO_NIVEL = 30;

/*
 * Quizz de demonstração. Fica no ar quando a mock API não responde, para que a
 * home nunca apareça vazia. As imagens são do Pixabay (ver src/images.js).
 */
const QUIZZ_DEMONSTRACAO = {
    id: "demo-panda",
    title: "Qual panda fofinho você é? (demonstração)",
    image: "https://cdn.pixabay.com/photo/2018/02/18/00/22/panda-3161290_640.jpg",
    questions: [{
            title: "Outro urso fofinho também é um tipo de panda... qual?",
            color: "#F05C5C",
            answers: [{
                    text: "O pandinha vermelho",
                    image: "https://cdn.pixabay.com/photo/2017/01/15/19/04/red-panda-1982445_640.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Panda indiano da floresta",
                    image: "https://cdn.pixabay.com/photo/2021/09/02/16/47/bear-6593944_640.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Panda puma das montanhas",
                    image: "https://cdn.pixabay.com/photo/2016/03/27/18/10/bear-1283347_640.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Panda albino chinês",
                    image: "https://cdn.pixabay.com/photo/2023/02/21/10/45/panda-bear-7803988_640.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Você é um Panda agora! Qual sua comida favorita?",
            color: "#55DD65",
            answers: [{
                    text: "Um gostoso e nutritivo bambu",
                    image: "https://cdn.pixabay.com/photo/2015/11/06/15/04/bamboo-1028699_640.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Folhinhas fininhas e verdinhas",
                    image: "https://cdn.pixabay.com/photo/2021/09/09/01/00/trees-6608197_640.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Musguinho cheio de bichinhos",
                    image: "https://cdn.pixabay.com/photo/2023/03/27/18/28/moss-7881439_640.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Qual paisagem combina mais com o seu humor de hoje?",
            color: "#6ACAE2",
            answers: [{
                    text: "Montanhas geladas, longe de tudo",
                    image: "https://cdn.pixabay.com/photo/2016/11/23/13/50/mountains-1852955_640.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Mar aberto, sem pressa nenhuma",
                    image: "https://cdn.pixabay.com/photo/2016/11/22/19/33/sea-1850228_640.jpg",
                    isCorrectAnswer: false
                }
            ]
        }
    ],
    levels: [{
            title: "Iniciante no mundo panda",
            image: "https://cdn.pixabay.com/photo/2018/12/14/17/06/panda-3875426_640.jpg",
            text: "Meu caro amigo, você ainda é um jovem padawan que tem muito a aprender sobre os pandas. Então, vai lá pesquisar: além do famoso Panda Gigante preto e branco, existe um pequeno fofinho chamado Panda Vermelho que sempre rouba a cena.",
            minValue: 0
        },
        {
            title: "Panda Master",
            image: "https://cdn.pixabay.com/photo/2016/11/23/13/15/red-panda-1852789_640.jpg",
            text: "PARABÉNS! Você é um mestre em pandas! Sabe até que existem duas fofuras nesse mundo de diferentes pesos... O famoso Panda Gigante pesa de 65 a 110 kg, e o pequenino Panda Vermelho apenas de 3,7 a 6,2 kg.",
            minValue: 60
        }
    ]
};

/* Rascunho do quizz que está sendo criado nas telas 1 a 4. */
let quizz = {
    title: "",
    image: "",
    questions: [],
    levels: []
};

let qtdadePerguntas = MIN_PERGUNTAS;
let qtdadeNiveis = MIN_NIVEIS;

let listaMeusQuizzes = [];
let quizzRecemCriado = null;

/* Estado da partida em andamento. */
let quizzEscolhido = null;
let idQuizzEscolhido = null;
let perguntasRespondidas = new Set();
let acertos = 0;
let resultadoJaExibido = false;


/* ------------------------------------------------------------------ *
 *  Utilidades
 * ------------------------------------------------------------------ */

/*
 * Títulos de quizz e textos de resposta vêm de uma API pública e são digitados
 * por qualquer pessoa: precisam ser escapados antes de entrar em innerHTML.
 */
function escaparHtml(valor) {
    return String(valor === undefined || valor === null ? "" : valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

/* Escapa para dentro de url("...") em CSS inline. */
function escaparUrlCss(url) {
    return String(url).replace(/["'\\)]/g, encodeURIComponent);
}

function gradienteCartao(url) {
    const imagem = escaparUrlCss(urlImagemOuPlaceholder(url, "quizz"));

    return `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url("${imagem}")`;
}

/* Fisher-Yates. O sort(() => Math.random() - 0.5) anterior não embaralha de
 * forma uniforme e depende da implementação de sort do navegador. */
function embaralhar(lista) {
    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function mostrarAviso(mensagem, tipo) {
    const aviso = document.querySelector(".aviso");

    aviso.textContent = mensagem;
    aviso.className = `aviso aviso-${tipo || "info"} aviso-visivel`;
    clearTimeout(mostrarAviso.temporizador);
    mostrarAviso.temporizador = setTimeout(() => aviso.classList.remove("aviso-visivel"), 5000);
}

/*
 * Erros de validação aparecem dentro da própria tela, logo acima do botão.
 * Antes eram alert() seguidos de remontagem da tela, o que apagava tudo o que
 * a pessoa havia digitado.
 */
function mostrarErrosValidacao(container, mensagens) {
    limparErrosValidacao(container);

    const caixa = document.createElement("div");
    caixa.className = "erros-validacao";
    caixa.setAttribute("role", "alert");
    caixa.innerHTML = `
        <strong>Revise os campos abaixo:</strong>
        <ul>${mensagens.map((mensagem) => `<li>${escaparHtml(mensagem)}</li>`).join("")}</ul>
    `;

    /* ":scope >" é essencial: os campos de imagem também têm <button>, e um
     * deles não é filho direto da tela. */
    const botaoDeAcao = container.querySelector(":scope > button");

    if (botaoDeAcao) {
        container.insertBefore(caixa, botaoDeAcao);
    } else {
        container.appendChild(caixa);
    }
    caixa.scrollIntoView({ behavior: "smooth", block: "center" });
}

function limparErrosValidacao(container) {
    const caixaAntiga = container.querySelector(".erros-validacao");

    if (caixaAntiga) {
        caixaAntiga.remove();
    }
}

/* Registra o fallback de imagem quebrada em todas as <img> de um container. */
function registrarFallbackImagens(container, tipo) {
    container.querySelectorAll("img[data-fallback]").forEach((imagem) => {
        imagem.addEventListener("error", () => aplicarFallbackImagem(imagem, imagem.dataset.fallback || tipo));

        /* Cobre o caso da imagem já ter falhado antes do listener entrar. */
        if (imagem.complete && imagem.naturalWidth === 0) {
            aplicarFallbackImagem(imagem, imagem.dataset.fallback || tipo);
        }
    });
}

/* Preenche um campo de URL com uma sugestão do Pixabay. */
function preencherComSugestao(botao) {
    const campo = botao.parentElement.querySelector("input[type='url']");

    campo.value = sugerirImagem(botao.dataset.tema);
    campo.dispatchEvent(new Event("input"));
    campo.focus();
}


/* ------------------------------------------------------------------ *
 *  Persistência dos quizzes criados pela pessoa
 * ------------------------------------------------------------------ */

/*
 * Os quizzes ficam sob uma única chave. A versão anterior gravava um item por
 * id na raiz do localStorage e depois lia *todas* as chaves da origem, então
 * qualquer outro dado salvo no mesmo domínio virava um quizz corrompido.
 */
function lerMeusQuizzes() {
    try {
        const salvos = JSON.parse(localStorage.getItem(CHAVE_MEUS_QUIZZES));

        return Array.isArray(salvos) ? salvos.filter((quizzSalvo) => quizzSalvo && quizzSalvo.id) : [];
    } catch (erro) {
        return [];
    }
}

function guardaMeusQuizzesLocalmente(quizzCriado) {
    const salvos = lerMeusQuizzes().filter((quizzSalvo) => String(quizzSalvo.id) !== String(quizzCriado.id));

    salvos.push({ id: quizzCriado.id, title: quizzCriado.title, image: quizzCriado.image, key: quizzCriado.key });
    localStorage.setItem(CHAVE_MEUS_QUIZZES, JSON.stringify(salvos));
    listaMeusQuizzes = salvos;
}

/* Recupera os quizzes gravados pelo formato antigo (um item por id na raiz). */
function migrarQuizzesAntigos() {
    if (localStorage.getItem(CHAVE_MEUS_QUIZZES) !== null) {
        return;
    }

    const recuperados = [];

    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);

        if (!/^\d+$/.test(chave)) {
            continue;
        }
        try {
            const antigo = JSON.parse(localStorage.getItem(chave));

            if (antigo && antigo.id && antigo.title) {
                recuperados.push({ id: antigo.id, title: antigo.title, image: antigo.image, key: antigo.key });
            }
        } catch (erro) {
            /* Chave não é um quizz: ignora. */
        }
    }

    if (recuperados.length > 0) {
        localStorage.setItem(CHAVE_MEUS_QUIZZES, JSON.stringify(recuperados));
        recuperados.forEach((quizzAntigo) => localStorage.removeItem(String(quizzAntigo.id)));
    }
}


/* ------------------------------------------------------------------ *
 *  Home: lista de quizzes
 * ------------------------------------------------------------------ */

function getAllQuizz() {
    migrarQuizzesAntigos();
    listaMeusQuizzes = lerMeusQuizzes();
    atualizarSecaoMeusQuizzes();

    const promise = axios.get(URL_API);
    promise.then(pegouQuizz);
    promise.catch(erroPegouQuizz);
}

/*
 * "Seus Quizzes" e a mensagem de primeiro acesso são mutuamente exclusivos.
 * Antes as duas seções ficavam visíveis ao mesmo tempo.
 */
function atualizarSecaoMeusQuizzes() {
    const temQuizzes = listaMeusQuizzes.length > 0;

    document.querySelector(".paginaum .criarprimeiroquizz").style.display = temQuizzes ? "none" : "flex";
    document.querySelector(".paginaum .meus-quizzes").style.display = temQuizzes ? "flex" : "none";
    document.querySelector(".paginaum .todososquizzes").style.display = "flex";

    if (temQuizzes) {
        pegaMeusQuizzes();
    }
}

/* Monta os cartões de uma lista dentro do container informado. */
function montarCartoesQuizz(container, quizzes) {
    container.innerHTML = "";

    quizzes.forEach((quizzDaLista) => {
        const cartao = document.createElement("article");

        cartao.className = "cartao-quizz";
        cartao.tabIndex = 0;
        cartao.setAttribute("role", "button");
        cartao.setAttribute("aria-label", `Abrir o quizz ${quizzDaLista.title}`);
        cartao.dataset.quizzId = quizzDaLista.id;
        cartao.innerHTML = `<h3>${escaparHtml(quizzDaLista.title)}</h3>`;
        cartao.style.backgroundImage = gradienteCartao(quizzDaLista.image);
        container.appendChild(cartao);
    });
}

function pegouQuizz(resposta) {
    const quizzes = Array.isArray(resposta.data) ? resposta.data : [];

    montarCartoesQuizz(document.querySelector(".todososquizzes .quizzes"), quizzes);
}

function pegaMeusQuizzes() {
    montarCartoesQuizz(document.querySelector(".quizzes-criados"), listaMeusQuizzes);
}

function erroPegouQuizz(error) {
    console.error("Falha ao buscar quizzes na API:", error);
    mostrarAviso("Não foi possível falar com o servidor. Mostrando um quizz de demonstração.", "erro");
    montarCartoesQuizz(document.querySelector(".todososquizzes .quizzes"), [QUIZZ_DEMONSTRACAO]);
}

function getQuizz(identificador) {
    if (String(identificador) === QUIZZ_DEMONSTRACAO.id) {
        abrirQuizz({ data: QUIZZ_DEMONSTRACAO });
        return;
    }

    idQuizzEscolhido = identificador;
    const promise = axios.get(`${URL_API}/${identificador}`);
    promise.then(abrirQuizz);
    promise.catch(erroAbrirQuizz);
}

function erroAbrirQuizz(error) {
    console.error("Falha ao abrir o quizz:", error);
    mostrarAviso("Não foi possível abrir esse quizz agora. Tente novamente em instantes.", "erro");
}


/* ------------------------------------------------------------------ *
 *  Jogando o quizz
 * ------------------------------------------------------------------ */

function abrirQuizz(respostaquizz) {
    quizzEscolhido = respostaquizz.data;
    if (quizzEscolhido.id !== undefined) {
        idQuizzEscolhido = quizzEscolhido.id;
    }
    reiniciarContadores();

    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".cria-quizz").style.display = "none";
    document.querySelector(".fim").innerHTML = "";

    const pagina = document.querySelector(".pagina-quizz");
    pagina.style.display = "block";
    pagina.innerHTML = `
        <section class="titulo-quizz">
            <h2><span>${escaparHtml(quizzEscolhido.title)}</span></h2>
        </section>
        <section class="perguntas"></section>
    `;
    pagina.querySelector(".titulo-quizz").style.backgroundImage =
        `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url("${escaparUrlCss(urlImagemOuPlaceholder(quizzEscolhido.image, "quizz"))}")`;

    const perguntas = pagina.querySelector(".perguntas");

    perguntas.innerHTML = quizzEscolhido.questions.map((pergunta, indicePergunta) => {
        /* Embaralha uma cópia: a lista original da API não é alterada. */
        pergunta.answers = embaralhar(pergunta.answers);

        const respostas = pergunta.answers.map((resposta, indiceResposta) => `
            <div data-identifier="answer" class="resposta resposta-${indicePergunta}-${indiceResposta}"
                 data-correct="${resposta.isCorrectAnswer === true}"
                 data-pergunta="${indicePergunta}" data-resposta="${indiceResposta}"
                 role="button" tabindex="0" aria-label="${escaparHtml(resposta.text)}">
                <img src="${escaparHtml(urlImagemOuPlaceholder(resposta.image, "resposta"))}"
                     alt="${escaparHtml(resposta.text)}" data-fallback="resposta" loading="lazy">
                <h4>${escaparHtml(resposta.text)}</h4>
            </div>
        `).join("");

        return `
            <article data-identifier="question" class="pergunta pergunta-${indicePergunta}">
                <div class="titulo-pergunta" style="background-color: ${escaparHtml(pergunta.color)}">
                    <h3>${escaparHtml(pergunta.title)}</h3>
                </div>
                <div class="bloco-respostas">${respostas}</div>
            </article>
        `;
    }).join("");

    registrarFallbackImagens(perguntas, "resposta");
    window.scrollTo(0, 0);
}

function reiniciarContadores() {
    perguntasRespondidas = new Set();
    acertos = 0;
    resultadoJaExibido = false;
}

function quizzSelecionado(numerodaquestao, opcao) {
    /* Trava a pergunta inteira: sem isso dava para pontuar duas vezes usando o
     * teclado enquanto a animação da resposta anterior rodava. */
    if (perguntasRespondidas.has(numerodaquestao)) {
        return;
    }
    perguntasRespondidas.add(numerodaquestao);

    const respostasDaPergunta = document.querySelectorAll(`.pergunta-${numerodaquestao} .resposta`);
    const escolha = document.querySelector(`.resposta-${numerodaquestao}-${opcao}`);

    escolha.classList.add("escolhida");

    respostasDaPergunta.forEach((umaopcao) => {
        umaopcao.classList.add("respondida");
        umaopcao.removeAttribute("tabindex");
        umaopcao.setAttribute("aria-disabled", "true");

        if (umaopcao !== escolha) {
            umaopcao.classList.add("nop");
        }
        umaopcao.classList.add(umaopcao.dataset.correct === "true" ? "acertou" : "errou");
    });

    if (escolha.dataset.correct === "true") {
        acertos += 1;
    }

    /* O avanço ficava dentro do laço das respostas usando o índice da resposta
     * como se fosse o da pergunta: rolava para outra resposta da mesma pergunta
     * e disparava o resultado várias vezes (ou antes da hora). */
    setTimeout(avancarDepoisDaResposta, ESPERA_PROXIMA_PERGUNTA);
}

function avancarDepoisDaResposta() {
    if (perguntasRespondidas.size === quizzEscolhido.questions.length) {
        resultadoQuizz();
        return;
    }

    for (let indice = 0; indice < quizzEscolhido.questions.length; indice++) {
        if (!perguntasRespondidas.has(indice)) {
            document.querySelector(`.pergunta-${indice}`).scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }
    }
}

/*
 * Percentual de acerto e nível alcançado.
 *
 * A versão anterior calculava o percentual dividindo pela soma dos minValue dos
 * níveis (NaN quando todos eram 0%) e escolhia o nível com a comparação
 * invertida — 25% num quizz de níveis 0/50/80 caía em "50%". O nível correto é
 * o de maior minValue que ainda seja menor ou igual ao percentual.
 */
function calcularResultado() {
    const totalPerguntas = quizzEscolhido.questions.length;
    const percentual = totalPerguntas === 0 ? 0 : Math.round((acertos * 100) / totalPerguntas);

    const niveisOrdenados = [...quizzEscolhido.levels]
        .map((nivel) => ({ ...nivel, minValue: Number(nivel.minValue) || 0 }))
        .sort((a, b) => a.minValue - b.minValue);

    let nivelAlcancado = niveisOrdenados[0];

    niveisOrdenados.forEach((nivel) => {
        if (percentual >= nivel.minValue) {
            nivelAlcancado = nivel;
        }
    });

    return { percentual, nivel: nivelAlcancado };
}

function resultadoQuizz() {
    if (resultadoJaExibido) {
        return;
    }
    resultadoJaExibido = true;

    const { percentual, nivel } = calcularResultado();
    const fim = document.querySelector(".fim");

    fim.innerHTML = `
        <article class="resultado" data-identifier="quizz-result">
            <div class="titulo-resultado">
                <h3>${percentual}% ${escaparHtml(nivel.title)}</h3>
            </div>
            <div class="conteudo-reultado">
                <img src="${escaparHtml(urlImagemOuPlaceholder(nivel.image, "nivel"))}"
                     alt="Imagem do nível ${escaparHtml(nivel.title)}" data-fallback="nivel">
                <span>${escaparHtml(nivel.text)}</span>
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

    registrarFallbackImagens(fim, "nivel");
    fim.querySelector(".resultado").scrollIntoView({ behavior: "smooth", block: "start" });
}

/*
 * Reinicia a partida sem recarregar a página. Antes os contadores globais não
 * eram zerados, então a segunda tentativa começava com a pontuação da primeira.
 */
function reiniciarQuizz() {
    document.querySelector(".fim").innerHTML = "";
    reiniciarContadores();

    if (quizzEscolhido && String(idQuizzEscolhido) === QUIZZ_DEMONSTRACAO.id) {
        abrirQuizz({ data: QUIZZ_DEMONSTRACAO });
        return;
    }
    getQuizz(idQuizzEscolhido);
}

function paginaInicial() {
    document.querySelector(".pagina-quizz").style.display = "none";
    document.querySelector(".pagina-quizz").innerHTML = "";
    document.querySelector(".fim").innerHTML = "";
    document.querySelector(".cria-quizz").style.display = "none";
    document.querySelector(".paginaum").style.display = "flex";

    quizzEscolhido = null;
    idQuizzEscolhido = null;
    reiniciarContadores();
    atualizarSecaoMeusQuizzes();
    window.scrollTo(0, 0);
}


/* ------------------------------------------------------------------ *
 *  Criação: tela 1 (dados básicos)
 * ------------------------------------------------------------------ */

function chamarTelaCriarQuizz() {
    quizz = { title: "", image: "", questions: [], levels: [] };

    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "none";
    document.querySelector(".cria-quizz").style.display = "flex";
    document.querySelector(".cria-quizz .cria-perguntas").style.display = "none";
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    document.querySelector(".cria-quizz .sucesso-quizz").style.display = "none";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "flex";
    window.scrollTo(0, 0);
}

function validarDadosBasicos() {
    const tela = document.querySelector(".cria-quizz .vamos-comecar");
    const tituloQuizz = tela.querySelector(".titulo-quizz").value.trim();
    const imagemQuizz = tela.querySelector(".url-quizz").value.trim();
    const perguntas = parseInt(tela.querySelector(".numero-perguntas").value, 10);
    const niveis = parseInt(tela.querySelector(".quantidade-niveis").value, 10);
    const erros = [];

    /* Antes cada regra abria seu próprio alert(), um depois do outro. */
    if (tituloQuizz.length < MIN_CARACTERES_TITULO_QUIZZ || tituloQuizz.length > MAX_CARACTERES_TITULO_QUIZZ) {
        erros.push(`O título do quizz deve ter entre ${MIN_CARACTERES_TITULO_QUIZZ} e ${MAX_CARACTERES_TITULO_QUIZZ} caracteres.`);
    }
    if (!validarURL(imagemQuizz)) {
        erros.push("A imagem do quizz deve ser uma URL válida.");
    }
    if (!Number.isInteger(perguntas) || perguntas < MIN_PERGUNTAS) {
        erros.push(`A quantidade de perguntas deve ser no mínimo ${MIN_PERGUNTAS}.`);
    }
    if (!Number.isInteger(niveis) || niveis < MIN_NIVEIS) {
        erros.push(`A quantidade de níveis deve ser no mínimo ${MIN_NIVEIS}.`);
    }

    if (erros.length > 0) {
        mostrarErrosValidacao(tela, erros);
        return;
    }

    limparErrosValidacao(tela);
    quizz.title = tituloQuizz;
    quizz.image = imagemQuizz;
    qtdadePerguntas = perguntas;
    qtdadeNiveis = niveis;
    chamarTelaCriarPerguntas();
}


/* ------------------------------------------------------------------ *
 *  Criação: tela 2 (perguntas)
 * ------------------------------------------------------------------ */

function chamarTelaCriarPerguntas() {
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "none";
    montarTelaCriarPerguntas(document.querySelector(".cria-quizz .cria-perguntas"));
    window.scrollTo(0, 0);
}

function campoUrlComSugestao(classe, placeholder, tema) {
    return `
        <div class="campo-url">
            <input class="${classe}" type="url" placeholder="${placeholder}" />
            <button type="button" class="sugerir-imagem" data-tema="${tema}"
                    title="Sugerir uma imagem gratuita do Pixabay"
                    onclick="preencherComSugestao(this)">Sugerir imagem</button>
        </div>
    `;
}

function corpoDaPergunta(numero) {
    return `
        <div class="cabecalho-pergunta">
            <input class="texto-pergunta" type="text" placeholder="Texto da pergunta" minlength="${MIN_CARACTERES_PERGUNTA}" />
            <label class="rotulo-cor">Cor de fundo da pergunta
                <input class="cor-pergunta" type="color" value="#434CA0" />
            </label>
        </div>
        <h2>Resposta correta</h2>
        <div class="resposta-correta">
            <input class="texto-resposta" type="text" placeholder="Resposta correta" required="required" />
            ${campoUrlComSugestao("url-resposta", "URL da imagem", "")}
        </div>
        <h2>Respostas incorretas</h2>
        <div class="resposta">
            <input class="texto-resposta" type="text" placeholder="Resposta incorreta 1" required="required" />
            ${campoUrlComSugestao("url-resposta", "URL da imagem 1", "")}
        </div>
        <div class="resposta">
            <input class="texto-resposta" type="text" placeholder="Resposta incorreta 2 (opcional)" />
            ${campoUrlComSugestao("url-resposta", "URL da imagem 2", "")}
        </div>
        <div class="resposta">
            <input class="texto-resposta" type="text" placeholder="Resposta incorreta 3 (opcional)" />
            ${campoUrlComSugestao("url-resposta", "URL da imagem 3", "")}
        </div>
    `;
}

function montarTelaCriarPerguntas(telaCriarPerguntas) {
    let html = `
        <h1>Crie suas perguntas</h1>
        <div class="pergunta" data-identifier="question">
            <h2>Pergunta 1</h2>
            ${corpoDaPergunta(1)}
        </div>
    `;

    for (let numero = 2; numero <= qtdadePerguntas; numero++) {
        html += `
            <div class="nova-pergunta" data-identifier="expand">
                <h2>Pergunta ${numero}</h2>
                <img class="botaoEditar" src="img/editar.png" alt="Abrir a pergunta ${numero}"
                     role="button" tabindex="0" onclick="abrirNovaPergunta(this)">
            </div>
        `;
    }

    html += `
        <button class="prosseguir" onclick="validarTodasPerguntas()">
            <p>Prosseguir pra criar níveis</p>
        </button>
    `;

    telaCriarPerguntas.innerHTML = html;
    telaCriarPerguntas.style.display = "flex";
}

function abrirNovaPergunta(elemento) {
    const novapergunta = elemento.parentNode;
    const titulo = novapergunta.querySelector("h2").outerHTML;

    novapergunta.classList.add("pergunta");
    novapergunta.classList.remove("nova-pergunta");
    novapergunta.innerHTML = titulo + corpoDaPergunta();
    novapergunta.querySelector(".texto-pergunta").focus();
}

function validarTodasPerguntas() {
    const tela = document.querySelector(".cria-quizz .cria-perguntas");
    const divsPerguntas = tela.querySelectorAll(".pergunta");
    const erros = [];

    if (divsPerguntas.length < qtdadePerguntas) {
        erros.push(`Abra e preencha todas as ${qtdadePerguntas} perguntas do quizz.`);
    }

    divsPerguntas.forEach((divPergunta, indice) => {
        validarDadosPergunta(divPergunta, indice + 1).forEach((erro) => erros.push(erro));
    });

    if (erros.length > 0) {
        /* Só mostra a lista de erros: remontar a tela apagava tudo o que já
         * havia sido digitado. */
        mostrarErrosValidacao(tela, erros);
        return;
    }

    limparErrosValidacao(tela);
    quizz.questions = [...divsPerguntas].map(montarNovaPergunta);
    chamarTelaCriarNiveis();
}

function montarNovaResposta(elementoResposta) {
    /* Um objeto novo por resposta. A versão anterior devolvia sempre a mesma
     * variável global `answer`, então todas as respostas do quizz terminavam
     * iguais à última preenchida. */
    return {
        text: elementoResposta.querySelector(".texto-resposta").value.trim(),
        image: elementoResposta.querySelector(".url-resposta").value.trim(),
        isCorrectAnswer: elementoResposta.classList.contains("resposta-correta")
    };
}

function montarNovaPergunta(elementoPergunta) {
    const respostas = [montarNovaResposta(elementoPergunta.querySelector(".resposta-correta"))];

    elementoPergunta.querySelectorAll(".resposta").forEach((elementoResposta) => {
        if (elementoResposta.querySelector(".texto-resposta").value.trim() !== "") {
            respostas.push(montarNovaResposta(elementoResposta));
        }
    });

    return {
        title: elementoPergunta.querySelector(".texto-pergunta").value.trim(),
        color: elementoPergunta.querySelector(".cor-pergunta").value,
        answers: respostas
    };
}

/* Devolve a lista de erros da pergunta (vazia quando está tudo certo). */
function validarDadosPergunta(elemento, numero) {
    const erros = [];
    const textoPergunta = elemento.querySelector(".texto-pergunta").value.trim();
    const respostaCorreta = elemento.querySelector(".resposta-correta .texto-resposta").value.trim();
    const urlRespostaCorreta = elemento.querySelector(".resposta-correta .url-resposta").value.trim();

    if (textoPergunta.length < MIN_CARACTERES_PERGUNTA) {
        erros.push(`Pergunta ${numero}: o texto deve ter no mínimo ${MIN_CARACTERES_PERGUNTA} caracteres.`);
    }
    if (respostaCorreta === "") {
        erros.push(`Pergunta ${numero}: a resposta correta é obrigatória.`);
    }
    if (!validarURL(urlRespostaCorreta)) {
        erros.push(`Pergunta ${numero}: a imagem da resposta correta deve ser uma URL válida.`);
    }

    let incorretasPreenchidas = 0;

    elemento.querySelectorAll(".resposta").forEach((elementoResposta, indice) => {
        const texto = elementoResposta.querySelector(".texto-resposta").value.trim();
        const url = elementoResposta.querySelector(".url-resposta").value.trim();

        if (texto === "" && url === "") {
            return;
        }
        incorretasPreenchidas++;

        if (texto === "") {
            erros.push(`Pergunta ${numero}: falta o texto da resposta incorreta ${indice + 1}.`);
        }
        if (!validarURL(url)) {
            erros.push(`Pergunta ${numero}: a imagem da resposta incorreta ${indice + 1} deve ser uma URL válida.`);
        }
    });

    if (incorretasPreenchidas === 0) {
        erros.push(`Pergunta ${numero}: é preciso pelo menos 1 resposta incorreta.`);
    }

    return erros;
}


/* ------------------------------------------------------------------ *
 *  Criação: tela 3 (níveis)
 * ------------------------------------------------------------------ */

function chamarTelaCriarNiveis() {
    document.querySelector(".cria-quizz .cria-perguntas").style.display = "none";
    montarTelaCriarNiveis(document.querySelector(".cria-quizz .cria-niveis"));
    window.scrollTo(0, 0);
}

function corpoDoNivel() {
    return `
        <input class="titulo-nivel" type="text" placeholder="Título do nível" minlength="${MIN_CARACTERES_TITULO_NIVEL}" />
        <input class="percentual-nivel" type="number" placeholder="% de acerto mínima" min="0" max="100" />
        ${campoUrlComSugestao("url-nivel", "URL da imagem do nível", "diversao")}
        <textarea class="descricao-nivel" placeholder="Descrição do nível" minlength="${MIN_CARACTERES_DESCRICAO_NIVEL}"></textarea>
    `;
}

function montarTelaCriarNiveis(telaCriarNiveis) {
    let html = `
        <h1>Agora, decida os níveis!</h1>
        <p class="dica-niveis">Pelo menos um nível precisa ter 0% de acerto mínima.</p>
        <div class="nivel" data-identifier="level">
            <h2>Nível 1</h2>
            ${corpoDoNivel()}
        </div>
    `;

    for (let numero = 2; numero <= qtdadeNiveis; numero++) {
        html += `
            <div class="novo-nivel" data-identifier="expand">
                <h2>Nível ${numero}</h2>
                <img class="botaoEditar" src="img/editar.png" alt="Abrir o nível ${numero}"
                     role="button" tabindex="0" onclick="abrirNovoNivel(this)">
            </div>
        `;
    }

    html += `
        <button class="finaliza-quizz" onclick="validarTodosNiveis()">
            <p>Finalizar Quizz</p>
        </button>
    `;

    telaCriarNiveis.innerHTML = html;
    telaCriarNiveis.style.display = "flex";
}

function abrirNovoNivel(elemento) {
    const novoNivel = elemento.parentNode;
    const titulo = novoNivel.querySelector("h2").outerHTML;

    novoNivel.classList.add("nivel");
    novoNivel.classList.remove("novo-nivel");
    novoNivel.innerHTML = titulo + corpoDoNivel();
    novoNivel.querySelector(".titulo-nivel").focus();
}

function validarTodosNiveis() {
    const tela = document.querySelector(".cria-quizz .cria-niveis");
    const divsNiveis = tela.querySelectorAll(".nivel");
    const erros = [];

    if (divsNiveis.length < qtdadeNiveis) {
        erros.push(`Abra e preencha todos os ${qtdadeNiveis} níveis do quizz.`);
    }

    /* validarDadosNivel ignorava o argumento e relia sempre o primeiro nível do
     * documento, então os níveis 2 em diante nunca eram validados. */
    divsNiveis.forEach((divNivel, indice) => {
        validarDadosNivel(divNivel, indice + 1).forEach((erro) => erros.push(erro));
    });

    const temNivelZero = [...divsNiveis].some((divNivel) => parseInt(divNivel.querySelector(".percentual-nivel").value, 10) === 0);

    if (!temNivelZero) {
        erros.push("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%.");
    }

    if (erros.length > 0) {
        /* Antes um nível inválido chamava document.location.reload(true) e
         * jogava fora todo o quizz em construção. */
        mostrarErrosValidacao(tela, erros);
        return;
    }

    limparErrosValidacao(tela);
    quizz.levels = [...divsNiveis].map(montarNovoNivel);
    sendQuizz(quizz);
}

function montarNovoNivel(elementoNivel) {
    /* Objeto novo por nível (mesmo problema de aliasing das respostas) e
     * minValue como número: a API recebia string. */
    return {
        title: elementoNivel.querySelector(".titulo-nivel").value.trim(),
        image: elementoNivel.querySelector(".url-nivel").value.trim(),
        text: elementoNivel.querySelector(".descricao-nivel").value.trim(),
        minValue: parseInt(elementoNivel.querySelector(".percentual-nivel").value, 10)
    };
}

/* Devolve a lista de erros do nível (vazia quando está tudo certo). */
function validarDadosNivel(elemento, numero) {
    const erros = [];
    const tituloNivel = elemento.querySelector(".titulo-nivel").value.trim();
    const percentualNivel = parseInt(elemento.querySelector(".percentual-nivel").value, 10);
    const urlNivel = elemento.querySelector(".url-nivel").value.trim();
    const descricaoNivel = elemento.querySelector(".descricao-nivel").value.trim();

    if (tituloNivel.length < MIN_CARACTERES_TITULO_NIVEL) {
        erros.push(`Nível ${numero}: o título deve ter no mínimo ${MIN_CARACTERES_TITULO_NIVEL} caracteres.`);
    }
    if (!Number.isInteger(percentualNivel) || percentualNivel < 0 || percentualNivel > 100) {
        erros.push(`Nível ${numero}: a % de acerto mínima deve ser um número entre 0 e 100.`);
    }
    if (!validarURL(urlNivel)) {
        erros.push(`Nível ${numero}: a imagem deve ser uma URL válida.`);
    }
    if (descricaoNivel.length < MIN_CARACTERES_DESCRICAO_NIVEL) {
        erros.push(`Nível ${numero}: a descrição deve ter no mínimo ${MIN_CARACTERES_DESCRICAO_NIVEL} caracteres.`);
    }

    return erros;
}


/* ------------------------------------------------------------------ *
 *  Criação: tela 4 (sucesso) e envio
 * ------------------------------------------------------------------ */

function sendQuizz(quizzPronto) {
    const botao = document.querySelector(".cria-niveis .finaliza-quizz");

    botao.disabled = true;
    botao.querySelector("p").textContent = "Enviando...";

    const promise = axios.post(URL_API, quizzPronto);
    promise.then(mandouQuizz);
    promise.catch((error) => falhouEnvio(error, botao));
}

function mandouQuizz(response) {
    quizzRecemCriado = response.data;
    guardaMeusQuizzesLocalmente(quizzRecemCriado);
    mostrarAviso("Seu quizz foi publicado com sucesso!", "sucesso");
    chamarTelaSucessoCriacaoQuizz();
}

function falhouEnvio(error, botao) {
    console.error("Falha ao enviar o quizz:", error);
    botao.disabled = false;
    botao.querySelector("p").textContent = "Finalizar Quizz";
    mostrarErrosValidacao(document.querySelector(".cria-quizz .cria-niveis"), [
        "Não foi possível enviar seu quizz ao servidor. Verifique sua conexão e tente de novo."
    ]);
}

function chamarTelaSucessoCriacaoQuizz() {
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    montarTelaSucessoCriacaoQuizz(document.querySelector(".cria-quizz .sucesso-quizz"));
    window.scrollTo(0, 0);
}

function montarTelaSucessoCriacaoQuizz(telaSucessoCriacaoQuizz) {
    telaSucessoCriacaoQuizz.innerHTML = `
        <h1>Seu quizz está pronto!</h1>
        <figure class="fim-criacao-quizz">
            <figcaption>${escaparHtml(quizz.title)}</figcaption>
        </figure>
        <button class="acessar-quizz" onclick="acessarQuizzCriado()">
            <p>Acessar Quizz</p>
        </button>
        <button class="voltar-inicio" onclick="paginaInicial()">
            <p>Voltar pra home</p>
        </button>
    `;

    /* Duas correções: (1) a imagem era sobrescrita por uma URL do Pixabay
     * truncada com "…", que ia junto para a API; (2) o background era escrito
     * em elemento.background em vez de elemento.style.background, então a
     * figura ficava sempre vazia. */
    telaSucessoCriacaoQuizz.querySelector("figure").style.background =
        `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("${escaparUrlCss(urlImagemOuPlaceholder(quizz.image, "quizz"))}")`;
    telaSucessoCriacaoQuizz.querySelector("figure").style.backgroundSize = "cover";
    telaSucessoCriacaoQuizz.querySelector("figure").style.backgroundPosition = "center";
    telaSucessoCriacaoQuizz.style.display = "flex";
}

function acessarQuizzCriado() {
    if (!quizzRecemCriado) {
        return;
    }
    document.querySelector(".cria-quizz").style.display = "none";
    getQuizz(quizzRecemCriado.id);
}


/* ------------------------------------------------------------------ *
 *  Validação de URL
 * ------------------------------------------------------------------ */

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


/* ------------------------------------------------------------------ *
 *  Eventos globais
 * ------------------------------------------------------------------ */

/*
 * Delegação de eventos no lugar dos onclick="getQuizz(id)" gerados por string:
 * o id não precisa mais ser interpolado dentro de HTML e os cartões passam a
 * responder ao teclado.
 */
document.addEventListener("click", (evento) => {
    const cartao = evento.target.closest(".cartao-quizz");

    if (cartao) {
        getQuizz(cartao.dataset.quizzId);
        return;
    }

    const resposta = evento.target.closest(".resposta[data-pergunta]");

    if (resposta && !resposta.classList.contains("respondida")) {
        quizzSelecionado(Number(resposta.dataset.pergunta), Number(resposta.dataset.resposta));
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key !== "Enter" && evento.key !== " ") {
        return;
    }

    const alvo = evento.target.closest(".cartao-quizz, .resposta[data-pergunta], .botaoEditar");

    if (!alvo) {
        return;
    }
    evento.preventDefault();
    alvo.click();
});

getAllQuizz();
