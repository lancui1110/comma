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


    <div class="redbag">
      <div class="mask"></div>
      <div class="pic-panel">
        <i class="icon icon-close"></i>
        <div class="words">
          <p class="word">恭喜获得</p>
          <p class="word">新用户专享红包</p>
        </div>
        <div class="btn"><span>登录领取</span></div>
      </div>
    </div>
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
    this.$store.dispatch('coupons/getAvailableCouponList', (newCouponList) => {
      // 如果购物车里有东西，需要重新计算一下购物车数据
      if (this.cart.count) {
        this.$store.commit('home/setCart', calCartInfo(this.cart, newCouponList))
      }
    })
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
    .mint-loadmore {
      margin-bottom: 120/@R;
    }

    .redbag {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
      .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #333;
        opacity: .3;
      }
      .pic-panel {
        position: relative;
        width: 466/@R;
        height: 532/@R;
        background: url(../assets/redbag.png) no-repeat;
        background-size: 466/@R 532/@R;
      }
      .icon {
        position: absolute;
        right: -50/@R;
        top: -50/@R;
      }
      .words {
        font-size: 34/@R;
        color: #ffdf93;
        line-height: 30/@R;
      }
      .btn {
        position: absolute;
        left: 0;
        bottom: 54/@R;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          display: block;
          font-size: 30/@R;
          width: 298/@R;
          height: 82/@R;
          line-height: 82/@R;
          background: #ffdf93;
          color: #cf3c36;
          text-align: center;
          border-radius: 6/@R;
        }
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
