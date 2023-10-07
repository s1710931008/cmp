// JWT 三部組成 Headers(頭部),Payload(有效負載),Ｓignature(簽名)三者之間用.來分隔
// Headers.palyload.Singature
// palyload 用戶訊息
// header , signature 是安全性相關的部份，只是為了保証 Token的安全性
// Authorization: Bearer <token>

//安裝 jwt
// npm install jsonwebtoken express-jwt
const express = require('express');
const app = express();

//允許跨域資源共享
const cors = require('cors')
app.use(cors())
// 產生 jwt 字串函數
const jwt = require("jsonwebtoken")
//導入將客戶傳送過來的 jwt 字串,解析還原成json格式
const expressJWT = require('express-jwt')

//解析 post 表單數據的中間值
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended:false }))

// 定義 secret 密鑰
const secretKey = 'itheima No1 ^_^'

//使用 app.user()來註冊訊息
//expressJW({ secret: secretKey}) //用來解析 token的訊息
// .unless({ path:[/^\/api\//]}) 用來指定那些接口 不需求訪問權限
app.use(expressJWT({ secret: secretKey}).unless({ path:[/^\/api\//] }))

//登入方法
app.post('/api/login', (req,res)=>{
    console.log(req.body)
    console.log(req.body.username)
    if(req.body.username !== 'admin' || req.body.password !== '123456') {
        return res.send({status:1, msg:'登入失敗'})
    }
  
    const userinfo = req.body
    
    const tokenStr = jwt.sign({username: userinfo.username},secretKey,{expiresIn:'60s'})

    res.send({ 
        status:200,
        msg:'登入成功',
        //三個參數:用戶名稱 , 加密key, 配置對象有效期
        token: tokenStr,
    })
})


app.get('/api/account',(req,res)=>{

  //驗證Token
  let StrToken= req.get('token');
  console.log(StrToken)
  jwt.verify(StrToken, secretKey,(err, data)=>{
    if(err){
      console.log('驗證失敗');
      return res.json({
        status:200, 
        msg:"無效的token",
        data: null
      })
    }
  })

    console.log(req)

    res.send({
        status:200, 
        msg:"訊息取得成功",
        data: req.user, //傳送給客戶端的用戶訊息
    })
})

// 使用全局錯誤處理中間件，捕獲解析 JWT 失敗後產生的錯誤
// app.use((err, req, res, next) => {
//     // 這次錯誤是由 token 解析失敗導致的
//     if (err.name === 'UnauthorizedError') {
//       return res.send({
//         status: 401,
//         message: '無效的token',
//       })
//     }
//     res.send({
//       status: 500,
//       message: '未知的错误',
//     })
//   })

app.listen(3000,()=>{
    console.log('express server runiing at http://127.0.0.1:3000')
})