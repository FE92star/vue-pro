const mode = {
  'default': {
    desc: '默认项目打包形式-打包后cdn文件上传服务器，以及pages/项目/index.html'
  },
  'dist': {
    desc: '默认运行打包cli3的运行形式，生成文件dist/css && js && html'
  },
  'noCssExtra': {
    desc: '打包css成一个js文件，不会被code spliting成一个独立的css，一般会减少带宽'
  },
  'noPreload': {
    desc: '打包后文件不会添加preload属性，文件不会预加载'
  },
  'mult': {
    desc: '打包多页面，要求模式固定，@mult-xx[a, b, c, d]'
  },
  'cdn': {
    desc: '打包js里面剔除vue文件，需要html里面添加vue cdn文件，优点是减少生成js文件的大小'
  }
}

module.exports = mode
