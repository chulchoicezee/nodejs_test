var net = require('net');

var client = net.connect({port: 5000}, function() { 
  console.log('클라이언트가 서버에 연결되었습니다...');
});

client.on('end', function() {
  console.log('클라이언트가 서버에서 연결 해제되었습니다. ');
});

client.end(); // FIN s