<template>
  <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="pageInfo.end" :auto-fill="false" ref="loadmore">
    <div class="product-list">
      <ul class="list-panel" v-if="productList.length">
        <li class="list-item" v-for="(item, key) in productList" :key="key">
          <product-item :data="item"></product-item>
        </li>
      </ul>
      <div class="no-result" v-else>
        <img :src="require('../../assets/head_top_none.png')"/>
        <p>小主，没有找到商品哦~</p>
      </div>
    </div>
  </mt-loadmore>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductItem from './ProductItem.vue'

export default {
  name: 'ProductList',
  components: {
    ProductItem
  },
  computed: {
    ...mapGetters({
      pageInfo: 'home/getPageInfo',
      productList: 'home/getProductList'
    })
  },
  methods: {
    loadTop () {
      this.$store.dispatch('home/refreshGoods', this.$refs.loadmore.onTopLoaded)
    },
    loadBottom () {
      this.$store.dispatch('home/loadMoreGoods', this.$refs.loadmore.onBottomLoaded)
    }
  }
}
</script>

<style lang="less">
  @import "../../global/style/theme.less";

  .product-list {
    padding-bottom: 120/@R;
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
  }
</style>
