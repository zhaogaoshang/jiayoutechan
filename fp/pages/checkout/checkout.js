// pages/order/order.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShoLove: false, // 爱心贡献 

    orderDetail: {}, // 订单详情
    activeLocation: {}, // 默认地址

    // 提交订单的参数
    orderParams: {
      sel_goods: '', //是	string	购物车主键ID
      postscript: '', //否	string	订单描述
      consingee: '', // 联系人
      address: '', // 联系人id
      mobile: '', //是	string	手机号
      country: '', //是	string	国家
      province: '', //是	string	省
      city: '', //是	string	市
      district: '', //是	string	区
      n_surplus: 0, //是	string	使用积分
    }
  },

  // 提交订单
  handleSubmitOrder() {
    console.log(this.data.orderParams)
    if (!this.data.orderParams.address) {
      utils.showToast('请选择地址')
      return
    }

    http.fxPost(api.mobile_apis_orderDone, this.data.orderParams, res => {
      console.log(res, '提交订单')
      if (res.code == 2000) {
        wx.navigateTo({
          url: '../paymentResult/paymentResult'
        })
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  // 爱心贡献值
  handleIsShowShoLove() {
    if (this.data.orderParams.n_surplus == 0) {
      return utils.showToast('爱心贡献值不足')
    }
    this.setData({
      isShoLove: !this.data.isShoLove
    })
  },

  // 输入描述
  handleInputDescription(e) {
    this.setData({
      'orderParams.postscript': e.detail.value
    })
  },

  // 不使用爱心值
  handleNotUseLove() {
    this.setData({
      'orderParams.n_surplus': 0
    })
  },

  // 修改地址
  handleGoAddress() {
    wx.navigateTo({
      url: '../address/address',
    })
  },

  // 更新爱心
  handleUpdataOrder() {
    this.setData({
      'orderParams.n_surplus': this.data.orderDetail.n_surplus
    })
  },

  // 更新购物车主id
  _handleUpdataId() {
    let ids = ''
    this.data.orderDetail.cart_goods.forEach((item, index) => {
      ids += item.rec_id + ','
    })

    this.setData({
      'orderParams.sel_goods': ids.slice(0, -1)
    })
  },

  // 更新地址
  _handleUpLocation() {
    if (this.data.activeLocation.mobile) {
      this.setData({
        'orderParams.mobile': this.data.activeLocation.mobile, //
        'orderParams.country': 0, //
        'orderParams.province': this.data.activeLocation.province, //
        'orderParams.city': this.data.activeLocation.city, //
        'orderParams.district': this.data.activeLocation.district, //
        'orderParams.consingee': this.data.activeLocation.consignee, //
        'orderParams.address': this.data.activeLocation.address_id, //
      })
    }
  },

  // 计算
  getSum() {
    http.fxGet(api.mobile_apis_submitOrder, {
      sel_goods: app.globalData.checkoutSku
    }, res => {
      console.log(res, '获取订单')
      if (res.code == 2000) {
        this.setData({
          orderDetail: res.data
        })
        this.handleUpdataOrder()
        this._handleUpdataId()
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  // 获得地址
  getExpress() {
    http.fxGet(api.mobile_apis_getdefaultaddress, {}, res => {
      console.log(res, '获得默认地址')
      if (res.code == 2000) {
        this.setData({
          activeLocation: res.data
        })
      } else {
        this.setData({
          activeLocation: {}
        })
      }
      this._handleUpLocation()
    })
  },

  // 计算从产品详情来的
  getSumFromProduct(e) {
    app.handleTokenCheck().then(() => {
      http.fxPost(api.mobile_apis_flowCart, {
        quick: 0, //是 string 0 0
        spec: [e.spec], //是 string 规格[“4”]
        goods_id: e.goods_id, //是 string 商品ID 45
        number: e.number, //是 string 商品购买数量 1
        parent: 0, //是 string 0 0
        one_step_buy: 1 // 直接下单必须传
      }, res => {
        console.log(res, '立即购买')
        if (res.code == 2000) {
          this.setData({
            orderDetail: res.data
          })
          this.handleUpdataOrder()
          this._handleUpdataId()
        } else {
          utils.showToast(res.msg)
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    app.getNetworkStatus() // 检测网络
    if (options.goods_id) {
      this.getSumFromProduct(options)
    } else {
      this.getSum()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    console.log(e)
    this.getExpress()
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
    wx.stopPullDownRefresh()
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