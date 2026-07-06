## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src=img/Buzz_quizz.gif  width="400" />

[Buzz Quizz (original)](https://manudiascruz.github.io/BuzzQuizz/) · [Buzz Quizz v2 (deploy)](https://manudiascruz.github.io/BuzzQuizzH2HL/)

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

## 🔎 Visão geral do projeto

O BuzzQuizz permite:

- Visualizar todos os quizzes disponíveis (carregados de uma API mock).
- Criar seu próprio quizz em etapas: dados básicos → perguntas → níveis.
- Responder um quizz, ver acertos destacados e receber um resultado com nível e percentual.
- Guardar localmente (localStorage) os quizzes criados pelo usuário.

Estrutura de pastas:

```
BuzzQuizz/
├── index.html          # Marcação das telas (home, quizz, criação)
├── css/                # reset.css, styleMobile.css, styleDesktop.css
├── img/                # Imagens locais (Pixabay License) + gif do README
└── src/script.js       # Toda a lógica da aplicação (API, criação, jogo, resultado)
```

## 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

## 🛠️ Abrir e rodar o projeto

Após baixar o projeto, você pode abri-lo com o Visual Studio Code. Para isso, na tela de launcher clique em:

- File > Open Folder
- Procure o local onde o projeto está e o selecione (Caso o projeto seja baixado via zip, é necessário extraí-lo antes de procurá-lo)
- Por fim clique em Abrir

Para rodar o projeto você pode utilizar o [Live Server](https://github.com/ritwickdey/vscode-live-server).

### Rodando localmente sem o VS Code

Por ser um site estático, basta servir a pasta do projeto. Um caminho simples:

```bash
# a partir da pasta BuzzQuizz/
python -m http.server 5599
# depois abra http://localhost:5599 no navegador
```

> A listagem de quizzes usa a API mock pública `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes`, portanto é necessário estar online.

## 🚀 Melhorias adicionadas na v2

**Correções de bugs**

- Cálculo de resultado reescrito: o percentual agora é `acertos / total de perguntas` e o nível escolhido é o de maior `minValue` alcançado (antes usava acumuladores globais que geravam valores inválidos).
- Estado da jogada (acertos, perguntas respondidas, nível) é zerado a cada abertura/reinício — antes acumulava entre jogadas.
- A tela de resultado passa a ser exibida de forma confiável ao responder a última pergunta.
- Criação de quizz: cada resposta/pergunta/nível agora é um objeto novo (antes um único objeto global era reutilizado, corrompendo os dados enviados).
- Removida a linha que sobrescrevia a imagem do quizz por uma URL quebrada na tela de sucesso.
- Corrigido `figure.background` → `figure.style.background`.
- Corrigida a duplicação de "meus quizzes" carregados do localStorage.

**UI / UX e consistência**

- HTML corrigido (meta viewport duplicada, `div` não fechada e tags `</body>/</html>` duplicadas removidas).
- Revelação de resposta certa/errada mais robusta via `data-correct`.
- Rolagem suave entre perguntas.
- `alt` descritivo e `loading="lazy"` nas imagens das respostas.
- Adicionados `meta description` e favicon.

**Imagens**

- Adicionadas 10 imagens locais com [Pixabay License](https://pixabay.com/service/license-summary/) (uso livre) na pasta `img/`.
- URLs externas quebradas/instáveis do quizz de exemplo substituídas por imagens locais.

## 🌐 Deploy (GitHub Pages)

A v2 está publicada em:

**https://manudiascruz.github.io/BuzzQuizzH2HL/**

Para publicar via GitHub Pages:

1. No repositório, acesse **Settings → Pages**.
2. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
3. Selecione a branch desejada e a pasta `/ (root)` e clique em **Save**.
4. Aguarde alguns instantes; a URL pública será exibida na mesma página.

> Todos os caminhos de imagem são relativos (`img/...`), então o site funciona corretamente sob qualquer caminho base do GitHub Pages.

## 🧭 Limitações conhecidas / próximos passos

- Alguns quizzes vindos da API mock possuem imagens de resposta com URLs quebradas (dados de terceiros no servidor) — fora do controle desta aplicação.
- As listas "Todos os Quizzes" e "Meus Quizzes" podem reutilizar as mesmas classes CSS (`.quizz{i}`), o que pode afetar a imagem de fundo quando ambas aparecem — candidato a refatoração.
- Não há edição/remoção de quizzes já criados.
- A validação de formulários usa `alert()`; poderia evoluir para mensagens inline.
- Sugestão futura: cobertura de testes automatizados e separação da lógica em módulos.
