let quizzTeste = [];
let listaQuizz = [];

// Estrutura objeto respota
let answerTrue = {
    text: "Texto da resposta 1",
    image: "https://http.cat/411.jpg",
    isCorrectAnswer: true
};

let answerWrong = {
    text: "Texto da resposta 1",
    image: "https://http.cat/411.jpg",
    isCorrectAnswer: true
};

// Estrutura objeto pergunta
let question = {
    title: "Título da pergunta 1",
    color: "#123456",
    answers: [answerWrong, answerTrue, answerTrue]
};

let levelStructure = {
    title: "Título do nível 1",
    image: "https://http.cat/411.jpg",
    text: "Descrição do nível 1",
    minValue: 0
};

// Estrutura objeto quizz
let quizzStructure = {
    id: 1,
    title: "Título do quizz",
    image: "https://http.cat/411.jpg",
    questions: [],
    levels: []
};

let listaNiveis = [{
        title: "MasterChef globalizado",
        image: "../quizz/quizzTeste/masterchef.jpg",
        text: "Você sabe muito sobre a gastronomia desses 4 países, mas já provou tudo isso? Vá simbora terminar o BootCamp, aprender inglês e trabalhar viajando o mundo...",
        minValue: 4
    },
    {
        title: "Chef em ascensão",
        image: "../quizz/quizzTeste/chef.jpg",
        text: "Éeee você é sabido hein? Mas melhor do que saber é ir visitar e provar um pouco do mundo",
        minValue: 2
    },
    {
        title: "Poderia ter sido pior...",
        image: "../quizz/quizzTeste/mochilao.jpg",
        text: "Mas aproveite já que você sabe qua há muito a descobrir e junte dinheiro para pagar a Provi. Depois marque um mochilão antes que o mundo acabe!",
        minValue: 1
    },
    {
        title: "Você não conhece nada do mundo que habita!",
        image: "../quizz/quizzTeste/dinheiro.jpg",
        text: "Termine logo esse curso e vá ganhar dinheirinho para poder conhecer algo do mundo!",
        maxValue: 0
    }
]

let listaPerguntas = [{
        title: "O país que você está visitando é famoso por ter o mapa na forma de um calçado, qual prato típico você comeria?",
        color: "#AFAFAF",
        answers: [{
                text: "Filé com purê de batata",
                image: "../quizz/quizzTeste/FiléAMostarda.jpg",
                isCorrectAnswer: false
            },
            {
                text: "Risoto de arroz negro e frutos do mar",
                image: "../quizz/quizzTeste/RisotoNegroPolvo.jpg",
                isCorrectAnswer: true
            },
            {
                text: "Spätzel com escalope de filé suíno",
                image: "../quizz/quizzTeste/SpatzelStrogonoff.jpg",
                isCorrectAnswer: false
            },
            {
                text: "Galeto com batata frita",
                image: "../quizz/quizzTeste/SpiceChicken.jpg",
                isCorrectAnswer: false
            }
        ]
    },
    {
        title: "Você está no fuso do Pacific Time, é uma manhã de sol de rachar... Qual bebida você encontra primeiro?",
        color: "#FFAFAF",
        answers: [{
                text: "Água fresca",
                image: "../quizz/quizzTeste/agua.jpg",
                isCorrectAnswer: false
            },
            {
                text: "Cerva gelada",
                image: "../quizz/quizzTeste/cerveja.jpg",
                isCorrectAnswer: false
            },
            {
                text: "Refri geladinho",
                image: "../quizz/quizzTeste/refrigerante.jpg",
                isCorrectAnswer: true
            },
            {
                text: "Um bom rótulo de vinho",
                image: "../quizz/quizzTeste/vinho.jpg",
                isCorrectAnswer: false
            }
        ]
    },
    {
        title: "Qual  sobremesa você comeria num passeio romântico no Vale do Reno?",
        color: "#FAFAFF",
        answers: [{
                text: "Uma boa fatia de torta Floresta Negra",
                image: "../quizz/quizzTeste/FlorestaNegra.jpg",
                isCorrectAnswer: true
            },
            {
                text: "Alfajor com muuuito doce de leite",
                image: "../quizz/quizzTeste/Alfajor.jpg",
                isCorrectAnswer: false
            },
            {
                text: "Torta geladinha de coco com chocolate",
                image: "../quizz/quizzTeste/TortaGeladaPrestigio.jpg",
                isCorrectAnswer: false
            },
            {
                text: "Uma torta inteira de cookies estourando de Nutela",
                image: "../quizz/quizzTeste/M&MsCake.jpg",
                isCorrectAnswer: false
            }
        ]
    },
    {
        title: "Se estivesse com andando pelo Porto Madero, qual lanche você pegaria?",
        color: "#FAFAFA",
        answers: [{
                text: "Coxinha!!!! Ooops era Arancini...",
                image: "../quizz/quizzTeste/arancini.jpg",
                isCorrectAnswer: false
            },
            {
                text: "Empanada disfarçaca de pastek de forno",
                image: "../quizz/quizzTeste/empanadas.jpg",
                isCorrectAnswer: true
            },
            {
                text: "Burguer com muito BACON!",
                image: "../quizz/quizzTeste/hamburguer.jpg",
                isCorrectAnswer: false
            },
            {
                text: "Pão, linguiça e chucrute",
                image: "../quizz/quizzTeste/bratwurst.jpg",
                isCorrectAnswer: false
            }
        ]
    }
]

