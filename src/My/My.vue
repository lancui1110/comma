<template>
  <div class="my">
    <my-header></my-header>
    <mt-navbar v-model="currentTab">
      <mt-tab-item id="coupon">优惠券</mt-tab-item>
      <mt-tab-item id="order">订单</mt-tab-item>
    </mt-navbar>

    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="pageEnd" :auto-fill="false" ref="loadmore">
      <mt-tab-container v-model="currentTab">
        <mt-tab-container-item id="coupon">
          <div v-if="!isLoading && couponList.length === 0"
            class="list-panel nodata">
            <div class="logo"><i class="icon icon-logo-white"></i></div>
            <div class="word">没有优惠券可用~</div>
          </div>
          <div v-else class="list-panel coupons-list-panel">
            <div v-for="(item, key) in couponList" :key="key" class="coupons-item-panel">
              <div class="coupons-item" :class="{'gray': item.status === 2  || item.status === 4 || item.status === 5}">
                <div class="word">
                  <span class="left word large red">{{item.price}}元</span>
                  <span class="word name">
                    {{item.name}}
                    <!-- 1待使用 2已使用 4已过期 5返还中 -->
                    <span :class="`status-btn ${item.status === 5 ? 'orange' : ''}`"
                      v-if="item.status === 2 || item.status === 4 || item.status === 5">
                      {{statusText[item.status]}}
                    </span>
                  </span>
                </div>
                <div class="word meta">
                  <span class="left word">满{{item.lowPrice}}元立减</span>
                  <span class="word">{{item.startDate}}~{{item.endDate}}</span>
                </div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="order">
          <div v-if="!isLoading && orderList.length === 0"
            class="list-panel nodata">
            <div class="logo"><i class="icon icon-logo-white"></i></div>
            <div class="word">没有更多订单啦~</div>
          </div>
          <div v-else class="list-panel order-list-panel">
            <div class="order-item" v-for="(item, key) in orderList" :key="key">
              <p class="date">{{item.payTime}}</p>
              <div class="product-pics">
                <div class="pro-pic" v-for="(pro, k) in item.goodsInfos" :key="k">
                  <img :src="pro.picUrl"/>
                </div>
                <span class="count">共{{item.count}}件</span>
                <span class="price">¥{{item.realAmount}}</span>
              </div>
              <div class="detail-btn" @click="goDetail(item)">订单明细</div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </mt-loadmore>

    <div class="footer">
      <a :href="`tel:${phone}`"><i class="icon icon-support"></i>客服热线</a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui'
import MyHeader from './MyHeader'

Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)

export default {
  name: 'My',
  components: {
    MyHeader
  },
  data () {
    return {
      isLoading: true,
      currentTab: 'coupon', // coupon, order
      statusText: {
        2: '已使用',
        4: '已过期',
        5: '返还中'
      }
    }
  },
  computed: {
    ...mapGetters({
      phone: 'customer/phone',
      couponList: 'coupons/couponList',
      couponsPageInfo: 'coupons/pageInfo',
      orderList: 'order/orderList',
      orderPageInfo: 'order/pageInfo'
    }),
    pageEnd () {
      return this.currentTab === 'coupon' ? this.couponsPageInfo.end : this.orderPageInfo.end
    },
    refreshActionName () {
      return this.currentTab === 'coupon' ? 'coupons/refreshOrders' : 'order/refreshOrders'
    },
    loadMoreActionName () {
      return this.currentTab === 'coupon' ? 'coupons/loadMoreOrders' : 'order/loadMoreOrders'
    }
  },
  watch: {
    currentTab (newVal) {
      this.loadTop()
    }
  },
  activated () {
    this.$store.dispatch('customer/getPhone')
    this.loadTop()
  },
  methods: {
    loadTop () {
      this.isLoading = true
      this.$store.dispatch(this.refreshActionName, () => {
        this.isLoading = false
        this.$refs.loadmore.onTopLoaded()
      })
    },
    loadBottom () {
      this.isLoading = true
      this.$store.dispatch(this.loadMoreActionName, () => {
        this.isLoading = false
        this.$refs.loadmore.onBottomLoaded()
      })
    },
    goDetail (item) {
      location.href = `${pageConfig.siteUrl}index/order/detail?orderNum=${item.orderNum}`
      // this.$router.push({ name: 'orderDetail', query: { orderNum: item.orderNum } })
    }
  }
}
</script>

