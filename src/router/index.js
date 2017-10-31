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
// const About = r => require.ensure([], () => r(require('../About/About.vue')), 'About')
// const SecHouse = r => require.ensure([], () => r(require('../SecHouse/SecHouse.vue')), 'SecHouse')
// const SecHouseGroup = r => require.ensure([], () => r(require('../SecHouse/GroupList/SecHouse.vue')), 'SecHouseGroup')

const router = new Router({
  base: pageConfig.siteUrl,
  mode: 'history',
  routes: [
    { name: 'home', path: '', component: Home },
    // { name: 'about', path: '/about', component: About },
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
