<template>
  <Navigation></Navigation>
</template>

<script>
import Navigation from './Navigation.vue';
import { authorizeUser } from '../helpers/Authorization.js';

export default {
  name: 'Home',
  components: {
    Navigation
  },
  created() {
    authorizeUser();
  },
}
</script>

<style scoped>
</style>