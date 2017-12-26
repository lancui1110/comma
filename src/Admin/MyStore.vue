<template>
  <div class="admin my-store">
    <div class="flex center header">
      <div class="flex-1 menu my-data">我的数据</div>
      <div class="flex-1 menu">
        <router-link :to="{ name: 'myTask' }" >
          我的任务
        </router-link>
      </div>
    </div>

    <div class="statistical">
      <div class="flex center row" v-for="(item, index) in overview" :key="index">
        <div class="flex-1 col type">
          <div class="value">{{TypeLabel[item.type]}}</div>
          <div class="unit">/次</div>
        </div>
        <div class="flex-1 col">
          <div class="value">{{item.daily}}</div>
          <div class="unit">日</div>
        </div>
        <div class="flex-1 col">
          <div class="value">{{item.week}}</div>
          <div class="unit">周</div>
        </div>
        <div class="flex-1 col">
          <div class="value">{{item.month}}</div>
          <div class="unit">月</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MyStore',
  data () {
    return {
      TypeLabel: {
        1: '盘点',
        2: '补货',
        3: '退仓',
        4: '安新'
      }
    }
  },
  computed: {
    ...mapGetters({
      overview: 'admin/overview'
    })
  },
  mounted () {
    this.$store.dispatch('admin/getOverview')
  }
}
</script>

<style lang="less">
@import "./style.less";

.my-store {
  padding: 30/@R;
  background-color: #fff;
  .header {
    margin-bottom: 100/@R;
    .menu {
      text-align: center;
      font-size: 40/@R;
    }
    .my-data {
      border-right: 2/@R solid @gray;
    }
  }
  .row {
    margin-bottom: 60/@R;
  }
  .col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .value {
    line-height: 70/@R;
    font-size: 70/@R;
    font-weight: bold;
  }
  .type {
    .value {
      font-size: 40/@R;
    }
  }
}
</style>

