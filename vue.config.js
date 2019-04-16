/* eslint-disable */
// cli内置node服务模块
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
// 打包修饰符
function decoratorFn(s) {
  if(s.match(/@.*\[.*\]/g)) {
    let a = s.split('[')
    let a0 = a[0]
    let a1 = a[1]
    let b0 = a0.substr(1)
    let b1 = a1.substr(0, a1.length - 1)
    return {
      header: b0,
      body: b1
    }
  }else {
    return {
      header: 'custom',
      body: s
    }
  }
}
// 获取项目名称
function pro_name() {
  let p = path.join(__dirname, './src/pages')
  let dirList = fs.readdirSync(p)
  let pro = decoratorFn(process.env.pro).body
  return pro ? pro : dirList[0]
}
// 入口文件
function entryFn() {
  let p = pro_name()
  let t = process.env.NODE_ENV === 'production' ? `正在打包：${p}`: `正在运行：${p}`
  // let os = process.env.OS.match(/window/ig) ? 'set pro=xxx&& npm run serve' : 'export pro=xxx&& npm run serve'
  console.log(chalk.green(`
    \n==============
    \n${t}
    \n修饰符：@${decoratorFn(process.env.pro).header}
    \n==============`
  ));
  return `./src/pages/${p}/main.js`
}
// 项目模板
function templateHtml() {
  let tpl = 'public/index.html'
  let pro = pro_name()
  let p = path.join(__dirname, `./src/pages/${pro}/index.html`)
  let promis = new Promise(function (resolve, reject) {
    return fs.exists(p, function (e) {
      tpl = e ? `src/pages/${pro}/index.html` : 'public/index.html'
      if (!e) {
        console.log('\n==========================================\n');
        console.dir(`不存在${pro}.html模板，默认使用index.html`);
        console.log('\n==========================================')
      }
      resolve(tpl)
    })
  })
  return promis
}
(async () => {
  let t = templateHtml()
})()

const domain = {
  kaifa: 'dev-nginx',
  test: 'uat-nginx',
  b: 'b'
}[process.env.domain || 'kaifa'];
const domain2 = {
  kaifa: 'kaifa',
  test: 'test',
  b: 'b'
}[process.env.domain || 'kaifa'];

module.exports = {
  publicPath: decoratorFn(process.env.pro).header !== 'none' ? (process.env.NODE_ENV === 'production' ? 'https://r.51gjj.com/webpublic/' : '/') : '',
  pages: {
    index: {
      entry: entryFn(),
      template: `src/pages/${pro_name()}/index.html` ? `src/pages/${pro_name()}/index.html` : `public/index.html`,
      // 默认的生成文件夹是根目录下的dist文件夹
      filename: decoratorFn(process.env.pro).header !== 'none' ? (process.env.NODE_ENV === 'production' ? `../pages/${pro_name()}/index.html` : 'index.html') : '../dist/index.html'
    }
  },
  productionSourceMap: false, //生产环境下的source map
  lintOnSave: false, //编译eslint警告
  outputDir: 'dist', //文件构建目录
  // webpack打包配置
  configureWebpack: (config) => {
    const pro = pro_name()
    if(decoratorFn(process.env.pro).header !== 'none') {
      if(process.env.NODE_ENV === 'production') {
        // js生成路径
        config.output.filename = `${pro}/js/[name].[chunkhash:8].js`
        config.output.chunkFilename = `${pro}/js/[name].[chunkhash:8].js`
        // css生成路径
        config.plugins[4].options.filename = `${pro}/css/[name].[chunkhash:8].css`
        config.plugins[4].options.chunkFilename = `${pro}/css/[name].[chunkhash:8].css`
      }
    }
  },
  // 将对应的css全部打包成js
  css: {
    extract: (() => {
      if (decoratorFn(process.env.pro).header == 'noCssExtra') {
        return false
      }
    })()
  },
  // 移除prefetch插件,减少带宽压力
  chainWebpack: config => {
    if(process.env.NODE_ENV === 'production') {
      config.plugins.delete('prefetch')
    }
  },
  devServer: {
    port: 8080,
    host: '127.0.0.1',
    overlay: {
      warnings: false,
      errors: false
    },
    https: false,
    proxy: { //配置代理
      '/51app/': {
        changeOrigin: true,
        target: `https://${domain}.jianbing.com`,
        // target: `https://uat-nginx.jianbing.com`,
      },
      '/app/': {
        changeOrigin: true,
        target: `https://${domain2}.jianbing.com`,
      },
    }
  }
}
