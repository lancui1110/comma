<template>
  <div class="rechart">
    <h1>账户充值</h1>

    <div class="row">
      <div
        class="amount-btn"
        :class="{ 'selected': item.amount === selectedAmount }"
        v-for="(item, key) in amountData"
        :key="key"
        @click="selectedAmount = item.amount">
        <span class="amount"><span class="num">{{item.amount}}</span>元</span>
        <span>{{item.text}}</span>
      </div>
    </div>

    <div class="submit-btn" @click="submit">立即支付</div>
    <div class="tip">点击立即支付，即表示您已同意《<router-link :to="{ name: 'agreement' }">充值协议</router-link>》</div>

    <div class="info">
      <h5>充值说明：</h5>
      <p v-for="(item, i) in infos" :key="i">{{i + 1}}. {{item}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Rechart',
    data () {
      return {
        amountData: [
          { amount: 30, text: '送1张3元券' },
          { amount: 50, text: '送2张3元券' },
          { amount: 100, text: '送6张3元券' }
        ],
        selectedAmount: 0,
        infos: [
          '本次活动仅适用于广州；',
          '充值30元赠送3元券（1张3元券）、50元赠送6元券（2张3元券）、100元赠送18元（6张3元券）、以上赠券有效期均为发放后30天，满10元可用，单笔消费仅限使用一张；',
          '用户充值成功后，可点击左上方【用户中心】进行查看；',
          '充值金额不可提现、转移、转赠，账户余额无有效期，如对本活动有疑问可咨询客服：020-38397376；',
          '本活动最终解释权归广州逗号科技有限公司所有'
        ]
      }
    },
    methods: {
      submit () {
        this.$store.dispatch('recharge/addRecharge', {
          params: {
            amount: this.amountData[this.selectedAmount].amount
          },
          cb: (user) => {
            this.isSubmit = false
            // 跳转到列表页
            this.$router.push({name: 'RechargeList'})
          }
        })
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
