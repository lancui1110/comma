import API from '../api'

const state = {
  user: null,
  categoryList: [],
  productList: []
}

const actions = {
  getUserInfo ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('userDetail')
    }).then(res => {
      if (res.code === 1) {
        commit('setUser', res.data.userVo)
      }
      cb && cb()
    })
  },
  getCategoryList ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('shelfCategory')
    }).then(res => {
      if (res.code === 1) {
        commit('setCategoryList', res.data)
      }
      cb && cb()
    })
  }
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setCategoryList (state, payload) {
    state.categoryList = payload
  }
}

const getters = {
  getUser (state) {
    return state.user
  },
  getCategoryList (state) {
    return state.categoryList
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
