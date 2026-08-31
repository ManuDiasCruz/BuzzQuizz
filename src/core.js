/* Shared, dependency-free rules used by the browser and Node regression tests. */
const QuizCore = (() => {
    const STORAGE_KEY = 'buzzquizz:v2:quizzes';
    const text = value => typeof value === 'string' ? value.trim() : '';
    const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);

    function validURL(value) {
        try {
            const url = new URL(value);
            return url.protocol === 'https:' && !!url.hostname && !url.username && !url.password;
        } catch { return false; }
    }

    function imageURL(value) {
        return validURL(value) || /^img\/gallery\/(panda|red-panda|giraffe|elephant|coast|desert|waterfall)\.jpg$/.test(value)
            ? value : 'img/fallback.svg';
    }

    function integer(value, min, max) {
        return String(value).trim() !== '' && Number.isInteger(Number(value)) && Number(value) >= min && Number(value) <= max;
    }

    function basicErrors(title, image, questions, levels) {
        const errors = [];
        if (text(title).length < 20 || text(title).length > 65) errors.push('Use um título entre 20 e 65 caracteres.');
        if (!validURL(image)) errors.push('Use uma URL de imagem HTTPS completa.');
        if (!integer(questions, 3, 20)) errors.push('Escolha de 3 a 20 perguntas, em números inteiros.');
        if (!integer(levels, 2, 10)) errors.push('Escolha de 2 a 10 níveis, em números inteiros.');
        return errors;
    }

    function questionErrors(question) {
        const errors = [];
        if (text(question.title).length < 20) errors.push('A pergunta precisa de pelo menos 20 caracteres.');
        if (!/^#[0-9a-f]{6}$/i.test(question.color)) errors.push('Escolha uma cor válida.');
        const answers = question.answers;
        if (answers.length < 2 || answers.length > 4 || answers.filter(a => a.isCorrectAnswer === true).length !== 1)
            errors.push('Inclua uma resposta correta e de uma a três incorretas.');
        if (answers.some(a => !text(a.text) || !validURL(a.image))) errors.push('Cada resposta precisa de texto e sua própria imagem HTTPS.');
        if (new Set(answers.map(a => text(a.text).toLocaleLowerCase('pt-BR'))).size !== answers.length)
            errors.push('As respostas de uma pergunta devem ser diferentes.');
        return errors;
    }

    function levelErrors(level) {
        const errors = [];
        if (text(level.title).length < 10) errors.push('O título do nível precisa de pelo menos 10 caracteres.');
        if (!integer(level.minValue, 0, 100)) errors.push('O percentual deve ser um inteiro de 0 a 100.');
        if (!validURL(level.image)) errors.push('Use uma imagem HTTPS válida para o nível.');
        if (text(level.text).length < 30) errors.push('A descrição precisa de pelo menos 30 caracteres.');
        return errors;
    }

    function score(correct, total) {
        return total > 0 ? Math.round(100 * correct / total) : 0;
    }

    function selectLevel(levels, percentage) {
        return levels.filter(l => Number(l.minValue) <= percentage)
            .reduce((best, level) => !best || Number(level.minValue) > Number(best.minValue) ? level : best, null);
    }

    function shuffle(items, random = Math.random) {
        const result = [...items];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    function playable(quiz) {
        return !!quiz && !!text(quiz.title) && typeof quiz.image === 'string' &&
            Array.isArray(quiz.questions) && quiz.questions.length > 0 && quiz.questions.length <= 100 &&
            quiz.questions.every(q => q && text(q.title) && Array.isArray(q.answers) && q.answers.length >= 2 && q.answers.length <= 4 &&
                q.answers.every(a => a && text(a.text) && typeof a.image === 'string' && typeof a.isCorrectAnswer === 'boolean') &&
                q.answers.filter(a => a.isCorrectAnswer).length === 1) &&
            Array.isArray(quiz.levels) && quiz.levels.length > 0 &&
            quiz.levels.every(l => l && text(l.title) && typeof l.text === 'string' && typeof l.image === 'string' && integer(l.minValue, 0, 100)) &&
            quiz.levels.some(l => Number(l.minValue) === 0);
    }

    // Do not persist API ownership keys, tokens, or unrelated response fields.
    function publicQuiz(quiz) {
        return {id: quiz.id, title: text(quiz.title), image: quiz.image,
            questions: quiz.questions.map(q => ({title: text(q.title), color: q.color,
                answers: q.answers.map(a => ({text: text(a.text), image: a.image, isCorrectAnswer: a.isCorrectAnswer}))})),
            levels: quiz.levels.map(l => ({title: text(l.title), image: l.image, text: text(l.text), minValue: Number(l.minValue)}))};
    }

    function readQuizzes(storage) {
        const quizzes = new Map();
        const accept = q => {
            if (playable(q) && /^(?:\d+|local-[\w-]+)$/.test(String(q.id))) quizzes.set(String(q.id), publicQuiz(q));
        };
        try {
            try {
                const saved = JSON.parse(storage.getItem(STORAGE_KEY) || '[]');
                if (Array.isArray(saved)) saved.forEach(accept);
            } catch { /* A corrupt value must not break the whole page. */ }
            for (let i = 0; i < storage.length; i++) {
                const key = storage.key(i);
                if (!/^\d+$/.test(key)) continue;
                try {
                    const legacy = JSON.parse(storage.getItem(key));
                    if (String(legacy?.id) === key && !quizzes.has(key)) accept(legacy);
                } catch { /* Leave unrelated or corrupt legacy data untouched. */ }
            }
        } catch { /* Storage may be disabled by the browser. */ }
        return [...quizzes.values()];
    }

    function saveQuiz(storage, quiz) {
        const quizzes = readQuizzes(storage).filter(q => String(q.id) !== String(quiz.id));
        quizzes.push(publicQuiz(quiz));
        storage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
    }

    function contrastText(hex) {
        const rgb = hex.slice(1).match(/.{2}/g).map(v => parseInt(v, 16) / 255)
            .map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
        return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722 > 0.179 ? '#17202a' : '#ffffff';
    }
    return {STORAGE_KEY, text, escapeHTML, validURL, imageURL, integer, basicErrors, questionErrors, levelErrors,
        score, selectLevel, shuffle, playable, publicQuiz, readQuizzes, saveQuiz, contrastText};
})();
if (typeof module !== 'undefined') module.exports = QuizCore;
