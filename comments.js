// Create web server

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var comments = [];

http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                console.log(err);
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (pathname === '/comment') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else {
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                console.log(err);
                res.end('404 Not Found');
            } else {
                var ext = path.extname(pathname);
                var contentType = getContentType(ext);
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    }
}).listen(3000);

function getContentType(ext) {
    switch (ext) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        default:
            return 'text/plain';
    }
}

console.log('Server running at http://localhost:3000');

