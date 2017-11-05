import { concat } from 'lodash'
import API from '../api'

const state = {
  pageInfo: {
    total: 0,
    page: 1,
    pageSize: 15,
    allPage: 0,
    end: false
  },
  orderList: [],
  orderDetail: {}
}

const actions = {
  refreshOrders ({ commit, dispatch }, cb) {
    commit('setPageInfo', {
      total: 0,
      page: 1,
      pageSize: 15,
      allPage: 0,
      end: false
    })
    dispatch('getOrderList', cb)
  },
  loadMoreOrders ({ commit, dispatch }, cb) {
    commit('setPageInfo', Object.assign({}, state.pageInfo, { page: state.pageInfo.page + 1 }))
    dispatch('getOrderList', cb)
  },
  getOrderList ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('orderList'),
      data: {
        page: state.page,
        pageSize: state.pageSize
      }
    }).then(res => {
      if (res.code === 1) {
        const { total, page, pageSize, allPage, end, data } = res.data
        commit('setPageInfo', Object.assign({}, state.pageInfo, { total, page, pageSize, allPage, end }))
        if (page > 1) {
          commit('setOrderList', concat(state.orderList, data))
        } else {
          commit('setOrderList', data)
        }
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
        cb && cb(res.data.orderNum)
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
  setPageInfo (state, data) {
    state.pageInfo = data
  },
  setOrderList (state, data) {
    state.orderList = data
  },
  setOrderDetail (state, data) {
    state.orderDetail = data
  }
}

const getters = {
  pageInfo (state) {
    return state.pageInfo
  },
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
