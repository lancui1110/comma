<template>
  <div class="custermer-feedback">
    <div class="content">
      <textarea v-model="feedback" cols="30" rows="10" placeholder="请留下您的宝贵建议，促使我们进步~"></textarea>
      <div class="addbtns">
        <img v-for="(item, key) in localPics" :key="key" 
          @click="previewImages(item)" :src="item" class="addbtn" >
        <img v-show="localPics.length < 4" @click="uploadImg(key)"  :src="defaultPic" class="addbtn">
      </div>
      <div class="subBtn" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import weixin from 'weixin'
import uploadPic from 'uploadPic'

export default {
  name: 'CustermerFeedback',
  props: {
  },
  data () {
    const defaultPic = require('../assets/img_upload.png')
    return {
      defaultPic: defaultPic,
      localPics: [defaultPic],
      feedback: '',
      serverPics: []
    }
  },
  mounted () {
    weixin.init()
  },
  computed: {
    ...mapGetters({
      subResult: 'cutomer/subResult'
    })
  },
  methods: {
    uploadImg (index) {
      const self = this
      uploadPic.selectedPic((localId, serverId) => {
        self.addPics(index, {localId, serverId})
      }, 1)
    },
    addPics (index, {localId, serverId}) {
      this.localPics[index] = localId
      this.serverPics[index] = serverId
    },
    delPic () {
      const i = this.index
      this.localPics.splice(i, 1)
      this.serverPics.splice(i, 1)
      uploadPic.serverIds.splice(i, 1)
    },
    previewImages (pic) {
      uploadPic.previewImages(pic, this.localPics)
    },
    submit () {
      if (this.feedback === '') {
        alert('请输入您的宝贵建议~')
      }
      const params = {
        feedback: this.feedback,
        wxPicIds: this.serverPics
      }
      this.$store.dispatch('customer/submit', params, () => {
        history.back(-1)
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
        padding: 10/@R;
        outline: none;
        border: 0;
      }
    }
    .addbtns {
      padding-left: 30/@R;
      margin: 40/@R 0 171/@R 0;
      display: flex;
      flex-direction: row;
      img {
        width: 150/@R;
        height: 150/@R;
        margin-right: 30/@R;
      }
      .icon {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .subBtn {
      width: 700/@R;
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
