var ws=new WebSocket("ws://localhost:8181");
ws.onopen=function(e){
	console.log('Connection to server opened');
	alert('Connection to server opened');
};
function sendMessage(){
	ws.send("123");
}