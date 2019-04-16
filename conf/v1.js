/* eslint-disable */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
// 修饰符
function decoratorFn(s) {
  if (s.match(/@.*\[.*\]/g)) {
    let a = s.split('[')
    let a0 = a[0]
    let a1 = a[1]
    let b0 = a0.substr(1)
    let b1 = a1.substr(0, a1.length - 1)
    return {
      header: b0,
      body: b1
    }
  } else {
    return {
      header: 'custom',
      body: s
    }
  }
}
// 获取项目名称 默认第一个项目
function pro_name() {
  let p = path.join(__dirname, './src/pages')
  let dirList = fs.readdirSync(p)
  let pro = decoratorFn(process.env.pro).body
  return pro ? pro : dirList[0]
}
// 入口文件
function entryFn() {
  let p = pro_name()
  let t = process.env.NODE_ENV === 'production' ? `正在打包：${p}` : `正在运行：${p}`
  // let os = process.env.OS.match(/window/ig) ? 'set pro=xxx&& npm run serve' : 'export pro=xxx&& npm run serve'
  console.log(chalk.green(`
    \n==============
    \n${t}
    \n修饰符：@${decoratorFn(process.env.pro).header}
    \n==============`));
  return `./src/pages/${p}/main.js`
}
// 模板
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
module.exports = {
  // 基本路径
  baseUrl: decoratorFn(process.env.pro).header !== 'none' ? (process.env.NODE_ENV === 'production' ? 'https://r.51gjj.com/webpublic/' : '/') : '',
  pages: {
    index: {
      // entry for the page
      entry: entryFn(),
      // the source template
      template: `src/pages/${pro_name()}/index.html` ? `src/pages/${pro_name()}/index.html` : `public/index.html`,
      // output as dist/index.html
      // filename: `../pages/${pro_name()}/app.html`
      filename: decoratorFn(process.env.pro).header != 'none' ? (process.env.NODE_ENV === 'production' ? `../pages/${pro_name()}/index.html` : 'index.html') : `../dist/index.html`
    }
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
  },
  productionSourceMap: false,
  // integrity: (()=> {
  //   if (decoratorFn(process.env.pro).header != 'none') {
  //     return process.env.NODE_ENV === 'production' ? true : false
  //   }
  // })(),
  css: {
    extract: (() => {
      if (decoratorFn(process.env.pro).header == 'noCssExtra') {
        return false
      }
    })()
  },
  chainWebpack: config => {
    // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    if (process.env.NODE_ENV === 'production') {
      // 生产开发配置
      // console.log(config.module.rules.store.stylus)
      config.plugins.delete(`prefetch-index`);
      config.plugins.delete(`preload-index`);
    } else {
      // 本地开发配置
    }
  },
  configureWebpack: config => {
    // webpack配置，值位对象时会合并配置，为方法时会改写配置
    // console.log(config.plugins);
    if (decoratorFn(process.env.pro).header !== 'none') {
      if (process.env.NODE_ENV === 'production') {
        // 生产开发配置
        const middle = pro_name()
        console.log(`${middle}/js/[name].[chunkhash:8]`);
        config.output.filename = `${middle}/js/[name].[chunkhash:8].js`
        config.output.chunkFilename = `${middle}/js/[name].[chunkhash:8].js`
        /**css生成路径 */
        config.plugins[4].options.filename = `${middle}/css/[name].[contenthash:8].css`
        config.plugins[4].options.chunkFilename = `${middle}/css/[name].[contenthash:8].css`
        /**html生成路径 */
        // const f = webFile()
        // console.log(config.plugins);
        // config.plugins[8].options.filename = `./pages/${middle}/app.html`
      }
    }
  },
  // 输出文件目录
  outputDir: 'dist',
  // devServer: {
  //     historyApiFallback: true,
  //     contentBase: "./src",
  //     quiet: false, //控制台中不输出打包的信息
  //     noInfo: false,
  //     hot: true, //开启热点
  //     inline: true, //开启页面自动刷新
  //     lazy: false, //不启动懒加载
  //     progress: true, //显示打包的进度
  //     watchOptions: {
  //         aggregateTimeout: 300
  //     },
  //     // port: '8088', //设置端口号
  //     //其实很简单的，只要配置这个参数就可以了
  //     proxy: { // proxy URLs to backend development server
  //     '/*': 'http://dev.51bmsh.com'
  //     }

  // }, 
  lintOnSave: false
}
// module.exports = config_extra