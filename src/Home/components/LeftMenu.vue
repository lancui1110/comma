<template>
  <div class="left-menu-panel" :class="{'hide-menu': !isShow}">
    <div class="mask" @click="hidePanel"></div>

    <div class="left-menu">
      <div class="top-logo-user">
        <p class="line"><i class="icon icon-head-top"></i></p>
        <span class="user-phone" v-if="user">{{user.mobile}}</span>
      </div>
      <div class="menus">
        <div class="menu-item">
          <span class="icon-panel"><i class="icon icon-order"></i></span>
          <span class="word">
            <a @click="gotoPage('orderList')">订单</a>
          </span>
        </div>
        <div class="menu-item">
          <span class="icon-panel"><i class="icon icon-coupon"></i></span>
          <span class="word">
            <a @click="gotoPage('coupons')">优惠券</a>
          </span>
        </div>
        <div class="menu-item">
          <span class="icon-panel"><i class="icon icon-service"></i></span>
          <span class="word">
            <a @click="gotoPage('customerMain')">客服</a>
          </span>
        </div>
      </div>
      <div class="logo-word">
        <i class="icon icon-logo"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LeftMenu',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: this.show
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  watch: {
    show (val) {
      this.isShow = val
    }
  },
  methods: {
    showPanel () {
      this.isShow = true
      this.$emit('update:show', true)
    },
    hidePanel () {
      this.isShow = false
      this.$emit('update:show', false)
    },
    gotoPage (type) {
      this.hidePanel()
      setTimeout(() => {
        if (this.user && this.user.mobile) {
          this.$router.push({ name: type })
        } else {
          this.$router.push({ name: 'login', query: { to: type } })
        }
      }, 300)
    }
  }
}
</script>

<style lang="less">
  @import "../../global/style/theme.less";

  .left-menu-panel {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 999;
    &.hide-menu {
      width: 0;
      .mask {
        display: none;
      }
      .left-menu {
        transform: translateX(-375/@R);
      }
    }
    .mask {
      width: 100%;
      height: 100%;
      background: #eee;
      opacity: 0.5;
    }
    .left-menu {
      position: fixed;
      transition: 0.5s;
      // left: 0;
      transform: translateX(0);
      top: 0;
      width: 375/@R;
      height: 100%;
      background: #fff;
      .top-logo-user {
        padding: 143/@R 0 60/@R 0;
        text-align: center;
        .line {
          text-align: center;
          margin-bottom: 22/@R;
        }
        .icon {
          width: 120/@R;
          height: 120/@R;
          background-size: 120/@R 120/@R;
        }
        .user-phone {
          font-size: 24/@R;
          color: #593C38;
        }
      }
      .menus {
        padding-left: 20/@R;
        font-size: 36/@R;
        color: #593C38;
        a {
          color: #333;
          &:hover,
          &:focus,
          &:active,
          &:visited {
            background: transparent;
          }
        }
        .menu-item {
          padding: 26/@R 0;
        }
        .icon-panel {
          width: 156/@R;
          height: 50/@R;
          line-height: 50/@R;
          text-align: center;
          display: inline-block;
        }
        .icon {

        }
        .word{

        }
      }
      .logo-word {
        position: absolute;
        bottom: 80/@R;
        width: 100%;
        text-align: center;
      }
    }
  }
</style>
