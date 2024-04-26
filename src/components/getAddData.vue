<template>
</template>
  
  <script>
  import { firestore } from '../firebase.js';
  import { onSnapshot, collection, query } from "firebase/firestore";
  
  export default {
    name: 'SignUp',
    created() {
      this.getData();
    },
    data() {
      return {
        isUserDataLoading: true,
        userData: null
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
      }
    }
  }
  </script>
  
  <style scoped>

  </style>