import Vue from 'vue'
import App from './App.vue'
import BaolemetUI from './components/index.js'
Vue.use(BaolemetUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
