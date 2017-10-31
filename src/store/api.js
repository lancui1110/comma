const apiMapping = {
  // 用户 api
  userDetail: 'user/detail',
  // 二手房 区域相关 api
  secAreaList: 'area/list',
  secAreaSearch: 'area/estate/search',
  secUserQueryHistory: 'user/estateQueryHistory',
  // 二手房 房源相关 api
  secHouseList: 'house/sell/search',
  secHouseDetail: 'house/sell/detail',
  secHouseQRCode: 'house/qrCode.jpg',
  secHouseLink: 'house/otherHouseUrl',
  secAddRemark: 'house/addUserRemark',
  secUserRemark: 'house/getUserRemark',
  secEstateImg: 'area/estate/img',
  getMemberInfo: 'user/getMemberInfo',
  getEstateTraffic: 'area/estate/traffic',

  secHouseGroupList: 'house/sell/searchGroup'
  // 其他模块的 api 依次加，注意写注释归类就行了
}

export default {
  getUrl: function (apiKey) {
    return pageConfig.siteUrl + apiMapping[apiKey]
  }
}
