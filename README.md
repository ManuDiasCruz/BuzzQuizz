## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src=img/Buzz_quizz.gif  width="400" />

[Buzz Quizz original](https://manudiascruz.github.io/BuzzQuizz/)

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

## Visão geral do projeto

BuzzQuizz é uma aplicação estática em HTML, CSS e JavaScript para listar, responder e criar quizzes usando a API pública do projeto Driven BuzzQuizz. Esta versão mantém a estrutura original do projeto, mas melhora a estabilidade dos fluxos principais, a consistência visual e a qualidade das imagens exibidas.

Versão v2 publicada: [https://manudiascruz.github.io/v2-mcg-task003-buz/](https://manudiascruz.github.io/v2-mcg-task003-buz/)

## 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

Branch desta entrega:

```bash
git switch v2-mcg-task003-buz
```

## 🛠️ Abrir e rodar o projeto

Após baixar o projeto, você pode abri-lo com o Visual Studio Code. Para isso, na tela de launcher clique em:

- File > Open Folder
- Procure o local onde o projeto está e o selecione (Caso o projeto seja baixado via zip, é necessário extraí-lo antes de procurá-lo)
- Por fim clique em Abrir

Para rodar o projeto você pode utilizar o [Live Server](https://github.com/ritwickdey/vscode-live-server).

Também é possível rodar localmente com um servidor estático simples:

```bash
python3 -m http.server 8000
```

Depois acesse:

```text
http://127.0.0.1:8000/
```

## Melhorias adicionadas na v2

- Corrigido HTML inválido com tags duplicadas e contêiner de quizzes criado sem fechamento.
- Corrigido o fluxo de resposta do quiz: marcação correta/incorreta, avanço entre perguntas, cálculo de porcentagem e exibição do resultado.
- Corrigido o reinício do quiz para limpar estado anterior de acertos, perguntas respondidas e resultado.
- Corrigida a criação de quizzes para não reutilizar o mesmo objeto de pergunta, resposta e nível por referência.
- Corrigida a validação de níveis para validar cada nível preenchido, exigir todos os níveis abertos e manter os dados do usuário quando houver erro.
- Adicionados quizzes locais de exemplo com imagens do Pixabay para melhorar diversidade visual e manter conteúdo disponível se a API remota falhar.
- Melhorada a renderização dos cards para evitar duplicação, oferecer navegação por teclado e usar fallback visual quando uma imagem não carregar.
- Melhorados estilos de cards, botões, imagens de resposta e tela de resultado para maior consistência visual.

## Imagens e licenciamento

As novas imagens de exemplo foram selecionadas a partir de buscas no [Pixabay](https://pixabay.com/images/search/) e usam URLs públicas do CDN do Pixabay. Consulte a [licença do Pixabay](https://pixabay.com/service/license-summary/) para regras atualizadas de uso e restrições.

Nenhum token, credencial ou arquivo privado é necessário para rodar o projeto.

## Deploy no GitHub Pages

Este projeto é estático. Para publicar pelo GitHub Pages:

1. Envie a branch desejada para o GitHub.
2. Em `Settings > Pages`, selecione a branch e o diretório raiz (`/`) como origem.
3. Aguarde o build do GitHub Pages concluir.
4. Acesse o link publicado.

Link da entrega v2:

```text
https://manudiascruz.github.io/v2-mcg-task003-buz/
```

## Limitações conhecidas e próximos passos

- A listagem e criação de quizzes dependem da API pública `mock-api.driven.com.br`.
- A aplicação ainda carrega bibliotecas externas por CDN, como Axios e Ionicons.
- Não há suíte automatizada versionada no projeto; os testes desta entrega foram feitos com verificação de sintaxe, servidor local e smoke test em navegador headless.
- Edição e exclusão de quizzes do usuário ainda são oportunidades de melhoria.
- Um próximo passo útil é separar dados, renderização e validação em módulos menores para facilitar testes automatizados.
