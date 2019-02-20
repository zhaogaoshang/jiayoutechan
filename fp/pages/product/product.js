// pages/product/product.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
let wxparse = require("../../wxParse/wxParse.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', // 产品的id
    productDetail: {}, // 产品详情
    htmlPhotoText: {},
    isCollect: false, // 是否收藏
    storeInfo: {}, // 店铺详情
    activeSpecifications: {
      qty: '',
    }, // 选中的规格
    isShowPick: false, // 选择的弹框是否显示

    categoryActive: 0, // 选择的分类
    category: [{ // 分类
      name: '商品',
      id: 0
    }, {
      name: '评价',
      id: 1
    }, {
      name: '详情',
      id: 2
    }],
  },

  // 规格选择
  handlePickSpecifications(e) {
    let id = e.currentTarget.dataset.id
    let agent = this.data.productDetail.spes

    agent.forEach((item, index) => {
      if (item.id == id) {
        item.active = true
      } else {
        item.active = false
      }
    })
    this.setData({
      'productDetail.spes': agent
    })

    this.getSpecifications()
  },

  // 添加购物车
  handlePickAddCart() {
    app.handleTokenCheck()
    this.handleIsShowPick()

    let currentActive = this.data.activeSpecifications
    console.log(this.data.activeSpecifications)

    let agent = this.data.productDetail.spes
    let activeId = ''
    agent.forEach((item, index) => {
      if (item.active) {
        activeId = item.id
      }
    })

    app.handleTokenCheck().then(() => {
      http.fxPost(api.mobile_apis_flowCart, {
        quick: 0, //是 string 0 0
        spec: [activeId], //是 string 规格[“4”]
        goods_id: this.data.id, //是 string 商品ID 45
        number: currentActive.qty, //是 string 商品购买数量 1
        parent: 0, //是 string 0 0
      }, res => {
        console.log(res, '加入购物车')
        if (res.code == 2000) {
          utils.showToast('添加成功')
        } else {
          utils.showToast(res.msg)
        }
      })
    })
  },

  // 选择数量
  handleExportsCount(e) {
    console.log(e.detail.count)
    this.setData({
      'activeSpecifications.qty': e.detail.count
    })
  },

  // 去下单
  handleGoOrder() {
    wx.navigateTo({
      url: '../checkout/checkout',
    })
  },

  // 去购物车
  handleGoCart() {
    wx.switchTab({
      url: '../cart/cart',
    })
  },

  // 选择的是否显示
  handleIsShowPick() {
    this.setData({
      isShowPick: !this.data.isShowPick
    })
  },

  // 切换分类
  handleSwitchModule(e) {
    console.log(e)
    this.setData({
      categoryActive: e.currentTarget.dataset.id
    })
  },

  // 收藏
  handleCollect() {
    let agent = this.data.isCollect
    if (agent) {
      this.handleDleteCollect()
    } else {
      this.handleAddCollect()
    }

    this.setData({
      isCollect: !this.data.isCollect
    })
  },

  // 添加收藏
  handleAddCollect() {
    http.fxGet(api.mobile_apis_addcollectgoods, {
      gid: this.data.id
    }, res => {
      console.log(res, '添加收藏')
    })
  },

  // 删除收藏
  handleDleteCollect() {
    http.fxGet(api.mobile_apis_delcollectgoods, {
      id: this.data.id
    }, res => {
      console.log(res, '删除收藏')
    })
  },

  // 去查看全部评论
  handleGoAllComment(e) {
    wx.navigateTo({
      url: '../commentAll/commentAll',
    })
  },

  // 去店铺
  handleGoStore() {
    wx.navigateTo({
      url: '../store/store?id=' + this.data.storeInfo.supplier_id
    })
  },

  // 阻止点击穿透
  handlePrevent() {
    return false
  },

  // 商品x详情
  getProductDetail() {
    http.fxGet(api.product_detail, {
      id: this.data.id
    }, res => {
      console.log(res.data, '商品详情')
      if (res.code == 2000) {
        res.data.goods.spes.forEach((item, index) => {
          if (index == 0) {
            item.active = true
          } else {
            item.active = false
          }
        })
        this.setData({
          productDetail: res.data.goods,
          // storeInfo: res.data.shop_info
          isCollect: res.data.is_collect
        })

        wxparse.wxParse('htmlPhotoText', 'html', res.data.goods.goods_desc, this, 5);

        this.handleHtmlPhotoShow() // 处理图片显示
        this.getSpecifications() // 获取规格相关
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  // 处理图片显示
  handleHtmlPhotoShow() {
    let html = this.data.htmlPhotoText
    console.log(html)
  },

  // 获取规格相关
  getSpecifications() {
    let agent = this.data.productDetail.spes
    let activeId = ''
    agent.forEach((item, index) => {
      if (item.active) {
        activeId = item.id
      }
    })

    http.fxGet(api.mobile_apis_goods, {
      id: this.data.id, // 商品的id
      act: 'price',
      attr: activeId, // 规格id
      number: 1
    }, res => {
      console.log(res, '规格参数')
      if (res.code == 2000) {
        this.setData({
          activeSpecifications: res.data
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
      id: options.id
    })

    this.getProductDetail() // 商品详情
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