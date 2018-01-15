<template>
  <div class="product-item">
    <div class="pic">
      <img :src="data.picUrl || require('../../assets/pic_motu.png')">
    </div>
    <div class="detail">
      <div class="title">{{data.name}}</div>
      <div class="tag-wrapper">
        <span
          class="tag"
          :style="{ 'border-color': item.color, 'color': item.color }"
          v-for="(item, key) in data.goodsMarks"
          :key="key">
          {{item.name}}
        </span>
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
import { MessageBox } from 'mint-ui'
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
      if (this.data.status === '售罄') {
        MessageBox('商品可能售罄了', '请您在货架上确认后再购买！')
      }
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
      img {
        width: 100%;
        height: 100%;
      }
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
    .tag-wrapper {
      height: 32/@R;
      margin: 10/@R 0 20/@R;
    }
    .tag {
      display: inline-block;
      height: 32/@R;
      padding: 0 10/@R;
      margin-right: 10/@R;
      border: 1px solid #fff;
      border-radius: 15/@R;
      font-size: 20/@R;
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
