import {observable, action} from 'mobx'
import {isAuthenticated,authenticateSuccess,logout} from '../utils/Session'

class AppStore {
  @observable isLogin = !!isAuthenticated()  
  @observable users = []  
  @observable loginUser = {}  

  @action toggleLogin(flag,info = {}) {
    this.loginUser = info
    if (flag) {
      authenticateSuccess(info)
      this.isLogin = true
    } else {
      logout()
      this.isLogin = false
    }
  }
}

export default new AppStore()