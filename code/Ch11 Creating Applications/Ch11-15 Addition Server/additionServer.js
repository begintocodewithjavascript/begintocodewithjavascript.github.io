var http = require('http'); 
var url = require('url'); 

var server = http.createServer((request, response) => { 

var parsedUrl = url.parse(request.url,true);
var queries = parsedUrl.query;

  
var no1 = Number(queries.no1); 
var no2 = Number(queries.no2); 

var result= no1 + no2; 

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write(String(result)); 
  response.end();

});

server.listen(8080);
