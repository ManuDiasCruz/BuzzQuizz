/* Pure quiz rules shared by the browser and the regression tests. */
(function (root) {
    "use strict";
    const text = value => typeof value === "string" ? value.trim() : "";
    function imageURL(value) {
        if (/^img\/collection\/(panda|red-panda|bamboo|desert|ocean|coffee)\.webp$/.test(value)) return true;
        try {
            const url = new URL(value);
            return url.protocol === "https:" && !url.username && !url.password;
        } catch { return false; }
    }
    function integer(value, min, max) {
        return String(value).trim() !== "" && Number.isInteger(Number(value)) && Number(value) >= min && Number(value) <= max;
    }
    function basicError(quiz, questions, levels) {
        if (text(quiz.title).length < 20 || text(quiz.title).length > 65) return "Use um título de 20 a 65 caracteres.";
        if (!imageURL(quiz.image)) return "Use uma URL de imagem HTTPS válida ou escolha uma foto da galeria.";
        if (!integer(questions, 3, 20)) return "Escolha de 3 a 20 perguntas, usando um número inteiro.";
        if (!integer(levels, 2, 10)) return "Escolha de 2 a 10 níveis, usando um número inteiro.";
        return "";
    }
    function questionError(question) {
        if (text(question.title).length < 20) return "A pergunta precisa de pelo menos 20 caracteres.";
        if (!/^#[a-f\d]{6}$/i.test(question.color)) return "Escolha uma cor válida para a pergunta.";
        if (!Array.isArray(question.answers) || question.answers.length < 2 || question.answers.length > 4) return "Preencha a resposta correta e pelo menos uma incorreta.";
        if (question.answers.filter(answer => answer.isCorrectAnswer === true).length !== 1) return "Cada pergunta precisa de exatamente uma resposta correta.";
        if (question.answers.some(answer => !text(answer.text) || !imageURL(answer.image))) return "Cada resposta preenchida precisa de texto e imagem HTTPS. Deixe as duas caixas vazias para omitir uma resposta opcional.";
        if (new Set(question.answers.map(answer => text(answer.text).toLocaleLowerCase('pt-BR'))).size !== question.answers.length) return "Use textos diferentes para cada resposta.";
        return "";
    }
    function levelError(level) {
        if (text(level.title).length < 10) return "O título do nível precisa de pelo menos 10 caracteres.";
        if (!integer(level.minValue, 0, 100)) return "A porcentagem precisa ser um número inteiro de 0 a 100.";
        if (!imageURL(level.image)) return "Escolha uma imagem ou use uma URL HTTPS válida.";
        if (text(level.text).length < 30) return "A descrição precisa de pelo menos 30 caracteres.";
        return "";
    }
    function levelsError(levels) {
        if (!levels.some(level => String(level.minValue).trim() !== "" && Number(level.minValue) === 0)) return "Inclua um nível com porcentagem mínima de 0%.";
        if (new Set(levels.map(level => Number(level.minValue))).size !== levels.length) return "Use uma porcentagem mínima diferente para cada nível.";
        return "";
    }
    function result(quiz, correct) {
        const percentage = Math.round(correct / quiz.questions.length * 100);
        const level = [...quiz.levels].sort((a, b) => Number(b.minValue) - Number(a.minValue)).find(item => Number(item.minValue) <= percentage);
        return { percentage, level };
    }
    function shuffle(items, random = Math.random) {
        const copy = items.map(item => ({ ...item }));
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }
    // Tolerate legacy title lengths, but reject data that cannot be played safely.
    function playable(quiz) {
        return !!quiz && typeof quiz.title === "string" && quiz.title.trim().length > 0 &&
            Array.isArray(quiz.questions) && quiz.questions.length >= 1 && quiz.questions.length <= 20 &&
            quiz.questions.every(q => q && typeof q.title === "string" && Array.isArray(q.answers) && q.answers.length >= 2 && q.answers.length <= 4 &&
                q.answers.every(a => a && typeof a.text === "string" && typeof a.isCorrectAnswer === "boolean") && q.answers.filter(a => a.isCorrectAnswer).length === 1) &&
            Array.isArray(quiz.levels) && quiz.levels.length > 0 && quiz.levels.length <= 10 &&
            quiz.levels.every(l => l && typeof l.title === "string" && typeof l.text === "string" && integer(l.minValue, 0, 100)) &&
            quiz.levels.some(l => Number(l.minValue) === 0);
    }
    function readSaved(storage) {
        const quizzes = [];
        try {
            // Only the namespaced collection and numeric keys from the original app.
            try {
                const collection = JSON.parse(storage.getItem("buzzquizz:been:v2") || "[]");
                if (Array.isArray(collection)) quizzes.push(...collection.filter(playable));
            } catch { /* A corrupt collection must not prevent reading valid legacy quizzes. */ }
            for (let i = 0; i < storage.length; i++) {
                const key = storage.key(i);
                if (!/^\d+$/.test(key)) continue;
                try {
                    const candidate = JSON.parse(storage.getItem(key));
                    if (playable(candidate)) quizzes.push(candidate);
                } catch { /* Ignore malformed legacy entries; never delete unrelated data. */ }
            }
        } catch { /* Storage may be unavailable, malformed or blocked. */ }
        return [...new Map(quizzes.filter(q => q.id != null).map(q => [String(q.id), q])).values()].map(q => {
            const clean = { id: q.id, title: q.title, image: q.image, questions: q.questions, levels: q.levels };
            if (q.localOnly) clean.localOnly = true;
            return clean;
        });
    }
    const api = { imageURL, integer, basicError, questionError, levelError, levelsError, result, shuffle, playable, readSaved };
    if (typeof module !== "undefined" && module.exports) module.exports = api;
    else root.QuizCore = api;
})(typeof window !== "undefined" ? window : this);
