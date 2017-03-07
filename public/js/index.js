var userName='user'+Math.round(Math.random()*10000);
var socket = io();

socket.emit('myconnect',userName);
var username=document.getElementById('username');
username.value=userName;


// var message_ul=document.getElementById('message_ul');

username.onkeypress=function(e){
	alert(345);
};

// button.onclick=function(){
// 	if(input.value!== '' ){
// 		var jsonMessage={
// 			'username':username.value,
// 			'message':input.value
// 		};
// 		socket.emit('chat',JSON.stringify(jsonMessage));
// 	}
// };

// input.onkeypress=function(e){
// 	if(e.keyCode==13 && input.value!==''){
// 		var jsonMessage={
// 			'username':username.value,
// 			'message':input.value
// 		};
// 		socket.emit('chat',JSON.stringify(jsonMessage));
// 	}
// };

socket.on('send',function(jsonMessage){
	var jsonObject=JSON.parse(jsonMessage);
	var username=jsonObject.username;
	var message=jsonObject.message;
	// appendMessage(username,message);
	input.value='';
});

socket.on('notice_login',function(userName){
	// appendMessage(userName,"加入会话");
});
socket.on('notice_logout',function(userName){
	// appendMessage(userName,"离开会话");
});


function appendMessage(username,message){
	var li = document.createElement("li");
	var user_logo=document.createElement("span");
	user_logo.className='user_logo';
	user_logo.innerHTML=username;

	var span_message=document.createElement("span");
	span_message.className='send';
	span_message.innerHTML = message;
	var arrow=document.createElement("span");
	span_message.appendChild(arrow);
	arrow.className='leftArrow';
	li.appendChild(user_logo);
	li.appendChild(span_message);
	message_ul.appendChild(li);
}


//左侧添加一个房间或对话
function appendSelect(name){
	var ul=document.getElementById("select_div").getElementsByTagName("ul")[0];
	var li = document.createElement("li");
	li.innerHTML=name;
	li.selectName=name;
	ul.appendChild(li);
}
//右侧添加一个对应房间或对话的消息列表和输入input
function appendOneSelect(name){
	var message_div=document.getElementById("message_div");
	message_div.innerHTML='<div class="one_select" selectName="">'+
								'<div class="message_list">'+
									'<ul class="message_ul">'+
									'</ul>'+
								'</div>'+
								'<div class="message_input">'+
									'<input type="text" class="input">'+
									'<button class="button">dsf</button>'+
								'</div>'+
							'</div>';
}
appendSelect('34');
appendOneSelect('34');