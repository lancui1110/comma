<template>
  <div class="product-item">
    <div class="pic">
      <img :src="data.picUrl || require('../../assets/pic_motu.png')">
    </div>
    <div class="detail">
      <div class="title">{{data.name}}</div>
      <div>
        <span class="tag tejia">特价</span>
      </div>
      <div>
        <span class="price" :class="{'twoline' : data.discountPrice}">
          <i>{{(data.discountPrice || data.price).toFixed(2)}}</i>元
        </span>
        <span class="orig-price" v-if="data.discountPrice">{{data.price.toFixed(2)}}元</span>
      </div>
    </div>
    <count-ctrl :num="selectedAmount" :onAdd="addToCart" :onMinus="removeFromCart"></count-ctrl>
  </div>
</template>

<script>
import { find } from 'lodash'
import { mapGetters } from 'vuex'
import CountCtrl from './CountCtrl'

export default {
  name: 'ProductItem',
  components: {
    CountCtrl
  },
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      cart: 'home/getCart'
    }),
    selectedAmount () {
      const cartItem = find(this.cart.list, item => item.product.id === this.data.id)
      if (cartItem) {
        return cartItem.count
      }
      return 0
    }
  },
  methods: {
    addToCart () {
      this.$store.dispatch('home/addToCart', this.data)
    },
    removeFromCart () {
      this.$store.dispatch('home/removeFromCart', this.data)
    }
  }
}
</script>

<style lang="less">
  @import "../../global/style/theme.less";
  @itemHeight: 160/@R;
  .product-item {
    display: flex;
    min-height: @itemHeight;
    width: 100%;
    margin-bottom: 30/@R;
    padding-right: 40/@R;
    font-size: 20/@R;

    .pic {
      flex-shrink: 0;
      width: @itemHeight;
      height: @itemHeight;
    }
    .detail {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .title {
      line-height: 42/@R;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 30/@R;
    }
    .tag {
      display: inline-block;
      margin: 10/@R 0 20/@R;
      padding: 0 10/@R;
      border: 1px solid #fff;
      border-radius: 15/@R;
      font-size: 20/@R;
      &.tejia,
      &.cuxiao {
        border-color: @font-orange;
        color: @font-orange;
      }
      &.shouqing {
        border-color: #999;
        color: #999;
      }
    }
    .price {
      margin-right: 20/@R;
      font-size: 24/@R;
      color: @font-orange;
      i {
        margin-right: 5/@R;
        line-height: 41/@R;
        font-size: 34/@R;
        font-family: "Helvetica";
        font-style: normal;
      }
    }
    .orig-price {
      line-height: 29/@R;
      font-size: 24/@R;
      color: #969696;
      text-decoration: line-through;
    }

    .buy-ctrl {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      width: 100/@R;
      .num {
        width: 70/@R;
        line-height: 41/@R;
        text-align: center;
        font-size: 34/@R;
        font-family: "Helvetica";
      }
      .buy {
        width: 38/@R;
        height: 38/@R;
      }
    }
  }
</style>
