var http = require('http');
var url = require('url');
var formidable = require('formidable');

var server = http.createServer(function(req,res) {
    console.log('Request: '+req.url);

    var parsedURL = url.parse(req.url,true);
    switch(parsedURL.pathname) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'}); 
            res.write('<html><body>');
            res.write('<form action="http://localhost:8099/login" method="POST">');
            res.write('User Name: <input type="text" name="name"><br></input>');
            res.write('Password: <input type="password" name="password"><br>');
            res.write('<input type="submit" value="Login">');
            res.end('</form></body></html>');
            break;
        case '/login':
            var form = new formidable.IncomingForm();
            form.parse(req,function(err,fields,files) {
                res.writeHead(200, {'Content-Type': 'text/html'}); 
                res.write('<html>')        
                res.write('User Name = ' + fields['name']);
                res.write('<br>')
                res.write('Password = ' + fields['password']);
                res.end('</html>')   
            })
            break;
    }
});
server.listen(process.env.PORT || 8099);
