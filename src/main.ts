import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

//路由
import { router } from '@/router/index.ts'
app.use(router)

//状态管理
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
const pinia = createPinia()
//注册持久化插件
pinia.use(createPersistedState({ auto: true }))
app.use(pinia)

//饿了么注册
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//自定义样式
import '@/styles/index.scss'

//最终挂载
app.mount('#app')
