var exec = require('child_process').exec;

//第一種
// exec('ls',(err,stodut,stderr)=>{
//     if(err){// 錯誤處理
//         console.log('stderr',stderr)
//     }
//     console.log('stodut',stodut)
// })

//第二種
// var child = exec('lss')
// child.stdout.on('data',(data)=>{
//     console.log('data',data)
// });

// child.stderr.on('data',(err)=>{
//     console.log(err)
// })

//代參數
// const {execFile} = require('child_process'); 
// execFile('ls',['-c'],(err,stdout,stderr)=>{ //過濾惡意代碼
//     console.log('stdout',stdout)
// })

const {spawn} = require('child_process'); 
var child = spawn('ls',['-c']);

child.stdout.on('data',(data)=>{
    console.log('data',data.toString('utf8'))
});

child.stderr.on('data',(err)=>{
    console.log(err)
})