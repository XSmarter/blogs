---
title: Vue table component
long: zh-CN
date: 2018-08-30 13:00:41
prev: /technical/other/Express和jwt认证实现RESTful-API.html
next: /technical/other/一些常用的javascript代码.html
---
公司目前很多业务都用到了table，闲来无事决定用Vue写一个基础的table组件，方便后续业务使用。

首先编写Vue组件，名字为vue-talbe:
``` javascript
Vue.component('vue-table', {
    props:{
        data: Array,
        columns: Array
    },
    template:`
        <table class="layui-table">
            <thead>
                <tr>
                    <th v-for="key in columns">
                        {{ key.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="entry in data">
                    <td v-for="key in columns">
                        {{entry[key.field]}}
                    </td>
                </tr>
            </tbody>
        </table>
    `
});
```
接下来我们来实例一个Vue，代码如下：
``` javascript
var vm = new Vue({
        el: '#app',
        data: {
            cols: [
                { field:'payTime', title:'日期' },
                { field:'orderSource', title:'平台' },
                { field:'shopName', title:'店铺' },
                { field:'tid', title:'订单号' },
                { field:'title', title:'商品标题' },
                { field:'remark', title:'订单备注' },
            ],
            gridData: [
                { payTime:'2017-05-06 12:00:33', orderSource:'淘宝', shopName:'孟河草帽', tid:'102465789246122', title:'手工编织草帽', remark:'备注123'},
                { payTime:'2017-05-06 12:00:33', orderSource:'淘宝', shopName:'孟河草帽', tid:'102465789246122', title:'手工编织草帽', remark:'备注123'},
            ]
        },
        created: function () {
            //这里可以调用接口异步给gridData赋值
        }
});
```
最后就是html部分：
``` html
<div id="app">
    <vue-table :data="gridData" :columns="cols"></vue-table>
</div>
```
这样就完成了最简单的一个Vue表格组件，后续跟随业务的不同做相应的扩展就可以了~

