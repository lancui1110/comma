<template>
  <transition name="slide-fade">
    <div class="slide-panel"
         v-show="show"
         :style="`width: ${width || '50%'}; height: ${panelHeight}; margin-right:${scrollWidth}px;`"
         @click="$event.stopPropagation()"
         @mouseenter="mouseEnter"
         @mouseleave="mouseLeave">
      <div class="slide-panel-inner" :style="`width: ${innerWidth || '50%'};`">
        <i class="el-icon-close close-btn" @click="closePanel"></i>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  import utils from '@/global/utils'
  const scrollWidth0 = utils.getScrollbarWidth()

  export default {
    name: 'SlidePanel',
    data () {
      return {
        scrollWidth: 0,
        panelHeight: '100%'
        // innerWidth: ''
      }
    },
    props: {
      width: String,
      show: Boolean,
      close: {
        type: Function,
        required: true
      }
    },
    watch: {
      show (newVal) {
        if (newVal) {
          // this.panelHeight = document.body.clientHeight + 'px'
        }
      }
    },
    computed: {
      innerWidth () {
        return `${parseInt(this.width.replace('px', '')) + 20}px`
      }
    },
    created () {
      document.body.addEventListener('click', this.closePanel)
    },
    methods: {
      closePanel () {
        this.close && this.close()
      },
      mouseEnter () {
        this.$emit('mouseEnterDetail')
        this.scrollWidth = scrollWidth0
      },
      mouseLeave () {
        this.$emit('mouseLeaveDetail')
        this.scrollWidth = 0
      }
    }
  }
</script>

<style lang="less">
  @keyframes slideIn {
    from {
      transform: translate3d(100%, 0, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    to {
      transform: translate3d(100%, 0, 0);
      opacity: 0;
    }
  }

  .slide-fade-enter-active {
    animation: slideIn .3s ease-in;
  }

  .slide-fade-leave-active {
    animation: slideOut .3s ease-out;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    z-index: 1;
  }

  .slide-panel {
    position: fixed;
    top: 0;
    right: 0;
    overflow: auto;
    background: #fff;
    box-shadow: -6px 0 16px 0 rgba(74, 74, 74, .16);
    z-index: 200;
    overflow: hidden;
  }
  .slide-panel::-webkit-scrollbar {
    display:none;
  }

  .slide-panel-inner {
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
    width: 100%;

    &.modal-open {
      position: fixed;
      overflow-y: hidden;
      width: 100%;
    }
  }

  .close-btn {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 18px;
    background-color: #F7F7F7;
    color: #BDBDBD;
    cursor: pointer;
    z-index: 300;
  }
</style>
