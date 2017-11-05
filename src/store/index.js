import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import home from './modules/home'
import user from './modules/user'
import order from './modules/order'
import coupons from './modules/coupons'
import customer from './modules/customer'
import pay from './modules/pay'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global: {
      namespaced: true,
      ...global
    },
    home: {
      namespaced: true,
      ...home
    },
    user: {
      namespaced: true,
      ...user
    },
    order: {
      namespaced: true,
      ...order
    },
    coupons: {
      namespaced: true,
      ...coupons
    },
    customer: {
      namespaced: true,
      ...customer
    },
    pay: {
      namespaced: true,
      ...pay
    }
  }
})
