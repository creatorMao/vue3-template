import request from '@/utils/request'
import type { IReqLogin, IResLogin } from '@/types/user'

export function loginApi(data: IReqLogin): Promise<IResLogin> {
  return request({
    url: '/web/api/auth/login',
    method: 'post',
    data
  })
}
