// 用户推荐
<template>
  <div class="recommend-panel">
    <div class="head">
      <img :src="require('../assets/activity/bg-1.png')" class="bg-img"/>
      <div class="words">
        <span class="left word">说明：</span>
        <span class="word">推荐企业成功入驻逗号mini便利，工作人员会联系企业发放红包奖励～</span>
      </div>
    </div>
    <div class="content">
      <div class="content-block">
        <div class="title">产品介绍</div>
        <p v-for="(item, i) in Content.productIntroduce" :key="i">{{item}}</p>
      </div>

      <div class="circles">
        <img v-for="(item, i) in Content.circlePics" :key="i" :src="require(`../assets/activity/${item}`)" alt="" />
      </div>

      <div class="content-box">
        <p v-for="(item, i) in Content.content" :key="i">{{item}}</p>
      </div>
    </div>
    <div class="bottom">
        <div class="yellow-btn">立即领取</div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Content from './content'

export default {
  name: 'ReceiveRedBag',
  props: {
  },
  data () {
    return {
      Content
    }
  }
}
</script>

<style lang="less">
  @import "./activity.less";

  .recommend-panel {
    position: relative;
    width: 100%;
    background: @brown;
    font-size: 28/@R;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 56/@R;

    .bg-img {
      width: 100%;
    }
    .head {
      position: relative;
      margin-bottom: 30/@R;
      .words {
        position: absolute;
        left: 0;
        bottom: 70/@R;
        width: 100%;
        color: #AF3B3B;
        font-size: 24/@R;
        text-align: left;
        padding: 0 50/@R;
        line-height: 42/@R;
        display: flex;
      }
      .left {
        width: 100/@R;
      }
      .word {
        display: inline-block;
      }
    }
    .content {
      position: relative;
      top: -50/@R;
    }
    .content-block .title {
      background: @brown;
    }
    .bottom {
      padding: 80/@R;
      text-align: center;
    }
  }
  
</style>
