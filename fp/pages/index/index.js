//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [ // 分类
      {
        name: '臻品馆',
        title: '精品好货',
        id: 0
      },
      {
        name: '特色好店',
        title: '优质店铺',
        id: 1
      },
      {
        name: '去赶集',
        title: '实惠好货',
        id: 2
      },
    ],
    categoryActive: 2, // 选中的分类模块

    imgUrls: [ // 头部轮播图
      '../../images/active.jpg',
      '../../images/active.jpg',
      '../../images/active.jpg'
    ],

    today: [{
      img: '../../images/active.jpg',
      name: '一周内发货果园直发果园直发果园直发',
      price: 123.00,
      is_baoyou: true
    }, {
      img: '../../images/active.jpg',
      name: '一周内发货果园直发果园直发果园直发',
      price: 123.00,
      is_baoyou: true
    }, {
      img: '../../images/active.jpg',
      name: '一周内发货果园直发果园直发果园直发',
      price: 123.00,
      is_baoyou: true
    }, ]
  },

  // 切换分类
  handleSwitchModule(e) {
    this.setData({
      categoryActive: e.currentTarget.dataset.id
    })
  },

  // 去商品详情
  handleGoProduct(){
    console.log(1)
    wx.navigateTo({
      url: '../product/product'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    wx.stopPullDownRefresh()
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