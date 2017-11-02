<template>
  <div class="custermer-main">
    <div class="main-panel">
      <router-link to="customer/feedback">
        <div class="btn">
          <i class="icon icon-edit"></i>反馈与建议
        </div>
      </router-link>
      <div class="btn">
        <i class="icon icon-tel"></i>致电我们
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'CustermerMain',
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
  
  .custermer-main {
    width: 100%;
    height: 100%;
    background: #F2F2F2;
    .main-panel {
      width: 100%;
      height: 502/@R;
      background: #FFF;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 53/@R 0 56/@R;
    }
    .btn {
      width: 430/@R;
      height: 104/@R;
      line-height: 104/@R;
      font-size: 36/@R;
      letter-spacing: 0.2px;
      color: #FFF;
      background: rgba(89,60,56,0.60);
      border-radius: 10px; 
      margin: 46/@R auto;
      .icon {
        margin: 0 80/@R 0 53/@R;
      }
    }
  }
</style>
