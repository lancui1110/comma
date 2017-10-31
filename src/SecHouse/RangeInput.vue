<template>
  <div class="range-input">
    <el-input v-model="innerMin"
              @focus="showBtn"
              @click.native="showBtn"
              @keydown.native.enter="confirmClick"></el-input>
    -
    <el-input v-model="innerMax"
              @focus="showBtn"
              @click.native="showBtn"
              @keydown.native.enter="confirmClick"></el-input>
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
        innerMin: '',
        innerMax: '',
        showSaveBtn: false
      }
    },
    props: {
      unit: String,
      keyLabel: String,
      min: String,
      max: String
    },
    watch: {
      min (newVal) {
        this.innerMin = newVal
      },
      max (newVal) {
        this.innerMax = newVal
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
      confirmClick () {
        this.showSaveBtn = false

        // 负数的话得变成1
        if (/^-\d+$/.test(this.innerMin)) {
          this.innerMin = '1'
        }
        if (/^-\d+$/.test(this.innerMax)) {
          this.innerMax = '1'
        }
        this.innerMin = this.innerMin.trim().replace(/\D/g, '')
        this.innerMax = this.innerMax.trim().replace(/\D/g, '')

        // 售价1万-99999万，面积1-9999，楼层1-99，不允许输入特殊字符，都是参照爱屋的
        if (this.keyLabel === 'price') {
          this.innerMin = this.innerMin.length > 5 ? '99999' : this.innerMin
          this.innerMax = this.innerMax.length > 5 ? '99999' : this.innerMax
          this.$store.commit('secHouse/setFilterCommonValue', { key: 'startPrice', value: this.innerMin })
          this.$store.commit('secHouse/setFilterCommonValue', { key: 'endPrice', value: this.innerMax })
        } else if (this.keyLabel === 'spaceArea') {
          this.innerMin = this.innerMin.length > 4 ? '9999' : this.innerMin
          this.innerMax = this.innerMax.length > 4 ? '9999' : this.innerMax
          this.$store.commit('secHouse/setFilterCommonValue', { key: 'startSpaceArea', value: this.innerMin })
          this.$store.commit('secHouse/setFilterCommonValue', { key: 'endSpaceArea', value: this.innerMax })
        } else if (this.keyLabel === 'floor') {
          this.innerMin = this.innerMin.length > 2 ? '99' : this.innerMin
          this.innerMax = this.innerMax.length > 2 ? '99' : this.innerMax
          this.$store.commit('secHouse/setFilterCommonValue', { key: 'startFloor', value: this.innerMin })
          this.$store.commit('secHouse/setFilterCommonValue', { key: 'endFloor', value: this.innerMax })
        }

        this.$store.commit('secHouse/setFilterCommonValue', { key: 'offset', value: 0 })
        this.$store.dispatch('secHouse/getHouseList')
      }
    }
  }
</script>

<style lang="less">
  @import "../global/style/theme.less";

  .range-input {
    display: flex;
    align-items: center;

    .el-input {
      margin: 0 6px 0 4px;
      &:first-child {
        margin: 0 4px 0 0;
      }
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
