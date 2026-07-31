/* ==========================================================================
   BuzzQuizz - logica principal
   ==========================================================================
   Organizacao do arquivo:
     1. Constantes e estado da aplicacao
     2. Utilitarios (HTML seguro, imagens, avisos, carregando)
     3. Persistencia local dos "meus quizzes"
     4. Comunicacao com a API
     5. Tela inicial (listagem de quizzes)
     6. Responder um quizz
     7. Resultado do quizz
     8. Criacao de um novo quizz
     9. Validacoes
    10. Inicializacao
   ========================================================================== */


/* ------------------------------------------------------------------ *
 * 1. Constantes e estado da aplicacao                                *
 * ------------------------------------------------------------------ */

const API_URL = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
const IMAGEM_PADRAO = "img/quizzes/placeholder.jpg";
const CHAVE_STORAGE = "buzzquizz:meus-quizzes";

const MIN_PERGUNTAS = 3;
const MIN_NIVEIS = 2;
const MIN_CARACTERES_TITULO_QUIZZ = 20;
const MAX_CARACTERES_TITULO_QUIZZ = 65;
const MIN_CARACTERES_TITULO_PERGUNTA = 20;
const MIN_CARACTERES_TITULO_NIVEL = 10;
const MIN_CARACTERES_DESCRICAO_NIVEL = 30;
const TEMPO_ATE_PROXIMA_PERGUNTA = 2000;

// Listagens
let quizzesDoServidor = [];
let listaMeusQuizzes = [];
let usandoQuizzesDemo = false;

// Quizz em andamento
let quizzEmAndamento = null;
let perguntasRespondidas = 0;
let acertos = 0;
let percentualDeAcerto = 0;
let nivelAlcancado = null;

// Criacao de quizz
let qtdadePerguntas = 0;
let qtdadeNiveis = 0;
let quizzEmCriacao = null;
let quizzRecemCriado = null;


/* ------------------------------------------------------------------ *
 * 2. Utilitarios                                                     *
 * ------------------------------------------------------------------ */

/**
 * Escapa texto antes de injetar em innerHTML. Os quizzes vem de uma API
 * publica e podem conter caracteres que quebrariam o HTML da pagina.
 */
