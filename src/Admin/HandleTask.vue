<template>
  <div class="admin handle-task">
    <h2>请您{{TypeLabel[taskType]}}</h2>

    <div class="addbtns">
      <div v-for="(item, key) in localPics" :key="key" class="img">
        <img @click="previewImages(item)" :src="item" class="addbtn" />
        <i class="icon icon-delete" @click="delPic(key)"></i>
      </div>
      <img v-show="localPics.length < 5" @click="uploadImg(key)" :src="defaultPic" class="addbtn" />
    </div>
    <mt-field label="商品名称" readonly :value="task.name"></mt-field>
    <div v-if="taskType === 2 || taskType === 4">
      <mt-field :label="`建议${TypeLabel[taskType]}`" type="number" readonly :value="task.recommendedNum"></mt-field>
      <mt-field :label="`实际${TypeLabel[taskType]}`" type="number" v-model="num"></mt-field>
    </div>
    <div v-else>
      <mt-field :label="`${TypeLabel[taskType]}数量`" type="number" v-model="num"></mt-field>
    </div>

    <mt-button type="primary">提交</mt-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Field, Button } from 'mint-ui'
import weixin from 'weixin'
import uploadPic from 'uploadPic'

Vue.component(Field.name, Field)
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
      task: 'admin/taskDetail'
    })
  },
  activated () {
    weixin.init()
    this.$store.dispatch('admin/getFormTaskDetail', this.taskId)
  },
  methods: {
    uploadImg () {
      const self = this
      uploadPic.selectedPic((localId, serverId) => {
        self.addPics({localId, serverId})
      }, 4)
    },
    addPics ({localId, serverId}) {
      this.localPics.push(localId)
      this.serverPics.push(serverId)
    },
    delPic (i) {
      // const i = this.index
      this.localPics.splice(i, 1)
      this.serverPics.splice(i, 1)
      uploadPic.serverIds.splice(i, 1)
    },
    previewImages (pic) {
      uploadPic.previewImages(pic, this.localPics)
    }
  }
}
</script>

<style lang="less">
@import "./style.less";
.handle-task {
  background-color: #fff;
  h2 {
    padding: 20/@R 0 30/@R;
    text-align: center;
    font-size: 50/@R;
  }
  .mint-button {
    display: block;
    width: 90%;
    margin: 50/@R auto;
  }
}
</style>

