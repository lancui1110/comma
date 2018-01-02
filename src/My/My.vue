<template>
  <div class="my">
    <mt-navbar v-model="currentTab">
      <mt-tab-item id="coupon">优惠券</mt-tab-item>
      <mt-tab-item id="order">订单</mt-tab-item>
    </mt-navbar>

    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="pageEnd" :auto-fill="false" ref="loadmore">
      <mt-tab-container v-model="currentTab">
        <mt-tab-container-item id="coupon">
          <div class="coupons-list-panel">
            <div v-for="(item, key) in couponList" :key="key" class="coupons-item-panel">
              <div class="coupons-item" :class="{'gray': item.status === 2  || item.status === 4}">
                <div class="word red">
                  <span class="left word large">{{item.price}}元</span>
                  <span class="word">{{item.name}}</span>
                </div>
                <div class="word">
                  <span class="left word">满{{item.lowPrice}}元立减</span>
                  <span class="word">{{item.startDate}}~{{item.endDate}}</span>
                </div>
              </div>
              <!-- 1待使用 2已使用  4：过期 -->
              <img v-if="item.status === 4" class="state-pic" :src="require('../assets/icon_coupon_gq.png')" />
              <img v-if="item.status === 2" class="state-pic" :src="require('../assets/icon_coupon_sy.png')" />
              <img v-if="item.status === 5" class="state-pic" :src="require('../assets/icon_coupon_lock.png')" />
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="order">
          <div class="test">456</div>
        </mt-tab-container-item>
      </mt-tab-container>
    </mt-loadmore>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui'

Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)

export default {
  name: 'My',
  data () {
    return {
      currentTab: 'coupon' // coupon, order
    }
  },
  computed: {
    ...mapGetters({
      couponList: 'coupons/couponList',
      couponsPageInfo: 'coupons/pageInfo'
    }),
    pageEnd () {
      return false
    }
  },
  watch: {
    currentTab (newVal) {
      this.loadTop()
    }
  },
  activated () {
    this.loadTop()
  },
  methods: {
    loadTop () {
      if (this.currentTab === 'coupon') {
        this.$store.dispatch('coupons/refreshOrders', this.$refs.loadmore.onTopLoaded)
      } else {

      }
      // this.$store.dispatch('admin/refreshTaskList', {
      //   params: { status: this.currentTab === '1' ? 1 : 0 },
      //   cb: this.$refs.loadmore.onTopLoaded
      // })
    },
    loadBottom () {
      // this.$store.dispatch('admin/loadMoreTaskList', {
      //   params: { status: this.currentTab === '1' ? 1 : 0 },
      //   cb: this.$refs.loadmore.onBottomLoaded
      // })
    }
  }
}
</script>

<style lang="less">
@import "../global/style/theme.less";

.my {
  background-color: @panel-gray;
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
}

.coupons-list-panel {
  position: relative;
  width: 100%;
  height: 100%;
  background: #F2F2F2;
  padding: 30/@R 25/@R;
  &.nodata {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 175/@R;
    justify-content: flex-start;
    background: #fff;
    .logo .icon{
      width: 147/@R;
      height: 147/@R;
      background-size: 147/@R 147/@R;
    }
    .word {
      font-size: 36/@R;
      padding: 100/@R 0 52/@R 0;
    }
  }

  .word {
    font-size: 28/@R;
    display: flex;
    align-items: center;
  }
  .large {
    font-size: 44/@R;
  }
  .red {
    color: #D86868;
  }
  .gray {
    .word, .red {
      color: #D9D9D9;
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
  .state-pic {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 127/@R;
    height: 127/@R;
  }
}
</style>

