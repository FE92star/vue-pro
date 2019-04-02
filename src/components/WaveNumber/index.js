/**
数字动画
**/
import WaveNumber from './src/waveNumber.vue'

WaveNumber.install = function(Vue) {
  Vue.component(WaveNumber.name, WaveNumber)
}

export default WaveNumber
