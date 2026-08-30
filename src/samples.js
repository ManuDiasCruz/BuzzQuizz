/* Editorial collection. Images are bundled locally; see IMAGE_CREDITS.md. */
const QUIZ_IMAGES = [
    { path: 'img/pixabay/red-panda.jpg', label: 'Panda-vermelho na árvore' },
    { path: 'img/pixabay/panda.jpg', label: 'Panda-gigante e bambu' },
    { path: 'img/pixabay/ocean.jpg', label: 'Águas da Polinésia' },
    { path: 'img/pixabay/mountain.jpg', label: 'Monte Fuji' },
    { path: 'img/pixabay/forest.jpg', label: 'Trilha na floresta' },
    { path: 'img/pixabay/river.jpg', label: 'Rio e cascata' }
];

const QUIZ_SAMPLES = (() => {
    const image = name => `img/pixabay/${name}.jpg`;
    const answer = (text, photo, isCorrectAnswer = false) => ({ text, image: image(photo), isCorrectAnswer });
    const question = (title, color, answers) => ({ title, color, answers });
    const levels = (photo, top) => [
        { title: 'A curiosidade é o começo!', minValue: 0, image: image(photo), text: 'Cada descoberta conta. Revise as respostas marcadas e tente de novo: aprender também faz parte da diversão.' },
        { title: top, minValue: 60, image: image('forest'), text: 'Muito bem! Você reconheceu os detalhes e completou o desafio. Que tal explorar outro tema ou criar seu próprio quizz?' }
    ];
    return [
        {
            id: 'colecao-pandas', title: 'Quanto você sabe sobre pandas?', image: image('red-panda'),
            questions: [
                question('Qual destes animais é o panda-vermelho?', '#a03e32', [answer('O pequeno de pelagem avermelhada', 'red-panda', true), answer('O gigante preto e branco', 'panda')]),
                question('Qual alimento aparece com o panda-gigante nesta foto?', '#327053', [answer('Bambu', 'panda', true), answer('Algas do oceano', 'ocean'), answer('Folhas das árvores desta trilha', 'forest')]),
                question('Qual destes pandas tem a pelagem preta e branca?', '#434ca0', [answer('Panda-gigante', 'panda', true), answer('Panda-vermelho', 'red-panda')])
            ], levels: levels('panda', 'Um olhar atento para os pandas!')
        },
        {
            id: 'colecao-paisagens', title: 'Você reconhece estas paisagens?', image: image('ocean'),
            questions: [
                question('Qual destas paisagens mostra uma ilha tropical?', '#276b78', [answer('As águas da Polinésia', 'ocean', true), answer('O Monte Fuji', 'mountain'), answer('Uma trilha entre árvores', 'forest')]),
                question('Em qual imagem aparece o Monte Fuji, no Japão?', '#6c5097', [answer('O Monte Fuji ao pôr do sol', 'mountain', true), answer('O rio com uma cascata', 'river'), answer('A praia tropical', 'ocean')]),
                question('Qual imagem mostra água correndo em uma cascata?', '#326456', [answer('O rio entre as rochas', 'river', true), answer('A trilha na floresta', 'forest'), answer('A montanha ao longe', 'mountain')])
            ], levels: levels('river', 'Seu olhar vai longe!')
        },
        {
            id: 'colecao-natureza', title: 'Um passeio pelo mundo natural', image: image('forest'),
            questions: [
                question('Qual paisagem tem uma trilha cercada por árvores?', '#39705a', [answer('A floresta', 'forest', true), answer('O mar tropical', 'ocean'), answer('O Monte Fuji', 'mountain')]),
                question('Qual destes animais aparece descansando em uma árvore?', '#a45b2e', [answer('O panda-vermelho', 'red-panda', true), answer('O panda-gigante com bambu', 'panda')]),
                question('Em qual imagem você encontra o mar de águas turquesa?', '#276b78', [answer('Na Polinésia', 'ocean', true), answer('No rio e sua cascata', 'river'), answer('Na trilha na floresta', 'forest')])
            ], levels: levels('mountain', 'Explorador da natureza!')
        }
    ];
})();

if (typeof module === 'object' && module.exports) module.exports = { QUIZ_IMAGES, QUIZ_SAMPLES };
