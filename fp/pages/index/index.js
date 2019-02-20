//index.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowLogin: true, // 注册是否显示
    searchText: '', // 搜索框内容
    specialStore: {}, // 特色好店

    handAdv: {}, // 头部轮播图
    todayHigh: {}, // 今日爆款
    todayHighParams: { // 今日爆款的参数
      act: 'burst',
      area: app.globalData.locationPick.locationId,
      page: 1,
      pagesize: 10
    },

    newProductHot: {}, // 新品热销
    newProductHotParams: {
      act: 'hot',
      area: app.globalData.locationPick.locationId,
      page: 1,
      pagesize: 5
    },

    newProductSell: {}, // 新品上市
    newProductSellParams: {
      act: 'new',
      area: app.globalData.locationPick.locationId,
      page: 1,
      pagesize: 10
    },


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
    categoryActive: 0, // 选中的分类模块

    // 显示选择的地址
    showLocationPick: {
      locationName: '全国',
      locationId: 0
    },

    locationIndex: 0, // 当前所在的地址模块
    isShowLocationTemplate: false, // 地址选择模板是否显示

    showProvince: '全国', //显示的省
    provinceList: [], // 省列表
    showCity: '请选择', // 显示的市
    cityList: [], // 市的列表
    showCounty: '请选择', //显示的县列表 
    countyList: [], //县列表

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

  // 切换分类 臻品好管
  handleSwitchModule(e) {
    this.setData({
      categoryActive: e.currentTarget.dataset.id
    })
  },

  // 切换地址
  handleSwitchPickLocation(e) {
    this.setData({
      locationIndex: e.currentTarget.dataset.index
    })
  },

  // 输入框输入文字
  handleSearchText(e) {
    console.log(e.detail.value)
    this.setData({
      searchText: e.detail.value
    })
  },

  // 去搜索结果页面
  handleGoSearchResult() {
    wx.navigateTo({
      url: '../searchResult/searchResult?text=' + this.data.searchText
    })
  },

  // 去一级分类
  handleGoProductCategory() {
    wx.navigateTo({
      url: '../productCategory/productCategory',
    })
  },

  // 选择地址
  handlePickLocation() {
    this.setData({
      isShowLocationTemplate: !this.data.isShowLocationTemplate
    })

    if (this.data.isShowLocationTemplate) {
      wx.hideTabBar()
    } else {
      wx.showTabBar()
    }
  },

  // 去商品详情
  handleGoProduct(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },

  // 进入店铺
  handleGoStore(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../store/store?id=' + id
    })
  },

  // 选择省份
  handlePickprovince(e) {
    console.log(e.currentTarget.dataset)
    let agnet = this.data.provinceList
    let locationId = e.currentTarget.dataset.locationId
    let locationName = e.currentTarget.dataset.locationName

    agnet.forEach((item, index) => {
      if (item.province_id == locationId) {
        item.active = true
      } else {
        item.active = false
      }
    })

    if (!e.currentTarget.dataset.index == 0) {
      this.setData({
        'showLocationPick.locationName': locationName,
        'showLocationPick.locationId': locationId,
        locationIndex: 1
      })
    } else {
      this.handlePickLocation()
    }

    this.setData({
      showProvince: locationName,
      provinceList: agnet
    })
    this._upGlobalData() // 更新全局储存的地址
    this.getCity()
  },

  // 选择了市
  handlePickCity(e) {
    let agnet = this.data.cityList
    let locationId = e.currentTarget.dataset.locationId
    let locationName = e.currentTarget.dataset.locationName

    console.log(agnet)
    agnet.forEach((item, index) => {
      if (item.city_id == locationId) {
        item.active = true
      } else {
        item.active = false
      }
    })
    if (!locationId.includes('$')) {
      this.setData({
        'showLocationPick.locationName': locationName,
        'showLocationPick.locationId': locationId,
        locationIndex: 2
      })
    } else {
      this.handlePickLocation()
    }

    this.setData({
      showCity: locationName,
      cityList: agnet,
    })
    this._upGlobalData() // 更新全局储存的地址
    this.getCounty() // 获取全部的县
  },

  // 选择了县
  handlePickDistrict(e) {
    let agnet = this.data.countyList
    let locationId = e.currentTarget.dataset.locationId
    let locationName = e.currentTarget.dataset.locationName

    console.log(agnet)
    agnet.forEach((item, index) => {
      if (item.d_id == locationId) {
        item.active = true
      } else {
        item.active = false
      }
    })
    if (!locationId.includes('$')) {
      this.setData({
        'showLocationPick.locationName': locationName,
        'showLocationPick.locationId': locationId,
      })
    }

    this.setData({
      showCounty: locationName,
      countyList: agnet,
    })
    this._upGlobalData() // 更新全局储存的地址
    this.handlePickLocation()
  },

  // 阻止点击穿透
  handlePrevent() {
    return false
  },

  // 更新全局储存的地址
  _upGlobalData() {
    app.globalData.locationPick = this.data.showLocationPick
    console.log(this.data.showLocationPick, app.globalData.locationPick)
  },

  // 获取特色好店
  getSpecialStore() {
    http.fxGet(api.mobileapis_supplier_goods, {}, res => {
      console.log(res.data, '特色好店')
      if (res.code == 2000) {
        this.setData({
          specialStore: res.data
        })
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  // 获取全部的县
  getCounty() {
    http.fxGet(api.mobile_apis_searchindex, {
      city: this.data.showLocationPick.locationId
    }, res => {
      if (res.code == 2000) {
        console.log(res.data, '全部的县')
        res.data.list.unshift({
          d_name: '全市',
          d_id: this.data.showLocationPick.locationId + '$'
        })

        let agent = []
        res.data.list.forEach((item, index) => {
          if (index == 0) {
            item.active = true
          } else {
            item.active = false
          }
          agent.push(item)
        })

        this.setData({
          countyList: agent
        })
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  //获取省份下的市
  getCity() {
    http.fxGet(api.mobile_apis_searchindex, {
      province: this.data.showLocationPick.locationId
    }, res => {
      if (res.code == 2000) {
        console.log(res.data, '全部的市区')
        console.log(this.data.showLocationPick.locationId, '全部的市区')
        res.data.list.unshift({
          city_name: '全省',
          city_id: this.data.showLocationPick.locationId + '$'
        })

        let agent = []
        res.data.list.forEach((item, index) => {
          if (index == 0) {
            item.active = true
          } else {
            item.active = false
          }
          agent.push(item)
        })

        this.setData({
          cityList: agent
        })
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  // 获取全国的省
  getAllProvince() {
    http.fxGet(api.mobile_apis_searchindex, {
      province: 0
    }, res => {
      if (res.code == 2000) {
        console.log(res)
        res.data.list.unshift({
          province_name: '全国',
          province_id: 0
        })

        let agent = []
        res.data.list.forEach((item, index) => {
          if (index == 0) {
            item.active = true
          } else {
            item.active = false
          }
          agent.push(item)
        })

        this.setData({
          provinceList: agent
        })
        console.log(res.data, '全部的省')
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  // 获取头部广告
  getHandAdv() {
    http.fxGet(api.mobile_apis_mttindex, {
      act: 'ad'
    }, res => {
      console.log(res.data, '头部广告')
      if (res.code == 2000) {
        this.setData({
          handAdv: res.data
        })
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  // 获取竟日爆款
  getTodayHigh() {
    http.fxGet(api.mobile_apis_mttindex, {
      ...this.data.todayHighParams
    }, res => {
      console.log(res.data, '今日爆款')
      if (res.code == 2000) {
        this.setData({
          todayHigh: res.data
        })
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  // 获取新品热销
  getNewProductHot() {
    http.fxGet(api.mobile_apis_mttindex, this.data.newProductHotParams, res => {
      console.log(res.data, '新品热销')
      if (res.code == 2000) {
        this.setData({
          newProductHot: res.data
        })
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  // 获取新品上市
  getNewProductSell() {
    http.fxGet(api.mobile_apis_mttindex, this.data.newProductSellParams, res => {
      console.log(res.data, '新品上市')
      if (res.code == 2000) {
        this.setData({
          newProductSell: res.data
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

    this.getHandAdv() // 获取头部广告
    this.getTodayHigh() // 今日爆款
    this.getNewProductHot() // 新品热销
    this.getNewProductSell() // 新品上市

    this.getSpecialStore() // 获取特色店铺
    this.getAllProvince() // 全部的省份

    // 已经登录 解析
    if (app.globalData.isLogin) {
      this.setData({
        isShowLogin: false
      })
    } else {
      // 没有解析
      console.log('解析数据')
      app.userInfoReadyCallback = res => {
        this.setData({
          isShowLogin: false
        })
        app.handleUserInfo(res)
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