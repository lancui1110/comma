// 领取红包
<template>
  <div class="recieve-reabag-panel">
    <div class="head">
      <img :src="require('../assets/activity/bg-coupon.png')" class="bg-img"/>
      <p class="word">{{message.title}}</p>
    </div>

    <div class="content">
      <!-- 登录 -->
      <div v-if="!user || !user.mobile" class="user-form">
        <div class="form-item">
          <input type="text" placeholder="输入手机号" class="input-item" v-model="mobile" />
        </div>
        <div class="form-item code-input-panel">
          <input type="text" placeholder="输入验证码" class="input-item" v-model="code" />
          <span class="yellow-btn" v-if="!isWaiting" @click="getVerificationCode()">获取</span>
          <span class="yellow-btn disable" v-else>{{waitingNum}}s</span>
        </div>
        <div class="form-item yellow-btn" :disabled="!mobile || !code" @click="handleOnSubmitCode()">立即领取</div>
      </div>

      <!-- 已领过优惠券 -->
      <div v-else class="received-panel">
        <div class="coupons">
          <div class="coupons-panel">
            <!-- 领到的优惠券 -->
            <div v-if="!myRedPacket" class="coupons-item">
              <div class="word red">
                <span class="left word large">{{myRedPacket.money}}元</span>
                <span class="word">{{myRedPacket.nickName}}</span>
              </div>
              <div class="word">
                <span class="left word">满{{myRedPacket.lowMoney}}元立减</span>
                <span class="word">{{myRedPacket.startDate}}~{{myRedPacket.endDate}}</span>
              </div>
            </div>
            <!-- 红包领完了 -->
            <div v-else class="coupons-item recieved">{{message.emptyMsg}}</div>
          </div>
        </div>

        <div class="content-block friend-list">
          <div class="title">看看朋友们的运气</div>
          <div v-for="(item, key) in redPackets" :key="key" class="friend-item">
            <img :src="item.avatar" />
            <div class="friend-word">
              <div class="line large">
                <span class="word">{{item.nickName}}</span>
                <span class="word">{{item.money}}元</span>
              </div>
              <div class="line">
                <span class="word">{{item.issueTime}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-block">
        <div class="title">活动规则</div>
        <p v-for="(item, i) in Content.activityRule" :key="i">{{item}}</p>
      </div>
      <div class="content-block">
        <div class="title">产品介绍</div>
        <p v-for="(item, i) in Content.productIntroduce" :key="i">{{item}}</p>
      </div>

      <div class="circles">
        <img v-for="(item, i) in Content.circlePics" :key="i" :src="require(`../assets/activity/${item}`)" alt="" />
      </div>

      <div class="content-box">
        <p v-for="(item, i) in Content.content" :key="i">{{item}}</p>
      </div>
    </div>
    <div class="bottom">
      <img :src="require('../assets/activity/bg-btn.png')" class="bg-img"/>
      <div class="btn">
        <router-link to="/activity/recommend">
          <div class="yellow-btn">申请零食柜</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { trim } from 'lodash'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import Content from './content'

export default {
  name: 'ReceiveRedBag',
  data () {
    return {
      Content,

      orderNum: this.$route.query.orderNum,
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
      message: 'activity/message',
      myRedPacket: 'activity/myRedPacket',
      redPackets: 'activity/redPackets'
    }),
    title () {

    }
  },
  mounted () {
    this.$store.dispatch('activity/getOrderShare', { orderNum: this.orderNum })
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
          this.$store.commit('activity/setUserInfo', Object.assign({}, this.user, user))
        }
      })
    }
  }
}
</script>

<style lang="less">
  @import "./activity.less";

  .recieve-reabag-panel {
    position: relative;
    width: 100%;
    background: @red;
    font-size: 28/@R;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 56/@R;
    .bg-img {
      width: 100%;
    }
    .head {
      position: relative;
      .word {
        position: absolute;
        left: 0;
        top: 464/@R;
        width: 100%;
        color: #333;
        text-align: center;
      }
    }
    .content {
      position: relative;
      top: -50/@R;
    }
    .user-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 36/@R;
      margin-bottom: 30/@R;
      .form-item {
        margin-bottom: 30/@R;
      }
      .input-item {
        width: 497/@R;
        height: 101/@R;
        text-align: center;
        border-radius: 20/@R;
      }
      .input-item {
        font-size: 36/@R;
        padding: 33/@R 20/@R;
      }
      .code-input-panel {
        width: 497/@R;
        display: flex;
        justify-content: space-between;
        .input-item {
          width: 350/@R;
        }
        .yellow-btn {
          width: 120/@R;
          font-size: 32/@R;
          &.disable {
            opacity: .85;
          }
        }
      }
    }

    .received-panel {
      color: #333;
      .word {
        font-size: 28/@R;
      }
      .large {
        font-size: 44/@R;
      }
      .red {
        color: #D86868;
      }
      .coupons {
        position: relative;
        margin-bottom: 20/@R;
      }
      .left {
        display: inline-block;
        width: 250/@R;
        text-align: center;
        margin-right: 110/@R;
      }
      .coupons-panel {
        position: relative;
        width: 700/@R;
        height: 209/@R;
        background: url(../assets/activity/coupon.png) no-repeat;
        background-size: 700/@R 209/@R;
        margin: -10/@R 25/@R 0;
      }
      .coupons-item {
        width: 100%;
        height: 188/@R;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: left;
      }
      .recieved {
        width: 100%;
        align-items: center;
        color: @red;
      }
    }

    .friend-list {
      .line {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex: 1;
      }
      .friend-item {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 40/@R;
        &:nth-last-child(1) {
          margin-bottom: 0;
        }
        img {
          width: 140/@R;
          height: 140/@R;
        }
        .friend-word {
          flex: 1;
          color: #fff;
          padding-left: 50/@R;
        }
        .word {
          font-size: 24/@R;
        }
        .large {
          font-family: PingFangHK-Semibold;
          font-size: 30/@R;
        }
      }
    }
    .bottom {
      position: relative;
      .btn {
        width: 100%;
        text-align: center;
        margin-top: -100/@R;
        background: #E41E1F;
        padding-bottom: 60/@R;
      }
    }
  }

</style>