// getQuizz("2333");
// getAllQuizz();

/*
quizzTeste = {
    title: "Qual seu nível de conhecimento de gastronomia mundial você tem?",
    image: "../quizz/quizzTeste/foodMap.jpg",
    questions: [{
            title: "O país que você está visitando é famoso por ter o mapa na forma de um calçado, qual prato típico você comeria?",
            color: "#AFAFAF",
            answers: [{
                    text: "Filé com purê de batata",
                    image: "../quizz/quizzTeste/FiléAMostarda.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Risoto de arroz negro e frutos do mar",
                    image: "../quizz/quizzTeste/RisotoNegroPolvo.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Spätzel com escalope de filé suíno",
                    image: "../quizz/quizzTeste/SpatzelStrogonoff.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Galeto com batata frita",
                    image: "../quizz/quizzTeste/SpiceChicken.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Você está no fuso do Pacific Time, é uma manhã de sol de rachar... Qual bebida você encontra primeiro?",
            color: "#FFAFAF",
            answers: [{
                    text: "Água fresca",
                    image: "../quizz/quizzTeste/agua.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Cerva gelada",
                    image: "../quizz/quizzTeste/cerveja.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Refri geladinho",
                    image: "../quizz/quizzTeste/refrigerante.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Um bom rótulo de vinho",
                    image: "../quizz/quizzTeste/vinho.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Qual  sobremesa você comeria num passeio romântico no Vale do Reno?",
            color: "#FAFAFF",
            answers: [{
                    text: "Uma boa fatia de torta Floresta Negra",
                    image: "../quizz/quizzTeste/FlorestaNegra.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Alfajor com muuuito doce de leite",
                    image: "../quizz/quizzTeste/Alfajor.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Torta geladinha de coco com chocolate",
                    image: "../quizz/quizzTeste/TortaGeladaPrestigio.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Uma torta inteira de cookies estourando de Nutela",
                    image: "../quizz/quizzTeste/M&MsCake.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Se estivesse com andando pelo Porto Madero, qual lanche você pegaria?",
            color: "#FAFAFA",
            answers: [{
                    text: "Coxinha!!!! Ooops era Arancini...",
                    image: "../quizz/quizzTeste/arancini.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Empanada disfarçaca de pastek de forno",
                    image: "../quizz/quizzTeste/empanadas.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Burguer com muito BACON!",
                    image: "../quizz/quizzTeste/hamburguer.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Pão, linguiça e chucrute",
                    image: "../quizz/quizzTeste/bratwurst.jpg",
                    isCorrectAnswer: false
                }
            ]
        }
    ],
    levels: [{
            title: "MasterChef globalizado",
            image: "../quizz/quizzTeste/masterchef.jpg",
            text: "Você sabe muito sobre a gastronomia desses 4 países, mas já provou tudo isso? Vá simbora terminar o BootCamp, aprender inglês e trabalhar viajando o mundo...",
            minValue: 4
        },
        {
            title: "Chef em ascensão",
            image: "../quizz/quizzTeste/chef.jpg",
            text: "Éeee você é sabido hein? Mas melhor do que saber é ir visitar e provar um pouco do mundo",
            minValue: 2
        },
        {
            title: "Poderia ter sido pior...",
            image: "../quizz/quizzTeste/mochilao.jpg",
            text: "Mas aproveite já que você sabe qua há muito a descobrir e junte dinheiro para pagar a Provi. Depois marque um mochilão antes que o mundo acabe!",
            minValue: 1
        },
        {
            title: "Você não conhece nada do mundo que habita!",
            image: "../quizz/quizzTeste/dinheiro.jpg",
            text: "Termine logo esse curso e vá ganhar dinheirinho para poder conhecer algo do mundo!",
            maxValue: 0
        }
    ]
};
*/

