---
title: gulp使用笔记
long: zh-CN
date: 2018-09-07 15:24:37
prev: /
next: /technical/Express和jwt认证实现RESTful-API.html
---
![gulp](./assets/gulp.png)
身为一名很有上进心得前端er，对于新出得技术是一定要搞一搞得，今天我们搞它。每次看到这个图片总想来一杯可口可乐，也不知道为啥:sweat_smile:

我们先说一下gulp一个大体的流程

1、假设咱们现在有一个比较传统得网页（没有node模块等）需要压缩，那么首先我们要初始化创建一个package.json文件
```shell
npm init
```
2、接着我们来安装一下gulp作为项目得开发依赖
```shell
$ npm install --save-dev gulp
```
3、在项目根目录下创建一个名为 gulpfile.js 的文件
```javascript
var gulp = require('gulp');

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
```
4、运行 gulp
```shell
$ gulp
```
默认的名为 default 的任务（task）将会被运行，在这里，这个任务并未做任何事情。
想要单独执行特定的任务（task），请输入 gulp [task]

gulp最基础的一个流程我们走了一遍，基本还是蛮简单的。现在拥有了一个空的 gulpfile，但是具体gulpfile里有哪些精彩，下面我们结合实例来说一下

我们代码都放在src文件中，我们将src中的文件需要压缩的js及css压缩并将src中所有文件都放到dist中

第一步 需要我们将相关的插件安装一下
```shell
npm install --save-dev gulp-uglify

npm install --save-dev gulp-concat

npm install --save-dev gulp-minify-css

npm install --save-dev gulp-rename

npm install --save-dev gulp-notify

npm install --save-dev del
```
下面编写gulpfile.js文件
```javascript
var gulp = require('gulp'); //gulp基础库
var uglify = require('gulp-uglify');    //js压缩
var concat = require('gulp-concat'),   //合并文件
var minify = require('gulp-minify-css');    //css压缩
var rename = require('gulp-rename');    //文件重命名
var notify = require('gulp-notify');   //提示
var del = require('del'); //删除文件

var task = {
    // 压缩js文件
    minjs: function() {
        var src = ['./src/js/*.js'], dir = 'dist/js';
        return gulp.src(src).pipe(uglify())
            .pipe(gulp.dest('./'+dir))
            .pipe(notify({message:"js task ok"}));    //提示

    }

    // 压缩css文件
    ,mincss: function(){
        var src = ['./src/css/*.css'], dir = 'dist/css';
        return gulp.src(src).pipe(minify())
            .pipe(gulp.dest('./'+dir))
            .pipe(notify({message:"css task ok"}));    //提示

    }

    // 将文件转移到dist文件中
    ,mv: function(){
        var src = ['./src/**'], dir = 'dist';
        return gulp.src(src).pipe(rename({}))
            .pipe(gulp.dest('./'+ dir));
    }

    // 清除生成的dist文件
    ,clear: function(){
        return del(['./dist/*'], cb);
    }
}


gulp.task('minjs', task.minjs);

gulp.task('mincss', task.mincss);

gulp.task('mv', task.mv);

gulp.task('clear', task.clear);

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
```
最后我们只需要按顺序执行一下便完成了代码的构建
```shell
gulp clear
gulp mv
gulp minjs
gulp mincss
```
大功告成，yeah~