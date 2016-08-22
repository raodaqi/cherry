var AV = require('leanengine');

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function(request, response) {
  response.success('Hello world!');
});

AV.Cloud.define("tts", function(request, response) {
  // var tts = [{"name":"普通话小燕","vcn":"xiaoyan"},{"name":"普通话小琪","vcn":"xiaoqi"},{"name":"普通话小宇","vcn":"xiaoyu"},{"name":"普通话老马","vcn":"vils"},{"name":"童声楠楠","vcn":"vinn"},{"name":"台普小莉","vcn":"vixl"},{"name":"粤语小美","vcn":"xiaomei"},{"name":"陕西话小英","vcn":"vixying"},{"name":"东北话小芸","vcn":"vixyun"},{"name":"河南话小坤","vcn":"vixk"},{"name":"湖南话小强","vcn":"vixqa"},{"name":"英文mary","vcn":"catherine"},{"name":"英文henry","vcn":"henry"},{"name":"开心","vcn":"happy"},{"name":"难过","vcn":"sad"},{"name":"生气","vcn":"angry"},{"name":"中立","vcn":"neutral"},{"name":"小瑞","vcn":"aisxrui"},{"name":"小辉","vcn":"aisxhui"},{"name":"小淳","vcn":"aisxchun"},{"name":"小英","vcn":"aisjying"},{"name":"小宏","vcn":"xiaohong20 "},{"name":"小叶","vcn":"yefang"},{"name":"小孟","vcn":"aismengchun"},{"name":"小丸子","vcn":"aisxwz"},{"name":"小新","vcn":"vixx"},{"name":"鸭先生","vcn":"aisduck"},{"name":"楠楠","vcn":"aisnn"},{"name":"子琪","vcn":"ziqi"}]
  // response.success(tts);
  var tts = [{"type":"口音","content":[{ "name": "女普", "vcn": "xiaoqi", "img":"http://cherry102.leanapp.cn/img/people/xiaoqi.png"}, { "name": "男普", "vcn": "xiaoyu", "img":"http://cherry102.leanapp.cn/img/people/xiaoyu.png"}, { "name": "童声", "vcn": "vinn", "img":"http://cherry102.leanapp.cn/img/people/tnns.png" }, { "name": "台普", "vcn": "vixl", "img":"http://cherry102.leanapp.cn/img/people/twpt.png" }, { "name": "粤语", "vcn": "xiaomei", "img":"http://cherry102.leanapp.cn/img/people/xiaomei.png" }, { "name": "陕西话", "vcn": "vixying", "img":"http://cherry102.leanapp.cn/img/people/sxh.png"}, { "name": "四川话", "vcn": "vixr","img":"http://cherry102.leanapp.cn/img/people/sch.png" }, { "name": "东北话", "vcn": "vixyun", "img":"http://cherry102.leanapp.cn/img/people/dbh.png"}, { "name": "河南话", "vcn": "vixk","img":"http://cherry102.leanapp.cn/img/people/hnh.png" }, { "name": "湖南话", "vcn": "vixqa","img":"http://cherry102.leanapp.cn/img/people/hunh.png" }]},{"type":"情感","content":[{ "name": "开心", "vcn": "happy","img":"http://cherry102.leanapp.cn/img/people/xiaoai_happy.png" }, { "name": "难过", "vcn": "sad","img":"http://cherry102.leanapp.cn/img/people/xiaoai_sad.png" }, { "name": "生气", "vcn": "angry","img":"http://cherry102.leanapp.cn/img/people/xiaoai_angry.png" }, { "name": "中立", "vcn": "nautral","img":"http://cherry102.leanapp.cn/img/people/xiaoai_nautral.png" }]}, {"type":"人物","content": [{ "name": "小辉", "vcn": "aisxhui","img":"http://cherry102.leanapp.cn/img/people/kanghui.png" }, { "name": "小淳", "vcn": "aisxchun","img":"http://cherry102.leanapp.cn/img/people/lizhengchun.png" }, { "name": "小叶", "vcn": "yefang","img":"http://cherry102.leanapp.cn/img/people/yefang.png" }, { "name": "小孟", "vcn": "aismengchun","img":"http://cherry102.leanapp.cn/img/people/mengchun.png" }, { "name": "小新", "vcn": "vixx","img":"http://cherry102.leanapp.cn/img/people/xiaoxin.png" }, { "name": "鸭先生", "vcn": "aisduck","img":"http://cherry102.leanapp.cn/img/people/tanglaoya.png" }, { "name": "楠楠", "vcn": "aisnn","img":"http://cherry102.leanapp.cn/img/people/nannan.png" }, { "name": "子琪", "vcn": "ziqi","img":"http://cherry102.leanapp.cn/img/people/dengziqi.png" }]}];
  response.success(tts);

});

module.exports = AV.Cloud;
