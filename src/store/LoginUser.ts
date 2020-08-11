import { observable, action } from 'mobx'
import { setSessionStorage, clearSessionStorage } from '@/util'
import history from '@/history'
import api from '@/api'
import { homePage } from '@/Layout/SiderBar/Menu/config'

class LoginUser {
  @observable user:any = null

  @action setUser(data:any) {
    this.user = data
  }

  @action loginIn(data:any) {
    this.setUser(data)
    setSessionStorage('loginInfo', data)
    setTimeout(() => history.push(homePage), 200)
  }

  @action loginOut() {
    api.user.loginOut({ Authorization: this.user.userToken }).then(() => {
      this.setUser(null)
      clearSessionStorage('loginInfo')
      history.push('/login')
    })
  }
}

export default LoginUser