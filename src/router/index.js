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

const Pay = r => require.ensure([], () => r(require('../Pay/BeforePay.vue')), 'Pay')
const PaySuccess = r => require.ensure([], () => r(require('../Pay/PaySuccess.vue')), 'Pay')

const OrderList = r => require.ensure([], () => r(require('../Order/OrderList.vue')), 'Order')
const OrderDetail = r => require.ensure([], () => r(require('../Order/OrderDetail.vue')), 'Order')

const router = new Router({
  base: pageConfig.siteUrl,
  mode: 'history',
  routes: [
    { name: 'home', path: '', component: Home },
    { name: 'pay', path: '/pay', component: Pay },
    { name: 'paySuc', path: '/paySuc', component: PaySuccess },
    { name: 'orderList', path: '/orderList', component: OrderList },
    { name: 'orderDetail', path: '/orderDetail', component: OrderDetail },
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
