var http = require('http');
var url  = require('url');
var MongoClient = require('mongodb').MongoClient; 
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
//var mongourl = 'mongodb://localhost:27017/test';
var mongourl = 'mongodb://student:password@ds031873.mlab.com:31873/comps381f';

var server = http.createServer(function (req,res) {
	var greetingMsg = "Hello there!";

	console.log("INCOMING REQUEST: " + req.method + " " + req.url);

	var parsedURL = url.parse(req.url,true); //true to get query as object

	if (!(
		parsedURL.pathname == '/create' ||
		parsedURL.pathname == '/read' ||
		parsedURL.pathname == '/update' ||
		parsedURL.pathname == '/delete' 
		)) {
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.write("404 Not Found\n");
		res.end();
	}
	else {
		switch(parsedURL.pathname) {
			case "/read":
				read_n_print(res);
				break;
			default:
				res.writeHead(500, {"Content-Type": "text/plain"});
				res.write(parsedURL.pathname + " not available yet\n");
				res.end();
		}
	}
});

function read_n_print(res) {
		MongoClient.connect(mongourl, function(err, db) {
			assert.equal(err,null);
			console.log('Connected to MongoDB\n');
			findRestaurants(db,function(restaurants) {
				db.close();
				console.log('Disconnected MongoDB\n');
				res.write('<html><head><title>Restaurant</title></head>');
				res.write('<body><H1>Restaurants</H1>');
				res.write('<ol>');
				for (var i in restaurants) {
					res.write('<li>'+restaurants[i].name+'</li>');
				}
				res.write('</ol>');
				res.end('</body></html>');
				return(restaurants);
			}); 
		});
}

function findRestaurants(db,callback) {
	var restaurants = [];
	cursor = db.collection('restaurants').find().limit(20); 
	cursor.each(function(err, doc) {
		assert.equal(err, null); 
		if (doc != null) {
			restaurants.push(doc);
		} else {
			callback(restaurants); 
		}
	});
}

server.listen(process.env.PORT || 8099);
