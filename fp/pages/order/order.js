// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: [{
      goods_id: 51,
      goods_thumb: '../../images/201901/thumb_img/51_thumb_G_1548285343731.jpg',
      goods_name: '商品商品商品商品商品品商品商品商品品商品商品商品品商品商品商品品商品商品商品品商品商品商品品商品商品商品品商品商品商品商品商品商品商品商品商品商品商品商品商品',
      shop_price: '100.00',
      is_shipping: 0,
      sales: 26
    }],
    category: [{
      name: '全部',
      // all
    }, {
      name: '待支付',
      // all
    }, {
      name: '代发货',
      // all
    }, {
      name: '待收货',
      // all
    }, {
      name: '待评价',
      // all
    }, {
      name: '退款/退货',
      // all
    }, ]
  },

  // 订单详情
  handleOrderInfo() {
    wx.navigateTo({
      url: '../orderInfo/orderInfo',
    })

  },

  /**
   * 生命周期函数--监听页面加载 'tuiKuan daiPingJia daiShowhuo daiFaHuo daiZhifu all'
   */
  onLoad: function(options) {
    console.log(options)
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