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
const Login = r => require.ensure([], () => r(require('../Login/Login.vue')), 'Login')
// 订单
const OrderList = r => require.ensure([], () => r(require('../Order/OrderList.vue')), 'Order')
const OrderDetail = r => require.ensure([], () => r(require('../Order/OrderDetail.vue')), 'Order')
// 客服
const CustomerMain = r => require.ensure([], () => r(require('../Customer/Main.vue')), 'Customer')
const CustomerFeedback = r => require.ensure([], () => r(require('../Customer/Feedback.vue')), 'Customer')
// 优惠券
const Coupons = r => require.ensure([], () => r(require('../Coupons/List.vue')), 'Coupons')
// 活动
const ReceiveRedBag = r => require.ensure([], () => r(require('../Activity/ReceiveRedBag.vue')), 'Activity')
const Recommend = r => require.ensure([], () => r(require('../Activity/Recommend.vue')), 'Activity')
const RecommendForm = r => require.ensure([], () => r(require('../Activity/RecommendForm.vue')), 'Activity')
const RecommendSuc = r => require.ensure([], () => r(require('../Activity/RecommendSuc.vue')), 'Activity')

// 后台库存及补货管理
const Admin = r => require.ensure([], () => r(require('../Admin/Admin.vue')), 'Admin')
const MyStore = r => require.ensure([], () => r(require('../Admin/MyStore.vue')), 'Admin')
const MyTask = r => require.ensure([], () => r(require('../Admin/MyTask.vue')), 'Admin')
const TaskDetail = r => require.ensure([], () => r(require('../Admin/TaskDetail.vue')), 'Admin')

// 错误页面
const Error = r => require.ensure([], () => r(require('../Error.vue')), 'Error')

const router = new Router({
  base: pageConfig.siteUrl + 'index',
  mode: 'history',
  routes: [
    { name: 'home', path: '', component: Home },
    { name: 'pay', path: '/pay', component: Pay },
    { name: 'paySuc', path: '/pay/success', component: PaySuccess },
    { name: 'login', path: '/login', component: Login },
    { name: 'orderList', path: '/order/list', component: OrderList },
    { name: 'orderDetail', path: '/order/detail', component: OrderDetail },
    { name: 'customerMain', path: '/customer', component: CustomerMain },
    { name: 'customerFeedback', path: '/customer/feedBack', component: CustomerFeedback },
    { name: 'coupons', path: '/coupons', component: Coupons },
    { name: 'receiveRedBag', path: '/activity/receiveRedBag', component: ReceiveRedBag },
    { name: 'recommend', path: '/activity/recommend', component: Recommend },
    { name: 'recommendForm', path: '/activity/recommendForm', component: RecommendForm },
    { name: 'recommendSuc', path: '/activity/recommendSuc', component: RecommendSuc },

    { name: 'admin', path: '/admin', component: Admin },
    { name: 'myStore', path: '/admin/mystore', component: MyStore },
    { name: 'myTask', path: '/admin/mytask', component: MyTask },
    { name: 'taskDetail', path: '/admin/task/:id', component: TaskDetail },

    { name: 'error', path: '/error', component: Error },

    { path: '*', redirect: { name: 'home' } }
  ]
})

// 路由切换时自动滚回顶部
router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0)
  next()
})

export default router
