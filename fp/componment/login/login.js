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
    },

    //防止点击穿透
    isShowPrevent: {
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
        this.setData({
          isShowPrevent: false
        })
        return
      }

      app.getCode().then(code => {
        app.globalData.code = code
        app.handleUserLogin(true)
      })

      this.setData({
        isShow: false,
        isShowPrevent: false
      })

      app.globalData.isAuthorizationPlatform = false // 是否授权过平台
      this.triggerEvent('handleLogin', {
        userInfo: e.detail
      })
    },

    // 遮罩层
    handleShowNotClick() {
      this.setData({
        isShowPrevent: true
      })
    },

    // 防止点击穿透
    handlePrevent() {
      console.log('以阻止再次点击')
      return false
    }
  }
})