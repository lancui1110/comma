<template>
  <div class="house-list">
    <h3 class="find-result">共找到 <span>{{houseTotal}}</span> 套二手房源</h3>
    <div class="sort-header" v-show="houseList.length">
      <div :class="{'sort-item': true, 'active': !sort.key}" @click="changeSort()">
        推荐排序
      </div>
      <div :class="{'sort-item': true, 'active': item.key === sort.key}"
           v-for="item in sort.data"
           @click="changeSort(item)">
        {{item.text}}
        <i class="iconfont icon-up" v-if="item.key === sort.key && sort.value === 'asc'"></i>
        <i class="iconfont icon-down" v-else></i>
      </div>

      <div class="list-type-panel">
        <a :href="saleGroupUrl"><div class="list-type" title="按照小区+户型分组"><i class="iconfont icon-group"></i> 分组</div></a>
        <div class="list-type active" title="使用常规平铺展示"><i class="iconfont icon-ungroup"></i> 常规</div>
      </div>
    </div>
    <div :class="{ 'house-item': true, 'active': item.houseId === houseDetail.houseId }"
         @click="showDetail(item, $event)"
         v-for="item in houseList">
      <div class="title">{{item.estateName}}</div>
      <div class="area">{{item.spaceAreaStr}}m²</div>
      <div class="floor">{{item.floor}}{{item.totalLayers ? `/${item.totalLayers}` : ''}}层</div>
      <div class="room">{{item.bedroomSum}}/{{item.livingRoomSum}}/{{item.wcSum}}</div>
      <div class="price"><span><i>{{item.price}}</i>万</span>({{item.spaceArea <=0 ? '-' : item.avgPrice}})</div>
      <div class="publish">{{item.publishTimeInfo}}</div>
      <div class="contact">{{item.lastCallInfo}}</div>
    </div>
    <infinite-loading :on-infinite="loadMore" ref="infiniteLoading">
      <span slot="no-more">
        没有更多数据了~
      </span>
      <span slot="no-results"></span>
    </infinite-loading>
    <back-to-top :show.sync="showBackToTop"></back-to-top>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import InfiniteLoading from 'vue-infinite-loading'
  import BackToTop from '@/components/BackToTop.vue'

  export default {
    components: {
      InfiniteLoading,
      BackToTop
    },
    data () {
      return {
        saleGroupUrl: `${window.pageConfig.siteUrl}sale/group`,
        showBackToTop: false
      }
    },
    props: {},
    computed: {
      ...mapGetters({
        houseList: 'secHouse/houseList',
        houseTotal: 'secHouse/houseTotal',
        houseDetail: 'secHouse/houseDetail',
        sort: 'secHouse/sort'
      })
    },
    watch: {
      houseList () {
        if (this.houseList.length > 20) {
          this.showBackToTop = true
        }
      }
    },
    created () {
      this.$on('refresh', this.refresh)
    },
    methods: {
      changeSort (item) {
        this.$store.commit('secHouse/setSort', item)
        this.refresh()
      },
      refresh () {
        this.$store.commit('secHouse/setFilterCommonValue', { key: 'offset', value: 0 })
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
        this.loadMore()
      },
      loadMore () {
        this.$store.dispatch('secHouse/getHouseList', (hasNextPage) => {
          if (hasNextPage) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          }
        })
      },
      showDetail (item, e) {
        e.stopPropagation()
        const params = {
          houseId: item.houseId,
          publishId: item.publishId
        }
        this.$store.dispatch('secHouse/getHouseDetail', params)
      }
    }
  }
</script>

<style lang="less">
  @import "../global/style/theme.less";

  .house-list {
    .find-result {
      margin-bottom: 25px;
      font-size: 24px;
      font-weight: bold;
      span {
        color: @active-color;
      }
    }
    .sort-header {
      position: relative;
      display: flex;
      height: 48px;
      padding: 14px 40px;
      box-sizing: border-box;
      border: @common-border;
      background-color: @section-bgc;
      font-size: 14px;

      .list-type-panel{
        position: absolute;
        right: 0;
        top: 0;
        font-size: 0;
      }
      .list-type {
        display: inline-block;
        background-color: #fff;
        color: #bdbdbd;
        border-left: solid 1px #efefef;
        height: 46px;
        line-height: 46px;
        padding: 0 10px;
        cursor: pointer;
        font-size: 14px;
        &.active {
          color: @active-color;
        }
      }
    }
    .sort-item {
      margin-right: 36px;
      cursor: pointer;
      &.active {
        color: @active-color;
        font-weight: 600;
        .iconfont {
          color: @active-color;
        }
      }
      .iconfont {
        color: #bdbdbd;
        font-size: 0.9em;
      }
    }
    .house-item {
      display: flex;
      height: 64px;
      padding: 21px 40px;
      margin-top: -1px;
      box-sizing: border-box;
      border: @common-border;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        background-color: #f5f5f5;
      }
      &.active {
        background-color: #efefef;
      }

      > div {
        text-align: right;
      }
      .title {
        width: 180px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .area {
        width: 100px;
      }
      .floor {
        width: 100px;
      }
      .room {
        width: 100px;
      }
      .price {
        width: 200px;
        line-height: 20px;
        span {
          color: @highlight-text-color;
        }
        i {
          font-size: 24px;
          font-weight: bold;
          font-style: normal;
        }
      }
      .publish {
        width: 120px;
      }
      .contact {
        width: 120px;
      }
    }
  }
</style>
