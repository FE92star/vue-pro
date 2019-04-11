import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import '@/common/js/bridge'
import components from './components/index.js'
Vue.use(components)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
