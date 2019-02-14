// componment/login/login.js
const app = getApp() //获取应用实例
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示
    isShow: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取用户信息
    handleGetUserInfo(e) {
      if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
        console.log('拒绝授权')
        return
      }
      app.handleUserLogin()
      this.triggerEvent('handleLogin', {
        userInfo: e.detail
      })
    }
  }
})