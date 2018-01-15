<template>
  <div class="rechart">
    <h1>账户充值</h1>

    <div class="row">
      <div
        class="amount-btn"
        :class="{ 'selected': item.activityId === selectedAmount }"
        v-for="(item, key) in depositList"
        :key="key"
        @click="selectedAmount = item.activityId">
        <div class="amount"><span class="num">{{item.money}}</span>元</div>
        <span>送{{item.totalCouponMoney}}元券</span>
      </div>
    </div>

    <div class="submit-btn" @click="toSubmit">立即支付</div>
    <!-- <div class="tip">点击立即支付，即表示您已同意《<router-link :to="{ name: 'agreement' }">充值协议</router-link>》</div> -->
    <div class="tip">点击立即支付，即表示您已同意《<a href="/index/recharge/agreement">充值协议</a>》</div>

    <div class="info">
      <h5>充值说明：</h5>
      <p v-for="(item, i) in infos" :key="i">{{i + 1}}. {{item}}</p>
    </div>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex'
  import { MessageBox } from 'mint-ui'
  import weixin from 'weixin'

  export default {
    name: 'Rechart',
    data () {
      return {
        // amountData: [
        //   { amount: 30, text: '送1张3元券' },
        //   { amount: 50, text: '送2张3元券' },
        //   { amount: 100, text: '送6张3元券' }
        // ],
        selectedAmount: '',
        infos: [
          '本次活动仅适用于广州；',
          '充值30元赠送3元券（1张3元券）、50元赠送6元券（2张3元券）、100元赠送18元（6张3元券）、以上赠券有效期均为发放后30天，满10元可用，单笔消费仅限使用一张；',
          '用户充值成功后，可点击左上方【用户中心】进行查看；',
          '充值金额不可提现、转移、转赠，账户余额无有效期，如对本活动有疑问可咨询客服：020-38397376；',
          '本活动最终解释权归广州逗号科技有限公司所有'
        ]
      }
    },
    computed: {
      ...mapGetters({
        depositList: 'recharge/depositListActivity' // 充值活动列表
      })
    },
    activated () {
      this.getActivityList()
    },
    methods: {
      getActivityList () {
        this.$store.dispatch('recharge/getDepositListActivity')
      },
      toSubmit () {
        if (!this.selectedAmount) {
          MessageBox.alert('请选择充值金额')
          return
        }

        this.$store.dispatch('recharge/addRecharge', {
          activityId: this.selectedAmount,
          cb: (result) => {
            this.isSubmit = false
            // 微信支付
            weixin.weixinPay(result.data, (res) => {
              // go 支付成功
              if (res.err_msg === 'get_brand_wcpay_request:ok') { // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                this.goPaySuc()
              }
            })
          }
        })
      },
      goPaySuc () {
        this.$router.push({ name: 'rechargeList' })
      }
    }
  }
</script>

<style lang="less">
  @import "../global/style/theme.less";

  .rechart {
    padding: 50/@R;
    h1 {
      line-height: 67/@R;
      margin-bottom: 50/@R;
      font-size: 48/@R;
      font-weight: bold;
    }
    a {
      color: #3d7ded;
    }
    .row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .amount-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 300/@R;
      height: 180/@R;
      margin-bottom: 50/@R;
      border-radius: 6/@R;
      border: 1/@R solid @font-gray-light;
      font-size: 28/@R;
      &.selected {
        position: relative;
        border: 1/@R solid @primary;
        &:after {
          content: " ";
          position: absolute;
          top: 0;
          right: 0;
          width: 42/@R;
          height: 42/@R;
          background: url('../assets/check.png') no-repeat;
          background-size: 42/@R 42/@R;
        }
      }
      .amount {
        font-size: 32/@R;
        .num {
          font-size: 60/@R;
          font-family: "Helvetica";
        }
      }
    }

    .submit-btn {
      width: 650/@R;
      height: 100/@R;
      line-height: 100/@R;
      margin: 55/@R auto 0;
      text-align: center;
      border-radius: 49/@R;
      background: @primary;
      color: #fff;
      font-size: 36/@R;
    }
    .tip {
      margin: 30/@R 0 100/@R;
      text-align: center;
    }
    .info {
      font-size: 24/@R;
      h5 {
        font-weight: bold;
      }
      p {
        margin-top: 33/@R;
      }
    }
  }
</style>
