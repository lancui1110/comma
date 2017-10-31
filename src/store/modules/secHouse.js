import API from '../api'

const state = {
  filter: {
    search: {
      keyword: '',
      selectedTip: {},
      tips: []
    },
    location: {
      key: 'area',
      value: '',
      subValue: '',
      data: {
        area: [],
        subArea: null
      }
    },
    startPrice: '',
    endPrice: '',
    startSpaceArea: '',
    endSpaceArea: '',
    startFloor: '',
    endFloor: '',
    status: [
      {
        key: 2,
        text: '在售',
        selected: true
      },
      {
        key: 0,
        text: '审核中',
        selected: true
      }
    ],
    offset: 0,
    limit: 10
  },
  sort: {
    key: '',
    value: '', // desc, asc
    data: [
      {
        key: 'publishTime',
        text: '最新上架'
      },
      {
        key: 'sellPrice',
        text: '价格'
      },
      {
        key: 'unitPrice',
        text: '单价'
      },
      {
        key: 'spaceArea',
        text: '面积'
      },
      {
        key: 'bedroomSum',
        text: '厅室'
      }
    ]
  },
  houseTotal: 0,
  houseList: [],
  fetchingHouseList: false,
  houseDetail: {},
  houseDetailOtherUrl: [],
  houseDetailRemarks: []
}

const actions = {
  searchEstate ({ commit }, kw) {
    if (kw) {
      iwjw.ajax({
        url: API.getUrl('secAreaSearch'),
        data: { name: kw, bizType: 2 }
      }).then(res => {
        if (res.status === 1) {
          commit('setFilterSearch', { key: 'tips', value: res.data })
        }
      })
    } else {
      iwjw.ajax({
        url: API.getUrl('secUserQueryHistory')
      }).then(res => {
        if (res.status === 1) {
          commit('setFilterSearch', { key: 'tips', value: res.data.sellEstateList })
        }
      })
    }
  },
  getLocationData ({ commit }) {
    iwjw.ajax({
      url: API.getUrl('secAreaList')
    }).then(res => {
      if (res.status === 1) {
        commit('setFilterLocationData', [{ areaId: '', name: '全部' }, ...res.data.list])
      }
    })
  },
  getLocationSubArea ({ commit }, parentId) {
    iwjw.ajax({
      url: API.getUrl('secAreaList'),
      data: { parentId }
    }).then(res => {
      if (res.status === 1) {
        commit('setFilterLocationSubArea', res.data.map)
      }
    })
  },
  getHouseList ({ commit }, cb) {
    if (state.fetchingHouseList) {
      return
    }
    const {
      search,
      location,
      startPrice,
      endPrice,
      startSpaceArea,
      endSpaceArea,
      startFloor,
      endFloor,
      status,
      offset,
      limit
    } = state.filter
    const tmpParams = {
      estateId: search.selectedTip.estateId || '',  // 搜索的小区
      kw: (!search.selectedTip.estateId && search.keyword) ? search.keyword : '', // 搜索关键字
      districtId: (location.key === 'area' && location.value) ? location.value : '',  // 行政区
      townId: (location.key === 'area' && location.subValue) ? location.subValue : '',
      startPrice,
      endPrice,
      startSpaceArea,
      endSpaceArea,
      startFloor,
      endFloor,
      houseStates: status.filter(item => item.selected).map(item => item.key).join(','),
      offset,
      limit,
      sort: state.sort.key,
      order: state.sort.value
    }
    // 去掉 空字符
    const params = {}
    for (let k in tmpParams) {
      if (tmpParams[k] !== '') {
        params[k] = tmpParams[k]
      }
    }
    state.fetchingHouseList = true
    iwjw.ajax({
      url: API.getUrl('secHouseList'),
      data: params
    }).then(res => {
      if (res.status === 1) {
        commit('setHouseTotal', res.data.total)
        if (state.filter.offset > 0) {
          commit('setFilterOffset', res.data.rows.length + state.houseList.length)
          commit('setHouseList', [...state.houseList, ...res.data.rows])
        } else {
          commit('setFilterOffset', res.data.rows ? res.data.rows.length : 0)
          commit('setHouseList', res.data.rows)
        }
      }
      state.fetchingHouseList = false
      cb && cb(res.data.hasNextPage)
    }).catch(err => {
      console.log(err)
      state.fetchingHouseList = false
      cb && cb(false)
    })
  },
  getHouseDetail ({ commit, dispatch }, { houseId, publishId }) {
    iwjw.ajax({
      url: API.getUrl('secHouseDetail'),
      data: { houseId, publishId }
    }).then(res => {
      if (res.status === 1) {
        commit('setHouseDetail', res.data)
      }
    })
    // 取详情的同时，可以取 links 和 remarks
    dispatch('getHouseDetailOtherUrl', { houseId, publishId })
    dispatch('getHouseDetailRemarks', { houseId, publishId })
  },
  getHouseDetailOtherUrl ({ commit }, { houseId, publishId }) {
    iwjw.ajax({
      url: API.getUrl('secHouseLink'),
      data: { houseId, publishId }
    }).then(res => {
      if (res.status === 1) {
        commit('setHouseDetailOtherUrl', res.data)
      }
    })
  },
  getHouseDetailRemarks ({ commit }, { houseId, publishId }) {
    iwjw.ajax({
      url: API.getUrl('secUserRemark'),
      data: { houseId, publishId, bizType: 2 }
    }).then(res => {
      if (res.status === 1) {
        commit('setHouseDetailRemarks', res.data.list)
      }
    })
  },
  addHouseDetailRemark ({ dispatch }, { houseId, publishId, remarkContent }) {
    iwjw.ajax({
      url: API.getUrl('secAddRemark'),
      data: { houseId, publishId, bizType: 2, remarkContent }
    }).then(res => {
      if (res.status === 1) {
        dispatch('getHouseDetailRemarks', { houseId, publishId })
      }
    })
  }
}

