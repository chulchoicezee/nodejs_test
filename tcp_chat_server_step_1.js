var net = require('net');

var port = process.argv[2] && parseInt(process.argv[2], 10) || 5000;

var server = net.createServer();

server.on('connection', function(socket) {
  console.log('클라이언트에 대해 연결되었습니다...');
});

server.on('error', function(err) {
  console.log('서버 에러 발생:', err.message);
});

server.on('close', function() {
  console.log('서버가 종료되었습니다');
});

server.listen(port);