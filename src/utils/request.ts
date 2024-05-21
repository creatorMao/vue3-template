import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVICE_API,
  timeout: 50000 // 请求超时时间：50s
})

//请求前拦截
request.interceptors.request.use(
  (config) => {
    // config.headers['token'] = localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//请求后拦截
request.interceptors.response.use(
  (response) => {
    const res = response.data
    let { code, msg } = res

    //往往公司中，不会去用http本身的状态码，因为都是返回200
    //一般会用业务状态码response.data.code
    if (code === 200) {
      return res
    } else {
      const errorMsg = msg || '请求异常！'
      ElMessage({
        message: errorMsg,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(errorMsg)
    }
  },
  (error) => {
    //跨域等错误在此

    ElMessage({
      message: '请求异常!',
      type: 'error',
      duration: 3 * 1000
    })

    return Promise.reject(error)
  }
)

export default request
