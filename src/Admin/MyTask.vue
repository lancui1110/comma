<template>
  <div class="admin my-task">
    <mt-navbar v-model="currentTab">
      <mt-tab-item id="0">进行中</mt-tab-item>
      <mt-tab-item id="1">已完成</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="currentTab">
      <mt-tab-container-item id="0">
        <div>
          <task-item :task="item" v-for="item in tasks" :key="item.id"></task-item>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        <task-item :task="item" v-for="item in tasks" :key="item.id"></task-item>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui'
import TaskItem from './components/TaskItem'

Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)

export default {
  name: 'MyTask',
  components: {
    TaskItem
  },
  data () {
    return {
      currentTab: '0' // 0:progress, 1:finished
    }
  },
  computed: {
    ...mapGetters({
      tasks: 'admin/taskList'
    })
  },
  watch: {
    currentTab (newVal) {
      if (newVal === '1') {
        this.getList(1)
      } else {
        this.getList(0)
      }
    }
  },
  activated () {
    this.getList(0)
  },
  methods: {
    getList (status) {
      this.$store.dispatch('admin/getTaskList', {
        params: { status }
      })
    }
  }
}
</script>

<style lang="less">
@import "./style.less";

.my-task {
  .mint-tab-container {
    padding: 30/@R;
  }
}
</style>

