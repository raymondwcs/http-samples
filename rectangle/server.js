var http = require('http'); 
var url = require('url');

function Rectangle(width,length) { 
	this.width = width;
	this.length = length;
	this.area = this.width * this.length;
}

function handle_incoming_request(req, res) {
   console.log("INCOMING REQUEST: " + req.method + " " + req.url);
   
   var parsedURL = url.parse(req.url,true);  //true to get query as object
   switch(parsedURL.pathname) {
      case '/area':
         var queryAsObject = parsedURL.query;
         var obj = new Rectangle(queryAsObject.width, queryAsObject.length); 
         res.writeHead(200, {"Content-Type" : "text/html"});
         res.write("<html>");
         res.write("<head><title>Rectangle Area Calculator</title></head>");
         res.write("<p>Area of rectangles having length <b>" + queryAsObject.length + "</b>, width <b>" +
                   queryAsObject.width + "</b> is <b>" + obj.area + "</b></p>");
         res.write("<br><a href='javascript:history.back()'>Back</a>");
         res.write("</html>");
         res.end();
         break;
         // res.writeHead(200, {"Content-Type" : "application/json"}); 
         // res.end(JSON.stringify(obj));;
      default:
         res.writeHead(200, {"Content-Type" : "text/html"});
         res.write("<html>");
         res.write("<head><title>Rectangle Area Calculator</title></head>");
         res.write("<form action='/area'>");
         res.write("Length: <input type='number' name='length'>");
         res.write("<br>");
         res.write("Width: <input type='number' name='width'>");     
         res.write("<br>"); 
         res.write("<input type='submit' value='Calcuate Area'>");       
         res.write("</form>");
         res.write("</html>");    
         res.end();     
   }
}

var s = http.createServer(handle_incoming_request); 
s.listen(process.env.PORT || 8099);