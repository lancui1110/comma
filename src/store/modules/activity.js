import API from '../api'

const state = {
  myRedPacket: null,
  redPackets: [],
  recommendForm: {
    company: '',
    nickName: '',
    mobile: ''
  }
}

const actions = {
  getOrderShare ({ commit }) {
    iwjw.ajax({
      url: API.getUrl('getOrderShare')
    }).then(res => {
      if (res.code === 1) {
        commit('setMyRedPacket', res.data.myRedPacket)
        commit('setRedPackets', res.data.setRedPackets)
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
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