function escaparHTML(texto) {
    return String(texto === undefined || texto === null ? "" : texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

/** Devolve a URL da imagem ou a imagem padrao quando ela nao existe. */
function urlDaImagem(url) {
    const urlLimpa = typeof url === "string" ? url.trim() : "";
    return urlLimpa === "" ? IMAGEM_PADRAO : urlLimpa;
}

/**
 * Chamada pelo atributo onerror das imagens: substitui imagens quebradas
 * (muito comuns nos quizzes publicos) pela imagem padrao do projeto.
 */
function usarImagemPadrao(elemento) {
    elemento.onerror = null;
    elemento.src = IMAGEM_PADRAO;
    elemento.classList.add("imagem-padrao");
}

/** Aplica uma imagem de fundo com o degrade padrao dos cards. */
function aplicarImagemDeFundo(elemento, url, degrade) {
    const imagem = new Image();
    imagem.onload = () => {
        elemento.style.backgroundImage = `${degrade}, url("${url}")`;
    };
    imagem.onerror = () => {
        elemento.style.backgroundImage = `${degrade}, url("${IMAGEM_PADRAO}")`;
    };
    elemento.style.backgroundImage = `${degrade}, url("${IMAGEM_PADRAO}")`;
    imagem.src = url;
}

const DEGRADE_CARD = "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%)";
const DEGRADE_CAPA = "linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57))";

/**
 * Mostra um aviso na tela. Substitui os alert() bloqueantes usados na
 * primeira versao do projeto.
 */
function mostrarAviso(mensagem, tipo = "erro") {
    const caixa = document.querySelector("#avisos");
    if (!caixa) {
        return;
    }
    const aviso = document.createElement("div");
    aviso.className = `aviso aviso-${tipo}`;
    aviso.setAttribute("role", tipo === "erro" ? "alert" : "status");
    aviso.innerHTML = `
        <p>${escaparHTML(mensagem)}</p>
        <button type="button" class="fechar-aviso" aria-label="Fechar aviso">&times;</button>
    `;
    aviso.querySelector(".fechar-aviso").addEventListener("click", () => aviso.remove());
    caixa.appendChild(aviso);
    setTimeout(() => aviso.remove(), 6000);
}

function mostrarCarregando(mostrar) {
    const carregando = document.querySelector("#carregando");
    if (carregando) {
        carregando.classList.toggle("escondido", !mostrar);
    }
}

function esconderTodasAsTelas() {
    document.querySelector(".paginaum").style.display = "none";
    document.querySelector(".pagina-quizz").style.display = "none";
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "none";
    document.querySelector(".fim").innerHTML = "";

    // As etapas 2, 3 e 4 da criacao sao remontadas do zero a cada uso,
    // entao sao limpas aqui para nao deixar formularios preenchidos
    // escondidos no DOM depois que o usuario sai do fluxo.
    [".cria-perguntas", ".cria-niveis", ".sucesso-quizz"].forEach((seletor) => {
        const tela = document.querySelector(`.cria-quizz ${seletor}`);
        tela.style.display = "none";
        tela.innerHTML = "";
    });
}

/** Ordena um array aleatoriamente (Fisher-Yates), sem alterar o original. */
function embaralhar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}


/* ------------------------------------------------------------------ *
 * 3. Persistencia local dos "meus quizzes"                           *
 * ------------------------------------------------------------------ */

/**
 * Le a lista de quizzes criados pelo usuario. A versao antiga gravava um
 * item de localStorage por quizz (a chave era o id), o que quebrava se
 * qualquer outra chave existisse no dominio. Agora tudo fica em uma
 * unica chave com namespace, e os dados antigos sao migrados.
 */
function carregarMeusQuizzes() {
    let lista = [];
    try {
        lista = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [];
    } catch (erro) {
        lista = [];
    }
    if (!Array.isArray(lista)) {
        lista = [];
    }
    listaMeusQuizzes = lista.concat(migrarQuizzesAntigos(lista));
    return listaMeusQuizzes;
}

function migrarQuizzesAntigos(listaAtual) {
    const migrados = [];
    const chavesAntigas = [];

    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        if (chave === CHAVE_STORAGE || !/^\d+$/.test(chave)) {
            continue;
        }
        try {
            const quizz = JSON.parse(localStorage.getItem(chave));
            if (quizz && quizz.id !== undefined && !listaAtual.some((q) => String(q.id) === String(quizz.id))) {
                migrados.push(quizz);
            }
            chavesAntigas.push(chave);
        } catch (erro) {
            chavesAntigas.push(chave);
        }
    }

    if (chavesAntigas.length > 0) {
        chavesAntigas.forEach((chave) => localStorage.removeItem(chave));
        salvarMeusQuizzes(listaAtual.concat(migrados));
    }
    return migrados;
}

function salvarMeusQuizzes(lista) {
    listaMeusQuizzes = lista;
    try {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
    } catch (erro) {
        mostrarAviso("Nao foi possivel salvar o quizz no seu navegador.");
    }
}

function guardarMeuQuizzLocalmente(quizz) {
    const lista = carregarMeusQuizzes().filter((q) => String(q.id) !== String(quizz.id));
    lista.unshift({ id: quizz.id, title: quizz.title, image: quizz.image });
    salvarMeusQuizzes(lista);
}

function removerMeuQuizz(id) {
    const quizz = carregarMeusQuizzes().find((q) => String(q.id) === String(id));
    const titulo = quizz ? quizz.title : "este quizz";
    if (!confirm(`Remover "${titulo}" da sua lista de quizzes?`)) {
        return;
    }
    salvarMeusQuizzes(listaMeusQuizzes.filter((q) => String(q.id) !== String(id)));
    renderizarTelaInicial();
    mostrarAviso("Quizz removido da sua lista.", "sucesso");
}


/* ------------------------------------------------------------------ *
 * 4. Comunicacao com a API                                           *
 * ------------------------------------------------------------------ */

function buscarTodosOsQuizzes() {
    mostrarCarregando(true);
    axios
        .get(API_URL)
        .then((resposta) => {
            usandoQuizzesDemo = false;
            quizzesDoServidor = Array.isArray(resposta.data) ? resposta.data : [];
            renderizarTodosOsQuizzes();
        })
        .catch(() => {
            // A API publica pode estar fora do ar: em vez de deixar a pagina
            // vazia, mostramos os quizzes de demonstracao que vem com o projeto.
            usandoQuizzesDemo = true;
            quizzesDoServidor = QUIZZES_DEMO;
            renderizarTodosOsQuizzes();
            mostrarAviso(
                "Nao foi possivel falar com o servidor de quizzes. Mostrando os quizzes de demonstracao.",
                "atencao"
            );
        })
        .finally(() => mostrarCarregando(false));
}

