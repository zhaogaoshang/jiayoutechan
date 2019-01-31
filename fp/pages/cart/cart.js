// pages/cart/cart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touchStartLocatione: 0,
    touchEndLocatione: 0,

    productList: [{
      id: 0,
      status: 0 // 滑动状态：0为没有变动过 2滑动初始值 1为已经滑动
    }, {
      id: 1,
      status: 0 // 滑动状态：0为没有变动过 2滑动初始值 2为已经滑动
    }]
  },

  // 数量加减
  handleExportsCount(e) {
    console.log(e.detail)
  },

  // 手指点击
  handleTouchstart(e) {
    // console.log(e)
    // console.log(e.changedTouches[0].clientX, '手指触碰')
    this.setData({
      touchStartLocatione: e.changedTouches.length > 0 ? e.changedTouches[0].clientX : ''
    })
  },

  // 手指离开
  handleTouchend(e) {
    // console.log(e, '手指离开')
    let locationEnd = e.changedTouches[0].clientX // 结束的位置
    let changeIndex = e.currentTarget.dataset.sunIndex // 需要改变的索引
    let isChange = this._handleCalculatingDistance(this.data.touchStartLocatione, locationEnd) // 是否需要发生动画

    if (isChange == 1) {
      this.setData({
        ['productList[' + changeIndex + '].status']: 2
      })
    }
    if (isChange == 2) {
      this.setData({
        ['productList[' + changeIndex + '].status']: 1
      })
    }

  },

  // 计算滑动距离是否应该做动画
  _handleCalculatingDistance(start, end) {
    let systemInfoWidth = app.globalData.systemInfo.screenWidth / 5
    let calculatingDistance = Math.abs(start - end) // 滑动的距离

    if ((start - end) <= 0 && calculatingDistance >= systemInfoWidth) {
      return 1
    }

    if ((start - end) > 0 && calculatingDistance >= systemInfoWidth) {
      return 2
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.systemInfo.screenWidth, '设备的宽度')
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