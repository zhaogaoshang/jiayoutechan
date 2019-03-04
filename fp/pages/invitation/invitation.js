// pages/invitation/invitation.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
const config = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowShareBox: false, // 是否显示分享的图片
    myMarkPhoto: '', // 我的名片
    params: {},
    list: {}
  },

  // 是否显示我的二维码
  handleIsShowShareBox() {
    this.setData({
      isShowShareBox: !this.data.isShowShareBox
    })
  },

  // 获取二维码
  getCard() {
    let parmas = {
      act: 1,
      scene: '123',
      // page: 'pages/index/index',
      appid: config.openId(),
      secret: config.appSecret(),
      logo: app.globalData.userInfo.head_url
    }

    http.fxPost(api.mobile_apis_share_erweima, parmas, res => {
      // console.log(config.fxUrl(res.data))
      this.setData({
        myMarkPhoto: config.fxUrl(res.data)
      })
    })
  },

  // 下载图片
  handleServerPhoto() {
    let that = this
    // 下载网络文件至本地
    wx.downloadFile({
      url: this.data.myMarkPhoto,
      success: function(res) {
        if (res.statusCode == 200) {
          // 保存文件至相册
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function(data) {
              utils.showToast('保存成功')
            },
            fail: function(err) {
              utils.showToast('下载海报失败')

              if (err.errMsg == 'saveImageToPhotosAlbum:fail:auth denied') {
                wx.openSetting({
                  success(settingdata) {
                    utils.showToast(settingdata)
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                      utils.showToast('保存成功')
                    } else {
                      utils.showToast('保存失败')
                    }
                  }
                })
              } else {
                utils.showToast('保存失败')
              }
            }
          })
        }
      }
    })
  },

  // 获取分享
  getMyinvitation() {
    http.fxPost(api.mobile_apis_share_list, this.data.params, res => {
      console.log(res, '绑定人')
      if (res.code == 2000) {
        this.setData({
          list: res.data
        })
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.handleTokenCheck().then(() => {
      this.getMyinvitation() // 获取我的邀请
      this.getCard() // 获取二维码
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})