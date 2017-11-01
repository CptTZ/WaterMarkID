var express = require('express');  
var app = express();  
app.use('/', express.static('webapp/dist'));  
var server = app.listen(3000, function() {  
  var port = server.address().port;
  console.log('Open http://localhost:%s', port);
});
