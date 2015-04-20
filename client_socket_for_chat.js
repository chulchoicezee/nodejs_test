var net = require('net');

process.stdin.resume();

var client = net.connect({host: 'chulchoice.cafe24app.com', port: 80}, function() {
//var client = net.connect(8001[, 'chulchoice.cafe24app.com'][, function() {
//var client = net.connect({host: 'localhost', port: 5000}, function() {
  console.log('클라이언트가 서버에 연결되었습니다...');
  client.write('I am Chuck Norris!');
});

client.on('data', function(data) {
  console.log(data.toString());
});

client.on('end', function() {
  console.log('클라이언트가 서버에서 연결 해제되었습니다. ');
});

client.on('close', function() {
  console.log('클라이언트의 연결이 닫혔습니다. ');
});

process.stdin.on('data', function(data) {
  if (data.toString().trim().toLowerCase() === 'quit') {
    console.log('클라이언트가 서버에 종료를 요청합니다...');
    client.write(data);
//  client.end();
    process.stdin.end();
  } else {
    client.write(data);
  }
});
