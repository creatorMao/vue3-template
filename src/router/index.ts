import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/index.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    }
  ]
})

/**
 * 全局前置守卫 https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
 * next();放行
 * 每次访问路由时，都会触发
 */
router.beforeEach(async (to, from, next) => {
  next()
})

export default router
