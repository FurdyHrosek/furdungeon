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
mounted() {
    authorizeUser();
},
}
</script>

<style scoped>
</style>