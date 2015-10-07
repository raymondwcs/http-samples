var http = require('http');
var url  = require('url');

var server = http.createServer(function (req,res) {
	var greetingMsg = "Hello there!";

	console.log("INCOMING REQUEST: " + req.method + " " + req.url);

	var parsedURL = url.parse(req.url,true); //true to get query as object
	var queryAsObject = parsedURL.query;

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
		if (req.method == "GET") {
			if (queryAsObject.name != null) {
				greetingMsg = "Hello " + queryAsObject.name;
			}
			sayHello(res,greetingMsg,parsedURL);
		}
		else if (req.method == "POST") {
			var qs = require('querystring');
			var data = '';
			req.on('data', function(chunk) {
				data += chunk;
			}); // end req.on()
			req.on('end', function() {
				var postData = qs.parse(data);
				console.log('POST Data: ' + data);
				var postDataObject = JSON.parse(data);
				greetingMsg = "Hello " + postDataObject.name;
	
				sayHello(res,greetingMsg,parsedURL);
	
			}); // end req.on()
		}
	}
});

function sayHello(res,greetingMsg,parsedURL) {

		res.writeHead(200, {"Content-Type" : "text/html"});
		res.write('<html><head><title>sayHello</title></head>');
		res.write('<body><H1>' + greetingMsg + '</H1>');

		if (parsedURL.pathname == '/greetings/sayHelloWithTime') {
			var today = new Date();
			res.write('<p>It is now ' + today.toTimeString() + '</p>');
		}
		res.end('</body></html>');

}
server.listen(process.env.PORT || 8099);
