const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const destination = path.join(root, 'dist');
// Explicit publication allowlist. Never upload the whole checkout to Pages.
const files = ['index.html', 'css/reset.css', 'css/styleMobile.css', 'css/styleDesktop.css', 'css/styleV2.css',
    'src/core.js', 'src/quizzes.js', 'src/script.js', 'img/favicon.svg', 'img/fallback.svg', 'img/IMAGE_CREDITS.md',
    ...['panda','red-panda','giraffe','elephant','coast','desert','waterfall'].map(name => 'img/gallery/' + name + '.jpg')];
// No recursive cleanup: refuse a contaminated output instead of publishing it.
function checkOutput(dir, prefix = '') {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
        const relative = prefix + entry.name;
        if (entry.isSymbolicLink()) throw new Error('Symlink in build output: ' + relative);
        if (entry.isDirectory()) checkOutput(path.join(dir, entry.name), relative + '/');
        else if (!files.includes(relative) && relative !== '.nojekyll') throw new Error('Unexpected build output: ' + relative);
    }
}
checkOutput(destination);
for (const relative of files) {
    const source = path.join(root, relative);
    if (!fs.statSync(source).isFile()) throw new Error('Missing asset: ' + relative);
    fs.mkdirSync(path.dirname(path.join(destination, relative)), {recursive:true});
    fs.copyFileSync(source, path.join(destination, relative));
}
fs.writeFileSync(path.join(destination, '.nojekyll'), '');
console.log('Built ' + files.length + ' project assets into dist/.');
