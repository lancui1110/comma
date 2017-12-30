<template>
  <div class="admin handle-task">
    <h2>请您{{TypeLabel[taskType]}}</h2>

    <div class="task-row" v-for="item in tasks" :key="item.goodsId">
      <img :src="item.pic" alt="">
      <div class="right">
        <div class="field">
          <label>商品名称</label>
          <div>{{item.name}}</div>
        </div>
        <div class="field" v-if="taskType === 2 || taskType === 4">
          <label>{{`建议${TypeLabel[taskType]}`}}</label>
          <div>{{item.recommendedNum}}</div>
        </div>
        <div class="field" v-if="taskType === 2 || taskType === 4">
          <label>{{`实际${TypeLabel[taskType]}`}}</label>
          <input type="number" v-model="item.realNum">
        </div>
        <div class="field" v-else>
          <label>{{`${TypeLabel[taskType]}数量`}}</label>
          <input type="number" v-model="item.realNum">
        </div>
      </div>
    </div>

    <mt-button type="primary" @click="toSubmit">提交</mt-button>
  </div>
</template>

<script>
import { map, forEach } from 'lodash'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Button, Toast, MessageBox } from 'mint-ui'

Vue.component(Button.name, Button)

export default {
  name: 'HandleTask',
  data () {
    const defaultPic = require('../assets/img_upload.png')
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
      num: 0,
      defaultPic,
      localPics: [],
      serverPics: []
    }
  },
  computed: {
    ...mapGetters({
      tasks: 'admin/taskDetail' // 注意这里是数组
    })
  },
  activated () {
    this.$store.dispatch('admin/getFormTaskDetail', this.taskId)
  },
  methods: {
    toSubmit () {
      const params = map(this.tasks, item => {
        return {
          goodsId: item.goodsId,
          realNum: item.realNum
        }
      })
      let invalid = false
      forEach(params, item => {
        if (!item.realNum) {
          invalid = true
        }
      })
      if (invalid) {
        Toast('有商品数量为空，请检查～')
        return
      }

      // 不是补货，则直接提交
      if (this.taskType !== 2) {
        this.submit(params)
        return
      }

      // 存储修改数据到store，供反馈提交
      this.$store.dispatch('admin/updateHandleTaskParams', params)

      MessageBox({
        title: '提示',
        message: '是否需要拍照或备注?',
        showCancelButton: true
      }).then(action => {
        if (action === 'confirm') {
          this.$router.push({ name: 'adminFeedback', query: {taskId: this.taskId} })
        } else {
          this.submit(params)
        }
      })
    },
    submit (params) {
      this.$store.dispatch('admin/submitTask', {
        taskId: this.taskId,
        params,
        cb: () => {
          // TODO: 点击确认，如果该货架没有其他类型任务，则回到 1. 如有其他未完成类型任务，则打开新任务，同 2 提示1秒消失
          Toast('提交成功～')
          setTimeout(() => {
            this.$router.back()
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="less">
@import "./style.less";
.handle-task {
  background-color: #fff;
  margin-bottom: 10/@R ;
  h2 {
    padding: 20/@R 0 30/@R;
    text-align: center;
    font-size: 50/@R;
  }
  .task-row {
    display: flex;
    margin: 30/@R 0;
    overflow: hidden;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
    font-size: 30/@R;
    img {
      width: 250/@R;
      height: 250/@R;
      flex-shrink: 0;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .field {
      display: flex;
      margin-bottom: 10/@R;
    }
    label {
      width: 150/@R;
      flex-shrink: 0;
      &:after {
        content: "：";
      }
    }
  }
  .mint-button {
    display: block;
    width: 90%;
    margin: 50/@R auto;
  }
}
</style>

