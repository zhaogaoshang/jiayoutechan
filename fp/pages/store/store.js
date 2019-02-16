// pages/store/store.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId: '', // 店铺的id
    storeInfo: {}, // 店铺的信息

    productList: {}, // 产品列表
    productParams: { // 参数
      supplier_id: '',
      per_page: 10,
      page: 0
    }
  },

  // 去商品详情
  handleGoProduct(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },

  // 店铺的信息
  getStoreInfo() {
    http.fxGet(api.mobile_apis_supplierinfo, {
      suppid: this.data.storeId
    }, res => {
      console.log(res.data, '店铺信息')
      if (res.code == 2000) {
        wx.setNavigationBarTitle({
          title: res.data.shop_name,
        })

        this.setData({
          storeInfo: res.data
        })
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  // 店铺下的商品
  getStoreProduct() {
    http.fxGet(api.mobile_apis_supplierinfo, this.data.productParams, res => {
      console.log(res.data, '产品信息')
      if (res.code == 2000) {
        this.setData({
          productList: res.data
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
    app.getNetworkStatus() // 检测网络
    console.log(options)
    this.setData({
      storeId: options.id,
      'productParams.supplier_id': options.id,
    })

    this.getStoreInfo() // 获取店铺信息
    this.getStoreProduct() // 获取店铺商品
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