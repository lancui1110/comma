<template>
  <div class="admin">
    <admin-header></admin-header>
    <div class="task-list">
      <task-item :task="item" v-for="item in tasks" :key="item.taskId"></task-item>
    </div>
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
      tasks: 'admin/taskList'
    })
  },
  activated () {
    this.$store.dispatch('admin/getTaskList', {})
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

