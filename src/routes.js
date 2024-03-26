// importing router
import { createRouter, createWebHistory } from 'vue-router';

// importing components
import TaskList from './components/TaskList.vue';
import TaskDetails from './components/TaskDetails.vue'; 
import HomePage from './components/HomePage.vue';
import CompletedTask from './components/CompletedTask.vue';

// route instances
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/task-list',
    name: 'TaskList',
    component: TaskList,
    props: true 
  },
  {
    path: '/completed-task',
    name: 'CompletedTask',
    component: CompletedTask,
    props: true 
  },
  {
    path: '/task-details/:taskId', 
    name: 'task-details', 
    component: TaskDetails, 
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
