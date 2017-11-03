import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import order from './modules/order'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global: {
      namespaced: true,
      ...global
    },
    order: {
      namespaced: true,
      ...order
    }

  }
})
