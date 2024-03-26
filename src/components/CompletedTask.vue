<template>
  <div>
    <h2>Completed Tasks</h2>
    <!--Completed Tasks Table-->
    <table class="table">
      <thead>
        <tr>
          <th>Task Title</th>
          <th>Completed Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in completedTasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>{{ task.completedDate }}</td>
          <td>
            <button @click="viewTaskDetails(task)">View Details</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>Total Completed Tasks: {{ completedTasksCount }}</p>
</template>

<script>
export default {
  data() {
    return {
      completedTasks: []
    };
  },
  // creates completed tasks based from local storage
  created() {
    this.completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
  },
  computed: {
    completedTasksCount() {
      return this.completedTasks.length;
    }
  },
  methods: {
    // views task details based on the selected task
    viewTaskDetails(task) {
      this.$router.push({ name: 'task-details', params: { taskId: task.id } });
    }
  }
};
</script>
