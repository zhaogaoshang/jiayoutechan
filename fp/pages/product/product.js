// pages/product/product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 分类
    category: [{
      name: '商品',
      id: 0
    }, {
      name: '评价',
      id: 1
    }, {
      name: '详情',
      id: 2
    } ],
    categoryActive:0

  },

  // 切换分类
  handleSwitchModule(e) {
    console.log(e)
    this.setData({
      categoryActive: e.currentTarget.dataset.id
    })
  },

  // 去查看全部评论
  handleGoAllComment(e){
    wx.navigateTo({
      url: '../commentAll/commentAll',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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