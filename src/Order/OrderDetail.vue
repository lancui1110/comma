<template>
  <div class="order-detail-panel">
    <h2 class="status">{{orderDetail.statusInfo}}</h2>
    <div class="pay-type">{{orderDetail.payMethod}}</div>
    <div class="amount">￥{{orderDetail.realAmount}}</div>
    <div class="labels-panel">
      <p class="word">商品金额：￥{{orderDetail.totalAmount}}</p>
      <p class="word" v-if="orderDetail.discountAmount > 0">商品折扣：￥{{orderDetail.discountAmount}}</p>
      <p class="word" v-if="orderDetail.couponAmount > 0">红包抵扣：￥{{orderDetail.couponAmount}}</p>
      <p class="word" v-if="orderDetail.totalDiscounts > 0">优惠总计：￥{{orderDetail.totalDiscounts}}</p>
      <p class="word">订单编号：{{orderDetail.orderNum}}</p>
      <p class="word">下单时间：{{orderDetail.payTime}}</p>
    </div>
    <div class="good-label">
      <div class="label">商品明细</div>
    </div>
    <div class="content-panel products">
      <div class="pro-info" v-for="(item, key) in orderDetail.goodsInfos" :key="key">
        <img class="pic" :src="item.picUrl"/>
        <div class="info-wrap">
          <div class="name">{{item.name}}  {{item.specification}}…</div>
          <div class="num">x{{item.num}}</div>
          <div class="price">¥{{item.price}}</div>
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
    h2.status {
      padding: 40/@R 0 30/@R;
      text-align: center;
      font-size: 48/@R;
      font-weight: bold;
    }
    .pay-type {
      text-align: center;
      font-size: 28/@R;
    }
    .amount {
      margin: 10/@R 0 70/@R;
      line-height: 67/@R;
      text-align: center;
      font-size: 48/@R;
      font-weight: bold;
    }
    .labels-panel {
      padding: 0 50/@R;
    }
    .word {
      padding-bottom: 20/@R;
      font-size: 24/@R;
    }

    .good-label {
      margin: 50/@R 0;
      text-align: center;
      .label {
        position: relative;
        display: inline-block;
        padding: 0 30/@R;
        line-height: 42/@R;
        font-size: 30/@R;
        font-weight: bold;
        background-color: #fff;
        &:before,
        &:after {
          content: " ";
          display: block;
          position: absolute;
          width: 121/@R;
          height: 3/@R;
          background-color: #979797;
        }
        &:before {
          top: 21/@R;
          right: 100%;
        }
        &:after {
          top: 21/@R;
          left: 100%;
        }
      }
    }

    .products {
      padding: 0;
    }
    .pro-info {
      display: flex;
      padding: 0 50/@R;
      margin-bottom: 50/@R;
      font-size: 24/@R;
      .pic {
        width: 100/@R;
        height: 100/@R;
      }
      .info-wrap {
        flex-grow: 1;
        display: flex;
        padding: 13/@R 0 0 30/@R;
      }
      .name {
        max-width: 300/@R;
        line-height: 37/@R;
      }
      .num {
        flex-grow: 1;
        line-height: 37/@R;
        text-align: right;
      }
      .price {
        flex-shrink: 0;
        width: 130/@R;
        line-height: 42/@R;
        text-align: right;
        font-size: 30/@R;
      }
    }
  }
</style>
