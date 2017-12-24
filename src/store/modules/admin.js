import API from '../api'

const state = {
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
  refreshOrders ({ commit, dispatch }, cb) {
  },
  getTaskList ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('orderList'),
      data: {}
    }).then(res => {
      if (res.code === 1) {

      }
      cb && cb()
    })
  },
  getTaskDetail ({ commit }, orderNum) {
    iwjw.ajax({
      url: API.getUrl('orderDetail'),
      data: { orderNum }
    }).then(res => {
      if (res.code === 1) {
        commit('setOrderDetail', res.data)
      }
    })
  }
}

const mutations = {
  setTaskList (state, data) {
    state.taskrList = data
  },
  setTaskDetail (state, data) {
    state.taskDetail = data
  }
}

const getters = {
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
