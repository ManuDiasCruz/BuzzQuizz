## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src=img/Buzz_quizz.gif width="400" />

[Buzz Quizz original](https://manudiascruz.github.io/BuzzQuizz/)

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

## 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

## 🛠️ Abrir e rodar o projeto

Após baixar o projeto, você pode abri-lo com o Visual Studio Code. Para isso, na tela de launcher clique em:

- File > Open Folder
- Procure o local onde o projeto está e o selecione. Caso o projeto seja baixado via zip, extraia os arquivos antes.
- Por fim clique em Abrir

Para rodar o projeto você pode utilizar o [Live Server](https://github.com/ritwickdey/vscode-live-server).

Também é possível subir um servidor estático simples a partir da raiz do projeto:

```bash
python3 -m http.server 8000
```

Depois abra `http://localhost:8000/` no navegador.

## Visão geral do projeto

O BuzzQuizz permite:

- abrir quizzes públicos ou de demonstração;
- responder perguntas com imagens;
- calcular um resultado por nível ao final do quizz;
- criar quizzes próprios com perguntas, respostas e níveis;
- salvar os quizzes criados no navegador usando `localStorage`.

## Melhorias adicionadas na v2

Esta versão foi preparada na branch `v2-mch-task003-bquiz` e inclui:

- correção da contagem de acertos e da seleção do nível final;
- correção do avanço automático para a próxima pergunta e do reinício do quizz;
- reset do estado entre quizzes para evitar placares acumulados;
- correção da criação de perguntas, respostas e níveis para impedir objetos duplicados;
- validação melhor do fluxo de criação, sem apagar o formulário em erros simples;
- salvamento local do quizz criado antes da tentativa de envio ao servidor;
- fallback com quizzes de demonstração quando a API externa não responde;
- cards de quizz e telas de resultado mais consistentes em mobile e desktop;
- uso de mais imagens, com maior variedade, em quizzes, respostas e níveis;
- imagens de demonstração vindas de buscas do Pixabay, usadas sob a [Pixabay Content License](https://pixabay.com/service/license/);
- HTML corrigido e CSS ajustado para evitar larguras quebradas, imagens esticadas e conteúdo cortado.

## Deploy

Versão publicada da v2 neste repositório:

[https://manudiascruz.github.io/BuzzQuizz/](https://manudiascruz.github.io/BuzzQuizz/)

O caminho `/v2-mch-task003-bquiz/` não é gerado automaticamente para este projeto, porque o URL de um GitHub Pages project site acompanha o nome do repositório. Para publicar exatamente em `https://manudiascruz.github.io/v2-mch-task003-bquiz/`, seria necessário usar um repositório com esse nome ou uma rota publicada a partir de um user-pages site.

Para atualizar o GitHub Pages desta branch:

1. faça commit das alterações;
2. envie a branch `v2-mch-task003-bquiz` para o repositório remoto;
3. no repositório, mantenha o GitHub Pages apontado para a branch `v2-mch-task003-bquiz` na pasta raiz `/`;
4. aguarde a publicação e revise a home, um quizz completo e o fluxo de criação.

## Limitações conhecidas e próximos passos

- O envio para a API externa ainda depende da disponibilidade do servidor remoto.
- Os quizzes criados continuam salvos localmente no navegador; sem backend próprio não há sincronização entre dispositivos.
- As imagens criadas pelo usuário dependem de URLs externas e podem quebrar se a origem sair do ar.
- Ainda há espaço para incluir remoção e edição de quizzes locais com persistência mais robusta.
- Testes automatizados de interface ajudariam a proteger o fluxo completo de criação e resposta.
