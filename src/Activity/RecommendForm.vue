<!-- 推荐表单 -->
<template>
  <div class="recommend-form-panel">
    <div class="head">
      <i class="icon icon-logo-white"></i>
      <span class="word">逗号mini便利，小身材大满足</span>
    </div>
    <form action="">
      <div class="content">
        <div class="row top-info">
          <i class="icon icon-shape"></i>
          <span class="word">填写资料，免费申请办公室零食柜</span>
        </div>
        <div class="row">
          <span class="label">公司名称</span>
          <input
            type="text"
            placeholder="请输入公司名称"
            class="txt-input"
            id="companyName"
            :value="form.companyName"
            @input="updateFormField"
          />
        </div>
        <div class="row">
          <span class="label">联系人姓名</span>
          <input
            type="text"
            placeholder="请输入公司联系人姓名"
            class="txt-input"
            id="linkName"
            :value="form.linkName"
            @input="updateFormField"
          />
        </div>
        <div class="row">
          <span class="label">+86</span>
          <input
            type="tel"
            placeholder="请输入联系人手机号"
            class="txt-input"
            id="referrerMobile"
            :value="form.referrerMobile"
            @input="updateFormField"
          />
        </div>
        <div class="row">
          <span class="label">所在城市</span>
          <input
            type="text"
            placeholder="请选择所在城市"
            class="txt-input"
          />
        </div>
        <div class="row">
          <span class="label">公司地址</span>
          <input
            type="text"
            placeholder="请输入公司地址"
            class="txt-input"
            id="address"
            :value="form.address"
            @input="updateFormField"
          />
        </div>
        <div class="row">
          <span class="label">您的手机号</span>
          <input
            type="text"
            class="txt-input"
            id="mobile"
            :value="form.mobile"
            @input="updateFormField"
          />
          <!-- <p class="word small">填写您的手机号，入驻后会对您发放奖励金！</p> -->
        </div>
      </div>
      <div class="btn" @click="submitForm">提交审核</div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ReceiveRedBag',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      form: 'activity/recommendForm',
      cityData: 'activity/cityData'
    }),
    citySlot () {
      return [
        {
          values: this.cityData
        }
      ]
    }
  },
  mounted () {
    this.$store.dispatch('activity/getCityData')
  },
  methods: {
    updateFormField (e) {
      this.$store.commit('activity/updateRecommendFormField', {
        name: e.target.id,
        value: e.target.value
      })
    },
    submitForm () {
      // TODO: valid form field
      this.$store.dispatch('activity/submitRecommendForm')
    }
  }
}
</script>

<style lang="less">
  @import "../global/style/theme.less";

  .recommend-form-panel {
    position: relative;
    width: 100%;
    background: #fff;
    font-size: 36/@R;
    color: #333;
    .head {
      width: 100%;
      height: 105/@R;
      line-height: 105/@R;
      background: #26100D;
      display: flex;
      .icon {
        margin: 20/@R 55/@R;
      }
      .word {
        flex: 1;
        color: #fff;
      }
    }
    .content {
      .top-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        .word {
          padding-left: 30/@R;
        }
      }
    }
    .row {
      width: 100%;
      // height: 104/@R;
      line-height: 104/@R;
      border-bottom: 1px solid #D9D9D9;
      padding: 0 30/@R;
      .label {
        display: inline-block;
        width: 245/@R;
      }
      .txt-input {
        border: 0;
        outline: none;
      }
      .small {
        font-size: 24/@R;
        color: #999;
        margin-top: -35/@R;
      }
    }
    .btn {
      width: 700/@R;
      height: 97/@R;
      line-height: 97/@R;
      background: #593C38;
      border-radius: 10/@R;
      color: #fff;
      text-align: center;
      margin: 0 auto;
      margin-top: 136/@R;
      margin-bottom: 100/@R;

    }
  }

</style>
