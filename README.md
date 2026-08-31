## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src=img/Buzz_quizz.gif  width="400" />

[Buzz Quizz](https://manudiascruz.github.io/BuzzQuizz/)

[Buzz Quizz v2 (deploy desta branch)](https://manudiascruz.github.io/BuzzQuizzOeh/)

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

## 🔎 Visão geral do projeto

O BuzzQuizz é uma SPA sem build e sem dependências de pacote: HTML, CSS e JavaScript puro,
com [axios](https://axios-http.com/) carregado por CDN e os dados persistidos na API pública
`https://mock-api.driven.com.br/api/v4/buzzquizz`.

Estrutura dos arquivos:

| Caminho | Papel |
| --- | --- |
| `index.html` | Casca da aplicação; todas as telas vivem no mesmo documento e são alternadas por `display`. |
| `src/script.js` | Toda a lógica: listagem, criação de quizz, resposta às perguntas e cálculo do resultado. |
| `css/reset.css` | Reset de estilos. |
| `css/styleMobile.css` | Estilos base (mobile first). |
| `css/styleDesktop.css` | Ajustes para telas maiores. |
| `img/` | Ícones da interface e imagens locais (fallback, capa e placeholder). |

Fluxos principais:

1. **Home** — lista "Seus Quizzes" (lidos do `localStorage`) e "Todos os Quizzes" (lidos da API).
2. **Criação** — 4 telas: dados básicos → perguntas → níveis → sucesso (com `POST` na API).
3. **Resposta** — as respostas de cada pergunta são embaralhadas, o usuário escolhe uma por
   pergunta e, ao final, vê o percentual de acerto e o nível alcançado.

## 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

## 🛠️ Abrir e rodar o projeto

Após baixar o projeto, você pode abri-lo com o Visual Studio Code. Para isso, na tela de launcher clique em:

- File > Open Folder
- Procure o local onde o projeto está e o selecione (Caso o projeto seja baixado via zip, é necessário extraí-lo antes de procurá-lo)
- Por fim clique em Abrir

Para rodar o projeto você pode utilizar o [Live Server](https://github.com/ritwickdey/vscode-live-server).

### Rodando por linha de comando

Não há etapa de build nem `npm install`. Basta servir a pasta por HTTP — abrir o
`index.html` direto pelo `file://` faz o navegador bloquear as chamadas à API.

```bash
git clone https://github.com/ManuDiasCruz/BuzzQuizz.git
```

```bash
cd BuzzQuizz && git checkout buzzquizz-oeh
```

```bash
python -m http.server 8899
```

Depois abra `http://localhost:8899` no navegador. Qualquer servidor estático funciona
(`npx serve`, `php -S localhost:8899`, Live Server etc.).

## ✨ Melhorias da v2

### Bugs corrigidos

- **Resultado do quizz invertido.** O percentual era calculado somando os `minValue`
  dos níveis (e o total acumulava entre chamadas), e a busca do nível usava `<=` a
  partir do nível mais alto. Na prática, acertar 3 de 3 devolvia o nível mais baixo e
  acertar 0 de 3 devolvia o mais alto. Agora o percentual é `acertos / perguntas` e o
  nível é o de maior `minValue` que o usuário atinge, com os níveis ordenados antes da
  comparação (a API devolve em ordem arbitrária).
- **Todas as perguntas, respostas e níveis do quizz criado saíam iguais.**
  `montarNovaResposta`, `montarNovaPergunta` e `montarNovoNivel` mutavam e devolviam
  sempre o *mesmo* objeto global, então o array final continha N referências ao último
  item preenchido. Passaram a devolver objetos novos.
- **Capa de todo quizz criado ia quebrada para o servidor.** A tela de sucesso
  sobrescrevia `quizz.image` por uma URL truncada (`…-family-...jpg`, HTTP 400) *antes*
  do `POST`. O trecho foi removido e a imagem escolhida pelo usuário é preservada.
- **Reiniciar um quizz mantinha o placar antigo**, porque os contadores globais nunca
  eram zerados. Agora `abrirQuizz` reinicia todo o estado da rodada.
- **Capa aplicada no cartão errado na home.** "Seus Quizzes" e "Todos os Quizzes" geravam
  as mesmas classes (`.quizz0`, `.quizz1`, ...) e o `querySelector` pegava sempre o
  primeiro match. Cada lista passou a ter prefixo próprio.
- **Colisão de ids em quizzes grandes.** As respostas usavam `pergunta${x}${y}`, então
  pergunta 1/resposta 2 colidia com pergunta 12 em quizzes com 10+ itens. Passou a
  usar `pergunta-${x}-${y}`.
- **Só o primeiro nível era validado**: `validarDadosNivel` ignorava o parâmetro
  recebido e lia sempre o primeiro `.nivel` da tela.
- **Erro de validação apagava o trabalho do usuário**: um nível inválido chamava
  `location.reload()` e as perguntas remontavam a tela do zero. Agora a validação apenas
  interrompe o envio e mantém o que foi digitado.
- **Um `localStorage` com qualquer chave de terceiros derrubava a home**, porque
  `JSON.parse` era chamado sem tratamento. Chaves inválidas passam a ser ignoradas.
- **A home voltava vazia a partir do segundo quizz criado** (`voltarInicio` só
  redesenhava a lista quando havia exatamente 1 quizz salvo).
- **HTML inválido**: `</div>` órfão e um segundo par `</body></html>` deixavam as tags
  `<script>` fora do documento; `<div class="quizzes-criados">` não era fechada; havia
  `<meta viewport>` duplicado.
- Correções menores: a mesma pergunta podia ser respondida várias vezes, o resultado era
  montado mais de uma vez, o `figure` da tela de sucesso usava `.background` (propriedade
  inexistente) em vez de `.style.backgroundImage`, `minValue` era enviado como string, e
  o título do quizz não tinha o máximo de 65 caracteres validado.

### UI/UX

- A resposta escolhida agora fica destacada (a classe `.escolhida` era aplicada pelo JS
  mas não existia no CSS).
- A rolagem automática leva para a **próxima pergunta sem resposta**, não para uma
  resposta da pergunta atual.
- Imagens de resposta e de resultado com `object-fit: cover` — antes altura fixa +
  `width: 100%` distorcia qualquer foto fora da proporção esperada.
- Estado de carregamento na lista de quizzes, e falha de rede mostra aviso na própria
  página em vez de um `alert` bloqueante.
- Os erros da tela de dados básicos foram agrupados em um único aviso (eram até 4
  `alert`s em sequência).
- Placar textual ("Você acertou X de Y perguntas") junto do nível no resultado.
- `hover`/transição nos cartões e `:focus-visible` em botões, inputs e ícones.

### Imagens

- Todos os hotlinks de terceiros dos dados de exemplo foram substituídos por **22 imagens
  do [Pixabay](https://pixabay.com/images/search/)**, sob a Pixabay Content License (uso
  livre, sem exigência de atribuição). Entre os removidos havia links mortos
  (`gpabrasil.com.br`, sem resposta), uma URL truncada com HTTP 400, uma miniatura de
  236 px do Pinterest e fotos fora de contexto (piso vinílico, catálogo de tintas).
- Foram adicionados **dois quizzes de exemplo** ("Qual panda fofinho você é?" e
  "Quanto você conhece do nosso Sistema Solar?") com imagens coerentes por tema.
- `img/quizz-placeholder.jpg` passou a ser o **fallback local**: qualquer capa ou
  resposta com link morto cai nela (`onerror` + segunda `url()` no `background-image`)
  em vez de exibir ícone de imagem quebrada — importante porque a API é pública e está
  cheia de quizzes de terceiros com links já expirados.
- O markup estático removido do `index.html` repetia 12 vezes a mesma imagem local.

### Qualidade de código

- `createQuizz()` (código morto de ~65 linhas) removido, junto de variáveis não usadas
  (`numeronoarray`, `existeQuizzUsuario`, objetos-template globais).
- Globais implícitas (`identificador`, `quizzescolhido`, ...) passaram a ser declaradas.
- `abrirQuizz` monta o HTML em uma única atribuição de `innerHTML`, em vez de `+=`
  dentro de laços aninhados.
- `embaralhaLista` usa Fisher-Yates em vez de `sort(() => Math.random() - 0.5)`.
- `console.log` de debug removido; mensagens de erro passam a ler `error.response`
  (`error.data` era sempre `undefined`).

> A arquitetura original foi mantida de propósito: segue sendo JS puro, sem build, com as
> mesmas telas e o mesmo `data-identifier` esperado pelos testes do projeto.

## 🚀 Deploy

A v2 está publicada em **<https://manudiascruz.github.io/BuzzQuizzOeh/>**.

O deploy é um site estático servido pelo GitHub Pages a partir da raiz de um branch.
Para republicar:

```bash
git checkout buzzquizz-oeh && git push origin buzzquizz-oeh
```

Para publicar em um repositório de Pages dedicado (foi o caminho usado aqui, já que o
Pages do repositório principal serve a `main` em `/BuzzQuizz/`):

```bash
gh repo create BuzzQuizzOeh --public --source . --push
```

```bash
gh api -X POST repos/ManuDiasCruz/BuzzQuizzOeh/pages -f "source[branch]=main" -f "source[path]=/"
```

Como não há etapa de build, o conteúdo do branch é exatamente o que vai ao ar; a
propagação leva de um a dois minutos após o push.

## ⚠️ Limitações conhecidas e próximos passos

- **A API é pública e compartilhada.** "Todos os Quizzes" traz quizzes de qualquer
  pessoa, muitos com imagens já fora do ar. O fallback local ameniza o efeito visual,
  mas não há como corrigir os dados de terceiros.
- **"Seus Quizzes" vive só no `localStorage`.** Trocar de navegador ou limpar os dados do
  site faz o usuário perder a lista (os quizzes continuam no servidor).
- **Não há editar nem excluir quizz.** `img/editar-branco.png` e `img/deletar-branco.png`
  estão no repositório mas ainda não são usados; a API exige a `key` devolvida na criação,
  que hoje não é guardada.
- **Validação ainda em `alert()`.** Funciona, mas o ideal seria mensagem inline por campo.
- **Sem testes automatizados.** As verificações desta branch foram feitas manualmente e
  por script no console do navegador.
- **`img/Buzz_quizz.gif` tem ~9 MB** e é baixado por quem abre o README no GitHub;
  vale comprimir ou trocar por vídeo/screenshot.
- Outras melhorias sugeridas estão registradas como
  [issues do repositório](https://github.com/ManuDiasCruz/BuzzQuizz/issues).
