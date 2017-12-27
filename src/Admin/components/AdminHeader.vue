<template>
  <div class="flex center admin-header">
    <h1 class="flex-1">XXX，您好~</h1>
    <span class="flex center column link">
      <i class="icon icon-qr-code"></i>
      扫描货架
    </span>
    <router-link class="flex center column link" :to="{name: 'myStore'}">
      <i class="icon icon-more"></i>
      我的店铺
    </router-link>
  </div>
</template>

<script>
import weixin from 'weixin'

export default {
  name: 'AdminHeader',
  methods: {
    scanQRCode () {
      weixin.weixinScanQRCode((res) => {
        this.$emit('scan', res)
      })
    }
  }
}
</script>

<style lang="less">
@import "../style.less";

.admin-header {
  padding: 30/@R;
  border-bottom: 1/@R solid @gray;
  background-color: #fff;
  h1 {
    font-size: 48/@R;
  }
  .link {
    margin-left: 20/@R;
    color: @font-gray;
    font-weight: bold;
    .icon {
      width: 60/@R;
      height: 60/@R;
      margin-bottom: 10/@R;
      background-size: cover;
    }
  }
}
</style>

