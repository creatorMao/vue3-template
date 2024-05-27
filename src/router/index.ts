import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/user'

export const pathMap = {
  loginPath: '/login',
  homePath: '/'
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: pathMap.homePath,
      component: () => import('@/views/dashboard/index.vue')
    },
    {
      path: pathMap.loginPath,
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
  const userStore = useUserStore()

  if (userStore.token) {
    if (to.path === pathMap.loginPath) {
      //非登录页面，去访问登录页面，做个友好提示
      if (from.path != pathMap.loginPath) {
        ElMessage({
          message:
            '您已登录，无需再次登录！若需使用另外账户登录，清先退出当前用户！',
          type: 'success',
          duration: 3 * 1000
        })
      }

      next({ path: pathMap.homePath }) //已经登录过,目标又是登录页面的话，直接跳到首页
    } else {
      next() // 已经登录过，不是登录页面，放行
    }
  } else {
    if (to.path === pathMap.loginPath) {
      next() //没登录过，又是登录页面，赶巧了嘛这不是，放行
    } else {
      next({ path: pathMap.loginPath }) //没登录过,全部跳到登录
    }
  }
})
