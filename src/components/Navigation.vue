<template>
<div class="nav-helpers" 
     v-bind:class="{ 'nav-open': isNavigationVisible }" 
     @click="isNavigationVisible ? closeNavigation() : openNavigation()"
     >
    <i class="nav-helper">{{ isNavigationVisible ? '< < <' : '> > >' }}</i>
</div>
  <div id="nav" v-bind:class="{ 'open': isNavigationVisible }">
    <ul id="nav-links">
      <li><router-link to="/">Dungeon</router-link></li>
      <li><router-link to="/slave">Slave</router-link></li>
      <li><router-link to="/obligations">Obligations</router-link></li>
      <li><router-link to="/conflicts">Conflicts</router-link></li>
      <li><router-link to="/duels">Duels</router-link></li>
    </ul>
    <button class="logout-btn" @click="openLogoutModal">Escape</button>
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
      isNavigationVisible: false
    };
  },
  mounted() {
    const { openModal: openLogoutModal, closeModal: closeLogoutModal } = createModalFunctions(this.$data, 'isLogoutModalVisible');
    this.openLogoutModal = openLogoutModal;
    this.closeLogoutModal = closeLogoutModal;

    const { openModal: openNavigation, closeModal: closeNavigation } = createModalFunctions(this.$data, 'isNavigationVisible');
    this.openNavigation = openNavigation;
    this.closeNavigation = closeNavigation;
  },
  methods: {
    async logout() {
      signOut(fireauth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-helpers {
  position: fixed;
  display: flex;
  justify-content: flex-end;
  color: $primary-white;
  text-transform: uppercase;
  width: 222px;

  font-size: 26px;
  color: white;

  z-index: 1011;

  &.nav-open {
    .nav-helper {
      right: 0;
    }
  }

  .nav-helper {
    position: absolute;
    cursor: pointer;
    transition: $trans;
    margin: 15px 30px 0 0;
    letter-spacing: -6px;
    color: $primary-red;
    right: 120px;

    &:hover {
      color: $secondary-red;
    }
  }
}
#nav {
  position: fixed;
  display: flex;
  height: 100%;
  z-index: 1010;
  left: -400px;
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(to bottom, $gradient-dark, $gradient-light);
  padding: 40px 20px;
  z-index: 1000;

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