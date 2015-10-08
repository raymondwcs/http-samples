var http = require('http');

var server = http.createServer(function (req,res) {
	console.log("INCOMING REQUEST: " + req.method + " " + req.url);
	res.writeHead(200, {"Content-Type" : "text/html"});
	res.write('<html><head><title>sayHello</title></head>');
	res.write('<body><H1>Hello There!</H1></body>');
	res.end('</html>');
});

server.listen(process.env.PORT || 8099);
