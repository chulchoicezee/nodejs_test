var io = require('socket.io-client');
process.stdin.resume();

var socket = io.connect('http://localhost:8001');
//var socket = io.connect('http://chulchoice.cafe24app.com:80');

socket.on('connect', function () { console.log("socket connected"); });
socket.on('from server', function (data) { console.log(data); });
socket.emit('from client', 'a peron joined');

process.stdin.on('data', function(data) {
	  if (data.toString().trim().toLowerCase() === 'quit') {
	    console.log('클라이언트가 서버에 종료를 요청합니다...');
	    socket.emit('from client', data);
	//  client.end();
	    process.stdin.end();
	  } else {
		  socket.emit('from client', data);
	  }
});