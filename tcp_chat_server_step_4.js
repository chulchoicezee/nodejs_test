var net = require('net');


var port = process.argv[2] && parseInt(process.argv[2], 10) || 5000;

var server = net.createServer();

var clientSockets = [];

server.on('connection', function(socket) {
  console.log('클라이언트에 대해 연결되었습니다...');
  clientSockets.push(socket);
  
  socket.on('data', function(data) {
    console.log('수신한 데이터:', data.toString());
//    if (data.toString().trim().toLowerCase() === 'quit') {
//        socket.write('>>> 클라이언트와의 연결을 종료합니다...');
//        return socket.end();
//    }
    
    clientSockets.forEach(function(otherSocket) {
      if (otherSocket !== socket) {
        otherSocket.write(data);
      }
    });
  });
  
  socket.on('close', function() {
    console.log('연결이 닫혔습니다...');
    clientSockets.splice(sockets.indexOf(socket), 1);
  });
  
});

server.on('error', function(err) {
  console.log('서버 에러 발생:', err.message);
});

server.on('close', function() {
  console.log('서버가 종료되었습니다');
});

server.listen(port);