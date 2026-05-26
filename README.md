## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src="img/Buzz_quizz.gif" width="400" />

[Buzz Quizz (v1 — produção original)](https://manudiascruz.github.io/BuzzQuizz/)

[Buzz Quizz v2 — deploy desta branch](https://manudiascruz.github.io/v2-mcc-task003-bzq/)

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

## 🧭 Visão geral do projeto

- **`index.html`** — três telas principais (lista de quizzes, jogar quizz, criar quizz) controladas via `display` em CSS.
- **`src/script.js`** — toda a lógica: integração com o mock-api `mock-api.driven.com.br/api/v4/buzzquizz`, persistência local dos quizzes criados (`localStorage`), navegação entre telas e cálculo do resultado.
- **`css/`** — `reset.css`, `styleMobile.css` (base mobile-first) e `styleDesktop.css` (media query a partir de 600px).
- **`img/`** — assets locais (ícones de UI, GIF demo, placeholder de fallback, favicon).

## 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

## 🛠️ Setup local

Como é um projeto estático puro (HTML/CSS/JS), basta servir os arquivos por qualquer servidor HTTP:

```bash
# Opção 1: Python 3
python3 -m http.server 8000

# Opção 2: Node
npx serve .

# Opção 3: Live Server (extensão do VS Code)
# Botão direito em index.html → "Open with Live Server"
```

Em seguida acesse `http://localhost:8000`.

## 🆕 Melhorias adicionadas na v2 (`v2-mcc-task003-bzq`)

### 🐛 Bugs corrigidos

- HTML: tag `<div class="quizzes-criados">` que nunca fechava, tags duplicadas de `</body>`, `</html>` e `</div>` ao final do arquivo, atributo `class` vazio no `<header>`, e o `</section` (sem `>`) gerado dinamicamente em `abrirQuizz`.
- JS: `montarNovaPergunta` e `montarNovoNivel` mutavam o **mesmo** objeto global e empurravam a referência repetida — todos os itens da lista acabavam idênticos. Agora cada entrada é um objeto novo.
- JS: `quantidadeAcertos` acumulava `leveltotal` entre chamadas e selecionava o **menor** `minValue` em vez do maior alcançado. O cálculo virou uma função pura (`calcularResultado`) com seleção correta.
- JS: o resultado só era calculado se a última resposta fosse correta, e o `setTimeout` rodava dentro do loop de respostas (vários disparos). Agora dispara uma única vez após a última pergunta.
- JS: estado de execução (`acertos`, `questoesrespondidas`) não era resetado em `reiniciarQuizz` nem ao abrir um novo quizz.
- JS: URL com caractere `…` (ellipsis) inválida no fundo da tela de sucesso (`https://cdn.pixabay.com/…-family-5074732_1280.jpg`).
- JS: `voltarInicio` não restaurava a `paginaum` corretamente e não recarregava a lista.
- CSS: declaração `font: 'Roboto', sans-serif;` (font shorthand inválida — exige tamanho/altura) e seletor `.fim.resultado` (sem espaço, exigindo as duas classes no mesmo elemento) em `styleDesktop.css`.

### 🎨 UI / UX

- Hover, focus e `transition` em cards de quizz e respostas (acessível via teclado, com `tabindex` e `role="button"`).
- Mensagem amigável quando o servidor não retorna quizzes.
- Validação consolidada (em vez de quatro `alert`s sequenciais).
- Bloqueio de duplo clique em uma resposta já escolhida.
- Texto da resposta certa fica verde, das erradas vermelho (antes só mudava `color` por classes que pouco apareciam).
- Favicon dedicado.

### 🖼️ Imagens

- Substituídas URLs antigas de panda (várias quebradas) por URLs do **Pixabay CDN** (licença Pixabay — uso livre, sem atribuição obrigatória), no quizz de exemplo `quizzTesteFallback`.
- Novo `img/placeholder.svg` (autoria própria) usado automaticamente via `onerror` em qualquer `<img>` cuja URL externa falhar.
- Novo `img/favicon.svg` (autoria própria).
- Os ícones existentes (`editar.png`, `deletar-branco.png`, etc.) foram mantidos para preservar a identidade visual do projeto original.

### 🧹 Qualidade de código

- Variáveis globais soltas (`umquizz`, `irpara`, `identificador`, etc.) viraram declaradas com `let`/`const`.
- Strings de quizz/respostas passam por `escapeHtml` antes de irem ao DOM.
- Cards de quizz montados com `createElement` + listeners em vez de `onclick` injetado em string com `${q.id}`.
- Constante `API_BASE` no topo do arquivo.

## 🚀 Deploy

O deploy é feito pelo próprio GitHub Pages.

1. **Settings → Pages → Source: Deploy from a branch**.
2. Selecionar a branch que se deseja publicar (ex: `v2-mcc-task003-bzq`) e a pasta `/ (root)`.
3. Aguardar alguns minutos. O site fica disponível em:
   `https://manudiascruz.github.io/<nome-do-repo-ou-branch>/`.

Para esta versão (v2) o destino esperado é:
**https://manudiascruz.github.io/v2-mcc-task003-bzq/**

> Observação: como o repositório original publica a partir da branch `main`, para servir esta v2 no caminho acima pode ser necessário ou (a) criar um repositório dedicado `v2-mcc-task003-bzq` apontando para o conteúdo desta branch, ou (b) configurar Pages para servir a partir desta branch.

## ⚠️ Limitações conhecidas / próximos passos

- A API mock (`mock-api.driven.com.br`) é compartilhada e pode estar instável ou retornar quizzes de outros usuários. Não há fallback offline além do `quizzTesteFallback`.
- Não há rota / `pushState` — recarregar uma página de quizz volta sempre à home.
- A criação de quizz com mais de 3 perguntas usa "expanders" — UX poderia evoluir para um wizard completo com indicador de progresso.
- Acessibilidade ainda precisa de aria-live nos resultados e contraste auditado nos cards.
- Sem testes automatizados; lógica crítica de cálculo de resultado coberta apenas por verificação manual.

Outros próximos passos foram documentados como [issues no GitHub](https://github.com/ManuDiasCruz/BuzzQuizz/issues) com a tag `enhancement`.
