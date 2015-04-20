var net = require('net');

var port = 5000;
var server = net.createServer();

server.on('listening', function() {
  console.log('TCP 서버가 ', port, '번 포트에서 리스닝 중입니다...');
});

server.on('connection', function(socket) {
  console.log('TCP 서버가 새로운 연결을 생성하였습니다...');
  
  socket.on('end', function() {
  console.log("클라이언트 소켓을 종료합니다...");
  setTimeout(function() {
      server.close();
    }, 5000);
  });
  
});

server.on('close', function() {
  console.log('서버가 닫혔습니다...');
});

server.on('error', function(err) {
  console.log('에러 발생:', err.message);
});

server.listen(port);