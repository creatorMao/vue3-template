export interface IReqLogin {
  userName: string
  password: string
}

export interface IPermission {
  path: string
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
