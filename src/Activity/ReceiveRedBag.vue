// 领取红包
<template>
  <div class="recieve-reabag-panel">
    <div class="head">
      <img :src="require('../assets/activity/bg-coupon.png')" class="bg-img"/>
      <p class="word">红包来啦，赶快登陆领取</p>
    </div>
    
    <div class="content">
      <!-- 登录 -->
      <div v-if="state === 1" class="user-form">
        <div class="form-item"><input type="text" placeholder="输入手机号" class="input-item"></div>
        <div class="form-item code-input-panel">
          <input type="text" placeholder="输入验证码" class="input-item">
          <span class="yellow-btn">获取</span>
        </div>
        <div class="form-item yellow-btn">立即领取</div>
      </div>

      <!-- 已领过优惠券 -->
      <div v-if="state === 2" class="received-panel">
        <div class="coupons">
          <div class="coupons-panel">
            <div class="coupons-item">
              <div class="word red">
                <span class="left word large">{{coupon.price}}元</span>
                <span class="word">{{coupon.name}}</span>
              </div>
              <div class="word">
                <span class="left word">满{{coupon.lowPrice}}元立减</span>
                <span class="word">{{coupon.startDate}}~{{coupon.endDate}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="content-block friend-list">
          <div class="title">看看朋友们的运气</div>
          <div v-for="(item, key) in 4" :key="key" class="friend-item">
            <img :src="require('../assets/activity/user0.png')" />
            <div class="friend-word">
              <div class="line large">
                <span class="word">Yolanda</span>
                <span class="word">1元</span>
              </div>
              <div class="line">
                <span class="word">10-19  09:34</span>
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
        <view-router to="/activity/recommendForm">
          <div class="yellow-btn">申请零食柜</div>
        </view-router>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Content from './content'

export default {
  name: 'ReceiveRedBag',
  props: {
  },
  data () {
    return {
      Content,
      state: 2, // 是否已登录
      coupon: {
        name: '新人礼包1',
        numberCode: 'EiVTePe5JX4',
        price: 1,
        lowPrice: 20,
        startDate: '17.10.24',
        endDate: '17.10.24',
        status: 4
      }
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
