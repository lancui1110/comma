<template>
  <span class="back-to-top" title="回到顶部" v-show="show" @click="backTop">
    <i class="iconfont icon-arrow-up"></i>
  </span>
</template>

<script>
  export default {
    name: 'BackToTop',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      speed: {
        type: Number,
        default: 0.1
      }
    },
    methods: {
      backTop () {
        const scrollElement = document.scrollingElement || document.body  // 有坑，所以这么写 http://stackoverflow.com/questions/28633221/document-body-scrolltop-firefox-returns-0-only-js
        let top = scrollElement.scrollTop
        const timer = setInterval(() => {
          top -= Math.abs(top * this.speed)
          if (top <= 1) {
            top = 0
            clearInterval(timer)
          }
          scrollElement.scrollTop = top
        }, 20)
        this.$emit('update:show', false)
        return false
      }
    }
  }
</script>

<style lang="less">
  .back-to-top {
    position: fixed;
    right: 20px;
    bottom: 10px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    text-align: center;
    background-color: rgba(0, 0, 0, .4);
    color: #fff;
  }
</style>
