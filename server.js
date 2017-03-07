//引入express模块，进行session控制等
var express = require('express');
var app=new express();
var http = require('http').Server(app);

// var session=require('express-session');

// app.use(express.session());
app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});



var io=require('socket.io')(http);
/**
	自定义的事件:
		notice_login:系统消息

		chat:在聊天室里的聊天
		send:服务端发给客户端
		get: 客户端发给服务端(服务端获取)
*/

/*	userid
	username
	message
*/


/* 用一种数据结构(图)把username和userid关联起来*/



var users={
	//用户名userName和套接字id(socketId)存放在name_id中
	userCount: 0,
	name_id: {},
	addUser: function(userName,userId){
		if(users.name_id[userName] === undefined){
			users.name_id[userName]=userId;
			users.userCount++;
		}
	},
	deleteUser: function(userName){
		if(users.name_id[userName] !== undefined){
			delete users.name_id[userName];
			users.userCount--;
		}
	},
	hasUser: function(userName){
		if(users.name_id[userName] ===undefined){
			return true;
		}else{
			return false;
		}
	},
	getUserId: function(userName){
		if(users.name_id[userName] !==undefined){
			return users.name_id[userName];
		}else{
			return undefined;
		}
	}
};
// users.addUser('test','1434');
// console.log('-----------:' + users.name_id['test']);
// console.log('-----------:' + users.hasUser('test'));
// users.deleteUser('test');
// console.log('-----------:' + users.name_id['test']);
// console.log('-----------:' + users.hasUser('test'));



io.sockets.on('connection', function(socket){

	//io.emit('事件名',msg)给全部连接发送消息
	//socket.emit('事件名',msg)给该连接发送消息

	//用户连接，浏览器端会触发一个userConnect事件
	socket.on('userConnect', function(username){
		users.addUser(username,socket.id);
		console.log(username+' 登入,'+'在线人数'+users.userCount);
	});

	//
	socket.on('myconnect', function(username){
		users.addUser(username,socket.id);
		console.log(username+' 登入,'+'在线人数'+users.userCount);
		io.emit('notice_login',username);
	});

	//用户关闭连接事件
	socket.on('disconnect', function(username){
		users.deleteUser(username);
		console.log('user disconnected');
		io.emit('notice_logout',username);
	});

	//系统消息事件
	// io.emit('notice_login',socket.id+"  加入会话");



	//聊天室，聊天室所有用户看到
	socket.on('chat', function(msg){
		console.log('chat: ' + msg);
		//
		io.emit('send', msg);
	});

	//用户一对一发送事件(server发往client)
	socket.on('send', function(jsonString){
		var jsonObject=JSON.parse(jsonString);
		var userName=jsonObject.username;

		console.log('new message ############: ' + msg);
		if(users.hasUser(userName)){
			var socketId=users.getUserId(userName);
			socket(socketId).emit('send',jsonString);
		}else{
			socket.emit('notice_err','该用户已下线');
		}
	});
	//server端获取(client发往server)
	socket.on('get', function(msg){
		console.log('new message ############: ' + msg);
	});


});





http.listen(3000, function(){
	console.log('listening on *:3000');
});
