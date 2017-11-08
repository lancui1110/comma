import API from '../api'

const state = {
  myRedPacket: {},
  redPackets: [],
  recommendForm: {
    company: '',
    nickName: '',
    mobile: ''
  }
}

const actions = {
  getOrderShare ({ commit, rootState }) {
    iwjw.ajax({
      url: API.getUrl('getOrderShare')
    }).then(res => {
      if (res.code === 1) {
        const { myRedPacket, redPackets, userInfo } = res.data
        commit('setMyRedPacket', Object.assign({}, state.myRedPacket, myRedPacket))
        commit('setRedPackets', redPackets)
        commit('user/setUser', Object.assign({}, rootState.user.user, userInfo), { root: true })
      }
    })
  }
}

const mutations = {
  updateRecommendFormField (state, payload) {
    state.recommendForm[payload.name] = payload.value
  },
  setMyRedPacket (state, payload) {
    state.myRedPacket = payload
  },
  setRedPackets (state, payload) {
    state.redPackets = payload
  }
}

const getters = {
  recommendForm (state) {
    return state.recommendForm
  },
  myRedPacket (state) {
    return state.myRedPacket
  },
  redPackets (state) {
    return state.redPackets
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
