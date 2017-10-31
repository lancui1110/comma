<template>
  <div class="house-filter">
    <div class="row d-c">
      <div class="row">
        <div class="label">位置</div>
        <div class="location-item active">
          <i class="iconfont icon-area"></i>
          区域
        </div>
      </div>
      <div class="location-data">
        <div :class="{'option': true, 'active': item.areaId === location.value}"
             v-for="item in location.data[location.key]"
             @click="changeLocationValue(item.areaId)">
          {{item.name}}
        </div>
      </div>
      <div class="location-data sub-area" v-show="location.data.subArea">
        <div :class="{'option': true, 'active': !location.subValue}"
             @click="changeLocationSubValue('')">
          全部
        </div>
        <div class="sub-area-group" v-for="(items, key) in location.data.subArea">
          <span class="group-label">{{key}}</span>
          <div :class="{'option': true, 'active': item.areaId === location.subValue}"
               v-for="item in items"
               @click="changeLocationSubValue(item.areaId)">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="label">售价</div>
      <range-input unit="万" key-label="price" :min="filter.startPrice" :max="filter.endPrice"></range-input>
      <div class="gap"></div>

      <div class="label">面积</div>
      <range-input unit="m²" key-label="spaceArea" :min="filter.startSpaceArea"
                   :max="filter.endSpaceArea"></range-input>
      <div class="gap"></div>

      <div class="label">楼层</div>
      <range-input unit="层" key-label="floor" :min="filter.startFloor" :max="filter.endFloor"></range-input>
    </div>
    <div class="row">
      <div class="label">户型</div>
      <one-input key-label="bedroomSum" unit="室" :input-val="filter.bedroomSum"></one-input>
      <div class="gap"></div>

      <div class="label">建造年代</div>
      <range-input unit="年" key-label="contructDate" :min="filter.startContructDate"
                   :max="filter.endContructDate"></range-input>
    </div>
    <div class="row">
      <div class="label">房源状态</div>
      <div class="status-item" v-for="item in filter.status">
        <el-checkbox :value="item.selected" @change="changeStatus(item)">{{item.text}}</el-checkbox>
      </div>
    </div>
    <div class="filter-result" v-show="filterResult.length">
      <div class="left">
        <span>已选择</span>
      </div>
      <div class="right">
        <div class="result-item" v-for="item in filterResult">
          {{item.label}}: {{item.value}}
          <i class="el-icon-close" @click="removeFilterResult(item)"></i>
        </div>
        <el-button type="text" class="clear-filter-btn" @click.stop="removeAllFilterResult">
          <i class="iconfont icon-deletebin"></i>
          重置
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import {
    Checkbox,
    Button
  } from 'element-ui'
  import OneInput from './OneInput.vue'
  import RangeInput from './RangeInput.vue'

  Vue.component(Checkbox.name, Checkbox)
  Vue.component(Button.name, Button)

  export default {
    components: {
      OneInput,
      RangeInput
    },
    data () {
      return {
        filterResult: []
      }
    },
    props: {},
    computed: {
      ...mapGetters({
        filter: 'groupSecHouse/filter'
      }),
      location () {
        return this.filter.location
      },
      status () {
        return this.filter.status
      }
    },
    watch: {
      filter: {
        // 注意 handler 这里不能用箭头函数。。。
        handler: function (newVal) {
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
            status
          } = newVal

          // 准备 筛选结果 的数组
          this.filterResult = []
          // 搜索
          if (search.keyword) {
            this.filterResult.push({
              key: 'search',
              label: '搜索',
              value: search.keyword
            })
          }
          // 区域
          if (location.value) {
            const areaIndex = location.data.area.findIndex(item => item.areaId === location.value)
            this.filterResult.push({
              key: 'area',
              label: '区域',
              value: location.data.area[areaIndex].name
            })
          }
          // 板块
          if (location.subValue) {
            let subAreaName = ''
            for (let key in location.data.subArea) {
              const val = location.data.subArea[key]
              const subAreaIndex = val.findIndex(item => item.areaId === location.subValue)
              if (subAreaIndex > -1) {
                subAreaName = val[subAreaIndex].name
                break
              }
            }
            this.filterResult.push({
              key: 'subArea',
              label: '板块',
              value: subAreaName
            })
          }
          // 售价
          if (startPrice || endPrice) {
            this.filterResult.push({
              key: 'price',
              label: '售价',
              value: `${startPrice}~${endPrice}万`
            })
          }
          // 面积
          if (startSpaceArea || endSpaceArea) {
            this.filterResult.push({
              key: 'spaceArea',
              label: '面积',
              value: `${startSpaceArea}~${endSpaceArea}m²`
            })
          }
          // 楼层
          if (startFloor || endFloor) {
            this.filterResult.push({
              key: 'floor',
              label: '楼层',
              value: `${startFloor}~${endFloor}层`
            })
          }
          // 户型
          if (bedroomSum) {
            this.filterResult.push({
              key: 'bedroomSum',
              label: '户型',
              value: `${bedroomSum}室`
            })
          }
          // 建造年代
          if (startContructDate || endContructDate) {
            this.filterResult.push({
              key: 'contructDate',
              label: '建造年代',
              value: `${startContructDate}~${endContructDate}年`
            })
          }
          // 状态
          const selectedStatus = status.filter(item => item.selected)
          if (selectedStatus.length) {
            this.filterResult.push({
              key: 'status',
              label: '状态',
              value: status.filter(item => item.selected).map(item => item.text).join(',')
            })
          }
        },
        deep: true
      }
    },
    created () {
      this.$store.dispatch('groupSecHouse/getLocationData')
    },
    methods: {
      changeLocationValue (val) {
        // 如果选中了搜索框的tip，先清空tip，这两个互斥
        const { search } = this.filter
        if (search.selectedTip && search.selectedTip.estateId) {
          this.$store.commit('groupSecHouse/setFilterSearch', { key: 'keyword', value: '' })
          this.$store.commit('groupSecHouse/setFilterSearch', { key: 'selectedTip', value: {} })
        }

        this.$store.commit('groupSecHouse/setFilterLocationValue', val)
        this.$store.commit('groupSecHouse/setFilterLocationSubValue', '')
        if (val) {
          this.$store.dispatch('groupSecHouse/getLocationSubArea', val)
        } else {
          // 全部
          this.$store.commit('groupSecHouse/setFilterLocationSubArea', null)
        }

        this.$parent.$refs.houseList.$emit('refresh')
      },
      changeLocationSubValue (val) {
        this.$store.commit('groupSecHouse/setFilterLocationSubValue', val)

        this.$parent.$refs.houseList.$emit('refresh')
      },
      changeStatus (item) {
        this.$store.commit('groupSecHouse/setFilterStatus', { key: item.key, value: !item.selected })

        this.$parent.$refs.houseList.$emit('refresh')
      },
      removeFilterResult (item, isFromRemoveAll) {
        if (item.key === 'search') {
          this.$store.commit('groupSecHouse/setFilterSearch', { key: 'keyword', value: '' })
          this.$store.commit('groupSecHouse/setFilterSearch', { key: 'selectedTip', value: {} })
        } else if (item.key === 'area') {
          this.$store.commit('groupSecHouse/setFilterLocationValue', '')
        } else if (item.key === 'subArea') {
          this.$store.commit('groupSecHouse/setFilterLocationSubValue', '')
        } else if (item.key === 'price') {
          this.$store.commit('groupSecHouse/setFilterCommonValue', { key: 'startPrice', value: '' })
          this.$store.commit('groupSecHouse/setFilterCommonValue', { key: 'endPrice', value: '' })
        } else if (item.key === 'spaceArea') {
          this.$store.commit('groupSecHouse/setFilterCommonValue', { key: 'startSpaceArea', value: '' })
          this.$store.commit('groupSecHouse/setFilterCommonValue', { key: 'endSpaceArea', value: '' })
        } else if (item.key === 'floor') {
          this.$store.commit('groupSecHouse/setFilterCommonValue', { key: 'startFloor', value: '' })
          this.$store.commit('groupSecHouse/setFilterCommonValue', { key: 'endFloor', value: '' })
        } else if (item.key === 'bedroomSum') {
          this.$store.commit('groupSecHouse/setFilterCommonValue', { key: 'bedroomSum', value: '' })
        } else if (item.key === 'contructDate') {
          this.$store.commit('groupSecHouse/setFilterCommonValue', { key: 'startContructDate', value: '' })
          this.$store.commit('groupSecHouse/setFilterCommonValue', { key: 'endContructDate', value: '' })
        } else if (item.key === 'status') {
          this.$store.commit('groupSecHouse/setFilterStatusAllFalse')
        }
        // 重置默认选择房源状态
        if (isFromRemoveAll) {
          this.$store.commit('groupSecHouse/setFilterStatusAllTrue')
        }

        !isFromRemoveAll && this.$parent.$refs.houseList.$emit('refresh')
      },
      removeAllFilterResult () {
        this.isClickRemoveAll = true
        this.filterResult.forEach(item => { this.removeFilterResult(item, true) })
        this.$parent.$refs.houseList.$emit('refresh')
        setTimeout(() => { this.isClickRemoveAll = false }, 1000)
      }
    }
  }
