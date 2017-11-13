<template>
<div class="product-list">
  <mt-loadmore :top-method="loadTop" 
    :bottom-method="loadBottom" 
    :bottom-all-loaded="pageInfo.end" 
    @top-status-change="handleTopChange"
    @bottom-status-change="handleBottomChange"
    :auto-fill="false" 
    :bottomDistance="30"
    ref="loadmore">
    <div class="product-list-panel">
      <ul class="list-panel" v-if="productList.length">
        <li class="list-item" v-for="(item, key) in productList" :key="key">
          <product-item :data="item"></product-item>
        </li>
      </ul>
      <div class="no-result" v-else>
        <img :src="require('../../assets/head_top_none.png')"/>
        <p>小主，没有找到商品哦~</p>
      </div>

      <div class="down-loaded up-loaded" v-show="productList.length && !pageInfo.end && !isLoad">
        <i class="icon icon-arrow-up"></i>
        <div class="text">上拉加载</div>
      </div>
      <div class="down-loaded all-loaded" v-show="productList.length && pageInfo.end && !isLoad">
        <div class="line"></div>
        <div class="text">我是有底线的</div>
      </div>
    </div>
  </mt-loadmore>
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
      productList: 'home/getProductList'
    }),
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
    .product-list-panel {
      margin-bottom: 120/@R;
    }
    .list-panel {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
    .list-item {
      width: 250/@R;
      height: 340/@R;
      border: 1px solid #D8D8D8;
      border-top: 0;
      border-left: 0;
    }
    .list-item:nth-child(3n) {
      border-right: 0;
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
    .down-loaded {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 20/@R;
      color: gray;
      font-size: 18/@R;
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
        width: 50/@R;
        border-bottom: 2/@R solid lightgray;
      }
    }
  }
</style>
