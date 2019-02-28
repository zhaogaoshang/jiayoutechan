const config = require('./config.js')
// 当前时间戳
const timestamp = () => {
  return Date.parse(new Date()) / 1000
}

// 生成随机字符串
const randomString = len => {
  len = len || 16
  // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let nonce_str = ''
  for (let i = 0; i < len; i++) {
    nonce_str += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return nonce_str
}

function showToast(title, duration = 1500, icon = 'none') {
  wx.showToast({
    title,
    duration,
    icon
  })
}
// 跳转拦截
function router (url = '/pages/notFound/notFound') {
  wx.navigateTo({
    url
  })
}

module.exports = {
  timestamp,
  randomString,
  showToast,
  imageUrl: config.fxUrl(),
  router
}