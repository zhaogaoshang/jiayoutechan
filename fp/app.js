//app.js
const http = require('./utils/http.js')
const api = require('./utils/api.js')
const utils = require('./utils/util.js')
App({
  onLaunch: function() {

    // 用户是否登录
    let isLogin = wx.getStorageSync('isLogin') || false
    if (isLogin) {
      this.handleUpGlobalData()
      this.getCartList() // 购物车列表
    } else {
      this.getCode().then(code => {
        this.globalData.code = code
        this.handleUserLogin()
      })
    }

    //获取设备信息
    this.getSystemInfo()
  },

  // 登录
  handleUserLogin() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.isLogin = true
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              } else {
                this.handleUserInfo(res)
              }
            }
          })
        } else {
          // 没有授权
          console.log('没有授权')
          this.globalData.isLogin = false
        }
      }
    })
  },

  // 解析获取用户信息
  handleUserInfo(res) {
    console.log(res, '解析uid')
    let parms = {
      code: this.globalData.code,
      ...res
    }

    return new Promise((success, error) => {
      http.fxPost(api.mobile_apis_login, parms, buf => {
        console.log(buf, '用户信息')
        wx.setStorageSync('userInfo', buf.data)
        wx.setStorageSync('isLogin', true)
        this.handleUpGlobalData() // 更新globalData数据
        this.getCartList() // 购物车列表
        return success()
      })
    })
  },

  // 获取code
  getCode() {
    return new Promise((e, o) => {
      return wx.login({
        success: (res) => {
          return e(res.code)
        }
      })
    })
  },

  // 更新用global户名信息
  handleUpGlobalData() {
    let userInfo = wx.getStorageSync('userInfo') || []
    let isLogin = wx.getStorageSync('isLogin') || false
    this.globalData.isLogin = isLogin
    this.globalData.userInfo = userInfo
    console.log(this.globalData)
  },

  //获取设备信息
  getSystemInfo() {
    wx.getSystemInfo({
      success: (res) => {
        // console.log(res, '设备信息')
        this.globalData.systemInfo = res
      },
    })
  },

  // 检测网络
  getNetworkStatus() {
    wx.getNetworkType({
      success(res) {
        if (res.networkType == 'none') {
          wx.navigateTo({
            url: '../networkError/networkError'
          })
        }
      }
    })
  },

  // 获取购物车数量
  getCartList() {
    return new Promise((resolve, reject) => {
      return http.fxGet(api.mobile_apis_cartList, {}, res => {
        console.log(res, '购物车')
        if (res.code == 2000) {
          return resolve(res.data)
        } else {
          utils.showToast(res.msg)
        }
      })
    })

  },

  // 检测是否过期
  handleTokenCheck() {
    return new Promise((resolve, error) => {
      http.fxPost(api.mobile_apis_getTokenInfo, {}, res => {
        if (res.code == 2000) {
          return resolve()
        } else {
          this.getCode().then(code => {
            this.globalData.code = code
            // 获取用户信息
            wx.getSetting({
              success: res => {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                if (res.authSetting['scope.userInfo']) {
                  wx.getUserInfo({
                    success: res => {
                      this.handleUserInfo(res).then(() => {
                        return resolve()
                      })
                    }
                  })
                }
              }
            })

          })
        }
      })
    })
  },

  // 全局变量
  globalData: {
    code: '', // code
    // 设备信息
    systemInfo: {},
    // 用户是否登录
    isLogin: false,
    //用户信息
    userInfo: null,
    // 目前站点
    locationPick: {
      locationName: '全国',
      locationId: 1
    },
    // 购物车
    shopCart: {}
  }
})