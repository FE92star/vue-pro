/**
type: line => 条形, circle => 环形
**/
import ProgressBar from './src/progressBar.vue'

ProgressBar.install = function(Vue) {
  Vue.component(ProgressBar.name, ProgressBar)
}

export default ProgressBar
