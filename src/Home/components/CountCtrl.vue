<template>
  <div class="count-ctrl">
    <i class="icon icon-minus" v-show="num > 0" @click="onMinus"></i>
    <span class="num" v-show="num > 0">{{num}}</span>
    <i class="icon icon-plus-black" @click="onAdd"></i>
  </div>
</template>

<script>
export default {
  name: 'CountCtrl',
  props: {
    num: {
      type: Number,
      default: 0
    },
    onAdd: {
      type: Function,
      default: () => {}
    },
    onMinus: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="less">
@import "../../global/style/theme.less";

.count-ctrl {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  min-width: 100/@R;
  .num {
    width: 70/@R;
    line-height: 41/@R;
    text-align: center;
    font-size: 34/@R;
    font-family: "Helvetica";
  }
}
</style>

