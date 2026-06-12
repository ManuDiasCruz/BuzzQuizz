const DEBUG_URL = process.env.CDP_URL || "http://127.0.0.1:9222";
const APP_URL = process.env.APP_URL || "http://127.0.0.1:8000/";

class CDPClient {
    constructor(socket) {
        this.socket = socket;
        this.nextId = 1;
        this.pending = new Map();

        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            const pending = this.pending.get(message.id);

            if (!pending) {
                return;
            }

            this.pending.delete(message.id);
            if (message.error) {
                pending.reject(new Error(JSON.stringify(message.error)));
            } else {
                pending.resolve(message.result || {});
            }
        });
    }

    static async connect() {
        let targets;

        for (let attempt = 0; attempt < 30; attempt++) {
            try {
                const response = await fetch(`${DEBUG_URL}/json`);
                targets = await response.json();
                if (targets.some((target) => target.type === "page")) {
                    break;
                }
            } catch (error) {
                // Chrome may still be starting.
            }
            await new Promise((resolve) => setTimeout(resolve, 200));
        }

        const page = targets && targets.find((target) => target.type === "page");
        if (!page) {
            throw new Error("No Chrome page target found. Start Chrome with remote debugging enabled.");
        }

        const socket = new WebSocket(page.webSocketDebuggerUrl);
        await new Promise((resolve, reject) => {
            socket.addEventListener("open", resolve, { once: true });
            socket.addEventListener("error", reject, { once: true });
        });

        return new CDPClient(socket);
    }

    call(method, params = {}) {
        const id = this.nextId++;

        return new Promise((resolve, reject) => {
            this.pending.set(id, { resolve, reject });
            this.socket.send(JSON.stringify({ id, method, params }));
        });
    }

    async evaluate(expression) {
        const response = await this.call("Runtime.evaluate", {
            expression,
            awaitPromise: true,
            returnByValue: true
        });

        if (response.exceptionDetails) {
            throw new Error(response.exceptionDetails.text || "Browser evaluation failed");
        }

        return response.result && response.result.value;
    }
}

function assert(condition, message, details) {
    if (!condition) {
        throw new Error(`${message}: ${JSON.stringify(details)}`);
    }
}

async function run() {
    const client = await CDPClient.connect();
    await client.call("Runtime.enable");
    await client.call("Page.enable");
    await client.call("Page.navigate", { url: APP_URL });

    const home = await client.evaluate(`new Promise((resolve) => {
        const startedAt = Date.now();
        const check = () => {
            const cards = Array.from(document.querySelectorAll('.quizz-card'));
            if (cards.length >= 3 || Date.now() - startedAt > 8000) {
                resolve({
                    count: cards.length,
                    titles: cards.slice(0, 3).map((card) => card.innerText.trim()),
                    keyboardReady: cards.slice(0, 3).every((card) => card.tabIndex === 0 && card.getAttribute('role') === 'button')
                });
                return;
            }
            setTimeout(check, 100);
        };
        check();
    })`);

    assert(home.count >= 3, "Expected the three curated quizzes to render immediately", home);
    assert(home.titles[0] === "Qual panda fofinho você é?", "Unexpected first curated quiz", home);
    assert(home.titles[1].startsWith("Você reconhece"), "Food quiz was not rendered", home);
    assert(home.titles[2].startsWith("Uma volta ao mundo"), "Travel quiz was not rendered", home);
    assert(home.keyboardReady, "Quiz cards are not keyboard accessible", home);

    const storage = await client.evaluate(`(() => {
        localStorage.setItem('other-app', JSON.stringify({
            id: 999999,
            title: 'Outro aplicativo',
            image: 'https://example.com/image.jpg',
            questions: [],
            levels: []
        }));
        getAllQuizz();
        const ownCards = document.querySelectorAll('.quizzes-criados .quizz-card').length;
        localStorage.removeItem('other-app');
        return { ownCards, safeColor: getCorSegura('red; background: black') };
    })()`);

    assert(storage.ownCards === 0, "Unrelated localStorage data leaked into user quizzes", storage);
    assert(storage.safeColor === "#434CA0", "Unsafe question color was not normalized", storage);

    const panda = await client.evaluate(`(() => {
        document.querySelectorAll('.quizz-card')[0].click();
        return {
            title: document.querySelector('.pagina-quizz .titulo-quizz h2').innerText.trim(),
            questions: document.querySelectorAll('[data-question-index]').length
        };
    })()`);

    assert(panda.title === "Qual panda fofinho você é?", "Panda quiz did not open", panda);
    assert(panda.questions === 4, "Panda quiz question count changed", panda);

    const result = await client.evaluate(`(async () => {
        const questions = Array.from(document.querySelectorAll('[data-question-index]'));
        for (const question of questions) {
            question.querySelector('.resposta[data-correct="true"]').click();
            await new Promise((resolve) => setTimeout(resolve, 80));
        }
        await new Promise((resolve) => setTimeout(resolve, 1400));
        return {
            answered: document.querySelectorAll('.respondida').length,
            result: document.querySelector('.resultado h3') && document.querySelector('.resultado h3').innerText.trim()
        };
    })()`);

    assert(result.answered === 4, "Not all panda questions were recorded", result);
    assert(result.result === "100% Especialista em pandas", "Panda result level is incorrect", result);

    const restart = await client.evaluate(`(() => {
        document.querySelector('.reiniciar-quizz').click();
        return {
            answered: document.querySelectorAll('.respondida').length,
            resultVisible: Boolean(document.querySelector('.resultado')),
            questions: document.querySelectorAll('[data-question-index]').length
        };
    })()`);

    assert(restart.answered === 0 && !restart.resultVisible && restart.questions === 4, "Restart did not clear quiz state", restart);

    const validation = await client.evaluate(`(() => {
        paginaInicial();
        chamarTelaCriarQuizz();
        window.alert = (message) => { window.__lastAlert = message; };
        document.querySelector('.vamos-comecar .titulo-quizz').value = '                        ';
        document.querySelector('.vamos-comecar .url-quizz').value = 'https://cdn.pixabay.com/photo/test.jpg';
        document.querySelector('.vamos-comecar .numero-perguntas').value = '3';
        document.querySelector('.vamos-comecar .quantidade-niveis').value = '2';
        validarDadosBasicos();
        return {
            alert: window.__lastAlert,
            questionsVisible: getComputedStyle(document.querySelector('.cria-perguntas')).display !== 'none'
        };
    })()`);

    assert(validation.alert.includes("mínimo 20"), "Whitespace-only title passed validation", validation);
    assert(!validation.questionsVisible, "Invalid basic data advanced to question creation", validation);

    console.log(JSON.stringify({ home, storage, panda, result, restart, validation }, null, 2));
    client.socket.close();
}

run().catch((error) => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
});
