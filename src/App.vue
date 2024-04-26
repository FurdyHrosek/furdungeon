<template>
  <div id="content-wrapper">
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style scoped>
  #content-wrapper {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
  }
</style>
