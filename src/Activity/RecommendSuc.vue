<template>
  <div class="recommend-suc-panel">
    <div class="suc-word">
      <div class="logo"><i class="icon icon-head-top"></i></div>
      <div class="word">逗号迷你便利</div>
      <div class="large">提交审核成功～</div>
    </div>
    <div class="btn" @click="goHome">返回首页</div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'PaySuccess',
  props: {
  },
  data () {
    return {
      url: this.$route.query.url
    }
  },
  mounted () {
    
  },
  methods: {
    goHome () {
      window.location.href = this.url
    }
  }
}
</script>

<style lang="less">
  @import "../global/style/theme.less";
  
  .recommend-suc-panel {
    position: relative;
    height: 100%;
    .suc-word {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 175/@R;
    }
    .logo .icon{
      width: 147/@R;
      height: 147/@R;
      background-size: 147/@R 147/@R;
    }
    .word {
      font-size: 30/@R;
      padding: 19/@R 0 52/@R 0;
    }
    .large {
      font-size: 44/@R;
      color: #593C38;
    }

    .btn {
      width: 400/@R;
      height: 97/@R;
      line-height: 97/@R;
      background: #593C38;
      border-radius: 10/@R;
      color: #fff;
      text-align: center;
      margin: 0 auto;
      margin-top: 136/@R;
      margin-bottom: 100/@R;
      font-size: 36/@R;
    }
  }
</style>
