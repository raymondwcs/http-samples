const http = require('http');
const url = require('url');

const server = http.createServer((req,res) => {
   let timestamp = new Date().toISOString();

   const queryObject = url.parse(req.url,true).query;

   res.writeHead(200, {'Content-Type': 'text/html'});
   res.write('<html><body>')
   res.write(`<p>${req.method} request received at ${timestamp}</p>`)
   res.write(`<p>You entered <b>${queryObject.name}</b> and <b>${queryObject.password}</b>` );
   res.end('</body></html>')

});
server.listen(process.env.PORT || 8099);
