# ⚡ BuzzQuizz

Aplicação front-end para criar, publicar e responder quizzes com perguntas ilustradas e níveis de resultado. O projeto foi desenvolvido originalmente para praticar programação em dupla com HTML, CSS e JavaScript e foi evoluído nesta versão sem trocar sua arquitetura principal.

![Demonstração original do BuzzQuizz](img/Buzz_quizz.gif)

## Acesse o projeto

- **Versão v2 (H2H Red):** [https://manudiascruz.github.io/BuzzQuizzH2HRed/](https://manudiascruz.github.io/BuzzQuizzH2HRed/)
- **Versão original:** [https://manudiascruz.github.io/BuzzQuizz/](https://manudiascruz.github.io/BuzzQuizz/)
- **Código-fonte:** [https://github.com/ManuDiasCruz/BuzzQuizz](https://github.com/ManuDiasCruz/BuzzQuizz)

## Visão geral

O BuzzQuizz consome a API pública do projeto Driven para listar quizzes da comunidade. Também permite criar um quiz com título, capa, perguntas, respostas e níveis de pontuação. Os quizzes criados com sucesso são identificados no navegador por meio do `localStorage`.

Tecnologias utilizadas:

- HTML5 semântico;
- CSS responsivo;
- JavaScript sem framework;
- Axios para comunicação com a API;
- Node.js Test Runner para testes unitários;
- GitHub Actions e GitHub Pages para validação e deploy.

## Como executar localmente

Pré-requisitos: Git, um navegador moderno e Python 3. Para executar os testes, use Node.js 20 ou superior.

```bash
git clone https://github.com/ManuDiasCruz/BuzzQuizz.git
cd BuzzQuizz
git switch buzzquizz-H2H-red
python -m http.server 4173
```

Abra [http://localhost:4173](http://localhost:4173) no navegador.

Para rodar os testes unitários:

```bash
npm test
```

Também é possível abrir a pasta no Visual Studio Code e usar a extensão [Live Server](https://github.com/ritwickdey/vscode-live-server), como no fluxo original do projeto.

## Melhorias adicionadas na v2

- Correção do cálculo de pontuação e da seleção do nível alcançado, independentemente da ordem recebida pela API.
- Reinício do quiz com pontuação, respostas e resultado realmente zerados.
- Avanço automático para a próxima pergunta, com feedback visual acessível para acertos e erros.
- Correção da criação de quizzes: respostas, perguntas e níveis agora geram objetos independentes, sem sobrescrever dados anteriores.
- Validação de todos os níveis (não apenas do primeiro), percentuais únicos e exigência de um nível inicial em 0%.
- Tela de sucesso exibida somente após a API confirmar a publicação, preservando a capa informada pelo usuário.
- Leitura segura do `localStorage`, compatível com quizzes legados e sem interpretar dados alheios ao app.
- Cards responsivos, estados de foco, melhor contraste, feedback de carregamento e navegação por botões.
- Quiz editorial “Natureza em foco” e seis imagens locais de alta qualidade para capas, respostas, níveis e fallbacks.
- Fallbacks locais para imagens remotas quebradas e carregamento preguiçoso das imagens da listagem.
- Testes unitários para pontuação, níveis, URLs e embaralhamento.

## Imagens e licença

As novas imagens foram selecionadas na [busca do Pixabay](https://pixabay.com/images/search/) e são usadas conforme a Pixabay Content License. As páginas de origem e os autores estão documentados em [img/PIXABAY_CREDITS.md](img/PIXABAY_CREDITS.md).

## Deploy no GitHub Pages

O workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) executa os testes e publica o site estático no GitHub Pages a cada push para `main` ou `buzzquizz-H2H-red`.

Para reproduzir a configuração em um repositório:

1. Em **Settings → Pages**, selecione **GitHub Actions** como fonte.
2. Envie a branch configurada no workflow ou execute o job manualmente em **Actions**.
3. Aguarde a conclusão do job `test-and-deploy`.
4. Abra a URL informada no ambiente `github-pages` e valide a listagem, uma partida completa e o formulário de criação.

O caminho final do GitHub Pages é derivado do nome do repositório. Para publicar exatamente em `/BuzzQuizzH2HRed/`, o artefato deve ser implantado pelo repositório `ManuDiasCruz/BuzzQuizzH2HRed` (ou por um site de usuário que exponha esse diretório).

## Limitações conhecidas e próximos passos

- A listagem e a publicação dependem da disponibilidade da API externa da Driven.
- Quizzes criados são associados somente ao navegador atual; não há conta de usuário nem sincronização entre dispositivos.
- Imagens fornecidas por usuários continuam sendo URLs externas e podem ficar indisponíveis; a v2 exibe fallbacks, mas não hospeda essas imagens.
- Ainda não existe edição ou exclusão de quizzes criados.
- Testes de interface automatizados e monitoramento de disponibilidade podem ampliar a cobertura atual.

## Acesso ao código original

Você pode [acessar o código-fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixar a branch principal](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip). O GIF e as informações históricas do projeto foram preservados neste README.
