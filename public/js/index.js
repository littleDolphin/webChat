var userName='user'+Math.round(Math.random()*10);
var socket = io();
alert(userName);
socket.emit('connect',userName);
var username=document.getElementById('username');

var button=document.getElementById('button');
var input=document.getElementById('input');
var message_ul=document.getElementById('message_ul');


button.onclick=function(){
	if(input.value!=''){
		var jsonMessage={
			'username':username.value,
			'message':input.value
		}
		socket.emit('chat',JSON.stringify(jsonMessage));
	}
};

input.onkeypress=function(e){
	if(e.keyCode==13 && input.value!=''){
		var jsonMessage={
			'username':username.value,
			'message':input.value
		}
		socket.emit('chat',JSON.stringify(jsonMessage));
	}	
};

socket.on('send',function(jsonMessage){
	var jsonObject=JSON.parse(jsonMessage)
	var username=jsonObject.username+': ';
	var message=jsonObject.message;
	appendMessage(username,message);
	input.value='';
});

function appendMessage(username,message){
	var li = document.createElement("li");
	var span_logo=document.createElement("span");
	var span_message=document.createElement("span");
	span_logo.innerHTML=username;
	span_message.innerHTML = message;
	li.appendChild(span_logo);
	li.appendChild(span_message);
	message_ul.appendChild(li);
}