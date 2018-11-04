---
title: Express和jwt认证实现RESTful-API
long: zh-CN
date: 2018-09-07 15:24:37
# prev: /technical/gulp使用笔记.html
# next: /technical/Vue-table-component.html
---
最近打算用nodejs的express实现RESTful API,但是如何保证接口的安全便成了首要解决的问题。当然目前 解决接口安全好像选择并不多，最后比较下用jwt来kill掉此问题。

首先我们需要先进行node安装，这个安装包在官网可以找到这里就不多说了直接上链接，[node中文官网](https://nodejs.org/zh-cn/)
+ 国内环境少不了将npm镜像切换成淘宝的镜像，同步频率目前为 10分钟，还是蛮快的,下面上代码附带官网链接，可以点击去了解一下 [淘宝NPM官网](https://npm.taobao.org/)
```Shell
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```
+ 下面，我们来用Express 应用生成器快速创建一个应用的骨架,我们上面切换了淘宝的镜像所以npm->cnpm
```Shell
$ cnpm install express-generator -g
$ express myapp
```
+ 安装所有依赖项
```Shell
$ cd myapp 
$ cnpm install
```
+ 目前我们的一个最简单的express项目就搭建出来了，下面我们来开始对接jwt，首先我们先安装模块 jsonwebtoken
```Shell
$ cnpm install jsonwebtoken --save
```
+ 安装完成后，在express项目的app.js中引入并编码。下面是app.js
```javascript
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var basic = require('./routes/utils/basic');


var app = express();

// 设置superSecret 全局参数,配置你的jwt密钥
app.set('superSecret', "yourJWTSecretStr");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


// 添加跨域请求支持，这里需要放在app.use('/', indexRouter);之前，不然不起作用
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//jwt token授权部分，这里一定要放在Token验证前面，不然还没授权便走token验证，无法授权了撒~
app.all('/authorize', function(req, res, next) {
  basic.dbHelper('select name,password from wii_user_info where name = ?',[req.body.name || req.query.name],function(err,rows){
    if(err){
      return res.json({
        success: false,
        message: err
      });
    }else{
      if(!rows.length){
        res.json({ success: false, message: '未找到授权用户' });
      }else if(rows[0]){
        var user = rows[0];
        var password = req.body.password || req.query.password || '';
        if(user.password != password){
          res.json({ success: false, message: '用户密码错误' });
        }else{
          // todo: user必须是对象
          var token = jwt.sign(user, app.get('superSecret'), {
            expiresIn : 60*60*24// 授权时效24小时
          });
          res.json({
            success: true,
            message: '请使用您的授权码',
            token: token
          });
        }
      }
    }
  });
});

// 添加Token验证支持
app.all("*", function (req, res, next) {
  // 拿取token 数据 按照自己传递方式写
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    // 解码 token (验证 secret 和检查有效期（exp）)
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.status(403).json({
          success: false,
          message: '无效的token.'
        });
      } else {
        // 如果验证通过，在req中写入解密结果
        req.decoded = decoded;
        //console.log(decoded)  ;
        next(); //继续下一步路由
      }
    });
  } else {
    // 没有拿到token 返回错误 
    return res.status(401).send({
      success: false,
      message: '没有找到token.'
    });

  }
});


app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```
下面把自己的basic.js文件也放上来吧，有一个小坑别别坑着，看代码里的注释，注意认真看哦
```javascript
var mysql = require('mysql');
var pool = mysql.createPool({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'xxxx',
  database : 'xxx_db'
});

var basic = {
    dbHelper:function(sql,params,callback){
        pool.getConnection(function(err,connection){
            connection.query(sql, params, function(err, rows) {
                callback && callback(err,JSON.parse(JSON.stringify(rows))); //去除rows中的RowDataPacket
                connection.release();
            });

        });
    }
}

module.exports = basic
```
到此，便结束了，完美~
