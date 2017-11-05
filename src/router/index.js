import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'

Vue.use(Router)

// const guardRoute = (to, from, next) => {
//   const user = store.getters['user/getUser']
//   if (user) {
//     next()
//   } else {
//     store.dispatch('user/getUserInfo', next)
//   }
// }

// 以后新增模块后者新增页面，都直接在这下面加，然后加相应的路由
const Home = r => require.ensure([], () => r(require('../Home/Home.vue')), 'Home')
// 支付
const Pay = r => require.ensure([], () => r(require('../Pay/BeforePay.vue')), 'Pay')
const PaySuccess = r => require.ensure([], () => r(require('../Pay/PaySuccess.vue')), 'Pay')
// 验证码
const VerificationCode = r => require.ensure([], () => r(require('../Pay/VerificationCode.vue')), 'Pay')
// 订单
const OrderList = r => require.ensure([], () => r(require('../Order/OrderList.vue')), 'Order')
const OrderDetail = r => require.ensure([], () => r(require('../Order/OrderDetail.vue')), 'Order')
// 客服
const CustomerMain = r => require.ensure([], () => r(require('../Customer/Main.vue')), 'Customer')
const CustomerFeedback = r => require.ensure([], () => r(require('../Customer/Feedback.vue')), 'Customer')
// 优惠券
const Coupons = r => require.ensure([], () => r(require('../Coupons/List.vue')), 'Coupons')

const router = new Router({
  base: pageConfig.siteUrl + 'index',
  mode: 'history',
  routes: [
    { name: 'home', path: '', component: Home },
    { name: 'pay', path: '/pay', component: Pay },
    { name: 'paySuc', path: '/pay/success', component: PaySuccess },
    { name: 'veriCode', path: '/pay/verificationCode', component: VerificationCode },
    { name: 'orderList', path: '/order/list', component: OrderList },
    { name: 'orderDetail', path: '/order/detail', component: OrderDetail },
    { name: 'customerMain', path: '/customer', component: CustomerMain },
    { name: 'customerFeedback', path: '/customer/feedBack', component: CustomerFeedback },
    { name: 'coupons', path: '/coupons', component: Coupons },
    // { name: 'sec_house', path: '/sale', component: SecHouse, beforeEnter: guardRoute },
    // { name: 'sec_house_group', path: '/sale/group', component: SecHouseGroup, beforeEnter: guardRoute },

    { path: '*', redirect: { name: 'home' } }
  ]
})

// 路由切换时自动滚回顶部
router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0)
  next()
})

export default router
