var http = require('http');
var url  = require('url');

var server = http.createServer(function (req,res) {
	var greetingMsg = "Hello there!";

	console.log("INCOMING REQUEST: " + req.method + " " + req.url);

	var parsedURL = url.parse(req.url,true); //true to get query as object
	var queryAsObject = parsedURL.query;

	if (queryAsObject.name != null) {
		greetingMsg = "Hello " + queryAsObject.name;
	}

	if (!(
		parsedURL.pathname == '/greetings' ||
	    parsedURL.pathname == '/greetings/sayHello' ||
	    parsedURL.pathname == '/greetings/sayHelloWithTime'
		)) {
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.write("404 Not Found\n");
		res.end();
	}
	else {
		res.writeHead(200, {"Content-Type" : "text/html"});
		res.write('<html><head><title>sayHello</title></head>');
		res.write('<body><H1>' + greetingMsg + '</H1>');

		if (parsedURL.pathname == '/greetings/sayHelloWithTime') {
			var today = new Date();
			res.write('<p>It is now ' + today.toTimeString() + '</p>');
		}
		res.end('</body></html>');
	}
});

server.listen(process.env.PORT || 8099);
