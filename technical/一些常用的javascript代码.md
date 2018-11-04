---
title: 一些常用的javascript代码
long: zh-CN
date: 2018-08-30 14:52:28
# prev: /technical/Vue-table-component.html
# next: /technical/使用SheetJS实现纯前端导出Excel数据.html
---
整理一下常用的javascript代码，记录自己成长的脚步。  
+ 关于jquery的ajax封装，方便项目统一调用，出现问题快速定位，减少代码量
```javascript
/**
  * eg.
  * basic.json('/url/test/',{name:'张三'},function(res){
  * 	if(res.status === 0){
  * 		//处理ajax成功后逻辑
  * 	}
  * });
  */
function json(url, data, success, options) {
    var that = this;
    options = options || {};
    data = data || {};
    return $.ajax({
        type: options.type || 'post',
        dataType: options.dataType || 'json',
        data: data,
        url: url,
        success: function (res) {
            if (res.status === 0) {
                success && success(res);
            } else {
                alert(res.msg || res.code);
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status != 0) {
                basic.closeLoadingDialog();
                
                if(jqXHR.status == 518){
                    console.log("系统未获取到平台用户信息，请重新登录软件！");
                }else{
                    console.log("链接：" + this.url + "-状态码:" + jqXHR.status + "-时间:" + new Date());
                }
            }
            options.error || alert('请求异常，请重试');
        }
    });
}
```
+ 生成UUID
```javascript
/**
  *
  * 获取请求的UUID，指定长度和进制,如
  * getUUID(8, 2)   //"01001010" 8 character (base=2)
  * getUUID(8, 10) // "47473046" 8 character ID (base=10)
  * getUUID(8, 16) // "098F4D35"。 8 character ID (base=16)
  *
  */
function getUUID(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}
```
+ 对象转为数组
```javascript
function toArray(obj) {
    var array = $.map(obj, function (value, index) {
        return [value];
    });
    return array;
}
```
+ 防 xss 攻击
```javascript
function escape(html) {
    return String(html || '').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/'/g, '&#39;').replace(/"/g, '&quot;');
}
```
+ 转化为日期格式字符
```javascript
function toDateString(time, format) {
    var that = this
    ,date = new Date(time || new Date())
    ,ymd = [
        that.digit(date.getFullYear(), 4)
        ,that.digit(date.getMonth() + 1)
        ,that.digit(date.getDate())
    ]
    ,hms = [
        that.digit(date.getHours())
        ,that.digit(date.getMinutes())
        ,that.digit(date.getSeconds())
    ];

    format = format || 'yyyy-MM-dd HH:mm:ss';

    return format.replace(/yyyy/g, ymd[0])
    .replace(/MM/g, ymd[1])
    .replace(/dd/g, ymd[2])
    .replace(/HH/g, hms[0])
    .replace(/mm/g, hms[1])
    .replace(/ss/g, hms[2]);
}
```
+ 数字前置补零
```javascript
function digit(num, length) {
    var str = '';
    num = String(num);
    length = length || 2;
    for(var i = num.length; i < length; i++){
        str += '0';
    }
    return num < Math.pow(10, length) ? str + (num|0) : num;
}
```
+ 某个时间在当前时间的多久前
```javascript
function timeAgo(time,onlyDate) {
    var that = this
    ,arr = [[], []]
    ,stamp = new Date().getTime() - new Date(time).getTime();
    
    //返回具体日期
    if(stamp > 1000*60*60*24*8){
        stamp =  new Date(time);
        arr[0][0] = that.digit(stamp.getFullYear(), 4);
        arr[0][1] = that.digit(stamp.getMonth() + 1);
        arr[0][2] = that.digit(stamp.getDate());
    
        //是否输出时间
        if(!onlyDate){
            arr[1][0] = that.digit(stamp.getHours());
            arr[1][1] = that.digit(stamp.getMinutes());
            arr[1][2] = that.digit(stamp.getSeconds());
        }
        return arr[0].join('-') + ' ' + arr[1].join(':');
    }
    
    //30天以内，返回“多久前”
    if(stamp >= 1000*60*60*24){
        return ((stamp/1000/60/60/24)|0) + '天前';
    } else if(stamp >= 1000*60*60){
        return ((stamp/1000/60/60)|0) + '小时前';
    } else if(stamp >= 1000*60*2){ //2分钟以内为：刚刚
        return ((stamp/1000/60)|0) + '分钟前';
    } else if(stamp < 0){
        return '未来';
    } else {
        return '刚刚';
    }
}
```
+ 倒计时
```javascript
function countdown(endTime, serverTime, callback) {
    var that = this
    ,type = typeof serverTime === 'function'
    ,end = new Date(endTime).getTime()
    ,now = new Date((!serverTime || type) ? new Date().getTime() : serverTime).getTime()
    ,count = end - now
    ,time = [
        Math.floor(count/(1000*60*60*24)) //天
        ,Math.floor(count/(1000*60*60)) % 24 //时
        ,Math.floor(count/(1000*60)) % 60 //分
        ,Math.floor(count/1000) % 60 //秒
    ];
    
    if(type) callback = serverTime;
    
    var timer = setTimeout(function(){
        that.countdown(endTime, now + 1000, callback);
    }, 1000);
    
    callback && callback(count > 0 ? time : [0,0,0,0], serverTime, timer);
    
    if(count <= 0) clearTimeout(timer);
    return timer;
    
}
```
后续慢慢补充添加~

