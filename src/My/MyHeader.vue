<template>
  <div class="my-header">
    <div class="left">
      <router-link :to="{ name: 'rechargeList' }">充值历史</router-link>
    </div>
    <div class="middle">
      <label>账户余额</label>
      <span class="amount">¥<span class="num">{{this.money}}</span></span>
      <router-link class="recharge-btn" :to="{ name: 'recharge' }">充值有礼</router-link>
    </div>
    <div class="right">
      <a :href="`${baseUrl}/customer/feedBack`">
        <i class="icon icon-feedback"></i>
        反馈
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const defaultAvatar = require('../assets/default_avatar.png')

export default {
  name: 'MyHeader',
  data () {
    return {
      baseUrl: `${pageConfig.siteUrl}index`
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    }),
    money () {
      if (this.user) {
        return this.user.money.toFixed(2)
      }
      return 0.00
    },
    avatar () {
      if (this.user && this.user.avatar) {
        return this.user.avatar
      }
      return defaultAvatar
    },
    nickName () {
      if (this.user && this.user.nickName) {
        return this.user.nickName
      }
      return ''
    }
  }
}
</script>

<style lang="less">
@import "../global/style/theme.less";

.my-header {
  display: flex;
  height: 300/@R;
  padding: 30/@R 40/@R 0;
  background-color: #fff;
  font-size: 28/@R;
  color: @font-gray;
  a {
    color: @font-gray;
  }
  .left {
    width: 130/@R;
  }
  .middle {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: @text-color;
    label {
      font-size: 32/@R;
      font-weight: bold;
    }
  }
  .right {
    width: 130/@R;
    text-align: right;
  }
  .amount {
    line-height: 84/@R;
    margin: 15/@R 0 20/@R;
    font-size: 60/@R;
    .num {
      font-weight: bold;
      font-family: "Helvetica";
    }
  }
  .recharge-btn {
    width: 200/@R;
    height: 70/@R;
    line-height: 67/@R;
    text-align: center;
    border-radius: 33/@R;
    border: 4/@R solid @primary;
    color: @primary;
    font-size: 32/@R;
  }
}
</style>
