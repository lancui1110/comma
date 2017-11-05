import API from '../api'

const state = {
  orderList: [],
  orderDetail: {}
}

const actions = {
  getOrderList ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('orderList')
    }).then(res => {
      if (res.code === 1) {
        commit('setOrderList', res.data)
      }
      cb && cb()
    })
  },
  getOrderDetail ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('orderDetail')
    }).then(res => {
      if (res.code === 1) {
        commit('setOrderDetail', res.data)
      }
      cb && cb()
    })
  },
  addOrder ({ commit }, { params, cb }) {
    iwjw.ajax({
      method: 'post',
      url: API.getUrl('addOrder'),
      data: params
    }).then(res => {
      if (res.code === 1) {
        cb && cb()
      }
    })
  },
  // 发短信获取验证码
  sendVerifyCode ({ commit }, mobile) {
    iwjw.ajax({
      url: API.getUrl('sendVerifyCode')
    }).then(res => {
      if (res.code === 1) {
      }
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
  orderList (state) {
    return state.orderList
  },
  orderDetail (state) {
    return state.orderDetail
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
