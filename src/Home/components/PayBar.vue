<template>
  <div class="pay-bar" :class="{'no-choose-any': counts <= 0}">
    <div class="order-detail">
      <div class="logo" @click="toggleSelProducts">
        <i v-if="cart.count > 0" class="icon icon-head-top"></i>
        <i v-else class="icon icon-head-top-none"></i>
        <span v-if="cart.count > 0" class="product-count">{{cart.count}}</span>
      </div>
      <div class="pay-info">
        <div v-if="cart.count > 0">
          <p v-if="cart.discount" class="discounts">已优惠：- ¥{{cart.discount}}</p>
          <p class="total-price">合计：¥{{cart.total}}</p>
        </div>
        <p v-else class="no-choose">还未选购商品</p>
      </div>
    </div>
    <div class="pay-btn"><router-link to="pay">去支付</router-link></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PayBar',
  props: {

  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      cart: 'home/getCart'
    })
  },
  methods: {
    toggleSelProducts () {
      if (this.cart.count) {
        this.$emit('toggleSelProducts')
      }
    }
  }
}
</script>

<style lang="less">
  @import "../../global/style/theme.less";

  // 支付条
  .pay-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 100/@R;
    line-height: 100/@R;
    background: #593C38;
    color: #fff;
    font-size: 30/@R;
    z-index: 1000;
    &.no-choose-any {
      color: #999;
    }
    .order-detail {
      flex: 1;
      display: flex;
      .logo {
        position: relative;
        width: 126/@R;
        text-align: center;
      }
      .icon {
        width: 77/@R;
        height: 77/@R;
        background-size: 77/@R 77/@R;
      }
      .product-count{
        font-family: PingFangHK-Medium;
        position: absolute;
        top: 11/@R;
        left: 79/@R;
        display: inline-block;
        min-width: 34/@R;
        height: 34/@R;
        line-height: 34/@R;
        background: #C30000;
        color: #fff;
        border-radius: 17/@R;
        padding: 0 7/@R;
        font-size: 20/@R;
      }
      .pay-info {
        flex: 1;
        display: flex;
        align-items: center;
      }
      .no-choose {

      }
      .discounts {
        font-size: 24/@R;
        line-height: 33/@R;
        padding-top: 12/@R;
      }
      .total-price {
        line-height: 42/@R;
        margin-bottom: 11/@R;
      }
    }

    .pay-btn {
      background: #26100D;
      font-size: 36/@R;
      width: 240/@R;
      text-align: center;
    }
  }
</style>
