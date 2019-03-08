// pages/commentWrite/commentWrite.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({

  data: {
    uploadData: null
  },

  //输入评论内容
  handleInputComment(e) {
    this.data.uploadData.list.map((v,index) => {
      if (v.goods_id == e.currentTarget.dataset.id) {
        this.setData({
          ['uploadData.list.[' + index + '].content']: e.detail.value
        })
      }
    })
  },

  addPic (e) {
    this.data.uploadData.list.map((v, index) => {
      if (v.goods_id == e.currentTarget.dataset.id) {
        wx.chooseImage({
          count: 3,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success(res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths
            console.log(tempFilePaths)
          }
        })        
        // this.setData({
        //   ['uploadData.list.[' + index + '].content']: e.detail.value
        // })
      }
    })
  },

  // 保存
  handleSubmit() {

    app.handleTokenCheck().then(() => {
      http.fxPost(api.mobile_apis_order_addcomment, this.data.uploadData, res => {
        if (res.code == 2000) {
          utils.showToast( '评价成功')
          wx.switchTab({
            url: '/pages/user/user',
          })
        } else {
          utils.showToast(res.msg)
        }
      })
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
    this.setData({
      order_id: options.oid || 373
    })
    this.getList()
  },

  getList () {
    http.fxGet(api.mobile_apis_order_commentlist,
    {order_id:this.data.order_id},
    res => {
      if(res.code == 2000) {
        for (let i = 0; i < res.data.list.length; i++) {
          res.data.list[i].imgs = []
          res.data.list[i].content = ''
        }
        this.setData({
          uploadData: res.data
        })
        console.log(this.data.uploadData)
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