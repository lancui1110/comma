<template>
  <div class="rechart-list">
    <h1>充值明细</h1>

    <div class="nodata" v-if="!loading && !rechargeList.length">
      <i class="icon icon-logo-gray"></i>
      <div class="word">没有充值记录</div>
    </div>
    <div class="list" v-else>
      <div class="item" v-for="(item, key) in rechargeList" :key="key">
        <div class="title">
          <div class="type">{{item.type}}</div>
          <div class="amount">{{item.amount}}元</div>
        </div>
        <div class="meta">{{item.time}}</div>
        <div class="meta">充值金额：{{item.amount}}元</div>
        <div class="meta">充值编号：{{item.code}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Indicator } from 'mint-ui'

  export default {
    name: 'RechartList',
    data () {
      return {
        loading: true
      }
    },
    computed: {
      ...mapGetters({
        rechargeList: 'recharge/rechargeList'
      })
    },
    mounted () {
      this.loadList()
    },
    methods: {
      loadList () {
        Indicator.open()
        this.$store.dispatch('recharge/getRechargeList', () => {
          this.loading = false
          Indicator.close()
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../global/style/theme.less";

  .rechart-list {
    padding: 50/@R;
    .nodata {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 200/@R;
      .word {
        margin-top: 64/@R;
        font-size: 24/@R;
        color: @font-gray-light;
      }
    }
    h1 {
      line-height: 67/@R;
      margin-bottom: 50/@R;
      font-size: 48/@R;
      font-weight: bold;
    }
    .item {
      padding: 30/@R 0;
      border-top: 1/@R solid #E6E6E6;
      &:last-child {
        border-bottom: 1/@R solid #E6E6E6;
      }
    }
    .title {
      display: flex;
      line-height: 40/@R;
      font-size: 28/@R;
      font-weight: bold;
    }
    .type {
      flex-grow: 1;
    }
    .amount {
      flex-grow: 0;
    }
    .meta {
      line-height: 33/@R;
      margin-top: 10/@R;
      font-size: 24/@R;
      color: @font-gray;
    }
  }
</style>
