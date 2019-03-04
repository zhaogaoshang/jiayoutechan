// pages/user/user.js
const app = getApp()
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '', // 用户信息

    pickList: [{
      name: '我的邀请',
      id: 0
    }, {
      name: '我为家乡代言',
      id: 1
    }, {
      name: '我的收藏',
      id: 2
    }, {
      name: '我的优惠券',
      id: 3
    }, {
      name: '我的地址',
      id: 4
    }, {
      name: '我要开店',
      id: 5
    }, ]
  },

  // 点击列表项
  handleGoOther(e) {
    console.log(e.currentTarget.dataset.type)
    let type = e.currentTarget.dataset.type
    switch (type) {
      case 0:
        wx.navigateTo({
          url: '../invitation/invitation',
        })
        break;
      case 1:

        break;
      case 2:
        wx.navigateTo({
          url: '../collcot/collcot',
        })
        break;
      case 3:

        break;
      case 4:
        wx.navigateTo({
          url: '../address/address?fromPage=user',
        })
        break;
      case 5:

        break;
    }
  },

  // 去爱心贡献值页面
  handleGoLoveQuantity() {
    wx.navigateTo({
      url: '../loveQuantity/loveQuantity'
    })
  },

  // 去订单页面
  handleGoOrder(e) {
    'tuiKuan daiPingJia daiShowhuo daiFaHuo daiZhifu all'
    if (e.currentTarget.dataset.type == 'tuiKuan') {
      wx.navigateTo({
        url: '../liaisonStore/liaisonStore',
      })
      return
    }


    wx.navigateTo({
      url: '../order/order?type=' + e.currentTarget.dataset.type
    })
  },

  // 获取用户信息
  getUserInfo() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.getNetworkStatus() // 检测网络
    this.getUserInfo() // 获取用户的信息
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
  onShareAppMessage: function(e) {
    if (e.from == "menu") {
      return app.handleShareApp()
    } 
  }
})