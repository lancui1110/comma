<template>
  <div class="product-list">
    <ul class="list-panel">
      <li class="list-item" v-for="(item, key) in list" :key="key">
        <product-item :data="item"></product-item>
      </li>
    </ul>

  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import ProductItem from './ProductItem.vue'

export default {
  name: 'ProductList',
  components: {
    ProductItem
  },
  props: {
    list: Array
  },
  data () {
    return {
      // list: [
      //   {
      //     url: '../../assets/pic_motu.png',
      //     title: 'Dip炼乳味蛋卷橙子味 850g每盒',
      //     price: 20.00,
      //     origPrice: 30.00 // 原价
      //   },
      //   {
      //     url: '../../assets/pic_motu.png',
      //     title: 'Dip炼乳味蛋卷橙子味 850g每盒',
      //     price: 20.00
      //     // origPrice: 30.00 // 原价
      //   },
      //   {
      //     url: '../../assets/pic_motu.png',
      //     title: 'Dip炼乳味蛋卷橙子味 850g每盒',
      //     price: 20.00,
      //     origPrice: 30.00 // 原价
      //   },
      //   {
      //     url: '../../assets/pic_motu.png',
      //     title: 'Dip炼乳味蛋卷橙子味 850g每盒',
      //     price: 20.00
      //     // origPrice: 30.00 // 原价
      //   },
      //   {
      //     url: '../../assets/pic_motu.png',
      //     title: 'Dip炼乳味蛋卷橙子味 850g每盒',
      //     price: 20.00,
      //     origPrice: 30.00 // 原价
      //   },
      //   {
      //     url: '../../assets/pic_motu.png',
      //     title: 'Dip炼乳味蛋卷橙子味 850g每盒',
      //     price: 20.00
      //     // origPrice: 30.00 // 原价
      //   }
      // ]
    }
  }
}
</script>

<style lang="less">
  @import "../../global/style/theme.less";

  .product-list {
    padding-bottom: 60px;
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
  }
</style>
