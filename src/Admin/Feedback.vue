<template>
  <div class="custermer-feedback">
    <div class="content">
      <div class="content-area">
        <span class="word">{{feedback.length}}/{{maxWords}}</span>
        <textarea v-model="feedback" cols="30" rows="10" :maxlength="maxWords" placeholder="请留下您的宝贵建议，促使我们进步~"></textarea>
      </div>
      <div class="addbtns">
        <div v-for="(item, key) in localPics" :key="key" class="img">
          <img @click="previewImages(item)" :src="item" class="addbtn" />
          <i class="icon icon-delete" @click="delPic(key)"></i>
        </div>
        <img v-show="localPics.length < 5" @click="uploadImg(key)"  :src="defaultPic" class="addbtn" />
      </div>
      <div class="btns">
        <span class="btn bg-gray">返回</span>
        <span class="btn" @click="submit">提交</span>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'

import weixin from 'weixin'
import uploadPic from 'uploadPic'

export default {
  name: 'AdminFeedback',
  props: {
  },
  data () {
    const defaultPic = require('../assets/img_upload.png')
    return {
      maxWords: 200,
      defaultPic: defaultPic,
      localPics: [],
      feedback: '',
      serverPics: []
    }
  },
  mounted () {
    weixin.init()
  },
  computed: {
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
    },
    submit () {
      if (!this.feedback) {
        Toast('请输入您的宝贵建议~')
        return
      }
      if (this.feedback.length > this.maxWords) {
        Toast(`最多输入${this.maxWords}字哦~`)
        return
      }
      const params = {
        feedback: this.feedback,
        wxPicIds: this.serverPics
      }
      this.$store.dispatch('customer/submit', {
        params: params,
        cb: (res) => {
          if (res.code === 1) {
            Toast('反馈成功')
            window.history.go(-1)
          } else {
            Toast('提交失败啦')
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
  @import "../global/style/theme.less";

  .custermer-feedback {
    width: 100%;
    height: 100%;
    background: #F2F2F2;
    text-align: center;
    .content {
      width: 100%;
      height: 444/@R;
      textarea {
        width: 100%;
        background: #fff;
        font-size: 36/@R;
        padding: 20/@R;
        outline: none;
        border: 0;
      }
    }
    .content-area {
      position: relative;
      .word {
        font-size: 36/@R;
        position: absolute;
        right: 20/@R;
        bottom: 20/@R;
        color: #999;
      }
    }
    .addbtns {
      padding-left: 30/@R;
      margin: 40/@R 0 171/@R 0;
      display: flex;
      flex-direction: row;
      .img {
        position: relative;
        width: 150/@R;
        height: 150/@R;
        margin-right: 30/@R;
      }
      img {
        width: 150/@R;
        height: 150/@R;
      }
      .icon {
        position: absolute;
        right: -10/@R;
        top: -10/@R;
      }
    }
    .btns {
      width: 100%;
      height: 97/@R;
      line-height: 97/@R;
      font-size: 36/@R;
      color: #fff;
      border-radius: 4px;
      background: #593C38;
      margin: 0 auto;
    }
  }
</style>
