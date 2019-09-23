const http = require('http'); 
const url = require('url');

class Rectangle {
   constructor (width,length) { 
      this.width = width;
      this.length = length;
      this.area = this.width * this.length;
   }
}

const server = http.createServer((req, res) => {
   console.log("INCOMING REQUEST: " + req.method + " " + req.url);
   
   var parsedURL = url.parse(req.url,true);  //true to get query as object

   switch(parsedURL.pathname) {
      case '/area':
      case '/api/area':
         var queryAsObject = parsedURL.query;
         var obj = new Rectangle(queryAsObject.width, queryAsObject.length); 
         if (parsedURL.pathname == '/area') {
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.write("<html>");
            res.write("<title>Rectangle Area Calculator</title>");
            res.write('<meta name="viewport" content="width=device-width, initial-scale=1">');
            res.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">');
            res.write('<body>');
            res.write('<div class="w3-container">');         
            res.write(`<p>Area of rectangles having length <b> ${queryAsObject.length} </b>, width <b> ${queryAsObject.width}</b> is <b> ${obj.area} </b></p>`);
            res.write("<br><a href='javascript:history.back()'>Back</a>");
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
         res.write("Length: <input type='number' name='length'>");
         res.write("<br>");
         res.write("Width: <input type='number' name='width'>");     
         res.write("<br>"); 
         res.write("<input type='submit' value='Calcuate Area'>");       
         res.write("</form>");
         res.write('</div>');
         res.write('</body>')
         res.end("</html>");    
   }
});

server.listen(process.env.PORT || 8099);