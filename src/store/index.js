import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import user from './modules/user'
import secHouse from './modules/secHouse'
import groupSecHouse from './modules/groupSecHouse'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global: {
      namespaced: true,
      ...global
    },
    user: {
      namespaced: true,
      ...user
    },
    secHouse: {
      namespaced: true,
      ...secHouse
    },
    groupSecHouse: {
      namespaced: true,
      ...groupSecHouse
    }
  }
})