function abrirQuizzPorId(id) {
    const quizzDemo = quizzesDoServidor.find((q) => String(q.id) === String(id) && String(q.id).startsWith("demo-"));
    if (quizzDemo) {
        iniciarQuizz(quizzDemo);
        return;
    }

    mostrarCarregando(true);
    axios
        .get(`${API_URL}/${id}`)
        .then((resposta) => iniciarQuizz(resposta.data))
        .catch(() => mostrarAviso("Nao foi possivel carregar este quizz. Tente novamente."))
        .finally(() => mostrarCarregando(false));
}

function enviarQuizz(quizzPronto) {
    mostrarCarregando(true);
    axios
        .post(API_URL, quizzPronto)
        .then((resposta) => {
            quizzRecemCriado = resposta.data;
            guardarMeuQuizzLocalmente(quizzRecemCriado);
            mostrarTelaSucessoCriacaoQuizz(quizzRecemCriado);
            mostrarAviso(`Seu quizz foi publicado com o id ${quizzRecemCriado.id}.`, "sucesso");
        })
        .catch(() => {
            mostrarAviso("Seu quizz nao pode ser enviado ao servidor. Confira sua conexao e tente de novo.");
            document.querySelector(".cria-quizz .cria-niveis").style.display = "flex";
        })
        .finally(() => mostrarCarregando(false));
}


/* ------------------------------------------------------------------ *
 * 5. Tela inicial (listagem de quizzes)                              *
 * ------------------------------------------------------------------ */

function renderizarTelaInicial() {
    esconderTodasAsTelas();
    document.querySelector(".paginaum").style.display = "flex";

    carregarMeusQuizzes();
    renderizarMeusQuizzes();
    renderizarTodosOsQuizzes();
    window.scrollTo(0, 0);
}

function renderizarMeusQuizzes() {
    const temQuizzes = listaMeusQuizzes.length > 0;

    document.querySelector(".paginaum .criarprimeiroquizz").style.display = temQuizzes ? "none" : "flex";
    document.querySelector(".paginaum .meus-quizzes").style.display = temQuizzes ? "flex" : "none";

    const container = document.querySelector(".paginaum .quizzes-criados");
    container.innerHTML = "";

    listaMeusQuizzes.forEach((quizz) => {
        const card = document.createElement("article");
        card.className = "card-quizz um-quizz-criado";
        card.innerHTML = `
            <button type="button" class="abrir-quizz" aria-label="Abrir o quizz ${escaparHTML(quizz.title)}">
                <h3>${escaparHTML(quizz.title)}</h3>
            </button>
            <button type="button" class="apagar-quizz" title="Remover da minha lista" aria-label="Remover ${escaparHTML(quizz.title)} da minha lista">
                <img src="img/deletar-branco.png" alt="" />
            </button>
        `;
        card.querySelector(".abrir-quizz").addEventListener("click", () => abrirQuizzPorId(quizz.id));
        card.querySelector(".apagar-quizz").addEventListener("click", () => removerMeuQuizz(quizz.id));
        aplicarImagemDeFundo(card, urlDaImagem(quizz.image), DEGRADE_CARD);
        container.appendChild(card);
    });
}

function renderizarTodosOsQuizzes() {
    const busca = document.querySelector("#busca-quizz");
    const termo = busca ? busca.value.trim().toLowerCase() : "";
    const container = document.querySelector(".paginaum .quizzes");
    const visiveis = quizzesDoServidor.filter((quizz) => String(quizz.title || "").toLowerCase().includes(termo));

    document.querySelector(".paginaum .todososquizzes").style.display = "flex";
    const notaDemo = document.querySelector("#nota-demo");
    if (notaDemo) {
        notaDemo.classList.toggle("escondido", !usandoQuizzesDemo);
    }
    container.innerHTML = "";

    if (visiveis.length === 0) {
        container.innerHTML = `<p class="lista-vazia">Nenhum quizz encontrado${termo ? ` para "${escaparHTML(termo)}"` : ""}.</p>`;
        return;
    }

    visiveis.forEach((quizz) => {
        const card = document.createElement("article");
        card.className = "card-quizz";
        card.innerHTML = `
            <button type="button" class="abrir-quizz" aria-label="Abrir o quizz ${escaparHTML(quizz.title)}">
                <h3>${escaparHTML(quizz.title)}</h3>
            </button>
        `;
        card.querySelector(".abrir-quizz").addEventListener("click", () => abrirQuizzPorId(quizz.id));
        aplicarImagemDeFundo(card, urlDaImagem(quizz.image), DEGRADE_CARD);
        container.appendChild(card);
    });
}


