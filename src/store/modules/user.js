import API from '../api'

const state = {
  user: null
}

const actions = {
  getUserInfo ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('userInfo')
    }).then(res => {
      if (res.code === 1) {
        commit('setUser', res.data)
      }
      cb && cb()
    })
  },
  userLogin ({ commit }, { mobile, code, cb }) {
    iwjw.ajax({
      url: API.getUrl('userLogin'),
      data: { mobile, code }
    }).then(res => {
      if (res.code === 1) {
        commit('setUser', Object.assign({}, state.user, res.data))
      }
      cb && cb()
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
  setUser (state, payload) {
    state.user = payload
  }
}

const getters = {
  getUser (state) {
    return state.user
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
