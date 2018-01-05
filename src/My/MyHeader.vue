<template>
  <div class="my-header">
    <div class="left">
      <router-link to="">充值历史</router-link>
    </div>
    <div class="middle">
      <img class="avatar" src="https://avatars3.githubusercontent.com/u/6167168?s=200&v=4" alt="">
      <span class="name">韦进仕</span>
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
export default {
  name: 'MyHeader'
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
    width: 100/@R;
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
    width: 100/@R;
  }
  .avatar {
    width: 180/@R;
    height: 180/@R;
    margin-bottom: 10/@R;
    border-radius: 50%;
  }
}
</style>
