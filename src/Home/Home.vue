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
