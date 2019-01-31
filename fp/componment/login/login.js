// componment/login/login.js
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
      console.log(e, '用户信息')
    }
  }
})