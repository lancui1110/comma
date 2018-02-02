<template>
  <div class="admin handle-task">
    <h2>请您{{TypeLabel[taskType]}}</h2>

    <div class="task-row" v-for="(item, $index) in tasks" :key="item.goodsId">
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
          <input
            type="tel"
            v-model="item.realNum"
            placeholder="点击输入"
            :ref="`input_${$index}`">
        </div>
        <div class="field" v-else>
          <label>{{`${TypeLabel[taskType]}数量`}}</label>
          <input
            type="tel"
            v-model="item.realNum"
            placeholder="点击输入"
            :ref="`input_${$index}`">
        </div>
      </div>
    </div>

    <mt-button type="primary" @click="submit">提交</mt-button>
  </div>
</template>

<script>
import { map, forEach, trim } from 'lodash'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Button, MessageBox } from 'mint-ui'

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
      tasks: 'admin/taskDetail', // 注意这里是数组
      handleTaskParams: 'admin/handleTaskParams' // 补货的数据，注意这里是数组
    })
  },
  activated () {
    const { taskId, taskType } = this.$route.params
    this.taskId = taskId
    this.taskType = taskType

    this.$store.dispatch('admin/getFormTaskDetail', {
      taskId: this.taskId,
      cb: (data) => {
        if (this.taskType === 2 || this.taskType === 4) {
          forEach(data, item => {
            if (item.recommendedNum && !item.realNum) {
              item.realNum = item.recommendedNum
            }
          })
          this.$store.commit('admin/setTaskDetail', data)
        }
      }
    })

    // if (this.handleTaskParams.length > 0) { // 从反馈返回的，则不用更新数据
    //   this.$store.dispatch('admin/updateHandleTaskParams', [])
    // } else {
    //   this.$store.dispatch('admin/getFormTaskDetail', this.taskId)
    // }
  },
  methods: {
    // handleInputEnter (index, e) {
    //   const nextInput = this.$refs[`input_${index + 1}`]
    //   if (nextInput && !trim(nextInput[0].value)) {
    //     nextInput[0].focus()
    //   }
    // },
    toFeedBack () {
      MessageBox({
        title: '提示',
        message: '是否需要拍照或备注?',
        showCancelButton: true,
        cancelButtonText: '不用，直接提交',
        confirmButtonText: '是'
      }).then(action => {
        if (action === 'confirm') {
          this.$router.replace({ name: 'adminFeedback', query: {taskId: this.taskId} })
        } else {
          this.$router.back()
        }
      })
    },
    submit () {
      const params = map(this.tasks, item => {
        return {
          goodsId: item.goodsId,
          realNum: item.realNum || 0  // 可以不填，或者传0给后端, 那些商品不会处理的
        }
      })
      // let invalid = false
      // forEach(params, item => {
      //   if (!item.realNum) {
      //     invalid = true
      //   }
      // })
      // if (invalid) {
      //   Toast('有商品数量为空，请检查～')
      //   return
      // }

      this.$store.dispatch('admin/submitTask', {
        taskId: this.taskId,
        params,
        cb: () => {
          // TODO: 点击确认，如果该货架没有其他类型任务，则回到 1. 如有其他未完成类型任务，则打开新任务，同 2 提示1秒消失
          this.toFeedBack()
          // Toast('提交成功～')
          // setTimeout(() => {
          //   this.$router.back()
          // }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="less">
@import "./style.less";
.handle-task {
  padding-bottom: 40/@R;
  h2 {
    height: 88/@R;
    line-height: 88/@R;
    text-align: center;
    font-size: 34/@R;
    background-color: #fff;
  }
  .task-row {
    display: flex;
    margin: 30/@R 0;
    overflow: hidden;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
    font-size: 30/@R;
    background-color: #fff;
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
      width: 190/@R;
      flex-shrink: 0;
      white-space: nowrap;
      &:after {
        content: "：";
      }
    }
    input {
      width: 200/@R;
      padding-left: 10/@R;
    }
  }
  .mint-button {
    display: block;
    width: 90%;
    margin: 40/@R auto;
    &.mint-button--primary {
      background-color: @primary;
    }
  }
}
</style>

