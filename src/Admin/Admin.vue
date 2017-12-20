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
      <router-link
        :to="{ name: 'taskDetail', params: { id: task.id } }"
        class="flex center task-item"
        v-for="task in tasks"
        :key="task.id">
        <div class="flex center flex-1 address">{{task.address}}</div>
        <div class="flex center type">{{task.type}}</div>
        <div class="flex center prio">{{task.priority}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import AdminHeader from './components/AdminHeader'

export default {
  name: 'Admin',
  components: {
    AdminHeader
  },
  data () {
    return {
      tasks: [
        {
          id: 123,
          address: '环市东路10号',
          type: '退仓',
          priority: '高'
        },
        {
          id: 456,
          address: '中山路100号',
          type: '安新',
          priority: '中'
        }
      ]
    }
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
    height: 120/@R;
    justify-content: space-between;
    font-size: 36/@R;
  }

  .task-item {
    height: 90/@R;
    font-size: 32/@R;
  }
  .label {
    background-color: #fafafa;
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

