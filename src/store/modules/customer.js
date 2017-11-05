import API from '../api'

const state = {
  subResult: {}
}

const actions = {
  submit ({ commit }, params, cb) {
    iwjw.ajax({
      url: API.getUrl('userFeedback'),
      data: params
    }).then(res => {
      if (res.code === 1) {
        commit('setSubResult', res.data)
      }
      cb && cb()
    })
  }
}

const mutations = {
  setSubResult (state, data) {
    state.subResult = data
  }
}

const getters = {
  subResult (state) {
    return state.subResult
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
