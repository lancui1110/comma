<template>
  <div class="custermer-feedback">
    <div class="content">
      <div class="text-label">问题和建议</div>
      <div class="content-area">
        <span class="word">{{feedback.length}}/{{maxWords}}</span>
        <textarea v-model="feedback" cols="30" rows="10" :maxlength="maxWords" placeholder="请留下您的宝贵建议，促使我们进步~"></textarea>
      </div>
      <div class="img-panel" v-show="!isAlipay">
        <div class="img-label">图片（选填，提供问题截图）</div>
        <div class="addbtns">
          <div v-for="(item, key) in localPics" :key="key" class="img">
            <img @click="previewImages(item, key)" :src="item" class="addbtn" />
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
// import { each } from 'lodash'
// import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'

import weixin from 'weixin'
import uploadPic from 'uploadPic'
import utils from '../global/utils'

export default {
  name: 'CustermerFeedback',
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
  computed: {
  },
  methods: {
    uploadImg () {
      const self = this
      if (utils.isAlipay()) {
        // ap.chooseImage(4 - this.localPics.length, (result) => {
        //   alert(JSON.stringify(result))
        //   let apFilePaths = result.apFilePaths || []
        //   if (!apFilePaths.length || !/^https?:/.test(apFilePaths[0])) {
        //     return
        //   }

        //   ap.uploadFile({
        //     url: 'http://comma.isfeel.cn/oss/upload',
        //     fileType: 'image',
        //     fileName: 'file',
        //     filePath: apFilePaths[0],
        //     success: (res) => {
        //       ap.alert('上传成功 ' + JSON.stringify(res))
        //     },
        //     fail: (err) => {
        //       ap.showToast('上传失败 ' + JSON.stringify(err))
        //     }
        //   })

        //   // 如下演示如何拿到base64格式的数据，可用于上传到服务器端的场景
        //   var image = new Image()
        //   alert(1)
        //   image.crossOrigin = 'anonymous'
        //   alert(2)
        //   image.onload = function () {
        //     alert('in img onload')
        //     var canvas = document.createElement('canvas')
        //     alert(11)
        //     var context = canvas.getContext('2d')
        //     alert(12)
        //     canvas.height = image.height
        //     canvas.width = image.width
        //     alert(13)
        //     context.drawImage(image, 0, 0)
        //     alert(14)
        //     try {
        //       alert(15)
        //       var dataURL = canvas.toDataURL('image/jpeg')
        //       alert(16)

        //       self.serverPics.push(dataURL)
        //     } catch (e) {
        //       alert('in catch onerror ' + JSON.stringify(e))
        //     }
        //     canvas = null
        //   }
        //   alert(3)
        //   image.onerror = (e) => {
        //     alert('in img onerror ' + JSON.stringify(e))
        //   }
        //   alert(4)
        //   image.src = result.tempFilePaths[0] || result.localIds[0]
        //   alert(5)

        //   self.localPics = self.localPics.concat(apFilePaths)
        // })
      } else {
        uploadPic.selectedPic((localId, serverId) => {
          self.addPics({localId, serverId})
        }, 4)
      }
    },
    addPics ({localId, serverId}) {
      this.localPics.push(localId)
      this.serverPics.push(serverId)
    },
    delPic (i) {
      if (utils.isAlipay()) {
        this.localPics.splice(i, 1)
      } else {
        this.localPics.splice(i, 1)
        this.serverPics.splice(i, 1)
        uploadPic.serverIds.splice(i, 1)
      }
    },
    previewImages (pic, index) {
      if (utils.isAlipay()) {
        ap.previewImage({
          current: index,
          urls: this.localPics
        })
      } else {
        uploadPic.previewImages(pic, this.localPics)
      }
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

      // alert(JSON.stringify(this.serverPics))

      this.submiting = true
      const params = {
        feedback: this.feedback,
        wxPicIds: this.serverPics
      }
      this.$store.dispatch('customer/submit', {
        params: params,
        cb: (res) => {
          if (res.code === 1) {
            this.submitSuccess = true
            Toast('反馈成功')
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

  .custermer-feedback {
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
    .hidden-content {
      width: 100/@R;
      height: 100/@R;
      visibility: hidden;
      overflow: scroll;
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
      margin: 30/@R 0 50/@R;
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
      margin: 0 auto;
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
