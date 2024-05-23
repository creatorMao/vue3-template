import { defineStore } from 'pinia'
import { loginApi } from '@/api/user'
import type { IReqLogin, IPermission, IUserInfo } from '@/types/user'
import { ref } from 'vue'
import { router, pathMap } from '@/router/index.ts'

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

  function logout(this: any) {
    //清空pinia数据
    this.$reset()

    //清空浏览器数据
    window.localStorage.clear()
    window.sessionStorage.clear()

    router.push(pathMap.loginPath)
  }

  return { token, userInfo, permissionList, login, logout }
})

export default useUserStore
