<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import NProgress from 'nprogress'
  import wxMenu from 'wxMenu'

  export default {
    name: 'app',
    computed: {
      ...mapGetters({
        global: 'global/getGlobal'
      })
    },
    mounted () {
      wxMenu.share()
    },
    watch: {
      'global.progress' (val) {
        if (val === 0) {
          NProgress.set(0)
          NProgress.start()
        } else if (val === 100) {
          NProgress.done()
        } else {
          NProgress.set(val / 100)
          NProgress.start()
        }
      }
    },
    mounted () {
      this.$store.dispatch('user/getUserInfo')
    }
  }
</script>

<style lang="less">
  @import "./global/style/theme.less";

  html, body {
    // height: 100%;
  }

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
