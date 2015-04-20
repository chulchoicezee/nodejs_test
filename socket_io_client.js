var io = require('socket.io')();

var socket = io.connect('http://chulchoice.cafe24app.com');
socket.on('from server', function(data){
	console.log(data.toString());
});
socket.emit('from client', 'hello node.js & socket.io');