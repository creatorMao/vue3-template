import express from 'express'

const initExpress = (port) => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.all('*', (req, res, next) => {
    // google需要配置，否则报错cors error
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    // 允许的地址,http://127.0.0.1:9000这样的格式
    res.setHeader('Access-Control-Allow-Origin', '*')
    // 允许跨域请求的方法
    res.setHeader(
      'Access-Control-Allow-Methods',
      'POST, GET, OPTIONS, DELETE, PUT'
    )
    // 允许跨域请求header携带哪些东西
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since'
    )
    next()
  })

  app.all('/web/api/auth/login', async function (req, res) {
    res.send({ data: { msg: '', token: '111111' } })
  })

  app.listen(port, () => {
    console.log(`后端服务程序已启动，请访问 http://localhost:${port}/`)
  })
}

initExpress(4000)
