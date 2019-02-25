// pages/order/order.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShoLove: false, // 爱心贡献 

    orderDetail: {}, // 订单详情
  },

  // 提交订单
  handleSubmitOrder() {
    wx.navigateTo({
      url: '../paymentResult/paymentResult'
    })
  },

  // 修改地址
  handleGoAddress() {
    wx.navigateTo({
      url: '../address/address',
    })
  },

  // 计算
  getSum() {
    http.fxGet(api.mobile_apis_submitOrder, {
      sel_goods: app.globalData.checkoutSku
    }, res => {
      console.log(res, '获取订单')
      if (res.code == 2000) {
        this.setData({
          orderDetail: res.data
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
    app.getNetworkStatus() // 检测网络
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
    this.getSum()
    // this.getExpress()
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