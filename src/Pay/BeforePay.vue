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
import { Toast } from 'mint-ui'

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
      code: 'home/getCode',
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
      const params = { orderNum: this.orderNum }
      this.$store.dispatch('pay/getOrderSign', {
        params,
        cb: (res) => {
          if (res.status === 1) {
            // 成功
            this.goPaySuc()
          } else if (res.status === 2) {
            // 待支付
            const leftSec = res.data.seconds
            this.min = Math.floor(leftSec / 60)
            this.sec = leftSec % 60
          } else if (res.status === 3) {
            // 超时
            Toast('订单已超时!')
            setTimeout(() => {
              this.$router.replace({ name: 'home' })
            }, 1000)
          } else if (res.status === 0) {
            // 失败
          }
        }
      })
    },
    toPay () {
      weixin.weixinPay(this.orderSign, (res) => {
        // go 支付成功
        if (res.err_msg === 'get_brand_wcpay_request:ok') { // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          history.replaceState({}, '', `/success?orderNum=${this.orderNum}&code=${this.code}`) // 替换当前历史记录
          this.goPaySuc()
        }
      })
    },
    goPaySuc () {
      location.href = `${pageConfig.siteUrl}index/pay/success?orderNum=${this.orderNum}&code=${this.code}`
      // this.$router.replace({ name: 'paySuc', query: { orderNum: this.orderNum, code: this.code } })
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