/* ------------------------------------------------------------------ *
 * 6. Responder um quizz                                              *
 * ------------------------------------------------------------------ */

function iniciarQuizz(quizz) {
    if (!quizz || !Array.isArray(quizz.questions) || quizz.questions.length === 0) {
        mostrarAviso("Este quizz esta incompleto e nao pode ser jogado.");
        return;
    }

    // Cada partida comeca com o placar zerado. Na versao anterior os
    // contadores eram globais e nunca reiniciados, o que fazia o
    // percentual passar de 100% e o resultado nunca aparecer.
    quizzEmAndamento = {
        ...quizz,
        questions: quizz.questions.map((pergunta) => ({
            ...pergunta,
            answers: embaralhar(pergunta.answers || [])
        }))
    };
    perguntasRespondidas = 0;
    acertos = 0;
    percentualDeAcerto = 0;
    nivelAlcancado = null;

    esconderTodasAsTelas();
    montarTelaQuizz();
    document.querySelector(".pagina-quizz").style.display = "block";
    window.scrollTo(0, 0);
}

function montarTelaQuizz() {
    const pagina = document.querySelector(".pagina-quizz");
    const total = quizzEmAndamento.questions.length;

    pagina.innerHTML = `
        <section class="titulo-quizz">
            <h2><span>${escaparHTML(quizzEmAndamento.title)}</span></h2>
            <p class="progresso-quizz" id="progresso-quizz">0 de ${total} perguntas respondidas</p>
        </section>
        <section class="perguntas"></section>
    `;

    aplicarImagemDeFundo(pagina.querySelector(".titulo-quizz"), urlDaImagem(quizzEmAndamento.image), DEGRADE_CAPA);

    const perguntas = pagina.querySelector(".perguntas");
    quizzEmAndamento.questions.forEach((pergunta, indice) => {
        const artigo = document.createElement("article");
        artigo.className = "pergunta";
        artigo.id = `pergunta-${indice}`;
        artigo.dataset.identifier = "question";
        artigo.innerHTML = `
            <div class="titulo-pergunta" style="background-color: ${escaparHTML(pergunta.color || "#434CA0")}">
                <h3>${escaparHTML(pergunta.title)}</h3>
            </div>
            <div class="bloco-respostas" id="respostas-${indice}"></div>
        `;

        const bloco = artigo.querySelector(".bloco-respostas");
        pergunta.answers.forEach((resposta, indiceResposta) => {
            const botao = document.createElement("button");
            botao.type = "button";
            botao.className = "resposta";
            botao.id = `resposta-${indice}-${indiceResposta}`;
            botao.dataset.identifier = "answer";
            botao.dataset.correta = String(Boolean(resposta.isCorrectAnswer));
            botao.innerHTML = `
                <img src="${escaparHTML(urlDaImagem(resposta.image))}" alt="" onerror="usarImagemPadrao(this)" />
                <span>${escaparHTML(resposta.text)}</span>
            `;
            botao.addEventListener("click", () => responderPergunta(indice, indiceResposta));
            bloco.appendChild(botao);
        });

        perguntas.appendChild(artigo);
    });
}

function responderPergunta(indicePergunta, indiceResposta) {
    const artigo = document.querySelector(`#pergunta-${indicePergunta}`);
    if (!artigo || artigo.classList.contains("respondida")) {
        return;
    }
    artigo.classList.add("respondida");

    const escolhida = document.querySelector(`#resposta-${indicePergunta}-${indiceResposta}`);
    const opcoes = artigo.querySelectorAll(".resposta");

    opcoes.forEach((opcao) => {
        opcao.disabled = true;
        const correta = opcao.dataset.correta === "true";
        opcao.classList.add(correta ? "acertou" : "errou");
        if (opcao !== escolhida) {
            opcao.classList.add("nop");
        }
    });

    escolhida.classList.add("escolhida");
    if (escolhida.dataset.correta === "true") {
        acertos++;
    }
    perguntasRespondidas++;
    atualizarProgresso();

    setTimeout(() => {
        if (perguntasRespondidas === quizzEmAndamento.questions.length) {
            mostrarResultado();
        } else {
            irParaProximaPerguntaSemResposta(indicePergunta);
        }
    }, TEMPO_ATE_PROXIMA_PERGUNTA);
}

function atualizarProgresso() {
    const progresso = document.querySelector("#progresso-quizz");
    if (progresso) {
        const total = quizzEmAndamento.questions.length;
        progresso.textContent = `${perguntasRespondidas} de ${total} perguntas respondidas`;
    }
}

