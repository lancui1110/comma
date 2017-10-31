<template>
  <div class="footer">
    <router-link :to="{name: 'about'}">关于我们</router-link> | <span>客服电话：400-700-9922（服务时间：10:00 ~ 19:00<工作日>） </span>
    <p>上海房友宝商务咨询有限公司 &nbsp; Copyright @ 2014 - 2015 fyb365.com 版权所有 沪 ICP 备 14010930 号</p>
  </div>
</template>

<script>
export default {
  name: 'HomeFooter'
}
</script>

<style lang="less">
.footer {
  height: 75px;
  text-align: center;
  background: #333;
  clear: both;
  padding-top: 25px;
  color: #ccc;
  font-size: 16px;

  a {
    font-size: 16px;
    color: #fff;
  }
  span {
    font-size: 16px;
    color: #fff;
  }
  p {
    font-size: 14px;
    margin-top: 16px;
    color: #ccc;
  }
}
</style>
