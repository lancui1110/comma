<template>
  <div class="task-detail">
    <h1>任务详情</h1>
    <div class="row">
      <label>类型：</label>
      <div class="content">{{task.taskTypeInfo}}</div>
    </div>
    <div class="row">
      <label>货架地址：</label>
      <div class="content">{{task.address}}</div>
    </div>
    <div class="row">
      <label>公司名称：</label>
      <div class="content">{{task.companyName}}</div>
    </div>
    <div class="row">
      <label>货架编号：</label>
      <div class="content">{{task.shelfCode}}</div>
    </div>
    <div class="row">
      <label>分配人：</label>
      <div class="content">{{task.operator}}</div>
    </div>
    <div class="row">
      <label>分配时间：</label>
      <div class="content">{{task.createTime}}</div>
    </div>
    <div class="row">
      <label>优先级：</label>
      <div class="content">{{task.levelInfo}}</div>
    </div>
    <div class="row">
      <label>状态：</label>
      <div class="content">{{task.status ? '已完成' : '未完成'}}</div>
    </div>
    <div class="row">
      <label>{{task.taskTypeInfo}}商品：</label>
      <!-- allgoods=1 不显示商品列表 -->
      <div class="content" v-if="task.allGoods === 1">全部</div>
      <div class="content" v-else>
        <div class="good-item" v-for="item in task.goodsList" :key="item.id">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TaskDetail',
  computed: {
    ...mapGetters({
      task: 'admin/taskDetail'
    })
  },
  activated () {
    this.$store.dispatch('admin/getTaskDetail', this.$route.params.id)
  }
}
</script>

<style lang="less">
@import "./style.less";
.task-detail {
  padding: 30/@R 30/@R 100/@R;
  h1 {
    font-size: 60/@R;
    margin-bottom: 40/@R
  }
  .row {
    display: flex;
    margin-bottom: 30/@R;
    font-size: 32/@R;
    label {
      width: 200/@R;
      flex-shrink: 0;
    }
  }
}
</style>

