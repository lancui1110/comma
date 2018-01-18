<template>
  <div class="sel-products-panel" :class="{'hide-menu': !isShow}">
    <div class="mask" @click="hidePanel"></div>

    <div v-show="!showPayType" class="sel-products">
      <div class="title">已选商品 {{cart.count ? `（${cart.count}）` : ''}}</div>
      <div class="sel-product-list">
        <div class="item" v-for="(item, key) in cart.list" :key="key">
          <div class="name">{{item.product.name}}</div>
          <div class="orig-price">{{item.product.discountPrice ? item.product.price.toFixed(2) : '&nbsp;'}}</div>
          <div class="price">{{(item.product.discountPrice || item.product.price).toFixed(2)}}<span class="unit">元</span></div>
          <count-ctrl
            :num="item.count"
            :onAdd="() => addToCart(item.product)"
            :onMinus="() => removeFromCart(item.product)">
          </count-ctrl>
        </div>
      </div>
      <div class="pay-info-bottom">
        <div class="coupon-info" v-show="cartDiscountTextInfo">
          {{cartDiscountTextInfo}}
          <!-- 红包抵扣：-{{cart.coupon.price.toFixed(2)}}元
          <span v-if="cart.coupon && cart.maxCoupon && cart.coupon.numberCode !== cart.maxCoupon.numberCode">
            (再购{{(cart.maxCoupon.lowPrice - this.cartDiscountAmount).toFixed(2)}}元，可用{{cart.maxCoupon.price}}元红包哦~)
          </span> -->
        </div>
        <div class="pay-type" @click="showPayType = true">
          <div class="label">支付方式</div>
          <div class="value">
            <i class="icon" :class="`${payType === 'wx' ? 'icon-wx' : 'icon-yue-dark'}`"></i>
            {{payType === 'wx' ? '微信支付' : '账户余额'}}
            <i class="icon icon-arrow-down"></i>
          </div>
        </div>
      </div>

    </div>
    <div v-show="showPayType" class="sel-products">
      <div class="title" @click="showPayType = false">
        <div class="text">请选择支付方式</div>
        <i class="icon icon-arrow-up"></i>
      </div>
      <div class="item pay-type-item" @click="changePayType('yue')" v-if="canUseYue">
        <div class="name">
          <i class="icon icon-yue-dark"></i>
          账户余额（<span class="price">{{user && user.money.toFixed(2)}}元</span>）
        </div>
        <i class="icon icon-check-black" v-if="payType === 'yue'"></i>
      </div>
      <div class="item pay-type-item" v-else>
        <div class="name disabled">
          <i class="icon icon-yue"></i>
          账户余额（{{user && user.money.toFixed(2)}}元，余额不足）
        </div>
      </div>
      <div class="item pay-type-item" @click="changePayType('wx')">
        <div class="name">
          <i class="icon icon-wx"></i>
          微信支付
        </div>
        <i class="icon icon-check-black" v-if="payType === 'wx'"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { sum, map } from 'lodash'
import { mapGetters } from 'vuex'
import CountCtrl from './CountCtrl'

export default {
  name: 'SelProducts',
  components: {
    CountCtrl
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showPayType: false,
      isShow: this.show
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      cart: 'home/getCart',
      payType: 'home/payType'
    }),
    cartDiscountAmount () {
      return sum(map(this.cart.list, item => item.count * (item.product.discountPrice || item.product.price)))
    },
    cartDiscountTextInfo () {
      let { couponAmount, discountAmount } = this.cart
      let res = []
      if (couponAmount) {
        res.push(`红包抵扣：-${couponAmount.toFixed(2)}元`)
      }
      if (discountAmount) {
        res.push(`商品折扣：-${(discountAmount).toFixed(2)}元`)
      }
      return res.join('，')
    },
    canUseYue () {
      // 是否可用余额
      return this.user && this.user.money >= this.cart.realAmount
    }
  },
  watch: {
    show (val) {
      this.isShow = val
      this.$emit('noScroll', val)

      if (val) {
        this.showPayType = false
      }
    }
  },
  methods: {
    showPanel () {
      this.isShow = true
      this.$emit('update:show', true)
    },
    hidePanel () {
      this.isShow = false
      this.$emit('update:show', false)
    },
    addToCart (product) {
      this.$store.dispatch('home/addToCart', product)
    },
    removeFromCart (product) {
      this.$store.dispatch('home/removeFromCart', product)
      if (!this.cart.count) {
        this.hidePanel()
      }
    },
    changePayType (type) {
      if (type === 'yue' && !this.canUseYue) {
        return
      }
      this.$store.commit('home/setPayType', type)
      this.showPayType = false
    }
  }
}
</script>

<style lang="less">
  @import "../../global/style/theme.less";

  .sel-products-panel {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    &.hide-menu {
      width: 0;
      .sel-products {
        bottom: -100%;
      }
      .mask {
        display: none;
      }
    }
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .5);
    }
    .sel-products {
      position: fixed;
      bottom: 0;
      // transform: translateY(0);
      left: 0;
      width: 100%;
      max-height: 928/@R;
      padding: 0 40/@R 0;
      background-color: #fff;
      transition: 0.4s;
      margin-bottom: 100/@R;
      .title {
        height: 100/@R;
        line-height: 100/@R;
        border-bottom: 1/@R solid #e6e6e6;
        font-size: 30/@R;
        font-weight: bold;
      }
      .sel-product-list {
        // max-height: 824/@R;
        max-height: 644/@R;
        overflow-y: auto;
      }
      .item{
        display: flex;
        align-items: center;
        height: 92/@R;
        border-bottom: 1/@R solid #e6e6e6;
        &.pay-type-item {
          .price {
            margin-left: 0;
          }
          .icon-check-black {
            margin-right: 10/@R;
          }
        }

        .name {
          flex-grow: 1;
          min-width: 0;
          width: 300/@R;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 30/@R;
          &.disabled {
            color: @font-gray-light;
          }
        }
        .price {
          line-height: 30/@R;
          margin-left: 40/@R;
          white-space: nowrap;
          font-size: 34/@R;
          font-family: "Helvetica";
          color: @font-orange;
          .unit {
            font-size: 24/@R;
          }
        }
        .orig-price {
          line-height: 20/@R;
          // margin-left: 20/@R;
          text-align: right;
          width: 88/@R;
          min-height: 20/@R;
          white-space: nowrap;
          font-size: 24/@R;
          font-family: "Helvetica";
          color: @font-gray-light;
          text-decoration: line-through;
        }
      }
      .count-ctrl {
        margin-left: 40/@R;
      }
      .coupon-info {
        padding: 25/@R 0;
        line-height: 42/@R;
        border-bottom: 1/@R solid #e6e6e6;
        color: @font-orange;
        font-size: 28/@R;
      }
    }
    .pay-info-bottom {

    }
    .pay-type {
      display: flex;
      align-items: center;
      height: 92/@R;
      .label {
        flex-grow: 1;
      }
      .icon {
        margin-right: 10/@R;
      }
    }
    .title {
      display: flex;
      align-items: center;
      .text {
        flex-grow: 1;
      }
      .icon {
        margin-right: 10/@R;
      }
    }
  }
</style>
