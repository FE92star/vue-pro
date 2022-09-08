# vue-pro8

## 本项目将yarn作为包管理工具

### 本项目主要包含vue-cli3.5.0的基础编译和打包上传配置,可以作为多项目配置的模板;
### 其中根目录下的pages文件夹是每个项目打包之后的html文件,可直接放到服务器上面进行访问;
### 项目集成vuex,vue-router相关应用,包含更改的vue-router路由源文件;

##### /src/pages/demo   项目1 set pro=demo&npm run serve/build
##### /src/pages/demo1  项目2 set pro=demo1&npm run serve/build
##### 优化打包方式——set pro=@noCssExtra[项目名称：demo/demo1]——npm run bd
