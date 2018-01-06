<template>
  <div class="my-header">
    <div class="left">
      <router-link to="">充值历史</router-link>
    </div>
    <div class="middle">
      <img class="avatar" :src="avatar" alt="">
      <span class="name">{{nickName}}</span>
    </div>
    <div class="right">
      <router-link :to="{ name: 'customerFeedback' }">
        <i class="icon icon-feedback"></i>
        反馈
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const defaultAvatar = require('../assets/default_avatar.png')

export default {
  name: 'MyHeader',
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    }),
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
    * {
      visibility: hidden; // remove after next version
    }
  }
  .middle {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .right {
    width: 130/@R;
    text-align: right;
  }
  .avatar {
    width: 180/@R;
    height: 180/@R;
    margin-bottom: 10/@R;
    border-radius: 50%;
  }
  .icon {
    margin-right: 20/@R;
  }
}
</style>
