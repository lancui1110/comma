<template>
  <div class="custermer-wish">
    <div class="content">
      <div class="text-label">许下一个小心愿</div>
      <div class="content-area">
        <span class="word">{{feedback.length}}/{{maxWords}}</span>
        <textarea v-model="feedback" cols="30" rows="10" :maxlength="maxWords" placeholder="轻轻地告诉我，您想吃什么~"></textarea>
      </div>
      <div class="img-panel" v-show="!isAlipay">
        <div class="img-label">图片（不能说的秘密就上图吧）</div>
        <div class="addbtns">
          <div v-for="(item, key) in localPics" :key="key" class="img">
            <img @click="previewImages(item)" :src="item" class="addbtn" />
            <i class="icon icon-delete" @click="delPic(key)"></i>
          </div>
          <img v-show="localPics.length < 4" @click="uploadImg(key)"  :src="defaultPic" class="addbtn" />
        </div>
      </div>
      <div class="subBtn" :disabled="submiting" @click="submit">提 交{{submiting ? ' 中 ...' : ''}}</div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'

import weixin from 'weixin'
import uploadPic from 'uploadPic'
import utils from '../global/utils'

export default {
  name: 'Wish',
  props: {
  },
  data () {
    const defaultPic = require('../assets/img_upload.png')
    return {
      isAlipay: utils.isAlipay(),
      submiting: false,
      submitSuccess: false,
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
  activated () {
    this.localPics = []
    this.feedback = ''
    this.serverPics = []
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
      if (this.submiting || this.submitSuccess) {
        return
      }

      this.submiting = true
      const params = {
        feedback: this.feedback,
        wxPicIds: this.serverPics
      }
      this.$store.dispatch('customer/feedbackSubmitWant', {
        params: params,
        cb: (res) => {
          if (res.code === 1) {
            this.submitSuccess = true
            Toast('许愿成功')
            setTimeout(() => {
              window.history.go(-1)
            }, 2000)
          } else {
            Toast('提交失败啦')
          }
          this.submiting = false
        }
      })
    }
  }
}
</script>

<style lang="less">
  @import "../global/style/theme.less";

  .custermer-wish {
    width: 100%;
    height: 100%;
    background: #F2F2F2;
    font-size: 24/@R;
    line-height: 33/@R;
    .content {
      width: 100%;
      textarea {
        width: 100%;
        height: 240/@R;
        background: #fff;
        padding: 20/@R 30/@R;
        outline: none;
        border: 0;
      }
    }
    .text-label {
      padding: 16/@R 30/@R 11/@R;
      color: @font-gray-light;
    }
    .content-area {
      position: relative;
      .word {
        position: absolute;
        right: 20/@R;
        bottom: 20/@R;
        color: #999;
      }
    }
    .img-panel {
      margin: 30/@R 0 0;
      padding: 20/@R 30/@R;
      background-color: #fff;
    }
    .img-label {
      margin-bottom: 20/@R;
    }
    .addbtns {
      display: flex;
      flex-wrap: wrap;
      .img {
        position: relative;
        width: 150/@R;
        height: 150/@R;
        margin-right: 30/@R;
        margin-bottom: 10/@R;
      }
      img {
        width: 150/@R;
        height: 150/@R;
        margin-bottom: 10/@R;
      }
      .icon {
        position: absolute;
        right: -10/@R;
        top: -10/@R;
      }
    }
    .subBtn {
      width: 700/@R;
      height: 97/@R;
      line-height: 97/@R;
      margin: 50/@R auto 0;
      text-align: center;
      border-radius: 10/@R;
      color: #fff;
      font-size: 36/@R;
      background: @primary;
      &[disabled] {
        opacity: 0.4;
      }
    }
  }
</style>
