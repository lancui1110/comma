import { find, map, filter, cloneDeep, concat, sum, orderBy, maxBy } from 'lodash'
import { Indicator } from 'mint-ui'
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
    pageSize: 15,
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
    coupon: null,
    maxCoupon: null
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
    Indicator.open()
    iwjw.ajax({
      url: API.getUrl('homePage')
    }).then(res => {
      if (res.code === 1) {
        const { userInfo, banner, categories, firstCategoryInfo } = res.data
        commit('setUser', userInfo)
        commit('setBanner', banner)
        commit('setCategory', { current: categories[0], list: categories })
        const { total, page, allPage, end, data } = firstCategoryInfo
        commit('setProductList', data || [])
        commit('setPageInfo', Object.assign(
          {},
          state.pageInfo,
          { total, page, allPage, end }
        ))
      }
      cb && cb()
      Indicator.close()
    })
  },
  refreshGoods ({ commit, dispatch }, cb) {
    commit('setPageInfo', {
      total: 0,
      page: 1,
      pageSize: 15,
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
    Indicator.open()
    iwjw.ajax({
      url: API.getUrl('getGoodsByName'),
      data: {
        q: state.search,
        page: state.pageInfo.page,
        pageSize: state.pageInfo.pageSize
      }
    }).then(res => {
      if (res.code === 1) {
        const { total, page, allPage, end, data } = res.data
        commit('setPageInfo', Object.assign(
          {},
          state.pageInfo,
          {
            total,
            page: page || 1,
            allPage,
            end
          }
        ))
        if (res.data.page > 1) {
          commit('setProductList', concat(state.productList, data || []))
        } else {
          commit('setProductList', data || [])
        }
      }
      cb && cb()
      Indicator.close()
    })
  },
  getGoodsByType ({ commit }, cb) {
    Indicator.open()
    iwjw.ajax({
      url: API.getUrl('getGoodsByType'),
      data: {
        typeId: state.category.current.id,
        page: state.pageInfo.page,
        pageSize: state.pageInfo.pageSize
      }
    }).then(res => {
      if (res.code === 1) {
        const { total, page, allPage, end, data } = res.data
        commit('setPageInfo', Object.assign(
          {},
          state.pageInfo,
          {
            total,
            page: page || 1,
            allPage,
            end
          }
        ))
        if (res.data.page > 1) {
          commit('setProductList', concat(state.productList, data || []))
        } else {
          commit('setProductList', data || [])
        }
      }
      cb && cb()
      Indicator.close()
    })
  },
  getGoodsByIds ({ commit }, { ids, cb }) {
    iwjw.ajax({
      url: API.getUrl('getGoodsByIds'),
      data: {
        ids
      }
    }).then(res => {
      if (res.code === 1) {
        cb && cb(res.data)
      }
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

    commit('setCart', calCartInfo(state.cart, rootState.coupons.availableCouponList))
  },
  removeFromCart ({ commit, rootState }, product) {
    const p = find(state.cart.list, item => item.product.id === product.id)
    if (p.count > 1) {
      p.count -= 1
    } else {
      state.cart.list = filter(state.cart.list, item => item.product.id !== product.id)
    }

    commit('setCart', calCartInfo(state.cart, rootState.coupons.availableCouponList))
  },
  clearCart ({ commit }) {
    commit('setCart', {
      list: [],
      count: 0,
      discount: 0,
      total: 0,
      coupon: null,
      maxCoupon: null
    })
  },
  findProductByQrCode ({ commit }, { code, cb }) {
    iwjw.ajax({
      url: API.getUrl('findProductByQrCode'),
      data: { code: code }
    }).then(res => {
      cb && cb(res)
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

export function calCartInfo (unCalCart, couponList) {
  const cart = cloneDeep(unCalCart)
  cart.count = sum(map(cart.list, 'count'))

  const originTotal = sum(map(cart.list, item => item.count * item.product.price))
  const discountTotal = sum(map(cart.list, item => item.count * (item.product.discountPrice || item.product.price)))

  // 价格最大那张优惠券
  const maxCoupon = maxBy(filter(couponList, { status: 1 }), 'price')
  // 筛选能够使用的券，state = 1 && lowPrice <= discount
  const matchCoupons = filter(couponList, item => item.status === 1 && item.lowPrice <= discountTotal)
  // zeroMatchCoupons 使用后，能把总价减为 <= ０
  const zeroMatchCoupons = filter(matchCoupons, item => item.price >= discountTotal)
  let coupon
  if (zeroMatchCoupons.length) {
    // 如果有能把总价减为 0 的券，选最大那张
    coupon = maxBy(zeroMatchCoupons, 'price')
  } else {
    // 如果没有把总价减为 0 ，但是有能用的优惠券，选价格最大的一张
    coupon = orderBy(matchCoupons, ['price'], ['desc'])[0]
  }

  if (coupon) {
    cart.coupon = coupon
    cart.maxCoupon = maxCoupon
    cart.discount = originTotal - discountTotal + coupon.price
    cart.total = discountTotal - coupon.price
  } else {
    cart.coupon = null
    cart.maxCoupon = null
    cart.discount = originTotal - discountTotal
    cart.total = discountTotal
  }
  if (cart.total < 0) {
    cart.total = 0
  }

  return cart
}
