import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

//路由
import router from '@/router/index.ts'
app.use(router)

//状态管理
import { createPinia } from 'pinia'
app.use(createPinia())

//全局请求方法
import request from '@/utils/request'
app.config.globalProperties.$request = request

//饿了么注册
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

import { ElMessage, ElMessageBox } from 'element-plus'
app.use(ElMessage)
app.use(ElMessageBox)
app.config.globalProperties.$message = ElMessage

//自定义样式
import '@/styles/index.scss'

//最终挂载
app.mount('#app')
