<template>
  <div class="page admin">
    <admin-header></admin-header>

    <div class="flex center-v title">
      <h2>我的货架任务</h2>
      <router-link :to="{name: 'adminMore'}">更多</router-link>
    </div>

    <div class="task-list">
      <div class="flex center task-item label">
        <div class="flex center flex-1 address">货架地址</div>
        <div class="flex center type">任务类型</div>
        <div class="flex center prio">优先级</div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from './components/AdminHeader'

export default {
  name: 'Admin',
  components: {
    AdminHeader
  }
}
</script>

<style lang="less">
@import "./style.less";

.admin {
  color: @font-black;
  a {
    color: @font-black;
  }
  .title {
    margin-bottom: 20/@R;
    padding: 15/@R 0;
    justify-content: space-between;
    font-size: 34/@R;
  }

  .task-item {
    font-size: 32/@R;
  }
  .label {
    font-weight: bold;
  }
  div.address {
    justify-content: flex-start;
  }
  .type {
    width: 200/@R;
  }
  .prio {
    width: 100/@R;
  }
}
</style>

