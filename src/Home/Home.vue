<template>
  <div class="home">
    <div class="header">
      <img class="banner" :src="require('../assets/header-banner.png')"/>
    </div>
    <!-- 搜索 -->
    <div class="search">
      <div class="logo-user">
        <i class="icon icon-head-top" @click="showLeftMenu"></i>
        <span class="user-phone">139****2276</span>
      </div>
      <div class="search-input">
        <i class="icon icon-search"></i>
        <input type="text" v-model="searchName" placeholder="搜索">
      </div>
    </div>

    <!-- 左侧菜单 -->
    <left-menu :show.sync="isShowLeftMenu"></left-menu>

    <!-- 菜单选项 -->
    <menu-tabs></menu-tabs>

    <!-- 商品列表 -->
    <product-list class="product-list"></product-list>

    <!-- 支付条 -->
    <pay-bar @showSelProducts="showSelProducts"></pay-bar>

    <!-- 所选商品 -->
    <sel-products :show.sync="isShowSelProducts"></sel-products>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import TopNav from '../components/TopNav.vue'
// import HomeFooter from '../components/HomeFooter'
// import PartBanner from './components/PartBanner'
// import { Message } from 'element-ui'

import ProductList from './components/ProductList'
import MenuTabs from './components/MenuTabs'
import PayBar from './components/PayBar'
import LeftMenu from './components/LeftMenu'
import SelProducts from './components/SelProducts'

export default {
  name: 'Home',
  components: {
    ProductList,
    MenuTabs,
    PayBar,
    LeftMenu,
    SelProducts
  },
  data () {
    return {
      searchName: '',
      isShowLeftMenu: false,
      isShowSelProducts: false
    }
  },
  mounted () {
    this.initEvent()
  },
  computed: {
    // ...mapGetters({
    //   user: 'user/getUser'
    // })
    // 选择商品数
    counts () { 
      return 10
    },
    discounts () {
      return 15.00
    },
    total () {
      return 129.03
    }
  },
  methods: {
    showLeftMenu () {
      this.isShowLeftMenu = true
    },
    showSelProducts () {
      this.isShowSelProducts = true
    },
    initEvent () {
      
    }
  }
}
</script>

<style lang="less">
  @import "../global/style/theme.less";

  @logoWidth: 94/@R;
  .icon {
    display: inline-block;
    vertical-align: middle;
  }
  .icon-head-top {
    width: 94/@R;
    height: 94/@R;
    background: url(../assets/head_top.png) no-repeat;
    background-size: 94/@R 94/@R;
  }
  .icon-head-top-none {
    width: 90/@R;
    height: 90/@R;
    background: url(../assets/head_top_none.png) no-repeat;
    background-size: 90/@R 90/@R;
  }
  .icon-search {
    width: 32/@R;
    height: 32/@R;
    background: url(../assets/search.png) no-repeat;
    background-size: 32/@R 32/@R;
  }
  .icon-more {
    width: 41/@R;
    height: 41/@R;
    background: url(../assets/more.png) no-repeat;
    background-size: 41/@R 41/@R;
  }
  .icon-buy {
    width: 50/@R;
    height: 50/@R;
    background: url(../assets/buy.png) no-repeat;
    background-size: 50/@R 50/@R;
  }
  .icon-order {
    width: 37/@R;
    height: 40/@R;
    background: url(../assets/order.png) no-repeat;
    background-size: 37/@R 40/@R;
  }
  .icon-coupon {
    width: 44/@R;
    height: 37/@R;
    background: url(../assets/coupon.png) no-repeat;
    background-size: 44/@R 37/@R;
  }
  .icon-service {
    width: 40/@R;
    height: 44/@R;
    background: url(../assets/service.png) no-repeat;
    background-size: 40/@R 44/@R;
  }
  .icon-logo {
    width: 145/@R;
    height: 22/@R;
    background: url(../assets/logo.png) no-repeat;
    background-size: 145/@R 22/@R;
  }
  .icon-logo {
    width: 145/@R;
    height: 22/@R;
    background: url(../assets/logo.png) no-repeat;
    background-size: 145/@R 22/@R;
  }
  .icon-plus {
    width: 34/@R;
    height: 34/@R;
    background: url(../assets/icon_plus.png) no-repeat;
    background-size: 34/@R 34/@R;
  }
  .icon-minus {
    width: 34/@R;
    height: 34/@R;
    background: url(../assets/icon_minus.png) no-repeat;
    background-size: 34/@R 34/@R;
  }

  .home {
    font-family: PingFangHK-Regular;
    .header {
      font-size: 0;
      .banner {
        width: 750/@R;
      }
    }

    /* 查询 */
    .search {
      display: flex;
      height: 95/@R;
      .logo-user {
        position: relative;
        width: 166/@R;
        .icon {
          position: absolute;
          top: -40/@R;
          left: 28/@R;
        }
      }
      .user-phone {
        position: absolute;
        top: 63/@R;
        left: 20/@R;
        text-align: center;
        font-size: 18/@R;
        color: #999;
      }
      .search-input {
        position: relative;
        flex: 1;
        line-height: 95/@R;
        margin-right: 20/@R;
        input {
          width: 100%;
          border: 1px solid #979797;
          border-radius: 4px;
          height: 58/@R;
          padding: 0 66/@R;
        }
        .icon-search {
          position: absolute;
          left: 21/@R;
          top: (95-32)/2/@R;
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
