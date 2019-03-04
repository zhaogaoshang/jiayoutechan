// componment/oblongProduct/oblongProduct.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //产品的详情
    item: {
      type: Object,
      value: {}
    },
    // 产品图片的的高
    imgH: {
      type: Number,
      value: 150
    },
    // 产品图片的的宽
    imgW: {
      type: Number,
      value: 150
    },
    // 是否包邮
    freeFreight: {
      type: Boolean,
      value: false
    },
    // 包邮是否显示
    isShowFreeFreight: {
      type: Boolean,
      value: true
    },
    // 是否显示分享
    isShowShare: {
      type: Boolean,
      value: false
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

  }
})