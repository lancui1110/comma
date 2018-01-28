import API from '../../store/api'
import weixin from './wxsa'
import utils from '../utils'

const menu = {
  // type=1 一般分享 type=2&orderNum 抢红包 type=3 申请货架
  share: function (data = {}, cb) {
    const self = this
    iwjw.ajax({
      url: API.getUrl('getWxShare'),
      data: data
    }).then(res => {
      if (res && res.code === 1) {
        if (utils.isAlipay()) {
          // 让 后端再 html 里面加这几个
          const titleElm = document.getElementsByTagName('meta')['Alipay:title']
          const descElm = document.getElementsByTagName('meta')['Alipay:desc']
          const imgUrlElm = document.getElementsByTagName('meta')['Alipay:imgUrl']
          const linkElm = document.getElementsByTagName('meta')['Alipay:link']
          if (titleElm) {
            titleElm.content = res.data.title
          }
          if (descElm) {
            descElm.content = res.data.desc
          }
          if (imgUrlElm) {
            imgUrlElm.content = res.data.imgUrl
          }
          if (linkElm) {
            linkElm.content = res.data.link
          }

          // AlipayJSBridge.call('startShare', {
          //   // 当用户选择该数组内指定的分享渠道时，仅返回渠道名，而不是真正开始自动分享
          //   'onlySelectChannel': ['Weibo', 'ALPContact', 'ALPTimeLine', 'SMS', 'Weixin', 'WeixinTimeLine', 'QQ', 'QQZone', 'DingTalkSession', 'OpenInSafari', 'Favorite']
          // }, (data) => {
          //   // 通过onlySelectChannel屏蔽掉自动分享功能后，自行调用shareToChannel接口进行单独分享
          //   AlipayJSBridge.call('shareToChannel', {
          //     name: data.channelName,
          //     param: {
          //       contentType: 'url',    // 选填，目前支持支持"auto",text","image","url"格式（android分享组件不支持auto）
          //       title: res.data.title,
          //       content: res.data.desc,
          //       iconUrl: res.data.imgUrl,
          //       imageUrl: res.data.imgUrl,
          //       captureScreen: false, // 是否分享当前页面的截图
          //       url: res.data.link
          //     }
          //   }, (result) => {
          //     console.log(result)
          //   })
          // })

          // const shareConfig = {
          //   title: res.data.title,
          //   content: res.data.desc,
          //   url: res.data.link,
          //   image: res.data.imgUrl
          // }
          // // 下面这个，应该放到某个回调里面，不然一开始就出来了，然而文档没找到
          // ap.share(shareConfig, (result) => {
          //   // ap.alert(result.shareResult)
          // })
        } else {
          const shareConfig = {
            title: res.data.title,
            desc: res.data.desc,
            imgUrl: res.data.imgUrl,
            link: res.data.link
          }
          weixin.init({
            cb: () => {
              self.friend(shareConfig)
            }
          })
        }
      }
      cb && cb(res)
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
  }
}
export default menu
