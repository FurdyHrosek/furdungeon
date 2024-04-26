<template>
  <button class="nav-helper" data-open="navigation"
          :class="{ 'nav-open': isNavigationVisible }" 
          @click="toggleNavigation">
    {{ isNavigationVisible ? '< < <' : '> > >' }}
  </button>
  <div id="nav" v-bind:class="{ 'open': isNavigationVisible }">
    <ul id="nav-links">
      <li><router-link to="/">Dungeon</router-link></li>
      <li><router-link to="/slave">Slave</router-link></li>
      <li><router-link to="/obligations">Obligations</router-link></li>
      <li><router-link to="/conflicts">Conflicts</router-link></li>
      <li><router-link to="/duels">Duels</router-link></li>
    </ul>
    <button class="logout-btn" data-open="modal" @click="openLogoutModal">Escape</button>
  </div>

  <div v-if="isLogoutModalVisible" class="logout">
      <h2>Are you sure you want to leave your slave to rot and escape the dungeon?</h2>
      <div class="logout-options">
        <button class="remain-btn" @click="closeLogoutModal">Oppress</button>
        <button class="logout-btn" @click="logout">Escape</button>
      </div>
    </div>
</template>

<script>
import { fireauth } from '../firebase.js';
import { signOut  } from "firebase/auth";
import { createModalFunctions } from '../helpers/Modal.js';

export default {
  name: 'Navigation',
  data() {
    return {
      isLogoutModalVisible: false,
      isNavigationVisible: false,
    };
  },
  mounted() {
    const { openModal: openLogoutModal, closeModal: closeLogoutModal } = createModalFunctions(this.$data, 'isLogoutModalVisible');
    this.openLogoutModal = openLogoutModal;
    this.closeLogoutModal = closeLogoutModal;

    const { toggleModal: toggleNavigation } = createModalFunctions(this.$data, 'isNavigationVisible');
    this.toggleNavigation = toggleNavigation;
  },
  methods: {
    async logout() {
      signOut(fireauth).then(() => {
        document.body.classList.remove('logged');
      }).catch((error) => {
        // An error happened.
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-helper {
  position: fixed;
  display: flex;
  justify-content: flex-end;
  z-index: 102;

  width: 222px;
  left: -140px;
  margin-top: 25px;

  background: none;
  font-size: 26px;
  color: $primary-red;
  letter-spacing: -6px;
  text-transform: uppercase;
  border: 0;
  cursor: pointer;
  transition: $trans;

  &.nav-open {
    left: -20px;
  }

  &:hover {
    color: $secondary-red;
  }
}
#nav {
  position: fixed;
  display: flex;
  height: 100%;
  z-index: 101;
  left: -250px;
  transition: $trans;

  &.open {
    left: 0;
  }

  &-links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    list-style-type: none;

    gap: 20px;
    margin: 0;
    padding: 80px 75px 20px 50px;

    background: linear-gradient(to bottom, $gradient-dark, $gradient-light);
    font-size: 16px;
    text-transform: uppercase;

    a {
      display: block;
      position: relative;
      color: $primary-red;
      text-decoration: none;
      transition: $trans;
      
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 0px;
        height: 2px;
        bottom: -2px;
        left: 0px;
        background-color: $primary-red;
        transition: $trans;
      }

      &:hover {
        color: $secondary-red;

        &::before {
          content: '';
          width: 50%;
          background-color: $secondary-red;
        }
      }
    }
  }
  .logout-btn {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    background: none;
    border: 0;
    margin: 0 0 30px 0;

    color: $primary-red;
    text-transform: uppercase;
    font-size: 24px;
    letter-spacing: 3px;
    cursor: pointer;
    transition: $trans;

    &:hover {
      color: $secondary-red;
    }
  }
}

.logout {
  position: fixed;
  max-width: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(to bottom, $gradient-dark, $gradient-light);
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
  padding: 40px 20px;
  z-index: 201;

  h2 {
    color: $primary-white;
    margin: 20px 0 30px;
  }
  &-options {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    height: 50px;
    padding: 20px;
    gap: 0 20px;

    button {
      width: max-content;
      flex: 1;

      text-transform: uppercase;
      letter-spacing: 2px;

      background: none;
      border: none;
      color: $primary-red;
      font-size: 20px;
      transition: $trans;
      cursor: pointer;

      &:hover {
        font-size: 25px;
      }
    }
  }
}
</style>