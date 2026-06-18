// Quizzes de exemplo do BuzzQuizz v2, com imagens locais (licença Pixabay,
// ver img/quiz/CREDITS.md). Eles aparecem no topo de "Todos os Quizzes" e
// continuam jogáveis mesmo quando a API de quizzes está fora do ar.
const QUIZZES_EXEMPLO = [{
        title: "Você manja de animais? Teste seus conhecimentos!",
        image: "img/quiz/capa-animais.jpg",
        questions: [{
                title: "Qual destes animais é um mamífero que vive no mar?",
                color: "#37718E",
                answers: [{
                        text: "Golfinho",
                        image: "img/quiz/golfinho.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Tubarão",
                        image: "img/quiz/tubarao.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Pinguim",
                        image: "img/quiz/pinguim.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Crocodilo",
                        image: "img/quiz/crocodilo.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual animal é conhecido como o rei da selva?",
                color: "#C84B31",
                answers: [{
                        text: "Leão",
                        image: "img/quiz/leao.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Tigre",
                        image: "img/quiz/tigre.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Elefante",
                        image: "img/quiz/elefante.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Lobo",
                        image: "img/quiz/lobo.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual destas aves não consegue voar?",
                color: "#346751",
                answers: [{
                        text: "Pinguim",
                        image: "img/quiz/pinguim.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Arara",
                        image: "img/quiz/arara.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Coruja",
                        image: "img/quiz/coruja.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Beija-flor",
                        image: "img/quiz/beija-flor.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [{
                title: "Filhote curioso",
                image: "img/quiz/filhote-gato.jpg",
                text: "Todo mundo começa de algum lugar! Os animais ainda guardam muitos segredos pra você — que tal tentar de novo e subir de nível?",
                minValue: 0
            },
            {
                title: "Explorador da natureza",
                image: "img/quiz/raposa.jpg",
                text: "Muito bem! Você já reconhece os bichos mais famosos da natureza, mas ainda dá pra afiar o faro um pouquinho mais.",
                minValue: 50
            },
            {
                title: "Mestre dos animais",
                image: "img/quiz/aguia.jpg",
                text: "Impressionante! Você acertou tudo e provou que conhece o reino animal como a palma da sua mão. Voo de águia!",
                minValue: 100
            }
        ]
    },
    {
        title: "O quanto você conhece as maravilhas do mundo?",
        image: "img/quiz/capa-mundo.jpg",
        questions: [{
                title: "Qual destes monumentos fica em Paris, na França?",
                color: "#5C6BC0",
                answers: [{
                        text: "Torre Eiffel",
                        image: "img/quiz/torre-eiffel.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Coliseu",
                        image: "img/quiz/coliseu.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Big Ben",
                        image: "img/quiz/big-ben.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Estátua da Liberdade",
                        image: "img/quiz/estatua-liberdade.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual bioma é conhecido como o pulmão do mundo?",
                color: "#2E7D32",
                answers: [{
                        text: "Floresta Amazônica",
                        image: "img/quiz/floresta-amazonica.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Deserto do Saara",
                        image: "img/quiz/deserto.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Geleiras do Ártico",
                        image: "img/quiz/geleira.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Savana Africana",
                        image: "img/quiz/savana.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual destas maravilhas do mundo moderno fica no Brasil?",
                color: "#AD1457",
                answers: [{
                        text: "Cristo Redentor",
                        image: "img/quiz/cristo-redentor.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Machu Picchu",
                        image: "img/quiz/machu-picchu.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Pirâmides de Gizé",
                        image: "img/quiz/piramides.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Taj Mahal",
                        image: "img/quiz/taj-mahal.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [{
                title: "Turista de primeira viagem",
                image: "img/quiz/mala-viagem.jpg",
                text: "Sua mala já está pronta, agora só falta conhecer melhor o mapa! Explore o mundo e tente de novo.",
                minValue: 0
            },
            {
                title: "Viajante experiente",
                image: "img/quiz/bussola.jpg",
                text: "Boa! Você já rodou bastante por aí e reconhece os cartões-postais mais famosos do planeta.",
                minValue: 50
            },
            {
                title: "Cidadão do mundo",
                image: "img/quiz/globo.jpg",
                text: "Sensacional! Nenhum canto do planeta é segredo pra você. O mundo é literalmente a sua casa!",
                minValue: 100
            }
        ]
    }
];
