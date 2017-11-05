import './global/style/reset.css'
import './global/iconfont/iconfont.css'
// import 'element-ui/lib/theme-default/icon.css'
import 'nprogress/nprogress.css'

import { app, store, router } from './App.js'

router.beforeEach((route, redirect, next) => {
  store.dispatch('global/gProgress', 0)
  next()
})

router.afterEach((to, from) => {
  store.dispatch('global/gProgress', 100)
})

router.onReady(() => {
  app.$mount('#app')
})
