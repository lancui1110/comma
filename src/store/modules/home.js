import API from '../api'

const state = {
  user: null,
  category: {
    current: 0,
    list: []
  },
  pageInfo: {
    current: 1,
    pageSize: 20,
    allPage: 10
  },
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
  },
  getHomePage ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('homePage')
    }).then(res => {
      if (res.code === 1) {
        commit('setUser', res.data.userInfo)
        commit('setCategoryList', res.data.categories)
        commit('setProductList', res.data.firstCategoryInfo.data)
      }
      cb && cb()
    })
  },
  getGoodsByType ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('getGoodsByType'),
      data: {
        typeId: state.category.current,
        page: state.pageInfo.current,
        pageSize: state.pageInfo.pageSize
      }
    }).then(res => {
      if (res.code === 1) {
        commit('setProductList', res.data.data)
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
  },
  setProductList (state, payload) {
    state.productList = payload
  }
}

const getters = {
  getUser (state) {
    return state.user
  },
  getCategoryList (state) {
    return state.categoryList
  },
  getProductList (state) {
    return state.productList
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
