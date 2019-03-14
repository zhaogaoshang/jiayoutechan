// componment/changFangProduct/changFangProduct.js
const app = getApp()
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

    // 操作喜欢
    handleCollected() {
      let isCollected = this.data.item.is_collected
      if (isCollected == 0) {
        app.handleAddCollect(this.data.item.goods_id)
      } else {
        app.handleDeleteCollect(this.data.item.goods_id)
      }
      this.setData({
        'item.is_collected': isCollected == 0 ? 1 : 0
      })
    },

    handlePrevent() {
      return
    }
  },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function (e) {
  //   console.log(3333)
  //   return false
  //   if (e.from == "menu") {
  //     return app.handleShareApp()
  //   }

  //   if (e.from == "button") {
  //     let titlt = e.target.dataset.title
  //     let url = utils.imageUrl + e.target.dataset.image
  //     let id = e.target.dataset.id

  //     if (e.target.dataset.product) {
  //       return app.handleShareProduct(titlt, url, id)
  //     }

  //     if (e.target.dataset.gather) {
  //       return app.handleShareGather(titlt, url, id)
  //     }

  //   }
  // }


})