export interface IRouter {
  title: string
  path: string
  component: string
  children: IRouter[]
  icon: string
}

export interface IUserInfo {
  userName: string
}

export interface IResLogin {
  data: {
    userInfo: IUserInfo
    token: string
    routerList: IRouter[]
  }
  msg: string
  code: number
}

export interface IReqLogin {
  userName: string
  password: string
}
