<template>
  <div class="top-bar">
    <div class="menu" @click="scanQRCode">
      <i class="icon icon-qr-code-white"></i>
      扫码购物
    </div>
    <div class="logo"><img :src="require('../../assets/new_logo.png')" alt="comma"></div>
    <a
      class="menu recharge"
      @click="checkLoginStatus('recharge')">
      <i class="icon icon-recharge"></i>
      充值
    </a>
    <a
      class="menu"
      @click="checkLoginStatus('my')">
      <i class="icon icon-my"></i>
      我的
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import weixin from 'weixin'
import { Toast } from 'mint-ui'
import utils from '../../global/utils'

export default {
  name: 'TopBar',
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  methods: {
    checkLoginStatus (to) {
      if (this.user && this.user.mobile) {
        this.$router.push({ name: to })
      } else {
        this.$router.push({ name: 'login' })
      }
    },
    scanQRCode (e) {
      const self = this

      if (utils.isAlipay()) {
        ap.scan({ type: 'bar' }, (res) => {
          self.doAfterScan(res.code)
        })
      } else {
        weixin.weixinScanQRCode((res) => {
          self.doAfterScan(res)
        })
      }
    },
    doAfterScan (code) {
      const self = this
      self.$store.dispatch('home/findProductByQrCode', {
        code,
        cb: (res) => {
          if (res.code === 1) {
            // self.$store.dispatch('home/addToCart', res.data)
            setTimeout(() => {
              const initX = 60
              const initY = 50
              const targetX = 30
              const targetY = screen.height - 50
              let curvature = 0.9
              let speed = 0.7

              const ball = document.createElement('div')
              ball.appendChild(document.createTextNode('1'))
              ball.setAttribute('class', 'ball')
              ball.style.top = initY + 'px'
              ball.style.left = initX + 'px'
              document.body.insertAdjacentElement('afterbegin', ball)
              const p = new iwjw.Parabola({
                el: ball,
                direction: 'down',
                curvature: curvature,
                speed: speed,
                origin: { x: initX, y: initY },
                target: { x: targetX, y: targetY },
                onMotionDone: () => {
                  ball.remove()
                  self.$store.dispatch('home/addToCart', res.data)
                }
              })
              p.start()
            }, 300)
          } else {
            Toast(res.msg)
          }
        }
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
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20/@R;
    .icon {
      margin-bottom: 5/@R;
    }
    &.recharge {
      margin-right: 60/@R;
    }
  }
  .logo {
    flex-grow: 1;
    text-align: center;
    img {
      width: 232/@R;
      height: 50/@R;
      margin-top: 11/@R;
      margin-right: -90/@R;
    }
  }
}
</style>

