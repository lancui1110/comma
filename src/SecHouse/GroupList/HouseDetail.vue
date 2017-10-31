<template>
  <div class="house-detail" @click="hidePopover">
    <div class="color-75 meta">{{houseDetail.publishTimeInfo}} / {{houseDetail.lastCallInfo}}
      <span class="meta-pid">PID：{{houseDetail.publishId}}</span>
    </div>
    <div class="main-info">
      <div class="left">
        <h3 class="color-21">{{houseDetail.estateName}}</h3>
        <p v-if="memberStatus === 1" class="line-item">{{houseDetail.buildingNameStr}}{{houseDetail.room}}室</p>
        <p v-if="memberStatus === 2" class="line-item">**号**室 <span class="see-addr-btn">会员打赏看地址</span></p>
        <p v-if="memberStatus === 3" class="line-item">**号**室 <span class="see-addr-btn forbidden">地址特权被收回</span></p>
      </div>
      <div class="right">
        <div class="total"><span>{{houseDetail.price}}</span>万</div>
        <div class="color-21 avg">{{houseDetail.avgPrice}}</div>
      </div>
    </div>

    <div class="detail-info">
      <p class="info-title">房源信息</p>
      <div class="info-panel">
        <div class="info-item">所在楼层:<span class="content">{{houseDetail.floor}}{{houseDetail.totalLayers ? `/${houseDetail.totalLayers}` : ''}}层</span></div>
        <div class="info-item">房屋户型:<span class="content">{{houseDetail.bedroomSum}}室{{houseDetail.livingRoomSum}}厅{{houseDetail.wcSum}}卫</span></div>
        <div class="info-item">建筑面积:<span class="content">{{houseDetail.spaceAreaStr}}平</span></div>
        <div class="info-item">房本年限:<span class="content">{{aboveFiveYear}}</span></div>
      </div>
    </div>

    <!-- 联系房东 -->
    <el-popover ref="detail_qrcode" placement="bottom" width="198" trigger="click">
      <div class="detail-qrcode">
        <img :src="qrCodeUrl" v-if="qrCodeUrl" />
        <p>微信扫码拨号</p>
      </div>
    </el-popover>
    <el-button type="primary" class="call-owner-btn" v-popover:detail_qrcode @click="$event.stopPropagation()">联系房东
    </el-button>

    <!-- 我的备注 -->
    <div class="remark-panel">
      <div class="color-21 info-title">我的备注</div>
      <textarea class="remark" placeholder="在此输入具体内容，备注信息只有您自己可以看到" v-model="remark" @focus="remarkError = ''" @keypress="preventEnter"></textarea>
      <p class="error" v-show="remarkError">{{remarkError}}</p>
      <div class="detail-bottom" v-if="isEditingRemark">
        <span class="f-r remark-count">{{this.remark.length}}/200</span>
        <el-button type="primary"
                   :class="{'save-remark-btn': true, 'active': isEditingRemark}"
                   @click="saveRemark">保存
        </el-button>
        <el-button type="primary"
                   class="cancel-remark-btn"
                   @click="cancelRemark">取消
        </el-button>
      </div>
    </div>

    <!-- 房源照片 -->
    <div class="house-image-panel">
      <div class="color-21 info-title">房源照片<span v-if="houseImages.length > 0" class="light-word">图片来自于链家</span></div>

      <div v-if="houseImages.length === 0" class="no-img">暂无房源照片</div>
      <div v-else>
        <div class="house-img-items">
          <img class="house-img" v-for="item in houseImages" :src="item.imgUrl" @click="showCarousel(1)" :title="item.imgDesc"/>
        </div>
        <a :href="ljUrl" target="_blank"><div class="go-bar">去链家查看更多 <i class="iconfont icon-ailicaiarrow"></i></div></a>
      </div>
    </div>

    <!-- 小区信息 -->
    <div class="estate-info-panel detail-info">
      <p class="info-title">小区信息</p>
      <div class="info-panel">
        <div class="info-item col0">小区名:<span class="content">{{houseDetail.estateName}}</span></div>
        <div class="info-item">所在区域:<span class="content">{{houseDetail.districtName}}</span></div>
        <div class="info-item col2">
          小区地址:<span class="content">{{houseDetail.districtName}}{{houseDetail.subEstateName}}</span>
          <span class="tomap" @click="gotoMap">地图</span>
        </div>
        <div class="info-item">环线信息:<span class="content">{{houseDetail.locationInfoName}}</span></div>
        <div class="info-item">建造年代:<span class="content">{{!houseDetail.contructDate ? '-' : houseDetail.contructDate}}年</span></div>
        <div class="info-item traffic-items">交通信息:
          <div class="info-traffic">
            <div class="content">
              地铁：
              <div class="traffic-item">
                <p v-if="!estateTrafficInfo.subwayList || estateTrafficInfo.subwayList.length === 0">-</p>
                <p v-else class="info" v-for="item in estateTrafficInfo.subwayList">{{item.name}}站，{{convert('subway', item.address)}}，{{driveTypeMap[item.type]}}{{item.distance.text}}，约{{item.duration.text}}</p>
              </div>
            </div>
            <div class="content">
              公交：
              <div class="traffic-item" >
                <p v-if="!estateTrafficInfo.busList || estateTrafficInfo.busList.length === 0">-</p>
                <p v-else class="info" v-for="item in estateTrafficInfo.busList">{{item.name}}站，{{convert('bus', item.address)}}，{{driveTypeMap[item.type]}}{{item.distance.text}}，约{{item.duration.text}}</p>
              </div>
            </div>
            <div class="content">
              高速：<div class="traffic-item">
                <p v-if="!estateTrafficInfo.highwayList || estateTrafficInfo.highwayList.length === 0">-</p>
                <p v-else class="info" v-for="item in estateTrafficInfo.highwayList">{{item.name}}站，{{driveTypeMap[item.type]}}{{item.distance.text}}，约{{item.duration.text}}</p>
              </div>
              </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 小区照片 -->
    <div class="etate-image-panel house-image-panel">
      <div class="color-21 info-title">小区照片</div>
      <div v-if="estateImgs.length === 0" class="no-img">暂无小区照片</div>
      <div v-else>
        <div class="house-img-items">
          <img class="house-img" v-for="item in estateImgs" :src="item.imgUrl" @click="showCarousel(2)"/>
        </div>
      </div>
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
        remark: '',  // 这个是可以编辑的，为了做 保存，取消 功能
        remarkError: '',
        trafficInfo: [],
        ljUrl: '',
        driveTypeMap: { 1: '驾车', 2: '骑行', 3: '步行' }
      }
    },
    props: {},
    computed: {
      ...mapGetters({
        houseDetail: 'groupSecHouse/houseDetail',
        houseDetailOtherUrl: 'groupSecHouse/houseDetailOtherUrl',
        estateImgs: 'groupSecHouse/estateImgs',
        houseDetailRemarks: 'groupSecHouse/houseDetailRemarks',
        memberInfo: 'groupSecHouse/memberInfo',
        estateTrafficInfo: 'groupSecHouse/estateTrafficInfo'
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
      },
      aboveFiveYear () {
        const map = {1: '满二', 2: '不满二', 3: '不确定'}
        const above = this.houseDetail.aboveFiveYear
        return map[above] ? map[above] : map[3]
      },
      houseImages () {
        const data = this.houseDetailOtherUrl
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === '链家') {
            this.ljUrl = data[i].url
            return data[i].houseImages || []
          }
        }
        return []
      },
      memberStatus () {
        /**
         * 1. 是会员，且状态正常且已打赏，正常显示地址
         * 2. 非会员 隐藏地址
         * 3. 是会员，但被禁用，显示特权被收回
         */
        if (this.memberInfo.memberPrivilege) {
          if (this.memberInfo.memberPrivilege.state === 1 && this.buttonStatus === 2) {
            return 1
          }
          if (this.memberInfo.memberPrivilege.state === 2) {
            return 3
          }
        }
        return 2
      },
      buttonStatus () {
        /*
          按钮的几种状态
          1.房屋未下架，还没打赏，此时显示『联系房东』，点击进入打赏页
          2.房屋未下架，已经打赏，并处于『未退赏』或『退赏被拒绝』，或者是自己发布的，此时显示『联系房东』，点击拨打房东号码
          3.房屋未下架，已经打赏，并申请退赏，已经处于『退赏处理中』，此时显示『退赏处理中』，不可点击
          4.房屋已下架，显示『已下架』
          5.rewardOrder不存在的情况下，如果有盟友打赏，则显示联盟效果
          新增逻辑：在已经打赏过的房源里，『联系房东』和『退赏处理中』的优先级大于『已下架』
         */
        let rewardOrder = this.houseDetail.rewardOrder

        if (!rewardOrder) {
          if (this.houseDetail.inUnion) {
            // this.getSercetMobile()
            return 5
          }
          return 1
        }

        const refundState = rewardOrder.refundState
        if (refundState === 1 || refundState === 4 || refundState === 5) {
          return 2
        }
        if (refundState === 2) {
          return 3
        }
        return 2
      }
    },
    mounted () {

    },
    watch: {
      recentRemark (newVal) {
        this.remark = newVal
      },
      houseDetail () {
        // 滚到顶部
        const dom = document.querySelector('.slide-panel-inner')
        dom.scrollTop = 0
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
        this.$store.dispatch('groupSecHouse/addHouseDetailRemark', {
          estateId: this.houseDetail.estateId,
          bedroomSum: this.houseDetail.bedroomSum,
          houseId: this.houseDetail.houseId,
          publishId: this.houseDetail.publishId,
          remarkContent
        })
      },
      cancelRemark () {
        this.remark = this.recentRemark
        this.remarkError = ''
      },
      // 显示大图
      showCarousel (type) { // type 1:房源 2:小区
        this.$store.commit('groupSecHouse/setCarouselType', type)
      },
      gotoMap () {
        const item = this.houseDetail
        window.open(`http://api.map.baidu.com/marker?location=${item.latitude},${item.longitude}&title=${item.estateName}&content=&autoOpen=false&output=html`)
      },
      convert (type, str) {
        if (type === 'subway') {
          str = str.replace(/地铁|号线/g, '').replace(/;/g, '/')
          str = `地铁${str}号线`
        } else if (type === 'bus') {
          str = str.replace(/路/g, '').replace(/;/g, '/')
          str = `${str}路`
        }
        return str
      }
    }
  }
