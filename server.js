var express = require('express');
var app = express();

app.use(express.static('src'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/src/index.html');
});

var server = app.listen(process.env.PORT || 3000, function() {
	console.log('Listening on port %s', server.address().port);
});
