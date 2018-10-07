var http = require('http'); 
var url = require('url');

function handle_incoming_request(req,res) {
   console.log("Incoming request: " + req.url);
   console.log("Request type: " + req.method);
   var parsedURL = url.parse(req.url,true);  // request url -> json object

   res.writeHead(200,{"Content-Type" : "text/html"});
   res.write("<html><body>");
   res.write("Request method: " + req.method);
   res.write('<br>');
   res.write("Request path: " + parsedURL.pathname);
   res.write('<br>');   
   res.write("Query String: " + url.parse(req.url).query);
   res.write('<br>');   
 
   var queryAsObject = parsedURL.query;  // query string (json object)
   console.log(JSON.stringify(queryAsObject));
   var number_of_query_string_parameters = Object.keys(queryAsObject).length;
   if (number_of_query_string_parameters > 0) {
      res.write("No. of query string parameter(s): " + 
                number_of_query_string_parameters);
      res.write('<br>');      
      for (key in queryAsObject) {
         res.write(key + " = " + queryAsObject[key]);
         res.write('<br>');         
      }
   } else {
      res.write('There is no query string parameter!')
   }

   res.write("<br><br>User Agent: " + req.headers['user-agent']);
   res.end("</body></html>");   
}

var server = http.createServer(handle_incoming_request);
server.listen(process.env.PORT ||  8099);