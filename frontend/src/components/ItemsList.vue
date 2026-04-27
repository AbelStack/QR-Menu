<template>
  <div class="items-list">
    <h2>Items List Example</h2>
    
    <button @click="execute" :disabled="loading">
      {{ loading ? 'Loading...' : 'Refresh Items' }}
    </button>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="loading" class="loading">
      Loading items...
    </div>

    <div v-else-if="data" class="items">
      <div v-for="item in data.data" :key="item.id" class="item-card">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>

    <div v-else class="empty">
      No items loaded yet. Click "Refresh Items" to load.
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '@/composables/useApi'
import { menuService } from '@/services/menuService'

// Using the composable with immediate loading
const { data, loading, error, execute } = useApi(
  menuService.getMenuItems,
  { immediate: true }
)
</script>

<style scoped>
.items-list {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

button:hover:not(:disabled) {
  background-color: #359268;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: #e74c3c;
  padding: 10px;
  background-color: #fadbd8;
  border-radius: 4px;
  margin-bottom: 20px;
}

.loading {
  color: #3498db;
  padding: 10px;
  text-align: center;
}

.items {
  display: grid;
  gap: 15px;
}

.item-card {
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.item-card h3 {
  margin: 0 0 10px 0;
  color: #42b983;
}

.item-card p {
  margin: 0;
  color: #6c757d;
}

.empty {
  text-align: center;
  padding: 40px;
  color: #6c757d;
}
</style>
