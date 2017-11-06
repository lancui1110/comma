<template>
  <div class="menu-tabs">
    <ul class="menus">
      <li class="menu-ink-bar">
        <span class="menu-ink-bar-inner"></span>
      </li>
      <li class="menu-item" :id="'menu-item-' + key"
          :class="{ 'active': item.id === category.current.id }"
          v-for="(item, key) in category.list" :key="key"
          @click="clickTab(item)">
        <span class="menu-item-text">{{item.name}}</span>
      </li>
    </ul>
    <div v-if="isShowMore" class="menu-item-more" @click="toggleMoreMenus">
      <i class="icon icon-more"></i>
    </div>

    <ul v-if="isShowMoreMenus" class="menu-items">
      <li class="one-item"
          v-for="(item, key) in category.list" :key="key"
          @click="clickTab(item)">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * 1.如果本来的分类 就是一行可以展示的话   这个图标可以隐藏起来 ；
 * 2.点击分类  直接筛选  ；
 * 3. 非一行可以展示，显示此图标 ；
 * 4.点击此图标，展开 其它行的分类
 * 5.选择了 第二行 或者 第三行的  分类   展示效果 如选择了 之后  ， 展开的 折叠回去
 */

import { findIndex } from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'MenuTabs',
  data () {
    return {
      isShowMoreMenus: false
    }
  },
  computed: {
    ...mapGetters({
      category: 'home/getCategory'
    }),
    curMenuItem () {
      return this.category.current
    },
    isShowMore () {
      return this.category.list.length > 5
    }
  },
  watch: {
    curMenuItem (val, old) {
      this.isShowMoreMenus = false

      const valIndex = val ? findIndex(this.category.list, { id: val.id }) : -1
      const oldIndex = old ? findIndex(this.category.list, { id: old.id }) : -1

      const $ink = document.querySelector('.menu-ink-bar')
      const $inkInner = document.querySelector('.menu-ink-bar-inner')
      const $curMenuItem = document.getElementById(`menu-item-${valIndex}`)
      if ($curMenuItem) {
        const $curMenuItemText = $curMenuItem.querySelector('.menu-item-text')

        const left = $curMenuItem.offsetLeft
        const innerWidth = $curMenuItemText.clientWidth

        $ink.style.left = `${left}px`
        $inkInner.style.width = `${innerWidth}px`

        const addFwd = valIndex > oldIndex ? 'menu-ink-foreward' : 'menu-ink-backward'
        const removeFwd = valIndex < oldIndex ? 'menu-ink-foreward' : 'menu-ink-backward'
        $ink.classList.remove(removeFwd)
        $ink.classList.add(addFwd)

        if (val && old) {
          $curMenuItem.scrollIntoView(false)
        }
      }
    }
  },
  // mounted () {
  //   this.$nextTick(() => {
  //     setTimeout(() => {
  //       this.loadMenus()
  //     }, 0)
  //   })
  // },
  methods: {
    resetActiveBar () {

    },
    clickTab (item) {
      this.$store.dispatch('home/changeCategoryType', item)
    },
    toggleMoreMenus () {
      this.isShowMoreMenus = !this.isShowMoreMenus
    }
    // this method not been used now, maybe use for someday
    // loadMenus () {
    //   this.$store.dispatch('home/getCategory')
    // }
  }

}
</script>

<style lang="less">
  @import "../../global/style/theme.less";
  @itemPadding: 30/@R;
  @menuHeight: 80/@R;
  /* 菜单 */
  .menu-tabs {
    position: relative;
    background: #F6EDE1;
    .menus {
      position: relative;
      display: flex;
      overflow: scroll;
    }
    .menu-item {
      height: @menuHeight;
      line-height: @menuHeight;
      font-size: 36/@R;
      display: inline-block;
      white-space: nowrap;
      padding: 0 @itemPadding;
    }
    // .menu-item:last-child {
    //   margin-right: 0;
    // }
    .menu-item-text {
      display: inline-block;
    }
    .menu-ink-bar {
      position: absolute;
      display: block;
      left: 0%;
      right: 90%;
      bottom: 0;
      height: 2px;
      text-align: center;
      .menu-ink-bar-inner {
        display: block;
        background-color: #333;
        width: 100%;
        height: 100%;
        margin: 0 @itemPadding;
      }
      &.menu-ink-foreward {
        transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s;
      }
      &.menu-ink-backward {
        transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, left 0.3s cubic-bezier(0.35, 0, 0.25, 1);
      }
    }

    .menu-item-more {
      position: absolute;
      right: 0;
      top: 0;
      height: @menuHeight;
      line-height: @menuHeight;
      background: #F6EDE1;
      text-align: center;
      padding: 0 21/@R 0 10/@R;
    }
    .icon-more {

    }

    .menu-items {
      display: flex;
      flex-wrap: nowrap;
      border-top: 1px solid #fff;
      display: flex;
      flex-wrap: wrap;
      .one-item {
        display: inline-block;
        font-size: 36/@R;
        padding: 15/@R 30/@R;
        white-space: nowrap;
      }
    }
  }

</style>
