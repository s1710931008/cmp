let http = require("http");

http.createServer((req, res)=>{
    res.end("Hello~\n");
}).listen(8000,()=>{
    console.log('server is listening: '+8000);
});