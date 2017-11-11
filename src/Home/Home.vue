<template>
  <div class="home">
    <div class="header">
      <a v-if="banner" :href="banner.linkUrl">
        <img class="banner" :src="banner.picUrl"/>
      </a>
      <img v-else class="banner" :src="require('../assets/header-banner.png')"/>
    </div>
    <!-- 搜索 -->
    <search-bar @toggleShowLeft="showLeftMenu" ></search-bar>

    <!-- 左侧菜单 -->
    <left-menu :show.sync="isShowLeftMenu"></left-menu>

    <!-- 菜单选项 -->
    <menu-tabs></menu-tabs>

    <!-- 商品列表 -->
    <product-list></product-list>

    <!-- 支付条 -->
    <pay-bar @toggleSelProducts="toggleSelProducts"></pay-bar>

    <!-- 所选商品 -->
    <sel-products :show.sync="isShowSelProducts"></sel-products>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ProductList from './components/ProductList'
import SearchBar from './components/SearchBar'
import MenuTabs from './components/MenuTabs'
import PayBar from './components/PayBar'
import LeftMenu from './components/LeftMenu'
import SelProducts from './components/SelProducts'

export default {
  name: 'Home',
  components: {
    ProductList,
    SearchBar,
    MenuTabs,
    PayBar,
    LeftMenu,
    SelProducts
  },
  data () {
    return {
      code: this.$route.query.code,
      isShowLeftMenu: false,
      isShowSelProducts: false
    }
  },
  mounted () {
    this.$store.dispatch('home/setCode', this.code)
    if (!this.productList.length) {
      this.$store.dispatch('home/getHomePage')
    }
    this.$store.dispatch('coupons/getAvailableCouponList')
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      banner: 'home/getBanner',
      productList: 'home/getProductList'
    })
  },
  methods: {
    showLeftMenu () {
      this.isShowLeftMenu = true
    },
    toggleSelProducts () {
      this.isShowSelProducts = !this.isShowSelProducts
    }
  }
}
</script>

<style lang="less">
  @import "../global/style/theme.less";

  @logoWidth: 94/@R;

  .home {
    font-family: PingFangHK-Regular;
    .header {
      font-size: 0;
      .banner {
        // width: 750/@R;
        width: 100%;
      }
    }
  }

  ::-webkit-input-placeholder { /* WebKit browsers */
    color:#999;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:#999;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:#999;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:#999;
  }
</style>
