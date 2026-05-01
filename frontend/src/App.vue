<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <div :class="['app-wrapper', { 'admin-mode': isAdminRoute }]">
    <RouterView />
  </div>
</template>

<style>
/* Customer-facing mobile app style */
.app-wrapper {
  max-width: 480px;
  margin: 0 auto;
  background: var(--bg-primary);
  min-height: 100vh;
  position: relative;
  box-shadow: 0 0 50px var(--shadow);
  transition: background-color 0.3s ease;
}

/* Admin full-width desktop style */
.app-wrapper.admin-mode {
  max-width: 100%;
  margin: 0;
  background: #f8f9fa;
  box-shadow: none;
}

@media (min-width: 481px) {
  body {
    background: var(--bg-primary);
  }
  
  body:has(.admin-mode) {
    background: #f8f9fa;
  }
}
</style>
