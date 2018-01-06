<template>
  <div class="pay-success-panel">
    <div class="suc-word-panel">
      <div class="suc-word">
        <div class="title">订单支付成功</div>
        <div class="amount">{{orderDetail.realAmount}} <span>元</span></div>
        <div class="discount" v-if="orderDetail.totalDiscounts > 0">总优惠：-{{orderDetail.totalDiscounts}}元</div>
      </div>
      <img v-if="isRed" class="redpackt" @click="showShare(true, false)" :src="require('../assets/redpackt.png')" />
    </div>

    <div v-show="isShowShare" class="share-panel">
      <div class="mask" v-show="!isShowShareWx" @click="showShare(false, false)"></div>
      <div v-show="isShowShareRedPacket" class="share-red-packet">
        <p class="pic" @click="resetShare"><img :src="require('../assets/img_share.png')"/></p>
        <p class="word">分享后自己也能领取哦～</p>
        <p class="close" @click="showShare(false, false)"><i class="icon icon-close"></i></p>
      </div>
      <div v-show="isShowShareWx" @click="showShare(false, false)" class="share-wx">
        <p class="pic"><img :src="require('../assets/img_share_wx.png')"/></p>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import wxMenu from 'wxMenu'

export default {
  name: 'PaySuccess',
  props: {
  },
  data () {
    return {
      isRed: false,
      homeUrl: location.href,
      orderNum: this.$route.query.orderNum,
      isShowShareRedPacket: false, // 显示分享红包
      isShowShareWx: false // 显示微信分享
    }
  },
  mounted () {
    this.$store.dispatch('order/getOrderDetail', this.$route.query.orderNum)

    setTimeout(() => {
      // 初始化微信分享信息 type=1 一般分享 type=2&orderNum 抢红包 type=3 申请货架
      wxMenu.share({type: 2, orderNum: this.orderNum}, (res) => {
        if (res.data.isRed) {
          this.isRed = true
          this.isShowShareRedPacket = true
        }
        this.homeUrl = res.data.homeUrl || this.homeUrl
      })
    }, 500)
  },
  computed: {
    ...mapGetters({
      orderDetail: 'order/orderDetail'
    }),
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
      padding-top: 60/@R;
    }
    .title {
      font-size: 36/@R;
      font-weight: bold;
    }
    .amount {
      margin: 40/@R 0 20/@R;
      line-height: 86/@R;
      font-size: 72/@R;
      font-family:Helvetica;
      span {
        line-height: 67/@R;
        font-size: 48/@R;
      }
    }
    .discount {
      color: #FF6600;
      font-size: 30/@R;
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
        background: #EEE;
        opacity: .9;
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
    .link {
      margin-top: 30/@R;
      a {
        color: #333;
        font-size: 36/@R;
        text-decoration: underline;
      }
    }
  }
</style>
