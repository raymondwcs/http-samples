var http = require('http');
var url  = require('url');
var MongoClient = require('mongodb').MongoClient; 
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var mongourl = 'mongodb://localhost:27017/test';  // use your mlab database

var server = http.createServer(function (req,res) {
	console.log("INCOMING REQUEST: " + req.method + " " + req.url);

	var parsedURL = url.parse(req.url,true); //true to get query as object

	switch(parsedURL.pathname) {
		case '/read':
			read_n_print(res);
			break;
		case '/create':
		case '/update':
		case '/delete':
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.write(parsedURL.pathname + " not available yet\n");
			res.end();
			break;
		default:
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.write("404 Not Found\n");
			res.end();
	}
});

function read_n_print(res) {
	MongoClient.connect(mongourl, function(err, db) {
		assert.equal(err,null);
		console.log('Connected to MongoDB\n');
		findRestaurants(db,function(restaurants) {
			db.close();
			console.log('Disconnected MongoDB\n');
			res.writeHead(200, {"Content-Type": "text/html"});
			res.write('<html><head><title>Restaurant</title></head>');
			res.write('<body><H1>Restaurants</H1>');
			res.write('<H2>Showing '+restaurants.length+' document(s)</H2>');
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
	cursor = db.collection('restaurant').find().limit(20); 
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
