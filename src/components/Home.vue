<template>
  <h1>Welcome to your dungeon!</h1>
  <button>Sign Out</button>
</template>

<script>
import { checkAuthState } from '../helpers/Authorization.js';

export default {
  name: 'Home',
  mounted() {
    checkAuthState();
  },
  methods: {

  }
}
</script>

<style scoped>
</style>