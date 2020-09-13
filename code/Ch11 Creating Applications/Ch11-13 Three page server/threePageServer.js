var http = require('http');
var url = require('url');

function sendResponse(response, text) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.write(text);
  response.end();
}

var server = http.createServer((request, response) => {

  var parsedUrl = url.parse(request.url);
  var path = parsedUrl.pathname;

  switch (path) {

    case "/index.html":
      sendResponse(response, "hello from index.html");
      break;

    case "/otherpage.html":
      sendResponse(response, "hello from otherpage.html");
      break;

    case "/aboutpage.html":
      sendResponse(response, "hello from aboutpage.html");
      break;


    default:
      response.statusCode = 404;
      response.setHeader('Content-Type', 'text/plain');
      response.write('Page ' + path + ' not found');
      response.end();
      break;
  }
});

server.listen(8080);