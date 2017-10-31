<template>
  <div class="pay-success-panel">
    <div class="suc-word">
      <div class="logo"><i class="icon icon-head-top"></i></div>
      <div class="word">逗号迷你便利</div>
      <div class="large">您已支付成功啦～</div>
    </div>
    <img class="redpackt" :src="require('../assets/redpackt.png')" />
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
      
    }
  }
}
</script>

<style lang="less">
  @import "../global/style/theme.less";
  
  .pay-success-panel {
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
    .redpackt {
      position: absolute;
      bottom: 50/@R;
      right: 42/@R;
      width: 149/@R;
      height: 125/@R;
    }
  }
</style>
