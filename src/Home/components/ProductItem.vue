<template>
  <div class="product-item">
    <div class="pic">
      <img :src="data.picUrl || require('../../assets/pic_motu.png')">
    </div>
    <p class="title">{{data.name}}</p>
    <div class="price-panel">
      <div class="price-info">
        <p class="price" :class="{'twoline' : data.discountPrice}">
          ¥ {{(data.discountPrice || data.price).toFixed(2)}}
        </p>
        <p class="orig-price" v-if="data.discountPrice">¥ {{data.price.toFixed(2)}}</p>
      </div>
      <div class="buy" @click="clickBuy"><i class="icon icon-buy"></i></div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'ProductItem',
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    clickBuy () {
      this.$store.dispatch('home/addToCart', this.data)
    }
  }
}
</script>

<style lang="less">
  @import "../../global/style/theme.less";
  .product-item {
    font-family: PingFangHK-Medium;
    padding: 10/@R 10/@R 15/@R 10/@R;
    font-size: 20/@R;
    .pic {
      text-align: center;
    }
    .pic img{
      width: 178/@R;
      height: 178/@R;
    }
    .title {
      height: 74/@R;
      font-size: 24/@R;
    }
    .price-panel {
      height: 62/@R;
      line-height: 62/@R;
      display: flex;
      justify-content: space-between;
      .price-info {
        font-size: 30/@R;
        color: #D86868;
        line-height: 62/@R;
      }
      .twoline {
        line-height: 42/@R;
      }
      .orig-price {
        font-size: 20/@R;
        color: #999999;
        line-height: 18/@R;
        text-decoration: line-through;
      }
      .buy {
        float: right;
      }
    }
  }

</style>
