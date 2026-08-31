## ⚡️ Buzz Quizz

<p>Aplicação front-end que visa simular um site de quizzes.</p>

<img src=img/Buzz_quizz.gif  width="400" />

[Buzz Quizz — versão original](https://manudiascruz.github.io/BuzzQuizz/) · [Buzz Quizz v2 (esta branch)](https://manudiascruz.github.io/BuzzQuizzFeh/)

## 📝 Sobre

<p>A aplicação foi feita com o objetivo de treinar a programação em dupla por meio da confecção de um site de quizzes. As tecnologias utilizadas foram: HTML, CSS e Javascript.</p>

Funcionalidades principais:

- Listar todos os quizzes disponíveis no servidor (mock API da Driven) e os quizzes criados pelo próprio usuário (guardados em `localStorage`);
- Responder um quizz, com feedback visual de acerto/erro por pergunta e tela de resultado com percentual e nível atingido;
- Criar um quizz próprio em 3 etapas (dados básicos → perguntas → níveis), com validação de campos e envio ao servidor.

[![My Skills](https://skills.thijs.gg/icons?i=html,css,javascript&theme=light)](https://skills.thijs.gg)

## 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/ManuDiasCruz/BuzzQuizz) ou [baixá-lo](https://github.com/ManuDiasCruz/BuzzQuizz/archive/refs/heads/main.zip).

## 🛠️ Abrir e rodar o projeto

Após baixar o projeto, você pode abri-lo com o Visual Studio Code. Para isso, na tela de launcher clique em:

- File > Open Folder
- Procure o local onde o projeto está e o selecione (Caso o projeto seja baixado via zip, é necessário extraí-lo antes de procurá-lo)
- Por fim clique em Abrir

Para rodar o projeto você pode utilizar o [Live Server](https://github.com/ritwickdey/vscode-live-server).

Alternativamente, qualquer servidor estático funciona. Por exemplo, com Python instalado:

```bash
python -m http.server 8000
```

E acesse `http://localhost:8000` no navegador. Não há etapa de build nem dependências para instalar — o projeto é HTML/CSS/JS puro (o axios e o ionicons são carregados via CDN).

## ✨ Melhorias da v2 (branch `buzzquizz-feh`)

### Bugs corrigidos

- **Reiniciar Quizz funcionava só uma vez**: os contadores de acertos e de questões respondidas nunca eram zerados, então após reiniciar o resultado nunca mais aparecia (e o percentual acumulava acima de 100%). Agora todo quizz aberto começa do zero.
- **Nível de resultado errado**: a seleção de nível usava uma comparação invertida (`percentual <= minValue`) alimentada por um acumulador global que nunca era zerado — 0% de acerto podia exibir o nível máximo. Agora o nível escolhido é o de maior `minValue` que o percentual alcançou.
- **Criação de quizz gerava perguntas/respostas/níveis todos iguais**: as funções de montagem mutavam e reutilizavam o mesmo objeto global, então o quizz criado continha N cópias do último item preenchido. Agora cada item é um objeto novo.
- **Imagem do quizz criado era sobrescrita** por uma URL quebrada fixa no código antes do envio ao servidor; a figura da tela de sucesso também nunca exibia imagem (atribuía a uma propriedade inexistente).
- **"Voltar pra home" após criar quizz deixava a página em branco**: o container da home não tinha seu `display` restaurado.
- **Validação de níveis só validava o primeiro nível** e, em caso de erro, recarregava a página inteira, apagando tudo que o usuário digitou. Erros de validação agora preservam o formulário preenchido.
- **HTML malformado**: `</body></html>` duplicados, scripts fora do documento, `div` sem fechamento e meta viewport duplicada.
- **Cartões com imagem trocada**: as listas "Seus Quizzes" e "Todos os Quizzes" usavam as mesmas classes (`quizz0`, `quizz1`...), fazendo o fundo de um cartão ser aplicado no outro; a lista local também duplicava cartões a cada renderização.
- **Rolagem pós-resposta** apontava para a próxima *resposta* da mesma pergunta (podendo estourar erro em elemento inexistente) em vez da próxima pergunta.
- **CSS**: seletor `.fim.resultado` (sem espaço) nunca aplicava o estilo do resultado no desktop; `font:` inválido na textarea de descrição de nível.

### UX e visual

- Imagens de cartões, banner e respostas com `background-size: cover`/`object-fit: cover` (antes esticavam/distorciam);
- `cursor: pointer` e feedback de hover em botões, cartões e ícones;
- Fallback local para imagens quebradas de respostas e de níveis (muitos quizzes antigos do servidor têm URLs mortas);
- Percentual vazio não conta mais como nível "0%" na validação; título de nível com `minlength` alinhado à validação;
- Mensagens de erro revisadas (typos corrigidos).

### Imagens

- Novas imagens locais em `img/` obtidas no [Pixabay](https://pixabay.com/images/search/) sob a [Pixabay Content License](https://pixabay.com/service/license-summary/) (uso livre, sem atribuição obrigatória): banner padrão do quizz, placeholder de cartões, fallback de respostas e troféu de resultado;
- Removidas imagens não referenciadas do repositório.

### Código

- ~150 linhas de dados de exemplo e funções mortas removidas;
- URL da API centralizada em constante;
- Validação de URL passou a exigir protocolo `http(s)://` (URLs sem protocolo viravam caminhos relativos quebrados).

## 🚀 Deploy (GitHub Pages)

A v2 está publicada em: **https://manudiascruz.github.io/BuzzQuizzFeh/**

Para publicar uma nova versão:

1. Faça as alterações e commit na branch desejada;
2. Envie o conteúdo para a branch `main` do repositório [BuzzQuizzFeh](https://github.com/ManuDiasCruz/BuzzQuizzFeh) (`git push feh buzzquizz-feh:main`);
3. O GitHub Pages do repositório está configurado para servir a branch `main` (raiz `/`) — o deploy é automático após o push (Settings → Pages para conferir a configuração).

A versão original permanece em https://manudiascruz.github.io/BuzzQuizz/.

## ⚠️ Limitações conhecidas e próximos passos

- A API (`mock-api.driven.com.br`) é um servidor de testes público e compartilhado: os quizzes listados incluem dados de teste de terceiros e podem desaparecer;
- "Seus Quizzes" usa `localStorage`, portanto os quizzes criados só aparecem como seus no mesmo navegador/dispositivo;
- Não há edição nem exclusão de quizzes criados (a API exige uma `key` devolvida na criação, que já é guardada localmente — implementar seria um próximo passo natural);
- As mensagens de erro/sucesso usam `alert()`; substituí-las por toasts/modais melhoraria a experiência;
- Sem testes automatizados; a verificação é manual via navegador.
