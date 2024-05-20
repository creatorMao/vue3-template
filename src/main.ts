import { createApp } from 'vue'
import { createPinia } from 'pinia'
import request from '@/utils/request'
import '@/styles/index.scss'
import App from './App.vue'
import router from '@/router/index.ts'

const app = createApp(App).use(router).use(createPinia())

app.config.globalProperties.$request = request

// 注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 全局组件注册
// import components from '@/components/index'
// Object.keys(components).forEach((key) => {
//   app.component(key, components[key])
// })

app.mount('#app')
