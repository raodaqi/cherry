'use strict';
var domain = require('domain');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var todos = require('./routes/todos');
var cloud = require('./cloud');

var AV = require('leanengine');

var app = express();

// 设置 view 引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// 加载云代码方法
app.use(cloud);

// 使用 LeanEngine 中间件
// （如果没有加载云代码方法请使用此方法，否则会导致部署失败，详细请阅读 LeanEngine 文档。）
// app.use(AV.Cloud);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 未处理异常捕获 middleware
app.use(function(req, res, next) {
  var d = null;
  if (process.domain) {
    d = process.domain;
  } else {
    d = domain.create();
  }
  d.add(req);
  d.add(res);
  d.on('error', function(err) {
    console.error('uncaughtException url=%s, msg=%s', req.url, err.stack || err.message || err);
    if(!res.finished) {
      res.statusCode = 500;
      res.setHeader('content-type', 'application/json; charset=UTF-8');
      res.end('uncaughtException');
    }
  });
  d.run(next);
});

// app.get('/', function(req, res) {
//   res.render('index', { currentTime: new Date() });
// });

app.use(AV.Cloud.CookieSession({ secret: 'my secret', maxAge: 3600000, fetchUser: true }));

// 引入讯飞js

// require("cloud/md5.js");

// AV.Cloud.define("tts", function(request, response) {

//  var appid = "54c88b8d";                              //应用APPID，在open.voicecloud.cn上申请即可获得
//  var timestamp = new Date().toLocaleTimeString();                      //当前时间戳，例new Date().toLocaleTimeString()
//     var expires = 60000;                          //签名失效时间，单位:ms，例60000
//  //!!!为避免secretkey泄露，签名函数调用代码建议在服务器上完成
//  var signature = faultylabs.MD5(appid + '&' + timestamp + '&' + expires + '&' + "6a97bfd7fa4531f7");
//  /************************************************************以上签名过程需根据实际应用信息填入**************************************************/
//  response.success(signature);
// });

// var md5 = crypto.createHash('md5');

AV.Cloud.define("tts", function(request, response) {
  // var tts = [{"name":"普通话小燕","vcn":"xiaoyan"},{"name":"普通话小琪","vcn":"xiaoqi"},{"name":"普通话小宇","vcn":"xiaoyu"},{"name":"普通话老马","vcn":"vils"},{"name":"童声楠楠","vcn":"vinn"},{"name":"台普小莉","vcn":"vixl"},{"name":"粤语小美","vcn":"xiaomei"},{"name":"陕西话小英","vcn":"vixying"},{"name":"东北话小芸","vcn":"vixyun"},{"name":"河南话小坤","vcn":"vixk"},{"name":"湖南话小强","vcn":"vixqa"},{"name":"英文mary","vcn":"catherine"},{"name":"英文henry","vcn":"henry"},{"name":"开心","vcn":"happy"},{"name":"难过","vcn":"sad"},{"name":"生气","vcn":"angry"},{"name":"中立","vcn":"neutral"},{"name":"小瑞","vcn":"aisxrui"},{"name":"小辉","vcn":"aisxhui"},{"name":"小淳","vcn":"aisxchun"},{"name":"小英","vcn":"aisjying"},{"name":"小宏","vcn":"xiaohong20 "},{"name":"小叶","vcn":"yefang"},{"name":"小孟","vcn":"aismengchun"},{"name":"小丸子","vcn":"aisxwz"},{"name":"小新","vcn":"vixx"},{"name":"鸭先生","vcn":"aisduck"},{"name":"楠楠","vcn":"aisnn"},{"name":"子琪","vcn":"ziqi"}]
  // response.success(tts);
  var tts = [{"type":"口音","content":[{ "name": "女普", "vcn": "xiaoqi", "img":"../img/people/cherry-head-03.png"}, { "name": "男普", "vcn": "xiaoyu", "img":"../img/people/cherry-head-02.png"}, { "name": "台普", "vcn": "vixl", "img":"../img/people/cherry-head-01.png" }, { "name": "粤语", "vcn": "xiaomei", "img":"../img/people/cherry-head-04.png" }, { "name": "陕西话", "vcn": "vixying", "img":"../img/people/cherry-head-06.png"}, { "name": "四川话", "vcn": "vixr","img":"../img/people/cherry-head-03.png" }, { "name": "东北话", "vcn": "vixyun", "img":"../img/people/cherry-head-08.png"}, { "name": "河南话", "vcn": "vixk","img":"../img/people/cherry-head-07.png" }, { "name": "湖南话", "vcn": "vixqa","img":"../img/people/cherry-head-11.png" },{ "name": "男英", "vcn": "henry", "img":"../img/people/cherry-head-01.png"},{ "name": "女英", "vcn": "aiscatherine", "img":"../img/people/cherry-head-10.png"}]},
  {"type":"人物","content": [ { "name": "小新", "vcn": "vixx","img":"../img/people/cherry-head-12.png" }, { "name": "鸭先生", "vcn": "aisduck","img":"../img/people/cherry-head-05.png" }, { "name": "童声", "vcn": "vinn","img":"../img/people/cherry-head-09.png" }]}];
  // {"type":"情感","content":[{ "name": "开心", "vcn": "happy","img":"http://cherry102.leanapp.cn/img/people/xiaoai_happy.png" }, { "name": "难过", "vcn": "sad","img":"http://cherry102.leanapp.cn/img/people/xiaoai_sad.png" }, { "name": "生气", "vcn": "angry","img":"http://cherry102.leanapp.cn/img/people/xiaoai_angry.png" }, { "name": "中立", "vcn": "nautral","img":"http://cherry102.leanapp.cn/img/people/xiaoai_nautral.png" }]}, { "name": "小辉", "vcn": "aisxhui","img":"http://cherry102.leanapp.cn/img/people/kanghui.png" }, { "name": "小淳", "vcn": "aisxchun","img":"http://cherry102.leanapp.cn/img/people/lizhengchun.png" }, { "name": "小叶", "vcn": "yefang","img":"http://cherry102.leanapp.cn/img/people/yefang.png" }, { "name": "小孟", "vcn": "aismengchun","img":"http://cherry102.leanapp.cn/img/people/mengchun.png" },{ "name": "楠楠", "vcn": "aisnn","img":"http://cherry102.leanapp.cn/img/people/nannan.png" }, { "name": "子琪", "vcn": "ziqi","img":"http://cherry102.leanapp.cn/img/people/dengziqi.png" }

  response.success(tts);

});

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/', function(req, res) {

  AV.Cloud.run('tts', {}).then(function(result) {
    console.log(result);
    res.render('tts', {tts:result});
  }, function(error) {
    // error
    console.log(error);
    res.render('tts', {tts:''});
  });
});

