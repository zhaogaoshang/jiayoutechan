// pages/commentAll/commentAll.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: {
      count: 0,
      next: true,
      list: [],
    }, // 评论列表
    commentParams: { // 评论参数
      gid: '',
      page: 1,
      pagesize: 5,
    },

  },

  // 获取评论
  getComment() {
    http.fxGet(api.mobile_apis_comment, this.data.commentParams, res => {
      console.log(res, '评论列表')
      if (res.code == 2000) {

        if (this.data.commentParams.page > 1) {
          res.data.list = this.data.comment.list.concat(res.data.list)
        }

        this.setData({
          comment: res.data
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
    this.setData({
      'commentParams.gid': options.id
    })

    this.getComment()
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
      'commentParams.page': 1
    })
    this.getComment()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.comment.next) {
      utils.showToast('没有更多了')
      return
    }

    this.setData({
      'commentParams.page': ++this.data.commentParams.page
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})