import { find, filter, cloneDeep } from 'lodash'
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
        // for test no discount item
        // res.data.firstCategoryInfo.data[0].discountPrice = null
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
