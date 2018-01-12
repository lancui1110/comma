<template>
  <div class="top-bar">
    <div class="menu" @click="scanQRCode">
      <i class="icon icon-qr-code-white"></i>
      扫码购物
    </div>
    <div class="logo"><img :src="require('../../assets/new_logo.png')" alt="comma"></div>
    <router-link class="menu" :to="{ name: 'my' }">
      <i class="icon icon-my"></i>
      我的
    </router-link>
  </div>
</template>

<script>
import weixin from 'weixin'
import { Toast } from 'mint-ui'

export default {
  name: 'TopBar',
  methods: {
    scanQRCode () {
      const self = this
      weixin.weixinScanQRCode((res) => {
        self.$store.dispatch('home/findProductByQrCode', {
          code: res,
          cb: (res) => {
            if (res.code === 1) {
              self.$store.dispatch('home/addToCart', res.data)
            } else {
              Toast(res.msg)
            }
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
@import "../../global/style/theme.less";

.top-bar {
  display: flex;
  align-items: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 110/@R;
  padding: 22/@R 40/@R 0;
  background-color: #000;
  background: url(../../assets/top_bg.png) no-repeat;
  background-size: 100% 100%;
  color: #fff;
  z-index: 500;
  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20/@R;
    .icon {
      margin-bottom: 5/@R;
    }
  }
  .logo {
    flex-grow: 1;
    text-align: center;
    img {
      width: 232/@R;
      height: 50/@R;
      margin-top: 11/@R;
    }
  }
}
</style>

