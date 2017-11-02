<template>
  <div class="coupons-list-panel">
    <div v-for="(item, key) in 4" :key="key" class="coupons-item-panel">
      <div class="coupons-item" :class="{'gray': false}">
        <div class="word red">
          <span class="left word large">10元</span>
          <span class="word">10元</span>
        </div>
        <div class="word">
          <span class="left word">新手满减</span>
          <span class="word">17.09.09～17.10.10</span>
        </div>
      </div>
      <!-- <img class="state-pic" :src="require('../assets/icon_coupon_gq.png')" /> -->
      <img class="state-pic" :src="require('../assets/icon_coupon_sy.png')" />
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'CouponsList',
  props: {
  },
  data () {
    return {
      
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
      margin-right: 110/@R;
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
