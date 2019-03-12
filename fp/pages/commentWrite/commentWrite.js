// pages/commentWrite/commentWrite.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
const uploadImage = require('../../updata-oss/uploadFile.js')
const fileHost = "https://shandai-mall.oss-cn-beijing.aliyuncs.com"
const util = require('../../utils/util.js');
Page({

  data: {
    uploadData: null,
  },

  //输入评论内容
  handleInputComment(e) {
    this.data.uploadData.list.map((v,index) => {
      if (v.goods_id == e.currentTarget.dataset.id) {
        this.setData({
          ['uploadData.list.[' + index + '].content']: e.detail.value,
          isSubmit:true
        })
      }
    })
  },

  addPic (e) {
    const that = this
    console.log(e.currentTarget.dataset.imgs.length)
    // console.log(e.currentTarget.dataset.imgs.length)
    if (e.currentTarget.dataset.imgs.length == 6) {
      utils.showToast('最多上传6张图片哦')
      return false
    }
    wx.chooseImage({
      count: 6 - e.currentTarget.dataset.imgs.length, // 默认最多一次选择3张图
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var nowTime = util.formatTime(new Date());
        //支持多图上传
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          //显示消息提示框
          wx.showLoading({
            title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
            mask: true
          })

          //上传图片
          //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
          //图片路径可自行修改
          uploadImage(res.tempFilePaths[i], 'cbb/' + nowTime + '/',
            function (result) {
              console.log(result.split(fileHost)[1])
              that.data.uploadData.list.map((v,index) => {
                if (e.currentTarget.dataset.id == v.goods_id) {
                  let tempArr = v.imgs
                  tempArr.push(result.split(fileHost)[1])
                  that.setData({
                    ['uploadData.list.[' + index + '].imgs']: tempArr
                  })
                }
              })
              wx.hideLoading();
            },
            function (result) {
              console.log("======上传失败======", result);
              wx.hideLoading()
            }
          )
        }
      }
    })
  },
  // 查看大图
  handleImg (e) {
    
    for (let i = 0; i < e.currentTarget.dataset.arr.length; i++) {
      e.currentTarget.dataset.arr[i] = fileHost + e.currentTarget.dataset.arr[i]
    }
    console.log(e.currentTarget.dataset)
    // return false
    wx.previewImage({
      current: fileHost + e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: e.currentTarget.dataset.arr // 需要预览的图片http链接列表
    })
  },

  // 删除

  handleDelimg (e) {
    // console.log(e.currentTarget.dataset)
    // return
    this.data.uploadData.list.map((v,index) => {
      if (v.goods_id == e.currentTarget.dataset.id) {
        v.imgs.splice(e.currentTarget.dataset.index,1)
        // console.log(v.imgs)
        this.setData({
          ['uploadData.list[' + index + '].imgs']: v.imgs
          
        })
      }
    })
  },

  // 保存
  handleSubmit() {
    // console.log(this.data.uploadData)
    let listLen = this.data.uploadData.list.length
    let emptyLen = 0
    this.data.uploadData.list.map((v) => {
      if (v.content == '') {
        emptyLen++
      }
    })
    // 空评论个数等于数组个数 说明不符合要求
    if (emptyLen == listLen) {
      utils.showToast('请输入您的评价哦')
      return false
    }

    // return false;
    app.handleTokenCheck().then(() => {
      http.fxPost(api.mobile_apis_order_addcomment, this.data.uploadData, res => {
        if (res.code == 2000) {
          utils.showToast( '评价成功')
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/order/order?type=-1',
            })
          },2000)
          // wx.switchTab({
          //   url: '/pages/user/user',
          // })
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
      order_id: options.oid || 121195,
      fileHost: fileHost
    })
    app.handleTokenCheck().then(() => {
      this.getList()
    })
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