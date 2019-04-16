const proENV = process.env.NODE_ENV
const path = require('path')
/**
 * 单页面入口
 * @param {*} p 项目pages里的相对路劲 如p=ddm => pages/ddm
 * @param {*} dist 项目是否打包到dist
 * @returns
 */
function singleEntry (p, dist) {
  let obj = {
    index: {
      entry: `./src/pages/${p}/main.js`,
      template: `./src/pages/${p}/index.html`,
      filename: outPut(dist, p)
    }
  }
  return obj
}

/**
 * 多页面入口
 * @param {*} pre 多页面项目的外层
 * @param {*} entrys 多页面项目的里层 如pre=act entrys=[a, b] => act/a, act/b
 * @param {*} dist 项目是否打包到dist
 * @returns
 */
function multEntry (pre, entrys, dist) {
  let len = entrys.length
  let obj = {}
  let pathName = './src/pages'
  for (let i = 0; i < len; i++) {
    let spliceURI = `${pre}/${entrys[i]}`
    obj[entrys[i]] = {
      entry: `${pathName}/${spliceURI}/main.js`,
      template: `${pathName}/${spliceURI}/index.html`,
      filename: outPut(dist, spliceURI, entrys[i])
    }
  }
  return obj
}

/**
 * 打包输出
 * 用于pages entry 的filename拼接
 * @param {boolean} [dist=false] 项目是否打包到dist
 * @param {*} p 项目路径
 * @param {string} [t='index'] 打包/运行后的filename
 * @returns
 */
function outPut (dist = false, p, t = 'index') {
  if (dist) {
    return `../dist/${t}.html`
  }
  if (proENV === 'production') {
    // dist=false, index.html 打包到绝对路径的pages文件夹下
    let productionPath = path.join(__dirname, '../pages')
    let page = `${productionPath}/${p}/index.html`
    return page
  } else {
    return `${t}.html`
  }
}

module.exports = {
  single: singleEntry,
  mult: multEntry,
  outPut: outPut
}
