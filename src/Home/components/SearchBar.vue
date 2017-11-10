<template>
  <div class="search-bar-panel">
    <div class="logo-user">
      <i class="icon icon-head-top-border" @click="showLeftMenu"></i>
      <span class="user-phone" v-if="user">{{user.mobile}}</span>
    </div>
    <div class="search-input">
      <i class="icon icon-search"></i>
      <input type="text" placeholder="搜索" v-model.trim="searchKeyword" @keyup.enter="doSearch" />
      <i v-show="isShowClose" class="icon icon-close" @click="removeWord"></i>
    </div>
    <div class="qr-code"><i class="icon icon-qr-code"></i></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import weixin from 'weixin'

export default {
  name: 'SearchBar',
  data () {
    return {
      isShowClose: false
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
    searchKeyword (val) {
      this.isShowClose = !!val
    }
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
    removeWord () {
      this.searchKeyword = ''
    },
    scanQRCode () {
      weixin.weixinScanQRCode()
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
      .icon {
        position: absolute;
        left: 21/@R;
        top: (95-32)/2/@R;
      }
      .icon-close {
        left: auto;
        right: 21/@R;
      }
    }
    .qr-code {
      position: relative;
      line-height: 95/@R;
      margin-right: 20/@R; 
    }
  }

</style>
