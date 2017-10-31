<template>
  <div class="order-detail-panel">
    <div class="content-panel">
      <p class="word">订单状态：成功</p>
      <p class="word">支付方式：在线支付</p>
      <p class="word">订单编号：794750374850</p>
      <p class="word">订单时间：2017-09-09  20:48:12</p>
    </div>
    <div class="content-panel">
      <p class="word">商品金额：￥40.00</p>
      <p class="word">实际支付：￥35.00</p>
      <p class="word red">优惠:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;￥5.00</p>
    </div>
    <div class="content-panel products">
      <div class="pro-info" v-for="(item, key) in 4" :key="key">
        <img class="pic" :src="require('../assets/pic_motu.png')"/>
        <div class="infos">
          <p class="small">Dip炼乳味蛋卷橙子味  850g…</p>
          <p class="word red">¥ 20.00</p>
        </div>
        <div class="count">
          <span class="word small">x1</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'OrderDetail',
  props: {
  },
  data () {
    return {
      
    }
  }
}
</script>

<style lang="less">
  @import "../global/style/theme.less";
  
  .order-detail-panel {
    height: 100%;
    background: #F2F2F2;
    .content-panel {
      margin-bottom: 30/@R;
      padding: 20/@R 20/@R;
      background: #fff;
    }
    .word {
      font-size: 30/@R;
      padding: 10/@R 0;
    }
    .small {
      font-size: 24/@R;
    }
    .red {
      color: #D86868;
    }

    .products {
      padding: 0;
    }
    .pro-info {
      display: flex;
      border-bottom: 1px solid #eee;
      padding: 20/@R 20/@R;
      .pic {
        width: 100/@R;
        height: 100/@R;
      }
      .infos {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        align-content: space-between;
        padding-left: 20/@R;
        .red {
          position: absolute;
          padding: 0;
          bottom: 0;
        }
      }
      .count {
        position: relative;
        .word {
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    }
  }

  
</style>
