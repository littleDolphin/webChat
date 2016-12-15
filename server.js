var express = require('express');
var app=new express();
var http = require('http').Server(app);
var io=require('socket.io')(http);

app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});


/**
	自定义的事件:
		chat:在聊天室里的聊天
		send:服务端发给客户端
		get: 客户端发给服务端(服务端获取)
*/

/*	userid
	username
	message
*/
var users=new Object();

var count=0;
var userName;

io.sockets.on('connection', function(socket){

	//io.emit('事件名',msg)给全部连接发送消息
	//socket.emit('事件名',msg)给该连接发送消息

	// console.log('socketid: ' + socket.id);
	// userName='user'+count;

	// users['user'+count]=socket.id;
	

	socket.on('chat', function(msg){
		console.log('chat: ' + msg);
		// 
		io.emit('send', msg);
	});
	socket.on('send', function(msg){
		console.log('new message ############: ' + msg);
		socket.emit('send','the message is'+msg);
	});
	socket.on('get', function(msg){
		console.log('new message ############: ' + msg);
	});

	socket.on('connect', function(username){
		users[username]=socket.id;
		console.log(username+' connected');
	});
	socket.on('disconnect', function(username){
		console.log(username+' disconnected1');
		delete users[username];
		console.log("+++++++++++++++");
		for(i in users){
			console.log(i +": "+ users[i]);
		}
		console.log("--------------");
	});
});



http.listen(3000, function(){
	console.log('listening on *:3000');
});
