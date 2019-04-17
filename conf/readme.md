### 项目工程说明
****

#### 拉取工程
```js
git clone http://192.168.100.17/jiandan/jr_web.git
```

#### 安装包
```js
cd jr_web
npm install
```

#### 启动项目
window
```js
set pro=xx || set pro=xx/yy // 设置项目 如果是多层路径写路径   如set pro=web/credit 表示pages/web/credit 下的项目
npm run serve // 或者 npm run dev
```

linux(export 等同于上面的set 其余不变)
```js
export pro=xx
npm run serve
```

#### 打包
```js
set pro=xx     // 若已经设置可省略（如启动项目时设置）
npm run build  // 打包
npm run upload // 上传
npm run bd     // 打包 + 上传
```

#### 设置修饰符
<font color=#d43f33>【noCssExtra】</font>
```js
set pro=@noCssExtra[ddm]
打包css成一个js文件，不会被code spliting成一个独立的css
优点：减少带宽
缺点：对未使用的样式不能懒加载
```

****
<font color=#d43f33>【dist】</font>
```js
set pro=@dist[ddm]
默认运行打包cli3的运行形式，生成文件dist/css && js && html
根据项目需求决定打包方式
```

****
<font color=#d43f33>【mult】</font>
```js
set pro=@mult xx[a,b,c]
set pro=@mult-active[20180101, 20180102,20180103]
// => active/20180101, active/20180102, active/20180103
打包多页面，要求模式固定，生成对应html  公共js css 等
一般用于活动、多页面项目
ps：最好配合模式cdn减少chunk-vendor大小
```

****
<font color=#d43f33>【cdn】</font>
```js
set pro=@cdn[a,b,c]
独立vue等文件到cdn，减小打包体积
要求html文件中添加cdn文件
```

****
<font color=#d43f33>【base_xxx】</font>
```js
前提：dist模式生效
set pro=@base_loan_xx // => /xx/h5/simpleloan/ 模板模式
set pro=@base_gjj // => /pt/haoxiangdai/ 固定模式
如下：
gjj: '/pt/haoxiangdai/', // 好享贷
hxh: '/pt/haoxianghua/', // 好享花
credit: '/piaoliuxia/h5/credit/' // 信用查查
```
