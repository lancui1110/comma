import { find, filter, cloneDeep, concat } from 'lodash'
import API from '../api'

const state = {
  user: null,
  category: {
    current: 0,
    list: []
  },
  pageInfo: {
    total: 0,
    page: 1,
    pageSize: 20,
    allPage: 0,
    end: false
  },
  categoryList: [],
  productList: [],
  cart: {
    list: [],
    count: 0,
    discount: 0,
    total: 0
  }
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
        const { total, page, pageSize, allPage, end, data } = res.data.firstCategoryInfo
        commit('setProductList', data)
        commit('setPageInfo', Object.assign(
          {},
          state.pageInfo,
          { total, page, pageSize, allPage, end }
        ))
      }
      cb && cb()
    })
  },
  refreshGoods ({ commit, dispatch }, cb) {
    commit('setPageInfo', Object.assign({}, state.pageInfo, { page: 1 }))
    dispatch('getGoodsByType', cb)
  },
  loadMoreGoods ({ commit, dispatch }, cb) {
    commit('setPageInfo', Object.assign({}, state.pageInfo, { page: state.pageInfo.page + 1 }))
    dispatch('getGoodsByType', cb)
  },
  getGoodsByType ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('getGoodsByType'),
      data: {
        typeId: state.category.current,
        page: state.pageInfo.page,
        pageSize: state.pageInfo.pageSize
      }
    }).then(res => {
      if (res.code === 1) {
        const { total, page, pageSize, allPage, end, data } = res.data
        commit('setPageInfo', Object.assign(
          {},
          state.pageInfo,
          { total, page, pageSize, allPage, end }
        ))
        if (res.data.page > 1) {
          commit('setProductList', concat(state.productList, data))
        } else {
          commit('setProductList', data)
        }
      }
      cb && cb()
    })
  },
  addToCart ({ commit }, product) {
    const { id, price, discountPrice } = product
    const p = find(state.cart.list, item => item.product.id === id)
    if (p) {
      p.count += 1
    } else {
      state.cart.list.push(Object.assign(
        {},
        { product: cloneDeep(product) },
        { count: 1 }
      ))
    }
    // calculate for cart.count, cart.discount, cart.total
    state.cart.count += 1
    if (discountPrice) {
      state.cart.discount += price - discountPrice
      state.cart.total += discountPrice
    } else {
      state.cart.total += price
    }
    commit('setCart', cloneDeep(state.cart))
  },
  removeFromCart ({ commit }, product) {
    const { id, price, discountPrice } = product
    const p = find(state.cart.list, item => item.product.id === id)
    if (p.count > 1) {
      p.count -= 1
    } else {
      state.cart.list = filter(state.cart.list, item => item.product.id !== id)
    }
    // calculate for cart.count, cart.discount, cart.total
    state.cart.count -= 1
    if (discountPrice) {
      state.cart.discount -= price - discountPrice
      state.cart.total -= discountPrice
    } else {
      state.cart.total -= price
    }
    commit('setCart', cloneDeep(state.cart))
  }
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setPageInfo (state, payload) {
    state.pageInfo = payload
  },
  setCategoryList (state, payload) {
    state.categoryList = payload
  },
  setProductList (state, payload) {
    state.productList = payload
  },
  setCart (state, payload) {
    state.cart = payload
  }
}

const getters = {
  getUser (state) {
    return state.user
  },
  getPageInfo (state) {
    return state.pageInfo
  },
  getCategoryList (state) {
    return state.categoryList
  },
  getProductList (state) {
    return state.productList
  },
  getCart (state) {
    return state.cart
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
