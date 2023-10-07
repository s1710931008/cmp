// 產生 jwt 字串函數
const jwt = require("jsonwebtoken")

//創建 token
// let token = jwt.sign(用戶,加密字串,配置對象)
let token = jwt.sign({
    username:'kenny',
}, 'atguigu',{
    expiresIn:60 //單位秒
})

console.log(token)


//校驗 token
tokenVal=token
// tokenVal='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imtlbm55IiwiaWF0IjoxNjk2NDg0OTAzLCJleHAiOjE2OTY0ODQ5NjN9.BGRww2yUZIF5yjGhKy3wlH5Ue7V6bf06oAvoWHJAJ6o'
jwt.verify(tokenVal,'atguigu',(err,data)=>{
    if(err){
        console.log('校驗失敗')
        return
    }
   console.log(data)
})