<template>
  <div class="sel-products-panel" :class="{'hide-menu': !isShow}">
    <div class="mask" @click="hidePanel"></div>

    <div class="sel-products">
      <div class="title">已选商品</div>
      <div class="product-list">
        <div class="product-item" v-for="(item, key) in cart.list" :key="key">
          <img class="pic" :src="item.product.picUrl || require('../../assets/pic_motu.png')">
          <div class="content">
            <p class="word">{{item.product.name}}</p>
            <p class="price">¥ {{item.product.discountPrice || item.product.price}}</p>
          </div>
          <div class="counter-panel">
            <p class="counter-line">
              <i class="icon icon-minus" @click="removeFromCart(item.product)"></i>
              <span class="count" >{{item.count}}</span>
              <i class="icon icon-plus" @click="addToCart(item.product)"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SelProducts',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: this.show
    }
  },
  computed: {
    ...mapGetters({
      cart: 'home/getCart'
    })
  },
  watch: {
    show (val) {
      this.isShow = val
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
      background: #eee;
      opacity: .5;
    }
    .sel-products {
      position: fixed;
      bottom: 0;
      // transform: translateY(0);
      left: 0;
      width: 100%;
      max-height: 695/@R;
      padding-bottom: 100/@R;
      background: transparent;
      transition: 0.4s;
      .title {
        height: 100/@R;
        line-height: 100/@R;
        padding: 0 24/@R;
        background: #F7F7F7;
        font-size: 36/@R;
        color: #593C38;
      }
      .product-list {
        max-height: 510/@R;
        padding-bottom: 28/@R;
        overflow-y: auto;
        background-color: #fff;
      }
      .product-item{
        display: flex;
        width: 100%;
        height: 148/@R;
        padding: 24/@R 21/@R 24/@R 37/@R;
        .pic {
          width: 100/@R;
          height: 100/@R;
        }
        .content {
          font-size: 24/@R;
          color: #333333;
          padding-left: 20/@R;
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-between;
        }
        .word {

        }
        .price {
          font-size: 30/@R;
          color: #D86868;
        }
      }
      .counter-panel {
        position: relative;
        text-align: end;
        width: 140/@R;
        height: 100%;
        .counter-line {
          position: absolute;
          right: 0;
          bottom: 0;
          display: flex;
        }
        .icon {

        }
        .count {
          padding: 0 5/@R;
          width: 60/@R;
          text-align: center;
          display: inline-block;
          height: 34/@R;
          line-height: 34/@R;
        }
      }
    }

  }
</style>
