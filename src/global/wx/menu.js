import API from '../../store/api'
import weixin from './wxsa'

const menu = {
  share: function (data = {}) {
    const self = this
    iwjw.ajax({
      url: API.getUrl('getShelfShare'),
      data: data
    }).then(res => {
      if (res && res.code === 1) {
        const shareConfig = {
          title: res.data.title,
          desc: res.data.desc,
          imgUrl: res.data.imgUrl,
          link: res.data.link
        }
        
        weixin.init({
          cb: () => { self.friend(shareConfig) }
        })
      }
    })
  },
  friend: function (param) {
    wx.ready(function () {
      wx.checkJsApi({
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
          var defaultParam = {
            title: document.title,
            desc: location.href,
            link: location.href,
            imgUrl: window.pageConfig.staticUrl + require('./wx_logo.png'),
            trigger: function (t) {},
            complete: function (t) {},
            success: function (t) {
              // smallnote('分享成功')
            },
            cancel: function (t) {},
            fail: function (t) {
              alert(t)
            }
          }
          param = Object.assign({}, defaultParam, param)

          wx.onMenuShareAppMessage(param)
          wx.onMenuShareTimeline(param)
        }
      })
    })
  },
  showShareMenu: function (hideMenu) {
    wx.ready(function () {
      wx.hideMenuItems({
        menuList: hideMenu || ['menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp'] // 要隐藏的菜单项，所有menu项见附录3
      })
    })
  },
  registerUrl: function (url, callback, name) {
    let data = {}
    data.currentUrl = url
    if (name) {
      data.app = name
    }
    iwjw.ajax({
      url: pageConfig.siteUrl + 'main/getSign',
      data: data,
      success: function (res) {
        var defaultConfig = {
          debug: false,
          jsApiList: [
            'hideMenuItems',
            'showMenuItems',
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'chooseImage',
            'uploadImage',
            'previewImage'
          ]
        }
        let config
        res && res.data && (config = Object.assign({}, defaultConfig, res.data))
        config && wx.config(config)
        callback && callback()
      },
      error: function () {
        // smallnote('微信注册url服务报错')
      }
    })
  }
}
export default menu
