const test = require("node:test");
const assert = require("node:assert/strict");
const {
    calculatePercentage,
    isValidHttpUrl,
    selectLevel,
    shuffle
} = require("../src/quiz-utils.js");

test("calculatePercentage rounds quiz scores", () => {
    assert.equal(calculatePercentage(2, 3), 67);
    assert.equal(calculatePercentage(0, 3), 0);
    assert.equal(calculatePercentage(3, 0), 0);
});

test("selectLevel chooses the highest threshold reached regardless of API order", () => {
    const levels = [
        { title: "Iniciante", minValue: 0 },
        { title: "Especialista", minValue: 70 },
        { title: "Explorador", minValue: 40 }
    ];

    assert.equal(selectLevel(levels, 67).title, "Explorador");
    assert.equal(selectLevel(levels, 100).title, "Especialista");
    assert.equal(selectLevel(levels, 0).title, "Iniciante");
});

test("isValidHttpUrl rejects unsupported or credential-bearing URLs", () => {
    assert.equal(isValidHttpUrl("https://pixabay.com/images/search/"), true);
    assert.equal(isValidHttpUrl("ftp://example.com/image.jpg"), false);
    assert.equal(isValidHttpUrl("https://user:secret@example.com/image.jpg"), false);
    assert.equal(isValidHttpUrl("not a url"), false);
});

test("shuffle returns a new array without mutating the source", () => {
    const source = [1, 2, 3, 4];
    const result = shuffle(source, () => 0);

    assert.deepEqual(source, [1, 2, 3, 4]);
    assert.notEqual(result, source);
    assert.deepEqual(result, [2, 3, 4, 1]);
});
