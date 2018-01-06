<template>
  <div class="task-item">
    <router-link :to="{ name: 'taskDetail', params: { id: task.taskId } }" >
      <div class="type">{{task.taskTypeInfo}}</div>
      <div class="company">{{task.companyName}}</div>
      <div class="address">{{task.address}}</div>
    </router-link>
    <router-link
      :to="{ name: 'handleTask', params: { taskId: task.taskId, taskType: task.taskType } }"
      class="flex center deal-btn"
      v-if="task.status === 0">
      去处理
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    task: Object
  }
}
</script>

<style lang="less">
@import "../style.less";
.task-item {
  padding: 30/@R;
  margin-bottom: 30/@R;
  line-height: 50/@R;
  overflow: hidden;
  background-color: #fff;
  font-size: 28/@R;
  .type {
    margin-bottom: 15/@R;
    color: red;
    font-size: 40/@R;
  }
  .deal-btn {
    height: 80/@R;
    margin: 20/@R 0 0;
    border-radius: 10/@R;
    background-color: @primary;
    color: #fff;
  }
}
</style>

