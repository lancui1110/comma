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
      <div class="mask"></div>
      <div v-show="isShowShareRedPacket" class="share-red-packet">
        <div class="pic">
          <img :src="require('../assets/img_share.png')"/>
          <div class="share-wrapper">
            <div class="share-btn" @click.stop="showShare(true, true)"></div>
          </div>
          <div class="close-wrapper">
            <div class="close-btn" @click="showShare(false, false)"></div>
          </div>
        </div>
      </div>
      <div v-show="isShowShareWx" class="share-wx">
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
      display: block;
      margin: 80/@R auto;
      width: 180/@R;
      height: 160/@R;
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
        background:rgba(0,0,0,0.6);
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
          position: relative;
          width: 558/@R;
          height: 803/@R;
          width: 100%;
          text-align: center;
          z-index: 2;
          img {
            width: 558/@R;
            height: 803/@R;
          }
        }
        .share-wrapper {
          position: absolute;
          bottom: 190/@R;
          left: 0;
          width: 100%;
        }
        .share-btn {
          width: 450/@R;
          height: 97/@R;
          margin: 0 auto;
        }
        .close-wrapper {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
        }
        .close-btn {
          width: 70/@R;
          height: 70/@R;
          margin: 0 auto;
        }
      }
      .share-wx {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 10/@R 50/@R 0 0;
        text-align: right;
        z-index: 100;
        .pic, .pic img{
          float: right;
          width: 292/@R;
          height: 287/@R;
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
