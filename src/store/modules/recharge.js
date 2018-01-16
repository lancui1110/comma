import API from '../api'

const state = {
  depositListActivity: [], // 充值活动列表
  rechargeList: [
    // {
    //   type: '微信支付',
    //   time: '2017-09-09 20:48:12',
    //   amount: 100,
    //   code: '794750374850'
    // },
    // {
    //   type: '微信支付',
    //   time: '2017-09-09 20:48:12',
    //   amount: 100,
    //   code: '794750374850'
    // }
  ]
}

const actions = {
  // 获取充值活动列表
  getDepositListActivity ({ commit }) {
    iwjw.ajax({
      url: API.getUrl('getDepositListActivity')
    }).then(res => {
      if (res.code === 1) {
        commit('setDepositListActivity', res.data || [])
      }
    })
  },
  // 获取充值成功列表
  getRechargeList ({ commit }, { params, cb }) {
    iwjw.ajax({
      url: API.getUrl('rechargeList')
    }).then(res => {
      if (res.code === 1) {
        commit('setRechargeList', res.data || [])
      }
      cb && cb()
    })
  },
  addRecharge ({ commit }, { activityId, cb }) {
    iwjw.ajax({
      method: 'post',
      url: API.getUrl('addRecharge', activityId)
    }).then(res => {
      cb && cb(res)
    })
  }
}

const mutations = {
  setRechargeList (state, data) {
    state.rechargeList = data
  },
  setDepositListActivity (state, data) {
    state.depositListActivity = data
  }
}

const getters = {
  rechargeList (state) {
    return state.rechargeList
  },
  depositListActivity (state) {
    return state.depositListActivity
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
