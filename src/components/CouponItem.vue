<template>
  <div class="coupons-item-panel">
    <div class="coupons-item" :class="{'gray': coupon.status === 2  || coupon.status === 4 || coupon.status === 5}">
      <div class="word">
        <span class="left word large red">{{coupon.price}}元</span>
        <span class="word name">
          {{coupon.name}}
          <!-- 1待使用 2已使用 4已过期 5返还中 -->
          <span :class="`status-btn ${coupon.status === 5 ? 'orange' : ''}`"
            v-if="coupon.status === 2 || coupon.status === 4 || coupon.status === 5">
            {{statusText[coupon.status]}}
          </span>
        </span>
      </div>
      <div class="word meta">
        <span class="left word">满{{coupon.lowPrice}}元立减</span>
        <span class="word">{{coupon.startDate}}~{{coupon.endDate}}</span>
      </div>

      <div class="word limit" v-if="!!coupon.startHour">
        <span class="left word">&nbsp;</span>
        <span class="word">限每日{{coupon.startHour}}~{{coupon.endHour}}</span>
      </div>
      <div class="word limit" v-if="!!coupon.goodsTypeMap">
        <span class="left word">&nbsp;</span>
        <span class="word">限{{joinMap(coupon.goodsTypeMap)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CouponItem',
  props: {
    coupon: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      statusText: {
        2: '已使用',
        4: '已过期',
        5: '返还中'
      }
    }
  },
  methods: {
    joinMap (obj) {
      if (!obj) return ''
      return Object.values(obj).join('、')
    }
  }
}
</script>

<style lang="less">
@import "../global/style/theme.less";

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


    .coupons-item {
      width: 100%;
      height: 100%;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: left;
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
    .limit {
      margin-top: 7/@R;
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
  }
</style>

