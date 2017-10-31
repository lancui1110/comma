<template>
  <div class="head" :style="`position: ${fixed ? 'fixed' : 'static'}`">
    <div class="w1180">
      <img class="f-l logo" src="../assets/logo.png">
      <div class="f-r nav-right" v-if="backHome">
        <router-link class="back-home" :to="{name: 'home'}">返回首页</router-link>
      </div>
      <div class="f-r nav-right" v-else>
        <div class="hot-line f-r">客服电话：400-700-9922</div>
        <div v-if="user" class="user-panel">
          <img class="avatar" :src="user.photoUrl" v-if="user.photoUrl">
          <i class="iconfont icon-list_head" v-else></i>
          <span>{{user.realName}}</span>
          <span class="logout-btn" @click="logout">退出</span>
        </div>
        <div v-else>
          <div class="green-btn f-r sign-in-btn" @click="startSignIn">登 录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TopNav',
    props: {
      backHome: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: true
      },
      user: {
        type: Object,
        default: null
      }
    },
    methods: {
      startSignIn () {
        this.$parent.$refs.banner.$emit('openLogin')
      },
      logout () {
        iwjw.ajax({
          url: `${pageConfig.siteUrl}logout`
        }).then(res => {
          if (res.status === 1) {
            window.location.href = pageConfig.siteUrl
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../global/style/theme.less";

  .head {
    height: 80px;
    width: 100%;
    /*background: rgba(51, 51, 51, 0.6);*/
    background-color: #343B4A;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;

    .w1180 {
      width: 1180px;
      margin: 0 auto;
    }
    .logo {
      margin-top: 15px;
    }
    .nav-right {
      display: flex;
      > div {
        height: 80px;
        line-height: 80px;
        margin-left: 16px;
        color: #fff;
        font-size: 16px;
      }
    }
    .green-btn {
      text-align: center;
      background: @active-color;
      cursor: pointer;
    }
    .sign-in-btn {
      width: 72px;
      height: 36px;
      line-height: 36px;
      margin: 22px 0 0 32px;
      border-radius: 1px;
    }
    .logout-btn {
      margin-left: 16px;
      cursor: pointer;
      &:hover {
        color: @active-color;
        text-decoration: underline;
      }
    }
    .user-panel {
      display: flex;
      align-items: center;
    }
    .avatar {
      width: 20px;
      border-radius: 50%;
      margin: 0 5px;
    }
    .back-home {
      font-size: 20px;
      margin-top: 25px;
      color: #fff;
    }
  }
</style>