<style lang="less">
@import "../global/style/theme.less";

.my {
  background-color: @panel-gray;
  a {
    color: @font-gray;
  }
  .mint-navbar {
    height: 100/@R;
    .mint-tab-item {
      padding: 0;
      line-height: 100/@R;
      font-size: 24/@R;
      color: @text-color;
      &.is-selected {
        border-bottom: none;
        .mint-tab-item-label {
          line-height: 45/@R;
          font-size: 32/@R;
          font-weight: bold;
          color: @text-color;
          &:after {
            display: block;
            content: " ";
            width: 50/@R;
            height: 8/@R;
            margin: 22/@R auto;
            border-radius: 5/@R;
            background-color: @text-color;
          }
        }
      }
    }
    .mint-tab-item-label {
      display: inline-block;
    }
  }

  .list-panel {
    min-height: 650/@R;
    padding: 30/@R 25/@R;
    background: @panel-gray;
  }
  .footer {
    display: flex;
    justify-content: center;
    padding: 30/@R 0 50/@R;
    .icon {
      margin-right: 20/@R;
    }
  }
}

.nodata {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: center;
  align-items: center;
  min-height: 600/@R;
  .logo .icon{
    width: 96/@R;
    height: 130/@R;
    background-size: 96/@R 130/@R;
  }
  .word {
    font-size: 36/@R;
    padding: 68/@R 0 0;
    color: @font-gray-light;
  }
}

.coupons-list-panel {
  .word {
    font-size: 28/@R;
    display: flex;
    align-items: center;
  }
  .large {
    font-size: 44/@R;
  }
  .red {
    color: #FF6600;
  }
  .name {
    font-size: 28/@R;
    font-weight: bold;
  }
  .meta {
    margin-top: 15/@R;
    color: @font-gray;
  }
  .gray {
    .word, .red {
      color: #D9D9D9;
    }
  }
  .status-btn {
    width: 100/@R;
    height: 40/@R;
    line-height: 40/@R;
    margin-left: 20/@R;
    text-align: center;
    border-radius: 20/@R;
    background-color: #D8D8D8;
    color: #fff;
    font-size: 24/@R;
    &.orange {
      background-color: #F5A623;
    }
  }
  .left {
    display: inline-block;
    width: 250/@R;
    text-align: center;
    margin-right: 100/@R;
  }
  .coupons-item-panel {
    position: relative;
    height: 200/@R;
    padding: 10/@R;
    margin-bottom: 30/@R;
    border-radius: 8/@R;
    box-shadow: 0 2/@R 4/@R 0 rgba(0, 0, 0, .05);
    background: #fff;
    &:before,
    &:after {
      display: block;
      position: absolute;
      content: " ";
      width: 30/@R;
      height: 30/@R;
      border-radius: 50%;
      background-color: @panel-gray;
    }
    &:before {
      top: 85/@R;
      left: -15/@R;
    }
    &:after {
      top: 85/@R;
      right: -15/@R;
    }
  }
  .coupons-item {
    width: 100%;
    height: 100%;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
  }
}

.order-list-panel {
  .date {
    margin-bottom: 20/@R;
    font-size: 24/@R;
    color: @font-gray;
  }
  .order-item {
    position: relative;
    height: 260/@R;
    margin-bottom: 30/@R;
    padding: 20/@R 30/@R;
    border-radius: 4/@R;
    background: #fff;
    .product-pics {
      display: flex;
      align-items: center;
    }
    .pro-pic {
      display: none;
      width: 100/@R;
      height: 100/@R;
      margin-right: 20/@R;
      &:nth-child(1),
      &:nth-child(2) {
        display: inline-block;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .count {
      flex-grow: 1;
      text-align: right;
      font-size: 24/@R;
      color: @font-gray;
    }
    .price {
      width: 217/@R;
      flex-shrink: 0;
      text-align: right;
      font-size: 36/@R;
    }
    .detail-btn {
      position: absolute;
      right: 30/@R;
      bottom: 20/@R;
      width: 160/@R;
      height: 54/@R;
      line-height: 50/@R;
      text-align: center;
      border: 2/@R solid @border-gray;
      border-radius: 27/@R;
      font-size: 24/@R;
    }
  }
}
</style>

