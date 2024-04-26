import { fireauth } from '../firebase.js';
import { onAuthStateChanged } from "firebase/auth";
import router from '../router.js';

export async function authorizeUser() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(fireauth, (user) => {
      if (!user) {
        router.push({ name: 'Login' });
      } else {
        document.body.classList.add('logged');
        resolve(user);
      }
    });
  });
}

export async function getUserId() {
  return new Promise((resolve, reject) => {
    authorizeUser()
      .then(user => {
        user.providerData.forEach(profile => {
          resolve(profile.uid);
        });
      })
  });
}