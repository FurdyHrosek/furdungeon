<template>
  <Navigation></Navigation>
  <h1>Fulfill your obligations to the brotherhood!</h1>
</template>

<script>
import Navigation from './Navigation.vue';
import { authorizeUser } from '../helpers/Authorization.js';

export default {
name: 'Obligations',
components: {
  Navigation
},
mounted() {
  authorizeUser();
},
}
</script>

<style scoped>
</style>