<template>
  <div class="custermer-feedback">
    <div class="content">
      <textarea name="" id="" cols="30" rows="10" placeholder="请留下您的宝贵建议，促使我们进步~"></textarea>
      <div class="addbtns">
        <img v-for="(item, key) in 4" :key="key" :src="require('../assets/img_upload.png')" alt="" class="addbtn">
      </div>
      <div class="subBtn">提交</div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'CustermerFeedback',
  props: {
  },
  data () {
    return {
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
      }
    }
    .addbtns {
      padding-left: 30/@R;
      margin: 40/@R 0 171/@R 0;
      img {
        width: 150/@R;
        height: 150/@R;
        margin-right: 30/@R;
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
