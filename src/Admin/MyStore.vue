<template>
  <div class="admin my-store">
    <div class="mint-navbar">
      <a class="mint-tab-item is-selected">
        <div class="mint-tab-item-icon"></div>
        <div class="mint-tab-item-label">我的数据</div>
      </a>
      <router-link class="mint-tab-item" :to="{ name: 'myTask' }" >
        <div class="mint-tab-item-icon"></div>
        <div class="mint-tab-item-label">我的任务</div>
      </router-link>
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
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Navbar, TabItem } from 'mint-ui'

Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)

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
  activated () {
    this.$store.dispatch('admin/getOverview')
  }
}
</script>

<style lang="less">
@import "./style.less";

.my-store {
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
    margin: 18/@R 0;
    padding: 30/@R 50/@R;
    background-color: #fff;
  }
  .col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .value {
    margin-bottom: 30/@R;
    line-height: 70/@R;
    font-size: 70/@R;
    font-weight: bold;
  }
  .type {
    .value {
      font-size: 40/@R;
    }
  }
  .unit {
    color: #999;
  }
}
</style>

