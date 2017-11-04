import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import home from './modules/home'
import order from './modules/order'
import coupons from './modules/coupons'

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
    order: {
      namespaced: true,
      ...order
    },
    coupons: {
      namespaced: true,
      ...coupons
    }
  }
})
