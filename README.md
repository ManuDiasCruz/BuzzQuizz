## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src=img/Buzz_quizz.gif  width="400" />

[Buzz Quizz (versão original)](https://manudiascruz.github.io/BuzzQuizz/) · [Buzz Quizz v2 (versão melhorada)](https://manudiascruz.github.io/BuzzQuizzv723FH/)

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

O usuário pode:

- Listar todos os quizzes disponíveis no servidor (`mock-api.driven.com.br`);
- Jogar qualquer quizz, com feedback de acerto/erro e um resultado final por nível;
- Criar seus próprios quizzes (perguntas, respostas e níveis), que ficam salvos no servidor e na seção "Seus Quizzes" (via `localStorage`).

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
npx http-server . -p 8080
```

e acessar `http://localhost:8080` no navegador. Não há etapa de build — é HTML/CSS/JS puro.

## ✨ Melhorias da v2 (branch `723-fh-bq`)

Correções de bugs:

- **Reiniciar Quizz funcionava só uma vez**: os contadores de acertos/perguntas respondidas não eram zerados, então a tela de resultado nunca mais aparecia. Agora o estado é reiniciado a cada abertura de quizz.
- **Cálculo de nível errado**: a lógica antiga usava um acumulador global e uma comparação invertida, podendo dar o nível errado para a pontuação. Agora o nível é o de maior `minValue` alcançado pela porcentagem de acertos.
- **Criação de quizz corrompida**: perguntas, respostas e níveis compartilhavam o mesmo objeto global, então todas as perguntas/respostas/níveis do quizz criado saíam iguais à última preenchida. Corrigido com objetos novos por item.
- **Imagem do quizz criado sobrescrita**: a imagem escolhida pelo usuário era trocada por uma URL quebrada antes do envio ao servidor.
- **Validações**: todos os níveis passaram a ser validados (antes só o primeiro), erros de validação não recarregam mais a página (não se perde mais o que foi digitado) e as mensagens indicam qual pergunta/nível está incompleto.
- **HTML malformado**: tags `</html>`/`</body>` duplicadas, scripts fora do documento e divs sem fechamento.
- **Colisão de classes na home**: os cartões de "Seus Quizzes" e "Todos os Quizzes" usavam as mesmas classes, aplicando imagens de fundo nos cartões errados.

Melhorias de UX/visuais:

- Imagens locais de reserva (fallback) para quizzes/respostas/resultados com URLs de imagem quebradas — muito comum na base pública;
- Novas imagens do [Pixabay](https://pixabay.com/) (licença Pixabay, uso livre) em `img/`;
- Cursor de clique e efeito hover em cartões, respostas e botões; destaque visual da resposta escolhida;
- Imagens sem distorção (`object-fit`/`background-size: cover`) e cantos arredondados;
- Rolagem automática para a próxima pergunta após responder (antes rolava para a resposta errada do mesmo bloco);
- Favicon e ilustração no estado vazio da home.

## 🚀 Deploy (GitHub Pages)

A versão melhorada está publicada em: **https://manudiascruz.github.io/BuzzQuizzv723FH/**

Para publicar uma nova versão:

1. Faça as alterações e commit na branch desejada;
2. Envie os arquivos para o repositório de deploy (`BuzzQuizzv723FH`), branch `main`;
3. Em *Settings > Pages* do repositório, mantenha a origem como `main` / raiz (`/`);
4. Aguarde o build do GitHub Pages (1–2 minutos) e verifique a URL acima.

## ⚠️ Limitações conhecidas / próximos passos

- A API `mock-api.driven.com.br` é pública e compartilhada: qualquer pessoa pode criar quizzes, e os dados podem ser apagados periodicamente;
- Não há edição nem exclusão de quizzes criados (os ícones `editar/deletar` existem em `img/` mas a funcionalidade não foi implementada);
- A resposta correta é identificável pelo HTML (classe `true`), o que permite "colar";
- `localStorage` guarda apenas os quizzes criados naquele navegador;
- Sem testes automatizados;
- O GIF do README (`img/Buzz_quizz.gif`, ~9 MB) poderia ser otimizado.

## 🖼️ Créditos das imagens

Imagens de `img/` (exceto ícones e o GIF) obtidas em [pixabay.com](https://pixabay.com/) sob a [Pixabay Content License](https://pixabay.com/service/license-summary/), que permite uso e modificação livres.
