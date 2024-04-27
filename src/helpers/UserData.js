import { firestore } from '../firebase.js';
import { collection, query, getDocs, addDoc } from "firebase/firestore";

/**
 * Retrieves user data from Firestore.
 */
export async function getData(id, path) {
  const querySnapshot = await getDocs(collection(firestore, "users", id, path));
  const tasks = [];
  querySnapshot.forEach((doc) => {
    tasks.push(doc.data());
  });
  return tasks;
}

/**
 * Adds data to Firestore.
 * @param {string[]} path - The path to the collection/document where data will be added.
 */
export async function addData(id, path, formData) {
  const docRef = await addDoc(collection(firestore, 'users', id, path), {...formData});
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