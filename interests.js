const http = require('http'); 
const url = require('url');
/*
function SimpleInterests() {
	this.principal = p;
	this.rate = r;
	this.period = t;
	this.interests = this.principal * this.rate * this.period;
}
*/
class SimpleInterests {
	constructor(p,r,t) {
		this.principal = p;
		this.rate = r;
		this.period = t;
		this.interests = this.principal * this.rate * this.period;
	}
}

// function handle_incoming_request(req,res) {
const handle_incoming_request = (req, res) => {
	console.log("INCOMING REQUEST: " + req.method + " " + req.url);
	var parsedURL = url.parse(req.url,true); //true to get query as object 
	var queryAsObject = parsedURL.query;
	// extract query string parameters
	var obj = new SimpleInterests(queryAsObject.p, queryAsObject.r,queryAsObject.t); 
	res.writeHead(200, {"Content-Type" : "application/json"}); 
	res.end(JSON.stringify(obj));;
}

const server = http.createServer(handle_incoming_request); 
server.listen(process.env.PORT || 8099);
