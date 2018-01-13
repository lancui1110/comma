<template>
  <div class="menu-tabs" :class="{'nav-pos-sticky': isSupportSticky4all, 'hide-user': isNeedFixed}" ref="leftMenu">
    <ul class="menus" :class="{'fix': fixTop}">
      <li class="menu-item"
        :id="'menu-item-' + key"
        :class="{ 'active': item === category.current }"
        v-for="(item, key) in category.list"
        :key="key"
        @click="clickTab(item)">
        <span class="menu-item-text">{{item}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { throttle } from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'MenuTabs',
  data () {
    return {
      topOffset: 0,
      fixTop: false,
      isNeedFixed: false,
      isSupportSticky4all: true
    }
  },
  computed: {
    ...mapGetters({
      category: 'home/getCategory'
    }),
    curMenuItem () {
      return this.category.current
    }
  },
  mounted () {
    this.getTopOffset() // 因为 header 的图片 load 慢，所以手机上 offsetTop 一开始一直是 0

    // 判断是否支持sticky
    this.isSupportSticky4all = this.isSupportSticky()

    window.onscroll = throttle((e) => {
      // 是否超出可视范围
      this.isNeedFixed = (window.pageYOffset >= this.topOffset)
      // 不支持Sticky的，手动fixed
      if (!this.isSupportSticky4all && this.isNeedFixed) {
        this.fixTop = true
      } else {
        this.fixTop = false
      }
    }, 100)
  },
  methods: {
    getTopOffset () {
      setTimeout(() => {
        if (this.$refs.leftMenu.offsetTop) {
          this.topOffset = this.$refs.leftMenu.offsetTop
        } else {
          this.getTopOffset()
        }
      }, 300)
    },
    // 判断是否支持sticky
    isSupportSticky () {
      const prefixTestList = ['', '-webkit-']
      let stickyText = ''
      for (let i = 0; i < prefixTestList.length; i++) {
        stickyText += 'position:' + prefixTestList[i] + 'sticky;'
      }
      // 创建一个dom来检查
      let div = document.createElement('div')
      div.style.cssText = stickyText
      document.body.appendChild(div)
      const isSupport = /sticky/i.test(window.getComputedStyle(div).position)
      document.body.removeChild(div)
      div = null
      return isSupport
    },
    clickTab (item) {
      this.$store.dispatch('home/changeCategoryType', item)
    },
    toggleMoreMenus () {
      this.isShowMoreMenus = !this.isShowMoreMenus
    }
  }
}
</script>

<style lang="less">
  @import "../../global/style/theme.less";
  @itemPadding: 30/@R;
  @menuWidth: 160/@R;
  @menuHeight: 100/@R;
  /* 菜单 */
  .menu-tabs {
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
    background-color: #F5F5F5;
    &.nav-pos-sticky {
      position: sticky;
      top: 110/@R;
      left: 0;
      align-self: flex-start;
      z-index: 500;
    }
    .menus {
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: scroll;
      &.fix {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 500;
      }
    }
    .menu-item, .one-item {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: @menuWidth;
      height: @menuHeight;
      white-space: nowrap;
      font-size: 30/@R;
      &.active {
        background-color: #fff;
        &:before {
          content: " ";
          position: absolute;
          top: 37/@R;
          left: 0;
          width: 8/@R;
          height: 26/@R;
          background-color: #000;
        }
      }
    }
    // .menu-item:nth-last-child(1) {
    //   padding: 0 1rem 0 0.3rem;
    // }
    .menu-item-text {
      display: inline-block;
    }

    .menu-items {
      border: 0;
      tr {

      }
      td {
        border: 0;
        height: @menuHeight;
        line-height: @menuHeight;
        font-size: 36/@R;
        white-space: nowrap;
        padding: 0 @itemPadding;
      }
    }
  }

</style>
