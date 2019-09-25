const http = require('http'); 
const url = require('url');

class Rectangle {
   constructor (width = 1, length = 1) { 
      this.width = width;
      this.length = length;
      this.area = this.width * this.length;
   }
}

const server = http.createServer((req, res) => {
   console.log(`INCOMING REQUEST: ${req.method} ${req.url}`);
   
   let parsedURL = url.parse(req.url,true);  //true to get query as object

   switch(parsedURL.pathname) {
      case '/area':
      case '/api/area':
         let obj = new Rectangle(parsedURL.query.width, parsedURL.query.length); 
         if (parsedURL.pathname == '/area') {
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.write("<html>");
            res.write("<title>Rectangle Area Calculator</title>");
            res.write('<meta name="viewport" content="width=device-width, initial-scale=1">');
            res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">');
            res.write('<body>');
            res.write('<div class="w3-container">');         
            res.write(`<p>Area of rectangles having length <b> ${obj.length} </b>, width <b> ${obj.width}</b> is <b> ${obj.area} </b></p>`);
            res.write("<br><a href='/'>Back</a>");
            res.write('</div>');         
            res.write('</body>')         
            res.end("</html>");
         } else {
            res.writeHead(200, {"Content-Type" : "application/json"}); 
            res.end(JSON.stringify(obj));;
         }
         break;
      default:
         res.writeHead(200, {"Content-Type" : "text/html"});
         res.write("<html>");
         res.write("<title>Rectangle Area Calculator</title>");
         res.write('<meta name="viewport" content="width=device-width, initial-scale=1">');
         res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">');
         res.write('<body>');
         res.write('<div class="w3-container">');
         res.write("<form action='/area'>");
         res.write("Length: <input type='number' name='length' min=1 value=1>");
         res.write("<br>");
         res.write("Width: <input type='number' name='width' min=1 value=1>");     
         res.write("<br>"); 
         res.write("<input type='submit' value='Calcuate Area'>");       
         res.write("</form>");
         res.write('</div>');
         res.write('</body>')
         res.end("</html>");    
   }
});

server.listen(process.env.PORT || 8099);