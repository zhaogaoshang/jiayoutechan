// pages/commentWrite/commentWrite.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: {}, // 订单信息
    params: {
      gid: 45, //是 string 商品ID号
      rid: 258, //是 string order_goods表的主键rec_id
      oid: 'SD155108963995', //是 string 订单ID号
      content: '', //是 string 内容
      images: [], //否 string 图片数组[“”, ””]
    }
  },

  //输入评论内容
  handleInputComment(e) {
    this.setData({
      'params.content': e.detail.value
    })
  },

  // 保存
  handleSubmit() {
    if (!this.data.params.content) {
      return utils.showToast('没有书写内容')
    }

    app.handleTokenCheck().then(() => {
      http.fxPost(api.mobile_apis_addcomment, this.data.params, res => {
        if (res.code == 2000) {
          wx.navigateBack({
            delta: 1
          })
        } else {
          utils.showToast(res.msg)
        }
      })
    })
  },

  // 获取订单信息
  getOrderInfo() {
    http.fxPost(api.mobile_apis_order_info, {
      order_id: this.data.params.rid
    }, res => {
      if (res.code == 2000) {
        console.log(res, '订单信息')
        this.setData({
          orderDetail: res.data,
          'params.gid': res.data.list[0].goods_id,
          'params.oid': res.data.info.order_sn,
        })
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  // 更新内存和界面
  handleUpdata(e) {
    console.log(e)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      'params.rid': options.id
    })
    this.getOrderInfo()
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