</script>

<style lang="less">
  @import "../../global/style/theme.less";

  .house-filter {
    margin: 24px 0 40px;
    padding: 24px 40px 8px;
    border: @common-border;

    .row {
      display: flex;
      margin-bottom: 16px;
      align-items: center;
      &.d-c {
        flex-direction: column;
        align-items: initial;
      }
    }
    .gap {
      width: 36px;
    }
    .label {
      margin-right: 24px;
    }

    .location-item {
      position: relative;
      cursor: pointer;
      &.active {
        color: @active-color;
        &:before {
          position: absolute;
          right: 8px;
          bottom: -15px;
          content: '▲';
          color: @border-color;
        }
        &:after {
          position: absolute;
          right: 8px;
          bottom: -17px;
          content: '▲';
          color: @section-bgc;
        }
      }
    }
    .location-data {
      display: flex;
      padding: 12px 24px;
      margin-left: 32px;
      margin-top: -7px;
      flex-wrap: wrap;
      border: @common-border;
      background-color: @section-bgc;

      .option {
        margin-right: 24px;
        white-space: nowrap;
        cursor: pointer;
        &.active {
          color: @active-color;
          font-weight: 600;
        }
      }

      .sub-area-group {
        display: flex;
        flex-wrap: wrap;
        .option {
          color: #737b7f;
          &.active {
            color: @active-color;
          }
        }
      }
      .group-label {
        margin-right: 10px;
        font-weight: bold;
        color: #394043;
        font-family: "Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei";
      }
    }
    .status-item {
      margin-right: 32px;
    }

    // reset element default style
    .el-checkbox__input {
      &:hover .el-checkbox__inner {
        border-color: @active-color;
      }
      &.is-focus .el-checkbox__inner {
        // border-color: #bfcbd9;
        border-color: @active-color;
      }
      &.is-checked .el-checkbox__inner {
        background-color: @active-color;
        border-color: @active-color;
      }
    }
    .el-checkbox__inner:hover {
        border-color: @active-color;
      }

    .filter-result {
      display: flex;
      padding: 18px 40px;
      margin: 0 -40px -8px;
      background-color: @section-bgc;
      .left {
        width: 60px;
      }
      .right {
        display: flex;
        flex: 1;
      }
      .result-item {
        padding: 0 5px;
        margin-right: 16px;
        border: 1px solid #bdbdbd;
        border-radius: 2px;
        background-color: #fff;

        i {
          margin-left: 4px;
          color: #BDBDBD;
          font-size: 12px;
          cursor: pointer;
        }
      }
      .el-button--text {
        padding: 0;
      }
      .clear-filter-btn {
        color: @text-color;
        .iconfont {
          color: #616161;
        }
      }
    }
  }
</style>