app.get('/down', function(req, res) {
    res.render('down');
});

app.get('/voice/:signature', function(req, res) {
  var signature = req.params.signature;
  var query = new AV.Query("Voice");
  query.equalTo('signature', signature);
  query.first().then(function(results) {
    console.log(results);
    // 处理返回的结果数据
    res.render('voice', {content:results.attributes.content,vcn:results.attributes.vcn});
  }, function(error) {
    console.log('Error: ' + error.code + ' ' + error.message);
  });
});

app.post('/tts', function(req, res) {
  var content = req.body.content;
  var vcn = req.body.vcn;
  var spd = req.body.spd;
  var vol = req.body.vol;
  var timestamp = new Date().getTime();
  // var signature = faultylabs.MD5(timestamp + '&' + content + '&' + content);
  // md5.update(timestamp + '&' + vcn);
  // var signature = md5.digest('hex');
  var signature =timestamp + vcn;
  console.log(signature);

  var voice = AV.Object.new('Voice');
  voice.set('content', content);
  voice.set('vcn', vcn);
  voice.set('spd', spd);
  voice.set('vol', vol);
  voice.set('signature', signature);
  voice.save().then(function(post) {
    // 成功保存之后，执行其他逻辑.
    // console.log('New object created with objectId: ' + post.id);
    res.send("http://cherry102.leanapp.cn/voice/"+signature);
  }, function(err) {
    // 失败之后执行其他逻辑
    // error 是 AV.Error 的实例，包含有错误码和描述信息.
    console.log('Failed to create new object, with error message: ' + err.message);
    res.send("102");
  });
});

app.post('/feedback', function(req, res) {
  var phoneType = req.body.phoneType;
  var feedback = AV.Object.new('Feedback');
  feedback.set('phoneType', phoneType);
  feedback.save().then(function(post) {
    // 成功保存之后，执行其他逻辑.
    // console.log('New object created with objectId: ' + post.id);
    res.send("220");
  }, function(err) {
    // 失败之后执行其他逻辑
    // error 是 AV.Error 的实例，包含有错误码和描述信息.
    console.log('Failed to create new object, with error message: ' + err.message);
    res.send(err);
  });
});

app.get('/hello', function(req, res) {
  res.render('hello', {});
});

