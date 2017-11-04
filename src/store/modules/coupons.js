import API from '../api'

const state = {
  couponList: []
}

const actions = {
  getCouponList ({ commit }, params, cb) {
    iwjw.ajax({
      url: API.getUrl('couponList'),
      data: params
    }).then(res => {
      if (res.code === 1) {
        commit('setCouponList', res.data)
      }
      cb && cb()
    })
  }
}

const mutations = {
  setCouponList (state, data) {
    state.couponList = data
  }
}

const getters = {
  couponList (state) {
    return state.couponList
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
