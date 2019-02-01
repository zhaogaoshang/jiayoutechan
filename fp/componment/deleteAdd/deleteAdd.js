// componment/deleteAdd/deleteAdd.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 现在显示的数量
    count: {
      type: Number,
      value: 1
    },
    // 库存 
    inventoryQuantity: {
      type: Number,
      value: 0
    }
  },

  /**
   * 准备完成
   */
  ready() {
    console.log(this.properties.count)
  },

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

      if (count > 1) {
        this.setData({
          count: count - 1
        })
        this._handleExports()
      }
    },

    // 加法
    handleAdd() {
      let count = this.properties.count // 当前数量
      let inventoryQuantity = this.properties.inventoryQuantity // 库存

      if (count < inventoryQuantity) {
        this.setData({
          count: count + 1
        })
        this._handleExports()
      }
    },

    // 输出的值
    _handleExports(e) {
      console.log('调用')
      this.triggerEvent('handleExportsCount', {
        count: this.properties.count
      })
    }
  },

})