/**
 * Vai para a proxima pergunta ainda sem resposta. A versao anterior
 * rolava para a proxima *alternativa* da mesma pergunta e quebrava com
 * "Cannot read properties of null" quando o indice nao existia.
 */
function irParaProximaPerguntaSemResposta(indiceAtual) {
    const total = quizzEmAndamento.questions.length;
    for (let i = 1; i <= total; i++) {
        const proximo = document.querySelector(`#pergunta-${(indiceAtual + i) % total}`);
        if (proximo && !proximo.classList.contains("respondida")) {
            proximo.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }
    }
}


/* ------------------------------------------------------------------ *
 * 7. Resultado do quizz                                              *
 * ------------------------------------------------------------------ */

/**
 * Percentual de acerto = acertos / total de perguntas.
 * O nivel alcancado e o de maior minValue que ainda seja menor ou igual
 * ao percentual obtido. A versao anterior somava os minValue de todos os
 * niveis e usava a variavel de controle do laco como indice, o que
 * entregava o nivel errado (ex.: 33% recebia o nivel de 50%).
 */
function calcularResultado() {
    const total = quizzEmAndamento.questions.length;
    percentualDeAcerto = total === 0 ? 0 : Math.round((acertos / total) * 100);

    const niveis = [...(quizzEmAndamento.levels || [])]
        .map((nivel) => ({ ...nivel, minValue: Number(nivel.minValue) || 0 }))
        .sort((a, b) => a.minValue - b.minValue);

    if (niveis.length === 0) {
        nivelAlcancado = null;
        return;
    }

    nivelAlcancado = niveis[0];
    niveis.forEach((nivel) => {
        if (percentualDeAcerto >= nivel.minValue) {
            nivelAlcancado = nivel;
        }
    });
}

function mostrarResultado() {
    calcularResultado();

    const fim = document.querySelector(".fim");
    const conteudoNivel = nivelAlcancado
        ? `
            <div class="titulo-resultado">
                <h3>${percentualDeAcerto}% de acerto: ${escaparHTML(nivelAlcancado.title)}</h3>
            </div>
            <div class="conteudo-resultado">
                <img src="${escaparHTML(urlDaImagem(nivelAlcancado.image))}" alt="Imagem do resultado" onerror="usarImagemPadrao(this)" />
                <span>${escaparHTML(nivelAlcancado.text)}</span>
            </div>`
        : `
            <div class="titulo-resultado">
                <h3>${percentualDeAcerto}% de acerto</h3>
            </div>
            <div class="conteudo-resultado">
                <span>Este quizz nao tem niveis cadastrados, por isso nao ha mensagem final.</span>
            </div>`;

    fim.innerHTML = `
        <article class="resultado" data-identifier="quizz-result">${conteudoNivel}</article>
        <div class="botoes">
            <button type="button" class="reiniciar-quizz" onclick="reiniciarQuizz()">
                <p>Reiniciar Quizz</p>
            </button>
            <button type="button" class="voltar-inicio" onclick="voltarInicio()">
                <p>Voltar pra home</p>
            </button>
        </div>
    `;
    fim.querySelector(".resultado").scrollIntoView({ behavior: "smooth", block: "start" });
}

function reiniciarQuizz() {
    if (quizzEmAndamento) {
        iniciarQuizz(quizzEmAndamento);
    }
}


/* ------------------------------------------------------------------ *
 * 8. Criacao de um novo quizz                                        *
 * ------------------------------------------------------------------ */

function chamarTelaCriarQuizz() {
    // Um objeto novo por criacao: antes o mesmo objeto global era
    // reaproveitado e o quizz seguinte herdava os dados do anterior.
    quizzEmCriacao = { title: "", image: "", questions: [], levels: [] };
    qtdadePerguntas = 0;
    qtdadeNiveis = 0;

    esconderTodasAsTelas();
    const tela = document.querySelector(".cria-quizz .vamos-comecar");
    tela.querySelectorAll("input").forEach((campo) => {
        campo.value = "";
    });
    tela.style.display = "flex";
    window.scrollTo(0, 0);
}

