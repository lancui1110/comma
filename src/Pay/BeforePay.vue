<template>
  <div class="before-pay-panel">
    <div class="remaining-time">
      <div class="circle">
        <p class="word">剩余时间</p>
        <p class="times">{{displayTime}}</p>
      </div>
    </div>
    <div class="pay-word">
      <i class="icon icon-wx"></i>
      <span class="word">微信支付</span>
      <i class="icon icon-choose"></i>
    </div>
    <!-- <div v-show="orderSign.amount > 0" class="go-pay" @click="toPay">去支付 ¥{{orderSign.amount}}</div> -->
    <div class="go-pay" @click="toPay">去支付 ¥{{orderSign.amount}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import weixin from 'weixin'

export default {
  name: 'BeforePay',
  data () {
    return {
      orderNum: this.$route.query.orderNum,
      disablePay: false,
      min: 15,
      sec: 0
    }
  },
  computed: {
    ...mapGetters({
      orderSign: 'pay/orderSign'
    }),
    displayTime () {
      return `${this.min < 10 ? '0' : ''}${this.min}:${this.sec < 10 ? '0' : ''}${this.sec}`
    }
  },
  mounted () {
    weixin.init()
    this.loadData()
    this.countDown()
  },
  methods: {
    loadData () {
      this.$store.dispatch('pay/getOrderSign', { orderNum: this.orderNum })
    },
    toPay () {
      weixin.weixinPay(this.orderSign, (res) => {
        alert(res)
        // go 支付成功
        this.$router.push({ name: 'paySuc', query: { orderNum: this.orderNum } })
      })
    },
    countDown () {
      setTimeout(() => {
        this.sec -= 1
        if (this.sec <= 0 && this.min > 0) {
          this.min -= 1
          this.sec = 59
        }
        if (this.min <= 0 && this.sec <= 0) {
          this.disablePay = true
        } else {
          this.countDown()
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less">
  @import "../global/style/theme.less";
  .before-pay-panel {
    position: relative;
    background: #F2F2F2;
    padding-top: 30/@R;
    height: 100%;
    .word {
      font-size: 28/@R;
    }
    .remaining-time {
      height: 352/@R;
      background: #fff;
      margin-bottom: 30/@R;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      .circle {
        height: 284/@R;
        width: 284/@R;
        background: #fff;
        border: 1px solid #eee;
        border-radius: 142/@R;
        display: inline-block;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .word {
        line-height: 50/@R;
      }
      .times {
        font-size: 60/@R;
        font-weight: bold;
        line-height: 90/@R;
      }
    }
    .pay-word {
      display: flex;
      background: #fff;
      height: 100/@R;
      line-height: 100/@R;
      line-height: 100/@R;
      padding: 25/@R 39/@R 25/@R 51/@R;
      .word {
        display: inline-block;
        font-size: 36/@R;
        line-height: 50/@R;
        padding-left: 30/@R;
        flex: 1;
      }
    }
    .go-pay {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #26100D;
      text-align: center;
      color: #fff;
      font-size: 36/@R;
      height: 100/@R;
      line-height: 100/@R;
    }
  }
</style>
