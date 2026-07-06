# ⚡ BuzzQuizz

Aplicação front-end que simula um site de quizzes. O projeto permite explorar quizzes publicados, responder perguntas com feedback visual, ver um resultado calculado por níveis e criar quizzes personalizados.

<img src="img/Buzz_quizz.gif" width="400" alt="Demonstração original do BuzzQuizz" />

## 📝 Sobre o projeto original

A aplicação foi criada para treinar programação em dupla por meio da construção de um site de quizzes. As tecnologias utilizadas foram HTML, CSS e JavaScript.

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

- Código-fonte: [ManuDiasCruz/BuzzQuizz](https://github.com/ManuDiasCruz/BuzzQuizz)
- Site do repositório: [https://manudiascruz.github.io/BuzzQuizz/](https://manudiascruz.github.io/BuzzQuizz/)
- Branch v2: `buzzquizz-H2H-blue`

> O endereço de GitHub Pages é derivado do nome do repositório. Como esta versão continua no repositório `BuzzQuizz`, o endereço publicável por ele é `/BuzzQuizz/`. O endereço solicitado `/BuzzQuizzH2HBlue/` requer um repositório de Pages chamado `BuzzQuizzH2HBlue` (que ainda não existe nesta conta) ou uma estratégia de domínio/proxy separada.

## ✨ Melhorias da v2

- Adiciona um quiz local completo sobre pandas, com dez fotos diversificadas do Pixabay, para manter um fluxo jogável mesmo quando a API legada está indisponível.
- Corrige a criação de respostas, perguntas e níveis, que antes reutilizava os mesmos objetos e sobrescrevia dados já preenchidos.
- Corrige a validação de cada nível e interrompe corretamente o envio ao encontrar um nível inválido.
- Exige que todas as perguntas e níveis configurados sejam abertos e preenchidos.
- Corrige o cálculo do percentual e a seleção do nível de resultado.
- Reinicia pontuação e progresso ao abrir ou reiniciar um quiz.
- Move o scroll para a próxima pergunta real, em vez de calcular o destino a partir da resposta selecionada.
- Recupera o catálogo com fallback local e salva quizzes criados no navegador se a API não responder.
- Isola as chaves do BuzzQuizz no `localStorage` e ignora dados inválidos ou pertencentes a outros aplicativos.
- Trata texto e URLs vindos da API antes de renderizá-los no HTML.
- Corrige HTML duplicado/malformado, melhora textos alternativos, foco de teclado, responsividade, recorte de imagens, feedback visual e consistência dos cartões.
- Registra as fontes e os termos aplicáveis às novas imagens em [`img/README.md`](img/README.md).

## 🚀 Abrir e executar localmente

1. Clone o repositório e selecione a branch:

   ```bash
   git clone https://github.com/ManuDiasCruz/BuzzQuizz.git
   cd BuzzQuizz
   git switch buzzquizz-H2H-blue
   ```

2. Sirva a pasta com um servidor HTTP. Exemplos:

   ```bash
   python -m http.server 8000
   ```

   ou use a extensão [Live Server](https://github.com/ritwickdey/vscode-live-server) no Visual Studio Code.

3. Abra `http://localhost:8000`.

4. Para executar as verificações automatizadas de lógica (Node.js 18+):

   ```bash
   node tests/quiz-logic.test.js
   ```

## 📦 Publicação no GitHub Pages

A automação em `.github/workflows/deploy-pages.yml` valida pushes na branch `buzzquizz-H2H-blue`. O ambiente protegido `github-pages` deste repositório aceita deployments a partir de `main`; por isso, depois do merge do PR, o mesmo fluxo testa novamente, monta somente os arquivos estáticos e publica o site automaticamente.

1. Em **Settings → Pages**, confirme **Source: GitHub Actions** e a regra do ambiente `github-pages` permitindo a branch `main`.
2. Faça o merge do PR da branch `buzzquizz-H2H-blue` em `main`.
3. Confirme a execução **Deploy BuzzQuizz to GitHub Pages** na aba Actions.
4. Acesse [https://manudiascruz.github.io/BuzzQuizz/](https://manudiascruz.github.io/BuzzQuizz/).

Para hospedar exatamente em [https://manudiascruz.github.io/BuzzQuizzH2HBlue/](https://manudiascruz.github.io/BuzzQuizzH2HBlue/), crie/autorize um repositório chamado `BuzzQuizzH2HBlue` e publique a mesma build nele.

## 🖼️ Imagens e licença

As novas imagens `pixabay-*.jpg` vêm do Pixabay. As páginas/fontes estão documentadas em [`img/README.md`](img/README.md). Verifique a [licença atual do Pixabay](https://pixabay.com/service/license-summary/) e direitos adicionais aplicáveis antes de reutilizar as imagens fora deste projeto.

## ⚠️ Limitações e próximos passos

- A listagem e publicação global de quizzes ainda dependem da API pública legada `mock-api.driven.com.br`; o fallback e o salvamento local cobrem indisponibilidade, mas não sincronizam dados entre dispositivos.
- A API não oferece autenticação, edição ou exclusão durável dos quizzes nesta versão.
- A criação ainda usa URLs externas informadas pelo usuário; uma evolução futura pode validar dimensões, disponibilidade e tipo real do arquivo antes de salvar.
- A automação não pode alterar sozinha a opção **Source** do GitHub Pages nem criar o repositório necessário para o caminho `/BuzzQuizzH2HBlue/` sem autorização/configuração específica da conta.
- Testes end-to-end em múltiplos navegadores e uma suíte completa de acessibilidade ainda devem ser adicionados.
