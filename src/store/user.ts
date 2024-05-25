import { defineStore } from 'pinia'
import { loginApi } from '@/api/user'
import type { IReqLogin, IRouter, IUserInfo } from '@/types/user'
import { ref } from 'vue'
import { router, pathMap } from '@/router/index'

const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userInfo = ref<IUserInfo>({} as IUserInfo)
  const routerList = ref<IRouter[]>([])

  async function login(data: IReqLogin) {
    const res = (await loginApi(data)).data
    token.value = res.token
    userInfo.value = res.userInfo
    routerList.value = res.routerList
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

  return { token, userInfo, routerList, login, logout }
})

export default useUserStore
