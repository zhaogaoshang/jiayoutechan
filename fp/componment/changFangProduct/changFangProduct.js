// componment/changFangProduct/changFangProduct.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 商品
    item: {
      type: Object,
      value: {}
    }
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
    handleGoProduct(e) {
      let id = e.currentTarget.dataset.id
      this.triggerEvent('handleGoProduct', {
        id
      })
    },

    handlePrevent() {
      return
    }
  }
})