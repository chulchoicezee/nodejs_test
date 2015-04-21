var net = require('net');
var util = require('util');

var port = process.argv[2] && parseInt(process.argv[2], 10) || 5000;

var server = net.createServer();

var clientSockets = [];

server.on('connection', function(socket) {
  console.log('클라이언트에 대해 연결되었습니다...');
  clientSockets.push(socket);
  console.log("현재 " + clientSockets.length + "명");
  
  socket.on('data', function(data) {
    console.log('수신한 데이터:', data.toString());
    if (data.toString().trim().toLowerCase() === 'quit') {
        socket.write('>>> 클라이언트와의 연결을 종료합니다...');
        return socket.end();
    }
    
    clientSockets.forEach(function(otherSocket) {
      if (otherSocket !== socket) {
        otherSocket.write('>>> ' + data);
      }
    });
  });
  
  socket.on('end', function() {
    console.log('클라이언트와의 연결이 해제되었습니다...');
  });
  
  socket.on('close', function() {
    console.log('소켓이 닫혔습니다...');
    clientSockets.splice(clientSockets.indexOf(socket), 1);
    console.log("현재 " + clientSockets.length + "명");
  });
  
});

server.on('error', function(err) {
  console.log('서버 에러 발생:', err.message);
});

server.on('close', function() {
  console.log('서버가 종료되었습니다');
});

server.listen(8003);