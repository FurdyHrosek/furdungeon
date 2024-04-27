<template>
  <div class="login-header">
    <img class="logo" alt="Dungeon Master Logo" src="../../public/dungeon.svg">
    <h1>Dungeon Master</h1>
  </div>
  <div class="login">
    <input v-model="email" type="text" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" @keyup.enter="loginUser" />
    <button class="default-btn login-btn" @click="loginUser">Login</button>
    <button class="default-btn" data-open="modal" @click="openForgottenModal">Forgotten</button>
    <button class="default-btn" data-open="modal" @click="openRegisterModal">Register</button>
    <div v-if="loginError" class="login-error">{{ loginError }}</div>

    <div v-if="isRegisterModalVisible" class="register-modal">
      <h2>Delight in Task Bondage Bliss!</h2>
      <form @submit.prevent="registerUser">
        <input type="email" id="email" placeholder="Email" v-model="registerData.email" required>
        <input type="password" id="password" placeholder="Password" v-model="registerData.password" required>
        <button class="default-btn register-btn" type="submit">Enslave</button>
        <div v-if="registerError" class="register-error">{{ registerError }}</div>
        <button class="close-modal-btn" @click="closeRegisterModal">X</button>
      </form>
    </div>

    <div v-if="isForgottenModalVisible" class="forgotten-modal">
      <h2>Honor Your Thrall's Essential Requirements!</h2>
      <form @submit.prevent="forgottenPassword">
        <input type="email" id="forgotten-email" placeholder="Email" v-model="forgottenEmail" required>
        <button class="default-btn forgotten-btn" type="submit">Send Reminder</button>
        <div v-if="forgottenMessage" class="forgotten-message">{{ forgottenMessage }}</div>
        <button class="close-modal-btn" @click="closeForgottenModal">X</button>
      </form>
    </div>
    
  </div>
</template>

<script>
import { fireauth } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail  } from "firebase/auth";
import { authorizeUser } from '../helpers/Authorization.js';
import { createModalFunctions, removeOverlay } from '../helpers/Modal.js';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loginError: '',
      forgottenEmail: '',
      forgottenMessage: '',
      isForgottenModalVisible: false,
      registerError: '',
      isRegisterModalVisible: false,
      registerData: {
        email: '',
        password: ''
      },
    };
  },
  created() {
    authorizeUser();
  },
  mounted() {
    const { openModal: openRegisterModal, closeModal: closeRegisterModal } = createModalFunctions(this.$data, 'isRegisterModalVisible');
    this.openRegisterModal = openRegisterModal;
    this.closeRegisterModal = closeRegisterModal;

    const { openModal: openForgottenModal, closeModal: closeForgottenModal } = createModalFunctions(this.$data, 'isForgottenModalVisible');
    this.openForgottenModal = openForgottenModal;
    this.closeForgottenModal = closeForgottenModal;
  },
  methods: {
    /**
     * Check firebase and login user and route to home or show error
     */
    async loginUser() {
      signInWithEmailAndPassword(fireauth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.$router.push({name: 'Home'})
      })
      .catch((error) => {
        console.error(error.code + ' | ' + error.message);
        let loginError = '';

        if (error.code === 'auth/invalid-email') {
          loginError = 'Invalid email. Please enter a valid email address.';
        } else if (error.code === 'auth/invalid-credential') {
          loginError = 'Invalid password. Please check your password and try again.';
        } else if (error.code === 'auth/too-many-requests') {
          loginError = 'Too many requests. Please try again later.';
        } else {
          loginError = 'An error occurred while logging in. Please try again later.';
        }

        this.loginError = loginError;
        setTimeout(() => {
          this.loginError = '';
        }, 5000);
      });
    },

    /**
     * Register new user to firebase
     */
    async registerUser() {
      let registerError = '';

      try {
        const { email, password } = this.registerData;
        
        createUserWithEmailAndPassword(fireauth, email, password)
          .then((userCredential) => {
            removeOverlay();
            const user = userCredential.user;
            this.isRegisterModalVisible = false;
            this.$router.push({name: 'Home'})
          })
          .catch((error) => {
            console.error(error.code + ' | ' + error.message);
            
            if (error.code === 'auth/weak-password') {
              registerError = 'Weak password. Password should be at least 6 characters.';
            } else if (error.code === 'auth/email-already-in-use') (
              registerError = 'Email already in use. Please choose a different e-mail.'
            )

            this.registerError = registerError;
            setTimeout(() => {
              this.registerError = '';
            }, 5000);
          });
      } catch (error) {
        registerError = 'An error occurred while logging in. Please try again later.';
        this.registerError = registerError;

        setTimeout(() => {
          this.registerError = '';
        }, 5000);
      }
    },

    /**
     * Send forgotten password to user email.
     */
    async forgottenPassword() {
      let forgottenMessage = '';

      sendPasswordResetEmail(fireauth, this.forgottenEmail)
        .then(() => {
          forgottenMessage = 'New password request was sent to your e-mail.'
          this.forgottenMessage = forgottenMessage;

          setTimeout(() => {
            forgottenMessage = ''
            this.forgottenMessage = forgottenMessage;

            removeOverlay();
            this.closeForgottenModal();
          }, 5000)
        })
        .catch((error) => {
          console.error(error)
      });
    },
  }
}
</script>

<style lang="scss" scoped>
/* Logo & Header */
.login-header {
  margin-top: 80px;
  .logo {
  width: 100px;
  }
  h1 {
    text-transform: uppercase;
    font-size: 44px;
    letter-spacing: 2px;
    color: $primary-red;
  }
}

/* Login */
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 20px;
  margin: 50px auto 120px;

  input {
    display: block;
    width: 300px;
    height: 40px;
    padding-left: 20px;
    border: none;
  }
  .default-btn {
    width: 320px;
    height: 50px;
    border: 2px solid $border-gray-100;
    border-radius: 0;
    outline: none;
    background: $btn-black;
    color: $btn-white;
    transition: $trans;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 2px;

    &.login-btn {
      margin-top: 40px;
    }

    &:hover {
      color: $btn-white-hover;
      background: $btn-black-hover;
      border-color: $primary-red;
    }
  }
  
  .login-error {
    max-width: 500px;
    padding-top: 15px;
    color: $primary-white;
    font-size: 18px;
    text-transform: uppercase;
  }

  /* Register & Forgotten Modal */
  .register-modal,
  .forgotten-modal {
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

    h2 {
      color: white;
      margin: 25px 0 40px;
      max-width: 300px;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 25px;

      .register-btn,
      .forgotten-btn {
        margin: 30px 0 60px;
      }
      .register-error,
      .forgotten-message {
        position: absolute;
        width: 100%;
        max-width: 300px;
        bottom: 25px;
        color: $primary-red;
        font-size: 18px;
        text-transform: uppercase;
      }
      .close-modal-btn {
        position: absolute;
        right: 40px;
        top: 35px;
        font-size: 1em;
        border: none;
        background: none;
        color: $btn-white;
        cursor: pointer;
        transition: $trans;

        &:hover {
          position: absolute;
          border: none;
          color: $btn-white-hover;
        }
      }
    }
  }
}
</style>