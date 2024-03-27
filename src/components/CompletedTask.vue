<template>
  <div class="completed-tasks">
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
            <button class="btn-details" @click="viewTaskDetails(task)">View Details</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p>Total Completed Tasks: {{ completedTasksCount }}</p>
  </div>
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

<style>
.completed-tasks {
  margin: 20px;
}
.table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin-top:3%
}
.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
}
.btn-details {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.btn-details:hover {
  background-color: #0056b3;
}
</style>
