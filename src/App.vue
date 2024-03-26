<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/task-list">Task List</router-link> |
      <router-link to="/completed-task">Completed Task</router-link>
    </nav>
    <router-view :tasks="tasks"/>
  </div>
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

</style>
