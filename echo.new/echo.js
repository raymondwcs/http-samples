const http = require('http');

const handle_incoming_request = (req, res) => {
   let timestamp = new Date().toISOString();

   const { url, headers, method } = req;
   const requrl = new URL(url, `http://${headers.host}`);

   console.log(`Incoming request ${method}, ${url} received at ${timestamp}`);
   console.log(`Pathname: ${requrl.pathname}`)
   console.log(`Query string parameter(s): ${requrl.searchParams}`);

   res.writeHead(200, { "Content-Type": "text/html" });
   res.write("<html><body>");
   res.write(`Request method: ${method} <br>`);
   res.write(`Request path: ${requrl.pathname}<br>`);

   const querystring = JSON.stringify(requrl.searchParams).length > 0 ? requrl.searchParams : "nil"
   res.write(`Query String: ${querystring} <br>`);

   if (requrl.searchParams) {
      for (const [key, value] of requrl.searchParams) {
         res.write(`&nbsp; ${key} = ${value}`)
      }
   } else {
      res.write('There is no query string parameter!<br>')
   }

   res.write(`<br>User Agent: ${req.headers['user-agent']}`);
   res.end("</body></html>");
}

const server = http.createServer(handle_incoming_request);
server.listen(process.env.PORT || 8099);