function createQuizz() {
    const quizz = {
        title: "Lessa Squad - Grupo 5",
        image: "https://http.cat/411.jpg",
        questions: [{
                title: "Título da pergunta 1",
                color: "#123456",
                answers: [{
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 2",
                color: "#123456",
                answers: [{
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 3",
                color: "#123456",
                answers: [{
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [{
                title: "Título do nível 1",
                image: "https://http.cat/411.jpg",
                text: "Descrição do nível 1",
                minValue: 0
            },
            {
                title: "Título do nível 2",
                image: "https://http.cat/412.jpg",
                text: "Descrição do nível 2",
                minValue: 50
            }
        ]
    };
    console.log(quizzTeste);
    return quizz;
}

function sendQuizz() {
    quizzTeste = createQuizz();
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizzTeste);
    promise.then(mandouQuizz);
    promise.catch(falhouEnvio);
}

function mandouQuizz() {
    console.log("O post do quizz deu certo!");
    console.log(quizzTeste);
}

function falhouEnvio(error) {
    alert(error);
}

function getAllQuizz() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(pegouQuizz);
    promise.catch(erroPegouQuizz);
}

function getQuizz(identificador) {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + identificador);
    promise.then(pegouQuizz);
    promise.catch(erroPegouQuizz);
}

function pegouQuizz(resposta) {
    quizzTeste = resposta.data;
    console.log(quizzTeste);
}

function erroPegouQuizz(error) {
    alert(error);
}

function validarDadosBasicos() {
    console.log("Entrei em  validarDadosBásicos");
    let tituloQuizz = document.querySelector(".vamos-comecar .titulo-quizz").value;
    if (tituloQuizz.length < 20) {
        alert("O título do quizz deve ter no mínimo 20 e no máximo 65 caracteres.");
    }
    let imagemQuizz = document.querySelector(".vamos-comecar .url-quizz").value;
    if (!validarURL(imagemQuizz)) {
        alert("A imagem deve ser uma URL válida.");
    }
    let numeroPerguntas = document.querySelector(".vamos-comecar .numero-perguntas").value;
    if (numeroPerguntas.length < 3) {
        alert("A quantidade de perguntas deve ser no mínimo 3.");
    }
    let quantidadeNiveis = document.querySelector(".vamos-comecar .quantidade-niveis").value;
    if (quantidadeNiveis.length < 2) {
        alert("A quantidade de níveis deve ser no mínimo 2.");
    }
}

function validarDadosPergunta() {
    console.log("Entrei em  validarDadosPergunta");

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
    console.log(pattern.test(texto));
    return !!pattern.test(texto);
}