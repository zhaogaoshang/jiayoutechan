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
    // lists
    lists: [],

    // activeCategory: 'all',
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
        status: '106'
      },
    ],
    loadPageIsShow: true,
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
          composite_status: '106',
        },
        lists: {}
      }                        
    ]
  },

  payment(e) {
    http.fxPost(api.mobile_apis_payment, e.currentTarget.dataset, res => {
      if (res.code == 2000) {
        console.log(res.data)

        wx.requestPayment({
          appId: res.data.appId,
          timeStamp: res.data.timeStamp.toString(),
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,

          success(res) {
            wx.navigateTo({
              url: '/pages/paymentResult/paymentResult?order_id=' + e.currentTarget.dataset.order_id,
            })
          },
          fail(res) {
            // wx.navigateTo({
            //   url: '/pages/paymentResult/paymentResult',
            // })
          }
        })

      }
    })
  },

  handleConfirm(e) {
    const that = this
    wx.showModal({
      title: '温馨提示',
      content: '确认收货后，钱会直接付给卖家',
      confirmColor: '#FE8D18',
      success(res) {
        if (res.confirm) {

          http.fxPost(api.mobile_apis_order_confirm,
            e.currentTarget.dataset,
            res => {
              if (res.code == 2000) {
                utils.showToast('确认收货成功')
                that.getOrderList({ page: 1, pagesize: 10, composite_status: 106 })
                setTimeout(function(){
                  that.setData({
                    activeStatus: '106',
                  })
                },1500)
              }
            })
          // wx.navigateTo({
          //   url: '/pages/commentWrite/commentWrite'
          // })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  // 订单详情
  handleOrderInfo(e) {
    console.log(e.currentTarget.dataset.orderId);
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
    // console.log(e.currentTarget.dataset.status)
    this.setData({
      // activeCategory: e.currentTarget.dataset.id,
      activeStatus: e.currentTarget.dataset.status
    })
    console.log(this.data.activeStatus);
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

  /**
   * 生命周期函数--监听页面加载 'tuiKuan daiPingJia daiShowhuo daiFaHuo daiZhifu all'
   */
  onLoad: function(options) {
    this.setData({
      activeStatus: options.type || -1
    })  
    // this.getOrderList()  
    // this.data.allParams.map(res => {
    //   if (res.initParam.composite_status == this.data.activeStatus) {
    //     this.getOrderList(res.initParam)
    //   }
    // })
  },


  // 获取当前订单列表
  getOrderList(param,type) {
    const that = this
    http.fxGet(api.mobile_apis_order_list, param, res => {
      if (res.code == 2000) {
        wx.hideLoading()
        this.data.allParams.map((v,index )=> {
          // 当前显示与状态值匹配 那么就加载
          if (param.composite_status === v.initParam.composite_status) {
            if (v.initParam.page > 1) {
              res.data.order_list = [...v.lists.order_list, ...res.data.order_list]
            }
            that.setData({
              ['allParams[' + index + '].lists']: res.data,
            })          
          }
        })
        // 下拉刷新
        if (type) {
          wx.stopPullDownRefresh
          // utils.showToast('已刷新')
        }

        console.log(that.data.allParams)
        // setTimeout(function () {
        //   that.setData({
        //     loadPageIsShow: false
        //   })
        // }, 2000)
      }
    })
  },  

  // 按钮事件
  handleBtn: function (e){
    let param = e.currentTarget.dataset
    if (param.pay) {
      utils.showToast('暂无支付功能')
      return false
    }

    if (param.touch) {
      return false
    }



    wx.navigateTo({
      url: param.url
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
    app.getNetworkStatus() // 检测网络
    app.handleTokenCheck().then(() => {
      // this.getOrderList(this.data.allParams[0].initParam)
      this.data.allParams.map(res => {
        this.getOrderList(res.initParam)
      })
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
    this.data.allParams.map((v, index) => {
      if (this.data.activeStatus == v.initParam.composite_status) {
        this.setData({
          ['allParams[' + index + '].initParam.page']: 1
        })
        // console.log(v.initParam.page)
        this.getOrderList(v.initParam,'down')
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // console.log(this.data.activeStatus)
    wx.showLoading({
      title: '加载中',
    })
    this.data.allParams.map((v,index) => {
      if (this.data.activeStatus == v.initParam.composite_status) {
        // 如果没有更多数据 直接返回
        console.log(v.lists.next)
        if (!v.lists.next) {
          utils.showToast('没有更多了')
          return false
        }
        this.setData({
          ['allParams[' + index + '].initParam.page']: ++v.initParam.page
        })
        // console.log(v.initParam.page)
        this.getOrderList(v.initParam)
      }
    })

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
