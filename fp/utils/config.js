//环境
function fxUrl(url) {
  let location = ''
  location = 'http://shandai.zcsoft.net/'

  return location + url
}

// opnid
function openId() {
  return 'wx3bb377c18ef0e023'
}

// 小程序秘钥
function appSecret() {
  return 'f53a0f93bf2d146d02f193d8c99fb05b'
}

// 请求的环境 1为小程序
function request() {
  return '1'
}

module.exports = {
  fxUrl,
  openId,
  appSecret,
  request
}