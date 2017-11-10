<template>
  <div class="search-bar-panel">
    <div class="logo-user">
      <i class="icon icon-head-top-border" @click="showLeftMenu"></i>
      <span class="user-phone" v-if="user">{{user.mobile}}</span>
    </div>
    <div class="search-input">
      <i class="icon icon-search"></i>
      <input type="text" placeholder="搜索" v-model.trim="searchKeyword" @keyup.enter="doSearch" />
      <i class="clear-serach" v-show="searchKeyword" @click="clearSearch"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SearchBar',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      search: 'home/getSearch'
    }),
    searchKeyword: {
      get () {
        return this.search
      },
      set (value) {
        this.$store.dispatch('home/changeSearchKeyword', value)
      }
    }
  },
  watch: {
  },
  mounted () {

  },
  methods: {
    showLeftMenu () {
      this.$emit('toggleShowLeft')
    },
    doSearch (e) {
      e.target.blur()
      this.$store.dispatch('home/refreshGoods')
    },
    clearSearch (e) {
      this.$store.dispatch('home/changeSearchKeyword', '')
      this.$store.dispatch('home/refreshGoods')
    }
  }
}
</script>

<style lang="less">
  @import "../../global/style/theme.less";

  /* 查询 */
  .search-bar-panel {
    display: flex;
    height: 95/@R;
    .logo-user {
      position: relative;
      width: 166/@R;
      .icon {
        position: absolute;
        top: -40/@R;
        left: 28/@R;
      }
    }
    .user-phone {
      position: absolute;
      top: 63/@R;
      left: 20/@R;
      text-align: center;
      font-size: 18/@R;
      color: #999;
    }
    .search-input {
      position: relative;
      flex: 1;
      line-height: 95/@R;
      margin-right: 20/@R;
      input {
        width: 100%;
        border: 1px solid #979797;
        border-radius: 4px;
        height: 58/@R;
        padding: 0 66/@R;
      }
      .icon-search {
        position: absolute;
        left: 21/@R;
        top: (95-32)/2/@R;
      }
      .clear-serach {
        position: absolute;
        right: 11/@R;
        top: (95-36)/2/@R;
        width: 36/@R;
        height: 36/@R;
        border-radius: 50%;
        background-color: #d9d9d9;
        &:before, &:after{
          display: block;
          content: "";
          width: 22/@R;
          height: 2px;
          background-color: white;
        }
        &:before{
          margin-top: 17/@R;
          margin-left: 8/@R;
          transform: rotate(45deg);
        }
        &:after{
          transform: translateY(-3/@R) translateX(8/@R) rotate(-45deg);
        }
      }
    }
  }

</style>
