var http = require('http');

var server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.write('Hello from Simple Server');
  response.end();
});

server.listen(8080);