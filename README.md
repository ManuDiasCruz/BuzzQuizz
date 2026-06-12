## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes: você pode responder quizzes criados pela comunidade, criar os seus próprios e acompanhar os que já criou.</p>

<img src=img/Buzz_quizz.gif  width="400" />

🔗 **Versão original:** [Buzz Quizz](https://manudiascruz.github.io/BuzzQuizz/)

🔗 **Versão 2 (melhorada) no ar:** [Buzz Quizz v2](https://manudiascruz.github.io/BuzzQuizzv5/)

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

**Funcionalidades:**

- Listar os quizzes da comunidade (API Driven) e os seus quizzes criados;
- Responder um quizz com feedback visual de acerto/erro, percentual final e nível alcançado;
- Criar um quizz completo (dados básicos, perguntas com respostas e níveis) e enviá-lo ao servidor;
- Quizzes de exemplo locais, jogáveis mesmo sem conexão com a API.

## ✨ Melhorias da v2

A branch `fable-enrichment` corrigiu bugs reais encontrados em testes e melhorou a experiência geral:

**Correções de bugs**

- O cálculo do nível final estava invertido/incorreto: uma pontuação perfeita podia exibir o pior nível (acontecia com os próprios dados de demonstração do projeto). Agora o nível mostrado é o de maior `% mínima` alcançada;
- O percentual de acertos acumulava entre partidas (podia passar de 100%) e nunca era calculado quando o jogador errava tudo;
- "Reiniciar Quizz" nunca mais mostrava o resultado (contadores não eram zerados) e podia reexibir um resultado antigo por causa de timers pendentes;
- Após responder, a página rolava para a próxima *resposta* da mesma pergunta (com erro de JavaScript quando o índice não existia) em vez da próxima pergunta;
- Na criação de quizz, todas as perguntas/respostas/níveis enviados eram cópias do último item digitado (objetos globais compartilhados) — o quizz criado chegava ao servidor sem nenhuma resposta correta;
- Um erro de validação apagava todo o preenchimento do formulário (re-render ou reload da página). Agora o erro é apontado e o preenchimento é mantido;
- Apenas o primeiro nível era validado; perguntas/níveis nunca abertos eram silenciosamente descartados (dava para criar quizz com 1 pergunta);
- A imagem de capa escolhida pelo usuário era sobrescrita por uma URL quebrada antes do envio ao servidor;
- As capas de "Seus Quizzes" e "Todos os Quizzes" se misturavam (classes duplicadas entre as listas);
- Dados de outras aplicações no mesmo domínio (GitHub Pages compartilha a origem entre projetos) quebravam a tela inicial ao ler o `localStorage`;
- HTML malformado (dois `</body></html>`, `<div>` sem fechar, metas duplicadas) e seletores CSS mortos (`.fim.resultado`, `.fim .button`) corrigidos.

**Experiência e visual**

- Imagens quebradas (muito comuns nos quizzes da comunidade) agora caem para uma imagem local em vez do ícone de imagem quebrada;
- Capas e fotos usam `cover`/`object-fit` (sem distorção), com estados de hover/focus e `cursor: pointer` em tudo que é clicável;
- Mensagens de erro consolidadas e específicas (indicando qual pergunta/nível corrigir), botão "Finalizar" com estado de envio, falha da API exibida na própria página;
- Conteúdo dinâmico da API é escapado antes de ir para o HTML (proteção básica contra injeção).

**Imagens**

- 30+ novas imagens de alta qualidade baixadas do [Pixabay](https://pixabay.com/images/search/) (licença Pixabay, uso livre) em `img/quiz/`;
- Dois quizzes de exemplo completos ("Você manja de animais?" e "Maravilhas do mundo") com imagens locais, jogáveis offline;
- Imagem padrão para capas e fallback para fotos fora do ar; favicon adicionado.

## 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

## 🛠️ Abrir e rodar o projeto

Após baixar o projeto, você pode abri-lo com o Visual Studio Code. Para isso, na tela de launcher clique em:

- File > Open Folder
- Procure o local onde o projeto está e o selecione (Caso o projeto seja baixado via zip, é necessário extraí-lo antes de procurá-lo)
- Por fim clique em Abrir

Para rodar o projeto você pode utilizar o [Live Server](https://github.com/ritwickdey/vscode-live-server).

Alternativas sem VS Code (qualquer servidor estático funciona):

```bash
# com Python
python3 -m http.server 8080

# ou com Node
npx serve .
```

Depois é só abrir `http://localhost:8080` no navegador.

> Observação: abrir o `index.html` direto do disco (`file://`) também funciona para navegar,
> mas alguns navegadores restringem requisições nesse modo — prefira um servidor local.

## 🚀 Deploy (GitHub Pages)

A versão 2 fica hospedada no repositório [`BuzzQuizzv5`](https://github.com/ManuDiasCruz/BuzzQuizzv5) e publicada em **<https://manudiascruz.github.io/BuzzQuizzv5/>**.

Para publicar uma nova versão:

1. Faça as alterações nesta base de código (branch `fable-enrichment` ou `main` após o merge);
2. Envie os arquivos para a branch `main` do repositório `BuzzQuizzv5`;
3. Em **Settings → Pages** do `BuzzQuizzv5`, mantenha a publicação configurada para a branch `main` (pasta `/`);
4. Aguarde o build do Pages (1–2 min) e confira o site no link acima.

Como o site é 100% estático (HTML/CSS/JS), não há etapa de build — os arquivos são publicados como estão.

## ⚠️ Limitações conhecidas e próximos passos

- A API pública (`mock-api.driven.com.br`) contém muitos quizzes de teste com textos/imagens inválidos enviados por outros usuários; o app se protege (fallback de imagem, escape de texto), mas não há como corrigir os dados no servidor;
- Não há como **editar ou excluir** um quizz já criado (os ícones existem em `img/`, a feature não foi implementada);
- O "Seus Quizzes" depende do `localStorage` do navegador: limpar os dados do site faz os quizzes criados sumirem da lista (eles continuam no servidor);
- Sem testes automatizados — as verificações desta versão foram feitas com scripts Playwright fora do repositório;
- Melhorias futuras estão registradas nas [issues do repositório](https://github.com/ManuDiasCruz/BuzzQuizz/issues).

## 🖼️ Créditos das imagens

As imagens em `img/quiz/` foram baixadas do [Pixabay](https://pixabay.com/) e são utilizadas conforme a [Pixabay Content License](https://pixabay.com/service/license-summary/) (uso gratuito, sem necessidade de atribuição). As fontes individuais estão listadas em [`img/quiz/CREDITS.md`](img/quiz/CREDITS.md).
