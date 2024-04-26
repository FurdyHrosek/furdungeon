<template>
  <img class="logo" alt="Dungeon Master Logo" src="../../public/dungeon.svg">
  <h1>Dungeon Master</h1>
  <div class="login">
    <input v-model="email" type="text" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button class="default-btn" @click="loginUser">Login</button>
    <button class="default-btn" @click="showRegisterModal">Register</button>
    <div v-if="loginError" class="login-error">{{ loginError }}</div>

    <div v-if="isRegisterModalVisible" class="overlay"></div>
    <div v-if="isRegisterModalVisible" class="register-modal">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <input type="email" id="email" placeholder="Email" v-model="registerData.email" required>
        <input type="password" id="password" placeholder="Password" v-model="registerData.password" required>
        <button class="default-btn register-btn" type="submit">Register</button>
        <div v-if="registerError" class="register-error">{{ registerError }}</div>
        <button class="close-modal-btn" @click="closeRegisterModal">X</button>
      </form>
    </div>
  </div>
</template>

<script>
import { firestore, fireauth } from '../firebase.js';
import { onSnapshot, collection, query } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: 'SignUp',
  created() {
    this.getData();
  },
  data() {
    return {
      email: '',
      password: '',
      loginError: '',
      registerError: '',
      isUserDataLoading: true,
      userData: null,
      isRegisterModalVisible: false,
      registerData: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async getData() {
      const collectionRef = query(collection(firestore, "users"))
      this.isUserDataLoading = true;

      onSnapshot(collectionRef, (snapshot) => {
        this.userData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        this.isUserDataLoading = false;
      }, error => {
        console.error(error);
        this.isUserDataLoading = false;
      });
    },

    async addData(formData) {
      const collectionRef = query(collection(firestore, "users"));
      try {
        await collectionRef.add(formData);
        console.log('Data Saved Successfully');
      } catch (error) {
        console.error(error);
      }
    },

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

    async registerUser() {
      let registerError = '';

      try {
        const { email, password } = this.registerData;
        
        createUserWithEmailAndPassword(fireauth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            this.isRegisterModalVisible = false;
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
              //this.registerError = '';
            }, 5000);
          });
      } catch (error) {
        registerError = 'An error occurred while logging in. Please try again later.';

        this.registerError = registerError;
      }
    },

    showRegisterModal() {
      this.isRegisterModalVisible = true;
    },

    closeRegisterModal() {
      this.isRegisterModalVisible = false;
    }
  }
}
</script>

<style scoped>
/* Logo & Header */
.logo {
  width: 100px;
}
h1 {
  text-transform: uppercase;
  font-size: 44px;
  letter-spacing: 2px;
  color: #ff0000;
}

/* Login */
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 20px;
  margin: 50px auto 100px;
}
.login input {
  display: block;
  width: 300px;
  height: 40px;
  padding-left: 20px;
  border: none;
}
.login .default-btn {
  width: 320px;
  height: 40px;
  border: 1px solid black;
  border-radius: 0;
  outline: none;
  background: black;
  color: white;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}
.login .default-btn:hover {
  background: #292929;
  border: 1px solid #292929;
}
.login-error {
  position: absolute;
  max-width: 500px;
  bottom: -70px;
  color: #ff0000;
  font-size: 18px;
  text-transform: uppercase;
}

/* Register Modal */
.register-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #525252;
  padding: 20px;
  border: 1px solid #525252;
  z-index: 1000;
}
.register-modal h2 {
  color: white;
  margin: 20px 0 30px;
}
.register-modal form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}
.register-modal .register-btn {
  margin-bottom: 80px;
}
.register-error {
  position: absolute;
  width: auto;
  bottom: 20px;
  padding-right: 20px;
  color: #ff0000;
  font-size: 18px;
  text-transform: uppercase;
}
.close-modal-btn {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 1em;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.close-modal-btn:hover {
  position: absolute;
  border: none;
  color: #a8a8a8;
}
</style>