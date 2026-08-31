/* Local-only deterministic browser fixture. Never included in the Pages build. */
window.fetch = async (url, options = {}) => {
    if (new URLSearchParams(location.search).has('offline')) throw new TypeError('Fixture: unavailable API');
    if (options.method === 'POST') {
        await new Promise(resolve => setTimeout(resolve, 800));
        return { ok: true, json: async () => ({ ...JSON.parse(options.body), id: 'fixture-saved', key: 'fixture-edit-secret-not-for-storage' }) };
    }
    const q = { ...structuredClone(BUILTIN_QUIZZES[0]), id: 'fixture-community', title: 'Quiz de integração da comunidade' };
    return { ok: true, json: async () => String(url).endsWith('/quizzes') ? [q] : q };
};
