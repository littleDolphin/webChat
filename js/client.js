var webSocket=new WebSocket("ws://localhost:8181");


webSocket.onopen=function(e){
	console.log('Connection to server opened');
};

webSocket.onmessage=function(e){
	// alert(e.data);
	show(e.data);
};


var button=document.getElementById("button");

document.getElementById("input").onkeypress=function(event){
	if(event.keyCode == 13){
		var input=document.getElementById("input");
		sendMessage(input.value);
		input.value='';
	}
};

// button.onclick=show();

function show(message){
	var appenLi = document.createElement("li");
	var ul=document.getElementById("ul");
	appenLi.innerHTML = message;
	ul.appendChild(appenLi);

}



function sendMessage(message){
	webSocket.send(message);
}