var http = require('http');
var qs = require ('querystring');

formServer = http.createServer(function(req,res) {
   console.log('Request: '+req.url);
   if (req.method == 'POST') {
      var data = '';  // message body data

      // process data in message body
      req.on('data', function(chunk) {
         data += chunk;
      });

      // when no more data in message body
      req.on('end', function() {  
         var post = qs.parse(data);
         console.log('User Name = ' + post.name);
         console.log('Password = ' + post.password);
      })
   }
});
formServer.listen(process.env.PORT || 8099);
