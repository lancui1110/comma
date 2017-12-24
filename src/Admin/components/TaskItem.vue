<template>
  <div class="task-item">
    <router-link :to="{ name: 'taskDetail', params: { id: task.id } }" >
      <div class="type">{{task.type}}</div>
      <div class="company">{{task.company}}</div>
      <div class="address">{{task.address}}</div>
    </router-link>
    <router-link :to="{ name: 'taskDetail', params: { id: task.id } }" class="flex center deal-btn">
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
  border-radius: 10/@R;
  background-color: #fff;
  font-size: 28/@R;
  .type {
    margin-bottom: 15/@R;
    color: red;
    font-size: 40/@R;
  }
  .deal-btn {
    height: 80/@R;
    margin: 20/@R -30/@R -30/@R;
    background-color: @highlight-text-color;
    color: #fff;
  }
}
</style>