function validarDadosBasicos() {
    const tituloQuizz = document.querySelector(".vamos-comecar .titulo-quizz").value.trim();
    const imagemQuizz = document.querySelector(".vamos-comecar .url-quizz").value.trim();
    const perguntas = parseInt(document.querySelector(".vamos-comecar .numero-perguntas").value, 10);
    const niveis = parseInt(document.querySelector(".vamos-comecar .quantidade-niveis").value, 10);
    const erros = [];

    if (tituloQuizz.length < MIN_CARACTERES_TITULO_QUIZZ || tituloQuizz.length > MAX_CARACTERES_TITULO_QUIZZ) {
        erros.push(`O titulo do quizz deve ter entre ${MIN_CARACTERES_TITULO_QUIZZ} e ${MAX_CARACTERES_TITULO_QUIZZ} caracteres.`);
    }
    if (!validarURL(imagemQuizz)) {
        erros.push("A imagem do quizz deve ser uma URL valida.");
    }
    if (!Number.isInteger(perguntas) || perguntas < MIN_PERGUNTAS) {
        erros.push(`A quantidade de perguntas deve ser no minimo ${MIN_PERGUNTAS}.`);
    }
    if (!Number.isInteger(niveis) || niveis < MIN_NIVEIS) {
        erros.push(`A quantidade de niveis deve ser no minimo ${MIN_NIVEIS}.`);
    }

    if (erros.length > 0) {
        erros.forEach((erro) => mostrarAviso(erro));
        return;
    }

    qtdadePerguntas = perguntas;
    qtdadeNiveis = niveis;
    quizzEmCriacao.title = tituloQuizz;
    quizzEmCriacao.image = imagemQuizz;
    chamarTelaCriarPerguntas();
}

function chamarTelaCriarPerguntas() {
    document.querySelector(".cria-quizz .vamos-comecar").style.display = "none";
    montarTelaCriarPerguntas(document.querySelector(".cria-quizz .cria-perguntas"));
    window.scrollTo(0, 0);
}

function camposDaPergunta() {
    return `
        <div class="cabecalho-pergunta">
            <input class="texto-pergunta" type="text" placeholder="Texto da pergunta" minlength="${MIN_CARACTERES_TITULO_PERGUNTA}" />
            <input class="cor-pergunta" type="color" title="Cor de fundo da pergunta" value="#ec362d" />
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
    `;
}

function montarTelaCriarPerguntas(telaCriarPerguntas) {
    let html = `<h1>Crie suas perguntas</h1>
        <div class="pergunta" data-identifier="question">
            <h2>Pergunta 1</h2>
            ${camposDaPergunta()}
        </div>`;

    for (let i = 2; i <= qtdadePerguntas; i++) {
        html += `
            <div class="nova-pergunta" data-identifier="expand">
                <h2>Pergunta ${i}</h2>
                <img class="botaoEditar" src="img/editar.png" alt="Abrir a pergunta ${i}" onclick="abrirNovaPergunta(this)" />
            </div>
        `;
    }

    html += `
        <button type="button" class="prosseguir" onclick="validarTodasPerguntas()">
            <p>Prosseguir pra criar niveis</p>
        </button>
    `;

    telaCriarPerguntas.innerHTML = html;
    telaCriarPerguntas.style.display = "flex";
}

function abrirNovaPergunta(elemento) {
    const novaPergunta = elemento.parentNode;
    novaPergunta.classList.add("pergunta");
    novaPergunta.classList.remove("nova-pergunta");
    novaPergunta.dataset.identifier = "question";
    elemento.remove();
    novaPergunta.innerHTML += camposDaPergunta();
}

function criarObjetoResposta(elementoResposta, ehRespostaCorreta) {
    // Um objeto novo por resposta. Antes um unico objeto global era
    // mutado e devolvido, entao todas as respostas do quizz terminavam
    // iguais e a resposta correta era perdida.
    return {
        text: elementoResposta.querySelector(".texto-resposta").value.trim(),
        image: elementoResposta.querySelector(".url-resposta").value.trim(),
        isCorrectAnswer: Boolean(ehRespostaCorreta)
    };
}

function criarObjetoPergunta(elementoPergunta) {
    const respostas = [criarObjetoResposta(elementoPergunta.querySelector(".resposta-correta"), true)];

    elementoPergunta.querySelectorAll(".resposta").forEach((elemento) => {
        if (elemento.querySelector(".texto-resposta").value.trim() !== "") {
            respostas.push(criarObjetoResposta(elemento, false));
        }
    });

    return {
        title: elementoPergunta.querySelector(".texto-pergunta").value.trim(),
        color: elementoPergunta.querySelector(".cor-pergunta").value,
        answers: respostas
    };
}

