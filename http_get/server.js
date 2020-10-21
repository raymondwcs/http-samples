const http = require('http');
const url = require('url');

const server = http.createServer((req,res) => {
   let timestamp = new Date().toISOString();
   
   console.log(req.url);
   
   // convert the query string parameters in the incoming url to JSON
   const queryObject = url.parse(req.url,true).query;

   if (queryObject.path == '/login') {
      res.writeHead(200, {'Content-Type': 'text/html'});  // send HTTP response header
   
      res.write('<html><body>');  // send HTTP response body 
      res.write(`<p>${req.method} request received at ${timestamp}</p>`);
      res.write(`<p>You entered <b>${queryObject.name}</b> and <b>${queryObject.password}</b>` );
      
      res.end('</body></html>');  // send last piece of response and drop connection
   }
   req.end();
});
server.listen(process.env.PORT || 8099);
