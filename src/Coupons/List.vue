<template>
  <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="pageInfo.end" :auto-fill="false" ref="loadmore">
    <div class="coupons-list-panel">
      <div v-for="(item, key) in couponList" :key="key" class="coupons-item-panel">
        <div class="coupons-item" :class="{'gray': item.status !== 1}">
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
      </div>
    </div>
  </mt-loadmore>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CouponsList',
  computed: {
    ...mapGetters({
      couponList: 'coupons/couponList',
      pageInfo: 'coupons/pageInfo'
    })
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$store.dispatch('coupons/getCouponList')
    },
    loadTop () {
      this.$store.dispatch('coupons/refreshOrders', this.$refs.loadmore.onTopLoaded)
    },
    loadBottom () {
      this.$store.dispatch('coupons/loadMoreOrders', this.$refs.loadmore.onBottomLoaded)
    }
  }
}
</script>

<style lang="less">
  @import "../global/style/theme.less";

  .coupons-list-panel {
    position: relative;
    width: 100%;
    height: 100%;
    background: #F2F2F2;
    padding: 24/@R;
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
      width: 100%;
      height: 209/@R;
      padding: 10/@R;
      background: #fff;
      border-radius: 6px;
      margin-bottom: 20/@R;
    }
    .coupons-item {
      width: 100%;
      height: 100%;
      border: 2px solid #F7F7F7;
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
