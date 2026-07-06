(function exposeQuizUtils(globalScope) {
    function isValidHttpUrl(value) {
        try {
            const url = new URL(value);
            return (url.protocol === "http:" || url.protocol === "https:") && !url.username && !url.password;
        } catch (_error) {
            return false;
        }
    }

    function calculatePercentage(correctAnswers, totalQuestions) {
        if (!Number.isFinite(correctAnswers) || !Number.isFinite(totalQuestions) || totalQuestions <= 0) {
            return 0;
        }

        return Math.round((correctAnswers / totalQuestions) * 100);
    }

    function selectLevel(levels, percentage) {
        if (!Array.isArray(levels) || levels.length === 0) {
            return null;
        }

        const orderedLevels = levels
            .map((level) => ({ ...level, minValue: Number(level.minValue) }))
            .filter((level) => Number.isFinite(level.minValue))
            .sort((first, second) => second.minValue - first.minValue);

        return orderedLevels.find((level) => percentage >= level.minValue)
            || orderedLevels[orderedLevels.length - 1]
            || null;
    }

    function shuffle(items, random = Math.random) {
        const shuffled = [...items];

        for (let index = shuffled.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(random() * (index + 1));
            [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
        }

        return shuffled;
    }

    const QuizUtils = {
        calculatePercentage,
        isValidHttpUrl,
        selectLevel,
        shuffle
    };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = QuizUtils;
    }

    globalScope.QuizUtils = QuizUtils;
}(typeof globalThis !== "undefined" ? globalThis : this));
