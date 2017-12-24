<template>
  <div class="task-detail">
    <h1>任务详情</h1>
    <div class="row">
      <label>类型：</label>
      <div class="content">{{task.type}}</div>
    </div>
    <div class="row">
      <label>货架地址：</label>
      <div class="content">{{task.address}}</div>
    </div>
    <div class="row">
      <label>公司名称：</label>
      <div class="content">{{task.company}}</div>
    </div>
    <div class="row">
      <label>货架编号：</label>
      <div class="content">{{task.number}}</div>
    </div>
    <div class="row">
      <label>分配人：</label>
      <div class="content">{{task.assigner}}</div>
    </div>
    <div class="row">
      <label>分配时间：</label>
      <div class="content">{{task.assignTime}}</div>
    </div>
    <div class="row">
      <label>优先级：</label>
      <div class="content">{{task.priority}}</div>
    </div>
    <div class="row">
      <label>状态：</label>
      <div class="content">{{task.status}}</div>
    </div>
    <div class="row">
      <label>盘点商品：</label>
      <div class="content">{{task.checkGoods}}</div>
    </div>
    <div class="row">
      <label>补货商品：</label>
      <div class="content">{{task.supplement}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskDetail',
  data () {
    return {
      task: {
        type: '盘点、补货',
        address: '广州市越秀区环市东路10号广州市越秀区环市东路10号广州市越秀区环市东路10号',
        company: ' 广州市xxxx有限公司',
        number: ' 131242414124',
        assigner: 'xxxx',
        assignTime: '2017.12.12 10:30',
        priority: ' 高',
        status: '已完成',
        checkGoods: '全部',
        supplement: '我是商品1名称'
      }
    }
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

