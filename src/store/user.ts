import { defineStore } from 'pinia'
import { login } from '@/api/user'

const useUserStore = defineStore('user', {
  state() {
    return {
      token: '',
      userInfo: {},
      permissionList: []
    }
  },
  actions: {
    async login(data: any) {
      const res: any = await login(data)
      const { userInfo, token, permissionList } = res.data
      this.userInfo = userInfo
      this.token = token
      this.permissionList = permissionList
      return res
    }
  }
})

export default useUserStore
