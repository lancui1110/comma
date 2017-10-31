import API from '../api'
// import axios from 'axios'

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
    bedroomSum: '', // 户型
    startContructDate: '', // 建造年代
    endContructDate: '',
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
      // ,{
      //   key: 1,
      //   text: '刚下架',
      //   selected: true,
      //   queryField: 'isDownTask' // 要转化成的查询字段
      // }
    ],
    offset: 0,
    limit: 50
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
        key: 'spaceArea',
        text: '面积'
      },
      {
        key: 'price',
        text: '价格'
      },
      {
        key: 'avgPrice',
        text: '单价'
      }
    ]
  },
  houseTotal: 0,
  estateTotal: 0,
  houseList: [],
  fetchingHouseList: false,
  houseDetail: {},
  houseDetailOtherUrl: [],  // 其他来源信息，图片等
  estateImgs: [], // 小区图片
  carouselType: 0,  // 大图显示的图片类型：1:房源，2:小区
  houseDetailRemarks: [], // 备注
  estateTrafficInfo: [], // 小区交通信息
  memberInfo: {}  // 本人会员信息
}

const uitls = {
  // 连接两个集合
  concatList (oldRows, newRows) {
    const oldLast = oldRows[oldRows.length - 1]
    const newFst = newRows[0]

    // 如果新数据的第一条和旧数据的最后一条是同个小区，则将数据合并成一个小区的值
    if (oldLast.estateId === newFst.estateId) {
      // 新数据放入map中
      let newmap = {}
      for (let i = 0; i < newFst.rows.length; i++) {
        const room = newFst.rows[i]
        newmap[room.bedroomSum] = room.rows
      }

      // 新数据放入旧数据中
      for (let j = 0; j < oldLast.rows.length; j++) {
        const room = oldLast.rows[j]
        const num = room.bedroomSum
        if (newmap[num]) {
          const newRows = newmap[num]
          // room.rows = [...room.rows, ...newRows]

          // 重复的数据去除
          const oldMyMap = {}
          for (let k = 0; k < room.rows.length; k++) {
            const h = room.rows[k]
            // 数据放入map
            oldMyMap[h.houseId || h.ljHouseId] = h
          }
          for (let m = 0; m < newRows.length; m++) {
            const h = newRows[m]
            // 如果已经有了数据，则不添加
            if (oldMyMap[h.houseId || h.ljHouseId]) continue
            room.rows.push(h)
          }
        }
      }
      // 删除第一条记录
      newRows.shift()
    }
    return [...oldRows, ...newRows]
  }
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
      // return
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
      bedroomSum,
      startContructDate,
      endContructDate,
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
      bedroomSum,
      startContructDate,
      endContructDate,
      houseStates: status.filter(item => item.selected).map(item => item.key).join(','),
      offset,
      limit,
      sort: state.sort.key,
      order: state.sort.value
    }

    // 解析房源状态的值status
    const houseStates = status.filter(item => item.selected).map(item => {
      if (item.queryField) {
        tmpParams[item.queryField] = item.key // 给对应的属性赋值
        return
      }
      return item.key
    }).join(',').replace(/,$/, '')
    tmpParams.houseStates = houseStates

    // 去掉 空字符
    const params = {}
    for (let k in tmpParams) {
      if (tmpParams[k] !== '') {
        params[k] = tmpParams[k]
      }
    }
    state.fetchingHouseList = true
    iwjw.curRequest = iwjw.ajax({
      url: API.getUrl('secHouseGroupList'),
      data: params
    }).then(res => {
      if (res.status === 1) {
        commit('setHouseTotal', res.data)
        if (state.filter.offset > 0) {
          commit('setFilterOffset')
          commit('setHouseList', uitls.concatList([...state.houseList], [...res.data.rows]))
        } else {
          commit('setFilterOffset')
          commit('setHouseList', res.data.rows)
        }
        // 默认面积排序
        commit('setSort', state.sort.data[1])
        commit('sortHouseList')
      }
      state.fetchingHouseList = false
      cb && cb(res.data.hasNextPage)
    }).catch(err => {
      console.log(err)
      state.fetchingHouseList = false
      cb && cb(false)
    })
  },
  getHouseDetail ({ commit, dispatch }, { houseId, publishId, estateId }) {
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
    dispatch('getEstateImg', { estateId })
    dispatch('getMemberInfo')
    dispatch('getEstateTrafficInfo', { estateId })
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
  getEstateImg ({ commit }, { estateId }) {
    iwjw.ajax({
      url: API.getUrl('secEstateImg'),
      data: { estateId }
    }).then(res => {
      if (res.status === 1) {
        commit('setEstateImgs', res.data)
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
  getEstateTrafficInfo ({ commit }, { estateId }) {
    iwjw.ajax({
      url: API.getUrl('getEstateTraffic'),
      data: { estateId }
    }).then(res => {
      if (res.status === 1) {
        commit('setEstateTrafficInfo', res.data)
      }
    })
  },
  getMemberInfo ({ commit }) {
    iwjw.ajax({
      url: API.getUrl('getMemberInfo')
    }).then(res => {
      if (res.status === 1) {
        commit('setMemberInfo', res.data)
      }
    })
  },
  addHouseDetailRemark ({ dispatch, commit }, { estateId, bedroomSum, houseId, publishId, remarkContent }) {
    iwjw.ajax({
      url: API.getUrl('secAddRemark'),
      data: { houseId, publishId, bizType: 2, remarkContent }
    }).then(res => {
      if (res.status === 1) {
        dispatch('getHouseDetailRemarks', { houseId, publishId })
        commit('updateHouseListRemark', { estateId, bedroomSum, publishId, remarkContent })
      }
    })
  },
  sortHouseList ({ commit }) {
    commit('sortHouseList')
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
  // 集合排序
  sortHouseList (state) {
    const key = state.sort.key
    const val = state.sort.value

    const list = [...state.houseList]
    for (let i = 0, len = list.length; i < len; i++) {
      const estate = list[i]
      for (let j = 0, len1 = estate.rows.length; j < len1; j++) {
        const houses = estate.rows[j].rows
        houses.sort(function (a, b) {
          if (a[key] > b[key]) {
            return val === 'asc' ? 1 : -1
          } else if (a[key] < b[key]) {
            return val === 'asc' ? -1 : 1
          }
        })
      }
    }
    state.houseList = list
  },
  setFilterOffset (state, payload) {
    state.filter.offset = state.filter.offset + state.filter.limit
  },
  setHouseTotal (state, payload) {
    state.houseTotal = payload.total || 0
    state.estateTotal = payload.estateTotal || 0
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
  setEstateImgs (state, payload) {
    state.estateImgs = payload || []
  },
  setHouseDetailRemarks (state, payload) {
    state.houseDetailRemarks = payload || []
  },
  setEstateTrafficInfo (state, payload) {
    state.estateTrafficInfo = payload || []
  },
  setMemberInfo (state, payload) {
    state.memberInfo = payload || []
  },
  setCarouselType (state, payload) {
    state.carouselType = payload || []
  },
  updateHouseListRemark (state, { estateId, bedroomSum, publishId, remarkContent }) {
    const list = state.houseList
    outerloop:
    for (let i = 0; i < list.length; i++) {
      const estate = list[i]
      if (estate.estateId === estateId) { // 小区
        for (let j = 0; j < estate.rows.length; j++) {
          const room = estate.rows[j]
          if (room.bedroomSum === bedroomSum) { // 房型
            for (let k = 0; k < room.rows.length; k++) {
              const house = room.rows[k]
              if (house.publishId === publishId) {  // 房源
                house.remarkContent = remarkContent
                break outerloop
              }
            }
          }
        }
      }
    }
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
  estateTotal (state) {
    return state.estateTotal
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
  estateImgs (state) {
    return state.estateImgs
  },
  memberInfo (state) {
    return state.memberInfo
  },
  houseDetailRemarks (state) {
    return state.houseDetailRemarks
  },
  estateTrafficInfo (state) {
    return state.estateTrafficInfo
  },
  carouselType (state) {
    return state.carouselType
  },
  carouselImages (state) {
    if (state.carouselType === 1) { // 房源
      const data = state.houseDetailOtherUrl
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === '链家') {
          return data[i].houseImages
        }
      }
    } else if (state.carouselType === 2) { // 小区
      return state.estateImgs
    }
    return []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
