## ⚡️ Buzz Quizz

Aplicação front-end de quizzes com listagem pública, criação de quiz personalizado e cálculo de resultado por desempenho.

![Demonstração do BuzzQuizz](img/Buzz_quizz.gif)

- Projeto original: https://manudiascruz.github.io/BuzzQuizz/
- Deploy v2.2: https://manudiascruz.github.io/BuzzQuizzv22/

## 📝 Visão geral do projeto

O Buzz Quizz é uma SPA simples em **HTML + CSS + JavaScript** que consome a API da Driven para:
- listar quizzes públicos,
- abrir e responder um quiz,
- criar quizzes customizados com perguntas, respostas e níveis,
- armazenar quizzes criados no `localStorage`.

## 🚀 Como rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/ManuDiasCruz/BuzzQuizz.git
   ```
2. Entre na pasta:
   ```bash
   cd BuzzQuizz
   ```
3. Abra o `index.html` com uma extensão como **Live Server** (VS Code) para evitar problemas com carregamento local.

## ✅ Melhorias adicionadas na v2.2

- Correção do fluxo de resposta do quiz:
  - avanço para a próxima pergunta corrigido,
  - cálculo de percentual final revisado,
  - seleção de nível final baseada corretamente no `minValue`.
- Correção de bugs de criação de quiz:
  - cada pergunta/resposta/nível agora é criado como objeto independente,
  - validação de níveis passa a considerar o bloco correto em vez de sempre o primeiro.
- Melhorias de robustez:
  - reset do estado global ao abrir um novo quiz,
  - correção de marcação HTML inválida em renderização dinâmica.
- Melhorias visuais/conteúdo:
  - substituição de imagens antigas/inconsistentes por imagens mais estáveis e de melhor qualidade (Pixabay).

## 🌐 Deploy no GitHub Pages

### Branch de trabalho
- `buzzquizz-v2-2`

### Publicação
1. Faça push da branch:
   ```bash
   git push -u origin buzzquizz-v2-2
   ```
2. Abra o Pull Request para a branch principal.
3. Após merge, publique a versão configurando o GitHub Pages para a branch/pasta desejada.
4. Link esperado da v2.2:
   - https://manudiascruz.github.io/BuzzQuizzv22/

## 🔒 Licenças e segurança de assets

- As novas imagens remotas utilizadas foram escolhidas de catálogo público (Pixabay).
- Não foram adicionados segredos, tokens, credenciais ou arquivos sensíveis ao repositório.
- Apenas arquivos diretamente relacionados ao projeto foram alterados.

## 🧭 Limitações conhecidas e próximos passos

- O projeto ainda depende de API externa; indisponibilidade do serviço impacta carregamento/criação.
- Não há suíte automatizada de testes end-to-end.
- Pode haver melhorias de acessibilidade (contraste, foco e navegação por teclado).
- Futuras melhorias recomendadas:
  - testes automatizados,
  - estados de loading/erro mais amigáveis,
  - paginação/filtro da lista de quizzes,
  - internacionalização e ajustes de responsividade fina.
