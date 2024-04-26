import { fireauth } from '../firebase.js';
import { onAuthStateChanged } from "firebase/auth";
import router from '../router.js';

/**
 * Checks if a user is authorized. Redirects to the login page if not authorized.
 * @returns {Promise<User>} A promise that resolves with the authorized user.
 */
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

/**
 * Gets the user ID.
 * @returns {Promise<string>} A promise that resolves with the user ID.
 */
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