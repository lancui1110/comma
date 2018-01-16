import API from '../api'

const state = {
  phone: ''
}

const actions = {
  submit ({ commit }, { params, cb }) {
    iwjw.ajax({
      url: API.getUrl('feedbackSubmit'),
      data: params,
      method: 'POST'
    }).then(res => {
      cb && cb(res)
    })
  }, 
  getPhone ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('feedbackPhone')
    }).then(res => {
      commit('setPhone', res.data)
      cb && cb(res)
    })
  },
  // 许愿
  feedbackSubmitWant ({ commit }, { params, cb }) {
    iwjw.ajax({
      url: API.getUrl('feedbackSubmitWant'),
      data: params,
      method: 'POST'
    }).then(res => {
      cb && cb(res)
    })
  }
}

const mutations = {
  setPhone (state, data) {
    state.phone = data
  }
}

const getters = {
  phone (state) {
    return state.phone
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
