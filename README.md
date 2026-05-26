## ⚡️ Buzz Quizz

Aplicação front-end que simula um site de quizzes.

<img src=img/Buzz_quizz.gif width="400" />

[Buzz Quizz original](https://manudiascruz.github.io/BuzzQuizz/)

## 📝 Sobre

O projeto original foi feito para treinar programação em dupla usando HTML, CSS e Javascript. Esta branch `v2-mce-task003-qb` preserva a estrutura da aplicação e melhora os fluxos principais sem reescrever o projeto inteiro.

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

## Visão geral do projeto

O app lista quizzes públicos vindos da API Driven, mostra quizzes criados pelo usuário a partir do `localStorage`, permite responder perguntas com imagens e também oferece um fluxo simples para criar novos quizzes.

Para a v2 foram adicionados quizzes em destaque com imagens públicas do Pixabay, escolhidas a partir da busca do próprio site e usadas por URL pública, o que deixa a aplicação utilizável mesmo quando a API estiver lenta ou indisponível.

## Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

## Rodando localmente

1. Abra a pasta do projeto no Visual Studio Code.
2. Use o Live Server ou rode um servidor estático simples, por exemplo:

```bash
python3 -m http.server 8000
```

3. Acesse `http://localhost:8000`.

Também funciona abrindo o projeto com a extensão [Live Server](https://github.com/ritwickdey/vscode-live-server).

## Melhorias da v2

- Cálculo de pontuação e seleção de nível corrigidos.
- Navegação entre perguntas corrigida depois da resposta.
- Reinício do quiz e retorno à home mais consistentes.
- Renderização de quizzes locais sem colisão de classes.
- `localStorage` filtrado para ler apenas dados do próprio BuzzQuizz.
- Builder de quizzes corrigido para criar objetos independentes, exigir todas as perguntas/níveis e manter o que já foi preenchido quando existe erro.
- Tela de sucesso corrigida para usar a imagem do quiz criado.
- Dois quizzes em destaque com imagens públicas do Pixabay e fallback quando a API não responde.
- Ajustes de HTML/CSS para cartões, imagens, resultado e mensagens de status.

## Deploy

A branch usada para esta entrega é `v2-mce-task003-qb`.

Para publicar no GitHub Pages, configure a origem do Pages para a branch `v2-mce-task003-qb` e a pasta `/`.

[Deployment da v2](https://manudiascruz.github.io/v2-mce-task003-qb/)

## Limitações e próximos passos

- A API Driven continua sendo uma dependência externa para listar quizzes públicos e enviar quizzes criados.
- As imagens do Pixabay são carregadas por URL pública externa; para um produto maior, valeria a pena versionar assets aprovados ou usar um CDN controlado.
- O builder ainda pode evoluir com edição inline, drag and drop de níveis e feedback visual sem `alert`.
