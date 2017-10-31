<template>
  <div class="house-detail" @click="hidePopover">
    <div class="color-75 meta">{{houseDetail.publishTimeInfo}} / {{houseDetail.lastCallInfo}}
      <span class="meta-pid">PID：{{houseDetail.publishId}}</span>
    </div>
    <div class="main-info">
      <div class="left">
        <h3 class="color-21">{{houseDetail.estateName}}</h3>
        <p>{{houseDetail.districtName}}{{houseDetail.townName}}{{houseDetail.subEstateName}}</p>
      </div>
      <div class="right">
        <div class="total"><span>{{houseDetail.price}}</span>万</div>
        <div class="color-21 avg">{{houseDetail.avgPrice}}</div>
      </div>
    </div>
    <div class="detail-info">
      <div class="info">{{houseDetail.spaceAreaStr}}<span class="unit">m²</span></div>
      <div class="info">{{houseDetail.floor}}/{{!houseDetail.totalLayers ? '-' : houseDetail.totalLayers}}<span class="unit">层</span></div>
      <div class="info">{{houseDetail.bedroomSum}}<span class="unit">室</span>{{houseDetail.livingRoomSum}}<span
        class="unit">厅</span>{{houseDetail.wcSum}}<span class="unit">卫</span></div>
    </div>

    <el-popover
      ref="detail_qrcode"
      placement="bottom"
      width="198"
      trigger="click">
      <div class="detail-qrcode">
        <img :src="qrCodeUrl" v-if="qrCodeUrl" />
        <p>微信扫码拨号</p>
      </div>
    </el-popover>
    <el-button type="primary"
               class="call-owner-btn"
               v-popover:detail_qrcode
               @click="$event.stopPropagation()">联 系 房 东
    </el-button>


    <div class="hr"></div>

    <div class="color-21 info-title" v-show="houseDetailOtherUrl.length">查看同行的该房源</div>
    <div class="links" v-show="houseDetailOtherUrl.length">
      <a class="link"
         target="_blank"
         :href="item.url"
         v-for="item in houseDetailOtherUrl" >
        <i class="iconfont icon-links"></i>
        {{item.name}}
      </a>
    </div>

    <div class="color-21 info-title">备注</div>
    <textarea class="remark" placeholder="请输入具体内容..." v-model="remark" @focus="remarkError = ''" @keypress="preventEnter"></textarea>
    <p class="error" v-show="remarkError">{{remarkError}}</p>
    <div class="detail-bottom">
      <span class="f-r remark-count">{{this.remark.length}}/200</span>
      <el-button type="primary"
                 :class="{'save-remark-btn': true, 'active': isEditingRemark}"
                 @click="saveRemark">保存
      </el-button>
      <el-button type="primary"
                 class="cancel-remark-btn"
                 v-if="isEditingRemark"
                 @click="cancelRemark">取消
      </el-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Vue from 'vue'
  import {
    Button,
    Popover
  } from 'element-ui'
  import API from '@/store/api'

  Vue.component(Button.name, Button)
  Vue.component(Popover.name, Popover)

  export default {
    name: 'HouseDetail',
    components: {},
    data () {
      return {
        remark: '',  // 这个是可以编辑的，为了坐 保存，取消 功能
        remarkError: ''
      }
    },
    props: {},
    computed: {
      ...mapGetters({
        houseDetail: 'secHouse/houseDetail',
        houseDetailOtherUrl: 'secHouse/houseDetailOtherUrl',
        houseDetailRemarks: 'secHouse/houseDetailRemarks'
      }),
      qrCodeUrl () {
        if (!this.houseDetail || !this.houseDetail.houseId) {
          return ''
        }
        return `${API.getUrl('secHouseQRCode')}?houseId=${this.houseDetail.houseId}&publishId=${this.houseDetail.publishId}&bizType=2`
      },
      recentRemark () {
        // 这个是 服务端的第一条 remark
        return this.houseDetailRemarks[0] ? this.houseDetailRemarks[0].remarkContent : ''
      },
      isEditingRemark () {
        return this.remark !== this.recentRemark
      }
    },
    watch: {
      recentRemark (newVal) {
        this.remark = newVal
      }
    },
    methods: {
      hidePopover () {
        this.$refs.detail_qrcode.doClose()
      },
      preventEnter (e) {
        if (e.keyCode === 13) {
          e.preventDefault()
          return false
        }
      },
      saveRemark () {
        const remarkContent = this.remark.trim()
        if (!remarkContent.length) {
          this.remarkError = '备注不能为空'
          return
        } else if (remarkContent.length > 200) {
          this.remarkError = '备注不能超过200个字'
          return
        }
        this.$store.dispatch('secHouse/addHouseDetailRemark', {
          houseId: this.houseDetail.houseId,
          publishId: this.houseDetail.publishId,
          remarkContent
        })
      },
      cancelRemark () {
        this.remark = this.recentRemark
        this.remarkError = ''
      }
    }
  }
