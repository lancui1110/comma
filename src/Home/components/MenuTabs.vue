<template>
  <div class="menu-tabs">
    <ul class="menus">
      <li class="menu-item" :id="'menu-item-' + item.id"
          :class="{ 'active': item.id === category.current.id }"
          v-for="(item, key) in category.list" :key="key"
          @click="clickTab(item)">
        <span class="menu-item-text">{{item.name}}</span>
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

import { mapGetters } from 'vuex'

export default {
  name: 'MenuTabs',
  computed: {
    ...mapGetters({
      category: 'home/getCategory'
    }),
    curMenuItem () {
      return this.category.current
    }
  },
  methods: {
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
    .menus {
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: scroll;
    }
    .menu-item, .one-item {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: @menuWidth;
      height: @menuHeight;
      white-space: nowrap;
      font-size: 36/@R;
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
