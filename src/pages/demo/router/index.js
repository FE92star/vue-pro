import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/51lc/myapp',
  routes: [
    {
      path: '*',
      name: 'notFound',
      component: () => import('../views/404.vue'),
      meta: {
        title: '404'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 必须执行next方法resolve钩子函数
  setTimeout(() => {
    next()
  }, 20)
})
