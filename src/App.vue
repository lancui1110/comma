<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'
  // import NProgress from 'nprogress'
  import wxMenu from 'wxMenu'

  export default {
    name: 'app',
    computed: {
    },
    mounted () {
      this.$store.dispatch('user/getUserInfo')

      // 初始化微信分享信息 type=1 一般分享 type=2&orderNum 抢红包 type=3 申请货架
      wxMenu.share({type: 1})

      // 关闭loading
      setTimeout (() => {
        const loading = document.querySelector('#app-loading')
        if (loading) {
          loading.style.display = 'none'
        }
      }, 100)
    }
  }
</script>

<style lang="less">
  @import "./global/style/theme.less";

  #app {
    // height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "PingFang SC","Helvetica Neue",Helvetica,"Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  #nprogress .bar {
    background-color: @active-color;
  }
  #nprogress .spinner-icon {
    border-top-color: @active-color;
    border-left-color: @active-color;
  }
</style>
