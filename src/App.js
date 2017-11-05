import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import { Loadmore } from 'mint-ui'
// import * as filters from './filters'

sync(store, router)
Vue.component(Loadmore.name, Loadmore)

// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

export { app, router, store }
