# v2 verification — 2026-08-31

Related Branch: `buzzquizz-yakh`

## Baseline inspection

Read the original `index.html`, `src/script.js`, both screen stylesheets and README from the requested repository's default branch only. No other implementations or branches were used as source code.

The original app was served locally and the community list loaded. In the creation flow, submitting an unfinished question erased its entered question text; reproduced directly in the browser. Code inspection also found shared answer/question/level objects, score counters not reset on restart, incorrect threshold selection, validation of only the first level, incomplete collapsed cards omitted from validation, success shown before POST completion, a cover replaced by an invalid ellipsis URL, unescaped external markup and reading every localStorage value as a quiz.

## Automated regression suite

Run `npm test`. 24 tests cover scoring at 0/33/67/100%, unordered result levels, non-mutating shuffle, HTTPS URL policy, escaping, integer limits, paired optional answers, duplicate answers, all-level validation, bundled quiz integrity, corrupt/foreign storage, legacy data, deduplication, secret-field stripping, independent record factories, unfilled cards, delayed/failed saves, duplicate submit prevention, local-only saves, quota errors and stale network responses.

Publication tests use controlled API doubles. They do not send test content to the shared public API. Real public POST behavior is not certified by these tests.

## Browser verification

Tested through the app UI on the local HTTP server, at desktop width and a 390-pixel mobile viewport:

- Original invalid-submission data loss reproduced before fixes.
- Curated quiz cards and community loading render; third-party broken images show the local fallback.
- Animal quiz: 100% selects the top level; replay starts at zero answered; a subsequent all-wrong run selects 0% rather than retaining the prior score.
- Questions answered out of order still produce the correct result; answer buttons become disabled.
- Home navigation restores the catalog; mobile home has no horizontal overflow.
- Fractional question count is rejected; question text survives validation; unfinished question and level cards are exposed rather than skipped.
- Completed all three creation steps using local-only storage, retained the original cover, and opened the newly created quiz with three distinct questions/answer pairs and two distinct levels.
- The created quiz produced 67% and selected its 50% level; it remained visible in “Seus quizzes” after returning home and reloading the page.

## Build and deployment

`npm run build` packages an explicit 18-file allowlist plus `.nojekyll`. Seven JPEGs were verified as real images with a maximum side of 1280 pixels. No credentials or unrelated local files are included.

The existing Pages configuration was read, not changed. The requested `/BuzzQuizzYakh/` destination requires a separate repository, which did not exist at inspection. Deployment and production smoke tests remain pending authorization to create that repository. Local validation is not a substitute for production verification.
