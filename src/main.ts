import { createApp } from 'vue'
import { createPinia } from 'pinia'
import http from './http/'
import '@/styles/index.scss'
import App from './App.vue'
import router from '@/router/index.ts'

const app = createApp(App).use(router).use(createPinia())

app.config.globalProperties.$http = http

// 全局组件注册
import components from '@/components/index'
Object.keys(components).forEach((key) => {
  app.component(key, components[key])
})

app.mount('#app')
