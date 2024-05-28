import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/user'
const views = import.meta.glob('@/views/**/**.vue')
import type { IRouter } from '@/types/user'

export const pathMap = {
  loginPath: '/login',
  homePath: '/'
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: pathMap.homePath,
      component: () => import('@/views/dashboard/index.vue')
    },
    {
      path: pathMap.loginPath,
      component: () => import('@/views/login/index.vue')
    }
  ]
})

let hasRouter = false

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
      // 已经登录过，不是登录页面，并且添加过路由，则放行
      if (!hasRouter) {
        addRoute(userStore.routerList)
        hasRouter = true
        //这里为什么是...to,https://blog.csdn.net/qq_18196779/article/details/130614411
        next({ ...to, replace: true })
      } else {
        next()
      }
    }
  } else {
    if (to.path === pathMap.loginPath) {
      next() //没登录过，又是登录页面，赶巧了嘛这不是，放行
    } else {
      next({ path: pathMap.loginPath }) //没登录过,全部跳到登录
    }
  }
})

/**
 * 往router里批量添加路由
 * @author zhiwu.mao
 * @param  routeList 路由列表
 */
function addRoute(routeList: IRouter[]) {
  routeList.forEach((item) => {
    if (item.children.length > 0) {
      addRoute(item.children)
    } else {
      router.addRoute('home', {
        name: item.path,
        path: item.path,
        redirect: '',
        component: views[`/src/views${item.component}.vue`],
        children: []
      })
    }
  })
}
