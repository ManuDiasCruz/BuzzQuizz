## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src=img/Buzz_quizz.gif  width="400" />

[Buzz Quizz](https://manudiascruz.github.io/BuzzQuizz/) · [Buzz Quizz v2 (deploy desta versão)](https://manudiascruz.github.io/BuzzQuizzv723OH/)

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

## 🔎 Visão geral do projeto

O BuzzQuizz é uma aplicação de página única, escrita em HTML, CSS e JavaScript puro
(sem build e sem dependências além do [axios](https://axios-http.com/), carregado por CDN).
Ela tem três fluxos principais:

1. **Listagem** — mostra os quizzes criados por você (guardados no `localStorage` do
   navegador) e todos os quizzes publicados na API pública do bootcamp.
2. **Responder um quizz** — as alternativas de cada pergunta são embaralhadas, o
   acerto/erro é destacado na hora e, ao final, o percentual de acerto define o nível
   alcançado.
3. **Criar um quizz** — formulário em quatro etapas (dados básicos → perguntas →
   níveis → sucesso) que publica o quizz na API.

Estrutura de arquivos:

```
├── index.html              # marcação das telas
├── css/
│   ├── reset.css           # reset de estilos
│   ├── styleMobile.css     # estilo base (mobile first) + tokens em :root
│   └── styleDesktop.css    # ajustes para telas >= 600px
├── img/
│   ├── quizzes/            # imagens locais (Pixabay) + CREDITS.md
│   └── *.png / *.gif       # ícones e gif do README
└── src/
    ├── quizzesDemo.js      # quizzes de demonstração (fallback offline)
    └── script.js           # toda a lógica da aplicação
```

A API usada é a mock pública do bootcamp:
`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes`.

## 💻 Rodando localmente

Não há dependências para instalar. Como o `index.html` carrega arquivos por caminho
relativo e faz requisições HTTP, é preciso servir a pasta por HTTP (abrir o arquivo
com `file://` funciona parcialmente, mas não é recomendado).

Clone o repositório e entre na branch desejada:

```bash
git clone https://github.com/ManuDiasCruz/BuzzQuizz.git
```

Depois suba um servidor estático na raiz do projeto. Com Python (já instalado na
maioria dos sistemas):

```bash
python -m http.server 5731
```

Ou com Node:

```bash
npx serve .
```

E abra `http://localhost:5731` no navegador. No VS Code, a extensão
[Live Server](https://github.com/ritwickdey/vscode-live-server) também funciona:
clique em **Go Live**.

## ✨ Melhorias da v2

### Bugs corrigidos

| # | Problema | Correção |
| --- | --- | --- |
| 1 | Ao **reiniciar um quizz** o placar não era zerado: o percentual passava de 100% e a tela de resultado nunca mais aparecia. | Placar reiniciado no começo de cada partida. |
| 2 | O **nível do resultado** era escolhido somando os `minValue` de todos os níveis e usando a variável de controle do laço como índice — 33% de acerto recebia o nível de 50%. | O nível passa a ser o de maior `minValue` menor ou igual ao percentual obtido, independentemente da ordem em que os níveis vêm da API. |
| 3 | Quem **errava todas** as perguntas recebia o nível de índice 0, que nem sempre é o nível de 0%. | Fallback para o nível de menor `minValue`. |
| 4 | Ao responder, a página rolava para a **próxima alternativa da mesma pergunta** e lançava `Cannot read properties of null (reading 'scrollIntoView')` em todo quizz com menos alternativas do que perguntas. | Rola suavemente para a próxima pergunta ainda sem resposta. |
| 5 | Vários `setTimeout` redundantes chamavam a tela de resultado **mais de uma vez** por pergunta. | Um único agendamento por resposta. |
| 6 | Na **criação de quizz**, os objetos `question`, `answer` e `level` eram singletons globais mutados e devolvidos: todas as perguntas, respostas e níveis ficavam iguais ao último preenchido e a resposta correta era perdida — o quizz criado era impossível de acertar. | Cada pergunta, resposta e nível passa a ser um objeto novo. |
| 7 | A **imagem de capa** escolhida pelo usuário era sobrescrita por uma URL fixa e quebrada, e o degradê era atribuído a `figure.background` (propriedade inexistente) em vez de `figure.style.backgroundImage`. | A capa do usuário é preservada e aplicada corretamente. |
| 8 | `minValue` era enviado à API como **string**. | Enviado como número. |
| 9 | O título do quizz validava o mínimo de 20 caracteres, mas **não o máximo de 65**. | Validação de 20 a 65 caracteres. |
| 10 | "Meus quizzes" eram gravados **uma chave de `localStorage` por quizz**; qualquer outra chave no domínio quebrava a leitura, e a lista duplicava itens a cada navegação. | Uma única chave com namespace (`buzzquizz:meus-quizzes`), com migração automática dos dados antigos. |
| 11 | As duas listagens usavam as **mesmas classes** (`.quizz0`, `.quizz1`, …): o card de "Seus Quizzes" recebia a imagem do card de "Todos os Quizzes", que ficava sem imagem. | Cards renderizados via DOM, sem classes indexadas. |
| 12 | Voltar para a home só re-renderizava a lista quando havia **exatamente 1** quizz salvo. | A home é sempre re-renderizada. |
| 13 | `index.html` tinha `</div>`, `</body>` e `</html>` **duplicados**, com as tags `<script>` fora do `<body>`, `meta viewport` repetida e uma `div` não fechada. | Marcação corrigida. |
| 14 | Botões chamavam `entrarQuizz()` (função inexistente) e `validarDadosNivel()` (validação usada como handler de submissão). | Handlers mortos removidos junto com a marcação de placeholder. |
| 15 | No CSS de desktop, `.fim.resultado .conteudo-reultado` (sem espaço) **nunca casava** com nenhum elemento, então o resultado ficava sempre em coluna. | Seletor corrigido e classe renomeada para `.conteudo-resultado`. |

### UI / UX

- **Avisos não bloqueantes** substituem os `alert()` da primeira versão, com mensagens
  específicas por campo em vez de um único texto genérico.
- **Indicador de carregamento** durante as chamadas à API.
- **Contador de progresso** ("2 de 3 perguntas respondidas") no cabeçalho do quizz.
- **Busca por título** na lista "Todos os Quizzes" — útil porque a API é pública e
  compartilhada, com muitos quizzes de teste de outras pessoas.
- **Remover quizz da minha lista**, usando o ícone `img/deletar-branco.png` que já
  existia no repositório e nunca havia sido ligado a nada.
- **Botão de voltar para a home** no cabeçalho; voltar não recarrega mais a página.
- **Acessibilidade**: alternativas e cards passaram a ser `<button>` (navegáveis por
  teclado), com `aria-label`, foco visível, `aria-live` nos avisos e feedback de
  acerto/erro por borda além da cor.
- **Consistência visual**: cores, raios e sombras centralizados em custom properties;
  alturas fixas que cortavam conteúdo agora são automáticas; `background-size: cover`
  no lugar de `100%`; estados de hover em cards e botões.
- **Segurança**: os textos vindos da API pública são escapados antes de entrar no
  `innerHTML`.

### Imagens

- **19 novas imagens locais** em `img/quizzes/`, obtidas no
  [Pixabay](https://pixabay.com/images/search/) sob a
  [Pixabay Content License](https://pixabay.com/service/license-summary/) (uso livre,
  sem atribuição obrigatória). A origem de cada arquivo está em
  [`img/quizzes/CREDITS.md`](img/quizzes/CREDITS.md).
- **Fallback de imagem**: imagens quebradas (muito comuns nos quizzes públicos) caem
  para `img/quizzes/placeholder.jpg` em vez de mostrar o ícone de imagem quebrada —
  isso vale para as alternativas, para o resultado e para as capas dos cards.
- **Duplicação removida**: as 12 repetições de `img/pandavermelho.jpg` no HTML e os
  fundos fixos dessa mesma imagem no CSS foram substituídos.
- **Dois quizzes de demonstração** (`src/quizzesDemo.js`) com imagens locais de
  natureza e do sistema solar, exibidos automaticamente quando a API pública está
  fora do ar — antes a home simplesmente ficava vazia.

## 🚀 Deploy

Esta versão está publicada em:

### 👉 https://manudiascruz.github.io/BuzzQuizzv723OH/

O projeto é estático, então o deploy é o próprio conteúdo da branch. Para publicar
uma nova versão:

1. Envie o conteúdo do projeto para a branch `main` do repositório de deploy
   (`ManuDiasCruz/BuzzQuizzv723OH`):

   ```bash
   git push deploy 723-oh-bq:main
   ```

2. Habilite (ou confirme) o GitHub Pages apontando para a branch `main`, pasta `/`
   (root):

   ```bash
   gh api -X POST repos/ManuDiasCruz/BuzzQuizzv723OH/pages -f "source[branch]=main" -f "source[path]=/"
   ```

   Pela interface: **Settings → Pages → Build and deployment → Deploy from a branch →
   main / (root)**.

3. Aguarde o build (normalmente menos de um minuto) e acesse a URL acima. O status
   pode ser conferido com:

   ```bash
   gh api repos/ManuDiasCruz/BuzzQuizzv723OH/pages/builds/latest
   ```

> Todos os caminhos do projeto são relativos (`css/…`, `img/…`, `src/…`), então a
> aplicação funciona tanto na raiz de um domínio quanto em um subdiretório do GitHub
> Pages.

## ⚠️ Limitações conhecidas e próximos passos

- **A API é pública e compartilhada.** A lista "Todos os Quizzes" traz muitos quizzes
  de teste criados por outras pessoas, alguns com imagens quebradas e títulos como
  "Test Quiz 123". O fallback de imagem e a busca por título amenizam o problema, mas
  não há como filtrar conteúdo de terceiros na origem.
- **Não há autenticação.** A relação "meus quizzes" vive no `localStorage`: limpar os
  dados do navegador ou trocar de dispositivo faz a lista desaparecer, mesmo que os
  quizzes continuem publicados na API.
- **Não é possível editar ou excluir um quizz publicado.** O ícone de remover apaga
  apenas a referência local; a API mock não expõe as operações de edição/exclusão sem
  a chave do quizz. O ícone `img/editar-branco.png` continua sem uso.
- **Sem testes automatizados.** As correções desta versão foram validadas manualmente
  no navegador (fluxo de responder, reiniciar, criar quizz, fallback offline e
  migração do `localStorage`).
- **Textos em pt-BR sem acentuação em parte do código.** Comentários e mensagens
  novas foram escritos sem acentos para evitar problemas de encoding entre editores;
  a interface em si mantém a acentuação.
- **Ideias para as próximas versões:** paginação ou rolagem infinita na lista de
  quizzes, edição de quizzes criados, tema escuro, animações de transição entre
  telas, e uma suíte de testes end-to-end cobrindo os três fluxos principais.
