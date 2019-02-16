// pages/productCategory/productCategory.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    count: 0,
    next: true
  },

  // 获取一级分类
  getCategory() {
    http.fxGet(api.mobile_apis_category, {}, res => {
      console.log(res.data, '分类列表')
      if (res.code == 2000) {
        this.setData({
          list: res.data.list,
          count: res.data.count,
          next: res.data.next
        })
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  // 去分类的页面
  handleGoSearchResult(e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    wx.redirectTo({
      url: '../searchResult/searchResult',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.getNetworkStatus() // 检测网络
    this.getCategory()
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