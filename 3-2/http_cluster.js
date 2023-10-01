const cluster = require('cluster');
const http = require('http');
const cpuNuns = require('os').cpus().length; //CPU核數

//cluser 就是主線程去fork 子線程，然後管理他們
if(cluster.isMaster){ //如果你是主線程
    // cluster.fork();
    for(var i = 0; i < cpuNuns; i++){
        cluster.fork(); //開啟子進程
    }

    cluster.on('exit',function(worker,code,signal){ //監聽壞掉
        console.log('worker'+ worker.process.pid+ ' died');
    });

} else { // 子線程走下面

    http.createServer((req, res)=>{
        res.end("Hello~\n");
    }).listen(8000,()=>{
        console.log('server is listening: '+8000);
    });
}