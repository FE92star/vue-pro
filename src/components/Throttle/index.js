/**
* 高阶组件的使用方式
**/

import Throttle from './src/index.vue'

Throttle.install = function(Vue) {
  Vue.component(Throttle.name, Throttle)
}

export default Throttle
