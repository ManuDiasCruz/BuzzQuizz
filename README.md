## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src=img/Buzz_quizz.gif  width="400" />

[Buzz Quizz (original)](https://manudiascruz.github.io/BuzzQuizz/) · [Buzz Quizz v2 (melhorado)](https://manudiascruz.github.io/BuzzQuizzv2/)

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

## 🔎 Visão geral

O BuzzQuizz é um site de quizzes no estilo BuzzFeed, 100% front-end (HTML + CSS + JavaScript puro, sem build). O usuário pode:

- **Responder** quizzes existentes, carregados de uma API mock pública da Driven;
- **Criar** seus próprios quizzes (título, perguntas com respostas certas/erradas e níveis de resultado por % de acerto), que são enviados para a API e salvos localmente (`localStorage`);
- **Ver o resultado** ao final, com o nível correspondente à porcentagem de acertos.

Estrutura do projeto:

```
BuzzQuizz/
├── index.html            # marcação das telas (lista, criação, resposta, resultado)
├── css/
│   ├── reset.css         # reset de estilos
│   ├── styleMobile.css   # estilos base (mobile-first)
│   └── styleDesktop.css   # overrides para telas >= 600px (@media)
├── src/
│   └── script.js         # toda a lógica (consumo da API, criação e resposta de quizzes)
└── img/                  # imagens (ícones, fallback e capa)
```

## 🛠️ Abrir e rodar o projeto

Após baixar o projeto, você pode abri-lo com o Visual Studio Code. Para isso, na tela de launcher clique em:

- File > Open Folder
- Procure o local onde o projeto está e o selecione (Caso o projeto seja baixado via zip, é necessário extraí-lo antes de procurá-lo)
- Por fim clique em Abrir

Para rodar o projeto você pode utilizar o [Live Server](https://github.com/ritwickdey/vscode-live-server).

### Rodando por linha de comando

Como é um site estático, basta servir os arquivos por HTTP (abrir o `index.html` direto via `file://` faz as requisições à API falharem). Exemplos:

```bash
# Python 3
python3 -m http.server 8000

# ou Node
npx serve .
```

Depois acesse `http://localhost:8000`.

## ✨ Melhorias da v2

Esta versão (`claude-enrichment` → deploy em **BuzzQuizzv2**) corrige bugs reais e melhora a experiência sem reescrever o projeto.

**Bugs corrigidos**

- **Criação de quizz salvava tudo igual:** perguntas, respostas e níveis reaproveitavam um mesmo objeto global, então todos viravam cópias do último item preenchido. Cada item passou a ser um objeto independente.
- **Imagem do quizz quebrada ao criar:** a tela de sucesso sobrescrevia a imagem escolhida por uma URL truncada/inválida antes de enviar à API. Removido — usa a imagem do usuário.
- **Pré-visualização da imagem na tela de sucesso não aparecia:** usava `figure.background` (sem efeito) em vez de `figure.style.background`.
- **Resultado mostrava o nível errado:** o cálculo de porcentagem acumulava valores entre chamadas (podendo dar `NaN`/divisão por zero) e a seleção do nível usava um índice global que sobrava do laço. Reescrito: `% = round(acertos / nº de perguntas)` e nível = aquele com o **maior** `minValue` que ainda seja `<=` à porcentagem.
- **Resultado podia não aparecer:** o disparo da tela de resultado estava aninhado num `setTimeout` condicionado a um índice de resposta. Agora dispara de forma determinística após a última pergunta.
- **Cards trocados entre listas:** "Meus Quizzes" e "Todos os Quizzes" usavam as mesmas classes (`.quizz0`, `.quizz1`…), então a imagem ia para o card errado. Cada card passou a montar seu próprio `style` inline.
- **"Meus Quizzes" duplicava** a cada recarregamento (a lista nunca era zerada).
- **Validação de níveis:** `validarDadosNivel` ignorava o parâmetro e validava sempre o primeiro nível; um nível inválido ainda **recarregava a página inteira** e apagava tudo. Agora valida o nível certo e apenas avisa, preservando os dados.
- **"Voltar pra home" abria tela em branco** (a home seguia oculta vinda do fluxo de criação) e nem sempre atualizava a lista de quizzes.
- **"Seus Quizzes" aparecia vazio já no primeiro acesso**, por causa de um `console.log` com efeito colateral.
- **Reiniciar quizz acumulava acertos**, pois o estado não era zerado ao reabrir.
- **HTML inválido:** `class` vazio no `<header>`, `<meta viewport>` duplicada, `<div>` não fechada, tags `</body>`/`</html>` duplicadas e `<script>` depois de `</html>`.

**UI/UX e consistência visual**

- **Fallback de imagem:** muitas imagens vindas do servidor não são imagens (links da Amazon, do Instagram, etc.). Agora, ao falhar, a imagem é trocada por uma imagem local — sem ícones de imagem quebrada. Contextos pequenos usam `img/fallback.jpg`; capas usam `img/quiz-cover.jpg`.
- **Feedback ao responder:** destaque da resposta escolhida, cores de certo/errado também no texto, esmaecimento das demais, cursor de clique e transições suaves.
- `meta description` e `theme-color` adicionados.

**Qualidade de código**

- Remoção de código morto/duplicado (`createQuizz`, `getMeuQuizzLocal`, `getMeuUltimoQuizzLocal`, objeto de exemplo `quizzTeste` e variáveis não usadas).
- URL da API centralizada em constante; funções de pontuação reescritas e comentadas.

**Imagens**

- Adicionadas 2 imagens do [Pixabay](https://pixabay.com/) (sob a **Pixabay Content License** — uso livre, sem necessidade de atribuição): `img/fallback.jpg` e `img/quiz-cover.jpg`.

## 🚀 Deploy (GitHub Pages)

O site é estático, então o deploy é direto pelo GitHub Pages:

1. No repositório, vá em **Settings → Pages**.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Escolha a branch (ex.: `main`) e a pasta **/(root)** e salve.
4. Aguarde o build; a URL pública aparece na própria página de Pages.

A v2 está publicada em:

**🔗 https://manudiascruz.github.io/BuzzQuizzv2/**

## 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

## ⚠️ Limitações conhecidas e próximos passos

- **API mock compartilhada:** os quizzes vêm de uma API mock pública da Driven, com muitos dados de teste e URLs de imagem inválidas — daí a importância do fallback de imagem.
- **`img/Buzz_quizz.gif` é pesado (~9 MB):** usado apenas no README; vale otimizar/compactar ou trocar por um vídeo/screenshot leve.
- **Sem persistência real do usuário:** "Meus Quizzes" depende do `localStorage` do navegador; não há login.
- **Validações via `alert()`:** funcionam, mas mensagens inline seriam melhores para a experiência.
- **Acessibilidade:** dá para melhorar foco de teclado, `aria-*` e contraste em alguns textos.
- **Sem testes automatizados versionados** no repositório.

> Itens detalhados como sugestões de implementação estão registrados nas *issues* do repositório.
