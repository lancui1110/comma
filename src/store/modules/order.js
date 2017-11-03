import API from '../api'

const state = {
  orderList: [],
  orderDetail: {}
}

const actions = {
  getDataList ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('orderList')
    }).then(res => {
      if (res.status === 1) {
        commit('setOrderList', res.data)
      }
      cb && cb()
    })
  },
  getOrderDetail ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('orderDetail')
    }).then(res => {
      if (res.status === 1) {
        commit('setOrderList', res.data)
      }
      cb && cb()
    })
  }
}

const mutations = {
  setOrderList (state, data) {
    state.orderList = data
  },
  setOrderDetail (state, data) {
    state.orderDetail = data
  }
}

const getters = {
  getOrderList (state) {
    return state.orderList
  },
  getOrderDetail (state) {
    return state.orderDetail
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
