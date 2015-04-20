var http = require('http');
var io = require('socket.io')();
var fs = require('fs');

var app = http.createServer(function(req, res) {
  fs.readFile(__dirname + '/chat_with_login.html', function(err, data) {
    if (err) {
      res.writeHead(500);
      res.end('chat_with_login.html 로딩 오류가 발생했습니다.');
    } else {
      res.writeHead(200);
      res.end(data.toString());
    }
  });
});

io.attach(app);

io.sockets.on('connection', function(socket) {
  socket.emit('login');
  
  socket.on('login', function(data) {
    if (!data.toString().trim()) {
      socket.username = socket.id;
    } else {
      socket.username = data.toString();
    }
    
    console.log(socket.username + '이(가) 로그인하셨습니다.');
    socket.emit('from server', '채팅서버에 ' + socket.username + '으로 로그인하였습니다.');
    socket.broadcast.emit('from server', socket.username + '이(가) 로그인하셨습니다.');
  });
  
  socket.on('from client', function(data) {
    console.log(socket.username + ': ' + data.toString());
    socket.emit('from server', '나: ' + data.toString());
    socket.broadcast.emit('from server', socket.username + ': ' + data.toString());
  });
  
  socket.on('disconnect', function() {
    console.log(socket.username + '이(가) 로그아웃하셨습니다.');
    socket.broadcast.emit('from server', socket.username + '이(가) 로그아웃하셨습니다.');
  });
});

app.listen(8080);