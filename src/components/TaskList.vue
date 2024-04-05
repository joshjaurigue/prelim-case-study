<template>
  <div class="task-container">
   <!-- Conditional rendering of table based on tasks existence -->
   <table v-if="displayedTasks.length > 0" class="table">
     <thead>
       <tr>
         <th></th>
         <th>Task No</th>
         <th>Task Title</th>
         <th>Actions</th>
       </tr>
     </thead>
     <tbody>
       <!-- Iterate through tasks -->
       <tr v-for="(task, index) in displayedTasks" :key="task.id">
         <td><input type="checkbox" v-model="task.completed" @click="toggleTaskCompletion(task)"></td>
         <td>{{ task.id }}</td>
         <td>{{ task.title }}</td>
         <td>
           <router-link :to="{ name: 'task-details', params: { taskId: task.id }}" class="button-link">View Details</router-link>
           <button class="action-button edit" @click="toggleEditTaskForm(index)">Edit</button>
           <button class="action-button delete" @click="deleteTask(index)">Delete</button>
           <button v-if="!task.prioritized" class="action-button prioritize" @click="togglePrioritize(task.id)">Prioritize</button>
           <button v-else class="action-button deprioritize" @click="togglePrioritize(task.id)">Deprioritize</button>
         </td>
       </tr>
     </tbody>
   </table>

   <!-- Message displayed when there are no tasks -->
   <div v-else>
     <table class="table">
     <thead>
       <tr>
         <th>Task No</th>
         <th>Task Title</th>
         <th>Actions</th>
       </tr>
     </thead>
     <tbody>
       <p class="fw-bold text-center">No task yet.</p> 
     </tbody>
   </table>
   </div>
   <!--Counting of tasks -->
   <p>Total Pending Tasks: {{ totalTasks }}</p>
   <p>Prioritized Tasks: {{ prioritizedTasks }}</p>
   <!-- Button to toggle Add Task form -->
   <button class="add-task-button" @click="toggleAddTaskForm">Add Task</button>

    <!-- Add Task form -->
    <div class="container" v-if="showAddTaskForm">
      <h3>Add Task</h3>
      <form @submit.prevent="addTask" class="add-task-form">
        <div class="form-group">
          <label for="taskTitle">Task Title:</label>
          <input type="text" id="taskTitle" v-model="newTask.title" placeholder="Enter task title here" class="form-control">
        </div>
        <div class="form-group">
          <label for="taskDetails">Task Details:</label>
          <textarea id="taskDetails" rows="4" v-model="newTask.details" placeholder="Enter task details here" class="form-control"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>

    <!-- Edit Task form -->
    <div v-if="showEditTaskForm" class="container">
      <h3>Edit Task</h3>
      <form @submit.prevent="updateTask" class="edit-task-form">
        <div class="form-group">
          <label for="editTaskTitle">Task Title:</label>
          <input type="text" id="editTaskTitle" v-model="editedTask.title" class="form-control">
        </div>
        <div class="form-group">
          <label for="editTaskDetails">Task Details:</label>
          <textarea id="editTaskDetails" rows="5" v-model="editedTask.details" class="form-control"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
 data() {
   return {
     // data needed for adding tasks
     tasks: JSON.parse(localStorage.getItem('tasks')) || [],
     taskIdCounter: JSON.parse(localStorage.getItem('taskIdCounter')) || 1,
     newTask: { title: '', details: '' },
     editedTask: { title: '', details: '' },
     showAddTaskForm: false,
     showEditTaskForm: false
   };
 },
 computed: {
   // displaying pending tasks
   displayedTasks() {
     const incompleteTasks = this.tasks.filter(task => !task.completed);
     return incompleteTasks.length > 0 ? incompleteTasks : [];
   },
    // counting pending tasks
   totalTasks() {
     const incompleteTasks = this.tasks.filter(task => !task.completed);
     return incompleteTasks.length;
   },
   // counting prioritized tasks
   prioritizedTasks() {
     return this.tasks.filter(task => task.prioritized && !task.completed).length;
   }
 },
 methods: {
   addTask() {
     // check if both title and details inputs are not empty
     if (!this.newTask.title.trim() || !this.newTask.details.trim()) {
       alert('Please enter both title and details for the task.');
       return; 
     }
      // check for duplicate tasks
     const duplicateTask = this.tasks.find(task => {
       return task.title.trim() === this.newTask.title.trim() && task.details.trim() === this.newTask.details.trim();
     });

      // checks if duplicate tasks exist
     if (duplicateTask) {
      
       alert('This task already exists.');
       return; 
     }

     // if no duplicate tasks
     this.newTask.id = this.taskIdCounter++;
     this.tasks.push({ ...this.newTask, completed: false });
     this.newTask = { title: '', details: '' };
     this.saveTasksToLocalStorage();
     this.showAddTaskForm = false;
     this.showEditTaskForm = false;
     alert("Task added successfully!");
     
   },
   editTask(index) {
    this.editedTask = { ...this.tasks[index] }; 
    this.showEditTaskForm = true;
  },
   updateTask() {
     // checks if both title and details inputs are not empty
     if (!this.editedTask.title.trim() || !this.editedTask.details.trim()) {
       alert('Please enter both title and details for the task.');
       return; 
     }

     // checks if inputs are not empty, task will be updated
     const index = this.tasks.findIndex(task => task.id === this.editedTask.id);
     this.tasks[index] = { ...this.editedTask };
     this.editedTask = { title: '', details: '' };
     this.showEditTaskForm = false;
     this.showAddTaskForm = false;
     this.saveTasksToLocalStorage();
     alert("Task edited successfully.");
   },
   deleteTask(index) {
     // displays confirmation dialog
     const confirmDelete = window.confirm('Are you sure you want to delete this task?');

     // checks if the user confirmed the deletion
     if (confirmDelete) {
       // if confirmed, delete the task
       this.tasks.splice(index, 1);
       this.saveTasksToLocalStorage();
       // decrement taskIdCounter by 1
       this.taskIdCounter -= 1;
     } else {
       // otherwise do nothing
       return;
     }
   },
   togglePrioritize(taskId) {
     const index = this.tasks.findIndex(task => task.id === taskId);
     this.tasks[index].prioritized = !this.tasks[index].
     prioritized;

    // Sort tasks based on prioritization status
    this.tasks.sort((a, b) => {
      if (a.prioritized && !b.prioritized) {
        return -1; // a comes before b
      } else if (!a.prioritized && b.prioritized) {
        return 1; // b comes before a
      } else {
        return 0; // maintain current order
      }
    });

    this.saveTasksToLocalStorage();
},
// toggles add task form
toggleAddTaskForm() {
    this.showAddTaskForm = !this.showAddTaskForm;
},
// toggles completed task through check box
toggleTaskCompletion(task) {
    task.completed = !task.completed;
if (task.completed) {
  task.completedDate = new Date().toLocaleDateString(); // sets completion date when checkbox is clicked
  
  // moves the completed task to the completedTasks array in localStorage
  const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
  completedTasks.push(task);
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));

  
  
  // Save the updated tasks array to localStorage
  localStorage.setItem('tasks', JSON.stringify(this.tasks));

  alert("Task completed!");
} 
},
  // saving of tasks in local storage
  saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('taskIdCounter', JSON.stringify(this.taskIdCounter));
  },
  // navigate to task details route with the task ID
  viewTaskDetails(task) {
    this.$router.push({ name: 'task-details', params: { taskId: task.id } });
  },
