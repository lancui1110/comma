<template>
  <div class="home" :class="{'no-scroll' : isFixed}">
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

    <newuser-redbag @noScroll="noScroll"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { calCartInfo } from '../store/modules/home'

import ProductList from './components/ProductList'
import SearchBar from './components/SearchBar'
import MenuTabs from './components/MenuTabs'
import PayBar from './components/PayBar'
import LeftMenu from './components/LeftMenu'
import SelProducts from './components/SelProducts'
import NewuserRedbag from './components/NewUserRedBag'

export default {
  name: 'Home',
  components: {
    ProductList,
    SearchBar,
    MenuTabs,
    PayBar,
    LeftMenu,
    SelProducts,
    NewuserRedbag
  },
  data () {
    return {
      queryTimes: 0,  // 轮询优惠券次数，20次就不再轮询
      code: this.$route.query.code,
      isShowLeftMenu: false,
      isShowSelProducts: false,
      isFixed: true
    }
  },
  mounted () {
    this.$store.dispatch('home/setCode', this.code)
    if (!this.productList.length) {
      this.$store.dispatch('home/getHomePage')
    }
    // 轮询优惠券
    this.queryAvailableCoupon()
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      banner: 'home/getBanner',
      cart: 'home/getCart',
      productList: 'home/getProductList'
    })
  },
  methods: {
    queryAvailableCoupon () {
      this.$store.dispatch('coupons/getAvailableCouponList', (newCouponList) => {
        // 如果购物车里有东西，需要重新计算一下购物车数据
        if (this.cart.count) {
          this.$store.commit('home/setCart', calCartInfo(this.cart, newCouponList))
        }

        this.queryTimes += 1

        if (this.queryTimes < 20) {
          setTimeout(() => {
            this.queryAvailableCoupon()
          }, 3000)
        }
      })
    },
    showLeftMenu () {
      this.isShowLeftMenu = true
    },
    toggleSelProducts () {
      this.isShowSelProducts = !this.isShowSelProducts
    },
    noScroll (isFixed) {
      this.isFixed = isFixed
    }
  }
}
</script>

<style lang="less">
  @import "../global/style/theme.less";

  @logoWidth: 94/@R;

  .home {
    font-family: PingFangHK-Regular;
    &.no-scroll {
      height: 100%;
      overflow: hidden;
    }
    .header {
      font-size: 0;
      width: 100%;
      .banner {
        // width: 750/@R;
        width: 100%;
      }
    }
    .mint-loadmore {
      margin-bottom: 120/@R;
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
