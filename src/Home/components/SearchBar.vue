<template>
  <div class="search-bar-panel">
    <div class="logo-user">
      <i class="icon icon-head-top-border" @click="showLeftMenu"></i>
      <span class="user-phone" v-if="user.mobile">用户中心</span>
      <span class="user-phone" v-else>未登录</span>
    </div>
    <div class="search-input">
      <i class="icon icon-search"></i>
      <input type="search" placeholder="搜索" v-model.trim="searchKeyword" @keyup.enter="doSearch(false, $event)" @blur="doSearch(true, $event)"/>
      <i v-show="searchKeyword" @click="clearSearch" class="icon icon-close" ></i>
    </div>
    <div class="qr-code" @click="scanQRCode"><i class="icon icon-qr-code"></i></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import weixin from 'weixin'
import { Toast } from 'mint-ui'

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
    doSearch (isBlur = false, e) {
      if (!isBlur) {
        e.target.blur()
      }
      this.$store.dispatch('home/refreshGoods')
    },
    scanQRCode () {
      const self = this
      weixin.weixinScanQRCode((res) => {
        self.$store.dispatch('home/findProductByQrCode', {
          code: res,
          cb: (res) => {
            if (res.code === 1) {
              self.$store.dispatch('home/addToCart', res.data)
            } else {
              Toast(res.msg)
            }
          }
        })
      })
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
      top: 54/@R;
      left: 0;
      width: 150/@R;
      display: inline-block;
      text-align: center;
      text-align: center;
      font-size: 20/@R;
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
      .icon-close {
        left: auto;
        right: 21/@R;
      }
      .icon-close {
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
    .qr-code {
      position: relative;
      line-height: 95/@R;
      margin-right: 20/@R;
    }
  }
  ::-webkit-search-cancel-button {
    display: none;
  }
</style>
