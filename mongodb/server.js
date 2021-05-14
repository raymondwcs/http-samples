const http = require('http');
const querystring = require('querystring');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const mongoDBurl = '';
const dbName = 'test';

const server = http.createServer((req, res) => {
	const timestamp = new Date().toISOString();
	const { url, headers, method } = req;
	const parsedURL = new URL(url, `http://${headers.host}`);

	console.log(`Incoming request ${method}, ${url} received at ${timestamp}`);

	switch (parsedURL.pathname) {
		case '/read':
			read_n_print(res);
			break;
		case '/create':
		case '/update':
		case '/delete':
			res.writeHead(500, { "Content-Type": "text/plain" });
			res.write(`${parsedURL.pathname} not available!!!`);
			res.end();
			break;
		default:
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.write("404 Not Found\n");
			res.end();
	}
});

const findRestaurants = (db, callback) => {
	cursor = db.collection('restaurants').find().limit(20);
	cursor.toArray((err, docs) => {
		assert.strictEqual(err, null);
		//console.log(docs);
		callback(docs);
	});
}

const read_n_print = (res) => {
	const client = new MongoClient(mongoDBurl, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	client.connect((err) => {
		assert.strictEqual(null, err);
		console.log("Connected successfully to server");

		const db = client.db(dbName);
		findRestaurants(db, (restaurants) => {
			client.close();
			console.log('Disconnected MongoDB');
			res.writeHead(200, { "Content-Type": "text/html" });
			res.write('<html><head><title>Restaurant</title></head>');
			res.write('<body><H1>Restaurants</H1>');
			res.write(`<H2>Showing ${restaurants.length} document(s)</H2>`);
			res.write('<ol>');
			for (var i in restaurants) {
				res.write(`<li>${restaurants[i].name}</li>`);
			}
			res.write('</ol>');
			res.end('</body></html>');
		});
	});
}

server.listen(process.env.PORT || 8099);
