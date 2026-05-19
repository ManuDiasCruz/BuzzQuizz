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

## 🚀 BuzzQuizz v2

Esta seção descreve as melhorias entregues no branch `buzzquizz-v2`.

### Visão geral

BuzzQuizz é um SPA simples em HTML/CSS/JavaScript puro que permite:

- Listar quizzes existentes consumidos da API mock `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes`.
- Criar um novo quizz (título, imagem, perguntas, alternativas e níveis de pontuação).
- Responder um quizz e ver o resultado calculado em função dos acertos.
- Armazenar os quizzes criados localmente via `localStorage` para reabrir depois.

### Como rodar localmente

O projeto é estático — basta abrir `index.html` em um navegador. Para evitar problemas com `localStorage` e `axios` em `file://`, recomenda-se servir com qualquer servidor HTTP simples:

```bash
# opção 1 — Python
python3 -m http.server 8080

# opção 2 — Node (npx)
npx serve .
```

Depois abra `http://localhost:8080`. A extensão [Live Server](https://github.com/ritwickdey/vscode-live-server) do VS Code também funciona.

### Melhorias adicionadas em v2

**Bugs corrigidos**

- HTML estrutural: removidos `</body>` / `</html>` duplicados, `</div>` solto depois de `</html>`, `<header class>` inválido, `<meta viewport>` duplicado e `<script>` posicionado depois de `</html>`. Os scripts agora rodam dentro do `<body>`.
- `index.html` não exibe mais um quizz placeholder de pandas que ficava visível antes da resposta da API.
- `montarTelaSucessoCriacaoQuizz` não sobrescreve mais a imagem do quizz com a string literal `"https://cdn.pixabay.com/…-family-5074732_1280.jpg"` (continha o caractere `…` e produzia 404) e usa `figure.style.background` em vez de `figure.background`, que era no-op.
- `quizzSelecionado` agora avança o scroll para a próxima pergunta (e não para a próxima alternativa da pergunta atual) e dispara `resultadoQuizz()` corretamente após a última pergunta.
- `quantidadeAcertos` calcula a porcentagem como `acertos*100/totalPerguntas` e seleciona o nível mais alto cujo `minValue` o jogador alcançou, mesmo quando os níveis chegam em ordem arbitrária.
- `resetEstadoPartida()` zera todas as variáveis de partida (`acertos`, `questoesrespondidas`, `porcentagem`, `u`, etc.) ao abrir ou reiniciar um quizz — antes, jogar duas vezes seguidas produzia resultado incorreto.
- `montarNovaResposta`, `montarNovaPergunta` e `montarNovoNivel` retornam objetos novos em vez de mutarem variáveis globais compartilhadas — o bug fazia com que toda a lista de perguntas/níveis apontasse para o mesmo objeto.
- `validarDadosNivel` agora valida o elemento passado como parâmetro em vez de sempre validar o primeiro nível via `document.querySelector(".nivel ...")`.
- `validarTodosNiveis` deixa de fazer `document.location.reload(true)` quando algum nível está inválido, preservando o que o usuário já preencheu.
- `validarDadosBasicos` agrupa todos os erros em um único `alert` em vez de exibir até 4 popups em sequência.
- `classList.contains(true)` / `contains(false)` foi substituído por marcadores explícitos `"correta"` / `"incorreta"`.
- `pegouQuizz`, `pegaMeusQuizzes` e `abrirQuizz` constroem o HTML inteiro em uma única string antes de aplicar `innerHTML`, evitando que callbacks assíncronos de `Image.onload` escrevam em elementos já descartados por um `innerHTML +=` posterior.
- `getAllQuizzesLocais` limpa `listaMeusQuizzes` antes de popular, evitando duplicatas em re-renderizações.

**UX e visual**

- Fallback robusto para imagens quebradas (`<img onerror>` + helper `aplicarBackgroundComFallback`) usando `img/svg/placeholder.svg`.
- Feedback visual mais claro nas respostas: contorno verde/vermelho com `outline` em vez de apenas mudança de cor do texto.
- Hover sutil em cards de quizz e em alternativas ainda não respondidas.
- Brand `BuzzQuizz` no header é clicável e leva à home.
- `escapeHtml` aplicado a todos os textos vindos da API antes de serem injetados via `innerHTML`, removendo um risco de XSS quando um quizz remoto contém aspas ou tags no título.

**Imagens**

- Adicionadas 13 ilustrações SVG locais em `img/svg/` (logo, placeholder, pandas, urso pardo, gato, puma, bambu, folhas, musgo, tiles de cor) usadas como fallback e como assets fixos do projeto.
- Os dados de quizz de fallback agora referenciam URLs do CDN Pixabay e SVGs locais.

> Observação sobre Pixabay: o objetivo de v2 era também baixar diretamente uma diversidade de imagens de [Pixabay](https://pixabay.com/images/search/) e versioná-las. O ambiente de build em que este branch foi gerado possui uma política de rede que bloqueia hosts externos (resposta `403 host_not_allowed`), portanto downloads do CDN do Pixabay não puderam ser realizados durante esta entrega. Como substituto, foram criadas ilustrações SVG temáticas autorais (CC0-equivalente). URLs do Pixabay continuam sendo usadas como dado de exemplo — elas carregam normalmente no navegador final do usuário, que não está sujeito à mesma restrição de rede.

### Deploy no GitHub Pages

- **v1 (main):** https://manudiascruz.github.io/BuzzQuizz/
- **v2 (este branch):** após o merge para `main`, o mesmo endpoint passa a servir esta versão. Alternativamente é possível configurar o GitHub Pages para servir diretamente de `buzzquizz-v2`:
  1. No repositório, ir em `Settings` → `Pages`.
  2. Em `Build and deployment` → `Source`, escolher `Deploy from a branch`.
  3. Em `Branch`, selecionar `buzzquizz-v2` e diretório `/ (root)`.
  4. Clicar em `Save`. A URL final será `https://manudiascruz.github.io/BuzzQuizz/`.

> O URL pedido originalmente — `https://manudiascruz.github.io/BuzzQuizzv2/` — exige um repositório **novo** chamado `BuzzQuizzv2` (o caminho do GitHub Pages é sempre `<usuário>.github.io/<repo>/`). Para usar aquele URL, basta criar `ManuDiasCruz/BuzzQuizzv2` no GitHub e fazer `git push` deste branch para esse novo repositório.

### Limitações conhecidas / próximos passos

- O backend é uma API mock pública (`mock-api.driven.com.br`) sem garantia de uptime — não há tratamento offline além do alerta.
- Quizzes em `localStorage` ficam armazenados pela chave `id`; ainda não há UI para deletar/editar.
- Não há testes automatizados; uma suíte de smoke tests em Playwright/Cypress traria muito valor.
- O legado `Buzz_quizz.gif` pesa ~9 MB e é usado apenas no README — pode ser convertido para MP4/WebM para reduzir o tamanho do repositório.
- `pandavermelho.jpg` deixou de ser referenciado e pode ser removido em uma próxima limpeza.
- Estilos legados ainda usam `width` em pixels fixos; uma migração para layout fluido (rem/%) melhoraria a responsividade.
