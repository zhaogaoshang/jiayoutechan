// pages/address/address.js
const app = getApp()
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromPage: 'user',

    addressList: {}, // 地址列表
    params: {
      page: 1,
      pagesize: 10,
    }
  },

  // 选择
  handleActive(e) {
    let id = e.currentTarget.dataset.id
    let list = this.data.addressList.list
    list.forEach((item, idx) => {
      if (item.address_id == id) {
        item.isdefault = 1
      } else {
        item.isdefault = 0
      }
    })

    this.setData({
      'addressList.list': list
    })
  },

  // 去地址编辑
  handleGoAddressChang(e) {
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '../addressChang/addressChang?type=' + type,
    })
  },

  // 获取地址列表
  getAddress() {
    http.fxGet(api.mobile_apis_myaddress, this.data.params, res => {
      console.log(res, '地址列表')
      if (res.code == 2000) {
        this.setData({
          addressList: res.data
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
    console.log(options)
    app.getNetworkStatus() // 检测网络

    this.setData({
      fromPage: options.fromPage // 来源
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
    this.getAddress()
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