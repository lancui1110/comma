<template>
<div class="product-list">
  <!-- <mt-loadmore :top-method="loadTop"
    :bottom-method="loadBottom"
    :bottom-all-loaded="pageInfo.end"
    @top-status-change="handleTopChange"
    @bottom-status-change="handleBottomChange"
    :auto-fill="false"
    :bottomDistance="5"
    ref="loadmore"> -->
    <div class="product-list-panel">
      <ul class="list-panel" v-if="productList.length">
        <product-item :data="item" v-for="(item, key) in productList" :key="key"></product-item>
      </ul>
      <div class="no-result" v-else>
        <img :src="require('../../assets/head_top_none.png')"/>
        <p>小主，没有找到商品哦~</p>
      </div>

      <!-- <div class="down-loaded up-loaded" v-show="productList.length && !pageInfo.end && !isLoad">
        <i class="icon icon-arrow-up"></i>
        <div class="text">上拉加载</div>
      </div> -->

      <router-link v-if="!isHideWish" class="wish-btn" :to="{ name: 'wish' }">您想要的告诉我吧</router-link>
      <div class="down-loaded all-loaded">
        <div class="line"></div>
        <div class="text">我是有底线的</div>
      </div>
    </div>
  <!-- </mt-loadmore> -->
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductItem from './ProductItem.vue'

export default {
  name: 'ProductList',
  data () {
    return {
      loadStatus: ''
    }
  },
  components: {
    ProductItem
  },
  computed: {
    ...mapGetters({
      pageInfo: 'home/getPageInfo',
      category: 'home/getCategory',
      // productList: 'home/getProductList',
      allProductList: 'home/allProductList'
    }),
    productList () {
      return this.allProductList[this.category.current] || []
    },
    isLoad () {
      if (this.loadStatus === '') {
        return true
      } else if (this.loadStatus === 'loading') {
        return true
      } else if (this.loadStatus === 'drop') {
        return true
      } else if (this.loadStatus === 'pull') {
        return false
      }
      return false
    },
    isHideWish () {
      const cur = this.category.current
      return cur === '特价商品' || cur === '我常购买'
    }
  },
  methods: {
    loadTop () {
      this.$store.dispatch('home/refreshGoods', this.$refs.loadmore.onTopLoaded)
    },
    loadBottom () {
      this.$store.dispatch('home/loadMoreGoods', this.$refs.loadmore.onBottomLoaded)
    },
    handleTopChange (status) {
      this.loadStatus = status
    },
    handleBottomChange (status) {
      this.loadStatus = status
    }
  }
}
</script>

<style lang="less">
  @import "../../global/style/theme.less";

  .product-list {
    flex-grow: 1;
    padding-top: 30/@R;
    padding-bottom: 130/@R;
    overflow: hidden;
    background: #fff;
    .list-panel {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
    .no-result {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 500/@R;
      img {
        width: 150/@R;
        margin-bottom: 30/@R;
      }
    }
    .wish-btn {
      display: block;
      width: 520/@R;
      height: 80/@R;
      line-height: 80/@R;
      margin: 0 auto 60/@R;
      text-align: center;
      border-radius: 40/@R;
      border: 1/@R solid @border-gray !important;
      font-size: 30/@R;
      color: @text-color;
    }
    .down-loaded {
      display: flex;
      justify-content: center;
      align-items: center;
      color: gray;
      font-size: 24/@R;
      .text {
        width: 200/@R;
        text-align: center;
      }
    }
    .up-loaded {
      .text {
        width: auto;
        padding: 0 10/@R;
      }
    }
    .all-loaded {
      &:before,
      &:after {
        content: " ";
        display: block;
        width: 120/@R;
        border-bottom: 2/@R solid lightgray;
      }
    }
    .mint-loadmore-text {
      font-size: 18/@R;
    }
    .mint-loadmore-bottom {

    }
  }
</style>
