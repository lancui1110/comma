<template>
  <div class="pay-code-panel">
    <div class="tel-box">
      <p class="area-code">+86</p>
      <input type="tel" class="tel-num" v-model="mobile" placeholder="请输入手机号">
    </div>
    <div class="veri-code-box">
      <input type="number" class="code-input" v-model="verificationCode" placeholder="请输入验证码">
      <button class="code-btn" :class="{'disabled': !mobile}" v-if="!isWaiting" @click="getVerificationCode()">验证码</button>
      <button class="timeout-btn" v-else>{{waitingNum}}s</button>
    </div>
    <div class="pay-tips-box">
      <div class="tip-icon-box">
        <i class="icon icon-more"></i>
      </div>
      <div class="tip-content">
        <p>温馨提示：首次支付需要验证您的手机号码，通过后即可微信支付下单</p>
      </div>
    </div>
    <div class="submit-btn-box">
      <button class="submit" :class="{ 'disabled': !verificationCode }" :disabled="!verificationCode" @click="handleOnSubmitCode()">提交</button>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'Demo',
  props: {
  },
  data () {
    return {
      isWaiting: false,
      waitingNum: 5,
      isSubmit: false,
      verificationCode: '',
      mobile: ''
    }
  },
  methods: {
    // 发请求获取验证码
    getVerificationCode () {
      // todos: 发请求拿验证码
      this.$store.dispach('order/sendVerifyCode')
      this.isWaiting = true
      this.handleOnTimeOut()
    },
    // 验证码倒计时
    handleOnTimeOut () {
      setTimeout(() => {
        this.waitingNum -= 1
        if (this.waitingNum >= 0) {
          this.handleOnTimeOut()
        } else {
          this.waitingNum = 5
          this.isWaiting = false
        }
      }, 1000)
    },
    // 提交验证码
    handleOnSubmitCode () {
      this.isSubmit = true
      console.log('asd')
    }
  }
}
</script>

<style lang="less">
  @import "../global/style/theme.less";
  .pay-code-panel {
    position: relative;
    background: #F2F2F2;
    padding: 30/@R;
    padding-top: 48/@R;
    height: 100%;
    font-size: 36/@R;
    .tel-box {
      display: flex;
      flex-direction: row;
      // justify-content: center;
      align-items: center;
      height: 100/@R;
      background: #ffffff;
      .area-code {
        flex: 1;
        padding-left: 30/@R;
        margin: 30/@R 0;
        margin-right: 5/@R;
        color: #333;
        border-right: solid 1px #d8d8d8;
      }
      .tel-num {
        flex: 4;
        height: 100%;
        padding-left: 15/@R;
        color: #333;
        border: none;
      }
      ::-webkit-input-placeholder {
        font-size: 36/@R;
        color: #999;
      }
    }
    .veri-code-box {
      display: flex;
      flex-direction: row;
      height: 100/@R;
      margin-top: 30/@R;
      .code-input {
        flex: 2;
        height: 100%;
        padding-left: 30/@R;
        background: #fff;
        border: none;
      }
      ::-webkit-input-placeholder {
        color: #999;
      }
      .timeout-btn {
        flex: 1;
        margin-left: 20/@R;
        height: 100%;
        color: #fff;
        outline: none;
        border: none;
        background: #a1a1a1;
      }
    }
    .code-btn {
        flex: 1;
        margin-left: 20/@R;
        height: 100%;
        color: #fff;
        outline: none;
        border: none;
        background: #593C38;
      }
    .pay-tips-box {
      display: flex;
      flex-direction: row;
      margin-top: 25/@R;
      padding: 0 15/@R;
      .tip-icon-box {
        margin-right: 20/@R;
      }
      .tip-content {
        color: #999;
        font-size: 24/@R;
      }
    }
    .submit-btn-box {
      width: 100%;
      height: 100/@R;
      margin-top: 196/@R;
    }
    .submit {
        width: 100%;
        height: 100%;
        color: #fff;
        background: #593C38;
        border: none;
        border-radius: 10/@R;
        outline: none;
      }
    .disabled {
      background: #a1a1a1;
    }
  }

</style>
