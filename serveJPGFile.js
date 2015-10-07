var http = require('http'); 
var url  = require('url');
var fs   = require('fs');

function handle_incoming_request(req, res) {
	console.log("INCOMING REQUEST: " + req.method + " " + req.url);
	var parsedURL = url.parse(req.url,true); //true to get query as object 
	var queryAsObject = parsedURL.query;
	var fname = queryAsObject.fname;

	console.log('Requested file: ' + fname);

	fs.exists(fname, function(exists) {
		if (exists) {
			console.log('Opening file: ' + fname);
			fs.readFile(fname, function(err,data) {
				res.writeHead(200, {'Content-Type': 'image/jpeg'});
				res.write(data);
				res.end();
			}); // end fs.readFile()
		} // end if (exists)
		else {
			console.log('File not found: ' + fname);
			res.writeHead(404, {'Content-Type': 'text/plain'});
			res.write('404 Not Found\n');
			res.end();
		}
	}) // end fs.exists()

}

var s = http.createServer(handle_incoming_request); 
s.listen(process.env.PORT || 8099);
