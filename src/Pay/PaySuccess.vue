<template>
  <div class="pay-success-panel">
    <div class="suc-word-panel">
      <div class="suc-word">
        <div class="logo"><i class="icon icon-head-top"></i></div>
        <div class="word">逗号迷你便利</div>
        <div class="large">您已支付成功啦～</div>
      </div>
      <img class="redpackt" @click="showShare(true, false)" :src="require('../assets/redpackt.png')" />
    </div>
    
    <div v-show="isShowShare" class="share-panel">
      <div class="mask" @click="showShare(false, false)"></div>
      <div v-show="isShowShareRedPacket" class="share-red-packet">
        <p class="pic" @click="resetShare"><img :src="require('../assets/img_share.png')"/></p>
        <p class="word">分享后自己也能领取哦～</p>
        <p class="close" @click="showShare(false, false)"><i class="icon icon-close"></i></p>
      </div>
      <div v-show="isShowShareWx" class="share-wx">
        <p class="pic"><img :src="require('../assets/img_share_wx.png')"/></p>
      </div>
    </div>

  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import weixin from 'weixin'
import wxMenu from 'wxMenu'

export default {
  name: 'PaySuccess',
  props: {
  },
  data () {
    return {
      orderNum: this.$route.query.orderNum,
      isShowShareRedPacket: false, // 显示分享红包
      isShowShareWx: false // 显示微信分享
    }
  },
  mounted () {
    weixin.init()
  },
  computed: {
    isShowShare () {
      return (this.isShowShareRedPacket || this.isShowShareWx)
    }
  },
  methods: {
    showShare (isShowShareRedPacket, isShowShareWx) {
      this.isShowShareRedPacket = isShowShareRedPacket
      this.isShowShareWx = isShowShareWx
    },
    resetShare () {
      this.showShare(false, true)
      wxMenu.share({orderNum: this.orderNum})
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

    .share-panel {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 1;
      left: 0;
      top: 0;
      .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #333;
        opacity: .1;
      }
      .share-red-packet {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .pic {
          width: 470/@R;
          height: 354/@R;
          width: 100%;
          text-align: center;
          z-index: 2;
          img {
            width: 470/@R;
            height: 354/@R;
          }
        }
        .word {

        }
        .close {

        }
      }
      .share-wx {
        background: #fff;
        height: 100%;
        padding: 15/@R 28/@R 0 0;
        text-align: right;
        .pic, .pic img{
          display: inline;
          width: 330/@R;
          height: 385/@R;
        }
      }
    }
    
  }
</style>
