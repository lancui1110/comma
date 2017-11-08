import API from '../api'

const state = {
  myRedPacket: {},
  redPackets: [],
  cityData: [],
  recommendForm: {
    companyName: '',
    linkName: '',
    referrerMobile: '',
    cityName: '',
    address: '',
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
  },
  getCityData ({ commit }) {
    iwjw.ajax({
      url: API.getUrl('getAllArea')
    }).then(res => {
      if (res.code === 1) {
        commit('setCityData', res.data || [])
      }
    })
  },
  submitRecommendForm ({ commit }) {
    iwjw.ajax({
      method: 'POST',
      url: API.getUrl('shelfRecommend'),
      data: state.recommendForm
    }).then(res => {
      if (res.code === 1) {
        // TODO: ok then what to do? need cb to handle something?
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
  },
  setCityData (state, payload) {
    state.cityData = payload
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
  },
  cityData (state) {
    return state.cityData
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
