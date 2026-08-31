/* Publish only a reviewed build, using the user's existing Git authentication. */
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const remote = 'https://github.com/ManuDiasCruz/BuzzQuizzBeen.git';
function git(args, cwd = root, inherit = false) {
    return execFileSync('git', ['-c', `safe.directory=${cwd.split(path.sep).join('/')}`, ...args], { cwd, encoding: 'utf8', stdio: inherit ? 'inherit' : ['ignore', 'pipe', 'pipe'] });
}
if (git(['branch', '--show-current']).trim() !== 'buzzquizz-been') throw new Error('Deploy only from buzzquizz-been.');
if (git(['status', '--porcelain']).trim()) throw new Error('Commit or review pending project files before deployment.');
execFileSync(process.execPath, ['--test', ...fs.readdirSync(path.join(root, 'tests')).filter(f => f.endsWith('.test.cjs')).map(f => `tests/${f}`)], { cwd: root, stdio: 'inherit' });
execFileSync(process.execPath, ['scripts/build.cjs'], { cwd: root, stdio: 'inherit' });
const revision = git(['rev-parse', 'HEAD']).trim();
// A fresh isolated checkout avoids resetting any user working tree.
const checkout = path.join(root, '.local', `deploy-${Date.now()}`);
fs.mkdirSync(checkout, { recursive: true });
const exists = git(['ls-remote', '--heads', remote, 'gh-pages']).trim();
if (exists) git(['clone', '--depth', '1', '--single-branch', '--branch', 'gh-pages', remote, checkout], root, true);
else {
    git(['init', '-b', 'gh-pages'], checkout, true);
    git(['remote', 'add', 'origin', remote], checkout);
}
function copy(directory, destination) {
    fs.mkdirSync(destination, { recursive: true });
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const from = path.join(directory, entry.name); const to = path.join(destination, entry.name);
        if (entry.isDirectory()) copy(from, to); else fs.copyFileSync(from, to);
    }
}
copy(path.join(root, 'dist'), checkout);
fs.writeFileSync(path.join(checkout, 'README.md'), `# BuzzQuizz Been — deployment\n\nBuilt from [ManuDiasCruz/BuzzQuizz](https://github.com/ManuDiasCruz/BuzzQuizz), branch \`buzzquizz-been\`, revision \`${revision}\`.\n\n[Live site](https://manudiascruz.github.io/BuzzQuizzBeen/) · [Source and documentation](https://github.com/ManuDiasCruz/BuzzQuizz/tree/buzzquizz-been)\n\nPages source: gh-pages, /(root). Only generated public app assets belong here. Image credits: [source register](https://github.com/ManuDiasCruz/BuzzQuizz/blob/buzzquizz-been/IMAGE_CREDITS.md).\n`);
for (const key of ['user.name', 'user.email']) git(['config', key, git(['config', key]).trim()], checkout);
git(['add', '--', '.'], checkout);
if (!git(['status', '--porcelain'], checkout).trim()) console.log('Deployment already matches this revision.');
else {
    git(['commit', '-m', `chore(pages): deploy BuzzQuizz Been ${revision.slice(0, 7)}`], checkout, true);
    git(['push', 'origin', 'gh-pages'], checkout, true);
}
console.log('Pushed build. Wait for GitHub Pages, then verify https://manudiascruz.github.io/BuzzQuizzBeen/release.json');
