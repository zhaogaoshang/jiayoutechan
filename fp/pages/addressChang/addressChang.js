// pages/addressChang/addressChang.js
const app = getApp()
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'add', // edit 为地址修改  add 为地址添加
    isShowLocationTemplate: false, // 地址选择
    locationIndex: 0, // 当前选择地址的框

    form: {
      aid: '', //可选(添加操作时不用传，编辑操作时必选)	int	要编辑的地区ID
      name: '', //是	int	联系人
      mobile: '', // 手机
      province: '', //是	int	省ID
      provinceName: '', //是	int	省ID
      city: '', //是	int	城市ID
      cityName: '', //是	int	城市ID
      district: '', //是	int	区县ID
      districtName: '', //是	int	区县ID
      address: '', //是	int	详细地址
      zipcode: '', //是	int	邮政编码
      isdefault: false, //是	int	是否要设为默认地址（1：是，0：否）
    },

    allProvince: [], // 全部的省份
    allcity: [], // 全部的市区
    allDistrict: [], // 全部的县城
  },

  // 编辑用户名称
  handleEditUserName(e) {
    this.setData({
      'form.name': e.detail.value
    })
  },

  // 编辑手机号码
  handleEditMobile(e) {
    this.setData({
      'form.mobile': e.detail.value
    })
  },

  // 地址详情
  handleLocationDetail(e) {
    this.setData({
      'form.address': e.detail.value
    })
  },

  // 邮编
  handleZipcode(e) {
    this.setData({
      'form.zipcode': e.detail.value
    })
  },

  // 是否为默认地址
  handleSwitchChange(e) {
    console.log(e.detail.value)
    this.setData({
      'form.isdefault': e.detail.value
    })
  },

  // 存贮
  handleStorage() {
    http.fxPost(api.mobile_apis_opmyaddress, this.data.form, res => {
      console.log(res, '储存或者修改')
      if (res.code != 2000) {
        utils.showToast(res.msg)
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  // 删除地址
  handleDeleteAddress() {
    http.fxGet(api.mobile_apis_delmyaddress, {
      aid: this.data.form.aid
    }, res => {
      console.log(res, '删除地址')
      if (res.code != 2000) {
        utils.showToast(res.msg)
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  // 选择地址魔板是否显示
  handlePickLocation() {
    this.setData({
      isShowLocationTemplate: !this.data.isShowLocationTemplate
    })

    //如果是添加地址
    // if (this.data.type == 'add' && this.data.isShowLocationTemplate) {
    //   this.getProvince()
    // }
  },

  // 点击地址头部的title
  handleSwitchPickLocation(e) {
    this.setData({
      locationIndex: e.currentTarget.dataset.index
    })
  },

  // 选择的省
  handlePickprovince(e) {
    console.log(e)
    this.setData({
      'form.province': e.currentTarget.dataset.locationId,
      'form.city': '',
      locationIndex: 1
    })

    this.activeProvince()
  },

  // 选择市区
  handlePickCity(e) {
    console.log(e)
    this.setData({
      'form.city': e.currentTarget.dataset.locationId,
      'form.district': '',
      locationIndex: 2
    })

    this.activeAllcity()
  },

  // 选择区
  handlePickDistrict(e) {
    this.setData({
      'form.district': e.currentTarget.dataset.locationId,
    })
    this.activeDistrict()
  },

  // 列表要显示的省份
  activeProvince() {
    let id = this.data.form.province
    let province = this.data.allProvince

    if (id) {
      province.forEach((item, index) => {
        if (item.province_id == id) {
          item.active = true
        } else {
          item.active = false
        }
      })
    } else {
      province.forEach((item, index) => {
        if (index == 0) {
          console.log(index)
          item.active = true
        } else {
          item.active = false
        }
      })

      this.setData({
        'form.city': '',
      })
    }

    this.setData({
      allProvince: province
    })
    this.handleUpDataProvince()
  },

  // 更新s省份显示
  handleUpDataProvince() {
    let province = this.data.allProvince

    province.forEach((item, index) => {
      if (item.active) {
        console.log(item)
        this.setData({
          'form.province': item.province_id,
          'form.provinceName': item.province_name,
          // 'form.city': '',
        })

        this.getcity()
      }
    })
  },

  //  获取市区
  getcity() {
    let params = {
      id: this.data.form.province, //是	int	地区ID
      page: 1, //可选（默认1）	int	页码
      pagesize: 50, //可选（默认10）	int	每页显示的条数
    }
    http.fxGet(api.mobile_apis_getarea, params, res => {
      console.log(res.data.list, '市区列表')
      if (res.code == 2000) {
        this.setData({
          allcity: res.data.list
        })

        this.activeAllcity()
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  // 选中市区
  activeAllcity() {
    let id = this.data.form.city
    let allcity = this.data.allcity
    console.log(id)
    if (id) {
      allcity.forEach((item, index) => {
        if (item.province_id == id) {
          item.active = true
        } else {
          item.active = false
        }
      })
    } else {
      allcity.forEach((item, index) => {
        if (index == 0) {
          console.log(index)
          item.active = true
        } else {
          item.active = false
        }
      })
      this.setData({
        'form.district': '',
      })
    }

    this.setData({
      allcity: allcity
    })

    this.handleUpDataCiy()
  },

  // 更新市显示
  handleUpDataCiy() {
    let allcity = this.data.allcity

    allcity.forEach((item, index) => {
      if (item.active) {
        console.log(item)
        this.setData({
          'form.city': item.province_id,
          'form.cityName': item.province_name,
          // 'form.district': '',
        })

        this.getDistrict() // 获取区
      }
    })
  },

  getDistrict() {
    let params = {
      id: this.data.form.city, //是	int	地区ID
      page: 1, //可选（默认1）	int	页码
      pagesize: 50, //可选（默认10）	int	每页显示的条数
    }
    http.fxGet(api.mobile_apis_getarea, params, res => {
      console.log(res.data.list, '区列表')
      if (res.code == 2000) {
        this.setData({
          allDistrict: res.data.list
        })

        this.activeDistrict()
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  activeDistrict() {
    let id = this.data.form.district
    let district = this.data.allDistrict
    if (id) {
      district.forEach((item, index) => {
        if (item.province_id == id) {
          item.active = true
        } else {
          item.active = false
        }
      })
    } else {
      district.forEach((item, index) => {
        if (index == 0) {
          console.log(index)
          item.active = true
        } else {
          item.active = false
        }
      })
    }

    this.setData({
      allDistrict: district
    })
    this.handleUpDataDistrict()
  },

  // 更新区间显示
  handleUpDataDistrict() {
    let allcity = this.data.allDistrict

    allcity.forEach((item, index) => {
      if (item.active) {
        console.log(item)
        this.setData({
          'form.district': item.province_id,
          'form.districtName': item.province_name,
        })
      }
    })
  },

  // 获取省份
  getProvince() {
    let params = {
      id: 1, //是	int	地区ID
      page: 1, //可选（默认1）	int	页码
      pagesize: 50, //可选（默认10）	int	每页显示的条数
    }
    http.fxGet(api.mobile_apis_getarea, params, res => {
      console.log(res.data.list, '省份列表')
      if (res.code == 2000) {
        this.setData({
          allProvince: res.data.list
        })

        this.activeProvince()
      } else {
        utils.showToast(res.msg)
      }
    })
  },

  //从修改地址来的-- 获取地址信息
  getAddressInfo() {
    http.fxGet(api.mobile_apis_editmyaddress, {
      aid: this.data.form.aid
    }, res => {
      console.log(res, '地址详情')
      if (res.code == 2000) {
        this.setData({
          'form.name': res.data.consignee, //是	int	联系人
          'form.mobile': res.data.mobile, // 手机
          'form.province': res.data.province, //是	int	省ID
          'form.city': res.data.city, //是	int	城市ID
          'form.district': res.data.district, //是	int	区县ID
          'form.address': res.data.address, //是	int	详细地址
          'form.zipcode': res.data.zipcode, //是	int	邮政编码
          'form.isdefault': res.data.isdefault, //是	int	是否要设为默认地址（1：是，0：否）
        })
        this.getProvince()
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
    console.log(options)
    // 修改地址
    let title = ''
    if (options.type == 'edit') {
      title = '修改地址'
      this.setData({
        'form.aid': options.id
      })
      app.handleTokenCheck().then(() => {
        this.getAddressInfo()
      })
    }

    // 添加地址
    if (options.type == 'add') {
      title = '添加地址'
      this.getProvince()
    }
    wx.setNavigationBarTitle({
      title
    })
    this.setData({
      type: options.type
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
    console.log('触底加载')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})