import API from '../api'

const state = {
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
  addRecharge ({ commit }, { params, cb }) {
    iwjw.ajax({
      method: 'post',
      url: API.getUrl('addRecharge'),
      data: params
    }).then(res => {
      cb && cb(res)
    })
  }
}

const mutations = {
  setRechargeList (state, data) {
    state.rechargeList = data
  }
}

const getters = {
  rechargeList (state) {
    return state.rechargeList
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
