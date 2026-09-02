## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src=img/Buzz_quizz.gif  width="400" />

[Buzz Quizz](https://manudiascruz.github.io/BuzzQuizz/)

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

## 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

## 🛠️ Abrir e rodar o projeto

Após baixar o projeto, você pode abri-lo com o Visual Studio Code. Para isso, na tela de launcher clique em:

- File > Open Folder
- Procure o local onde o projeto está e o selecione (Caso o projeto seja baixado via zip, é necessário extraí-lo antes de procurá-lo)
- Por fim clique em Abrir

Para rodar o projeto você pode utilizar o [Live Server](https://github.com/ritwickdey/vscode-live-server).

---

## BuzzQuizz v2 — branch `buzzquizz-yakh`

### Visão geral

Esta evolução preserva o projeto original em HTML, CSS e JavaScript, a identidade vermelha e o fluxo de criação em três etapas. É possível jogar quizzes em destaque, explorar a comunidade e criar quizzes locais ou publicá-los explicitamente na API pública da Driven. Não há framework nem dependências de execução externas.

### Executar e testar localmente

Requer Node.js 22 ou superior. Não é necessário instalar pacotes.

```sh
git clone https://github.com/ManuDiasCruz/BuzzQuizz.git
cd BuzzQuizz
git switch buzzquizz-yakh
npm start
```

Abra `http://127.0.0.1:8000/`. Pare o servidor com Ctrl+C. Não abra o HTML via `file://`: use HTTP para comportamento consistente de armazenamento e APIs. O Live Server continua sendo uma alternativa.

```sh
npm test
npm run build
```

Os testes usam o executor nativo do Node. O build copia somente 18 arquivos públicos necessários para `dist/`, incluindo sete fotos locais; não publica `.git`, testes, credenciais, arquivos locais ou o GIF de demonstração antigo. `dist/` é ignorado pelo Git.

### Melhorias adicionadas na v2

- Pontuação correta de 0 a 100%, escolha do maior nível compatível e reinício sem acumular acertos.
- Uma resposta por pergunta, feedback textual além da cor, navegação consistente e cancelamento de respostas de rede/rolagens obsoletas.
- Objetos independentes para perguntas, respostas e níveis; validação de todos os cartões, inclusive os recolhidos.
- Validação mantém os campos, verifica pares texto/imagem, limites inteiros, respostas únicas e níveis distintos com pelo menos um mínimo de 0%.
- A tela de sucesso só aparece após salvar; falhas mantêm os dados, e cliques repetidos não duplicam requisições.
- Armazenamento sob `buzzquizz:v2:quizzes`; leitura defensiva de quizzes legados válidos, sem alterar dados de outras aplicações.
- Textos externos escapados; URLs de imagens limitadas a HTTPS; nenhum token de propriedade da API é copiado para novos registros locais.
- Três quizzes em destaque, com sete fotografias Pixabay locais, imagens sem distorção, carregamento sob demanda e fallback para links quebrados.
- Layout responsivo, botões acessíveis por teclado, rótulos permanentes, foco visível, contraste das perguntas e respeito a movimento reduzido.
- Busca e carregamento progressivo da comunidade; conteúdo local permanece jogável quando a API falha.
- Removidas marcações HTML duplicadas, exemplos mortos, links de imagens de origem não verificada e dependências CDN de Axios/ícones/fontes.

### Imagens e segurança

Veja [fontes e licenças das imagens](img/IMAGE_CREDITS.md). As fotos Pixabay são usadas como parte dos quizzes, não como distribuição avulsa de imagens. As fotos de terceiros nos quizzes públicos não são copiadas para o repositório e podem desaparecer. Evite incluir informações pessoais em quizzes publicados.

A opção **Publicar também na comunidade** é desmarcada por padrão. Sem ela, os quizzes ficam apenas neste navegador: não são sincronizados e são perdidos se os dados do site forem apagados. Com ela, os textos e URLs são enviados à API pública `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes`. Publicação não equivale a uma conta com propriedade verificável.

### Implantação no GitHub Pages

- Site original: [BuzzQuizz](https://manudiascruz.github.io/BuzzQuizz/), preservado.
- Endereço solicitado para a v2: [BuzzQuizzYakh](https://manudiascruz.github.io/BuzzQuizzYakh/).
- **Status em 2026-09-02: v2 implantada e verificada.** O build estático é publicado pelo repositório público [ManuDiasCruz/BuzzQuizzYakh](https://github.com/ManuDiasCruz/BuzzQuizzYakh), a partir de `main` e `/(root)`. O build do Pages terminou sem erros e o fluxo de jogo foi validado no endereço público.

O workflow [Quiz checks](.github/workflows/ci.yml) executa os testes e o build em pushes desta branch e pull requests para `main`. Ele disponibiliza o artefato `buzzquizz-yakh-pages`, mas não altera a configuração do site original.

Para publicar uma nova versão:

1. Execute `npm test` e `npm run build`, ou baixe o artefato da execução correspondente ao commit aprovado.
2. Em uma cópia separada do repositório de publicação `ManuDiasCruz/BuzzQuizzYakh`, substitua apenas o conteúdo publicado pelo conteúdo de `dist/`, inclusive `.nojekyll`. Não copie o checkout de desenvolvimento inteiro.
3. Compare os arquivos ou hashes, revise o diff e faça um commit sem force-push em `main`.
4. Confirme em **Settings → Pages** que a origem permanece **Deploy from a branch**, `main` e `/(root)`. O site original não precisa ser renomeado nem reconfigurado.
5. Aguarde o build do Pages e verifique `https://manudiascruz.github.io/BuzzQuizzYakh/`: capas, perguntas, resultado, reinício, criação local, recarga e visualização móvel. Todos os caminhos de assets são relativos e funcionam sob esse subdiretório.
6. Não sobrescreva alterações desconhecidas no destino; investigue qualquer divergência antes de atualizar a publicação.

Referências: [configurar a origem de publicação](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) e [endereços do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

### Verificação e limitações conhecidas

Veja [o relatório de testes](docs/TESTING.md). A suíte cobre regras e funções reais da aplicação com respostas simuladas para publicação. Testes não criam conteúdo de teste na API pública.

- A API de demonstração é compartilhada e não moderada; sua disponibilidade, persistência e conteúdo não são garantidos.
- Imagens externas exigem rede e podem bloquear acesso. Os quizzes em destaque não dependem da API, mas não há service worker para reabrir o site totalmente offline.
- Rascunhos sobrevivem à navegação interna, mas não à recarga; exportação/importação, edição e exclusão são melhorias futuras.
- Validação de URL não garante que o destino seja uma imagem ou que seu autor tenha direitos de uso; falhas exibem o placeholder local.
- O placar é calculado no cliente, adequado a entretenimento, não a provas ou avaliações seguras.
- Após um timeout de publicação, o servidor pode ter recebido o quizz: confira a comunidade antes de repetir.
- O repositório de publicação contém apenas o build estático e precisa ser sincronizado manualmente após cada versão aprovada no repositório-fonte.
