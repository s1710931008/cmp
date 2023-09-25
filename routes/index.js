var express = require('express');
var router = express.Router();

const moment = require('moment');
const AccountModel = require('../models/AccountModel');

//lowdb 導入
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname+'/../data/db.json')
const db = low(adapter)

/* GET home page. */
router.get('/', function(req, res, next) {
  let str = db.get('Component').value();
  console.log(str[0].Mouser_Number)
  res.render('index',{str})
});


// //记账本的列表
// router.get('/account', function(req, res, next) {
//   //获取所有的账单信息
//   let accounts = db.get('accounts').value();
//   //读取集合信息

//   //批量讀取
//   AccountModel.find().sort({time: -1}).then((data) => {
//     // console.log(data); 
//     res.render('./account/list', {accounts: data,moment: moment});
//     // mongoose.disconnect(); 
//   })
// });

// //添加记录
// router.get('/account/create', function(req, res, next) {
//   res.render('./account/create');
// });

// //新增记录
// router.post('/account', (req, res) => {
//   //插入数据库

//   // 新增資料
//   AccountModel.create({ 
//     ...req.body,
//     //修改 time 属性的值
//     time: moment(req.body.time).toDate()
//   })
//   .then(() => { 
//     //成功提醒
//     res.render('./account/success', {msg: '添加成功哦~~~', url: '/account'});
//     console.log('新增成功'); 
//     // mongoose.disconnect(); 
//   });
// });

/* GET home page. */
router.get('/list/:id', function(req, res, next) {
  const id = req.params.id;

  //取得單筆記錄
  let str = db.get('Component').find({Mouser_Number:id}).value();
  
  // let str = db.get('Component').find({format:id}).value();
  // const db.get('accounts').unshift({id:id,url,fields, ...req.body}).write();
  // console.log(str);
  // let jstr = JSON.stringify(str)
  // let kstr = Object.keys(str);
  // let kstr1 = Object.values(str);

  /* 建立用途 */
  //let old = db.get('posts').find({id:1}).value();
  //console.log(old.use)
  //old.use.push({name:'ssc',setting:'C33 C2 C19 C23'});
  // let ssid = db.get('use').filter({sid:4}).value();
  // console.log('sid:',ssid)
  console.log("aaa:", str.id);
  let ssid = db.get('use').filter({sid:str.id}).value();
  console.log('sid:',ssid)

  Object.values(str).forEach(items => {
    // console.log("aaa:", str.id);
    // let ssid = db.get('use').filter({sid:str.id}).value();
    // console.log('sid:',ssid)
   
  });

/*
  console.log("******** 零件規格 ********")
  Object.keys(str).forEach(key => {
    
    if(key!=="Use"){ 
    console.log(key, str[key]);
    }
   
   
    
    if(key==="Use"){
      console.log("******** 零件用途 ********")
      str[key].forEach(itmeVal=>{
        console.log(itmeVal);
    })
    
    console.log("******** E N D ********")
    }

  });
*/

  // console.log(kstr)
  res.render('list', { str});
});

/* 新增 View */
router.get('/create', function(req, res, next) {
  res.render('create')
});

router.post('/save', function(req, res, next) {
  // let str = req.body
  let str = {
    "Mouser_Number": req.body.Mouser_Number,
    "type": req.body.type,
    "format": req.body.format,
    "Voltage": req.body.Voltage,
    "Case_Code_in": req.body.Case_Code_in,
    "Tolerance": req.body.Tolerance,
    "Quantity": Number(req.body.Quantity),
  }
  console.log(req.body.type)
  db.get('Component').unshift(str).write();
  res.send(str)
  // res.render('create')
});

module.exports = router;
