import { find, findIndex, map, filter, cloneDeep, concat, sum, each,
  // orderBy, maxBy,
  keys } from 'lodash'
import moment from 'moment'
import { Indicator, Toast } from 'mint-ui'
import API from '../api'

const state = {
  code: null,
  user: null,
  banner: null,
  bannerList: [],
  buySpecialIds: [],
  popup: null,
  payType: 'wx',  // 'wx' or 'yue'
  search: '',
  category: {
    current: null,
    list: []
  },
  pageInfo: {
    total: 0,
    page: 1,
    pageSize: 9,
    allPage: 0,
    end: false
  },
  categoryList: [],
  productList: [],
  allProductList: {},
  cart: {
    list: [],
    count: 0,
    discount: 0,
    total: 0,
    // maxCoupon: null,
    coupon: null
  }
}

const actions = {
  getBanner ({ commit }) {
    iwjw.ajax({
      url: API.getUrl('homeBannerList')
    }).then(res => {
      if (res.code === 1) {
        commit('setBannerList', res.data)
      }
    })
  },
  getGoodsList ({ commit }, hideLoading) {
    if (!hideLoading) {
      Indicator.open()
    }
    iwjw.ajax({
      url: API.getUrl('homeGoodsList')
    }).then(res => {
      if (res.code === 1) {
        const ks = keys(res.data)
        commit('setCategory', { current: state.category.current ? state.category.current : ks[0], list: ks })
        commit('setAllProductList', res.data)
      }
      Indicator.close()
    })
  },
  getUserBuySpecialIds ({ commit }) {
    iwjw.ajax({
      url: API.getUrl('userBuySpecialIds')
    }).then(res => {
      if (res.code === 1) {
        commit('setBuySpecialIds', res.data)
      }
    })
  },
  serverCalCartInfo ({ commit, dispatch, rootState }, goods) {
    iwjw.ajax({
      url: API.getUrl('homeCalculateCart'),
      method: 'POST',
      data: goods
    }).then(res => {
      if (res.code === 1) {
        const c = find(rootState.coupons.availableCouponList, { numberCode: res.data.couponNum })
        // 购物车计算的时候，已经返回最新价格信息
        each(res.data.goodsInfoList, g => {
          const ci = findIndex(state.cart.list, item => item.product.id === g.id)
          if (ci > -1 && g.price !== state.cart.list[ci].product.price) {
            // product 价格更新了
            state.cart.list[ci].product = g
            dispatch('getGoodsList', true)
          }
        })
        commit('setCart', {
          list: state.cart.list,
          count: sum(map(state.cart.list, item => item.count)),
          discount: res.data.totalDiscounts,
          total: res.data.realAmount,
          // maxCoupon: null,
          coupon: c
        })
      }
    })
  },
  getPopup ({ commit }, cb) {
    iwjw.ajax({
      url: API.getUrl('homePopup')
    }).then(res => {
      if (res.code === 1) {
        commit('setPopup', res.data)
      }
      cb && cb(res)
    })
  },
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
    // commit('setSearch', '')
    commit('setCategory', Object.assign({}, state.category, { current: cat }))
    // dispatch('refreshGoods')
  },
  getHomePage ({ commit }, cb) {
    Indicator.open()
    iwjw.ajax({
      url: API.getUrl('homePage')
    }).then(res => {
      if (res.code === 1) {
        const { userInfo, categories, firstCategoryInfo } = res.data
        commit('setUser', userInfo)
        // banner.picUrl = 'http://icomma.oss-cn-shenzhen.aliyuncs.com/manage/20171107/5dc9b9226477440b85e8767dce8806ac.png'
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
      pageSize: 9,
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
      },
      method: 'GET'
    }).then(res => {
      if (res.code === 1) {
        cb && cb(res.data)
      }
    })
  },
  addToCart ({ commit, dispatch, rootState }, product) {
    const p = find(state.cart.list, item => item.product.id === product.id)
    if (p) {
      if (p.product.special) {
        Toast('今日限购一件，超出按原价')
      }
      p.count += 1
    } else {
      if (product.special && state.buySpecialIds.indexOf(product.id) > -1) {
        Toast('今日限购一件，超出按原价')
      }
      state.cart.list.push(Object.assign(
        {},
        { product: cloneDeep(product) },
        { count: 1 }
      ))
    }

    const newCart = calCartInfo(state.cart, rootState.coupons.availableCouponList)
    if (newCart) {
      commit('setCart', newCart)
    } else {
      // 通过 sever 来计算 cart
      dispatch('serverCalCartInfo', map(state.cart.list, item => {
        return {
          id: item.product.id,
          price: item.product.price,
          discountPrice: item.product.discountPrice,
          num: item.count
        }
      }))
    }
    // commit('setCart', calCartInfo(state.cart, rootState.coupons.availableCouponList))
    commit('setPayType', state.cart.total <= rootState.user.money ? 'yue' : 'wx')
  },
  removeFromCart ({ commit, dispatch, rootState }, product) {
    const p = find(state.cart.list, item => item.product.id === product.id)
    if (p.count > 1) {
      p.count -= 1
    } else {
      state.cart.list = filter(state.cart.list, item => item.product.id !== product.id)
    }

    const newCart = calCartInfo(state.cart, rootState.coupons.availableCouponList)
    if (newCart) {
      commit('setCart', newCart)
    } else {
      // 通过 sever 来计算 cart
      dispatch('serverCalCartInfo', map(state.cart.list, item => {
        return {
          id: item.product.id,
          price: item.product.price,
          discountPrice: item.product.discountPrice,
          num: item.count
        }
      }))
    }
    // commit('setCart', calCartInfo(state.cart, rootState.coupons.availableCouponList))
    commit('setPayType', state.cart.total <= rootState.user.money ? 'yue' : 'wx')
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
  setBannerList (state, payload) {
    state.bannerList = payload
  },
  setBuySpecialIds (state, payload) {
    state.buySpecialIds = payload
  },
  setPopup (state, payload) {
    state.popup = payload
  },
  setPayType (state, payload) {
    state.payType = payload
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
  setAllProductList (state, payload) {
    state.allProductList = payload
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
  bannerList (state) {
    return state.bannerList
  },
  buySpecialIds (state) {
    return state.buySpecialIds
  },
  popup (state) {
    return state.popup
  },
  payType (state) {
    return state.payType
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
  allProductList (state) {
    return state.allProductList
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
  const specialList = filter(cart.list, item => item.product.special)
  const notSpecialList = filter(cart.list, item => !item.product.special)
  const hasSpecial = specialList.length > 0

  const originTotal = sum(map(cart.list, item => item.count * item.product.price))

  // 有特价商品，不能使用优惠券，直接 return 算好的 cart
  if (hasSpecial) {
    let discountTotal = sum(map(notSpecialList, item => item.count * (item.product.discountPrice || item.product.price)))
    discountTotal += sum(
      map(specialList, item => {
        const isBuy = findIndex(state.buySpecialIds, b => b === item.product.id) > -1
        if (isBuy) {
          return item.count * item.product.price
        } else {
          return 1 * item.product.discountPrice + (item.count - 1) * item.product.price
        }
      })
    )

    cart.coupon = null
    // cart.maxCoupon = null
    cart.discount = originTotal - discountTotal
    cart.total = discountTotal
    return cart
  }

  const discountTotal = sum(map(cart.list, item => item.count * (item.product.discountPrice || item.product.price)))

  // 筛选能够使用的券，state = 1 && 有时间段的话，时间段要符合 && lowPrice <= discount
  const matchCoupons = filter(couponList, item => {
    if (item.status === 1 && item.lowPrice <= discountTotal) {
      const { startHour, endHour } = item
      if (startHour && endHour) {
        const now = moment().format('hh:mm:ss')
        if (now >= startHour && now <= endHour) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    }
    return false
  })

  // 没有合适的优惠券
  if (!matchCoupons.length) {
    cart.coupon = null
    // cart.maxCoupon = null
    cart.discount = originTotal - discountTotal
    cart.total = discountTotal
    return cart
  }

  // 调用后端接口
  return false

  /*
  // 价格最大那张优惠券
  // const maxCoupon = maxBy(filter(couponList, { status: 1 }), 'price')
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
    // cart.maxCoupon = maxCoupon
    cart.discount = originTotal - discountTotal + (discountTotal > coupon.price ? coupon.price : discountTotal)
    cart.total = discountTotal - coupon.price
  } else {
    cart.coupon = null
    // cart.maxCoupon = null
    cart.discount = originTotal - discountTotal
    cart.total = discountTotal
  }
  if (cart.total < 0) {
    cart.total = 0
  }

  return cart
  */
}
