<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-wrapper">
    <RouterView />
  </div>
</template>

<style>
.app-wrapper {
  max-width: 480px;
  margin: 0 auto;
  background: #000;
  min-height: 100vh;
  position: relative;
  box-shadow: 0 0 50px rgba(0,0,0,0.5);
}

@media (min-width: 481px) {
  body {
    background: #0a0a0a;
  }
}
</style>
