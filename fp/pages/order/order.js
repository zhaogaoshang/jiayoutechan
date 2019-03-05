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
    product: [{
      goods_id: 51,
      goods_thumb: '../../images/201901/thumb_img/51_thumb_G_1548285343731.jpg',
      goods_name: '商品商品商品商品商品品商品商品商品品商品商品商品品商品商品商品品商品商品商品品商品商品商品品商品商品商品品商品商品商品商品商品商品商品商品商品商品商品商品商品',
      shop_price: '100.00',
      is_shipping: 0,
      sales: 26
    }],
    // lists
    lists: [],

    activeCategory: 'all',
    // 当前品类代码
    activeStatus: '-1',
    category: [{
        name: '全部',
        id: 'all',
        status:'-1'
      }, {
        name: '待支付',
        id: 'daiZhiFu',
        status: '100'
      }, {
        name: '待发货',
        id: 'daiFaHuo',
        status: '101'
      }, {
        name: '待收货',
        id: 'daiShouHuo',
        status: '105'
      }, {
        name: '待评价',
        id: 'daiPingJia',
        status: '102'
      },
      // {
      //   name: '退款/退货',
      //   // all
      // }, 
    ],

    allOrderParams: { // 全部订单的参数
      composite_status: '-1',
      page: 1,
      pagesize: 1
    },
    allOrder: {}, // 全部订单

    daiZhiFuParams: { // 待支付
      composite_status: '100',
      page: 1,
      pagesize: 10
    },
    daiZhiFu: {}, // 待支付

    daiFaHuoParams: { // 待发货
      composite_status: '101',
      page: 1,
      pagesize: 10
    },
    daiFaHuo: {}, // 待发货

    daiShouHuoParams: { // 待收货
      composite_status: '105',
      page: 1,
      pagesize: 10
    },
    daiShouHuo: {}, // 待收货

    daiPingJiaParams: { // 待评价
      composite_status: '102',
      page: 1,
      pagesize: 10
    },
    daiPingJia: {}, // 待评价

    // 所有订单数据
    allParams:[
      { // 全部
        initParam: {
          page: 1,
          pagesize: 10,
          composite_status: '-1',
        },
        lists: {}
      },
      { // 待付款
        initParam: {
          page: 1,
          pagesize: 10,
          composite_status: '100',
        },
        lists: {} 
      },
      { // 待发货
        initParam: {
          page: 1,
          pagesize: 10,
          composite_status: '101',
        },
        lists: {}
      },
      { // 待收货
        initParam: {
          page: 1,
          pagesize: 10,
          composite_status: '105',
        },
        lists: {}
      },
      { //已完成
        initParam: {
          page: 1,
          pagesize: 10,
          composite_status: '102',
        },
        lists: {}
      }                        
    ]
  },


  // 订单详情
  handleOrderInfo(e) {
    wx.navigateTo({
      url: '../orderInfo/orderInfo?id=' + e.currentTarget.dataset.orderId,
    })
  },

  // 去订单评价页面
  handleGoComment(e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../commentWrite/commentWrite?id=' + id
    })
  },

  // 切换分类
  handleSwichCategory(e) {
    this.setData({
      activeCategory: e.currentTarget.dataset.id,
      activeStatus: e.currentTarget.dataset.status
    })
  },

  // 获取全部订单
  getAllOrder() {
    http.fxGet(api.mobile_apis_order_list, this.data.allOrderParams, res => {
      console.log(res, '获取全部的订单')
      if (res.code == 2000) {
        if (this.data.allOrderParams.page > 1) {
          res.data.list = this.data.allOrder.list.concat(res.data.list)
        }
        this.setData({
          allOrder: res.data
        })
      }
    })
  },

  // 待支付
  getDaiZhiFu() {
    http.fxGet(api.mobile_apis_order_list, this.data.daiZhiFuParams, res => {
      console.log(res, '待支付')
      if (res.code == 2000) {
        if (this.data.daiZhiFuParams.page > 1) {
          res.data.list = this.data.daiZhiFu.list.concat(res.data.list)
        }
        this.setData({
          daiZhiFu: res.data
        })
      }
    })
  },

  // 待发货
  getDaiFaHuo() {
    http.fxGet(api.mobile_apis_order_list, this.data.daiFaHuoParams, res => {
      console.log(res, '待支付')
      if (res.code == 2000) {
        if (this.data.daiFaHuoParams.page > 1) {
          res.data.list = this.data.daiFaHuo.list.concat(res.data.list)
        }
        this.setData({
          daiFaHuo: res.data
        })
      }
    })
  },

  // 待收货
  getDaiShouHuo() {
    http.fxGet(api.mobile_apis_order_list, this.data.daiShouHuoParams, res => {
      console.log(res, '待支付')
      if (res.code == 2000) {
        if (this.data.daiShouHuoParams.page > 1) {
          res.data.list = this.data.daiShouHuo.list.concat(res.data.list)
        }
        this.setData({
          daiShouHuo: res.data
        })
      }
    })
  },

  // 待评价
  getDaiPingJia() {
    http.fxGet(api.mobile_apis_order_list, this.data.daiPingJiaParams, res => {
      console.log(res, '待支付')
      if (res.code == 2000) {
        if (this.data.daiPingJiaParams.page > 1) {
          res.data.list = this.data.daiPingJia.list.concat(res.data.list)
        }
        this.setData({
          daiPingJia: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载 'tuiKuan daiPingJia daiShowhuo daiFaHuo daiZhifu all'
   */
  onLoad: function(options) {
    // console.log(options)
    // app.getNetworkStatus() // 检测网络
    // app.handleTokenCheck().then(() => {
    //   this.getAllOrder() // 全部的订单
    //   this.getDaiZhiFu() // 待支付
    //   this.getDaiFaHuo() // 代发货
    //   this.getDaiShouHuo() // 待收货
    //   this.getDaiPingJia() // 待评价
    // })
    app.getNetworkStatus() // 检测网络
    app.handleTokenCheck().then(() => {
      this.data.allParams.map(res => {
        this.getOrderList(res.initParam)
      })
    })
  },


  // 获取当前订单列表
  getOrderList(param) {
    http.fxGet(api.mobile_apis_order_list, param, res => {
      if (res.code == 2000) {
        this.data.allParams.map((v,index )=> {
          // 当前显示与状态值匹配 那么就加载
          if (this.data.activeStatus === v.initParam.composite_status) {
            this.setData({
              ['allParams['+index+'].lists']: res.data
            })
            console.log(this.data.allParams[index])
            // if (v.initParam.page > 1) {
            //   res.data.order_list = [...v.list, ...res.data.order_list]
            //   console.log(res.data.order_list)
            // }
            // this.setData({

            // })
          }
        })
        // if (this.data.allOrderParams.page > 1) {
        //   res.data.list = this.data.allOrder.list.concat(res.data.list)
        // }
        // this.setData({
        //   allOrder: res.data
        // })
      }
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
    let agent = this.data.activeCategory
    // let agent = this.data.activeStatus
    // 'all'
    if (agent == 'all') {
      if (!this.data.allOrder.next) {
        return
      }
      this.setData({
        allOrderParams: ++this.data.allOrderParams.page
      })

      this.getAllOrder() // 获取全部的订单
    }

    // 'daiZhiFu'
    if (agent == 'daiZhiFu') {
      if (!this.data.daiZhiFu.next) {
        return
      }
      this.setData({
        'daiZhiFuParams.page': ++this.data.daiZhiFuParams.page
      })

      this.getDaiZhiFu()
    }

    // 'daiFaHuo'
    if (agent == 'daiFaHuo') {
      if (!this.data.daiFaHuo.next) {
        return
      }
      this.setData({
        'daiFaHuoParams.page': ++this.data.daiFaHuoParams.page
      })

      this.getDaiFaHuo()
    }

    // 'daiShouHuo'
    if (agent == 'daiShouHuo') {
      if (!this.data.daiShouHuo.next) {
        return
      }
      this.setData({
        'daiShouHuoParams.page': ++this.data.daiShouHuoParams.page
      })

      this.getDaiShouHuo()
    }


    // 'daiPingJia'
    if (agent == 'daiPingJia') {
      if (!this.data.daiPingJia.next) {
        return
      }
      this.setData({
        'daiPingJiaParams.page': ++this.data.daiPingJiaParams.page
      })

      this.getDaiPingJia()
    }
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


