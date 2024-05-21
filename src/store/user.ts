import { defineStore } from 'pinia'
import { loginApi } from '@/api/user'
import type { IReqLogin, IPermission, IUserInfo } from '@/types/user'
import { ref } from 'vue'

const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userInfo = ref<IUserInfo>({} as IUserInfo)
  const permissionList = ref<IPermission[]>([])

  async function login(data: IReqLogin) {
    const res = (await loginApi(data)).data
    token.value = res.token
    userInfo.value = res.userInfo
    permissionList.value = res.permissionList
    return res
  }

  return { token, userInfo, permissionList, login }
})

export default useUserStore
