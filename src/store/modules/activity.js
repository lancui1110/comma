import API from '../api'

const state = {
  message: {
    title: '',
    emptyMsg: ''
  },
  myRedPacket: {},
  redPackets: [],
  cityData: [],
  couponInfoList: [], // 线下优惠券
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
  getOrderShare ({ commit, rootState }, params) {
    iwjw.ajax({
      url: API.getUrl('getOrderShare'),
      data: params
    }).then(res => {
      if (res.code === 1) {
        const { title, emptyMsg, myRedPacket, redPackets, userInfo } = res.data
        commit('setMessage', Object.assign({}, state.message, { title, emptyMsg }))
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
  submitRecommendForm ({ commit }, cb) {
    iwjw.ajax({
      method: 'POST',
      url: API.getUrl('shelfRecommend'),
      data: state.recommendForm
    }).then(res => {
      cb && cb(res)
    })
  },
  getScanCouponActivity ({ commit }, params) {
    iwjw.ajax({
      url: API.getUrl('scanCouponActivity'),
      data: params
    }).then(res => {
      res = {
        code: 1,
        data: [
          {
            endDate: '2017.12.30',
            endHour: '',
            goodsTypeMap: {},
            lowPrice: 110,
            name: '货架红包',
            numberCode: '',
            price: 10,
            startDate: '2017.12.15',
            startHour: '',
            status: 1
          },
          {
            endDate: '2017.12.30',
            endHour: '',
            goodsTypeMap: {},
            lowPrice: 110,
            name: '货架红包',
            numberCode: '',
            price: 10,
            startDate: '2017.12.15',
            startHour: '',
            status: 1
          },
          {
            endDate: '2017.12.30',
            endHour: '',
            goodsTypeMap: {},
            lowPrice: 110,
            name: '货架红包',
            numberCode: '',
            price: 10,
            startDate: '2017.12.15',
            startHour: '',
            status: 1
          }
        ]
      }
      if (res.code === 1) {
        commit('setCouponInfoList', res.data || [])
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
  },
  setMessage (state, payload) {
    state.message = payload
  },
  setCouponInfoList (state, payload) {
    state.couponInfoList = payload
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
  },
  message () {
    return state.message
  },
  couponInfoList () {
    return state.couponInfoList
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
