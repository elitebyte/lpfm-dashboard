const server = require('http').createServer(handler, {ssl: 'true'})
const fs = require('fs')
var path = require('path');
const express = require('express')

const app = express()
const hostname = '127.0.0.1';
const port = 3000;

function handler (request, response) {
  var filePath = '.' + request.url;
  if (filePath == './')
    filePath = './html/dashboard.html';

    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    var mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.wav': 'audio/wav',
      '.mp4': 'video/mp4',
      '.woff': 'application/font-woff',
      '.ttf': 'application/font-ttf',
      '.eot': 'application/vnd.ms-fontobject',
      '.otf': 'application/font-otf',
      '.svg': 'application/image/svg+xml'
    };

    contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
      if (error) {
          if(error.code == 'ENOENT'){
              fs.readFile('./404.html', function(error, content) {
                  response.writeHead(200, { 'Content-Type': contentType });
                  response.end(content, 'utf-8');
                });
              }
              else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
              }
            }
            else {

              response.writeHead(200, { 'Content-Type': contentType });
              response.end(content, 'utf-8');
            }
          });
}




app.get('/', handler)

app.listen(port, () => console.log('Example app listenting on port    ' + port + '!'))

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});