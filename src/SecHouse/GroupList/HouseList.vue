<template>
  <div class="house-list">
    <h3 class="find-result">共找到 <span>{{estateTotal}}</span> 个小区，<span>{{houseTotal}}</span> 套二手房</h3>
    <div class="sort-header" v-show="houseList.length">
      <!-- <div :class="{'sort-item': true, 'active': !sort.key}" @click="changeSort()">
        推荐排序
      </div> -->
      <div :class="{'sort-item': true, 'active': item.key === sort.key}"
           v-for="item in sort.data"
           @click="changeSort(item)">
        {{item.text}}
        <i class="iconfont icon-up" v-if="item.key === sort.key && sort.value === 'asc'"></i>
        <i class="iconfont icon-down" v-else></i>
      </div>
      <div class="list-type-panel">
        <div class="list-type active" title="按照小区+户型分组"><i class="iconfont icon-group"></i> 分组</div>
        <a :href="saleUrl"><div class="list-type" title="使用常规平铺展示"><i class="iconfont icon-ungroup"></i> 常规</div></a>
      </div>
    </div>
    <!-- 分组列表 -->
    <div class="estate-group" v-for="estate in houseList">
      <!-- 小区信息 -->
      <div class="estate-info">
        <span class="title">{{estate.estateName}}</span>
        <p class="detail">{{!estate.contructDate ? '-' : estate.contructDate}}年建&nbsp;&nbsp;{{estate.districtName}}-{{estate.townName}}&nbsp;&nbsp;{{estate.subEstateName}}</p>
        <span class="map" @click="gotoMap(estate)"><i class="iconfont icon-map"></i> <span class="word">地图</span></span>
      </div>
      <!-- 室房源列表 -->
      <div class="estate-room-panel" v-for="room in estate.rows">
        <div class="house-item"  :class="{ 'active': item.houseId === houseDetail.houseId }"
             @click="showDetail(item, estate.estateId, $event)"
             v-for="item in room.rows">
          <div class="house-item-body">
            <div class="col-item publish need-title">
              <span class="fresh active" v-if="item.isNew" v-tooltip="'3天内发布'">新</span>
              <span class="fresh" v-else-if="item.ljHouseUrl" v-tooltip="'指同行网站有但我们缺少的房源，以帮助您了解全网在售房源'">缺</span>
            </div>
            <div class="col-item floor">
              {{item.ljHouseUrl ? item.ljFloor : item.floor}}{{item.totalLayers ? `/${item.totalLayers}` : '/-'}}层
            </div>
            <div class="col-item area">{{item.spaceAreaStr}}m²</div>
            <div class="col-item bedroom">{{item.bedroomSum}}/{{item.livingRoomSum}}/{{item.wcSum}}</div>
            <div class="col-item price">{{item.price}}万</div>
            <div class="col-item avgPrice">{{item.spaceArea <=0 ? '-' : item.avgPrice}}</div>
            <div class="col-item status light-gray">
              <span v-if="item.houseState === 0" v-tooltip="'房源正在审核中'">审核中</span>
              <span v-if="item.recentDown === 1" v-tooltip="'最近下架'">刚下架</span>
            </div>
            <div class="col-item connect light-gray">
              <i v-if="item.callStatus === 0" class="iconfont icon-list_phone" v-tooltip="'我接通过的房源'"></i>
              <i v-else-if="item.callStatus > 0" class="iconfont icon-list_nophone" v-tooltip="'我打过没接通的房源'"></i>
            </div>
            <div class="remark-content light-gray">{{item.remarkContent}}</div>
          </div>
        </div>
        <div class="room">{{room.bedroomSum}}室</div>
      </div>

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
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import InfiniteLoading from 'vue-infinite-loading'
  import BackToTop from '@/components/BackToTop.vue'
  import VTooltip from 'v-tooltip'

  Vue.use(VTooltip)

  export default {
    components: {
      InfiniteLoading,
      BackToTop
    },
    data () {
      return {
        saleUrl: `${window.pageConfig.siteUrl}sale`,
        showBackToTop: false
      }
    },
    props: {},
    computed: {
      ...mapGetters({
        houseList: 'groupSecHouse/houseList',
        estateTotal: 'groupSecHouse/estateTotal',
        houseTotal: 'groupSecHouse/houseTotal',
        houseDetail: 'groupSecHouse/houseDetail',
        sort: 'groupSecHouse/sort'
      })
    },
    watch: {
      houseList () {
        if (this.houseList.length > 20) {
          this.showBackToTop = true
        }
      }
    },
    mounted () {
      this.$on('refresh', this.refresh)
    },
    methods: {
      changeSort (item) {
        this.$store.commit('groupSecHouse/setSort', item)
        this.$store.commit('groupSecHouse/sortHouseList')
      },
      refresh () {
        this.$store.commit('groupSecHouse/setFilterCommonValue', { key: 'offset', value: 0 })
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
        this.loadMore()
      },
      loadMore () {
        this.$store.dispatch('groupSecHouse/getHouseList', (hasNextPage) => {
          if (hasNextPage) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          }
        })
      },
      showDetail (item, estateId, e) {
        e.stopPropagation()

        // 如果是缺盘，链家有，则跳转到链接页
        if (item.ljHouseUrl) {
          window.open(item.ljHouseUrl)
          return
        }
        // 显示详情
        const params = {
          houseId: item.houseId,
          publishId: item.publishId,
          estateId: estateId
        }
        this.$store.dispatch('groupSecHouse/getHouseDetail', params)
      },
      gotoMap (item) {
        window.open(`http://api.map.baidu.com/marker?location=${item.latitude},${item.longitude}&title=${item.estateName}&content=&autoOpen=false&output=html`)
      }
    }
  }
