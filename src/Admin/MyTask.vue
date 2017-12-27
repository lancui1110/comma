<template>
  <div class="admin my-task">
    <mt-navbar v-model="currentTab">
      <mt-tab-item id="0">进行中</mt-tab-item>
      <mt-tab-item id="1">已完成</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="pageInfo.end" :auto-fill="false" ref="loadmore">
      <mt-tab-container v-model="currentTab">
        <mt-tab-container-item id="0">
          <div>
            <task-item :task="item" v-for="item in tasks" :key="item.id"></task-item>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="1">
          <task-item :task="item" v-for="item in tasks" :key="item.id"></task-item>
          <div class="no-data" v-if="!tasks.length">暂无数据</div>
        </mt-tab-container-item>
      </mt-tab-container>
    </mt-loadmore>
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
      tasks: 'admin/taskList',
      pageInfo: 'admin/pageInfo'
    })
  },
  watch: {
    currentTab (newVal) {
      this.loadTop()
    }
  },
  activated () {
    this.loadTop()
  },
  methods: {
    loadTop () {
      this.$store.dispatch('admin/refreshTaskList', {
        params: { status: this.currentTab === '1' ? 1 : 0 },
        cb: this.$refs.loadmore.onTopLoaded
      })
    },
    loadBottom () {
      this.$store.dispatch('admin/loadMoreTaskList', {
        params: { status: this.currentTab === '1' ? 1 : 0 },
        cb: this.$refs.loadmore.onBottomLoaded
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
    min-height: 1000/@R;
  }
}
</style>

