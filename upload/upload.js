/* eslint-disable */
 const path = require('path')
 const chalk = require('chalk')
 const fs = require("fs");
 const needle = require('needle');
 var OSS = require('ali-oss');
 var co = require('co');

 module.exports = {
   init(callback) {
     console.log(chalk.green(
       '获取配置'
     ))
     needle.post('https://kaifa.jianbing.com/business/home/demo/post.php', {}, {
       multipart: false
     }, (err, resp, body) => {
       let res = JSON.parse(body)
       if (res.code == 200) {
         var d = res.data;
         this.host = d.host;
         this.res=res.data
         this.client = new OSS(this.res.config);
         if (callback) callback.call(this,{path:d.static_host})
       } else {
         throw new Error("配置获取失败 验签失败 ")
       }
     });
     return this;
   },
   start(path) {
     this.FilePath = path;
     this.resStatic = this.res.dir
     this.getFile(path);
   },
   getFile(filePath) {
     var self = this
       //根据文件路径读取文件，返回文件列表
     fs.readdir(filePath, function(err, files) {
       if (err) {
         console.warn(err)
       } else {
         files = files.filter(function(filename) { //过滤html文件
           return !filename.match(/\.html/g)
         })
         //遍历读取到的文件列表
         files.forEach(function(filename, index) {
           //获取当前文件的绝对路径
           var filedir = path.join(filePath, filename);
           //根据文件路径获取文件信息，返回一个fs.Stats对象
           fs.stat(filedir, function(eror, stats) {
             if (eror) {
               console.warn('获取文件stats失败');
             } else {

               var isFile = stats.isFile(); //是文件
               var isDir = stats.isDirectory(); //是文件夹
               if (isFile) {
                 self.postFile({
                   filePath: filedir,
                   filename,
                   url: filedir.replace(self.FilePath, "").replace(/\\/g, "\/")
                 }, function(data) {
                   console.log(chalk.green(
                     ' 上传成功=>' + self.res.static_host+data.replace(/^\//,'')
                   ))
                 })
               }
               if (isDir) {
                 self.getFile(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
               }
             }
           })
         });
       }
     });
   },
   postFile(option,  fn) {
     var self = this;
     co(function * () {
       var result = yield self.client.put((self.resStatic + option.url).replace(/\/+/g, '/'), option.filePath);
     }).then(function(){
       fn(option.url)
     }).catch(function(err) {
       console.log(err);
     });
   },
 }
