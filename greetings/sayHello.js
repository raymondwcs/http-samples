const http = require('http');  // package/libraris for http operations

const server = http.createServer((req,res) => {  
	// callback function - 
	// this function will be called when the server receives inbound http connection requests
	let timestamp = new Date().toISOString();
	console.log(`Incoming request ${req.method}, ${req.url} received at ${timestamp}`);	

	res.writeHead(200, {"Content-Type" : "text/html"});
	res.write('<html><head><title>sayHello</title></head>');
	res.write('<body><H1>Hello There!</H1></body>');
	res.end('</html>');
});

// server listen on port 8099 for inbound http connection requests
server.listen(process.env.PORT || 8099);  
