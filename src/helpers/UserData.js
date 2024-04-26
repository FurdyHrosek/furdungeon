import { firestore } from '../firebase.js';
import { onSnapshot, collection, query } from "firebase/firestore";

let isUserDataLoading = false;
let userData = null;

/**
 * Retrieves user data from Firestore.
 */
export async function getData() {
  const collectionRef = query(collection(firestore, "userData"));
  isUserDataLoading = true;

  onSnapshot(collectionRef, (snapshot) => {
    userData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    isUserDataLoading = false;
  }, error => {
    console.error(error);
    isUserDataLoading = false;
  });
}

/**
 * Adds data to Firestore.
 * @param {string[]} path - The path to the collection/document where data will be added.
 */
export async function addData(path) {
  const collectionRef = query(collection(firestore, "userData"), ...path);

  try {
    await collectionRef.add(formData);
    console.log('Data saved successfully');
  } catch (error) {
    console.error(error);
  }
}

/**
 * Updates data in Firestore.
 * @param {string[]} path - The path to the collection/document where data will be updated.
 */
export async function updateData(path) {
  const collectionRef = query(collection(firestore, "userData"), ...path);

  try {
    await collectionRef.add(formData);
    console.log('Data updated successfully');
  } catch (error) {
    console.error(error);
  }
}