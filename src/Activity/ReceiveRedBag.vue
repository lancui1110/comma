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
          <span class="btn">获取</span>
        </div>
        <div class="form-item btn">立即领取</div>
      </div>

      <!-- 已领过优惠券 -->
      <div v-if="state === 2" class="received-panel">
        <div class="coupons">
          <div v-for="(item, key) in coupons" :key="key" class="coupons-panel">
            <div class="coupons-item">
              <div class="word red">
                <span class="left word large">{{item.price}}元</span>
                <span class="word">{{item.name}}</span>
              </div>
              <div class="word">
                <span class="left word">满{{item.lowPrice}}元立减</span>
                <span class="word">{{item.startDate}}~{{item.endDate}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-block">
        <div class="title">活动规则</div>
        <p>1、每张优惠券同一设备、同一ID、同一用户每天仅限领取一次；</p>
        <p>2、每个订单仅限使用一张优惠券；</p>
        <p>3、优惠券金额不能兑换现金</p>
      </div>
      <div class="content-block">
        <div class="title">产品介绍</div>
        <p>逗号mini便利，适合办公室的无人值守小超市，20步距离的能量补给站，解锁零售方式，90%的价钱解决100%的需求。</p>
      </div>

      <div class="circles">
        <img :src="require('../assets/activity/circle.png')" alt="" />
        <img :src="require('../assets/activity/circle.png')" alt="" />
        <img :src="require('../assets/activity/circle.png')" alt="" />
        <img :src="require('../assets/activity/circle.png')" alt="" />
      </div>

      <div class="content-box">
        <p>精选品质，国外网红商品，1网打尽；</p>
        <p>不交押金、丢货免赔、免费配送；</p>
        <p>早餐、零食、宵夜、1站解决；</p>
        <p>产品每日配送，每周上新，1马当先</p>
      </div>
    </div>
    <div class="bottom">
      <img :src="require('../assets/activity/bg-btn.png')" class="bg-img"/>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'ReceiveRedBag',
  props: {
  },
  data () {
    return {
      state: 1,
      coupons: [{
        name: '新人礼包1',
        numberCode: 'EiVTePe5JX4',
        price: 1,
        lowPrice: 20,
        startDate: '2017.10.24',
        endDate: '2017.10.24',
        status: 4
      }, {
        name: '新人礼包2',
        numberCode: 'EiVTePe5JX4',
        price: 1,
        lowPrice: 20,
        startDate: '2017.10.24',
        endDate: '2017.10.24',
        status: 4
      }]
    }
  }
}
</script>

<style lang="less">
  @import "../global/style/theme.less";

  @red:#E93C4D;
  
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
      .input-item, .btn {
        width: 497/@R;
        height: 101/@R;
        text-align: center;
        border-radius: 20/@R;
      }
      .input-item {
        font-size: 36/@R;
        padding: 33/@R 20/@R;
      } 
      .btn {
        width: 497/@R;
        background: #F9DC57;
        font-size: 42/@R;
        color: #A91414;
        line-height: 101/@R;
      }
      .code-input-panel {
        width: 497/@R;
        display: flex;
        justify-content: space-between;
        .input-item {
          width: 350/@R;
        }
        .btn {
          width: 120/@R;
          font-size: 32/@R;
        }
      }
    }
    .content-block {
      position: relative;
      border-top: 1px solid #fff;
      font-size: 28/@R;
      margin: 63/@R 40/@R 0 40/@R;
      padding: 56/@R 14/@R 0 14/@R;
      .title {
        position: absolute;
        top: -30/@R;
        left: 196/@R;
        width: 287/@R;
        text-align: center;
        background: @red;
      }
      p {
        line-height: 56/@R;
      }
    }
    .circles {
      margin: 34/@R 30/@R;
      img {
        width: 160/@R;
        height: 160/@R;
        margin-right: 5/@R;
        &:nth-child(4) {
          margin-right: 0;
        }
      }
    }
    .content-box {
      margin: 0 62/@R;
      border: 1px solid #F1B06D;
      border-radius: 29/@R;
      padding: 40/@R 0 220/@R 90/@R;
      p {
        line-height: 56/@R;
      }
    }
    .bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      font-size: 0;
      line-height: 0;
      .img {
        width: 100%;
      }
    }

    .received-panel {
      .word {
        font-size: 28/@R;
      }
      .large {
        font-size: 44/@R;
      }
      .red {
        color: #D86868;
      }
      .gray {
        .word, .red {
          color: #D9D9D9;
        }
      }
      .coupons {
        position: relative;
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
        height: 100%;
        border-radius: 2px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: left;
      }
    }
  }
  
</style>
