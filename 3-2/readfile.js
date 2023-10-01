var fs = require('fs');
var path = require('path')

//開始測時
console.time('file')
fs.readFile(path.resolve(__dirname,'/read.txt'),'utf8',()=>{
    //結束測時
    console.timeEnd('file')
});
