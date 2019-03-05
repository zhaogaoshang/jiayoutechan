// pages/product/product.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
let wxparse = require("../../wxParse/wxParse.js")
const config = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', // 产品的id
    isShowLogin: true, // 注册是否显示
    loadPageIsShow: true, // 是否加载页面
    productDetail: {}, // 产品详情
    htmlPhotoText: {},
    isCollect: false, // 是否收藏
    storeInfo: {}, // 店铺详情
    activeSpecifications: {
      qty: '',
    }, // 选中的规格
    isShowPick: false, // 选择的弹框是否显示

    comment: {
      count: 0,
      list: [],
    }, // 评论列表
    commentParams: { // 评论参数
      gid: '',
      page: 1,
      pagesize: 5,
    },

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

  // 处理客服会话
  handleContact(e) {

  },

  // 加入购物车的数量减
  handleDelete() {
    if (this.data.activeSpecifications.qty > 1) {
      this.setData({
        'activeSpecifications.qty': --this.data.activeSpecifications.qty
      })
    }
  },

  // 加入购物车的数量加
  handleAdd() {
    this.setData({
      'activeSpecifications.qty': ++this.data.activeSpecifications.qty
    })
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
    let currentActive = this.data.activeSpecifications

    let agent = this.data.productDetail.spes
    let activeId = ''
    agent.forEach((item, index) => {
      if (item.active) {
        activeId = item.id
      }
    })

    wx.navigateTo({
      url: '../checkout/checkout?spec=' + [activeId] + '&goods_id=' + this.data.id + '&number=' + currentActive.qty,
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
    let number = this.data.productDetail.goods_number
    let sell = this.data.productDetail.is_on_sale
    if (number == 0 || sell == 0) {
      utils.showToast('下架或售罄')
      return
    }
    this.setData({
      isShowPick: !this.data.isShowPick
    })
  },

  // 切换分类
  handleSwitchModule(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      categoryActive: id
    })

    if (id == 0) {
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
    if (id == 1) {
      wx.pageScrollTo({
        scrollTop: 430,
      })
    }
    if (id == 2) {
      wx.pageScrollTo({
        scrollTop: 450,
      })
    }

  },

  // 收藏
  handleCollect() {
    let agent = this.data.isCollect
    if (agent) {
      app.handleDeleteCollect(this.data.id)
    } else {
      app.handleAddCollect(this.data.id)
    }

    this.setData({
      isCollect: !agent
    })
  },

  // 去查看全部评论
  handleGoAllComment(e) {
    wx.navigateTo({
      url: '../commentAll/commentAll?id=' + e.currentTarget.dataset.id,
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
          isCollect: res.data.is_collect,
          loadPageIsShow: false
        })

        wxparse.wxParse('htmlPhotoText', 'html', res.data.goods.goods_desc, this, 5);

        this.handleHtmlPhotoShow() // 处理图片显示
        this.getSpecifications() // 获取规格相关
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  // 获取评论
  getComment() {
    http.fxGet(api.mobile_apis_comment, this.data.commentParams, res => {
      console.log(res, '评论列表')
      if (res.code == 2000) {
        this.setData({
          comment: res.data
        })
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  // 处理图片显示
  handleHtmlPhotoShow() {
    let html = this.data.htmlPhotoText
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

  // 获取进入相关信息
  getUserInfo(options) {
    // console.log(options, "分享相关")
    this.setData({
      id: options.id,
      'commentParams.gid': options.id
    })
    this.getProductDetail() // 商品详情
    this.getComment() // 获取评论
    // 检测绑定分享人
    if (options.sharePrent) {
      let params = {
        parent_id: options.sharePrent,
        chlid_uid_id: app.globalData.userInfo.uid,
        type: options.shareType
      }
      app.handleBindShare(params)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    app.getNetworkStatus() // 检测网络
    // console.log(app.globalData.isLogin,'是否登录')

    if (app.globalData.isLogin) {
      this.setData({
        isShowLogin: false
      })
      app.handleTokenCheck().then(() => {
        this.getUserInfo(options)
      })
    } else {
      // 没有解析
      console.log('解析数据')
      app.userInfoReadyCallback = res => {
        app.handleUserInfo(res).then(() => {
          app.handleTokenCheck().then(() => {
            this.getUserInfo(options)
          })
        })
      }
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
    let titlt = this.data.productDetail.goods_name
    let url = config.fxUrl(this.data.productDetail.goods_thumb)
    let id = this.data.id
    return app.handleShareProduct(titlt, url, id)
  }
})