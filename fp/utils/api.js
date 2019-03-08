module.exports = {
  // 商品相关
  product_detail: 'mobile/apis/goods.php', // get 产品详情
  mobileapis_supplier_goods: 'mobile/apis/supplier_goods.php', //get 特色店铺
  mobile_apis_mttindex: 'mobile/apis/mttindex.php', // 首页的今日爆款
  mobile_apis_mttindex: 'mobile/apis/mttindex.php', // 新品热销
  mobile_apis_goods: 'mobile/apis/goods.php', // 规格查询
  mobile_apis_category: 'mobile/apis/category.php', // 产品的一级分类
  mobile_apis_search: 'mobile/apis/search.php', // 搜索结果
  mobile_apis_addcollectgoods: "mobile/apis/addcollectgoods.php", //get 添加收藏
  mobile_apis_delcollectgoods: "mobile/apis/delcollectgoods.php", //get 删除收藏 
  mobile_apis_collectgoods: 'mobile/apis/collectgoods.php', // 收藏列表
  mobile_apis_market_list: 'mobile/apis/market_list.php', // 市集
  mobile_apis_market_info: 'mobile/apis/market_info.php', // 市集
  mobile_apis_supplierinfo: 'mobile/apis/supplierinfo.php', // 店铺详情
  mobile_apis_mttindex: 'mobile/apis/mttindex.php', // 广告相关
  mobile_apis_addcomment:'mobile/apis/addcomment.php', // 添加评论
  mobile_apis_comment:'mobile/apis/comment.php', // 评论列表

  // 地址相关
  mobile_apis_searchindex: 'mobile/apis/searchindex.php', //get 全部的
  mobile_apis_getarea: 'mobile/apis/getarea.php', // 获取地址
  mobile_apis_myaddress: 'mobile/apis/myaddress.php', // 获取地址列表
  mobile_apis_editmyaddress: 'mobile/apis/editmyaddress.php', // 获取地址详情
  mobile_apis_delmyaddress: 'mobile/apis/delmyaddress.php', // 删除地址
  mobile_apis_defaultaddress: 'mobile/apis/defaultaddress.php', // 设置默认地址
  mobile_apis_opmyaddress: 'mobile/apis/opmyaddress.php', // 添加，编辑地址
  mobile_apis_getdefaultaddress: 'mobile/apis/getdefaultaddress.php', //获取默认地址

  // 订单 购物车
  mobile_apis_flowCart: 'mobile/apis/flowCart.php', // 加入购物车
  mobile_apis_cartList: 'mobile/apis/cartList.php', // 购物车列表
  mobile_apis_dropCart: 'mobile/apis/dropCart.php', // 删除订单
  mobile_apis_submitOrder: 'mobile/apis/submitOrder.php', // 计算订单
  mobile_apis_dateCartNum: 'mobile/apis/updateCartNum.php', // 修改购物车
  mobile_apis_orderDone: 'mobile/apis/orderDone.php', //提交订单
  mobile_apis_order_list: 'mobile/apis/orderList.php', // 订单列表接口
  mobile_apis_order_list1: 'mobile/apis/order_list.php', // 订单列表接口 暂未使用
  mobile_apis_order_info:'mobile/apis/order_info.php', // 订单信息
  mobile_apis_order_express: 'mobile/apis/kuaidiapi.php', // 物流信息
  mobile_apis_order_confirm: 'mobile/apis/update_order_affirm.php', // 确认收货
  mobile_apis_order_commentlist: '/mobile/apis/comment_list.php', // 待评价列表
  mobile_apis_order_addcomment: '/mobile/apis/addcomment.php', // 添加评价

  // 人相关
  mobile_apis_share: 'mobile/apis/share.php', // 绑定分享人关系
  mobile_apis_share_list: 'mobile/apis/share_list.php', // 查修我的分享
  mobile_apis_login: 'mobile/apis/login.php',
  mobile_apis_getTokenInfo: 'mobile/apis/getTokenInfo.php', // 验证是否过期
  mobile_apis_share_erweima: 'mobile/apis/share_erweima.php', // 生成二维码

  // 支付
  mobile_apis_payment: '/mobile/apis/orderPay.php'
}