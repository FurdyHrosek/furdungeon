import { firestore } from '../firebase.js';
import { onSnapshot, collection, query } from "firebase/firestore";

let isUserDataLoading = false;
let userData = null;

export async function getData() {
    const collectionRef = query(collection(firestore, "userData"))
    isUserDataLoading = true;

    onSnapshot(collectionRef, (snapshot) => {
      userData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      isUserDataLoading = false;
    }, error => {
      console.error(error);
      isUserDataLoading = false;
    });
}

export async function addData(path) {
    const collectionRef = query(collection(firestore, "userData"), ...path);
    try {
      await collectionRef.add(formData);
      console.log('Data Saved Successfully');
    } catch (error) {
      console.error(error);
    }
}

export async function updateData(path) {
    const collectionRef = query(collection(firestore, "userData"), ...path);
    try {
      await collectionRef.add(formData);
      console.log('Data Saved Successfully');
    } catch (error) {
      console.error(error);
    }
}