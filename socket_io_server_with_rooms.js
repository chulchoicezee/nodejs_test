var http = require('http');
var io = require('socket.io')();
var fs = require('fs');

var app = http.createServer(function(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    if (err) {
      res.writeHead(500);
      res.end('index.html 로딩 오류가 발생했습니다.');
    } else {
      res.writeHead(200);
      res.end(data.toString());
    }
  });
});

io.attach(app);

io.sockets.on('connection', function(socket) {
  socket.join('someroom', function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log(socket.id + '는 [' + socket.rooms + ']에 조인되었습니다.');
    }
  });
  
  setTimeout(function doTask() {
    socket.to('someroom').emit('from server', socket.id + '가 보낸 정보: ' + new Date().toString());
    setTimeout(doTask, 3000);
  }, 3000);
  
  socket.emit('from server', 'Socket.IO 서버에 연결되었습니다.');
  socket.on("from client", function(data) {
    console.log(socket.id + ": " + data.toString());
  });
});

app.listen(8080);