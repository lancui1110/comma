<template>
  <div v-show="isShow" class="newuser-redbag-panel">
    <div class="mask"></div>
    <div class="pic-panel">
      <i class="icon icon-close" @click="hide = true"></i>
      <div class="words">
        <p class="word">恭喜获得</p>
        <p class="word">新用户专享红包</p>
      </div>
      <div class="btn"><span @click="goLogin">登录领取</span></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NewUserRedBag',
  data () {
    return {
      hide: false
    }
  },
  computed: {
    ...mapGetters({
      notifyUserLogin: 'user/notifyUserLogin'
    }),
    isShow () {
      if (this.hide || !this.notifyUserLogin) {
        this.$emit('noScroll', false)
        return false
      } else {
        setTimeout (() => {
          this.hide = true
        }, 5000)

        this.$emit('noScroll', true)
        return true
      }
    }
  },
  methods: {
    goLogin () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="less">
  @import "../../global/style/theme.less";
  
  .newuser-redbag-panel {
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
        background: url(../../assets/redbag.png) no-repeat;
        background-size: 466/@R 532/@R;
      }
      .icon {
        position: absolute;
        right: -50/@R;
        top: -50/@R;
      }
      .words {
        position: absolute;
        left: 0;
        bottom: 200/@R;
        width: 100%;
        font-size: 34/@R;
        color: #ffdf93;
        line-height: 50/@R;
        text-align: center;
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
</style>
