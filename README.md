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

## BuzzQuizz Beeh · v2

Uma evolução do projeto original de programação em dupla, mantendo **HTML, CSS e JavaScript sem framework** e o fluxo de criação em três etapas. Jogue quizzes visuais, acompanhe seus acertos e crie desafios com fotos da coleção ou URLs HTTPS.

- **Aplicação v2:** [manudiascruz.github.io/BuzzQuizzBeeh](https://manudiascruz.github.io/BuzzQuizzBeeh/)
- **Código e revisão:** branch [`buzzquizz-beeh`](https://github.com/ManuDiasCruz/BuzzQuizz/tree/buzzquizz-beeh) deste repositório.
- **Repositório de publicação:** [ManuDiasCruz/BuzzQuizzBeeh](https://github.com/ManuDiasCruz/BuzzQuizzBeeh), branch `gh-pages`.
- O link, a apresentação e o GIF do projeto original foram preservados acima. A configuração Pages de `BuzzQuizz` não é alterada por esta versão.

### Rodar localmente

Requisitos para os comandos abaixo: Git e **Node.js 22 ou superior**. Não há dependências npm para instalar.

```sh
git clone https://github.com/ManuDiasCruz/BuzzQuizz.git
cd BuzzQuizz
git switch buzzquizz-beeh
npm start
```

Abra `http://127.0.0.1:4173/`. Também é possível usar Live Server ou `python -m http.server 4173`. Use um servidor HTTP local, não `file://`.

```sh
npm test       # testes de regras, validação, armazenamento e fluxos
npm run build # gera somente os arquivos públicos em dist/
```

### Melhorias adicionadas em v2

- Reiniciar um quizz limpa acertos, perguntas respondidas, resultado e temporizadores. Uma pergunta não pode pontuar duas vezes.
- A pontuação é `acertos / perguntas × 100`, arredondada; o resultado usa o maior mínimo elegível, independentemente da ordem dos níveis. Resultados de 0% e 100% são tratados corretamente.
- A criação gera objetos independentes para respostas, perguntas e níveis. Campos inválidos não recriam a tela nem apagam os dados.
- Quantidades inteiras limitadas a 3–30 perguntas e 2–10 níveis; validação individual dos níveis, percentual 0 obrigatório, mínimos distintos e respostas com texto/imagem pareados. Perguntas e níveis fechados não podem ser pulados.
- Salvamento local primeiro, confirmação de sucesso só depois da gravação e publicação pública opcional. Seu quizz pode ser jogado imediatamente, sem depender da API.
- Armazenamento versionado em `buzzquizz:quizzes:v2`; leitura defensiva de quizzes antigos em chaves numéricas, sem apagar ou interpretar preferências de outros projetos no mesmo domínio.
- Três quizzes editoriais disponíveis mesmo quando a API não responde; mensagens de carregamento/erro e botão para tentar a comunidade novamente.
- Textos externos escapados, URLs de imagens restritas a HTTPS, cores normalizadas e dados inválidos da API ignorados. Dados extras da API, como tokens, não são persistidos.
- Interface responsiva consistente, botões utilizáveis por teclado, rótulos de formulário, mensagens acessíveis, progresso, contraste de perguntas ajustado e respeito a movimento reduzido.
- Seis fotos do Pixabay servidas localmente: pandas, mar, montanha, floresta e rio. Seletor reutilizável em capas, respostas e níveis; proporções consistentes, carregamento adiado e fallback neutro para imagens quebradas. Veja [IMAGE_CREDITS.md](IMAGE_CREDITS.md).

### Estrutura

| Caminho | Responsabilidade |
| --- | --- |
| `index.html` | Telas do projeto e estrutura semântica |
| `src/script.js` | Fluxos originais de navegação, jogo e criação, corrigidos |
| `src/core.js` | Regras puras e armazenamento, compartilhados com os testes |
| `src/samples.js` | Coleção editorial e opções de fotos |
| `css/` | Estilos originais e ajustes responsivos da v2 |
| `img/pixabay/` | Fotos verificadas e creditadas |
| `tests/` | Testes sem dependências, usando `node:test` |
| `scripts/` | Servidor local, build com lista explícita e publicação |

### Publicar no GitHub Pages

O nome do repositório define o caminho de um site de projeto do Pages: [documentação do GitHub](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site). Para manter o original e publicar em `/BuzzQuizzBeeh/`, usamos um repositório de implantação separado, sem renomear `BuzzQuizz`.

1. Revise, teste, faça commit e envie a branch de origem. A workflow **Validate BuzzQuizz** executa testes, build e disponibiliza o artefato `buzzquizz-pages`; ela não usa segredos nem publica entre repositórios automaticamente.
2. Com Git, Node.js, PowerShell e GitHub CLI autenticados na conta com acesso ao destino, execute:

```powershell
git switch buzzquizz-beeh
npm test
git push origin buzzquizz-beeh
powershell -File scripts/deploy-pages.ps1
```

3. Em **BuzzQuizzBeeh → Settings → Pages**, configure **Deploy from a branch → gh-pages → / (root)**. Não altere a configuração do repositório original. Se estiver preparando outro ambiente, crie previamente o repositório público `ManuDiasCruz/BuzzQuizzBeeh`.
4. Aguarde a conclusão do build Pages e verifique a [aplicação](https://manudiascruz.github.io/BuzzQuizzBeeh/) e o [manifesto de revisão](https://manudiascruz.github.io/BuzzQuizzBeeh/deployment.json).
5. Jogue até o resultado, reinicie e crie um quizz local. Confira também imagens, créditos e navegação em tela estreita.

O build inclui apenas HTML, CSS, JavaScript, as seis fotos verificadas, fallback, `.nojekyll` e `deployment.json`. Exclui `.git`, testes, scripts de desenvolvimento, GIF histórico e arquivos privados. Caminhos relativos funcionam no subdiretório Pages. A publicação usa push normal, sem force-push e sem tokens no código. O script mantém seu checkout de implantação em `.local/` (ignorado pelo Git); em atualizações que removam assets, revise arquivos antigos antes de excluí-los do destino.

### Verificação

Veja [TESTING.md](TESTING.md) para os cenários reproduzidos e a matriz de testes. Os testes automatizados cobrem regras e fluxos isolados; não substituem a verificação visual no navegador.

### Limitações e próximos passos

- A API pública de treinamento da Driven é externa, não tem garantia de disponibilidade e contém conteúdo de terceiros não moderado. A lista exibe no máximo 60 quizzes válidos da resposta, sem paginação. A coleção e cópias locais não dependem dela.
- Fotos externas podem desaparecer, bloquear hotlink ou ter licença desconhecida. O fallback mantém a interface, mas não reconstrói uma resposta que dependa da imagem. Não publique conteúdo sem direitos de uso.
- Quizzes locais ficam neste navegador e origem; não sincronizam entre dispositivos. Limpar dados do site remove as cópias. Ainda não há exportação/importação, edição/exclusão de quizzes salvos ou recuperação de formulário após recarregar a página.
- A publicação na comunidade não tem autenticação de autoria nem chave de idempotência. Uma falha de rede pode deixar o resultado incerto: confira a comunidade antes de repetir. O teste automatizado de publicação usa uma resposta simulada para não criar conteúdo de teste no serviço público.
- A coleção funciona sem a API **depois de a página carregar**; não há service worker para abrir o site totalmente sem rede. Google Fonts é opcional, com fonte de sistema como alternativa.
- Futuras melhorias: backend com autoria/moderação, rascunhos e backup local, testes reais de navegador em CI e imagens responsivas WebP/AVIF.
