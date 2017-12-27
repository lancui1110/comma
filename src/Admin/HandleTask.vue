<template>
  <div class="admin handle-task">
    <h2>请您{{TypeLabel[taskType]}}</h2>

    <mt-field label="商品名称" readonly :value="goodName"></mt-field>
    <mt-field label="数量" type="number" v-model="num"></mt-field>

    <mt-button type="primary">提交</mt-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Field, Button } from 'mint-ui'

Vue.component(Field.name, Field)
Vue.component(Button.name, Button)

export default {
  name: 'HandleTask',
  data () {
    const { taskId, taskType } = this.$route.params
    return {
      TypeLabel: {
        1: '盘点',
        2: '补货',
        3: '退仓',
        4: '安新'
      },
      taskId,
      taskType,
      goodName: '我是商品名称',
      num: 0
    }
  }
}
</script>

<style lang="less">
@import "./style.less";
.handle-task {

}
</style>

