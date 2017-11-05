const weixinUploadPic = {
  localIds: [],
  serverIds: [],
  selectedPic: function (callback, limitPicCount) {
    const self = this
    wx.ready(function () {
      // 5 图片接口
      // 5.1 拍照、本地选图
      const picCount = (limitPicCount || 3) - self.serverIds.length
      wx.chooseImage({
        count: picCount,
        sourceType: ['album', 'camera'],
        success: function (res) {
          self.localIds = res.localIds
          if (self.localIds.length > 0) {
            self.uploadPic(callback)
          }
        },
        error: function (res) {}
      })
    })
    wx.error(function (res) {
      // dialog.alert(res, {})
    })
  },
  uploadPic: function (callback) {
    const self = this
    const imagesLocalId = self.localIds.pop()
    wx.uploadImage({
      localId: imagesLocalId,
      success: function (res) {
        self.serverIds.push(res && res.serverId)
        callback && callback(imagesLocalId, res.serverId)
        if (self.localIds.length > 0) {
          setTimeout(function () {
            self.uploadPic(callback)
          }, 100)
        }
      },
      fail: function (res) {
        // dialog.Alert(res.message, {})
      }
    })
  },
  previewImages: function (cur, urls) {
    wx.previewImage({
      current: cur || '',
      urls: urls
    })
  }
}
export default weixinUploadPic
