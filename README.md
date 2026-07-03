## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src=img/Buzz_quizz.gif  width="400" />

[Buzz Quizz (v1 original)](https://manudiascruz.github.io/BuzzQuizz/) ·
[Buzz Quizz (v2 – este branch)](https://manudiascruz.github.io/BuzzQuizzH2HM/)

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

## 🔎 Visão geral do projeto

O BuzzQuizz é uma SPA estática (HTML + CSS + JavaScript puro) que consome a
[mock API da Driven](https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes).
O usuário pode:

- **Ver todos os quizzes** existentes na home.
- **Criar um quizz** em três etapas (dados básicos → perguntas → níveis), que é
  enviado ao servidor e guardado localmente (`localStorage`).
- **Responder um quizz**, com embaralhamento das respostas, feedback de
  acerto/erro e uma tela de resultado com o nível alcançado.

`axios` é usado para as chamadas HTTP e `ionicons` para os ícones.

## 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

## 🛠️ Abrir e rodar o projeto

Após baixar o projeto, você pode abri-lo com o Visual Studio Code. Para isso, na tela de launcher clique em:

- File > Open Folder
- Procure o local onde o projeto está e o selecione (Caso o projeto seja baixado via zip, é necessário extraí-lo antes de procurá-lo)
- Por fim clique em Abrir

Para rodar o projeto você pode utilizar o [Live Server](https://github.com/ritwickdey/vscode-live-server).

### Rodando localmente pelo terminal

Como é um site estático, qualquer servidor HTTP simples funciona:

```bash
# a partir da raiz do projeto
python -m http.server 5599
# depois abra http://localhost:5599 no navegador
```

> É necessário servir por HTTP (e não abrir o `index.html` via `file://`) para
> que as chamadas à API e o `localStorage` funcionem corretamente.

## ✨ Melhorias adicionadas na v2

Esta versão (`buzzquizz-H2H-M`) corrige bugs reais e melhora a experiência sem
reescrever o projeto.

**Bugs corrigidos**

- **Perguntas/respostas/níveis idênticos:** as funções `montarNovaResposta`,
  `montarNovaPergunta` e `montarNovoNivel` reaproveitavam um único objeto global
  e o empurravam por referência, fazendo todos os itens ficarem iguais (só o
  último era preservado). Agora cada item é um objeto novo.
- **Capa do quizz sobrescrita:** a tela de sucesso substituía a imagem escolhida
  pelo usuário por uma URL inválida (com o caractere `…`). Removido.
- **Prévia da capa não aparecia:** era usada a propriedade inexistente
  `.background` em vez de `.style.background`.
- **Cálculo de pontuação/nível errado:** variáveis globais acumulavam entre
  perguntas e o índice do nível ficava inconsistente. Reescrito: o percentual é
  `acertos / total` e o nível é o de maior `minValue` atingido.
- **Tela de resultado não aparecia na hora certa:** a lógica de disparo estava
  aninhada no laço de respostas. Agora dispara após a última pergunta.
- **Pontuação não zerava ao rejogar/reiniciar.** Agora zera ao abrir o quizz.
- **HTML quebrado:** `div` não fechada, tags `</body>`/`</html>` duplicadas,
  `</div>` órfã, `<meta viewport>` duplicado e `<header class>` vazio.

**Qualidade de código / UX**

- Removido `console.log` com efeito colateral que forçava a seção
  "Meus quizzes" a aparecer vazia no primeiro acesso.
- Imagens das respostas passaram a ter `alt` descritivo (acessibilidade).
- Comparação de acerto/erro feita com as strings `"true"`/`"false"`.

**Imagens**

- 8 imagens de licença livre adicionadas em `img/` (pandas, bambu, cores).
- O quizz de demonstração agora usa imagens locais em vez de hotlinks de
  terceiros que quebravam. Créditos em [`IMAGE_CREDITS.md`](IMAGE_CREDITS.md).

## 🚀 Deploy (GitHub Pages)

O projeto é publicado via GitHub Pages a partir da raiz do branch.

1. No repositório, vá em **Settings → Pages**.
2. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
3. Selecione o branch desejado e a pasta `/ (root)` e salve.
4. Aguarde o build; a URL pública será exibida na mesma tela.

**URL do deploy desta versão:**
https://manudiascruz.github.io/BuzzQuizzH2HM/

## ⚠️ Limitações conhecidas e melhorias futuras

- A aplicação depende da mock API pública da Driven; se ela sair do ar, a lista
  de quizzes fica vazia.
- Ainda não há **edição** nem **exclusão** de quizzes criados (os ícones
  correspondentes existem no design, mas sem lógica associada).
- Validações usam `alert()`; o ideal seria feedback inline nos campos.
- O layout tem CSS para desktop, mas o foco continua sendo mobile.
- Não há testes automatizados.

Sugestões detalhadas estão registradas nas *issues* do repositório.
