import API from '../../store/api'

const weixin = {
  init: function (opt) {
    opt = opt || ''
    // const url = 'http://weixinentbeta.iwjwagent.com:8134/main/getSign'
    const url = API.getUrl('getSign')
    
    iwjw.ajax({
      url: url,
      data: {
        url: location.href.split('#')[0]
      }
    }).then(res => {
      console.log(res)
      if (res && res.code === 1) {
        wx.config({
          debug: false,
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
          ]
        })

        wx.ready(function () {
          let config = Object.assign(
            {},
            {
              title: '逗号mini',
              link: window.pageConfig.mobileSiteUrl,
              type: 'link',
              imgUrl: window.pageConfig.staticUrl + 'common/img/logo_wx.png',
              desc: '逗号mini',
              dataUrl: ''
            },
            opt
          )
          wx.onMenuShareTimeline({
            title: config.title,
            link: config.link,
            imgUrl: config.imgUrl,
            type: config.type
          })
          wx.onMenuShareAppMessage({
            title: config.title,
            desc: config.desc,
            link: config.link,
            imgUrl: config.imgUrl,
            type: config.type,
            dataUrl: config.dataUrl
          })
        })
        wx.error(function (err) {
          console.log(err.errMsg)
        })
      }
    }).then(err => {
      console.log(JSON.stringify(err))
    })
  },
  weixinPay: (wxPayParams, cb) => {
    const onBridgeReady = () => {
      WeixinJSBridge.invoke('getBrandWCPayRequest', wxPayParams, (res) => {
        cb && cb(res)
      })
    }
  
    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
      }
    } else {
      onBridgeReady()
    }
  }
}

export default weixin
