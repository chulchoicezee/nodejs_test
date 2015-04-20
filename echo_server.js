var net = require('net');

var server = net.createServer(function(socket) {
  console.log('서버에 새로운 클라이언트 연결 생성...');

  socket.setEncoding('utf8');

  socket.write(">>> 안녕하세요! 지금부터 타이핑하실 수 있습니다." + 
		  	   "종료하시려면 quit을 입력하십시오.\n");

  socket.on('data', function(data) {
    console.log('수신된 데이터: ', data.toString());
    if (data.toString().trim().toLowerCase() === 'quit') {
      socket.write('>>> 클라이언트와의 연결을 종료합니다...');
      return socket.end();
    }
    socket.write(">>> " + data.toString());
  });

  socket.on('end', function() {
    console.log('클라이언트 연결이 종료되었습니다...');
  });
  
  

}).listen(5000);