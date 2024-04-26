import { fireauth } from '../firebase.js';
import { onAuthStateChanged } from "firebase/auth";
import router from '../router.js';

export async function authorizeUser() {
  onAuthStateChanged(fireauth, (user) => {
    if (!user) {
      router.push({name: 'Login'});
    }
  });
}
