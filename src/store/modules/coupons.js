import { concat } from 'lodash'
import API from '../api'

const state = {
  pageInfo: {
    total: 0,
    page: 1,
    pageSize: 10,
    allPage: 0,
    end: false
  },
  couponList: [],
  availableCouponList: []
}

const actions = {
  refreshOrders ({ commit, dispatch }, cb) {
    commit('setPageInfo', {
      total: 0,
      page: 1,
      pageSize: 10,
      allPage: 0,
      end: false
    })
    dispatch('getCouponList', cb)
  },
  loadMoreOrders ({ commit, dispatch }, cb) {
    commit('setPageInfo', Object.assign({}, state.pageInfo, { page: state.pageInfo.page + 1 }))
    dispatch('getCouponList', cb)
  },
  getCouponList ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('couponList'),
      data: {
        page: state.pageInfo.page,
        pageSize: state.pageInfo.pageSize
      }
    }).then(res => {
      if (res.code === 1) {
        const { total, page, pageSize, allPage, end, data } = res.data
        commit('setPageInfo', Object.assign({}, state.pageInfo, { total, page, pageSize, allPage, end }))
        if (page > 1) {
          commit('setCouponList', concat(state.couponList, data))
        } else {
          commit('setCouponList', data)
        }
      }
      cb && cb()
    })
  },
  getAvailableCouponList ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('availableCouponList')
    }).then(res => {
      if (res.code === 1) {
        commit('setAvailableCouponList', res.data)
        cb && cb(res.data)
      }
    })
  }
}

const mutations = {
  setPageInfo (state, data) {
    state.pageInfo = data
  },
  setCouponList (state, data) {
    state.couponList = data
  },
  setAvailableCouponList (state, data) {
    state.availableCouponList = data
  }
}

const getters = {
  pageInfo (state) {
    return state.pageInfo
  },
  couponList (state) {
    return state.couponList
  },
  availableCouponList (state) {
    return state.availableCouponList
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
