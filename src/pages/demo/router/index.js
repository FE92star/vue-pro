import Vue from 'vue'
import VueRouter from '@/common/js/router-esm.js'
import store from '../store/index.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // 工程的基础路径
  base: '/h5/demo',
  routes: [
    {
      path: '*',
      name: 'notFound',
      component: () => import('../views/notFound.vue'),
      meta: {
        title: '404'
      }
    },
    {
      path: '/page1',
      name: 'page1',
      component: () => import('../views/page1.vue'),
      meta: {
        title: 'page1'
      }
    },
    {
      path: '/page2',
      name: 'page2',
      component: () => import('../views/page2.vue'),
      meta: {
        title: 'page2'
      }
    },
    {
      path: '/page3',
      name: 'page3',
      component: () => import('../views/page3.vue'),
      meta: {
        title: 'page3'
      }
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/demo.vue'),
      meta: {
        title: 'demo'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 全局路由守卫钩子设置router状态
  store.commit('SET_ROUTER', window.directionPage)
  // 必须执行next方法来回调resolve钩子函数
  setTimeout(() => {
    next()
  }, 20)
})
export default router
