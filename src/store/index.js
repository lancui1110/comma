import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import home from './modules/home'
import user from './modules/user'
import recharge from './modules/recharge'
import order from './modules/order'
import coupons from './modules/coupons'
import customer from './modules/customer'
import activity from './modules/activity'
import pay from './modules/pay'
import admin from './modules/admin'

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
    recharge: {
      namespaced: true,
      ...recharge
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
    activity: {
      namespaced: true,
      ...activity
    },
    pay: {
      namespaced: true,
      ...pay
    },
    admin: {
      namespaced: true,
      ...admin
    }
  }
})
