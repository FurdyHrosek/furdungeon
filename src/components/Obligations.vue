<template>
  <Navigation></Navigation>
  <h1>Fulfill your obligations to the brotherhood!</h1>
  <button class="default-btn" data-open="modal" @click="openNewTaskModal">New Task</button>

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
import { addData } from '../helpers/UserData.js';
import { createModalFunctions } from '../helpers/Modal.js';

export default {
  name: 'Obligations',
  data() {
    return {
      userId: null, // Initialize userId as null
      isNewTaskModalVisible: false,
      newTaskData: {
        name: '',
        description: ''
      },
    };
  },
  components: {
    Navigation
  },
  async mounted() {
    try {
      await authorizeUser();
      this.userId = await getUserId(); 
      console.log(this.userId);
    } catch (error) {
      console.error(error);
    }
  },
  mounted() {
    const { openModal: openNewTaskModal, closeModal: closeNewTaskModal } = createModalFunctions(this.$data, 'isNewTaskModalVisible');
    this.openNewTaskModal = openNewTaskModal;
    this.closeNewTaskModal = closeNewTaskModal;
  },
  methods: {
    async createTask() {
      try {
        await addData(['task-' + Math.floor(Math.random() * 10000000000)], {
          name: this.newTaskData.name,
          description: this.newTaskData.description
        });

        console.log(this.newTaskData.name)
        console.log(this.newTaskData.description)

        this.newTaskData.name = '';
        this.newTaskData.description = '';

        this.closeNewTaskModal();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  }
}
</script>

<style scoped>
.new-task-modal {
  position: fixed;
}
</style>