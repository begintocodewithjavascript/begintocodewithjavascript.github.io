var http = require('http');
var url = require('url');

var indexPage = `
<!DOCTYPE html>
<html>
<head>
  <title>Ch11-16 Addition Application</title>
</head>
<body>
  <h1>Web service client demo</h1>
  <p>Uses a server to add two numbers togther.</p>
  <p>
    <button onclick="doAddition()">Add 2 and 3</button>
  </p>
  
  <p id="resultParagraph">
    Result displayed here.
  </p>
  
    <script>
  function doAddition() {
  
    var url = "http://localhost:8080/docalc.html?no1=2&no2=3";

fetch(url).then(response => {
    response.text().then(result => {
      let resultParagraph = document.getElementById('resultParagraph');
      resultParagraph.innerText = "Result: " + result;
    }).catch(error => alert("Bad text: " + error)); // text error handler
  }).catch(error => alert("Bad fetch: " + error)); // fetch error handler
}
  </script>
</body>
</html>`;

var server = http.createServer((request, response) => {

  var parsedUrl = url.parse(request.url, true);
  var queries = parsedUrl.query;
  var path = parsedUrl.pathname;
  switch (path) {
    case '/index.html':
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(indexPage);
      response.end();
      break;

    case '/docalc.html':
      var no1 = Number(queries.no1);
      var no2 = Number(queries.no2);
      var result = no1 + no2;

      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.write(String(result));
      response.end();
  }
});

server.listen(8080);
