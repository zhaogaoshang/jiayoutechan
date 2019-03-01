// pages/productMoreTodayHigh/productMoreTodayHigh.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todayHigh: {}, // 今日爆款
    todayHighParams: { // 今日爆款的参数
      act: 'burst',
      area: app.globalData.locationPick.locationId,
      page: 1,
      pagesize: 10
    },
  },

  // 获取竟日爆款
  getTodayHigh() {
    http.fxGet(api.mobile_apis_mttindex, {
      ...this.data.todayHighParams
    }, res => {
      if (res.code == 2000) {
        if (this.data.todayHighParams.page > 1) {
          res.data.list = this.data.todayHigh.concat(res.data.list)
        }
        this.setData({
          todayHigh: res.data
        })
      } else {
        utils.showToast(res.msg)
      }
      wx.stopPullDownRefresh()
    })
  },

  //商品详情
  handleGoProduct(e) {
    wx.navigateTo({
      url: '../product/product?id=' + e.detail.id
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getTodayHigh()
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
    this.setData({
      'todayHighParams.page': 1
    })
    this.getTodayHigh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.todayHigh.next) {
      return utils.showToast(res.msg)
    }
    this.setData({
      'todayHighParams.page': ++this.data.todayHighParams.page
    })
    this.getTodayHigh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})