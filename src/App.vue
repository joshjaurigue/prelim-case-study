<template>
  <div class="header">
    <h1>Task Manager</h1>
    <nav class="navigation">
      <router-link to="/" class="nav-home">Home</router-link>
      <router-link to="/task-list" class="nav-task">Task List</router-link> 
      <router-link to="/completed-task" class="nav-completed-task">Completed Task</router-link>
    </nav>
  </div>
  <router-view :tasks="tasks"/>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    };
  },
  methods: {

  }
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 10px;
  color: white;
}
.h1 {
  margin: 0;
}

.navigation {
  display: flex;
}
.nav-home,
.nav-task,
.nav-completed-task {
  color: white;
  border: none;
  padding: 5px 10px;
  text-decoration: none;
  margin-right: 10px;
}

.nav-task {
  background-color: green;
  border-radius: 10%;
}

.nav-completed-task {
  background-color: #007bff;
  border-radius: 10%;
}
</style>
