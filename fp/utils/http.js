'use strict';
const util = require('./util.js')
const config = require('./config.js')
const CryptoJS = require('cryptojs/cryptojs.js').Crypto;

// 每个请求自动添加系统级参数
function appendSystemParams() {
  const t = util.timestamp()
  const s = util.randomString(16)

  return {
    request: config.request(),
    timestamp: t,
    nonce_str: s,
    sign: buildSign(t, s)
  }
}

// 生成验证请求签名extConfig
function buildSign(timestamp, nonce_str) {
  const params = {
    request: config.request, // 请求的环境 1为小程序
    timestamp: timestamp, // 当前时间
    nonce_str: nonce_str // 随机字符串
  };

  const keys = Object.keys(params);
  keys.sort();

  const param_ary = [];
  for (let i = 0; i < keys.length; i++) {
    param_ary.push(keys[i] + '=' + params[keys[i]]);
  }
  return CryptoJS.SHA1(param_ary.join('&') + config.appSecret).toString();
}

// 请求头部信息
function fxHeader(content_type) {
  let header = {}
  let jwt = wx.getStorageSync('userInfo')
  // 请求内部类型
  if (content_type) {
    header['content_type'] = content_type
  }
  // 验证是否存在token
  if (jwt && jwt.session3rd) {
    header['Authorization'] = jwt.session3rd
  }
  return header
}

// Get请求
function fxGet(url, data = {}, cb) {
  wx.request({
    url: config.fxUrl(url),
    data: {
      ...data,
      // ...appendSystemParams()
    },
    method: 'GET',
    dataType: 'JSON',
    header: fxHeader(),
    success(res) {
      if (res.statusCode == 401) {}
      return typeof cb == 'function' && cb(JSON.parse(res.data))
    },
    fail(res) {
      return typeof cb == 'function' && cb(false)
    }
  })
}

// post请求
function fxPost(url, data = {}, cb) {
  console.log(...data)
  wx.request({
    url: config.fxUrl(url),
    data: {
      ...data,
      // ...appendSystemParams()
    },
    header: fxHeader('application/json'),
    method: 'POST',
    success(res) {
      return typeof cb == 'function' && cb(res.data)
    },
    fail() {
      wx.hideNavigationBarLoading()
      return typeof cb == 'function' && cb(false)
    }
  })
}

// delete请求
function fxDelete(url, data = {}, cb) {
  wx.request({
    url: config.fxUrl(url),
    data: {
      ...data,
      ...appendSystemParams()
    },
    header: fxHeader('application/json'),
    method: 'DELETE',
    success(res) {
      return typeof cb == 'function' && cb(JSON.parse(res.data))
    },
    fail() {
      wx.hideNavigationBarLoading()
      return typeof cb == 'function' && cb(false)
    }
  })
}

// put请求
function fxPut(url, data = {}, cb) {
  wx.request({
    url: config.fxUrl(url),
    data: {
      ...data,
      ...appendSystemParams()
    },
    header: fxHeader('application/json'),
    method: 'PUT',
    success(res) {
      return typeof cb == 'function' && cb(JSON.parse(res.data))
    },
    fail() {
      wx.hideNavigationBarLoading()
      return typeof cb == 'function' && cb(false)
    }
  })
}

// Upload请求
function fxUpload(url, tempFile, data = {}, cb) {
  let formData = {
    ...data,
    ...appendSystemParams()
  }

  const uploadTask = wx.uploadFile({
    url: config.fxUrl(url),
    filePath: tempFile,
    name: 'file',
    formData: formData,
    header: fxHeader(),
    success: (res) => {
      let result_data = JSON.parse(JSON.parse(res.data))
      return typeof cb == 'function' && cb(result_data)
    },
    fail(res) {
      return typeof cb == 'function' && cb(false)
    }
  })

  return uploadTask
}

module.exports = {
  fxGet,
  fxPost,
  fxPut,
  fxDelete,
  fxUpload
}