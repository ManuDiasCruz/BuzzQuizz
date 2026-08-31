// An explicit allowlist keeps tests, credentials, git history and original large
// demo assets out of GitHub Pages. Run only from this project.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const files = ['index.html', 'credits.html', 'css/reset.css', 'css/styleMobile.css', 'css/styleDesktop.css', 'css/v2.css', 'src/core.js', 'src/collection.js', 'src/wizard.js', 'src/script.js', 'img/favicon.svg', 'img/fallback.svg', ...require('../src/collection.js').IMAGE_LIBRARY.map(image => image.path)];
fs.mkdirSync(dist, { recursive: true });
// Fail on unexpected old files instead of silently deploying or deleting them.
function walk(directory) { return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.relative(dist, path.join(directory, entry.name)).split(path.sep).join('/')]); }
const allowed = new Set([...files, '.nojekyll', 'release.json']);
for (const file of walk(dist)) if (!allowed.has(file)) throw new Error(`Unexpected file in dist: ${file}. Review and remove it before building.`);
for (const file of files) {
    fs.mkdirSync(path.dirname(path.join(dist, file)), { recursive: true });
    fs.copyFileSync(path.join(root, file), path.join(dist, file));
}
let revision = process.env.GITHUB_SHA || 'local';
try { revision = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { /* Archive builds have no git metadata. */ }
fs.writeFileSync(path.join(dist, '.nojekyll'), '');
fs.writeFileSync(path.join(dist, 'release.json'), JSON.stringify({ project: 'BuzzQuizz Been', version: '2.0.0', branch: 'buzzquizz-been', revision }, null, 2) + '\n');
console.log(`Built ${files.length + 2} public files in dist.`);
