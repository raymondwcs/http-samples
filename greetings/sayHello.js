const http = require('http');

const server = http.createServer((req,res) => {
	let timestamp = new Date().toISOString();
	console.log(`Incoming request ${req.method}, ${req.url} received at ${timestamp}`);	

	res.writeHead(200, {"Content-Type" : "text/html"});
	res.write('<html><head><title>sayHello</title></head>');
	res.write('<body><H1>Hello There!</H1></body>');
	res.end('</html>');
});

server.listen(process.env.PORT || 8099);
