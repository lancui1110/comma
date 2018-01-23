<template>
  <newuser-redbag v-if="popup.frontStyle === 0" @noScroll="noScroll"/>
  <div v-else class="popup" v-show="show">
    <div class="mask"></div>
    <div class="modal"
      :class="`type_${popup.frontStyle}`"
      :style="{ 'background-image': `url(${popup.pic})` }">
      <div class="btn" v-if="!!popup.buttonName">
        <span
          :style="{
            'color': popup.buttonFontColor,
            'background-color': popup.buttonBackColor
          }"
          @click="btnClick">
          {{popup.buttonName}}
        </span>
      </div>
      <div class="close-wrapper">
        <div class="close-btn" @click="hide">
          <i class="icon icon-cross-white"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import NewuserRedbag from './NewUserRedBag'

  export default {
    name: 'Popup',
    components: {
      NewuserRedbag
    },
    props: {
      show: {
        type: Boolean,
        twoWay: true,
        default: false
      }
    },
    computed: {
      ...mapGetters({
        popup: 'home/popup'
      })
    },
    methods: {
      btnClick () {
        window.location.href = this.popup.url
      },
      hide () {
        this.$emit('hidePopup')
      }
    }
  }
</script>

<style lang="less">
  @import "../../global/style/theme.less";

  .popup {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .5);
    }
    .modal {
      position: relative;
      border-radius: 16/@R;
      background-color: transparent;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .btn {
      position: absolute;
      left: 0;
      bottom: 50/@R;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        display: block;
        width: 450/@R;
        height: 97/@R;
        line-height: 97/@R;
        text-align: center;
        border-radius: 49/@R;
        background-color: @primary;
        font-size: 36/@R;
        color: #fff;
      }
    }
    .close-wrapper {
      position: absolute;
      bottom: -140/@R;
      left: 0;
      width: 100%;
    }
    .close-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70/@R;
      height: 70/@R;
      margin: 0 auto;
      border-radius: 50/@R;
      border: 2/@R solid #fff;
    }

    .type_1 {
      width: 650/@R;
      height: 660/@R;
    }
    .type_2 {
      width: 550/@R;
      height: 660/@R;
      .close-btn {
        position: relative;
        &:after {
          content: " ";
          position: absolute;
          top: -70/@R;
          right: 33/@R;
          display: block;
          width: 2/@R;
          height: 70/@R;
          background-color: #fff;
        }
      }
    }
    .type_3 {
      width: 650/@R;
      height: 450/@R;
      .btn {
        bottom: -147/@R;
      }
      .close-wrapper {
        bottom: auto;
        top: -140/@R;
        text-align: right;
      }
      .close-btn {
        position: relative;
        float: right;
        margin-right: 40/@R;
        &:after {
          content: " ";
          position: absolute;
          bottom: -70/@R;
          right: 33/@R;
          display: block;
          width: 2/@R;
          height: 70/@R;
          background-color: #fff;
        }
      }
    }
  }
</style>

