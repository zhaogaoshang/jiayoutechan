// componment/deleteAdd/deleteAdd.js
const app = getApp() //获取应用实例
const http = require('../../utils/http.js')
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 现在显示的数量
    sku: {
      type: String,
      value: ''
    },
    // 现在显示的数量
    count: {
      type: Number,
      value: 1
    },
    // 库存 
    inventoryQuantity: {
      type: Number,
      value: 9999999
    },

    rec_id: {
      type: String,
      value: ''
    }
  },

  /**
   * 准备完成
   */
  ready() {},

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 减法
    handleDelete() {
      let count = this.properties.count // 当前数量
      let inventoryQuantity = this.properties.inventoryQuantity // 库存
      let params = {
        rec_id: this.properties.rec_id,
        number: count - 1,
        goods_id: this.properties.sku
      }

      if (count > 1) {
        http.fxGet(api.mobile_apis_dateCartNum, params, res => {
          console.log(res, '增加商品')
          if (res.code == 2000) {
            this.setData({
              count: count - 1
            })
            this._handleExports()
          } else {
            utils.showToast(res.msg)
          }
        })
      }
    },

    // 加法
    handleAdd() {
      let count = this.properties.count // 当前数量
      let inventoryQuantity = this.properties.inventoryQuantity // 库存
      let params = {
        rec_id: this.properties.rec_id,
        number: count + 1,
        goods_id: this.properties.sku
      }

      http.fxGet(api.mobile_apis_dateCartNum, params, res => {
        console.log(res,'增加商品')
        if (res.code == 2000) {
            this.setData({
              count: count + 1
            })
          console.log(count + 1)
            this._handleExports()
        } else {
          utils.showToast(res.msg)
        }
      })
    },

    // 输出的值
    _handleExports(e) {
      this.triggerEvent('handleExportsCount', {
        count: this.properties.count,
        sku: this.properties.sku,
        rec_id: this.properties.rec_id
      })
    }
  },

  // 返回
  handleNull() {
    return
  }

})