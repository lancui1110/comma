// 线下领取优惠券
<template>
  <div class="offline-coupon-panel">
    <div class="head flex column center">
      <h1>&nbsp;恭喜获得大礼包!</h1>
      <img :src="require('./assets/giftbox.png')" class="giftbox-img"/>
    </div>

    <div class="content">
      <div v-if="user !== null">
        <!-- 登录 -->
        <div v-if="!user.mobile" class="user-form">
          <div class="form-item">
            <input type="text" placeholder="请输入手机号" class="input-item" v-model="mobile" />
          </div>
          <div class="form-item code-input-panel">
            <input type="text" placeholder="请输入验证码" class="input-item" v-model="code" />
            <span class="yellow-btn small" v-if="!isWaiting" @click="getVerificationCode()">获取验证码</span>
            <span class="yellow-btn disable" v-else>{{waitingNum}} s</span>
          </div>
          <div class="form-item yellow-btn" :disabled="!mobile || !code" @click="handleOnSubmitCode()">领取礼包</div>
        </div>

        <div v-if="couponInfoList && couponInfoList.length > 0" class="coupons-list-panel">
          <coupon-item :coupon="item" v-for="(item, key) in couponInfoList" :key="key" ></coupon-item>
        </div>
      </div>
      <div class="guide-word">
        <p>请小主移步到附近的货架</p>
        <p>即可享受优惠哦~</p>
      </div>
    </div>
    <div class="bottom-img">
      <img :src="require('./assets/bottom.png')" class="bg-img" />
    </div>
  </div>
</template>

<script>
import { trim } from 'lodash'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import CouponItem from '../components/CouponItem'

export default {
  name: 'ReceiveRedBag',
  components: {
    CouponItem
  },
  data () {
    return {
      activityId: this.$route.query.activityId || 1,
      isWaiting: false,
      waitingNum: 60,
      isSubmit: false,
      mobile: '',
      code: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      couponInfoList: 'activity/couponInfoList'
    }),
    title () {

    }
  },
  mounted () {
    this.$store.dispatch('activity/getScanCouponActivity', {activityId: this.activityId})
  },
  methods: {
    // 发请求获取验证码
    getVerificationCode () {
      const m = trim(this.mobile)
      if (!m || !/^1[\d]{10}$/.test(m)) {
        Toast('请输入正确的手机号！')
        return
      }
      this.$store.dispatch('user/sendVerifyCode', {
        mobile: m,
        cb: (res) => {
          if (res.code === 1) {
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
        mobile: this.mobile,
        code: this.code,
        cb: (user) => {
          this.isSubmit = false
          // this.$store.commit('activity/setUserInfo', Object.assign({}, this.user, user))
          // 强刷页面
          window.location.reload()
        }
      })
    },
    goPage () {
      location.href = `${pageConfig.siteUrl}index/activity/recommend`
    }
  }
}
</script>

<style lang="less">
  @import "../global/style/theme.less";
  @pink: #EC4269;
  @red:#E93C4D;
  @brown: #2A0E0C;

  .offline-coupon-panel {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: @pink;
    font-size: 28/@R;
    color: #FFFFFF;
    letter-spacing: 0;
    padding: 60/@R 0 156/@R 0;
    overflow-y: auto;
    .bg-img {
      width: 100%;
    }
    .head {
      position: relative;
      justify-content: center;
      h1 {
        font-size: 64/@R;
        padding: 20/@R 0;
      }
      .giftbox-img {
        width: 226/@R;
        height: 290/@R;
      }
    }

    .user-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 36/@R;
      margin-top: 114/@R;
      .form-item {
        margin-bottom: 30/@R;
      }
      .input-item {
        width: 590/@R;
        // height: 88/@R;
        // line-height: 88/@R;
        font-size: 34/@R;
        padding: 18/@R 30/@R;
        text-align: left;
        border-radius: 10/@R;
        outline: none;
        border: 0;
      }
      .yellow-btn {
        width: 590/@R;
        height: 88/@R;
        line-height: 88/@R;
        text-align: center;
        border-radius: 10/@R;
        background: #FF9C00;
        font-size: 34/@R;
        color: #fff;
        display: inline-block;
      }
      .code-input-panel {
        width: 590/@R;
        display: flex;
        justify-content: space-between;
        .input-item {
          width: 356/@R;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        .yellow-btn {
          flex: 1;
          font-size: 28/@R;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          &.disable {
            opacity: .85;
          }
          &.small{
            
          }
        }
      }
    }
    .coupons-list-panel {
      position: relative;
      padding: 50/@R 0;
      .coupons-item-panel {
        &:before,
        &:after {
          background-color: @pink;
        }
        .name {
          color: #333;
        }
      }
    }

    .guide-word {
      font-size: 42/@R;
      color: #fff;
      text-align: center;
      font-weight: 500;
    }
    
    .bottom {
      // .btn {
      //   width: 100%;
      //   text-align: center;
      //   margin-top: -100/@R;
      //   background: #E41E1F;
      //   padding-bottom: 60/@R;
      // }
    }
    .bottom-img {
      font-size: 0;
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }

</style>
