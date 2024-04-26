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
        // Call addData function to add new task to Firestore
        await addData(['task-' + Math.floor(Math.random() * 10000000000)], {
          name: this.newTaskData.name,
          description: this.newTaskData.description
        });

        console.log(this.newTaskData.name)
        console.log(this.newTaskData.description)

        // Reset newTaskData after successfully adding the task
        this.newTaskData.name = '';
        this.newTaskData.description = '';



        // Close the new task modal
        this.closeNewTaskModal();
      } catch (error) {
        // Handle any errors
        console.error('Error adding task:', error);
        // You can also set an error message here to display in the UI
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