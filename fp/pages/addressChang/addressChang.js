// pages/addressChang/addressChang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '', // edit 为地址修改  add 为地址添加
    isShowLocationTemplate: true, // 地址选择
  },

  // 是否为默认地址
  handleSwitchChange(e) {
    console.log(e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.getNetworkStatus() // 检测网络
    
    let title = ''
    if (options.type == 'edit') {
      title = '修改地址'
    }
    if (options.type == 'add') {
      title = '添加地址'
    }
    wx.setNavigationBarTitle({
      title
    })
    this.setData({
      type: options.type
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