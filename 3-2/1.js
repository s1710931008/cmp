var fs = require('fs');
const { date } = require('joi');
var path = require('path')

function someAsyncOperation(callback) {
    //花2秒
    fs.readFile(path.resolve(__dirname,'/read.txt'),callback);
}

var timeoutSchedvled = Date.now();
var fileReadTime = 0;

setTimeout(() => {
    var delay = Date.now() - timeoutSchedvled;
    console.log('setTimeout: ' +(delay)+ 'ms have passed since i was scheduled');
    console.log('filleReaderTime',fileReadTime-timeoutSchedvled);
}, 10);

someAsyncOperation(() => {
    fileReadTime = Date.now();
    while(Date.now()-fileReadTime < 20){

    }
})