const mutations = {
  setFilterSearch (state, payload) {
    state.filter.search[payload.key] = payload.value
  },
  setFilterLocationData (state, payload) {
    state.filter.location.data.area = payload
  },
  setFilterLocationSubArea (state, payload) {
    state.filter.location.data.subArea = payload
  },
  setFilterLocationValue (state, payload) {
    state.filter.location.value = payload
  },
  setFilterLocationSubValue (state, payload) {
    state.filter.location.subValue = payload
  },
  // 用来修改 startPrice, endPrice, startSpaceArea, endSpaceArea, startFloor, endFloor
  setFilterCommonValue (state, payload) {
    state.filter[payload.key] = payload.value
  },
  setFilterStatus (state, payload) {
    const index = state.filter.status.findIndex(item => item.key === payload.key)
    state.filter.status[index].selected = payload.value
  },
  setFilterStatusAllFalse (state) {
    state.filter.status.forEach(item => {
      item.selected = false
    })
  },
  setFilterStatusAllTrue (state) {
    state.filter.status.forEach(item => {
      item.selected = true
    })
  },
  setSort (state, payload) {
    if (!payload) {
      // 推荐排序
      state.sort.key = ''
      state.sort.value = ''
    } else {
      if (state.sort.key === payload.key) {
        state.sort.value = state.sort.value === 'desc' ? 'asc' : 'desc'
      } else {
        state.sort.key = payload.key
        state.sort.value = 'desc'
      }
    }
  },
  setFilterOffset (state, payload) {
    state.filter.offset = payload || 0
  },
  setHouseTotal (state, payload) {
    state.houseTotal = payload || 0
  },
  setHouseList (state, payload) {
    state.houseList = payload || []
  },
  setHouseDetail (state, payload) {
    state.houseDetail = payload || {}
  },
  setHouseDetailOtherUrl (state, payload) {
    state.houseDetailOtherUrl = payload || []
  },
  setHouseDetailRemarks (state, payload) {
    state.houseDetailRemarks = payload || []
  }
}

const getters = {
  filter (state) {
    return state.filter
  },
  sort (state) {
    return state.sort
  },
  groupSort (state) {
    return state.groupSort
  },
  houseTotal (state) {
    return state.houseTotal
  },
  houseList (state) {
    return state.houseList
  },
  houseDetail (state) {
    return state.houseDetail
  },
  houseDetailOtherUrl (state) {
    return state.houseDetailOtherUrl
  },
  houseDetailRemarks (state) {
    return state.houseDetailRemarks
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
