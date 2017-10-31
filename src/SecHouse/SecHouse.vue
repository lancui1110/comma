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
    <slide-panel width="660px" :show="showDetail" :close="closeDetailPanel">
      <house-detail></house-detail>
    </slide-panel>
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

  export default {
    components: {
      TopNav,
      HouseSearch,
      HouseFilter,
      HouseList,
      HouseDetail,
      SlidePanel
    },
    data () {
      return {
        showDetail: false
      }
    },
    computed: {
      ...mapGetters({
        user: 'user/getUser',
        houseDetail: 'secHouse/houseDetail'
      })
    },
    watch: {
      houseDetail (val) {
        if (val && val.houseId) {
          this.showDetail = true
        }
      }
    },
    created () {
      utils.removeReferer()
    },
    methods: {
      closeDetailPanel () {
        this.$store.commit('secHouse/setHouseDetail', null)
        this.showDetail = false
      }
    }
  }
</script>

<style lang="less">
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
