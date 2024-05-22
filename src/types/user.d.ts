export interface IPermission {
  title: string
  path: string
  component: string
  children: IPermission[]
}

export interface IUserInfo {
  userName: string
}

export interface IResLogin {
  data: {
    userInfo: IUserInfo
    token: string
    permissionList: IPermission[]
  }
  msg: string
  code: number
}

export interface IReqLogin {
  userName: string
  password: string
}
