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
// 个人中心
const My = r => require.ensure([], () => r(require('../My/My.vue')), 'My')
// 充值
const Recharge = r => require.ensure([], () => r(require('../Recharge/Recharge.vue')), 'Recharge')
const RechargeList = r => require.ensure([], () => r(require('../Recharge/RechargeList.vue')), 'Recharge')
const Agreement = r => require.ensure([], () => r(require('../Recharge/Agreement.vue')), 'Recharge')
// 订单
const OrderList = r => require.ensure([], () => r(require('../Order/OrderList.vue')), 'Order')
const OrderDetail = r => require.ensure([], () => r(require('../Order/OrderDetail.vue')), 'Order')
// 客服
const CustomerMain = r => require.ensure([], () => r(require('../Customer/Main.vue')), 'Customer')
const CustomerFeedback = r => require.ensure([], () => r(require('../Customer/Feedback.vue')), 'Customer')
const Wish = r => require.ensure([], () => r(require('../Customer/Wish.vue')), 'Customer')
// 优惠券
const Coupons = r => require.ensure([], () => r(require('../Coupons/List.vue')), 'Coupons')
// 线下优惠券
const OfflineCoupon = r => require.ensure([], () => r(require('../Offline/Coupon.vue')), 'OfflineCoupon')
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
const HandleTask = r => require.ensure([], () => r(require('../Admin/HandleTask.vue')), 'Admin')
const AdminFeedback = r => require.ensure([], () => r(require('../Admin/Feedback.vue')), 'Admin')

// 错误页面
const Error = r => require.ensure([], () => r(require('../Error.vue')), 'Error')

const router = new Router({
  base: pageConfig.siteUrl + 'index',
  mode: 'history',
  routes: [
     // 主页
    { name: 'home', path: '', component: Home },
    // 支付
    { name: 'pay', path: '/pay', component: Pay },  
    { name: 'paySuc', path: '/pay/success', component: PaySuccess },
    // 验证码
    { name: 'login', path: '/login', component: Login },
    // 个人中心
    { name: 'my', path: '/my', component: My },
    // 充值
    { name: 'recharge', path: '/recharge', component: Recharge }, 
    { name: 'rechargeList', path: '/recharge/list', component: RechargeList },
    { name: 'agreement', path: '/recharge/agreement', component: Agreement },
    // 订单
    { name: 'orderList', path: '/order/list', component: OrderList },
    { name: 'orderDetail', path: '/order/detail', component: OrderDetail },
    // 客服
    { name: 'customerMain', path: '/customer', component: CustomerMain }, 
    { name: 'customerFeedback', path: '/customer/feedBack', component: CustomerFeedback }, // 客服
    { name: 'wish', path: '/customer/wish', component: Wish },
    // 优惠券
    { name: 'coupons', path: '/coupons', component: Coupons },
    // 线下优惠券
    { name: 'offlineCoupon', path: '/offline/coupon', component: OfflineCoupon },
    // 活动
    { name: 'receiveRedBag', path: '/activity/receiveRedBag', component: ReceiveRedBag },
    { name: 'recommend', path: '/activity/recommend', component: Recommend },
    { name: 'recommendForm', path: '/activity/recommendForm', component: RecommendForm },
    { name: 'recommendSuc', path: '/activity/recommendSuc', component: RecommendSuc },
    
    // 后台库存及补货管理
    { name: 'admin', path: '/admin', component: Admin },
    { name: 'myStore', path: '/admin/mystore', component: MyStore },
    { name: 'myTask', path: '/admin/mytask', component: MyTask },
    { name: 'taskDetail', path: '/admin/task/:id', component: TaskDetail },
    { name: 'handleTask', path: '/admin/handle/:taskId/:taskType', component: HandleTask },
    { name: 'adminFeedback', path: '/admin/feedBack', component: AdminFeedback },
    
    // 错误页面
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
