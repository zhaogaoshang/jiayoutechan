// pages/collcot/collcot.js
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

    params: {
      page: 1,
      pagesize: 8
    },
    productList: {
      next: true,
      count: 1,
      list: []
    }
  },

  // 操作收藏
  handleCollect(e) {
    let idx = e.currentTarget.dataset.index
    let gid = this.data.productList.list[idx].goods_id
    let isCollect = this.data.productList.list[idx].is_collect

    if (isCollect) {
      app.handleDeleteCollect(gid)
    } else {
      app.handleAddCollect(gid)
    }

    this.setData({
      ['productList.list[' + idx + '].is_collect']: !isCollect
    })

    // 设置收藏
    app.globalData.agent.collectWatch.isChang = true
    app.globalData.agent.collectWatch.list.push({
      id: gid,
      value: isCollect ? 0 : 1
    })
  },

  // 去商品详情
  handleGoProduct(e) {
    let id = e.currentTarget.dataset.id

    let isSell = e.currentTarget.dataset.isSell
    if (isSell == 0) {
      utils.showToast('已经下架')
      return
    }

    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },

  // 阻止穿透
  handleprevent() {
    return false
  },

  // 获取收藏列表
  getCollect() {
    http.fxGet(api.mobile_apis_collectgoods, this.data.params, res => {
      res.data.list.forEach((item, index) => {
        item.is_collect = true
      })

      if (res.code == 2000) {
        if (this.data.params.page > 1) {
          res.data.list = this.data.productList.list.concat(res.data.list)
        }

        this.setData({
          productList: res.data
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
    this.setData({
      'params.page': 1
    })

    this.getCollect()
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

    this.getCollect()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.productList.next) {

      return
    }

    this.setData({
      'params.page': ++this.data.params.page
    })
    this.getCollect()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(e) {
    let idx = e.target.dataset.index

    if (e.from == "menu") {
      return app.handleShareApp()
    } else {
      let titlt = this.data.productList.list[idx].goods_name
      // let url = config.fxUrl(this.data.productList.list[idx].goods_thumb)
      let url = this.data.productList.list[idx].goods_thumb
      let id = this.data.productList.list[idx].goods_id
      return app.handleShareProduct(titlt, url, id)
    }
  }

})