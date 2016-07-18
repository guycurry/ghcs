/*
var express = require('express');
var app = express();



app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

*/

var express = require('express');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css'));

app.get('*', function(request, response) {
		// console.log(__dirname, request);
		//response.render('/index.ejs');
		
		if(request.url === '/'){
	    	response.sendFile(__dirname + '/index.html');
		}
		else{
			response.sendFile(__dirname + request.url);
		}

})
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});