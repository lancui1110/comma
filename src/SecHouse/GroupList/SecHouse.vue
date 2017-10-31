<template>
  <div class="dashboard">
    <top-nav :user="user" :fixed="false"></top-nav>
    <div class="sec-house">
      <house-search></house-search>
      <div class="content">
        <house-filter></house-filter>
        <house-list ref="houseList"></house-list>
      </div>
    </div>
    <slide-panel width="660px"
      :show="showDetail"
      :close="closeDetailPanel"
      @mouseEnterDetail="mouseEnterDetail = true"
      @mouseLeaveDetail="mouseEnterDetail = false">
      <house-detail></house-detail>
    </slide-panel>

    <!-- 图片大图 -->
    <carousel v-show="carouselType > 0" :images="carouselImages" @onclickhandle="closeCarousel" :isShowCopyright="isShowCopyright">{{isShowCopyright}}</carousel>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import utils from '@/global/utils'
  import TopNav from '@/components/TopNav.vue'
  import HouseSearch from './HouseSearch.vue'
  import HouseFilter from './HouseFilter.vue'
  import HouseList from './HouseList.vue'
  import HouseDetail from './HouseDetail.vue'
  import SlidePanel from '@/components/SlidePanel.vue'
  import Carousel from '@/components/Carousel/LargeImg.vue'

  const scrollWidth0 = utils.getScrollbarWidth()

  // 用于显示详情页时，把列表页的滚动静止
  function ModalHelper (bodyCls) {
    let scrollTop
    return {
      afterOpen: function (isNotGetScrollTop) {
        const listDom = document.querySelector('#app')
        if (!isNotGetScrollTop) {
          scrollTop = document.scrollingElement.scrollTop
        }

        document.body.classList.add(bodyCls)
        document.body.style.top = `${-scrollTop}px`
        listDom.style.paddingRight = `${scrollWidth0}px`
        // console.log(`scrollTop==${scrollTop}`)
      },
      beforeClose: function (isNotSetScrollTop) {
        const listDom = document.querySelector('#app')
        document.body.classList.remove(bodyCls)
        if (!isNotSetScrollTop) {
          document.scrollingElement.scrollTop = scrollTop
        }
        listDom.style.paddingRight = '0px'
      }
    }
  }

  export default {
    components: {
      TopNav,
      HouseSearch,
      HouseFilter,
      HouseList,
      HouseDetail,
      SlidePanel,
      Carousel
    },
    data () {
      return {
        modalHelper: null,
        showDetail: false,
        mouseEnterDetail: null,
        isFirstShowDetail: true
      }
    },
    computed: {
      ...mapGetters({
        user: 'user/getUser',
        houseDetail: 'groupSecHouse/houseDetail',
        carouselType: 'groupSecHouse/carouselType', // 1:房源，2:小区
        carouselImages: 'groupSecHouse/carouselImages'
      }),
      isShowCopyright () {
        if (this.carouselType === 1) return true
        return false
      }
    },
    watch: {
      houseDetail (val) {
        if (val && val.houseId) {
          this.showDetail = true
        }
      },
      showDetail (val) {
        if (val) {
          this.isFirstShowDetail = true
          this.modalHelper.afterOpen()
          this.modalHelper.beforeClose(true) // 此时鼠标还在列表，应设置为可滚动
        } else {
          this.modalHelper.beforeClose(true)
          // this.isFirstShowDetail = true
        }
      },
      mouseEnterDetail (val) {
        if (val) {
          this.modalHelper.afterOpen(this.isFirstShowDetail)
        } else {
          this.modalHelper.beforeClose()
          this.isFirstShowDetail = false
        }
      }
    },
    created () {
      utils.removeReferer()

      this.modalHelper = ModalHelper('modal-open')
      this.modalHelper.beforeClose()
    },
    methods: {
      closeDetailPanel () {
        this.$store.commit('groupSecHouse/setHouseDetail', null)
        this.showDetail = false
      },
      closeCarousel () {
        this.$store.commit('groupSecHouse/setCarouselType', 0)
      }
    }
  }
</script>

<style lang="less">
  body.modal-open {
      position: fixed;
      width: 100%;
  }
  .sec-house {
    position: relative;
    height: 100%;
    box-sizing: border-box;

    .content {
      max-width: 1190px;
      margin: 0 auto;
    }
  }
</style>
