<template>
  <div class="one-input">
    <el-input v-model="inputModel"
              @focus="showBtn"
              @click.native="showBtn"
              @keydown.native.enter="confirmClick()"
    ></el-input>
    {{unit}}
    <el-button size="small" v-show="showSaveBtn" @click="confirmClick">确定</el-button>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Input,
    Button
  } from 'element-ui'

  Vue.component(Input.name, Input)
  Vue.component(Button.name, Button)

  export default {
    components: {},
    data () {
      return {
        inputModel: '',
        showSaveBtn: false
      }
    },
    props: {
      unit: String,
      keyLabel: String,
      inputVal: String
    },
    watch: {
      inputVal (val) {
        this.inputModel = val
      }
    },
    created () {
      document.body.addEventListener('click', this.hideBtn)
    },
    methods: {
      showBtn (e) {
        e.stopPropagation()
        this.showSaveBtn = true
      },
      hideBtn () {
        this.showSaveBtn = false
      },
      confirmClick (isBlur) {
        this.showSaveBtn = false

        const self = this
        const type = this.keyLabel
        // 如果点中了重置按钮，则不触发
        if (isBlur && this.isClickRemoveAll) {
          self.inputModel = ''
          return
        }

        // 格式化数字
        let val = self.inputModel
        if (/^-\d+$/.test(val)) val = '1' // 负数的话得变成1
        val = val.trim().replace(/[\D,0]/g, '') // 去掉字符和0
        val = val.length > 2 ? '99' : val // 最大值99
        self.inputModel = val

        self.$store.commit('groupSecHouse/setFilterCommonValue', { key: type, value: val })
        self.$store.commit('groupSecHouse/setFilterCommonValue', { key: 'offset', value: 0 })
        self.$store.dispatch('groupSecHouse/getHouseList')
      }
    }
  }
</script>

<style lang="less">
  @import "../../global/style/theme.less";

  .one-input{
    width: 101px;
    display: flex;
    align-items: center;
    .el-input {
      margin: 0 6px 0 0;
      width: auto;
    }
    .el-input__inner {
      width: 48px;
      height: 28px;
      padding: 0;
      text-align: center;
      border-radius: 2px;
      &:focus {
        border-color: @active-color;
      }
    }
    .el-button {
      margin-left: 10px;
      border-radius: 2px;
      &:hover,
      &:active,
      &:focus {
        color: @active-color;
        border-color: @active-color;
      }
    }
  }
</style>
