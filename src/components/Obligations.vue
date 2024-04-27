<template>
  <Navigation></Navigation>
  <h1>Fulfill your obligations to the brotherhood!</h1>
  <button class="default-btn" data-open="modal" @click="openNewTaskModal">New Task</button>

  <div class="obligations">
    <h2>Tasks</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>{{ task.taskData.name }}</td>
          <td>{{ task.taskData.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>


  <div v-if="isNewTaskModalVisible" class="new-task-modal">
      <h2>New Task</h2>
      <form id="new-task" @submit.prevent="createTask">
        <input type="name" id="new-task-name" placeholder="Duty Name" v-model="newTaskData.name" required>
        <input type="description" id="description" placeholder="Duty Description" v-model="newTaskData.description">
        <button class="default-btn register-btn" type="submit">Delegate</button>
        <div v-if="newTaskError" class="register-error">{{ newTaskError }}</div>
        <button class="close-modal-btn" @click="closeNewTaskModal">X</button>
      </form>
    </div>
</template>

<script>
import Navigation from './Navigation.vue';
import { authorizeUser, getUserId } from '../helpers/Authorization.js';
import { getData, addData } from '../helpers/UserData.js';
import { createModalFunctions } from '../helpers/Modal.js';

export default {
  name: 'Obligations',
  data() {
    return {
      user: null,
      isNewTaskModalVisible: false,
      newTaskData: {
        userId: '',
        name: '',
        description: ''
      },
      tasks: {},
    };
  },
  components: {
    Navigation
  },
  async mounted() {
    try {
      await authorizeUser();
      this.user = await getUserId(); 
      this.getTasks();
    } catch (error) {
      console.error(error);
    }

    const { openModal: openNewTaskModal, closeModal: closeNewTaskModal } = createModalFunctions(this.$data, 'isNewTaskModalVisible');
    this.openNewTaskModal = openNewTaskModal;
    this.closeNewTaskModal = closeNewTaskModal;
  },
  methods: {
    async getTasks() {
      try {
        const tasks = await getData(this.user, 'userTasks');
        this.tasks = tasks;
        console.log(this.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },

    async createTask() {
      try {
        await addData(this.user, 'userTasks', {
          user: this.user,
          taskData: {
            name: this.newTaskData.name,
            description: this.newTaskData.description
          }
        });

        this.newTaskData.name = '';
        this.newTaskData.description = '';

        this.closeNewTaskModal();
        this.getTasks();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.new-task-modal {
  position: fixed;
    z-index: 201;

    display: flex;
    flex-direction: column;
    align-items: center;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 60px 50px 40px;

    background-color: $background-gray;
}
</style>