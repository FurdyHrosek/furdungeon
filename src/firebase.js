import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDDGFO_1IyyOf7PnCS5vfm6d6faqjKFsG8",
    authDomain: "furdy-s-dungeons.firebaseapp.com",
    projectId: "furdy-s-dungeons",
    storageBucket: "furdy-s-dungeons.appspot.com",
    messagingSenderId: "47521337116",
    appId: "1:47521337116:web:ed9f5aa55b133da4da34d9"
  };


const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const fireauth = getAuth(firebaseApp);

export { firebaseApp, firestore, fireauth };