function validarTodasPerguntas() {
    const divsPerguntas = document.querySelectorAll(".cria-quizz .cria-perguntas .pergunta");

    if (divsPerguntas.length < qtdadePerguntas) {
        mostrarAviso(`Preencha todas as ${qtdadePerguntas} perguntas antes de prosseguir.`);
        return;
    }

    const invalidas = [...divsPerguntas].filter((div, indice) => !validarDadosPergunta(div, indice + 1));
    if (invalidas.length > 0) {
        invalidas[0].scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

    quizzEmCriacao.questions = [...divsPerguntas].map(criarObjetoPergunta);
    chamarTelaCriarNiveis();
}

function chamarTelaCriarNiveis() {
    document.querySelector(".cria-quizz .cria-perguntas").style.display = "none";
    montarTelaCriarNiveis(document.querySelector(".cria-quizz .cria-niveis"));
    window.scrollTo(0, 0);
}

function camposDoNivel() {
    return `
        <input class="titulo-nivel" type="text" placeholder="Titulo do nivel" minlength="${MIN_CARACTERES_TITULO_NIVEL}" />
        <input class="percentual-nivel" type="number" placeholder="% de acerto minima" min="0" max="100" />
        <input class="url-nivel" type="url" placeholder="URL da imagem do nivel" />
        <textarea class="descricao-nivel" placeholder="Descricao do nivel" minlength="${MIN_CARACTERES_DESCRICAO_NIVEL}"></textarea>
    `;
}

function montarTelaCriarNiveis(telaCriarNiveis) {
    let html = `<h1>Agora, decida os niveis!</h1>
        <div class="nivel" data-identifier="level">
            <h2>Nivel 1</h2>
            ${camposDoNivel()}
        </div>`;

    for (let i = 2; i <= qtdadeNiveis; i++) {
        html += `
            <div class="novo-nivel" data-identifier="expand">
                <h2>Nivel ${i}</h2>
                <img class="botaoEditar" src="img/editar.png" alt="Abrir o nivel ${i}" onclick="abrirNovoNivel(this)" />
            </div>
        `;
    }

    html += `
        <button type="button" class="finaliza-quizz" onclick="validarTodosNiveis()">
            <p>Finalizar Quizz</p>
        </button>
    `;

    telaCriarNiveis.innerHTML = html;
    telaCriarNiveis.style.display = "flex";
}

function abrirNovoNivel(elemento) {
    const novoNivel = elemento.parentNode;
    novoNivel.classList.add("nivel");
    novoNivel.classList.remove("novo-nivel");
    novoNivel.dataset.identifier = "level";
    elemento.remove();
    novoNivel.innerHTML += camposDoNivel();
}

function criarObjetoNivel(elementoNivel) {
    // Tambem devolve um objeto novo (antes todos os niveis do quizz
    // ficavam identicos ao ultimo preenchido).
    return {
        title: elementoNivel.querySelector(".titulo-nivel").value.trim(),
        image: elementoNivel.querySelector(".url-nivel").value.trim(),
        text: elementoNivel.querySelector(".descricao-nivel").value.trim(),
        minValue: Number(elementoNivel.querySelector(".percentual-nivel").value)
    };
}

function validarTodosNiveis() {
    const divsNiveis = document.querySelectorAll(".cria-quizz .cria-niveis .nivel");

    if (divsNiveis.length < qtdadeNiveis) {
        mostrarAviso(`Preencha todos os ${qtdadeNiveis} niveis antes de finalizar.`);
        return;
    }

    const invalidos = [...divsNiveis].filter((div, indice) => !validarDadosNivel(div, indice + 1));
    if (invalidos.length > 0) {
        invalidos[0].scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

    const niveis = [...divsNiveis].map(criarObjetoNivel);

    if (!niveis.some((nivel) => nivel.minValue === 0)) {
        mostrarAviso("E obrigatorio existir pelo menos 1 nivel cuja % de acerto minima seja 0%.");
        return;
    }

    quizzEmCriacao.levels = niveis;
    document.querySelector(".cria-quizz .cria-niveis").style.display = "none";
    enviarQuizz(quizzEmCriacao);
}

function mostrarTelaSucessoCriacaoQuizz(quizzCriado) {
    const tela = document.querySelector(".cria-quizz .sucesso-quizz");
    tela.innerHTML = `
        <h1>Seu quizz esta pronto!</h1>
        <figure class="fim-criacao-quizz">
            <figcaption>${escaparHTML(quizzCriado.title)}</figcaption>
        </figure>
        <button type="button" class="acessar-quizz" onclick="acessarQuizzCriado()">
            <p>Acessar Quizz</p>
        </button>
        <button type="button" class="voltar-inicio" onclick="voltarInicio()">
            <p>Voltar pra home</p>
        </button>
    `;

    // A versao anterior sobrescrevia a imagem escolhida pelo usuario por
    // uma URL fixa e quebrada, e atribuia o degrade a `figure.background`
    // (propriedade inexistente) em vez de `figure.style.backgroundImage`.
    aplicarImagemDeFundo(tela.querySelector("figure"), urlDaImagem(quizzCriado.image), DEGRADE_CARD);
    tela.style.display = "flex";
    window.scrollTo(0, 0);
}

function acessarQuizzCriado() {
    if (quizzRecemCriado) {
        abrirQuizzPorId(quizzRecemCriado.id);
    }
}

function voltarInicio() {
    renderizarTelaInicial();
}


/* ------------------------------------------------------------------ *
 * 9. Validacoes                                                      *
 * ------------------------------------------------------------------ */

function validarDadosPergunta(elemento, numero) {
    const textoPergunta = elemento.querySelector(".texto-pergunta").value.trim();
    const respostaCorreta = elemento.querySelector(".resposta-correta .texto-resposta").value.trim();
    const urlRespostaCorreta = elemento.querySelector(".resposta-correta .url-resposta").value.trim();
    const incorretas = [...elemento.querySelectorAll(".resposta")];
    const erros = [];

    if (textoPergunta.length < MIN_CARACTERES_TITULO_PERGUNTA) {
        erros.push(`o texto deve ter no minimo ${MIN_CARACTERES_TITULO_PERGUNTA} caracteres`);
    }
    if (respostaCorreta === "" || !validarURL(urlRespostaCorreta)) {
        erros.push("a resposta correta precisa de texto e de uma URL de imagem valida");
    }

    const preenchidas = incorretas.filter((div) => div.querySelector(".texto-resposta").value.trim() !== "");
    if (preenchidas.length === 0) {
        erros.push("e obrigatorio informar pelo menos 1 resposta incorreta");
    }
    if (preenchidas.some((div) => !validarURL(div.querySelector(".url-resposta").value.trim()))) {
        erros.push("cada resposta incorreta preenchida precisa de uma URL de imagem valida");
    }

    if (erros.length > 0) {
        mostrarAviso(`Pergunta ${numero}: ${erros.join("; ")}.`);
        return false;
    }
    return true;
}

function validarDadosNivel(elemento, numero) {
    const titulo = elemento.querySelector(".titulo-nivel").value.trim();
    const percentual = Number(elemento.querySelector(".percentual-nivel").value);
    const url = elemento.querySelector(".url-nivel").value.trim();
    const descricao = elemento.querySelector(".descricao-nivel").value.trim();
    const erros = [];

    if (titulo.length < MIN_CARACTERES_TITULO_NIVEL) {
        erros.push(`o titulo deve ter no minimo ${MIN_CARACTERES_TITULO_NIVEL} caracteres`);
    }
    if (elemento.querySelector(".percentual-nivel").value === "" || Number.isNaN(percentual) || percentual < 0 || percentual > 100) {
        erros.push("a % de acerto minima deve ser um numero entre 0 e 100");
    }
    if (!validarURL(url)) {
        erros.push("a imagem do nivel deve ser uma URL valida");
    }
    if (descricao.length < MIN_CARACTERES_DESCRICAO_NIVEL) {
        erros.push(`a descricao deve ter no minimo ${MIN_CARACTERES_DESCRICAO_NIVEL} caracteres`);
    }

    if (erros.length > 0) {
        mostrarAviso(`Nivel ${numero}: ${erros.join("; ")}.`);
        return false;
    }
    return true;
}

// Baseado em:
// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function validarURL(texto) {
    const padrao = new RegExp(
        "^(https?:\\/\\/)?" + // protocolo
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // nome de dominio
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // ou endereco ip (v4)
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // porta e caminho
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragmento
        "i"
    );
    return padrao.test(String(texto).trim());
}


/* ------------------------------------------------------------------ *
 * 10. Inicializacao                                                  *
 * ------------------------------------------------------------------ */

function iniciarAplicacao() {
    const busca = document.querySelector("#busca-quizz");
    if (busca) {
        busca.addEventListener("input", renderizarTodosOsQuizzes);
    }

    carregarMeusQuizzes();
    renderizarMeusQuizzes();
    buscarTodosOsQuizzes();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarAplicacao);
} else {
    iniciarAplicacao();
}
