<template>
  <div class="error-panel">
    <div class="logo"><i class="icon icon-head-top"></i></div>
    <div class="word">{{errorMsg}}</div>
  </div>
</template>

<script>

export default {
  name: 'Error',
  data () {
    return {
      errorMsg: pageConfig.errorMsg
    }
  },
  mounted () {
    
  },
  methods: {
  }
}
</script>

<style lang="less">
  @import "./global/style/theme.less";

  .error-panel {
    position: relative;
    width: 100%;
    height: 100%;
    background: #F2F2F2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 175/@R 24/@R 24/@R 24/@R;
    justify-content: flex-start;
    background: #fff;
    .logo .icon{
      width: 147/@R;
      height: 147/@R;
      background-size: 147/@R 147/@R;
    }
    .word {
      font-size: 36/@R;
      padding: 100/@R 0 52/@R 0;
    }

    // .word {
    //   font-size: 28/@R;
    //   display: flex;
    //   align-items: center;
    // }
    // .large {
    //   font-size: 44/@R;
    // }
    // .red {
    //   color: #D86868;
    // }
    // .gray {
    //   .word, .red {
    //     color: #D9D9D9;
    //   }
    // }
    // .left {
    //   display: inline-block;
    //   width: 250/@R;
    //   text-align: center;
    //   margin-right: 100/@R;
    // }
    
  }
</style>
