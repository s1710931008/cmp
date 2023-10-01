const cluster = require('cluster');
const cpuNuns = require('os').cpus().length; //CPU核數

//cluser 就是主線程去fork 子線程，然後管理他們
if(cluster.isMaster){ //如果你是主線程
    // cluster.fork();
    for(var i = 0; i < cpuNuns; i++){
        cluster.fork(); //開啟子進程
    }

    // cluster.on('fork',(worker)=>{
    //     console.log('子進程 fork pid:',worker.process.pid);
    // })

    // cluster.on('listening',(worker)=>{
    //     console.log('子進程 fork hppt 工作 pid:',worker.process.pid);
    // })

    // cluster.on('exit',function(worker,code,signal){ //監聽壞掉
    //     console.log('worker'+ worker.process.pid+ ' died');
    // });

    cluster.on('disconnect',(worker)=>{ //監聽壞掉
        console.log('有子進程褪出了',worker.process.pid);
    });

    // Object.keys(cluster.workers).forEach((id)=>{
    //     cluster.workers[id].on('message',function(data){
    //         console.log('收到消息',data)
    //     })
    // })

    // cluster.on('disconnect',(worker)=>{ //監聽壞掉
    //     console.log('有子進程褪出了',worker.process.pid);
    // });

} else { // 子線程走下面
    console.log('我是子進程')
    // require('./http');
    // process.send('你好')
}