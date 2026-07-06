## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src=img/Buzz_quizz.gif  width="400" />

[Buzz Quizz (original)](https://manudiascruz.github.io/BuzzQuizz/) · [Buzz Quizz v2 (H2H Low)](https://manudiascruz.github.io/BuzzQuizzH2HLow/)

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

## 🔎 Visão geral do projeto

O BuzzQuizz é uma SPA simples (sem framework) que permite:

- **Ver todos os quizzes** disponibilizados pela API pública da Driven;
- **Criar um quizz** próprio em três etapas (dados básicos → perguntas → níveis), com validações;
- **Responder um quizz** e receber um resultado com a porcentagem de acertos e o nível alcançado;
- **Guardar localmente** (via `localStorage`) os quizzes criados pelo usuário.

Estrutura de pastas:

```
├── index.html            # marcação das telas
├── css/                  # reset + estilos (mobile-first e desktop)
├── src/script.js         # toda a lógica do quizz
└── img/                  # imagens locais (Pixabay License)
```

## 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

## 🛠️ Abrir e rodar o projeto localmente

Por ser um projeto estático, basta servir a pasta com qualquer servidor HTTP:

**Opção 1 — VS Code + Live Server**

- File > Open Folder e selecione a pasta do projeto;
- Instale a extensão [Live Server](https://github.com/ritwickdey/vscode-live-server);
- Clique em **Go Live**.

**Opção 2 — linha de comando**

```bash
# com Node instalado
npx http-server -p 8199 -c-1
# ou com Python
python -m http.server 8199
```

Depois acesse `http://localhost:8199`.

> A listagem de quizzes usa a API pública `https://mock-api.driven.com.br/api/v4/buzzquizz`. É necessário estar online para ver os quizzes remotos.

## ✨ Melhorias adicionadas na v2

**Correções de bugs**

- Criação de quizz corrigida: `montarNovaResposta/Pergunta/Nivel` reutilizavam objetos globais, fazendo com que **todas as respostas, perguntas e níveis ficassem iguais ao último item**. Agora cada item é um objeto próprio.
- Removida a sobrescrita da imagem do quizz por uma URL do Pixabay inválida logo antes do envio ao servidor.
- Reescrita da lógica de resultado: a **porcentagem de acertos** e a **seleção de nível** agora são determinísticas, e a **tela de resultado passa a aparecer corretamente** ao terminar o quizz.
- A pontuação é **zerada ao reiniciar** o quizz (antes acumulava entre tentativas).
- Corrigida a **colisão de classes** entre "Meus Quizzes" e "Todos os Quizzes".
- HTML consertado: tags `</body>`/`</html>` duplicadas, `<div>` órfã, `viewport` duplicado, `<header class>` vazio e `</section>` incompleto.

**UX / consistência visual**

- `cursor: pointer` nos elementos clicáveis (cartões, respostas, botões);
- `object-fit: cover` para não distorcer imagens de respostas e resultado;
- realce sutil ao passar o mouse nos cartões;
- cor do botão "+" alinhada ao vermelho do cabeçalho;
- `meta description` e `alt` significativos para acessibilidade/SEO.

**Imagens**

- Adicionadas imagens novas do [Pixabay](https://pixabay.com/) (Pixabay License — uso livre, sem atribuição obrigatória);
- Substituída a imagem antiga de baixa qualidade;
- **Fallback local** (`img/placeholder.png`) para imagens externas quebradas.

## 🚀 Deploy (GitHub Pages)

O site é publicado via GitHub Pages a partir da branch `main` (raiz do repositório):

1. No repositório: **Settings → Pages**;
2. **Source**: *Deploy from a branch*;
3. **Branch**: `main` / `/ (root)` e salve;
4. Aguarde a publicação.

🔗 **Deploy da v2:** https://manudiascruz.github.io/BuzzQuizzH2HLow/

## ⚠️ Limitações conhecidas e melhorias futuras

- A listagem depende da API pública da Driven; se ela ficar fora do ar, apenas o quizz de exemplo local funciona.
- Ainda não há **editar/excluir** quizzes criados (os ícones existem no design, mas sem ação).
- A validação de imagens verifica apenas o formato da URL, não se a imagem carrega de fato.
- Não há testes automatizados nem etapa de build.
- O layout é otimizado para mobile; o refinamento desktop pode evoluir.
