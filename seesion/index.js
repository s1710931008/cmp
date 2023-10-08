const express = require('express');
const app = express();
const port = 3000

const session = require("express-session");
// const MongoStore = require('connect-mongo');

app.use(session({
    name: 'sid',     //儲存 sessionID 的那個 Cookie 的名稱。設置的name 預設值是 connect.sid
    secret: 'atguigu', //參與加密的字串 用來認證該 Session 的資料。（必填）
    saveUninitialized: false, //是否每次請求都設置一個session的id
    resave: true, //即使 Session 沒做變動，是否強制重新儲存進 Store。
    cookie:{  //儲存 sessionID 的 Cookie 的形式。
        httpOnly:true,  //開啟 前端無通過js操作
        maxAge:1000*300 //登入時間五分鐘
    },
}))

//http://127.0.0.1:3000/login?username=admin&password=admin
app.get('/login',(req,res)=>{
    if(req.query.username === 'admin' && req.query.password === 'admin'){
        req.session.username = 'admin';
        req.session.uid='12345';
        res.send('OK')
    } else{
        res.send('No')
    }
})

app.get('/cart',(req,res)=>{
    if(req.session.username){
        res.send(`登入成功,登入者${req.session.username}`)
    }else{
        res.send('尚認證')
    }
})

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.send('登出');
})

app.get('/',(req,res)=>{
    req.session.user = 'kenny'
    res.end('home')
    console.log(req.session)
    console.log(req.session.user)
    console.log(req.sessionID) 
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
  })
  