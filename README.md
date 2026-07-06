# ⚡ BuzzQuizz

Aplicação front-end para criar, responder e compartilhar quizzes com imagens. O projeto foi construído em HTML, CSS e JavaScript e consome a API pública BuzzQuizz para listar e salvar quizzes da comunidade.

![Demonstração original do BuzzQuizz](img/Buzz_quizz.gif)

## Visão geral

Na home, a pessoa pode explorar quizzes da comunidade, jogar o quiz local em destaque ou iniciar a criação do próprio quiz. Ao responder, cada pergunta revela os acertos e erros; no fim, a pontuação determina o nível alcançado. Os quizzes criados são salvos no servidor e a referência é guardada no `localStorage` deste navegador.

Tecnologias: HTML semântico, CSS responsivo, JavaScript, Axios e GitHub Actions/Pages.

## Como rodar localmente

1. Clone o repositório e acesse a pasta:

   ```bash
   git clone https://github.com/ManuDiasCruz/BuzzQuizz.git
   cd BuzzQuizz
   ```

2. Troque para o branch desta versão:

   ```bash
   git switch buzzquizz-H2H-Yellow
   ```

3. Inicie um servidor HTTP estático. Com Python 3:

   ```bash
   python -m http.server 4173
   ```

4. Abra `http://localhost:4173` no navegador.

O projeto não precisa de instalação para executar. Para rodar os testes automatizados, instale o Node.js 20 ou superior e execute:

```bash
npm test
```

## Melhorias da v2

- Corrige o cálculo de pontuação e a seleção do nível, inclusive nos limites de 0%, 67% e 100%.
- Garante que o resultado apareça depois da última resposta mesmo se as perguntas forem respondidas fora de ordem.
- Reinicia contadores e interface corretamente ao jogar novamente.
- Corrige a rolagem para a próxima pergunta e a marcação visual de respostas certas e erradas.
- Corrige a criação de quizzes: perguntas, respostas e níveis agora usam objetos independentes; todos os painéis precisam estar preenchidos; erros não apagam mais o formulário.
- Corrige a imagem da tela de sucesso e espera o servidor confirmar o salvamento antes de liberar o acesso.
- Protege a renderização de dados remotos, URLs de imagens, cores e entradas de `localStorage` inválidas.
- Mantém um quiz local jogável quando a API da comunidade estiver indisponível.
- Melhora responsividade, foco de teclado, contraste, estados de carregamento e consistência de cartões e botões.
- Adiciona seis imagens locais diversificadas do Pixabay, com fontes documentadas em [img/PIXABAY_CREDITS.md](img/PIXABAY_CREDITS.md).
- Adiciona sete testes de regressão sem dependências de produção.

## Deploy no GitHub Pages

O workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) publica este branch ao receber um `push` e também pode ser executado manualmente na aba **Actions**. Ele precisa das permissões padrão `pages: write` e `id-token: write`; em **Settings → Pages**, a origem deve estar configurada como **GitHub Actions**.

URL do Pages correspondente a este repositório:

- [https://manudiascruz.github.io/BuzzQuizz/](https://manudiascruz.github.io/BuzzQuizz/)

URL solicitada para a versão Yellow:

- [https://manudiascruz.github.io/BuzzQuizzH2HYellow/](https://manudiascruz.github.io/BuzzQuizzH2HYellow/)

> O nome do caminho de um GitHub Pages de projeto é definido pelo nome do repositório. Em 6 de julho de 2026, `ManuDiasCruz/BuzzQuizzH2HYellow` não existe; por isso a segunda URL só poderá ser publicada após criar ou renomear um repositório para `BuzzQuizzH2HYellow` e executar este mesmo workflow nele. O branch e a pull request desta entrega permanecem no repositório solicitado `ManuDiasCruz/BuzzQuizz`.

## Limitações conhecidas e próximos passos

- A API externa é compartilhada e pode ficar lenta ou indisponível; o quiz local mantém apenas a leitura/jogo, não a criação offline.
- A exclusão e edição de quizzes do usuário ainda não foram implementadas.
- Quizzes criados são associados ao navegador pelo `localStorage`, sem conta ou sincronização entre dispositivos.
- Os cartões da comunidade dependem das URLs de imagens enviadas por terceiros; respostas e resultados têm fallback local, mas planos de fundo remotos ainda podem falhar silenciosamente.
- Uma próxima versão pode salvar rascunhos, permitir edição/exclusão, adicionar filtros e implementar testes end-to-end em diferentes navegadores.

## Histórico do projeto original

O BuzzQuizz foi criado para praticar programação em dupla por meio da construção de um site de quizzes. O projeto original usa HTML, CSS e JavaScript e continua disponível no [repositório principal](https://github.com/ManuDiasCruz/BuzzQuizz). A demonstração original foi publicada em [https://manudiascruz.github.io/BuzzQuizz/](https://manudiascruz.github.io/BuzzQuizz/).

Para abrir a versão original pelo Visual Studio Code, selecione **File → Open Folder**, escolha a pasta extraída do projeto e use uma extensão de servidor local como o Live Server.
