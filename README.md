## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src="img/Buzz_quizz.gif" width="400" alt="Demonstração do Buzz Quizz" />

- Aplicação original: [Buzz Quizz](https://manudiascruz.github.io/BuzzQuizz/)
- Versão enriquecida v2: [Buzz Quizz v4](https://manudiascruz.github.io/BuzzQuizzv4/)
- Repositório principal: [ManuDiasCruz/BuzzQuizz](https://github.com/ManuDiasCruz/BuzzQuizz)
- Branch desta versão: `kindle-alpha-enrichment`

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

O projeto é uma aplicação estática que lista quizzes, permite responder perguntas, calcula o resultado por percentual de acerto e armazena no `localStorage` os quizzes criados pelo usuário. A lista pública e a criação de novos quizzes usam a API do Buzz Quizz.

## 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

## 🛠️ Abrir e rodar o projeto

Após baixar o projeto, você pode abri-lo com o Visual Studio Code. Para isso, na tela de launcher clique em:

- File > Open Folder
- Procure o local onde o projeto está e o selecione (Caso o projeto seja baixado via zip, é necessário extraí-lo antes de procurá-lo)
- Por fim clique em Abrir

Para rodar o projeto você pode utilizar o [Live Server](https://github.com/ritwickdey/vscode-live-server).

Também é possível servir os arquivos pelo terminal:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Depois acesse `http://127.0.0.1:8000/`.

### Smoke test no navegador

O teste não exige dependências npm, mas requer Node.js 22+ e Google Chrome:

```bash
google-chrome --headless --no-sandbox \
  --remote-debugging-port=9222 \
  --remote-allow-origins='*' \
  --user-data-dir=/tmp/buzzquizz-test \
  http://127.0.0.1:8000/

node tests/browser-smoke.js
```

## ✨ Melhorias adicionadas no v2

- Correção da estrutura HTML duplicada no fim do documento.
- Correção do fluxo de respostas para bloquear múltiplos cliques na mesma pergunta.
- Cálculo do resultado pelo percentual real de acertos e seleção correta do nível atingido.
- Reinício do quiz sem reaproveitar respostas ou pontuação anteriores.
- Correção da criação de quizzes para não reutilizar referências de perguntas, respostas e níveis.
- Validação de títulos, URLs, respostas incompletas, níveis e dados remotos inválidos.
- Proteção contra envios duplicados durante o salvamento de um quiz.
- Leitura isolada do `localStorage`, ignorando dados de outras aplicações.
- Renderização imediata de três quizzes locais quando a API está lenta ou indisponível.
- Dois novos quizzes sobre gastronomia e viagens, além do quiz de pandas revisado.
- Doze imagens remotas verificadas do Pixabay e fallbacks variados para imagens quebradas.
- Melhor corte de imagens, estados de foco, feedback visual de respostas e resultado responsivo.
- Cards acessíveis por teclado e smoke test automatizado dos principais fluxos.

## 🖼️ Imagens e licença

As imagens adicionadas nesta versão são carregadas por URLs do Pixabay e não aumentam o tamanho do repositório. Páginas usadas na pesquisa:

- [Pixabay - panda](https://pixabay.com/images/search/panda/)
- [Pixabay - food](https://pixabay.com/images/search/food/)
- [Pixabay - world landmarks](https://pixabay.com/images/search/world%20landmarks/)
- [Pixabay - space and landscapes](https://pixabay.com/images/search/space/)
- [Pixabay Content License Summary](https://pixabay.com/service/license-summary/)

O conteúdo do Pixabay pode ser usado e adaptado gratuitamente, sujeito aos usos proibidos e demais condições descritas na licença da plataforma.

## 🚀 Deploy no GitHub Pages

A branch de desenvolvimento permanece no repositório principal. Como URLs de projeto do GitHub Pages usam o nome do repositório, a publicação em `/BuzzQuizzv4/` utiliza o repositório de deploy [ManuDiasCruz/BuzzQuizzv4](https://github.com/ManuDiasCruz/BuzzQuizzv4).

Para atualizar a publicação pela linha de comando:

```bash
git remote add deploy https://github.com/ManuDiasCruz/BuzzQuizzv4.git
git push deploy kindle-alpha-enrichment:main
```

No repositório `BuzzQuizzv4`, acesse `Settings > Pages`, selecione `Deploy from a branch`, escolha `main` e a pasta `/ (root)`. O endereço publicado é:

[https://manudiascruz.github.io/BuzzQuizzv4/](https://manudiascruz.github.io/BuzzQuizzv4/)

## Limitações conhecidas e melhorias futuras

- A lista e a criação de quizzes dependem de `mock-api.driven.com.br`; os quizzes locais continuam disponíveis quando a API falha.
- Dados públicos podem conter textos ou URLs de baixa qualidade. A interface valida a estrutura e substitui imagens quebradas, mas não controla o conteúdo do servidor.
- Quizzes criados ficam vinculados ao navegador atual por meio do `localStorage`.
- A aplicação ainda usa Axios, Ionicons e Google Fonts por CDN.
- Próximas melhorias relevantes incluem edição e exclusão de quizzes, filtros e paginação da lista remota, testes completos do fluxo de criação e uma estratégia de dados com autenticação.
