setTimeout(()=>{
    console.log('timeout')
},0)

setImmediate(()=>{
    console.log('immedlate')
})

function esyncReel(data,callback){
    process.nextTick(()=>{
        callback(data=='food')
    })
}

process.nextTick(()=>{
    console.log('nextTick')
})

var EventEmitter = require('events').EventEmitter;
class App extends EventEmitter{

}

var app = new App();

app.on('start',()=>{ //on 訂閱
    console.log('start')
})

app.emit('start'); //emit 触發

console.log('---- 111 ')