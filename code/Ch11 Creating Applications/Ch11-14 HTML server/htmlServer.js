var http = require('http');
var url = require('url');

function sendResponse(response, text) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html');
  response.write(text);
  response.end();
}

var indexText = ` <!DOCTYPE html>
<html lang="en">
<head>
<title>Ch02-03 Text Layout</title>
</head>
<body>
    Hello
    world
   
       from   Rob

    <p>This is the first paragraph</p>
    <p>This is the second paragraph</p>

    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <p>A normal paragraph</p>
        
   </body>
</html>`;


var server = http.createServer((request, response) => {

  var parsedUrl = url.parse(request.url);
  var path = parsedUrl.pathname;

  switch (path) {

    case "/index.html":
      sendResponse(response,indexText);
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