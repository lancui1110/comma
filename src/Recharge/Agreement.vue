<template>
  <div class="agreement">
    <h1>逗号mini便利充值协议</h1>
    <p>尊敬的客户，感谢您使用逗号mini便利，为保障您的合法权益，请您点击"立即充值"按钮前，完成、仔细地阅读本充值协议。请确保您己年满18周岁或您是在法定监护人的陪冋下阅读本协议，当您继续点击"立即充值”按钮，即视为您己阅读完毕、充分理解本协议的全部内容，并同意本协议约定执行。</p>

    <h2>一、 您向逗号mini便利充值后，所产生的余额仅可用于无人货架上支付款项。</h2>

    <h2>二、 充值说明</h2>
    <h3>1、 定义</h3>
    <p>账户余额：指您在逗号mini便利充值账户中显示的金额，账户余额一般通过充值金额、充值赠送金额获得。</p>
    <p>充值金额：指您充值中实际支付的金额(人民币)。</p>
    <p>充值赠送金额：指根据逗号mini便利平台不时推出的充值优惠活动，在您充值后，在您充值金额以外，额外赠予的金额。</p>
    <h3>2、 充值方式</h3>
    <p>可通过逗号mini便利无人货架扫码页面进行在线充值。</p>
    <h3>3、 账户金额使用规则</h3>
    <p>您的逗号mini便利账户金额仅可用于支付逗号mini便利平台提供的商品和服务的款项。</p>
    <p>您充值后，账户余额不设使用有效期，但不能转移、转赠、提现。</p>
    <p>您充值后，账户余额将无法退还。请您根据自己的消费情况充值，我们将不对充值次数设置限制。</p>


    <h2>三、保证与承诺</h2>
    <p>您完全现解并同意，逗号mini便利所提供的包括"充值返利"在内与充值相关的优惠活动仅适用于正当、合法使用我们服务的用户。一旦发现您的用户账户存在任何利用前述规则从事作弊行为以获取不正当经济利益的情形，逗号mini便利有权冻结或关闭您的用户账号以及任何其他与作弊行为相关的用户账户、收回或取消己增设的返利金额及/或追回因作弊行为取得的所有不正当的经济利益，并且逗号mini便利保留停止向您提供服务以及根据作弊行为的严重程度进一步追究法律责任的权利。</p>

    <h2>四、特别说明</h2>
    <p>我们公司有权在必要时修改本协议条款。您可以在最新的逗号mini便利首页中查阅相关协议条款。本协议条款变更后，如果您继续使本协议，即视为您己接受修改后的协议。如果您不接受修改后的协议，应当停止使用本服务并尽快联系我们。</p>
  </div>
</template>

<script>
  export default {
    name: 'Agreement'
  }
</script>

<style lang="less">
  @import "../global/style/theme.less";

  .agreement {
    padding: 30/@R 30/@R 80/@R;
    h1 {
      margin: 40/@R 0;
      text-align: center;
      font-size: 40/@R;
      font-weight: bold;
    }
    h2 {
      margin: 40/@R 0 30/@R;
      font-size: 32/@R;
      font-weight: bold;
    }
    h3 {
      margin-top: 20/@R;
      font-weight: bold;
    }
  }
</style>
