
import Calendar from '@/components/Calendar/index.js'
// import Card from '@/components/Card/index.js'
import ProgressBar from '@/components/ProgressBar/index.js'
import WaveNumber from '@/components/WaveNumber/index.js'
import PageWrap from '@/components/PageWrap/index.js'

import Dialog from '@/plugins/Dialog/index.js'
import PopBox from '@/plugins/PopBox/index.js'
import Toast from '@/plugins/Toast/index.js'
import Ajax from '@/plugins/Ajax/index.js'
import Nav from '@/plugins/NavRouter/index.js'
import VReg from '@/directives/VReg/index.js'

const components = [
  Calendar,
  ProgressBar,
  WaveNumber,
  PageWrap
]

/**
* 全局注册组件
* @param {*} Vue
**/
const install = function(Vue) {
  if(install.installed) return
  // 组件注册
  components.map(component => Vue.component(component.name, component))
  // 插件注册
  Vue.use(Dialog)
  Vue.use(PopBox)
  Vue.use(Toast)
  Vue.use(Ajax)
  Vue.use(Nav)
  // 指令注册
  VReg(Vue)
}

if(typeof window !== 'undefined' && window.Vue) {
  install(Vue)
}

export default {
  install,
  Calendar,
  ProgressBar,
  WaveNumber,
  PageWrap,
  Dialog,
  PopBox,
  Toast,
  Ajax,
  Nav,
  VReg
}
