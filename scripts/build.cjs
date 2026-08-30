const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
// Exact, fixed output path; no repository files or arbitrary directories are deleted.
if (path.dirname(output) !== root || path.basename(output) !== 'dist') throw new Error('Unsafe build directory');
fs.rmSync(output, { recursive: true, force: true });
const files = ['index.html', 'image-credits.html', 'css/reset.css', 'css/styleMobile.css', 'css/styleDesktop.css', 'css/v2.css', 'src/core.js', 'src/samples.js', 'src/script.js', 'img/fallback.svg'];
const { QUIZ_IMAGES } = require('../src/samples.js');
files.push(...QUIZ_IMAGES.map(image => image.path));
for (const file of files) {
    if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing asset: ${file}`);
    fs.mkdirSync(path.dirname(path.join(output, file)), { recursive: true });
    fs.copyFileSync(path.join(root, file), path.join(output, file));
}
const revision = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
fs.writeFileSync(path.join(output, '.nojekyll'), '');
fs.writeFileSync(path.join(output, 'deployment.json'), JSON.stringify({ version: '2.0.0', sourceRepository: 'ManuDiasCruz/BuzzQuizz', sourceBranch: 'buzzquizz-beeh', revision }, null, 2) + '\n');
console.log(`Built ${files.length} public files + deployment manifest in dist/ (${revision.slice(0, 7)})`);
