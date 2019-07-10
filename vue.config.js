const tools = require('./conf/tools')
const {
  entry,
  tip,
  dist,
  publicPath,
  cdnPath,
  outPutDir
} = require('./conf/entry')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const proENV = process.env.NODE_ENV
const pro = process.env.pro
const POBJ = tools.decorator(pro)

tip()

module.exports = {
  publicPath: publicPath(dist, cdnPath()),
  pages: entry().entry,
  productionSourceMap: false,
  css: {
    extract: !tools.some(POBJ.header, 'noCssExtra')
  },
  chainWebpack: config => {
    // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    if (proENV === 'production') {
      // 生产开发配置
      config.plugins.delete(`prefetch-index`)
    } else {
      // 本地开发配置
    }
  },
  configureWebpack: config => {
    if ((proENV === 'production')) {
      config.plugins.push(new CleanWebpackPlugin({ //2.0版本的该插件只接受对象作为参数
        verbose: true,
        dry: false
      }))
      if (tools.some(POBJ.header, 'cdn')) {
        // 满足需要两个条件 一个是html里面有vue cdn文件  一个是开始 @cdn 修饰符
        config.externals = {
          'vue': 'Vue'
        }
      }
    }
  },
  // 输出文件目录
  outputDir: outPutDir(),
  lintOnSave: false,
  devServer: {
    port: 8080,
    openPage: 'h5/demo/'
  }
}
