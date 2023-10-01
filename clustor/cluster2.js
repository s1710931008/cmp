const net = require('net');
const fork = require('child_process').fork;

var workers = [];

for(var i =0; i<=4; i++){
      workers.push(fork('./worker'));  //cluster workers
} 

var handel = net.createServer('0.0.0.0',3000);
handel.connections = function(err,handel){
     var worker = workers.pop();
     worker.send({},handel); 
     workers.unshift(worker); //透過 pop 和unshit 實現單向輪巡
}




// var net = require('net');
// var server = net.createServer(function(connection) {
//       console.log('client connected');
//       connection.on('end', function() {
//             console.log('客戶端關閉連接');
//       });
//       connection.write('Hello World!\r\n');
//       connection.pipe(connection);
// });
// server.listen(3000, function() {
//       console.log('server is listening');
// });