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
  taskList: [],
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
  refreshTaskList ({ commit, dispatch }, cb) {
    commit('setPageInfo', {
      total: 0,
      page: 1,
      pageSize: 20,
      end: false
    })
    dispatch('getTaskList', { cb })
  },
  loadMoreTaskList ({ commit, dispatch }, cb) {
    commit('setPageInfo', Object.assign({}, state.pageInfo, { page: state.pageInfo.page + 1 }))
    dispatch('getTaskList', { cb })
  },
  getTaskList ({ commit }, { params, cb }) {
    let data = {
      page: state.pageInfo.page,
      pageSize: state.pageInfo.pageSize
    }
    if (params) {
      data = {
        ...data,
        ...params
      }
    }

    iwjw.ajax({
      url: API.getUrl('pageTask'),
      data
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
  pageInfo (state) {
    return state.pageInfo
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
