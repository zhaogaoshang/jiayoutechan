// pages/networkError/networkError.js
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 刷新
  handleReload() {
    wx.getNetworkType({
      success(res) {
        if (res.networkType != 'none') {
          wx.navigateBack({
            delta: 1
          })
        } else {
          utils.showToast("加载失败")
        }
      }
    })
    wx.stopPullDownRefresh()
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
    this.handleReload()
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