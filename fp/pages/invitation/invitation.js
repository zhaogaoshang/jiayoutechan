// pages/invitation/invitation.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {

    },
    list: {}
  },
  // 获取分享
  getMyinvitation() {
    http.fxPost(api.mobile_apis_share_list, this.data.params, res => {
      console.log(res, '绑定人关系')
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