// Modify toggleEditTaskForm to reset editedTask when the edit form is toggled
toggleEditTaskForm(index) {
  if (index !== undefined) {
    // If an index is provided, set editedTask
    this.editedTask = { ...this.tasks[index] };
  } else {
    // Otherwise, reset editedTask to null
    this.editedTask = null;
  }
  this.showEditTaskForm = !this.showEditTaskForm;
}
}
};
</script>

<style scoped>
.task-container {
margin: 20px;
}
.container {
  max-width: 500px;
  margin: auto;
}

.add-task-form,
.edit-task-form {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.table {
width: 100%;
border-collapse: collapse;
text-align: center;
margin-top: 3%;
}

.table th,
.table td {
border: 1px solid #ddd;
padding: 8px;
}

.table th {
background-color: #f2f2f2;
}
.add-task-button{
  display: inline-block;
padding: 5px 10px;
background-color: #007bff;
color: #fff;
border: none;
border-radius: 3px;
cursor: pointer;
text-decoration: none;
transition: background-color 0.3s;
margin-right: 8px;
}
.add-task-button:hover {
background-color: #0056b3;
}

.button-link {
display: inline-block;
padding: 5px 10px;
background-color: #007bff;
color: #fff;
border: none;
border-radius: 3px;
cursor: pointer;
text-decoration: none;
transition: background-color 0.3s;
margin-right: 8px;
}

.button-link:hover {
background-color: #0056b3;
}

.action-button {
padding: 5px 10px;
background-color: #007bff;
color: #fff;
border: none;
border-radius: 3px;
cursor: pointer;
transition: background-color 0.3s;
margin-right: 5px;
}

.action-button:hover {
background-color: khaki;
}

.edit {
background-color: blue;
}

.delete {
background-color: red;
}

.prioritize {
background-color: #28a745;
}

.deprioritize {
background-color: yellow;
}
</style>
