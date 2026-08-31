/* Small, reviewed collection. Image provenance is in IMAGE_CREDITS.md. */
const IMAGE_LIBRARY = [
    { label: "Panda gigante", path: "img/collection/panda.webp" },
    { label: "Panda-vermelho", path: "img/collection/red-panda.webp" },
    { label: "Floresta de bambu", path: "img/collection/bamboo.webp" },
    { label: "Deserto e montanhas", path: "img/collection/desert.webp" },
    { label: "Oceano e litoral", path: "img/collection/ocean.webp" },
    { label: "Café e frutas", path: "img/collection/coffee.webp" }
];
const photo = name => `img/collection/${name}.webp`;
function collectionQuestion(title, correct, wrong, color = "#28594c") {
    return { title, color, answers: [
        { text: correct[0], image: photo(correct[1]), isCorrectAnswer: true },
        ...wrong.map(([text, image]) => ({ text, image: photo(image), isCorrectAnswer: false }))
    ] };
}
function collectionLevels(theme) {
    return [
        { title: "Uma nova descoberta", minValue: 0, image: photo(theme), text: "Cada pergunta é uma chance de aprender. Confira as respostas e experimente jogar mais uma vez!" },
        { title: "Curiosidade em alta!", minValue: 60, image: photo(theme), text: "Muito bem! Seu olhar curioso levou você longe. Que tal explorar outro tema da nossa coleção?" },
        { title: "Você sabe de tudo!", minValue: 100, image: photo(theme), text: "Todas as respostas certas! Desafio concluído. Agora você pode criar um quizz e compartilhar o que sabe." }
    ];
}
const BUILTIN_QUIZZES = [
    { id: "been-pandas", title: "Quanto você sabe sobre pandas?", image: photo("red-panda"),
        questions: [
            collectionQuestion("Qual destes animais é o panda-vermelho?", ["O pequeno de pelagem avermelhada", "red-panda"], [["O urso de pelagem preta e branca", "panda"]]),
            collectionQuestion("O que o panda-gigante mais come na natureza?", ["Bambu: folhas, caules e brotos", "bamboo"], [["Frutas vermelhas e café", "coffee"], ["Peixes encontrados no oceano", "ocean"]]),
            collectionQuestion("Pandas-gigantes são encontrados na natureza em qual país?", ["China, em florestas montanhosas", "bamboo"], [["Egito, nas regiões desérticas", "desert"], ["Austrália, junto aos recifes", "ocean"]])
        ], levels: collectionLevels("panda") },
    { id: "been-landscapes", title: "Uma viagem pelos cenários da Terra", image: photo("desert"),
        questions: [
            collectionQuestion("Qual paisagem é mais associada à escassez de chuva?", ["Um deserto com rochas expostas", "desert"], [["Uma floresta de bambu", "bamboo"], ["O litoral de um oceano", "ocean"]], "#964727"),
            collectionQuestion("Qual ambiente tem água salgada em abundância?", ["O oceano junto ao litoral", "ocean"], [["O solo de uma floresta", "bamboo"], ["As montanhas do deserto", "desert"]], "#245b75"),
            collectionQuestion("Qual destas paisagens é dominada por vegetação?", ["Uma floresta de bambu", "bamboo"], [["As formações rochosas do deserto", "desert"], ["A superfície do oceano", "ocean"]])
        ], levels: collectionLevels("ocean") },
    { id: "been-nature", title: "Pequenas curiosidades da natureza", image: photo("bamboo"),
        questions: [
            collectionQuestion("O bambu pertence a qual grupo de plantas?", ["Gramíneas, como os capins", "bamboo"], [["Algas, como as do oceano", "ocean"]]),
            collectionQuestion("Qual destes animais é um mamífero?", ["O panda-gigante", "panda"], [["O bambu da floresta", "bamboo"]]),
            collectionQuestion("De onde vêm os grãos usados para preparar café?", ["Das sementes dos frutos do cafeeiro", "coffee"], [["Do interior dos caules de bambu", "bamboo"], ["De minerais encontrados nas rochas", "desert"]])
        ], levels: collectionLevels("coffee") }
];
if (typeof module !== "undefined" && module.exports) module.exports = { IMAGE_LIBRARY, BUILTIN_QUIZZES };
