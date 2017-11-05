import API from '../api'

const state = {
  orderSign: {}
}

const actions = {
  getOrderSign ({ commit }, params, cb) {
    iwjw.ajax({
      url: API.getUrl('getOrderSign'),
      data: params
    }).then(res => {
      if (res.code === 1) {
        commit('setOrderSign', res.data)
      }
      cb && cb()
    })
  }
}

const mutations = {
  setOrderSign (state, data) {
    state.orderSign = data
  }
}

const getters = {
  orderSign (state) {
    return state.orderSign
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
