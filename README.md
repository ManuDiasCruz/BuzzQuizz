## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src="img/Buzz_quizz.gif" width="400" />

- Aplicação original: [Buzz Quizz](https://manudiascruz.github.io/BuzzQuizz/)
- Repositório: [ManuDiasCruz/BuzzQuizz](https://github.com/ManuDiasCruz/BuzzQuizz)
- Branch de enriquecimento: `codex-enrichment`

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

O projeto é uma SPA estática que lista quizzes, permite responder perguntas, calcula o resultado por percentual de acerto e também mantém quizzes criados pelo usuário no `localStorage`.

## 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

## 🛠️ Abrir e rodar o projeto

Após baixar o projeto, você pode abri-lo com o Visual Studio Code. Para isso, na tela de launcher clique em:

- File > Open Folder
- Procure o local onde o projeto está e o selecione (Caso o projeto seja baixado via zip, é necessário extraí-lo antes de procurá-lo)
- Por fim clique em Abrir

Para rodar o projeto você pode utilizar o [Live Server](https://github.com/ritwickdey/vscode-live-server).

Também é possível servir os arquivos localmente pelo terminal:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Depois acesse `http://127.0.0.1:8000/` no navegador.

## ✨ Melhorias adicionadas no v2

- Correção da estrutura HTML duplicada no fim do documento.
- Correção do fluxo de respostas para impedir múltiplos cliques na mesma pergunta.
- Cálculo de resultado baseado no percentual real de acertos.
- Seleção correta do nível mais alto compatível com a pontuação final.
- Reinício do quiz sem reaproveitar estado antigo de acertos/respostas.
- Renderização de cards com DOM APIs para evitar colisão entre quizzes do usuário e quizzes da API.
- Leitura mais segura do `localStorage`, ignorando dados que não pertencem ao Buzz Quizz.
- Correção da criação de quizzes para não reutilizar a mesma referência de objeto em perguntas, respostas e níveis.
- Validação mais rígida de URLs e de respostas incorretas incompletas.
- Quiz local em destaque com imagens de melhor qualidade via Pixabay.
- Fallback visual para imagens remotas quebradas ou inválidas.
- Ajustes de layout, corte de imagens, destaque visual de respostas selecionadas e resultado responsivo.

## 🖼️ Imagens

As imagens adicionadas nesta versão usam URLs remotas do Pixabay, sem salvar arquivos grandes no repositório. Fontes pesquisadas:

- [Pixabay - panda](https://pixabay.com/images/search/panda/)
- [Pixabay - bamboo](https://pixabay.com/images/search/bamboo/)
- [Pixabay - quiz](https://pixabay.com/images/search/quiz/)
- [Pixabay Content License Summary](https://pixabay.com/service/license-summary/)

## 🚀 Deploy no GitHub Pages

O GitHub Pages da versão original continua no repositório `BuzzQuizz`:

- [https://manudiascruz.github.io/BuzzQuizz/](https://manudiascruz.github.io/BuzzQuizz/)

A versão enriquecida v3 deve ser publicada no repositório separado `BuzzQuizzv3`:

- [https://manudiascruz.github.io/BuzzQuizzv3/](https://manudiascruz.github.io/BuzzQuizzv3/)

Observação: em GitHub Pages, sites de projeto usam o nome do repositório como caminho público. Por isso, a versão v3 é publicada a partir de um repositório separado chamado `BuzzQuizzv3`, preservando o deploy original em `/BuzzQuizz/`.

Para publicar no GitHub Pages do repositório `BuzzQuizzv3`:

1. Acesse `Settings > Pages` no GitHub.
2. Em `Build and deployment`, escolha `Deploy from a branch`.
3. Selecione a branch `main` e a pasta `/`.
4. Salve e aguarde o status `built`.

## Limitações conhecidas e melhorias futuras

- A lista remota depende da API pública `mock-api.driven.com.br`; se a API estiver fora do ar, apenas o quiz local em destaque será exibido.
- Quizzes criados por outros usuários podem conter imagens quebradas, duplicadas ou de baixa qualidade. A interface tenta aplicar fallback visual, mas os dados remotos continuam externos ao projeto.
- A criação de quizzes ainda depende do servidor remoto para salvar e recuperar o quiz criado.
- A versão original e a versão v3 vivem em repositórios/deploys separados para evitar sobrescrever o site existente.
- Futuras melhorias úteis: testes automatizados com Playwright/Puppeteer, edição/exclusão de quizzes locais, paginação/filtro para a lista remota e migração para `fetch` para remover a dependência externa do Axios CDN.
