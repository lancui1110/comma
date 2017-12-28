<template>
  <div class="admin">
    <admin-header @scan="scan"></admin-header>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="pageInfo.end" :auto-fill="false" ref="loadmore">
      <div class="task-list">
        <task-item :task="item" v-for="item in tasks" :key="item.taskId"></task-item>
        <div class="no-data" v-if="!tasks.length">暂无任务</div>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AdminHeader from './components/AdminHeader'
import TaskItem from './components/TaskItem'

export default {
  name: 'Admin',
  components: {
    AdminHeader,
    TaskItem
  },
  computed: {
    ...mapGetters({
      tasks: 'admin/taskList',
      pageInfo: 'admin/pageInfo'
    })
  },
  activated () {
    this.loadTop()
  },
  methods: {
    loadTop () {
      this.$store.dispatch('admin/refreshTaskList', {
        cb: this.$refs.loadmore.onTopLoaded
      })
    },
    loadBottom () {
      this.$store.dispatch('admin/loadMoreTaskList', this.$refs.loadmore.onBottomLoaded)
    },
    scan (shelfCode) {
      this.$store.dispatch('admin/refreshTaskList', {
        params: {
          shelfCode
        },
        cb: this.$refs.loadmore.onTopLoaded
      })
    }
  }
}
</script>

<style lang="less">
@import "./style.less";

.admin {
  .task-list {
    padding: 30/@R;
  }
}
</style>

