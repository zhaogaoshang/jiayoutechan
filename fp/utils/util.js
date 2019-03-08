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

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
  // + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  timestamp,
  randomString,
  showToast,
  formatTime,
  imageUrl: config.fxUrl()
}