process.on('message',function(m){
    console.log('子進程收到訊息:',m);
})
process.send({foot:'bar'});