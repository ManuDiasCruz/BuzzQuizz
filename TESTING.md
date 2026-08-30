# Registro de testes · v2

Data: 30/08/2026. Branch: `buzzquizz-beeh`.

## Problemas encontrados no original

| Problema | Evidência | Correção |
| --- | --- | --- |
| URL sem protocolo e quantidade fracionária aceitas | No navegador local, `example.com/photo.jpg` e `3.5` avançavam para perguntas | URL HTTPS e números inteiros limitados |
| Erro de validação apaga a pergunta digitada | Digitar uma pergunta e avançar sem respostas recriava o formulário vazio | Erro inline e preservação dos campos |
| Respostas/perguntas/níveis sobrescrevem os anteriores | Funções montadoras mutavam os mesmos objetos globais | Novo objeto por item; teste de independência |
| Reinício conserva contadores | `reiniciarQuizz` só recarregava o quizz e apagava o resultado | Reset do estado e cancelamento dos timers |
| Resultado depende da ordem dos níveis/soma de mínimos | Acumulador `leveltotal` e comparação invertida em `quantidadeAcertos` | Porcentagem direta e maior mínimo elegível |
| Validação só lê o primeiro nível | `validarDadosNivel` ignorava o elemento recebido | Validação de cada bloco, inclusive campos vazios |
| Sucesso antes da gravação e capa inválida | Tela de sucesso era chamada antes do POST e sobrescrevia a imagem com URL truncada | Gravação confirmada, capa preservada, publicação opcional |
| Imagens e conteúdo externos sem proteção | Interpolação direta de dados da API, seletores de cartões repetidos | Escape de texto, normalização, IDs independentes e fallback |

## Automatizado

`npm test` usa o runner nativo do Node, sem bibliotecas externas. `core.test.cjs` verifica pontuação 0/33/67/100%, ordem dos níveis, URLs, contagens, shuffle não mutante, normalização e armazenamento. `flows.test.cjs` executa as funções reais em contexto isolado com interfaces de DOM/API simuladas: objetos independentes, validação por nível, perguntas fechadas, preservação de campos, bloqueio de resposta duplicada, falha de armazenamento e erros HTTP/JSON.

`npm run build` gera uma lista explícita de assets e um manifesto com o commit de origem. `git diff --check` verifica erros de whitespace. A CI repete testes e build no Node 22.

## Navegador local

- Original executado em servidor HTTP local antes das alterações.
- Coleção: resultado 100%, reinício com progresso zerado, nova tentativa com 0%.
- Respostas ficam desabilitadas; retorno ao início não conserva resultado/timer.
- Criação: quantidade fracionária rejeitada, perguntas fechadas bloqueadas, campo digitado preservado.
- Três perguntas distintas e dois níveis; segundo nível inválido bloqueia a gravação sem apagar o primeiro.
- Foto escolhida preservada no sucesso; quizz local jogável imediatamente; controles implementados como botões nativos. A simulação de Tab/Enter do navegador de teste não moveu o foco, portanto a navegação exclusivamente por teclado precisa de verificação manual adicional (issue #93).
- Resultado de dois acertos em três perguntas: 67%, nível correto.
- Tela de 390 px verificada com largura real de layout e ausência de rolagem horizontal; imagens da coleção carregadas.
- Publicação real não é acionada com conteúdo de teste: sua recuperação é coberta por testes isolados.

## Checklist de produção

Após cada publicação: verificar o manifesto `deployment.json`, respostas HTTP dos assets, fluxo coleção → respostas → resultado → reinício → início, criação local, persistência após reload, créditos e layout estreito. A indisponibilidade da comunidade deve aparecer como aviso, sem impedir a coleção local.

### Verificação realizada no GitHub Pages

- Build Pages concluído com sucesso e site servido por `BuzzQuizzBeeh/gh-pages`, sem alterar o Pages original.
- Manifesto de origem conferido; HTML, JS, CSS v2, créditos, fallback e as seis fotos responderam HTTP 200.
- Quizz de paisagens completo: 100%, reinício em 0 de 3 respondidas e retorno ao início.
- Comunidade carregou 38 quizzes válidos durante a verificação; registros inválidos foram ignorados.
- Criação de três perguntas e dois níveis em 390 px, com capa preservada e nenhum overflow horizontal/imagem quebrada na tela de sucesso. O quizz foi salvo somente no navegador, sem publicar dados de teste na API.
- Uma descrição de resposta foi ajustada para corresponder à foto do Monte Fuji ao pôr do sol, sem presumir neve visível.
