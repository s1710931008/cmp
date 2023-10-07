var express = require('express');
var router = express.Router();
//导入 用户的模型
const UserModel = require('../models/UserModel');
const md5 = require('md5');
//注册
router.get('/reg', (req, res) => {
  //响应 HTML 内容
  res.render('auth/reg');
});

//注册用户
router.post('/reg', (req, res) => {
  //做表单验证
  //获取请求体的数据
  UserModel.create({ 
    ...req.body,
    //修改 time 属性的值
    password: md5(req.body.password)
  })
  .then(() => { 
    //成功提醒
    res.render('./account/success', {msg: '注冊成功~~~', url: '/login'});
    console.log('新增成功'); 
    // mongoose.disconnect(); 
  })
  .catch(err => console.log(err));
});



//登入頁面
router.get('/login', (req, res) => {
  //响应 HTML 内容
  res.render('auth/login');
});

//登入操作_驗證帳號
router.post('/login', (req, res) => {
  //獲取用帳號和密碼
  let {username, password} = req.body;
  //查詢數資料庫
  UserModel.findOne({username: username, password: md5(password)})
  .then((data) => {
    if(!data){
      return res.send('帳號或密碼錯誤~~');
    }
        req.session.username = data.username;
        req.session._id = data._id;
        //登入成功響應
        res.render('./account/success', {msg: '登入成功', url: '/account'});
    console.log(data);
  })
  .catch(err => {
    res.send('帳號或密碼錯誤~~');
    console.log(err)
  });
});

//退出登入
router.post('/logout', (req, res) => {
  //銷毀 session
  req.session.destroy(() => {
    res.render('./account/success', {msg: '退出成功', url: '/login'});
  })
});

module.exports = router;
