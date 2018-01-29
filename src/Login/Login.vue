<template>
  <div class="pay-code-panel">
    <h2>账户登录</h2>
    <div class="field-wrapper">
      <input type="tel" class="tel-num" v-model="mobile" @keyup="handleTelChange" placeholder="请输入手机号">
    </div>
    <div class="field-wrapper veri-code-box">
      <input type="number" class="code-input" v-model="code" placeholder="请输入验证码">
      <button class="code-btn" :class="{'disabled': !mobile}" v-if="!isWaiting" @click="getVerificationCode()">{{isFristSend ? '点击获取' : '重新发送'}}</button>
      <button class="code-btn timeout-btn" v-else>{{waitingNum}}秒后重发</button>
    </div>
    <div class="submit-btn-box">
      <button class="submit" :disabled="!mobile || !code" @click="handleOnSubmitCode()">登 录</button>
    </div>
    <div class="pay-tips-box">
      <p>温馨提示：首次支付需要验证您的手机号码，</p>
      <p>通过后即可微信支付下单</p>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { trim } from 'lodash'
import { Toast } from 'mint-ui'

function formatMobile (v) {
  const tmp = v.replace(/\s/g, '')
  const result = [tmp.slice(0, 3), tmp.slice(3, 7), tmp.slice(7, 11)].join(' ')
  return trim(result)
}

export default {
  name: 'Login',
  data () {
    return {
      isFristSend: true,
      isWaiting: false,
      waitingNum: 60,
      isSubmit: false,
      mobile: '',
      code: ''
    }
  },
  methods: {
    handleTelChange (e) {
      let v = trim(e.target.value)
      this.mobile = formatMobile(v)
    },
    // 发请求获取验证码
    getVerificationCode () {
      const m = trim(this.mobile).replace(/\s/g, '')
      if (!m || !/^1[\d]{10}$/.test(m)) {
        Toast('请输入正确的手机号！')
        return
      }
      this.$store.dispatch('user/sendVerifyCode', {
        mobile: m,
        cb: (res) => {
          if (res.code === 1) {
            this.isFristSend = false
            this.isWaiting = true
            this.handleOnTimeOut()
          } else {
            Toast(res.msg)
          }
        }
      })
    },
    // 验证码倒计时
    handleOnTimeOut () {
      setTimeout(() => {
        this.waitingNum -= 1
        if (this.waitingNum >= 0) {
          this.handleOnTimeOut()
        } else {
          this.isWaiting = false
          this.waitingNum = 60
        }
      }, 1000)
    },
    // 提交验证码
    handleOnSubmitCode () {
      this.isSubmit = true
      this.$store.dispatch('user/userLogin', {
        mobile: trim(this.mobile).replace(/\s/g, ''),
        code: this.code,
        cb: (res) => {
          this.isSubmit = false
          if (res.code === 1) {
            if (this.$route.query.to && this.$route.query.to !== 'home') {
              this.$router.replace({ name: this.$route.query.to || 'home' })
            } else {
              location.href = `${pageConfig.siteUrl}index/`
            }
          } else {
            Toast(res.msg)
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
  @import "../global/style/theme.less";
  .pay-code-panel {
    position: relative;
    background: #F2F2F2;
    padding: 50/@R;
    height: 100%;
    color: #333;
    h2 {
      margin-bottom: 80/@R;
      font-size: 48/@R;
    }
    input {
      font-size: 36/@R;
    }

    .field-wrapper {
      border-bottom: 0.5pt solid #e6e6e6;
    }
    .tel-num {
      display: block;
      width: 100%;
      height: 80/@R;
      padding: 20/@R 0;
      border: none;
      background-color: transparent;
    }
    ::-webkit-input-placeholder {
      font-size: 28/@R;
      color: #999;
    }
    .veri-code-box {
      display: flex;
      margin-top: 30/@R;
      .code-input {
        flex-grow: 1;
        height: 80/@R;
        padding: 20/@R 0;
        border: none;
        background-color: transparent;
      }
      ::-webkit-input-placeholder {
        color: #999;
      }

    }
    .code-btn {
      width: 160/@R;
      height: 80/@R;
      text-align: right;
      color: #2F73EF;
      font-size: 28/@R;
      outline: none;
      border: none;
      background-color: transparent;
    }
    .timeout-btn {
      color: #333;
    }
    .pay-tips-box {
      width: 500/@R;
      margin: 30/@R auto 0;
      color: #999;
      font-size: 24/@R;
    }
    .submit-btn-box {
      width: 100%;
      height: 100/@R;
      margin-top: 80/@R;
    }
    .submit {
      width: 100%;
      height: 100%;
      color: #fff;
      background: @primary;
      box-shadow: 2/@R 8/@R 15/@R 0 rgba(0,170,140,0.2);
      border: none;
      border-radius: 49/@R;
      outline: none;
      font-size: 36/@R;
      &[disabled] {
        background: @disabled;
        box-shadow: none;
      }
    }
  }

</style>
