import API from '../api'

const state = {
}

const actions = {
  submit ({ commit }, { params, cb }) {
    iwjw.ajax({
      url: API.getUrl('userFeedback'),
      data: params,
      method: 'POST'
    }).then(res => {
      cb && cb(res)
    })
  }
}

const mutations = {
}

const getters = {
}

export default {
  state,
  actions,
  mutations,
  getters
}
