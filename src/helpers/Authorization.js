import { fireauth } from '../firebase.js';
import { onAuthStateChanged } from "firebase/auth";
import router from '../router.js';

export async function checkAuthState() {
  onAuthStateChanged(fireauth, (user) => {
    if (user) {
      router.push({name: 'Home'});
    } else {
      router.push({name: 'Login'});
    }
  });
}
