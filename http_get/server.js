const http = require('http');
const url = require('url');

const server = http.createServer((req,res) => {
   let timestamp = new Date().toISOString();
   
   console.log(req.url);
   
   // extract path and query string parameters of incoming requests
   const parsedURL = url.parse(req.url,true);
   const queryObject = url.parse(req.url,true).query;
   
   if (parsedURL.pathname == '/favicon.ico') {
      console.log('favicon requested');
      res.end();
   }
   
   if (parsedURL.pathname == '/login') {
      res.writeHead(200, {'Content-Type': 'text/html'});  // send HTTP response header
      res.write('<html><body>');  // send HTTP response body 
      res.write(`<p>${req.method} request received at ${timestamp}</p>`);
      res.write(`<p>You entered <b>${queryObject.name}</b> and <b>${queryObject.password}</b>` );
      res.end('</body></html>');  // send last piece of response and drop connection
   }
   
});
server.listen(process.env.PORT || 8099);
