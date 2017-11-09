import { find, map, filter, cloneDeep, concat, sum, orderBy } from 'lodash'
import API from '../api'

const state = {
  code: null,
  user: null,
  banner: null,
  search: '',
  category: {
    current: null,
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
    total: 0,
    coupon: null
  }
}

const actions = {
  setCode ({ commit }, v) {
    commit('setCode', v)
  },
  changeSearchKeyword ({ commit }, v) {
    commit('setSearch', v)
  },
  getCategory ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('shelfCategory')
    }).then(res => {
      if (res.code === 1) {
        commit('setCategory', { current: res.data[0], list: res.data })
      }
      cb && cb()
    })
  },
  changeCategoryType ({ commit, dispatch }, cat) {
    // reset search
    commit('setSearch', '')
    commit('setCategory', Object.assign({}, state.category, { current: cat }))
    dispatch('refreshGoods')
  },
  getHomePage ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('homePage')
    }).then(res => {
      if (res.code === 1) {
        const { userInfo, banner, categories, firstCategoryInfo } = res.data
        commit('setUser', userInfo)
        commit('setBanner', banner)
        commit('setCategory', { current: categories[0], list: categories })
        const { total, page, pageSize, allPage, end, data } = firstCategoryInfo
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
    commit('setPageInfo', {
      total: 0,
      page: 1,
      pageSize: 20,
      allPage: 0,
      end: false
    })
    if (state.search) {
      dispatch('searchGoods', cb)
      // reset category
      commit('setCategory', Object.assign({}, state.category, { current: state.category.list[0] }))
    } else {
      dispatch('getGoodsByType', cb)
    }
  },
  loadMoreGoods ({ commit, dispatch }, cb) {
    commit('setPageInfo', Object.assign({}, state.pageInfo, { page: state.pageInfo.page + 1 }))
    if (state.search) {
      dispatch('searchGoods', cb)
    } else {
      dispatch('getGoodsByType', cb)
    }
  },
  searchGoods ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('getGoodsByName'),
      data: {
        q: state.search,
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
  getGoodsByType ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('getGoodsByType'),
      data: {
        typeId: state.category.current.id,
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
  addToCart ({ commit, rootState }, product) {
    const p = find(state.cart.list, item => item.product.id === product.id)
    if (p) {
      p.count += 1
    } else {
      state.cart.list.push(Object.assign(
        {},
        { product: cloneDeep(product) },
        { count: 1 }
      ))
    }
    // calculate for cart.count, cart.discount, cart.total, cart.coupon
    state.cart.count += 1
    const originTotal = sum(map(state.cart.list, item => item.count * item.product.price))
    const discountTotal = sum(map(state.cart.list, item => item.count * (item.product.discountPrice || item.product.price)))

    const matchCoupons = filter(
      orderBy(
        filter(rootState.coupons.couponList, { status: 1 }),
        ['lowPrice'],
        ['desc']
      ),
      item => item.lowPrice <= discountTotal
    )
    const coupon = orderBy(matchCoupons, ['price'], ['desc'])[0]

    if (coupon) {
      state.cart.coupon = coupon
      state.cart.discount = originTotal - discountTotal + coupon.price
      state.cart.total = discountTotal - coupon.price
    } else {
      state.cart.coupon = null
      state.cart.discount = originTotal - discountTotal
      state.cart.total = discountTotal
    }

    commit('setCart', cloneDeep(state.cart))
  },
  removeFromCart ({ commit, rootState }, product) {
    const p = find(state.cart.list, item => item.product.id === product.id)
    if (p.count > 1) {
      p.count -= 1
    } else {
      state.cart.list = filter(state.cart.list, item => item.product.id !== product.id)
    }
    // calculate for cart.count, cart.discount, cart.total, cart.coupon
    state.cart.count -= 1
    const originTotal = sum(map(state.cart.list, item => item.count * item.product.price))
    const discountTotal = sum(map(state.cart.list, item => item.count * (item.product.discountPrice || item.product.price)))

    const matchCoupons = filter(
      orderBy(
        filter(rootState.coupons.couponList, { status: 1 }),
        ['lowPrice'],
        ['desc']
      ),
      item => item.lowPrice <= discountTotal
    )
    const coupon = orderBy(matchCoupons, ['price'], ['desc'])[0]

    if (coupon) {
      state.cart.coupon = coupon
      state.cart.discount = originTotal - discountTotal + coupon.price
      state.cart.total = discountTotal - coupon.price
    } else {
      state.cart.coupon = null
      state.cart.discount = originTotal - discountTotal
      state.cart.total = discountTotal
    }

    commit('setCart', cloneDeep(state.cart))
  },
  clearCart ({ commit }) {
    commit('setCart', {
      list: [],
      count: 0,
      discount: 0,
      total: 0,
      coupon: null
    })
  }
}

const mutations = {
  setCode (state, payload) {
    state.code = payload
  },
  setUser (state, payload) {
    state.user = payload
  },
  setBanner (state, payload) {
    state.banner = payload
  },
  setSearch (state, payload) {
    state.search = payload
  },
  setCategory (state, payload) {
    state.category = payload
  },
  setPageInfo (state, payload) {
    state.pageInfo = payload
  },
  setProductList (state, payload) {
    state.productList = payload
  },
  setCart (state, payload) {
    state.cart = payload
  }
}

const getters = {
  getCode () {
    return state.code
  },
  getUser (state) {
    return state.user
  },
  getBanner (state) {
    return state.banner
  },
  getSearch (state) {
    return state.search
  },
  getCategory (state) {
    return state.category
  },
  getPageInfo (state) {
    return state.pageInfo
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
