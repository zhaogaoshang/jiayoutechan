function fxUrl () {
  // 获取第三方平台自定义的数据字段  
  let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
  console.log(wx.getExtConfigSync)
}

// Get请求
function fxGet(url, data = {}, cb) {
  wx.request({
    url: fxUrl(url),
    data: {
      ...data,
      ...appendSystemParams()
    },
    method: 'GET',
    header: fxHeader(),
    success(res) {
      if (res.statusCode == 401) {
      }
      return typeof cb == 'function' && cb(res.data)
    },
    fail(res) {
      return typeof cb == 'function' && cb(false)
    }
  })
}


// post请求
function fxPost(url, data = {}, cb) {
  wx.request({
    url: fxUrl(url),
    data: {
      ...data,
      ...appendSystemParams()
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
    url: fxUrl(url),
    data: {
      ...data,
      ...appendSystemParams()
    },
    header: fxHeader('application/json'),
    method: 'DELETE',
    success(res) {
      return typeof cb == 'function' && cb(res.data)
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
    url: fxUrl(url),
    data: {
      ...data,
      ...appendSystemParams()
    },
    header: fxHeader('application/json'),
    method: 'PUT',
    success(res) {
      return typeof cb == 'function' && cb(res.data)
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
    url: fxUrl(url),
    filePath: tempFile,
    name: 'file',
    formData: formData,
    header: fxHeader(),
    success: (res) => {
      let result_data = JSON.parse(res.data)
      return typeof cb == 'function' && cb(result_data)
    },
    fail(res) {
      return typeof cb == 'function' && cb(false)
    }
  })

  return uploadTask
}