</script>

<style lang="less">
  @import "../global/style/theme.less";

  .house-detail {
    position: relative;
    padding: 36px 88px;
    font-size: 16px;
    .meta {
      position: relative;
    }
    .meta-pid {
      position: absolute;
      right: 0;
    }
    .main-info {
      display: flex;
      margin: 40px 0 16px;
      .left {
        flex: 1;
      }
      .right {
        text-align: right;
      }
      h3 {
        margin-bottom: 8px;
        font-size: 24px;
      }
      .total {
        line-height: 36px;
        color: @highlight-text-color;
        font-size: 16px;
        font-weight: bold;
        span {
          font-size: 36px;
        }
      }
    }
    .detail-info {
      display: flex;
      padding: 24px 0;
      background-color: @section-bgc;
      .info {
        flex: 1;
        border-right: 1px solid #dedede;
        text-align: center;
        font-size: 28px;
        &:last-child {
          border: none;
        }
      }
      .unit {
        font-size: 24px;
      }
    }
    .call-owner-btn {
      display: block;
      width: 100%;
      height: 48px;
      margin-top: 16px;
      text-align: center;
      border-radius: 3px;
      background-color: @active-color;
      border-color: @active-color;
      color: #fff;
      font-size: 18px;
      &:hover {
        background-color: #0aa;
      }
    }

    .hr {
      display: block;
      height: 1px;
      margin: 36px 0;
      background-color: @border-color;
    }
    .info-title {
      margin-bottom: 16px;
    }
    .links {
      display: flex;
      margin-bottom: 36px;
    }
    .link {
      margin-right: 36px;
      color: #4A90E2;
    }
    .remark {
      display: block;
      width: 100%;
      height: 72px;
      padding: 12px 16px;
      margin-bottom: 12px;
      box-sizing: border-box;
      border-color: @border-color;
    }
    .remark-count {
      color: #bdbdbd;
    }
    .save-remark-btn {
      background-color: @active-color;
      border-color: @active-color;
      opacity: .4;
      &:focus,
      &:active {
        background-color: @active-color;
        border-color: @active-color;
      }
      &.active {
        opacity: 1;
      }
    }
    .cancel-remark-btn {
      background-color: @border-color;
      border-color: @border-color;
      color: @light-text-color;
      &:focus,
      &:active {
        background-color: @border-color;
        border-color: @border-color;
      }
    }
    .error {
      margin: -5px 0 10px;
      color: red;
    }
  }

  .detail-qrcode {
    padding: 14px;
    text-align: center;
    img {
      width: 150px;
      height: 150px;
      margin-bottom: 12px;
    }
    p {
      font-size: 18px;
      color: @text-color;
    }
  }

  .color-75 {
    color: @light-text-color;
  }

  .color-21 {
    color: @text-color;
  }
</style>
