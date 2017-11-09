const apiMapping = {

  homePage: 'api/shelf/homePage', // 首页数据
  getGoodsByName: 'api/getGoodsByName', // 商品搜索
  getGoodsByType: 'api/getGoodsByType', // 商品分类展示

  shelfRecommend: 'api/shelf/recommendShelf', // 推荐审核
  shelfCategory: 'api/shelf/getCategory', // 货架分类
  getAllArea: 'api/shelf/getAllArea', // 城市列表接口

  orderList: 'api/order/page', // 订单列表
  orderDetail: 'api/order/detail', // 订单详情
  addOrder: 'api/order/addOrder', // 订单提交
  orderStatus: 'api/order/getOrderStatus', // 订单付款结果查询

  userInfo: 'api/user/userInfo', // 用户信息
  userLogin: 'api/user/login', // 短信登录
  sendVerifyCode: 'api/user/sendVerifyCode', // 短信发送
  userFeedback: 'api/user/feedback', // 用户反馈

  couponList: 'api/user/pageCoupon', // 优惠券列表
  availableCouponList: 'api/user/getAvailableCoupon',  // 可用的优惠券

  getSign: 'api/wx/getSign', // 获取微信签名
  getOrderSign: 'api/order/signOrder', // 获取微信订单签名
  getShelfShare: 'api/shelf/share',  // 获得货架分享

  getOrderShare: 'api/activity/orderShare'  // 获取红包分享
}

export default {
  getUrl: function (apiKey) {
    return pageConfig.siteUrl + apiMapping[apiKey]
  }
}
