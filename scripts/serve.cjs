const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.svg':'image/svg+xml'};
http.createServer((req, res) => {
    let pathname;
    try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
    catch { res.writeHead(400).end(); return; }
    if (pathname === '/') pathname = '/index.html';
    // Serve only browser assets, never dotfiles, Git metadata or local secrets.
    if (!/^\/(index\.html|(?:css|src|img)\/[\w./-]+)$/.test(pathname) || pathname.split('/').some(p => p.startsWith('.'))) {
        res.writeHead(404).end('Not found'); return;
    }
    const file = path.resolve(root, '.' + pathname);
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    fs.readFile(file, (error, content) => {
        if (error) { res.writeHead(404).end('Not found'); return; }
        res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store'});
        res.end(content);
    });
}).listen(8000, '127.0.0.1', () => console.log('BuzzQuizz: http://127.0.0.1:8000/'));
