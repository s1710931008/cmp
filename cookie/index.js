
const express = require('express')
const cookieParser = require('cookie-parser')  //引入才可以讀取
const app = express()
const port = 3000

app.use(cookieParser()); //放入全局讀取cookie

//設定cookie
app.get('/set', (req, res) => {
//   res.cookie('name','kenny'); //關閉瀏覽器就刪除
  res.cookie('name','tony',{maxAge:60*1000}); //設定生命週期
  res.cookie('theme','blue');
  res.send('Hello World!')
})

//讀取cookie
app.get('/view',(req,res)=>{
    console.log('Cookies: ', req.cookies);
    res.send(`謮取Cookie ${ req.cookies.name }`);
})

//刪除cookie
app.get('/remve',(req,res)=>{
    res.clearCookie('name')
    res.send('刪除成功');
})

app.listen(port, () => {
  console.log(`http://127.0.0.1 ${port}`)
})
