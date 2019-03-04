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

    addressList: { // 地址列表
      count: 1,
      next: true,
      list: []
    },
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

    this.handleSetLocationActive(id)
    if (this.data.fromPage != 'user') {
      wx.navigateBack({
        delta: 1
      })
    }
  },

  // 设置默认地址
  handleSetLocationActive(aid) {
    http.fxGet(api.mobile_apis_defaultaddress, {
      aid
    }, res => {
      console.log('设置默认地址')
    })
  },

  // 去地址编辑
  handleGoAddressChang(e) {
    let type = e.currentTarget.dataset.type
    let id = e.currentTarget.dataset.id || ''
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../addressChang/addressChang?type=' + type + '&id=' + id,
    })
  },

  // 获取地址列表
  getAddress() {
    http.fxGet(api.mobile_apis_myaddress, this.data.params, res => {
      console.log(res, '地址列表')
      if (res.code == 2000) {
        if (this.data.params.page > 1) {
          res.data.list = this.data.addressList.list.concat(res.data.list)
        }

        this.setData({
          addressList: res.data
        })
      } else {
        utils.showToast(res.msg)
      }
      wx.stopPullDownRefresh()
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
    this.setData({
      'params.page': 1
    })
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
    this.setData({
      'params.page': 1
    })
    this.getAddress()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.addressList.next) {
      return
    }
    this.setData({
      'params.page': ++this.data.params.page
    })
    this.getAddress()
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