</script>

<style lang="less">
  @import "../../global/style/theme.less";

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
      .line-item {
        display: flex;
      }
      .see-addr-btn {
        font-size: 12px;
        color: @active-color;
        border: 1px solid @active-color;
        padding: 0px 8px;
        height: 20px;
        line-height: 20px;
        border-radius: 2px;
        margin-left: 8px;

        &.forbidden {
          color: @highlight-text-color;
          border-color: @highlight-text-color;
        }
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
      padding-top: 14px;
      box-sizing: border-box;
      .info-panel {
        display: flex;
        width: 100%;
        border-top: @common-border;
        margin: 12px 0;
        flex-wrap: wrap;
      }
      .info-item {
        width: 50%;
        font-size: 14px;
        padding-top: 12px;
        color: @light-text-color;
      }
      .content {
        color: @text-color;
        margin-left: 16px;
      }
      .col0 .content {
        margin-left: 30px;
      }
      .col2 {
        width: 100%;
      }
    }
    .call-owner-btn {
      display: block;
      width: 100%;
      height: 48px;
      margin: 20px 0 24px 0;
      text-align: center;
      border-radius: 3px;
      background-color: @active-color;
      border-color: @active-color;
      color: #fff;
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 2px;
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
      font-family: PingFangSC;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 12px;
    }
    .links {
      display: flex;
      margin-bottom: 36px;
    }
    .link {
      margin-right: 36px;
      color: #4A90E2;
    }
    .remark-panel {
      margin-bottom: 16px;
    }
    .remark {
      display: block;
      width: 100%;
      font-size: 14px;
      height: 48px;
      padding: 12px;
      margin-bottom: 12px;
      box-sizing: border-box;
      border-color: @border-color;
      &:focus {
        outline: -webkit-focus-ring-color auto 2px;
        outline-offset: -2px;
      }
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

    .house-image-panel {
      position: relative;
      padding-bottom: 12px;
      a {
        text-decoration: none;
      }
      .info-title {
        position: relative;
      }
      .light-word {
        position: absolute;
        right: 0;
        bottom: 0;
        color: @light-text-color;
        font-size: 12px;
      }
      .house-img-items {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .house-img {
        width: 230px;
        height: 147px;
        margin-bottom: 24px;
        cursor: pointer;
      }
      .go-bar {
        background: @section-bgc-2;
        text-align: center;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: @light-text-color;
        margin-top: -12px;
        cursor: pointer;
        .iconfont {
          font-size: 12px;
        }
      }
      .no-img {
        width: 230px;
        height: 147px;
        background-color: #fff;
        color: @text-color-1;
        font-size: 14px;
        border: solid 1px @border-color;
        text-align: center;
        line-height: 147px;
      }
    }
    .estate-info-panel {
      padding-bottom: 12px;
      .tomap {
        color: #4a90e2;
        cursor: pointer;
        margin-left: 5px;
      }
    }

    .traffic-items.info-item {
      width: 100%;
      display: flex;
      margin-top: -5px;
      line-height: 30px;
      .info-traffic {
        display: inline-block;
      }
      .content {
        display: flex;
        line-height: 30px;
      }
      .traffic-item {
        display: inline-block;
        line-height: 30px;
      }
      .info {
        max-width: 360px;
      }
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
