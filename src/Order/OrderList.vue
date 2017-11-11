<template>
  <div v-if="!isLoad && orderList.length <= 0" class="order-list-panel no-data">
    <div class="content">
      <p class="pic"><img :src="require('../assets/img_order_none.png')"/></p>
      <p class="word">暂无订单</p>
    </div>
  </div>

  <div v-else-if="orderList.length > 0" class="order-list-panel">
    <div class="head">已完成订单</div>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="pageInfo.end" :auto-fill="false" ref="loadmore">
      <div>
        <div class="order-item" v-for="(item, key) in orderList" :key="key">
          <p class="word">货柜编号：{{item.shelfNum}}</p>
          <div class="product-pics">
            <div class="pro-pic" v-for="(pro, k) in item.goodsInfos" :key="k">
              <img :src="pro.picUrl"/>
            </div>
            <span class="word small">共{{item.count}}件 ></span>
          </div>
          <div class="word">下单时间：{{item.payTime}}</div>
          <div class="word">实际支付：<span class="price">¥{{item.realAmount}}</span></div>
          <div class="detail-btn">
            <router-link :to="{ name: 'orderDetail', query: { orderNum: item.orderNum } }">订单详情</router-link>
          </div>
        </div>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Indicator } from 'mint-ui'

export default {
  name: 'OrderList',
  data () {
    return {
      isLoad: true
    }
  },
  computed: {
    ...mapGetters({
      orderList: 'order/orderList',
      pageInfo: 'order/pageInfo'
    })
  },
  mounted () {
    this.loadList()
  },
  methods: {
    loadList () {
      Indicator.open()
      this.$store.dispatch('order/getOrderList', () => {
        this.isLoad = false
        Indicator.close()
      })
    },
    loadTop () {
      this.$store.dispatch('order/refreshOrders', this.$refs.loadmore.onTopLoaded)
    },
    loadBottom () {
      this.$store.dispatch('order/loadMoreOrders', this.$refs.loadmore.onBottomLoaded)
    }
  }
}
</script>

<style lang="less">
  @import "../global/style/theme.less";

  .order-list-panel {
    background: #F2F2F2;
    &.no-data {
      text-align: center;
      padding-top: 98/@R;
      .content{
        width: 100%;
        height: 502/@R;
        background: #fff;
      }
      .pic {
        padding: 80/@R 0 40/@R 0;
      }
      img {
        width: 350/@R;
        height: 231/@R;
      }
      .word {
        font-size: 36/@R;
        font-weight: bold;
      }
    }
    .head {
      height: 98/@R;
      line-height: 98/@R;
      font-size: 36/@R;
      padding-left: 20/@R;
    }
    .word {
      font-size: 30/@R;
      padding: 10/@R;
    }
    .small {
      font-size: 24/@R;
    }
    .order-item {
      position: relative;
      background: #fff;
      margin-bottom: 30/@R;
      padding: 10/@R 10/@R 20/@R;
      .product-pics {
        position: relative;
        flex-direction: row;
        flex-wrap: wrap;
        .small {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
      .pro-pic {
        width: 100/@R;
        height: 100/@R;
        // margin: 10/@R 20/@R 10/@R 0;
        margin: 10/@R;
        display: inline-block;
        img {
          max-width: 100/@R;
          max-height: 100/@R;
        }
      }
      .price {
        color: #D6696A;
      }
      .detail-btn {
        position: absolute;
        right: 20/@R;
        bottom: 30/@R;
        width: 100/@R;
        height: 30/@R;
        font-size: 20/@R;
        color: #fff;
        background: #593C38;
        text-align: center;
      }
    }
  }
</style>
