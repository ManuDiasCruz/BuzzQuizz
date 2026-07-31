/**
 * Quizzes de demonstracao usados como fallback quando a API publica
 * (mock-api.driven.com.br) esta fora do ar ou inacessivel.
 *
 * Todas as imagens sao locais (img/quizzes/) e vem do Pixabay, sob a
 * Pixabay Content License. Veja img/quizzes/CREDITS.md.
 */

const QUIZZES_DEMO = [
    {
        id: "demo-natureza",
        title: "Maravilhas naturais do planeta Terra",
        image: "img/quizzes/capa-natureza.jpg",
        questions: [
            {
                title: "Qual destas paisagens e dominada por uma grande queda d'agua?",
                color: "#2E86AB",
                answers: [
                    {
                        text: "A cachoeira de Godafoss, na Islandia",
                        image: "img/quizzes/natureza-cachoeira.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "As dunas do deserto do Namibe",
                        image: "img/quizzes/natureza-deserto.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Um recife de corais tropicais",
                        image: "img/quizzes/natureza-recife.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "A aurora boreal no ceu polar",
                        image: "img/quizzes/natureza-aurora.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual destas imagens mostra uma floresta tropical umida?",
                color: "#3F8F5B",
                answers: [
                    {
                        text: "Mata fechada, riacho e neblina",
                        image: "img/quizzes/natureza-floresta.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Cordilheira coberta de neve",
                        image: "img/quizzes/natureza-montanha.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Dunas de areia ao amanhecer",
                        image: "img/quizzes/natureza-deserto.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Ceu noturno com luzes coloridas",
                        image: "img/quizzes/natureza-aurora.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Que fenomeno luminoso colore o ceu das regioes polares?",
                color: "#6A4C93",
                answers: [
                    {
                        text: "A aurora polar",
                        image: "img/quizzes/natureza-aurora.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "A neblina de uma cachoeira",
                        image: "img/quizzes/natureza-cachoeira.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "O brilho dos corais",
                        image: "img/quizzes/natureza-recife.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: "Explorador de primeira viagem",
                image: "img/quizzes/nivel-natureza-iniciante.jpg",
                text: "Voce esta comecando a trilha! Vale a pena olhar com mais calma para as paisagens do planeta antes da proxima expedicao.",
                minValue: 0
            },
            {
                title: "Guardiao das paisagens",
                image: "img/quizzes/nivel-natureza-mestre.jpg",
                text: "Excelente! Voce reconhece os grandes biomas e fenomenos naturais da Terra como um verdadeiro explorador experiente.",
                minValue: 60
            }
        ]
    },
    {
        id: "demo-espaco",
        title: "Viagem pelo Sistema Solar",
        image: "img/quizzes/capa-espaco.jpg",
        questions: [
            {
                title: "Qual planeta e famoso pelos seus imensos aneis?",
                color: "#1B2A4A",
                answers: [
                    {
                        text: "Saturno e seus aneis de gelo e rocha",
                        image: "img/quizzes/espaco-saturno.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Marte, o planeta vermelho",
                        image: "img/quizzes/espaco-marte.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "A Lua, satelite da Terra",
                        image: "img/quizzes/espaco-lua.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "O Sol, nossa estrela",
                        image: "img/quizzes/espaco-sol.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Quem trabalha em orbita da Terra dentro de uma estacao espacial?",
                color: "#B5651D",
                answers: [
                    {
                        text: "Astronautas em missao",
                        image: "img/quizzes/espaco-astronauta.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Um telescopio refletor antigo",
                        image: "img/quizzes/espaco-telescopio.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "Uma sonda pousada em Marte",
                        image: "img/quizzes/espaco-marte.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Qual corpo celeste e conhecido como o planeta vermelho?",
                color: "#8C2F1B",
                answers: [
                    {
                        text: "Marte, explorado por sondas roboticas",
                        image: "img/quizzes/espaco-marte.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Saturno, o senhor dos aneis",
                        image: "img/quizzes/espaco-saturno.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "A Lua, cheia de crateras",
                        image: "img/quizzes/espaco-lua.jpg",
                        isCorrectAnswer: false
                    },
                    {
                        text: "O Sol, uma esfera de plasma",
                        image: "img/quizzes/espaco-sol.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: "Aprendiz de astronomo",
                image: "img/quizzes/nivel-espaco-iniciante.jpg",
                text: "A viagem acabou de comecar! Ainda ha muito do Sistema Solar para conhecer antes da proxima decolagem.",
                minValue: 0
            },
            {
                title: "Comandante da missao",
                image: "img/quizzes/nivel-espaco-mestre.jpg",
                text: "Impressionante! Voce navega pelo Sistema Solar com a seguranca de quem ja conhece cada planeta do caminho.",
                minValue: 60
            }
        ]
    }
];
