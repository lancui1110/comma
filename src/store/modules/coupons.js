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
      res = res.data
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
    console.log(state.couponList)
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
