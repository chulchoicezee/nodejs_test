var http = require('http');
var io = require('socket.io')();
var fs = require('fs');
var port = 8004;

var server = http.createServer();
server.listen(port);
//server.on('error', onError);
//server.on('listening', onListening);

io.attach(server);

io.sockets.on('connection', function(socket) {
  socket.emit('from server', 'Socket.IO 채팅 서버에 연결되었습니다.');
  socket.on("from client", function(data) {
    console.log(socket.id + ': ' + data.toString());
    socket.emit('from server', '나: ' + data.toString());
    socket.broadcast.emit('from server', socket.id + ': ' + data.toString());
  });
});

server.listen(8004);