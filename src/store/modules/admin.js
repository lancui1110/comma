import { concat } from 'lodash'
import API from '../api'

const state = {
  overview: [],
  pageInfo: {
    total: 0,
    page: 1,
    pageSize: 20,
    end: false
  },
  taskList: [
    {
      id: 123,
      type: '退仓',
      company: '广州市xxxx有限公司',
      address: '广州市越秀区环市东路10号'
    },
    {
      id: 456,
      type: '安新',
      company: '广州市yyyy有限公司',
      address: '中山路100号'
    }
  ],
  taskDetail: {}
}

const actions = {
  getOverview ({ commit }) {
    iwjw.ajax({
      url: API.getUrl('adminOverview')
    }).then(res => {
      if (res.code === 1) {
        commit('setOverview', res.data)
      }
    })
  },
  refreshOrders ({ commit, dispatch }, cb) {
  },
  getTaskList ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('pageTask'),
      data: {
        page: state.pageInfo.page,
        pageSize: state.pageInfo.pageSize
      }
    }).then(res => {
      if (res.code === 1) {
        const { total, page, pageSize, end, data } = res.data
        commit('setPageInfo', Object.assign({}, state.pageInfo, { total, page, pageSize, end }))
        if (page > 1) {
          commit('setTaskList', concat(state.taskList, data))
        } else {
          commit('setTaskList', data || [])
        }
      }
      cb && cb()
    })
  },
  getTaskDetail ({ commit }, taskId) {
    iwjw.ajax({
      url: API.getUrl('showTask'),
      data: { taskId }
    }).then(res => {
      if (res.code === 1) {
        commit('setTaskDetail', res.data)
      }
    })
  }
}

const mutations = {
  setOverview (state, data) {
    state.overview = data
  },
  setPageInfo (state, data) {
    state.pageInfo = data
  },
  setTaskList (state, data) {
    state.taskList = data
  },
  setTaskDetail (state, data) {
    state.taskDetail = data
  }
}

const getters = {
  overview (state) {
    return state.overview
  },
  taskList (state) {
    return state.taskList
  },
  taskDetail (state) {
    return state.taskDetail
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
