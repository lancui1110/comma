export default {
  removeReferer: () => {
    const meta = document.createElement('meta')
    meta.name = 'referrer'
    meta.content = 'no-referrer'
    document.getElementsByTagName('head')[0].appendChild(meta)
  },

  getScrollbarWidth: () => {
    const outer = document.createElement('div')
    outer.style.visibility = 'hidden'
    outer.style.width = '100px'
    document.body.appendChild(outer)
    const widthNoScroll = outer.offsetWidth
    // force scrollbars
    outer.style.overflow = 'scroll'
    // add innerdiv
    const inner = document.createElement('div')
    inner.style.width = '100%'
    outer.appendChild(inner)
    const widthWithScroll = inner.offsetWidth
    // remove divs
    outer.parentNode.removeChild(outer)
    return widthNoScroll - widthWithScroll
  },
  getUserAgent () {
    return window.navigator.userAgent.toLowerCase()
  },
  // 判断是微信app的浏览器
  isWeixin () {
    const ua = this.getUserAgent()
    return (ua.match(/MicroMessenger/i) == 'micromessenger')
  },
  // 判断是支付宝app的浏览器
  isAlipay () {
    const ua = this.getUserAgent()
    return (ua.match(/Alipay/i) == 'alipay')
  }

}
