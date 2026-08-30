const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.gif': 'image/gif', '.json': 'application/json' };
const server = http.createServer((request, response) => {
    try {
        const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
        const file = path.resolve(root, `.${pathname.endsWith('/') ? pathname + 'index.html' : pathname}`);
        const relative = path.relative(root, file);
        if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(/[\\/]/).some(part => part.startsWith('.'))) {
            response.writeHead(403).end(); return;
        }
        fs.readFile(file, (error, content) => {
            if (error) { response.writeHead(404).end('Not found'); return; }
            response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
            response.end(content);
        });
    } catch { response.writeHead(400).end('Bad request'); }
});
server.listen(Number(process.env.PORT || 4173), '127.0.0.1', () => console.log(`BuzzQuizz: http://127.0.0.1:${server.address().port}/`));
