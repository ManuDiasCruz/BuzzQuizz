/* Curated content is bundled: playing never depends on the community API. */
const BUILTIN_QUIZZES = (() => {
    const photo = name => 'img/gallery/' + name + '.jpg';
    const answer = (text, image, correct = false) => ({text, image: photo(image), isCorrectAnswer: correct});
    const question = (title, color, answers) => ({title, color, answers});
    const levels = (first, last) => [
        {title: 'Curiosidade despertada', minValue: 0, image: photo(first), text: 'Cada pergunta é uma chance de descobrir algo novo. Que tal jogar de novo e testar o que você aprendeu?'},
        {title: 'Olhar de explorador', minValue: 50, image: photo(last), text: 'Muito bem! Seu olhar curioso fez a diferença. Continue explorando e encontre seu próximo desafio.'},
        {title: 'Conhecimento de sobra!', minValue: 100, image: photo(last), text: 'Você acertou todas! Agora é hora de explorar outro tema ou criar um quizz com o que você sabe.'}
    ];
    return [
        {id: 'featured-animals', category: 'Vida animal', title: 'Um passeio pelo mundo animal', image: photo('giraffe'),
            questions: [
                question('Qual destes animais tem o pescoço mais comprido?', '#315c4d', [answer('Girafa', 'giraffe', true), answer('Elefante', 'elephant'), answer('Panda-gigante', 'panda')]),
                question('Qual destes animais possui uma tromba?', '#434ca0', [answer('Panda-vermelho', 'red-panda'), answer('Elefante', 'elephant', true), answer('Girafa', 'giraffe')]),
                question('Qual destes animais tem pelagem preta e branca?', '#99501c', [answer('Panda-gigante', 'panda', true), answer('Panda-vermelho', 'red-panda')])
            ], levels: levels('red-panda', 'giraffe')},
        {id: 'featured-landscapes', category: 'Pelo planeta', title: 'Paisagens que contam histórias', image: photo('coast'),
            questions: [
                question('Qual destas paisagens mostra dunas de areia?', '#99501c', [answer('Deserto', 'desert', true), answer('Litoral', 'coast'), answer('Cachoeira', 'waterfall')]),
                question('Onde a água cai de uma diferença de altura?', '#235a79', [answer('No deserto', 'desert'), answer('Na cachoeira', 'waterfall', true)]),
                question('Qual paisagem marca o encontro da terra com o mar?', '#315c4d', [answer('Litoral', 'coast', true), answer('Deserto', 'desert'), answer('Cachoeira', 'waterfall')])
            ], levels: levels('desert', 'waterfall')},
        {id: 'featured-observation', category: 'Olhe de novo', title: 'Você tem olhos de explorador?', image: photo('red-panda'),
            questions: [
                question('Qual animal destas fotos tem a pelagem avermelhada?', '#7c3550', [answer('Panda-vermelho', 'red-panda', true), answer('Panda-gigante', 'panda'), answer('Elefante', 'elephant')]),
                question('Qual destas paisagens tem uma queda de água?', '#235a79', [answer('Dunas de areia', 'desert'), answer('Cachoeira na floresta', 'waterfall', true), answer('Litoral montanhoso', 'coast')]),
                question('Qual animal tem manchas em sua pelagem?', '#315c4d', [answer('Elefante', 'elephant'), answer('Girafa', 'giraffe', true)])
            ], levels: levels('panda', 'coast')}
    ];
})();
if (typeof module !== 'undefined') module.exports = BUILTIN_QUIZZES;
