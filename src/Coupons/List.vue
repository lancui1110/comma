<template>
  <div v-if="!isLoading && couponList.length === 0" class="coupons-list-panel nodata">
    <div class="logo"><i class="icon icon-head-top"></i></div>
    <div class="word">暂无优惠券</div>
  </div>
  <mt-loadmore v-else-if="couponList.length > 0" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="pageInfo.end" :auto-fill="false" ref="loadmore">
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

          <div class="word" v-if="!!item.startHour">
            <span class="left word">&nbsp;</span>
            <span class="word">限每日{{item.startHour}}~{{item.endHour}}</span>
          </div>
          <div class="word" v-if="!!item.goodsTypeMap">
            <span class="left word">&nbsp;</span>
            <span class="word">限{{joinMap(item.goodsTypeMapnp)}}</span>
          </div>
        </div>
        <!-- 1待使用 2已使用  4：过期 -->
        <img v-if="item.status === 4" class="state-pic" :src="require('../assets/icon_coupon_gq.png')" />
        <img v-if="item.status === 2" class="state-pic" :src="require('../assets/icon_coupon_sy.png')" />
        <img v-if="item.status === 5" class="state-pic" :src="require('../assets/icon_coupon_lock.png')" />
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
  data () {
    return {
      isLoading: true
    }
  },
  activated () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.isLoading = true
      this.$store.dispatch('coupons/getCouponList', () => {
        this.isLoading = false
      })
    },
    loadTop () {
      this.$store.dispatch('coupons/refreshOrders', this.$refs.loadmore.onTopLoaded)
    },
    loadBottom () {
      this.$store.dispatch('coupons/loadMoreOrders', this.$refs.loadmore.onBottomLoaded)
    },
    joinMap (obj) {
      if (!obj) return ''
      return Object.values(obj).join('、')
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
