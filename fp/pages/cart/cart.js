// pages/cart/cart.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touchStartLocatione: 0,
    touchEndLocatione: 0,

    isAllPick: false, // 是否是全选
    countPrice: 0, // 总金额

    productList: [
      //   {
      //   status: 0 // 滑动状态：0为没有变动过 2滑动初始值 1为已经滑动
      // }
    ]
  },

  // 数量加减
  handleExportsCount(e) {
    console.log(e.detail)
    let agent = e.detail
    let list = this.data.productList
    let count = 0
    list.forEach(item => {
      item.goods_list.forEach(only => {
        if (only.product_id == agent.sku) {
          only.goods_number = agent.count
        }
      })
    })

    this.setData({
      productList: list
    })

    this.countPrice()
  },

  // 选择产品
  handleCheckoutProduct(e) {
    console.log(e.currentTarget.dataset.parentIndex)
    console.log(e.currentTarget.dataset.sunIndex)
    let parentIndex = e.currentTarget.dataset.parentIndex
    let sunIndex = e.currentTarget.dataset.sunIndex

    this.setData({
      ['productList[' + parentIndex + '].goods_list[' + sunIndex + '].isCheckout']: !this.data.productList[parentIndex].goods_list[sunIndex].isCheckout
    })

    this.countPrice() // 计算总价
    this.isAllPick().then((res) => { // 是否全选
      console.log(res)
      this.setData({
        isAllPick: res
      })
    })
  },

  // 是否全选
  isAllPick() {
    let list = this.data.productList
    let notActive = 0
    return new Promise((resolve, reject) => {
      list.forEach(item => {
        item.goods_list.forEach((only, index) => {
          if (!only.isCheckout) {
            notActive += 1
          }
          if (item.goods_list.length - 1 == index) {
            if (notActive > 0) {
              return resolve(false)
            } else {
              return resolve(true)
            }
          }
        })
      })
    })
  },

  // 全选
  handleAllPick() {
    let list = this.data.productList

    this.isAllPick().then((res) => { // 是否全选
      console.log(res)
      list.forEach(item => {
        item.goods_list.forEach((only, index) => {
          only.isCheckout = !res
        })
      })

      this.countPrice()
      this.setData({
        isAllPick: !res,
        productList: list
      })
    })
  },

  // 计算金额
  countPrice() {
    let list = this.data.productList
    let count = 0
    list.forEach(item => {
      item.goods_list.forEach(only => {
        if (only.isCheckout) {
          console.log(only.goods_price)
          count = (only.goods_price * only.goods_number) * 1000 + count
        }
      })
    })

    this.setData({
      countPrice: count / 1000
    })
  },

  // 删除购物车
  handleDeleteProduct(e) {
    let prentIndex = e.currentTarget.dataset.parentIndex
    let idx = e.currentTarget.dataset.sunIndex
    let list = this.data.productList[prentIndex].goods_list
    let sku = this.data.productList[prentIndex].goods_list[idx].rec_id
    list.splice(idx)
    this.setData({
      ['productList[' + prentIndex + '].goods_list']: list
    })

    this.countPrice() // 计算总价
    this.isAllPick().then((res) => { // 是否全选
      console.log(res)
      this.setData({
        isAllPick: res
      })
    })

    http.fxGet(api.mobile_apis_dropCart, {
      id: sku
    }, res => {
      console.log(res, '删除购物车')
      if (res.code == 2000) {
        utils.showToast(res.msg)
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  // 手指点击
  handleTouchstart(e) {
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
        ['productList[0].goods_list[' + changeIndex + '].status']: 2
      })
    }
    if (isChange == 2) {
      this.setData({
        ['productList[0].goods_list[' + changeIndex + '].status']: 1
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

  // 添加购物车
  getCart() {
    app.getCartList().then(res => {
      console.log(res)
      res.goods_list.forEach(item => {
        console.log(item)
        item.goods_list.forEach(only => {
          only.status = 0
          only.isCheckout = false
        })
      })

      this.setData({
        cartList: res,
        productList: res.goods_list,
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.getNetworkStatus() // 检测网络
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
    app.handleTokenCheck().then(() => {
      this.getCart()
    })
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