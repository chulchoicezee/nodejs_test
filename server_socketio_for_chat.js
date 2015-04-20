var http = require('http');
var io = require('socket.io')();
var fs = require('fs');

var app = http.createServer(function(req, res) {
  fs.readFile(__dirname + '/chat.html', function(err, data) {
    if (err) {
      res.writeHead(500);
      res.end('chat.html 로딩 오류가 발생했습니다.');
    } else {
      res.writeHead(200);
      res.end(data.toString());
    }
  });
});

io.attach(app);

io.sockets.on('connection', function(socket) {
  socket.emit('from server', 'Socket.IO 채팅 서버에 연결되었습니다.');
  socket.on("from client", function(data) {
    console.log(socket.id + ': ' + data.toString());
    socket.emit('from server', '나: ' + data.toString());
    socket.broadcast.emit('from server', socket.id + ': ' + data.toString());
  });
});

app.listen(8001);