</script>

<style lang="less">
@import "../../global/style/theme.less";

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

  .estate-group{
    border: @common-border;
    border-top: 2px solid @active-color;
    margin-bottom: 12px;
  }
  .estate-info {
    background-color: #f0f7f7;
    display: flex;
    align-items: center;
    padding: 16px 0 16px 40px;
    font-size: 16px;

    .title {
      font-size: 18px;
      font-weight: 600;
      color: @active-color;
      padding-right: 73px;
    }
    .detail {
      color: @light-text-color;
      padding-right: 28px;
    }
    .map {
      color: #4a90e2;
      cursor: pointer;
      &:hover .word{
        // border-bottom: 1px solid #4a90e2;
        text-decoration: underline;
      }
    }
  }

  .estate-room-panel {
    position: relative;
    border-top: @common-border;
    border-bottom: @common-border;

    .room {
      position: absolute;
      top: -1px;
      left: -36px;
      border: @common-border;
      font-size: 13px;
      padding: 4px 7px;
      background-color: @section-bgc-1;
    }

    .house-item {
      display: flex;
      margin-top: -1px;
      cursor: pointer;
      padding: 0 40px;
      &:hover {
        background-color: #f5f5f5;
      }
      &.active {
        background-color: #efefef;
      }
    }

    .house-item-body {
      display: flex;
      padding: 11px 2px;
      box-sizing: border-box;
      font-size: 15px;
      border-top: @common-border;
      width: 1100px;
    }

    &:first-child .house-item-body{
      border-top: 0;
    }

    .col-item {
      width: 100px;
    }
    .light-gray {
      font-family: PingFangSC;
      color: @light-text-color;
    }
    .publish {
      position: relative;
      width: 26px;
      .fresh {
        border: 1px solid #bdbdbd;
        color: #757575;
        font-size: 12px;
        width: 18px;
        height: 18px;
        display: inline-block;
        text-align: center;
      }
      .active {
        border: 1px solid #ff6e2e;
        color: #ff6e2e;
      }
    }
    .floor {
      position: relative;
    }
    .area {

    }
    .bedroom {

    }
    .price {
      font-family: DIN;
      line-height: 20px;
      font-weight: 500;
      color: @highlight-text-color;
    }
    .avgPrice {

    }
    .status {

    }
    .connect {
      width: 60px;
    }
    .remark-content {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 239px;
    }
  }
}
</style>
