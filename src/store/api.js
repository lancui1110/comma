const apiMapping = {

  homeCalculateCart: 'home/calculateCart',
  homeBannerList: 'home/getBannerList',
  homeGoodsList: 'home/getGoodsList',
  homePopup: 'home/getPop',
  userBuySpecialIds: 'v2/api/addOrder/getUserBuySpecialGoodsIds',

  homePage: 'api/shelf/homePage', // 首页数据
  // getGoodsByName: 'api/getGoodsByName', // 商品搜索
  // getGoodsByType: 'api/getGoodsByType', // 商品分类展示
  // getGoodsByIds: 'api/getGoodsByIds', // 商品信息获取
  // findProductByQrCode: 'api/findProductByQrCode', // 扫码二维码找商品
  getGoodsByIds: 'v2/api/goods/getGoodsByIds', // 商品信息获取
  findProductByQrCode: 'v2/api/goods/findProductByQrCode', // 扫码二维码找商品

  shelfRecommend: 'api/shelf/recommendShelf', // 推荐审核
  shelfCategory: 'api/shelf/getCategory', // 货架分类
  getAllArea: 'api/shelf/getAllArea', // 城市列表接口

  orderList: 'api/order/page', // 订单列表
  orderDetail: 'api/order/detail', // 订单详情
  // addOrder: 'api/order/addOrder', // 订单提交
  addOrder: 'v2/api/addOrder/goods', // 订单提交
  orderStatus: 'api/order/getOrderStatus', // 订单付款结果查询

  userInfo: 'api/user/userInfo', // 用户信息
  userLogin: 'api/user/login', // 短信登录
  sendVerifyCode: 'api/user/sendVerifyCode', // 短信发送

  feedbackPhone: 'api/feedBack/phone', // 获取反馈电话
  feedbackSubmit: 'api/feedBack/submit', // 提交反馈
  feedbackSubmitWant: 'api/feedBack/submitWant', // 提交许愿

  couponList: 'api/user/pageCoupon', // 优惠券列表
  availableCouponList: 'api/user/getAvailableCoupon',  // 可用的优惠券

  getSign: 'api/wx/getSign', // 获取微信签名
  getOrderSign: 'api/order/signOrder', // 获取微信订单签名
  getWxShare: 'api/wx/share',  // 获得微信分享init信息

  getOrderShare: 'api/activity/orderShare',  // 获取红包分享
  scanCouponActivity: 'api/activity/scanCouponActivity',  // 线下扫码领券

  addRecharge: 'v2/api/addOrder/deposit/', // 支付充值 :注意这个是动态 url, /:activityId
  rechargeList: 'api/deposit/pageSuccessOrder',  // 充值记录（成功）
  getDepositListActivity: 'api/deposit/listActivity',  // 获取充值活动

  // admin
  pageTask: 'm/shelfTask/pageTask',
  taskDetail: 'm/shelfTask/taskDetail',
  showTask: 'm/shelfTask/showTask',
  submitTask: 'm/shelfTask/submitTask/',  // 注意这个是动态 url
  supplementTask: 'm/shelfTask/supplement/',  // 注意这个是动态 url
  adminOverview: 'm/shelfTask/overview'
}

export default {
  getUrl: function (apiKey, addon) {
    return pageConfig.siteUrl + apiMapping[apiKey] + (addon || '')
    // return 'http://wx.isfeel.cn/' + apiMapping[apiKey] + (addon || '')
  }
}
