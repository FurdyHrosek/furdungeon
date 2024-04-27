<template>
  <Navigation></Navigation>
  <h1>Fulfill your obligations to the brotherhood!</h1>
  <div class="obligations-buttons">
    <button class="default-btn open-new-task-btn" data-open="modal" @click="openNewTaskModal">New Obligation</button>
    <button class="default-btn open-chore-btn" data-open="modal">New Chore</button>
  </div>

  <div class="obligations">
    <h2>Obligations</h2>
    <div class="obligations-container">
      <div class="obligation" v-for="(task, index) in tasks" :key="index">
      <span class="obligation-name">{{ task.taskData.name }}</span>
      <span class="obligation-desc">{{ task.taskData.description }}</span>
    </div>
    </div>
  </div>


  <div v-if="isNewTaskModalVisible" class="new-task-modal">
      <form id="new-task" @submit.prevent="createTask">
        <h3>Duty Name:</h3>
        <input type="name" id="new-task-name" v-model="newTaskData.name" required>
        <h3>Duty Description:</h3>
        <textarea type="description" id="new-task-desc" v-model="newTaskData.description"></textarea>
        <button class="default-btn new-task-btn" type="submit">Delegate</button>
        <div v-if="newTaskError" class="new.task-error">{{ newTaskError }}</div>
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
h1 {
  margin: 40px 0;
  color: white;
  text-transform: uppercase;
}

.obligations-buttons {
  display: flex;
  justify-content: center;
  gap: 30px;

  .default-btn {
    width: 250px;
    color: $primary-red;
    border: 0;
    background: none;
    font-size: 24px;
    transition: $trans;
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
      color: $secondary-red;
    }
  }
}

.obligations {
  margin-top: 40px;
  padding: 20px;

  background-color: #525252;
  color: $primary-white;
  .obligations-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 20px;

    .obligation {
      display: flex;
      flex-direction: column;
      align-items: center;

      border: 2px solid $primary-black;
      padding: 30px 15px;
      gap: 20px;

      &-name {
        font-size: 15px;
        text-transform: uppercase;
      }
      &-desc {
        font-size: 11px;
      }
    }
  }
}
.new-task-modal {
  position: fixed;
  z-index: 201;
  overflow-y: visible;

  display: flex;
  flex-direction: column;
  align-items: center;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 60px 50px 40px;

  background-color: $background-gray;

  #new-task {
    display: flex;
    flex-direction: column;
    gap: 15px;

    h3 {
      color: $primary-white;
      font-size: 18px;
      text-transform: uppercase;
    }

    input,
    textarea {
      width: 420px;
      padding: 20px;
    }

    input {
      min-height: 15px;
    }
    textarea {
      min-height: 250px;
    }
    .new-task-btn {
      width: 100%;
      height: 50px;
      margin-top: 30px;
      border: 2px solid $border-gray-100;
      border-radius: 0;
      outline: none;
      background: $btn-black;
      color: $btn-white;
      transition: $trans;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 2px;

      &:hover {
        color: $btn-white-hover;
        background: $btn-black-hover;
        border-color: $primary-red;
      }
    }
  }
}
</style>