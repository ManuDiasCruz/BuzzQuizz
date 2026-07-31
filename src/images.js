/*
 * Catálogo de imagens do BuzzQuizz.
 *
 * Todas as fotos vêm do Pixabay (https://pixabay.com/images/search/) e estão
 * sob a Pixabay Content License, que permite uso e redistribuição gratuitos,
 * inclusive comercial, sem atribuição obrigatória. Detalhes em img/CREDITS.md.
 *
 * As imagens de placeholder ficam versionadas em img/placeholders/ para que a
 * aplicação continue coerente mesmo sem rede. As imagens da galeria são
 * servidas pela CDN do Pixabay para não inflar o repositório.
 */

const IMAGENS_PLACEHOLDER = {
    quizz: "img/placeholders/quizz.jpg",
    pergunta: "img/placeholders/pergunta.jpg",
    resposta: "img/placeholders/resposta.jpg",
    nivel: "img/placeholders/nivel.jpg"
};

/* Galeria de sugestões, agrupada por tema, para os campos de URL de imagem. */
const GALERIA_PIXABAY = {
    animais: [
        "https://cdn.pixabay.com/photo/2018/02/18/00/22/panda-3161290_640.jpg",
        "https://cdn.pixabay.com/photo/2017/01/15/19/04/red-panda-1982445_640.jpg",
        "https://cdn.pixabay.com/photo/2017/07/22/22/56/tiger-2530158_640.jpg",
        "https://cdn.pixabay.com/photo/2021/09/02/16/47/bear-6593944_640.jpg",
        "https://cdn.pixabay.com/photo/2018/01/03/19/17/cat-3059075_640.jpg",
        "https://cdn.pixabay.com/photo/2017/03/27/13/23/dog-2178696_640.jpg",
        "https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_640.jpg"
    ],
    natureza: [
        "https://cdn.pixabay.com/photo/2016/11/23/13/50/mountains-1852955_640.jpg",
        "https://cdn.pixabay.com/photo/2017/12/10/17/07/alps-3010323_640.jpg",
        "https://cdn.pixabay.com/photo/2015/11/06/15/04/bamboo-1028699_640.jpg",
        "https://cdn.pixabay.com/photo/2023/03/27/18/28/moss-7881439_640.jpg",
        "https://cdn.pixabay.com/photo/2016/11/22/19/33/sea-1850228_640.jpg",
        "https://cdn.pixabay.com/photo/2021/09/09/01/00/trees-6608197_640.jpg",
        "https://cdn.pixabay.com/photo/2020/05/28/04/42/waterfall-5229807_640.jpg"
    ],
    ciencia: [
        "https://cdn.pixabay.com/photo/2014/09/08/09/24/solar-system-439046_640.jpg",
        "https://cdn.pixabay.com/photo/2014/10/04/12/13/milky-way-472971_640.jpg",
        "https://cdn.pixabay.com/photo/2021/01/21/16/17/human-5937756_640.jpg",
        "https://cdn.pixabay.com/photo/2021/01/17/02/02/planets-5923806_640.jpg",
        "https://cdn.pixabay.com/photo/2020/12/14/15/48/light-bulb-5831252_640.jpg"
    ],
    cultura: [
        "https://cdn.pixabay.com/photo/2016/03/09/15/29/books-1246674_640.jpg",
        "https://cdn.pixabay.com/photo/2023/03/08/23/21/books-7838952_640.jpg",
        "https://cdn.pixabay.com/photo/2015/04/29/09/33/drums-745077_640.jpg",
        "https://cdn.pixabay.com/photo/2017/10/08/17/22/cello-2830670_640.jpg",
        "https://cdn.pixabay.com/photo/2016/10/21/08/09/world-1757412_640.jpg",
        "https://cdn.pixabay.com/photo/2024/01/22/22/09/map-8526430_640.jpg"
    ],
    diversao: [
        "https://cdn.pixabay.com/photo/2024/10/31/10/08/quiz-9163786_640.jpg",
        "https://cdn.pixabay.com/photo/2016/11/30/12/16/question-mark-1872665_640.jpg",
        "https://cdn.pixabay.com/photo/2015/10/28/16/46/cup-1010909_640.jpg",
        "https://cdn.pixabay.com/photo/2014/10/14/20/24/soccer-488700_640.jpg",
        "https://cdn.pixabay.com/photo/2022/08/02/07/30/pizza-7359753_640.jpg",
        "https://cdn.pixabay.com/photo/2019/05/22/22/28/brainstorm-4222728_640.jpg"
    ]
};

const TEMAS_GALERIA = Object.keys(GALERIA_PIXABAY);

/*
 * Devolve uma URL do Pixabay. Sem tema, sorteia entre todos os temas; com um
 * tema conhecido, sorteia dentro dele. Serve os botões "sugerir imagem" das
 * telas de criação.
 */
function sugerirImagem(tema) {
    const temaEscolhido = GALERIA_PIXABAY[tema] ? tema : TEMAS_GALERIA[Math.floor(Math.random() * TEMAS_GALERIA.length)];
    const opcoes = GALERIA_PIXABAY[temaEscolhido];

    return opcoes[Math.floor(Math.random() * opcoes.length)];
}

/*
 * Troca uma imagem quebrada pelo placeholder local do seu tipo. Sem isso, URLs
 * mortas (o quizz é alimentado por URLs digitadas por qualquer pessoa) deixam
 * o ícone de imagem quebrada na tela.
 */
function aplicarFallbackImagem(elementoImagem, tipo) {
    const placeholder = IMAGENS_PLACEHOLDER[tipo] || IMAGENS_PLACEHOLDER.resposta;

    if (elementoImagem.dataset.fallbackAplicado === "true") {
        return;
    }
    elementoImagem.dataset.fallbackAplicado = "true";
    elementoImagem.classList.add("imagem-placeholder");
    elementoImagem.src = placeholder;
}

/* Usado nos backgrounds em CSS inline, onde não existe evento de erro. */
function urlImagemOuPlaceholder(url, tipo) {
    const urlLimpa = typeof url === "string" ? url.trim() : "";
    const placeholder = IMAGENS_PLACEHOLDER[tipo] || IMAGENS_PLACEHOLDER.quizz;

    /* O "…" aparecia em URLs truncadas gravadas por versões antigas do app. */
    if (urlLimpa === "" || urlLimpa.includes("…")) {
        return placeholder;
    }
    return urlLimpa;
}
