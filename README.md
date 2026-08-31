## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src=img/Buzz_quizz.gif  width="400" />

[Buzz Quizz](https://manudiascruz.github.io/BuzzQuizz/)

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

## 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

## 🛠️ Abrir e rodar o projeto

Após baixar o projeto, você pode abri-lo com o Visual Studio Code. Para isso, na tela de launcher clique em:

- File > Open Folder
- Procure o local onde o projeto está e o selecione (Caso o projeto seja baixado via zip, é necessário extraí-lo antes de procurá-lo)
- Por fim clique em Abrir

Para rodar o projeto você pode utilizar o [Live Server](https://github.com/ritwickdey/vscode-live-server).

---

## 🌿 BuzzQuizz Been — v2

Evolução do projeto original em **HTML, CSS e JavaScript puro**, mantendo a proposta de programação em dupla, o formato de dados, as telas de listagem/jogo e o fluxo de criação em três etapas. Os renderizadores originais do formulário foram separados em `src/wizard.js`, com botões acessíveis e galeria de imagens. Não há framework ou dependência de produção.

**[Abrir BuzzQuizz Been](https://manudiascruz.github.io/BuzzQuizzBeen/)** · [Branch de desenvolvimento](https://github.com/ManuDiasCruz/BuzzQuizz/tree/buzzquizz-been)

A página e o GIF acima documentam a versão original. O endereço `/BuzzQuizz/` foi preservado; a v2 usa `/BuzzQuizzBeen/`.

### Rodar e testar localmente

Requisito: **Node.js 22 ou superior**. Não é necessário executar `npm install`.

```sh
git clone https://github.com/ManuDiasCruz/BuzzQuizz.git
cd BuzzQuizz
git switch buzzquizz-been
npm start
```

Abra `http://127.0.0.1:4387`. Para outra porta, defina a variável `PORT` (PowerShell: `$env:PORT='4388'`). Também é possível usar o Live Server, como na versão original. Sirva por HTTP; abrir diretamente com `file://` não é suportado.

```sh
npm test
npm run build
```

`npm test` executa os testes de regressão do Node, sem serviços externos. `npm run build` copia somente arquivos públicos permitidos para `dist/` e gera `release.json` com a revisão de origem. O servidor local não expõe diretórios ocultos.

Para testar o formulário sem criar quizzes públicos, abra `http://127.0.0.1:4387/__test__/`. Essa rota exclusiva do servidor de desenvolvimento simula a API. Acrescente `?offline=1` para simular falhas de leitura e publicação. O fixture **não é incluído no build**. Use uma sessão de navegador separada para testes; quizzes locais de teste permanecem nessa origem.

### Melhorias da v2

- Pontuação calculada diretamente pelos acertos, incluindo 0%; seleção do maior nível elegível independentemente da ordem dos níveis.
- Reiniciar limpa pontuação e respostas; cada pergunta aceita uma única seleção. Navegação explícita substitui os timers que rolavam para respostas incorretas.
- Perguntas, respostas e níveis são objetos independentes, corrigindo a sobrescrita de dados por referências compartilhadas.
- Validação de todas as perguntas e níveis, sem recarregar a página nem apagar os campos; respostas opcionais exigem texto e imagem em pares.
- Contagens inteiras e limitadas, títulos com tamanho válido, nível de 0% obrigatório e porcentagens sem duplicatas.
- Publicação aguarda a resposta; botão bloqueia cliques duplicados. Uma cópia local é feita antes do envio e permanece jogável se a API falhar. Falha de armazenamento é informada, sem falsa promessa de persistência.
- Coleção de três quizzes revisados, disponíveis sem depender da API. Isso não equivale a suporte offline completo: o site ainda precisa ser carregado.
- Busca da comunidade, estados de carregamento/erro/vazio e atualização manual. A busca mostra até 24 resultados para limitar imagens e manter a página leve.
- Layout consistente em desktop e celular, foco visível, controles de teclado, rótulos dos campos e feedback de acerto que não depende só de cor.
- Seis fotografias Pixabay otimizadas em WebP, reutilizáveis na capa, respostas e níveis; proporções consistentes, lazy loading e fallback local. [Créditos e licenças](IMAGE_CREDITS.md).
- Conteúdo externo renderizado com `textContent`, URLs controladas e respostas inválidas rejeitadas. Segredos de edição da API não são persistidos por novas publicações. Sem Axios, Ionicons ou fontes remotas obrigatórias.
- Testes automáticos e build verificados pelo GitHub Actions em pushes da branch e PRs para `main`.

### Estrutura

| Caminho | Responsabilidade |
| --- | --- |
| `index.html` | Telas, estrutura semântica e navegação |
| `src/script.js` | Estado, API, persistência, jogo e validação do fluxo |
| `src/core.js` | Regras puras testáveis |
| `src/wizard.js` | Renderizadores do formulário derivados do projeto original |
| `src/collection.js` | Coleção revisada e galeria Pixabay |
| `css/` | Estilos originais e refinamentos responsivos em `v2.css` |
| `img/collection/` | Somente as seis imagens otimizadas |
| `scripts/` | Servidor local, build com lista permitida e publicação |
| `tests/` | Regressões e fixture de navegador não publicado |

### Deploy no GitHub Pages

O GitHub Pages associa o caminho de projeto ao **nome do repositório**. Por isso, o código e o PR ficam em `ManuDiasCruz/BuzzQuizz`, na branch `buzzquizz-been`, e os arquivos públicos gerados são publicados no repositório `ManuDiasCruz/BuzzQuizzBeen`, branch `gh-pages`, raiz `/`. A configuração Pages do projeto original não precisa ser alterada.

1. Execute os testes, revise os arquivos e faça commit na branch `buzzquizz-been`.
2. Envie a branch ao repositório original e abra/atualize o PR.
3. Com GitHub CLI autenticado e permissão nos dois repositórios, execute `node scripts/deploy.cjs`. O script exige a branch correta e árvore rastreada limpa, verifica testes, gera o build, clona **apenas a branch de deploy** em uma pasta temporária ignorada e faz push normal (sem force).
4. No repositório **BuzzQuizzBeen**, escolha **Settings → Pages → Deploy from a branch → gh-pages → /(root)**. Na primeira publicação, crie o repositório público antes de executar o script.
5. Aguarde o job **pages build and deployment** e verifique [o site publicado](https://manudiascruz.github.io/BuzzQuizzBeen/). Compare `/BuzzQuizzBeen/release.json` com o commit de origem e teste coleção, resultado, reinício, criação e imagens.

O workflow `checks.yml` gera um artefato público revisável, mas **não usa tokens entre repositórios nem publica automaticamente no outro repositório**. Publicar pelo script usa as credenciais locais já configuradas do Git/GitHub CLI; nenhum token deve entrar no código, README ou histórico.

### Segurança, persistência e limitações

- A API educacional `mock-api.driven.com.br/api/v4/buzzquizz/quizzes` é externa, pública e sem garantia de disponibilidade, privacidade ou moderação. Não inclua informações pessoais. Não são enviados quizzes de teste reais pelos testes automatizados.
- Quizzes criados são guardados em `localStorage` sob `buzzquizz:been:v2`; entradas numéricas válidas da versão original também são lidas sem remover dados de outros aplicativos. Armazenamento pertence à **origem**, não ao caminho: sites Pages do mesmo usuário compartilham a origem. Teste em sessão separada quando necessário.
- Quizzes locais não sincronizam entre dispositivos e podem ser perdidos ao limpar dados do navegador. Falha/timeout de publicação mantém uma cópia local, mas o servidor pode ter aceitado uma requisição cujo retorno se perdeu; não fazemos retry automático de POST.
- Rascunhos de criação ainda não são recuperados ao recarregar/sair. Não há edição/exclusão, importação/exportação, URLs diretas de quizzes ou login nesta versão.
- Fotos de terceiros podem deixar de existir e seu conteúdo/licença não é verificado automaticamente. O fallback preserva o fluxo de jogo. A coleção própria usa arquivos locais com procedência documentada.
- Navegadores modernos com `fetch`, `AbortSignal.timeout`, `structuredClone` e WebP são necessários. Revisões manuais de acessibilidade com leitores de tela e cobertura em outros navegadores continuam recomendadas.
- Melhorias futuras prioritárias: rascunhos e exportação, backend próprio com moderação e testes de navegador automatizados. Veja as issues associadas à branch `buzzquizz-been`.

Detalhes e evidências de verificação: [TESTING.md](TESTING.md).
