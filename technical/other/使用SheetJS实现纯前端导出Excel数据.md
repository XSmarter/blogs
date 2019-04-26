---
title: 使用SheetJS实现纯前端导出Excel数据
long: zh-CN
date: 2018-09-07 17:41:34
prev: /technical/other/一些常用的javascript代码.html
next: false
---
由于同事后端懒得处理导出Excel，我又打不过他只好自己想办法用纯前端导出Excel咯，在这里友好的问候那个懒惰的同事——垃圾、狗屎、shit、rubbish(关系很好，日常问候)，呼~爽！！！

好言归正传，查了一些资料，最后选择SheetJS好像又叫js-xlsx，不管他叫啥好用就行,贴个官网开始搞搞~ [SheetJS官网](https://sheetjs.com)

+ 首先我们引入这个脚本文件。当然为了测试先这样引用一下，后来肯定要本地化访问的。
```javascript
<script type="text/javascript" src="https://unpkg.com/xlsx@0.14.0/dist/xlsx.full.min.js"></script>
```
+ 然后我们就选择最简单的来咯，太复杂的搞起来麻烦,还不易实现。来直接 撸代码
```javascript
var filename = "file.xlsx"; //文件名称
var data = [[1,2,3],[true, false, null, "sheetjs"],["foo","bar",new Date("2014-02-19T14:30Z"), "0.3"], ["baz", null, "qux"]];  //数据，一定注意需要时二维数组
var ws_name = "Sheet1"; //Excel第一个sheet的名称
var wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(data);
XLSX.utils.book_append_sheet(wb, ws, ws_name);  //将数据添加到工作薄
XLSX.writeFile(wb, filename); //导出Excel
```
是不是很意外，就这几行代码，没搞错吧，就导出了一个Excel？肯定的回答你，木有错！！！

当然我们日常中肿么可能数据这么简单呢，大多少都是json形式返回到前端的，那么下面来说一下怎么将json的对象数组来转化成SheetJS需要的二位数组，贴个代码儿~
```javascript
var data = [{'id':1,'name':'张三','age':18},{'id':2,'name':'李四','age':16},{'id':'3','name':'王天霸','age':20}]; //原始数据
var arr = new Array();  //定义一个二维数组存储SheetJS所需数据
arr[0] = ['编号','姓名','年龄'];  //这里定义一下Excel的头部标题，记住这个顺序，因为后面需要按照这个顺序填充json里的数据
data.forEach(function(val,idx,array){
  // 这里可以先对数据进行改变，得到我们需要的
  val['age'] = val['age']>18?'老年人':'年轻人';

  // 实例二位数组空间
  arr[idx+1] = new Array();
  arr[idx+1][0] = val['id'];
  arr[idx+1][1] = val['name'];
  arr[idx+1][2] = val['age'];

});

console.log(arr); //得到数据咯
```
好了就这样吧，回头抽空再看看SheetJS的其他使用方法，后续更新~


