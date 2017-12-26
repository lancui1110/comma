<template>
  <div class="admin handle-task">
    <h2>请您{{type}}</h2>

    <mt-field label="商品名称" readonly :value="goodName"></mt-field>
    <mt-field label="{{type}}数量" type="number" v-model="num"></mt-field>

    <mt-button type="primary">提交</mt-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Field } from 'mint-ui'
import { Button } from 'mint-ui'

Vue.component(Field.name, Field)
Vue.component(Button.name, Button)

export default {
  name: 'TaskItem',
  data () {
    const { taskId, type } = this.$router.params
    return {
      taskId,
      type,
      goodName: '我是商品名称',
      num: 0
    }
  }
}
</script>

<style lang="less">
@import "../style.less";
.handle-task {

}
</style>

