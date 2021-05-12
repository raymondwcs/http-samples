const http = require('http');
const querystring = require('querystring');

const handle_incoming_request = (req, res) => {
   let timestamp = new Date().toISOString();

   const { url, headers, method } = req;

   console.log(`Incoming request ${method}, ${url} received at ${timestamp}`);

   let parsedURL = new URL(url, `http://${headers.host}`);

   console.log(`Pathname: ${parsedURL.pathname}`)
   console.log(`Query string parameter(s): ${parsedURL.searchParams}`);

   res.writeHead(200, { "Content-Type": "text/html" });
   res.write("<html><body>");
   res.write(`Request method: ${method} <br>`);
   res.write(`Request path: ${parsedURL.pathname}<br>`);
   res.write(`Query String: ${parsedURL.searchParams}<br><br>`);

   if (parsedURL.searchParams) {
      for (const [key, value] of parsedURL.searchParams) {
         res.write(`${key} = ${value}`)
      }
   } else {
      res.write('There is no query string parameter!<br>')
   }

   res.write(`<br>User Agent: ${req.headers['user-agent']}`);
   res.end("</body></html>");
}

const server = http.createServer(handle_incoming_request);
server.listen(process.env.PORT || 8099);