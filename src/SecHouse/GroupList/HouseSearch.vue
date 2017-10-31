<template>
  <div class="house-search">
    <div class="inner">
      <input class="search-input"
             placeholder="请输入小区名称"
             :value="filter.search.keyword"
             @input="changeSearchKeyword"
             @focus="changeSearchKeyword"
             @click="$event.stopPropagation()"
             @keyup="searchInputKeyUpEvent">
      <div class="search-btn" @click="searchOK">
        <i class="el-icon-search"></i>
      </div>
      <ul class="tips">
        <li :class="{ 'tip': true, 'active': tmpSelectedTip && tmpSelectedTip.estateId === item.estateId }"
            v-for="item in tips"
            @click="tipClick(item)">
          <i class="iconfont icon-history" v-if="!filter.search.keyword"></i>
          <i class="iconfont icon-area" v-else></i>
          <span class="tip-text">{{item.tipContent || item.estateName}}</span>
          <span class="tip-side">{{item.tipSide}}</span>
          <span class="f-r tip-num" v-show="item.tipContent">{{item.sellHouseNum}}套</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    components: {},
    data () {
      return {
        tmpSelectedTipIndex: -1,
        tmpSelectedTip: null
      }
    },
    props: {},
    computed: {
      ...mapGetters({
        filter: 'groupSecHouse/filter'
      }),
      searchKeyword () {
        return this.filter.search.keyword
      },
      tips () {
        return this.filter.search.tips
      }
    },
    watch: {
      searchKeyword (newVal) {
        const oldKeyword = this.filter.search.selectedTip.tipContent || this.filter.search.selectedTip.estateName
        if (newVal !== oldKeyword) {
          // 清空 selectedTip
          this.$store.commit('groupSecHouse/setFilterSearch', { key: 'selectedTip', value: {} })
          this.tmpSelectedTipIndex = -1
          this.tmpSelectedTip = null
        }
      },
      tips (newVal) {
        if (newVal.length === 1 && newVal[0].tipContent === this.searchKeyword) {
          this.tmpSelectedTip = newVal[0]
        } else {
          this.tmpSelectedTip = null
        }
      }
    },
    created () {
      document.body.addEventListener('click', this.hideTips)
    },
    methods: {
      searchInputKeyUpEvent (e) {
        const { tips } = this.filter.search
        if (e.keyCode === 13) {
          // enter
          if (this.tmpSelectedTip) {
            this.tipClick(this.tmpSelectedTip)
          } else {
            this.searchOK()
          }
          e.target.blur()
        } else if (e.keyCode === 38) {
          // arrow up
          this.tmpSelectedTipIndex -= 1
          if (this.tmpSelectedTipIndex < 0) {
            this.tmpSelectedTipIndex = tips.length - 1
          }
          this.tmpSelectedTip = tips[this.tmpSelectedTipIndex]
        } else if (e.keyCode === 40) {
          // arrow down
          this.tmpSelectedTipIndex += 1
          if (this.tmpSelectedTipIndex >= tips.length) {
            this.tmpSelectedTipIndex = 0
          }
          this.tmpSelectedTip = tips[this.tmpSelectedTipIndex]
        }
      },
      changeSearchKeyword (e) {
        this.$store.commit('groupSecHouse/setFilterSearch', { key: 'keyword', value: e.target.value })
        this.$store.dispatch('groupSecHouse/searchEstate', e.target.value.trim())
      },
      hideTips () {
        this.$store.commit('groupSecHouse/setFilterSearch', { key: 'tips', value: [] })
      },
      tipClick (item) {
        this.$store.commit('groupSecHouse/setFilterSearch', { key: 'selectedTip', value: item })
        this.$store.commit('groupSecHouse/setFilterSearch', { key: 'keyword', value: item.tipContent || item.estateName })
        this.hideTips()

        // 如果选中了搜索框的tip，清空区域和板块，这两个互斥
        this.$store.commit('groupSecHouse/setFilterLocationValue', '')
        this.$store.commit('groupSecHouse/setFilterLocationSubValue', '')
        this.$store.commit('groupSecHouse/setFilterLocationSubArea', null)

        this.$parent.$refs.houseList.$emit('refresh')
      },
      searchOK () {
        if (this.tmpSelectedTip) {
          this.tipClick(this.tmpSelectedTip)
        } else {
          this.hideTips()
          this.$parent.$refs.houseList.$emit('refresh')
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../../global/style/theme.less";

  .house-search {
    background-color: @section-bgc;

    .inner {
      position: relative;
      max-width: 1190px;
      margin: 0 auto;
      padding: 20px 0;
    }
    .search-input {
      width: 480px;
      height: 40px;
      padding: 10px 50px 10px 16px;
      box-sizing: border-box;
      border: @common-border;
      &:focus {
        outline: none;
        border-color: @active-color;
      }
    }
    .search-btn {
      position: absolute;
      top: 20px;
      left: 440px;
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 1.4em;
      background-color: @active-color;
      color: #fff;
      cursor: pointer;
    }
    .tips {
      position: absolute;
      top: 60px;
      left: 0;
      width: 440px;
      border-color: #dedede;
      box-shadow: 0 4px 4px rgba(0, 0, 0, .2);
      background-color: #fff;
      z-index: 500;
    }
    .tip {
      display: flex;
      height: 32px;
      line-height: 32px;
      display: block;
      padding: 0 6px;
      cursor: pointer;

      &:hover,
      &.active {
        background-color: #f5f5f5;
      }

      i {
        margin-right: 6px;
        font-size: 14px;
        color: #747e89;
      }
      .tip-side {
        color: @light-text-color;
      }
      .tip-num {
        color: #bdbdbd;
      }
    }
  }
</style>
