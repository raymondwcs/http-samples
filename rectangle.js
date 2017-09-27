var http = require('http'); 
var url = require('url');

function Rectangle(width,length) { 
	this.width = width;
	this.length = length;
	this.area = this.width * this.length;
}

function handle_incoming_request(req, res) {
	console.log("INCOMING REQUEST: " + req.method + " " + req.url);
	var parsedURL = url.parse(req.url,true); //true to get query as object 
	var queryAsObject = parsedURL.query;
	// extract query string parameters
	var obj = new Rectangle(queryAsObject.width, queryAsObject.length); 

	res.writeHead(200, {"Content-Type" : "application/json"}); 
	res.end(JSON.stringify(obj));;
}

var s = http.createServer(handle_incoming_request); 
s.listen(process.env.PORT || 8099);
