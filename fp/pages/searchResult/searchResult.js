// pages/searchResult/searchResult.js
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
    isNext: true,
    list: [],
    count: 0,
    params: {
      page: 1, //可选	int	1	当前页码
      per_page: 10, //可选	int	10	每页数量
      keywords: '', //必须	String		搜索关键字
      province: '', //可选	int	0	省地区号
      city: '', //可选	int	0	市地区号
      district: '', //可选	int	0	区/县地区号
      act: 0, //可选	int	0	0: 综合排序，1：按销量排序
      cat_id: '', //可选	int		分类ID
    }
  },

  // 排序
  handleSwitchSort(e) {
    this.setData({
      'params.act': e.currentTarget.dataset.act,
      'params.page': 1
    })
    this.getProduct()
  },

  // 输入文字 
  handleInputText(e) {
    this.setData({
      'params.keywords:': e.detail.value
    })
  },

  // 开始搜索bindconfirm 
  handleStartSearch() {
    this.setData({
      'params.page': 1
    })
    this.getProduct()
  },

  // 去商品页面
  handleGoProduct(e) {
    wx.navigateTo({
      url: '../product/product?id=' + e.detail.id
    })
  },

  // 取消文字
  handleDeleteText() {
    this.setData({
      'params.keywords': ''
    })
  },

  // 重新搜索
  handleResetSearch() {
    this.setData({
      'params.page': 1
    })

    this.getProduct()
  },

  // 获取搜索结果
  getProduct() {
    http.fxGet(api.mobile_apis_search, this.data.params, res => {
      console.log(res, '搜索结果')
      if (res.code == 2000) {
        let agent = this.data.list
        if (this.data.params.page == 1) {
          agent = res.data.list
        } else {
          agent = agent.concat(res.data.list)
        }

        this.setData({
          list: agent,
          count: res.data.count,
          isNext: res.data.next
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
    app.getNetworkStatus() // 检测网络
    console.log(options)

    if (options.text) {
      this.setData({
        'params.keywords': options.text
      })
    }

    if (options.category) {
      this.setData({
        'params.cat_id': options.category
      })
    }

    this.getProduct()
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
      'params.page': 1
    })
    this.getProduct()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.isNext) {
      return utils.showToast('没有更多了')
    }

    this.setData({
      'params.page': ++this.data.params.page
    })
    this.getProduct()
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
      this.data.list.forEach((item, index) => {
        if (item.goods_id == e.target.dataset.id) {
          name = item.goods_name
          url = config.fxUrl(item.goods_thumb)
          id = item.goods_id
        }
      })
      return app.handleShareProduct(name, url, id)
    }
  }
})