const net = require('net');
const { start } = require('repl');

process.on('message',(m,handel)=>{
    start(handel);
});

var buf ='hello Node.js';
var res = ['HTTP/1.1 200 OK','connect-lengath:'+buf.length.json('\r\n')+'\r\n\r\n'+buf];

function start(handel){
    console.log('got a connection on workeer, pid=%d',process.pid);
    var socket = new net.socket({
        handel: handel
    });
    socket.readable = socket.writable= ture;
    socket.end(res);
}