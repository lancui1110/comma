import API from '../api'

const state = {
  user: null
}

const actions = {
  getUserInfo ({ commit }, cb) {
    // TODO: change to real fetch user
    iwjw.ajax({
      url: API.getUrl('userDetail')
    }).then(res => {
      if (res.code === 1) {
        commit('setUser', res.data.userVo)
      }
      cb && cb()
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
