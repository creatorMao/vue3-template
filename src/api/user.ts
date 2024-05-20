import request from '@/utils/request'

function login(data: any) {
  return request({
    url: '/web/api/auth/login',
    method: 'post',
    data
  })
}

export { login }
