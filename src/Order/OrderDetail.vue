<template>
  <div class="order-detail-panel">
    <div class="content-panel">
      <p class="word">订单状态：{{orderDetail.statusInfo}}</p>
      <p class="word">支付方式：{{orderDetail.payMethod}}</p>
      <p class="word">订单编号：{{orderDetail.orderNum}}</p>
      <p class="word">订单时间：{{orderDetail.payTime}}</p>
    </div>
    <div class="content-panel price-panel">
      <p class="word">商品金额：<span class="right red">￥{{orderDetail.totalAmount}}</span></p>
      <p class="word">实际支付：<span class="right red">￥{{orderDetail.realAmount}}</span></p>
      <p class="word" v-if="orderDetail.totalDiscounts > 0">优惠总计：<span class="right">￥{{orderDetail.totalDiscounts}}</span></p>
      <p class="word small" v-if="orderDetail.discountAmount > 0">商品折扣：<span class="right">￥{{orderDetail.discountAmount}}</span></p>
      <p class="word small" v-if="orderDetail.couponAmount > 0">红包抵扣：<span class="right">￥{{orderDetail.couponAmount}}</span></p>
    </div>
    <div class="content-panel products">
      <div class="pro-info" v-for="(item, key) in orderDetail.goodsInfos" :key="key">
        <img class="pic" :src="item.picUrl"/>
        <div class="infos">
          <p class="small">{{item.name}}  {{item.specification}}…</p>
          <p class="word red">¥ {{item.price}}</p>
        </div>
        <div class="count">
          <span class="word small">x{{item.num}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OrderDetail',
  props: {
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      orderDetail: 'order/orderDetail'
    })
  },
  activated () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$store.dispatch('order/getOrderDetail', this.$route.query.orderNum)
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
    .price-panel {
      .word {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .small {
        padding-left: 22/@R;
      }
      .right {

      }
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
