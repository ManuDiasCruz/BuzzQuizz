## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src=img/Buzz_quizz.gif  width="400" />

[Buzz Quizz](https://manudiascruz.github.io/BuzzQuizz/) · [Buzz Quizz v2 (deploy desta branch)](https://manudiascruz.github.io/BuzzQuizzv723OEH/)

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

## 🔎 Visão geral do projeto

O BuzzQuizz é uma aplicação de página única, sem build e sem dependências
instaladas: o navegador carrega `index.html`, dois arquivos de CSS e dois de
JavaScript. Os quizzes são lidos e publicados na
[mock API da Driven](https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes)
via [axios](https://axios-http.com/) (carregado por CDN), e os quizzes criados
pela pessoa ficam no `localStorage` do navegador.

```
index.html            estrutura das 3 telas (home, quizz, criação em 4 passos)
css/reset.css         reset básico
css/styleMobile.css   estilo base (mobile first)
css/styleDesktop.css  ajustes a partir de 600px
src/images.js         catálogo de imagens do Pixabay + fallback de imagem
src/script.js         toda a lógica: listagem, partida, criação e validações
img/placeholders/     imagens locais usadas quando uma URL está vazia ou quebrada
img/CREDITS.md        licenças e créditos das imagens
```

Fluxos principais:

1. **Home** — lista "Todos os Quizzes" (API) e "Seus Quizzes" (`localStorage`).
2. **Partida** — perguntas na ordem original, respostas embaralhadas, avanço
   automático depois de 2 s e tela de resultado com o nível alcançado.
3. **Criação** — 4 telas: dados básicos → perguntas → níveis → sucesso.

## 🛠️ Abrir e rodar o projeto

Após baixar o projeto, você pode abri-lo com o Visual Studio Code. Para isso, na tela de launcher clique em:

- File > Open Folder
- Procure o local onde o projeto está e o selecione (Caso o projeto seja baixado via zip, é necessário extraí-lo antes de procurá-lo)
- Por fim clique em Abrir

Para rodar o projeto você pode utilizar o [Live Server](https://github.com/ritwickdey/vscode-live-server).

### Rodando pelo terminal

Não existe passo de instalação nem de build. Basta servir a pasta por HTTP —
abrir o `index.html` direto pelo `file://` faz o navegador bloquear as chamadas
à API.

```bash
git clone https://github.com/ManuDiasCruz/BuzzQuizz.git
```

```bash
cd BuzzQuizz && python -m http.server 5599
```

Depois acesse `http://localhost:5599`. Qualquer servidor estático serve
(`npx serve`, `php -S localhost:5599`, Live Server etc.).

## ✨ Melhorias da v2

Branch: `723-oeh-bq`.

### Bugs corrigidos

**Respondendo o quizz**

- O nível do resultado era escolhido com a comparação invertida: num quizz com
  níveis de 0%, 50% e 80%, acertar 25% mostrava o nível de 50% e acertar 75%
  mostrava o de 80%. Agora vale o maior `minValue` menor ou igual ao percentual.
- O percentual era calculado dividindo pela soma dos `minValue` dos níveis, o
  que dava `NaN` quando todos eram 0%, e só era recalculado quando a resposta
  estava certa.
- Os contadores de acerto eram variáveis globais nunca zeradas: "Reiniciar
  Quizz" começava com a pontuação da partida anterior e podia pular direto para
  o resultado.
- O avanço para a próxima pergunta ficava dentro do laço das respostas e usava o
  índice da resposta como se fosse o da pergunta: rolava para outra resposta da
  mesma pergunta e chamava a tela de resultado várias vezes (ou antes da hora).
- Era possível pontuar duas vezes na mesma pergunta.

**Criando um quizz**

- Os construtores de resposta, pergunta e nível devolviam sempre o mesmo objeto
  global, então **todas** as respostas, perguntas e níveis do quizz publicado
  terminavam idênticas à última preenchida.
- A imagem escolhida para o quizz era sobrescrita por uma URL do Pixabay
  truncada (com um `…` no meio), e essa URL quebrada era enviada à API.
- A figura da tela de sucesso nunca aparecia: o código escrevia em
  `elemento.background` em vez de `elemento.style.background`.
- A validação de nível ignorava o argumento e relia sempre o primeiro nível da
  página, então os níveis 2 em diante nunca eram validados.
- `minValue` era enviado à API como texto, não como número.
- Um erro de validação remontava a tela de perguntas ou dava
  `document.location.reload(true)` na de níveis, jogando fora tudo o que havia
  sido digitado.
- O título do nível exigia 10 caracteres, mas a marcação anunciava 5.

**Home, marcação e persistência**

- `<div class="quizzes-criados">` ficava aberta e engolia a seção seguinte;
  havia `</body></html>` duplicado, uma `</div>` órfã depois do `</html>`, os
  `<script>` fora do documento e duas metas `viewport`.
- `onclick="entrarQuizz()"` chamava uma função que nunca existiu.
- Os cartões das duas listas usavam as mesmas classes `.quizz0..N`, então a capa
  de um quizz vazava para o outro.
- "Seus Quizzes" duplicava os cartões a cada volta para a home.
- A home exibia ao mesmo tempo "você não criou nenhum quizz ainda" e a seção
  "Seus Quizzes".
- Os quizzes criados eram gravados um por `id` na raiz do `localStorage` e a
  leitura percorria **todas** as chaves da origem, corrompendo qualquer outro
  dado do mesmo domínio. Agora tudo vive em `buzzquizz:meus-quizzes`, com
  migração automática dos registros antigos.

**Seletores de CSS que nunca aplicavam**

- `.fim.resultado .conteudo-reultado span` (faltava o espaço de descendente) e
  `.fim .button p` (classe inexistente).
- O desktop estilizava `.resposta span`, mas o texto da resposta é renderizado
  em `<h4>`.
- `.cria-niveis button` e `.cria-perguntas button` aplicavam margens de 136px e
  61px a qualquer botão dentro da tela.

### UI/UX

- Erros de validação aparecem em lista na própria tela, acima do botão, sem
  apagar o que já foi digitado — antes eram `alert()` em sequência.
- Faixa de aviso no lugar dos `alert()` de sucesso e de falha de rede.
- Cartões e respostas respondem ao teclado (`Tab`, `Enter`, espaço), têm estado
  de foco visível, `cursor: pointer` e `aria-label`.
- A resposta escolhida ganha destaque; o texto de cada opção fica verde ou
  vermelho conforme o gabarito.
- Rolagem suave entre perguntas e para o resultado.
- Alturas fixas (825px na pergunta, 439px no nível) viraram automáticas — antes
  o conteúdo era cortado quando um campo crescia.
- Rótulo no seletor de cor, dica sobre o nível obrigatório de 0%, botão de envio
  desabilitado durante o POST, `<figcaption>` com o título na tela de sucesso.
- Barra de rolagem horizontal em "Seus Quizzes" só aparece quando é necessária.
- Paleta unificada em variáveis CSS (o ícone de "+" usava `red` puro, diferente
  do vermelho do header).

### Imagens

- 4 imagens do Pixabay versionadas em `img/placeholders/` (~88 KB no total)
  substituem a `pandavermelho.jpg`, que era o plano de fundo de todos os
  cartões, do banner e dos "meus quizzes" ao mesmo tempo.
- Fallback automático: qualquer imagem que falhe ao carregar é trocada pelo
  placeholder do seu tipo, em vez de mostrar o ícone de imagem quebrada.
- Botões **"Sugerir imagem"** ao lado de cada campo de URL, com um catálogo de
  31 fotos do Pixabay divididas em 5 temas (animais, natureza, ciência, cultura,
  diversão).
- O quizz de demonstração deixou de apontar para fotos hospedadas em sites
  comerciais de terceiros (duas delas já fora do ar, outras em 236px) e passou a
  usar imagens do Pixabay em 640px.
- `img/favicon.svg`: a aba do navegador não tinha ícone.
- Licenças e créditos registrados em [img/CREDITS.md](img/CREDITS.md).

### Qualidade de código

- Código morto removido (`createQuizz`, `getMeuQuizzLocal`,
  `getMeuUltimoQuizzLocal`, `existeQuizzUsuario`, `numeronoarray`) e o
  `console.log` esquecido em `getAllQuizz`.
- Fim das variáveis globais implícitas; constantes nomeadas para os limites de
  validação e para a URL da API.
- Títulos e textos vindos da API passam por escape antes de entrar em
  `innerHTML`, e os cliques usam delegação de evento em vez de `onclick`
  montado por interpolação de string.
- Embaralhamento das respostas com Fisher-Yates, no lugar de
  `sort(() => Math.random() - 0.5)`.
- Quizz de demonstração local quando a API não responde.

## 🚀 Deploy

A versão v2 está publicada em
**https://manudiascruz.github.io/BuzzQuizzv723OEH/**.

O projeto é estático, então o deploy é a própria branch servida pelo GitHub
Pages. Para publicar em um repositório novo:

```bash
gh repo create BuzzQuizzv723OEH --public --source=. --push
```

```bash
gh api -X POST repos/ManuDiasCruz/BuzzQuizzv723OEH/pages -f "source[branch]=main" -f "source[path]=/"
```

Para publicar a partir deste repositório, basta apontar o GitHub Pages para a
branch desejada em **Settings → Pages → Build and deployment → Deploy from a
branch**. Não há passo de build: o conteúdo da raiz é servido como está.

## 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

## ⚠️ Limitações conhecidas e próximos passos

- **A API é pública e compartilhada.** Qualquer pessoa publica quizzes na mesma
  base, então a lista "Todos os Quizzes" contém entradas de teste e imagens
  quebradas de terceiros. O fallback de imagem ameniza, mas não corrige a
  origem.
- **"Seus Quizzes" mora no navegador.** Limpar o `localStorage` ou trocar de
  navegador faz os quizzes criados desaparecerem da home — eles continuam na
  API, só não são mais reconhecidos como seus. A API devolve uma `key` de
  edição que ainda não é usada.
- **Não há edição nem exclusão de quizz.** A API tem `PUT` e `DELETE`, e
  `img/editar-branco.png` e `img/deletar-branco.png` já estão no repositório,
  mas os botões nunca foram implementados.
- **A validação de URL não garante que a imagem existe.** Ela só confere o
  formato; uma URL bem formada que aponte para nada só é detectada quando o
  navegador tenta carregar a imagem.
- **Sem testes automatizados.** A verificação desta v2 foi manual, no navegador,
  cobrindo a partida completa, o reinício, a criação com 3 perguntas e 3 níveis
  e o comportamento com a API fora do ar.
- **Sem histórico de pontuação** entre partidas ou sessões.
- **`img/Buzz_quizz.gif` tem 9,3 MB** e é baixado por quem abre o README no
  GitHub; converter para vídeo ou reduzir o gif deixaria o clone bem mais leve.
- **A galeria de sugestões é uma lista fixa.** Integrar a API do Pixabay
  permitiria buscar por palavra-chave dentro do próprio formulário.
