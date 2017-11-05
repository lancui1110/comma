const apiMapping = {
  signUp: 'user/recommend',
  loginQRCode: 'login/getQRCode.jpg',
  checkLogin: 'login/checkLogin.json'
  
}

export default {
  getUrl: function (apiKey) {
    return pageConfig.siteUrl + apiMapping[apiKey]
  }
}
