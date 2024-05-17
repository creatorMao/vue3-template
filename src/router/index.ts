import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router
