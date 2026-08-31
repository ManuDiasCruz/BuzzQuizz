# Verification — buzzquizz-been

## Baseline inspection

Started from the original `main` revision `4fddf9e` and inspected only this project's source. Ran the original app through a local HTTP server. Confirmed community loading, opened the creation wizard and entered basic quiz details. The original invalid-question submission raised a blocking alert. Source inspection identified the shared object references, destructive validation rebuild/reload, incorrect level selection, unreset replay counters, repeated misdirected timers, unsafe HTML interpolation, and success-before-POST completion. No other implementation branches were used as references.

## Automated checks

Run `npm test` (Node.js 22+) and `npm run build`.

The 21 regression tests cover:

- Curated quiz structure and asset existence; scores 0/33/67/100 and unsorted/string/zero-only thresholds.
- Non-mutating answer shuffle; blocked URL schemes and embedded credentials.
- Blank/fractional/out-of-range counts, blank/oversized titles, paired optional answers, duplicate answers, exactly one correct answer.
- Every level's fields, explicit 0%, unique thresholds, malformed remote quizzes.
- Namespaced and legacy storage, corrupted JSON, duplicate IDs, unavailable storage and removal of top-level API edit secrets.
- Independent question and answer factories (the shared-reference regression).
- Save completion ordering, duplicate POST guard, remote image path normalization, failed/malformed responses and storage quota failure.
- Late API response suppression after navigating elsewhere.

The build allows only the public HTML/CSS/JS, six WebP photographs, two SVGs, `.nojekyll` and a revision manifest. It fails on unexpected files in `dist/`. No API secrets, original downloads, test fixture, local test quiz data, node modules or git directory are shipped.

## Browser checks performed locally

In-app Chromium browser, desktop and 390px-wide mobile viewport (375px content area with scrollbar):

| Check | Result |
| --- | --- |
| Curated panda quiz: all correct | 100%, highest level |
| Restart, then all wrong | Counter resets to 0; result is 0%, introductory level |
| Answers after selection | Native buttons disabled; correct/incorrect labels do not rely only on color |
| Creator: fractional question count | Error; title and gallery selection retained |
| Creator: incomplete questions | Missing forms expanded; existing question text retained |
| Creator: incomplete second level | Error points to level 2; level 1 retained |
| Full creator with isolated successful API | Saving state disables controls until response; success opens distinct questions and final level |
| Reload after creation | Saved quiz is present once and remains playable |
| Unavailable API fixture on mobile | Clear community error; curated and saved quizzes remain available |
| Full creator with failed API | Local-only result, survives reload and remains playable |
| Failed external photo | Local neutral fallback appears; answers remain usable |
| Home and play layout on mobile | No horizontal overflow in measured DOM |

Successful/failed POST verification uses the local `/__test__/` fixture and unit tests. **No test quiz was posted to the real shared API.** Fixtures are not deployed. Browser verification supplements, rather than replaces, the Node test suite; it is not yet a committed browser automation suite.

## Deployment verification

Deployment uses `ManuDiasCruz/BuzzQuizzBeen`, `gh-pages`, root `/`. The original `BuzzQuizz` Pages configuration is unchanged. Final production checks and release revision are recorded in the PR after publishing.

Post-deploy checklist: confirm successful Pages run and HTTPS status, compare `release.json` to the source commit, verify all six image URLs and local scripts/styles, play a quiz, restart, test zero score, open the creation wizard, test invalid inputs, load image credits, and inspect browser errors. Re-test any deployment-specific fix before reporting completion.

## Remaining coverage

Live API POST is intentionally not exercised to avoid adding public test content. Firefox/Safari, real screen readers, mobile devices, browser storage-full UI, and full offline page loading are not claimed as verified. The API has no availability guarantee; community content and externally supplied image rights are not controlled by this project.
