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
      <div class="flex center row" v-for="(value, key) in data" :key="key">
        <div class="flex-1 col type">
          <div class="value">{{TypeLabel[key]}}</div>
          <div class="unit">/次</div>
        </div>
        <div class="flex-1 col">
          <div class="value">{{value.day}}</div>
          <div class="unit">日</div>
        </div>
        <div class="flex-1 col">
          <div class="value">{{value.week}}</div>
          <div class="unit">周</div>
        </div>
        <div class="flex-1 col">
          <div class="value">{{value.month}}</div>
          <div class="unit">月</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const TypeLabel = {
  pandian: '盘点',
  buhuo: '补货',
  tuicang: '退仓',
  anxin: '安新'
}

export default {
  name: 'MyStore',
  data () {
    return {
      TypeLabel,
      data: {
        pandian: {
          day: 3,
          week: 21,
          month: 50
        },
        buhuo: {
          day: 3,
          week: 21,
          month: 50
        },
        tuicang: {
          day: 3,
          week: 21,
          month: 50
        },
        anxin: {
          day: 3,
          week: 21,
          month: 50
        }
      }
    }
  }
}
</script>

<style lang="less">
@import "./style.less";

.my-store {
  padding: 30/@R;
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

