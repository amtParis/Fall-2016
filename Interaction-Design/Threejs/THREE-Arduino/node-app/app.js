var port = 4000;
var http = require('http');
var server = http.createServer(function(request,response){});
server.listen(port,function(){
	console.log("Port "+port+" is open");
});
var serverWebSocket = require('websocket').server;
var wsServer = new serverWebSocket({
	httpServer:server
});
var connection;
wsServer.on('request', function(request){
  connection = request.accept(null,request.origin);
});


var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var serialPort = new SerialPort("/dev/tty.usbmodem621", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

serialPort.on("open", function () {
  console.log('Serial Port Open');
  console.log('=================');

  serialPort.on('data', function(data) {
    console.log('data: ',data.toString());
    //var UID = data.toString().split("UID:");
    if(connection)connection.send(JSON.stringify({message:data}));
  });

});
