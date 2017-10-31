<template>
  <div class="menu-tabs">
    <ul class="menus">
      <li class="menu-ink-bar">
        <span class="menu-ink-bar-inner"></span>
      </li>
      <li class="menu-item" :id="'menu-item-' + key"
          :class="{ 'active': curTabIndex === key }"
          v-for="(item, key) in menus" :key="key"
          @click="clickTab(key, item)">
        <span class="menu-item-text">{{item.value}}</span>
      </li>
    </ul>
    <div v-if="isShowMore" class="menu-item-more" @click="showMoreMenus">
      <i class="icon icon-more"></i>
    </div>
    
    <ul v-if="isShowMoreMenus" class="menu-items">
      <li class="one-item"
          v-for="(item, key) in menus" :key="key"
          @click="clickTab(key)">
        {{item.value}}
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

// import { mapGetters } from 'vuex'

export default {
  name: 'MenuTabs',
  props: {
  },
  data () {
    return {
      curTabIndex: null,
      curId: null,
      isShowMoreMenus: false,
      menus: [
        { key: 0, value: '全部' },
        { key: 1, value: '饮品' },
        { key: 2, value: '卤味' },
        { key: 3, value: '饼干' },
        { key: 4, value: '膨化' },
        { key: 5, value: '饮料' }, 
        { key: 6, value: '干果' }, 
        { key: 7, value: '牛奶' }, 
        { key: 8, value: '巧克力' }
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.curTabIndex = 0
      }, 0)
    })
  },
  watch: {
    curTabIndex (val, old) {
      this.isShowMoreMenus = false

      const $ink = document.querySelector('.menu-ink-bar')
      const $inkInner = document.querySelector('.menu-ink-bar-inner')
      const $curMenuItem = document.getElementById(`menu-item-${val}`)
      const $curMenuItemText = $curMenuItem.querySelector('.menu-item-text')
      
      const left = $curMenuItem.offsetLeft
      const innerWidth = $curMenuItemText.clientWidth

      $ink.style.left = `${left}px`
      $inkInner.style.width = `${innerWidth}px`

      const addFwd = val > old ? 'menu-ink-foreward' : 'menu-ink-backward'
      const removeFwd = val < old ? 'menu-ink-foreward' : 'menu-ink-backward'
      $ink.classList.remove(removeFwd)
      $ink.classList.add(addFwd)

      $curMenuItem.scrollIntoView(true)
    }
  },
  computed: {
    curMenuItems () {
      return this.menus[this.curTabIndex]
    },
    isShowMore () {
      return this.menus.length > 5
    }
  },
  methods: {
    clickTab (index, item) {
      this.curTabIndex = index
      this.curId = item.key
    },
    showMoreMenus () {
      this.isShowMoreMenus = true
    }
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
        margin: auto;
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
