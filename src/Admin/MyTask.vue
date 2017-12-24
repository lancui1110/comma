<template>
  <div class="admin my-task">
    <mt-navbar v-model="currentTab">
      <mt-tab-item id="progress">进行中</mt-tab-item>
      <mt-tab-item id="finished">已完成</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="currentTab">
      <mt-tab-container-item id="progress">
        <div>
          <task-item :task="item" v-for="item in tasks" :key="item.id"></task-item>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="finished">
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
      currentTab: 'progress' // progress finished
    }
  },
  computed: {
    ...mapGetters({
      tasks: 'admin/taskList'
    })
  }
}
</script>

<style lang="less">
@import "./style.less";

.my-task {
  .mint-tab-container {
    padding-top: 30/@R;
  }
}
</style>

