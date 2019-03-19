// pages/productMoreNewHigh/productMoreNewHigh.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
const config = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newProductHot: {}, // 新品热销
    newProductHotParams: {
      act: 'hot',
      area: app.globalData.locationPick.locationId,
      page: 1,
      pagesize: 10
    },
  },

  //商品详情
  handleGoProduct(e) {
    wx.navigateTo({
      url: '../product/product?id=' + e.detail.id
    })
  },

  // 获取新品热销
  getNewProductHot() {
    http.fxGet(api.mobile_apis_mttindex, this.data.newProductHotParams, res => {
      console.log(res.data, '新品热销')
      if (res.code == 2000) {
        if (this.data.newProductHotParams.page > 1) {
          res.data.list = this.data.newProductHot.list(res.data.list)
        }
        this.setData({
          newProductHot: res.data
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
    this.getNewProductHot()
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
    this.setData({
      'newProductHotParams.page': 1
    })
    this.getNewProductHot()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.newProductHot.next) {
      return utils.showToast('没有更多了')
    }
    this.setData({
      'newProductHotParams.page': ++this.data.newProductHotParams.page
    })
    this.getNewProductHot()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(e) {
    if (e.from == 'menu') {
      return app.handleShareApp()
    }

    if (e.from == 'button') {
      let name
      let url
      let id
      this.data.newProductHot.list.forEach((item, index) => {
        if (item.goods_id == e.target.dataset.id) {
          name = item.goods_name
          // url = config.fxUrl(item.goods_thumb)
          url = item.goods_thumb
          id = item.goods_id
        }
      })
      return app.handleShareProduct(name, url, id)
    }
  }
})