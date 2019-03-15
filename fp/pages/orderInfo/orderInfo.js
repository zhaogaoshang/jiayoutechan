// pages/orderInfo/orderInfo.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: {}
  },

  // 去物流页面
  handleGoLogistics() {
    wx.navigateTo({
      url: '../logistics/logistics?id=' + this.data.id
    })
  },

  // 去详情
  handleGoproduct(e){
    wx.navigateTo({
      url: '../product/product?id=' + e.currentTarget.dataset.id,
    })
  },

  // 获取订单信息
  getOrderInfo() {
    http.fxPost(api.mobile_apis_order_info, {
      order_id: this.data.id
    }, res => {
      console.log(res, '订单信息')
      if (res.code == 2000) {
        this.setData({
          orderDetail: res.data
        })
        let endDate = this.data.orderDetail.info.end_time
        let curDate = Math.ceil(new Date().getTime() / 1000)
        if (res.data.info.extension_code == '30') {
          endDate = this.data.orderDetail.info.shipped_time
          this.countDown(endDate - curDate, '105')
        } else{
          this.countDown(endDate - curDate, '100')
        }
      } else {

      }
    })
  },

  handleDetail (e) {
    // console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/product/product?id=' + e.currentTarget.dataset.id,
    })
  },

  //带天数的倒计时
  countDown(times,type) {  
    const that = this
    console.log(times)
    var timer = null;  
    timer = setInterval(function() {    
      var day = 0,
              hour = 0,
              minute = 0,
              second = 0; //时间默认值
          
      if (times > 0) {      
        day = Math.floor(times / (60 * 60 * 24));      
        hour = Math.floor(times / (60 * 60)) - (day * 24);      
        minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);      
        second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);    
      }    
      if (day <= 9) day = '0' + day;    
      if (hour <= 9) hour = '0' + hour;    
      if (minute <= 9) minute = '0' + minute;    
      if (second <= 9) second = '0' + second;     //
      if (type == '105') {
        that.setData({
          countDowns: `剩余${day}天${hour}小时自动确认`
        })  
      } else{
        that.setData({
          countDowns: `剩余${minute}分${second}秒自动关闭`
        })  
      }
      // console.log(day + "天:" + hour + "小时：" + minute + "分钟：" + second + "秒");  
      times--;  
    }, 1000);  
    if (times <= 0) {    
      clearInterval(timer);  
      that.setData({
        countDowns: `已超时自动关闭`
      })        
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.getNetworkStatus() // 检测网络
    this.setData({
      id: options.id || 121249
    })
    app.handleTokenCheck().then(() => {
      this.getOrderInfo() // 订单信息
      this.getOrderExpress() // 物流信息
    })

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
            //   url: '/pages/orderInfo/orderInfo?id=' + e.order_id,
            // })
          }
        })

      }
    })
  },  

  handleBtn: function (e) {
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

  getOrderExpress: function() {
    http.fxGet(api.mobile_apis_order_express, {
      oid: this.data.id
    }, res => {
      console.log(res, '物流信息')
      if (res.code == 2000) {
        if (!res.data.list || res.data.list.length == 0) {
          this.setData({
            express: {
              context: '等待卖家发货',
              time: ''
            }
          })
          return false
        }
        this.setData({
          express: res.data.list[0]
        })
      } else {

      }
    })
  },

  handleConfirm () {
    const that = this
    wx.showModal({
      title: '温馨提示',
      content: '确认收货后，钱会直接付给卖家',
      confirmColor: '#FE8D18',
      success(res) {
        if (res.confirm) {

          http.fxPost(api.mobile_apis_order_confirm, 
          { order_id: that.data.orderDetail.info.order_id},
          res=>{
            if(res.code == 2000) {
              that.getOrderInfo()
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
  onShareAppMessage: function(e) {
    if (e.from == "menu") {
      return app.handleShareApp()
    }
  }
})