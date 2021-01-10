import { unit } from '@/services'
import store from '../store'
import config from '../config'

const permission = {
  logout() {
    store.dispatch('account/refresh', false)
    store.dispatch('account/logout')
  },

  checkPermission: () => {
    return new Promise((resolve, reject) => {
      /**
       * 入口权限过滤
       * 1、检查cookie合法性
       * 2、检查系统权限合法性
       * 3、更新系统编号、用户基本信息store
       * 4、拉取菜单权限，更新权限store
       */
      const token = store.state.account.token
      const info = store.state.account.userInfo

      let userInfo = {}
      let login_flg = false
      try {
        const privateKey = config.secretKey
        userInfo = unit.desDecrypt(info, privateKey)
        userInfo = JSON.parse(userInfo)
      } catch (e) {
        // ...
      }

      // token不存在
      if (!token) login_flg = true
      // 用户信息不存在
      if (unit.isEmptyObject(userInfo)) login_flg = true
      // 非正常状态用户
      if (userInfo.companyStatus !== 'examine_pass') login_flg = true

      if (login_flg) {
        return reject()
      }
      const storeUname = store.state.account.userInfo.uname || ''
      if (storeUname !== userInfo.uname) {
        store.dispatch('account/userInfo', userInfo)
      }
      resolve()
    })
  }
}

export default permission