app.post('/voiceConfig', function(req, res) {
  // var tts = [{"type":"口音","content":[{ "name": "女普", "vcn": "xiaoqi", "img":"http://cherry102.leanapp.cn/img/people/xiaoqi.png"}, { "name": "男普", "vcn": "xiaoyu", "img":"http://cherry102.leanapp.cn/img/people/xiaoyu.png"}, { "name": "童声", "vcn": "vinn", "img":"http://cherry102.leanapp.cn/img/people/tnns.png" }, { "name": "台普", "vcn": "vixl", "img":"http://cherry102.leanapp.cn/img/people/twpt.png" }, { "name": "粤语", "vcn": "xiaomei", "img":"http://cherry102.leanapp.cn/img/people/xiaomei.png" }, { "name": "陕西话", "vcn": "vixying", "img":"http://cherry102.leanapp.cn/img/people/sxh.png"}, { "name": "四川话", "vcn": "vixr","img":"http://cherry102.leanapp.cn/img/people/sch.png" }, { "name": "东北话", "vcn": "vixyun", "img":"http://cherry102.leanapp.cn/img/people/dbh.png"}, { "name": "河南话", "vcn": "vixk","img":"http://cherry102.leanapp.cn/img/people/hnh.png" }, { "name": "湖南话", "vcn": "vixqa","img":"http://cherry102.leanapp.cn/img/people/hunh.png" }, { "name": "女英", "vcn": "catherine", "img":"http://cherry102.leanapp.cn/img/people/mary.png" }, { "name": "男英", "vcn": "henry", "img":"http://cherry102.leanapp.cn/img/people/henry.png" }]},{"type":"情感","content":[{ "name": "开心", "vcn": "happy","img":"http://cherry102.leanapp.cn/img/people/xiaoai_happy.png" }, { "name": "难过", "vcn": "sad","img":"http://cherry102.leanapp.cn/img/people/xiaoai_sad.png" }, { "name": "生气", "vcn": "angry","img":"http://cherry102.leanapp.cn/img/people/xiaoai_angry.png" }, { "name": "中立", "vcn": "nautral","img":"http://cherry102.leanapp.cn/img/people/xiaoai_nautral.png" }]}, {"type":"人物","content": [{ "name": "小瑞", "vcn": "aisxrui","img":"http://cherry102.leanapp.cn/img/people/liruiying.png" }, { "name": "小辉", "vcn": "aisxhui","img":"http://cherry102.leanapp.cn/img/people/kanghui.png" }, { "name": "小淳", "vcn": "aisxchun","img":"http://cherry102.leanapp.cn/img/people/lizhengchun.png" }, { "name": "小英", "vcn": "aisjying","img":"http://cherry102.leanapp.cn/img/people/zhangyunying.png" }, { "name": "小宏", "vcn": "xiaohong20","img":"http://cherry102.leanapp.cn/img/people/hongshu.png" }, { "name": "小叶", "vcn": "yefang","img":"http://cherry102.leanapp.cn/img/people/yefang.png" }, { "name": "小孟", "vcn": "aismengchun","img":"http://cherry102.leanapp.cn/img/people/mengchun.png" }, { "name": "小丸子", "vcn": "aisxwz","img":"http://cherry102.leanapp.cn/img/people/xiaowanzi.png" }, { "name": "小新", "vcn": "vixx","img":"http://cherry102.leanapp.cn/img/people/xiaoxin.png" }, { "name": "鸭先生", "vcn": "aisduck","img":"http://cherry102.leanapp.cn/img/people/tanglaoya.png" }, { "name": "楠楠", "vcn": "aisnn","img":"http://cherry102.leanapp.cn/img/people/nannan.png" }, { "name": "子琪", "vcn": "ziqi","img":"http://cherry102.leanapp.cn/img/people/dengziqi.png" }]}];
  AV.Cloud.run('tts', {}).then(function(result) {
    console.log(result);
    // res.render('tts', {tts:result});
    res.send(tts);
  }, function(error) {
    // error
    console.log(error);
    // res.render('tts', {tts:''});
    res.send("error");
  });

});

app.get('/test', function(req, res) {
  res.render('test', {});
});

// 可以将一类的路由单独保存在一个文件中
app.use('/todos', todos);

// 如果任何路由都没匹配到，则认为 404
// 生成一个异常让后面的 err handler 捕获
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) { // jshint ignore:line
    var statusCode = err.status || 500;
    if(statusCode === 500) {
      console.error(err.stack || err);
    }
    res.status(statusCode);
    res.render('error', {
      message: err.message || err,
      error: err
    });
  });
}

// 如果是非开发环境，则页面只输出简单的错误信息
app.use(function(err, req, res, next) { // jshint ignore:line
  res.status(err.status || 500);
  res.render('error', {
    message: err.message || err,
    error: {}
  });
});

module.exports = app;
