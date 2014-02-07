var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/nodeChat');
//Create Schema!
var messageSchema = new Schema({
  user:  String,
  message: String,
  date: { type: Date, default: Date.now },
});
//Convert Schema to Model
var Message = mongoose.model('Message', messageSchema);

// ROUTING (To serve static files, e.g. CSS, JS

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

//----------------------------------------
app.post('/send', function(req, res){
	var recievedMessage = new Message({});
		recievedMessage.user = req.body.username;
		recievedMessage.message = req.body.message;
	recievedMessage.save(function (err, messageSent) {
	  if (err) {
	  	console.log("SAVE MESSAGE ERROR: " + err);
	  } else {
	  	res.status('200').send(JSON.stringify(recievedMessage));
	  }
	});
});

/*
 /messages will retrieve messages from MongoDB. If the user haven't recieved any messages before, Node will retrieve all messages currently in the database, if the client sends the last recieved messages date, node will only send newer messages. 
*/


app.get('/messages', function(req, res){
	if	(req.query.date !== 'undefined') 	{
		var lastRecievedISODate = new Date(req.query.date);
		Message.find({"date" : { $gt : lastRecievedISODate }}, function (err, messages) {
		  if (err) {
		  	console.log('RETRIEVE MESSAGE ERROR: ' + err);
		  } else {
		  	res.status('200').send(JSON.stringify(messages));
		  }
		})
	} else {
		Message.find(function (err, messages) {
		  if (err) {
		  	console.log('RETRIEVE MESSAGE ERROR: ' + err);
		  } else {
		  	res.status('200').send(JSON.stringify(messages));
		  }
		})	
	}
});



app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.listen(80, '192.168.0.196');
console.log('Node started listening on port 80');