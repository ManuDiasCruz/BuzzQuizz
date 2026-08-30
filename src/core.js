/* Pure quiz rules, shared by the browser and the dependency-free test suite. */
(function (root) {
    'use strict';
    const STORAGE_KEY = 'buzzquizz:quizzes:v2';
    const FALLBACK_IMAGE = 'img/fallback.svg';
    const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

    function validImageURL(value) {
        if (typeof value !== 'string') return false;
        if (/^img\/pixabay\/[a-z-]+\.jpg$/.test(value)) return true;
        try {
            const url = new URL(value);
            return url.protocol === 'https:' && !!url.hostname && !url.username && !url.password;
        } catch { return false; }
    }

    const safeImage = value => validImageURL(value) ? value : FALLBACK_IMAGE;
    const integerInRange = (value, min, max) => String(value).trim() !== '' &&
        Number.isInteger(Number(value)) && Number(value) >= min && Number(value) <= max;

    function shuffle(values, random = Math.random) {
        const copy = [...values];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    function scoreQuiz(correct, total, levels) {
        const percentage = total > 0 ? Math.round(correct * 100 / total) : 0;
        const eligible = levels.filter(level => Number(level.minValue) <= percentage);
        const level = eligible.reduce((best, item) => !best || Number(item.minValue) > Number(best.minValue) ? item : best, null);
        return { percentage, level };
    }

    // Pick only public quiz fields; never persist API credentials or unrelated payload data.
    function normalizeQuiz(value) {
        if (!value || typeof value.title !== 'string' || !value.title.trim() || value.title.length > 200 ||
            !Array.isArray(value.questions) || value.questions.length < 1 || value.questions.length > 30 ||
            !Array.isArray(value.levels) || value.levels.length < 1 || value.levels.length > 10) return null;
        const questions = [];
        for (const question of value.questions) {
            if (!question || typeof question.title !== 'string' || !question.title.trim() || question.title.length > 500 ||
                !Array.isArray(question.answers) || question.answers.length < 2 || question.answers.length > 4 ||
                question.answers.filter(answer => answer?.isCorrectAnswer === true).length !== 1) return null;
            const answers = [];
            for (const answer of question.answers) {
                if (!answer || typeof answer.text !== 'string' || !answer.text.trim() || answer.text.length > 500 ||
                    typeof answer.isCorrectAnswer !== 'boolean') return null;
                answers.push({ text: answer.text, image: safeImage(answer.image), isCorrectAnswer: answer.isCorrectAnswer });
            }
            questions.push({ title: question.title, color: /^#[0-9a-f]{6}$/i.test(question.color) ? question.color : '#434ca0', answers });
        }
        const levels = [];
        for (const level of value.levels) {
            if (!level || typeof level.title !== 'string' || !level.title.trim() || level.title.length > 200 ||
                typeof level.text !== 'string' || level.text.length > 3000 || !integerInRange(level.minValue, 0, 100)) return null;
            levels.push({ title: level.title, text: level.text, image: safeImage(level.image), minValue: Number(level.minValue) });
        }
        if (!levels.some(level => level.minValue === 0)) return null;
        const id = ['string', 'number'].includes(typeof value.id) ? String(value.id) : '';
        return { id, title: value.title, image: safeImage(value.image), questions, levels };
    }

    function readStoredQuizzes(storage) {
        const quizzes = new Map();
        let warning = '';
        function read(key) {
            try {
                const value = JSON.parse(storage.getItem(key));
                for (const candidate of Array.isArray(value) ? value : [value]) {
                    const quiz = normalizeQuiz(candidate);
                    if (quiz?.id) quizzes.set(quiz.id, quiz);
                }
            } catch { warning = 'Alguns dados locais não puderam ser lidos. Seus outros quizzes continuam disponíveis.'; }
        }
        try {
            // Legacy versions used numeric IDs. Ignore unrelated keys on this shared Pages origin.
            for (let i = 0; i < storage.length; i++) {
                const key = storage.key(i);
                if (/^\d+$/.test(key)) read(key);
            }
            read(STORAGE_KEY);
        } catch { warning = 'Armazenamento indisponível. Você pode jogar, mas não salvar neste navegador.'; }
        return { quizzes: [...quizzes.values()], warning };
    }

    function saveStoredQuiz(storage, quiz, previousId) {
        const normalized = normalizeQuiz(quiz);
        if (!normalized?.id) throw new Error('Quizz inválido.');
        const { quizzes } = readStoredQuizzes(storage);
        const updated = quizzes.filter(item => item.id !== normalized.id && item.id !== previousId);
        updated.push(normalized);
        storage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return normalized;
    }

    const api = { STORAGE_KEY, FALLBACK_IMAGE, escapeHTML, validImageURL, safeImage, integerInRange, shuffle, scoreQuiz, normalizeQuiz, readStoredQuizzes, saveStoredQuiz };
    if (typeof module === 'object' && module.exports) module.exports = api;
    else root.QuizCore = api;
})(typeof window === 'undefined' ? this : window);
