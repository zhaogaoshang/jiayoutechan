// pages/orderInfo/orderInfo.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
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

    id: '', // 订单id
  },

  // 去物流页面
  handleGoLogistics() {
    wx.navigateTo({
      url: '../logistics/logistics'
    })
  },

  // 获取订单信息
  getOrderInfo() {
    http.fxPost(api.mobile_apis_order_info, {
      order_id: this.data.id
    }, res => {
      console.log(res, '订单信息')
      if(res.code==2000){
        this.setData({
          orderDetail:res.data
        })
      }else{

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.getNetworkStatus() // 检测网络
    this.setData({
      id: options.id
    })

    app.handleTokenCheck().then(() => {
      this.getOrderInfo() // 订单信息
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
  onShareAppMessage: function(e) {
    if (e.from == "menu") {
      return app.handleShareApp()
    } 
  }
})