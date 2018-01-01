import API from '../api'

const state = {
  notifyUserLogin: false,
  user: null
}

const actions = {
  getUserInfo ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('userInfo')
    }).then(res => {
      if (res.code === 1) {
        commit('setUser', res.data)
        // 打开商品主页，判断用户是否首次登录（判断逻辑：当前登录微信号和手机号未绑定）如首次登录：则在购物车条形栏上方，显示文案，5秒钟自动消失；非首次登录不显示
        if (!res.data || !res.data.mobile) {
          commit('setNotifyUserLogin', true)
          setTimeout(() => {
            commit('setNotifyUserLogin', false)
          }, 5000)
        }
      }
      cb && cb()
    })
  },
  userLogin ({ commit }, { mobile, code, cb }) {
    iwjw.ajax({
      url: API.getUrl('userLogin'),
      data: { mobile, code },
      method: 'POST'
    }).then(res => {
      if (res.code === 1) {
        commit('setUser', Object.assign({}, state.user, res.data))
      }
      cb && cb(res)
    })
  },
  // 发短信获取验证码
  sendVerifyCode ({ commit }, { mobile, cb }) {
    iwjw.ajax({
      url: API.getUrl('sendVerifyCode'),
      data: { mobile }
    }).then(res => {
      cb && cb(res)
    })
  }
}

const mutations = {
  setNotifyUserLogin (state, payload) {
    state.notifyUserLogin = payload
  },
  setUser (state, payload) {
    state.user = Object.assign({}, payload)
  }
}

const getters = {
  notifyUserLogin (state) {
    return state.notifyUserLogin
  },
  getUser (state) {
    // state.user = {mobile: ''}
    return state.user
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
