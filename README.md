## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src=img/Buzz_quizz.gif  width="400" />

[Buzz Quizz (v1)](https://manudiascruz.github.io/BuzzQuizz/) · [Buzz Quizz (v2)](https://manudiascruz.github.io/BuzzQuizzv723FEH/)

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

O usuário pode listar todos os quizzes cadastrados no servidor, responder um quizz e ver seu nível de acordo com a porcentagem de acertos, além de criar seus próprios quizzes (perguntas, respostas e níveis), que ficam salvos na seção "Seus Quizzes".

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

## 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

## 🛠️ Abrir e rodar o projeto

Após baixar o projeto, você pode abri-lo com o Visual Studio Code. Para isso, na tela de launcher clique em:

- File > Open Folder
- Procure o local onde o projeto está e o selecione (Caso o projeto seja baixado via zip, é necessário extraí-lo antes de procurá-lo)
- Por fim clique em Abrir

Para rodar o projeto você pode utilizar o [Live Server](https://github.com/ritwickdey/vscode-live-server), ou qualquer servidor estático simples, por exemplo:

```bash
python -m http.server 8123
```

e acessar `http://localhost:8123` no navegador. A aplicação consome a API mock `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes`, portanto é necessário estar online.

## ✨ Melhorias da versão 2 (branch `723-feh-bq`)

Correções de bugs reais encontrados em teste:

- **Cálculo de nível invertido** — quem acertava 33% recebia o nível de mais de 50% (e vice-versa). Agora o nível é o de maior `minValue` menor ou igual à porcentagem de acertos, e o resultado também é calculado quando o usuário erra tudo.
- **"Reiniciar Quizz" quebrado** — os contadores de respostas não eram zerados, então o quizz reiniciado nunca terminava. Também eram acumulados entre quizzes diferentes.
- **Criação de quizz gerava dados corrompidos** — respostas, perguntas e níveis compartilhavam o mesmo objeto global: todas as perguntas do quizz criado ficavam idênticas e nenhuma resposta era marcada como correta. Agora cada uma é um objeto independente.
- **Imagem do quizz criado sobrescrita** — a URL escolhida pelo usuário era trocada por uma URL fixa quebrada antes do envio ao servidor.
- **Perda de dados na validação** — erros de validação recarregavam a página ou remontavam o formulário, apagando tudo que o usuário digitou. Agora o formulário permanece preenchido.
- **Validação incompleta** — apenas o primeiro nível era validado; perguntas/níveis declarados mas não expandidos eram silenciosamente descartados. Agora tudo é validado.
- **Listas da home** — cartões de "Seus Quizzes" e "Todos os Quizzes" disputavam os mesmos nomes de classe (imagens de fundo trocadas), a lista local duplicava a cada visita e "Voltar pra home" deixava a página em branco.
- **HTML malformado** — `</html>` no meio do arquivo, tags duplicadas e div sem fechamento.

Melhorias de UX e imagens:

- Novas imagens do [Pixabay](https://pixabay.com/images/search/) (licença de conteúdo Pixabay, uso gratuito): imagem padrão dos cartões e fallback automático (`onerror`) para imagens de respostas/resultados cujos links externos quebraram.
- Imagens de respostas e cartões renderizadas com `object-fit`/`background-size: cover` (sem distorção).
- Cursor de ponteiro e efeito de hover em elementos clicáveis.
- Mensagens de validação consolidadas e mais claras.
- Remoção de código morto e dados de exemplo não utilizados.

## 🚀 Deploy (GitHub Pages)

A versão 2 está publicada em: **https://manudiascruz.github.io/BuzzQuizzv723FEH/**

Para publicar uma nova versão:

1. Faça push do conteúdo do projeto para o repositório de deploy (`BuzzQuizzv723FEH`), branch `main` (ou faça merge desta branch e publique o repositório principal).
2. No GitHub, em **Settings > Pages**, selecione **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Aguarde o workflow "pages build and deployment" concluir e acesse a URL acima.

Como o site é 100% estático (HTML/CSS/JS), nenhum passo de build é necessário.

## ⚠️ Limitações conhecidas / próximos passos

- A API mock é compartilhada e pública: a lista "Todos os Quizzes" contém quizzes de teste de terceiros e qualquer pessoa pode criar quizzes.
- "Seus Quizzes" fica salvo apenas no `localStorage` do navegador (não há autenticação de usuário).
- Não há como editar ou excluir um quizz depois de criado.
- As imagens dos quizzes são hotlinks externos; se o link sair do ar, é exibida a imagem de fallback.
- Se a API mock ficar indisponível, a aplicação exibe um alerta e a lista fica vazia — um conjunto de quizzes embutidos localmente seria um bom próximo passo.
- Acessibilidade pode melhorar: navegação por teclado nas respostas e `aria-labels` nos ícones.
