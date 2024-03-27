<template>
  <div class="task-details">
    <div v-if="task" class="task-details-container">
      <h5>Task Title: {{ task.title }}</h5>
      <p>Details:  {{ task.details }}</p>
      <p>Completed: {{ task.completed ? 'Yes' : 'No' }}</p>
      
      <!-- checks if task is completed or not -->
      <p v-if="task.completed">Completed Date: {{ task.completedDate }}</p>
      <router-link :to="backLink" class="back-link">{{ backText }}</router-link>
    </div>
    <div v-else>
      <p>Task not found.</p>
      <router-link to="/task-list" class="back-link">Back to Task List</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    taskId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      task: null
    };
  },
  // fetches the task details based from the task id or selected task
  created() {
    this.fetchTaskDetails(parseInt(this.taskId));
  },
  computed: {
    // changes router depending on the completion status of the tasks
    backLink() {
      return this.task.completed ? "/completed-task" : "/task-list";
    },
    backText() {
      return this.task.completed ? "Back to Completed Tasks" : "Back to Task List";
    }
  },
  methods: {
    // fetches tasks from local storage
    fetchTaskDetails() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const taskId = parseInt(this.$route.params.taskId); 
      this.task = tasks.find(task => task.id === taskId);
    }
  }
};
</script>

<style scoped>
.task-details {
  margin: 20px;
}
.task-details-container {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.back-link {
  display: inline-block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
}
</style>
