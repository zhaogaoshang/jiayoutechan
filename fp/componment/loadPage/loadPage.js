// componment/loadPage/loadPage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: true
    },
    time: {
      type: Number,
      value: 500
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready() {
    setTimeout(res => {
      this.handleHidLoadPage()
    }, this.properties.time)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleHidLoadPage() {
      this.setData({
        isShow: false
      })
    }
  }
})