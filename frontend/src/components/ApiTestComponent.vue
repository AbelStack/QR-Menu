<template>
  <div class="api-test">
    <h2>API Integration Test</h2>
    
    <div class="test-section">
      <h3>Health Check</h3>
      <button @click="testHealth" :disabled="loading">Test API Health</button>
      <div v-if="healthStatus" class="result">
        <pre>{{ JSON.stringify(healthStatus, null, 2) }}</pre>
      </div>
    </div>

    <div class="test-section">
      <h3>Get Items</h3>
      <button @click="fetchItems" :disabled="loading">Fetch Items</button>
      <div v-if="items.length" class="result">
        <div v-for="item in items" :key="item.id" class="item">
          <strong>{{ item.name }}</strong>: {{ item.description }}
        </div>
      </div>
    </div>

    <div class="test-section">
      <h3>Create Item</h3>
      <input v-model="newItem.name" placeholder="Item name (English)" />
      <input v-model="newItem.name_amharic" placeholder="Item name (Amharic)" />
      <input v-model="newItem.description" placeholder="Description" />
      <input v-model.number="newItem.category_id" type="number" placeholder="Category ID" />
      <input v-model.number="newItem.price" type="number" placeholder="Price" />
      <button @click="createItem" :disabled="loading">Create Item</button>
      <div v-if="createResponse" class="result">
        <pre>{{ JSON.stringify(createResponse, null, 2) }}</pre>
      </div>
    </div>

    <div v-if="error" class="error">
      <strong>Error:</strong> {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/services/api'
import { menuService } from '@/services/menuService'

const loading = ref(false)
const error = ref('')
const healthStatus = ref<any>(null)
const items = ref<any[]>([])
const createResponse = ref<any>(null)
const newItem = ref({
  name: '',
  name_amharic: '',
  description: '',
  category_id: 1,
  price: 0
})

async function testHealth() {
  loading.value = true
  error.value = ''
  healthStatus.value = null
  
  try {
    const response = await api.get('/health')
    healthStatus.value = response.data
  } catch (err: any) {
    error.value = err.message || 'Failed to connect to API'
  } finally {
    loading.value = false
  }
}

async function fetchItems() {
  loading.value = true
  error.value = ''
  items.value = []
  
  try {
    const response = await menuService.getMenuItems()
    items.value = response.data
  } catch (err: any) {
    error.value = err.message || 'Failed to fetch items'
  } finally {
    loading.value = false
  }
}

async function createItem() {
  if (!newItem.value.name) {
    error.value = 'Please enter an item name'
    return
  }
  
  loading.value = true
  error.value = ''
  createResponse.value = null
  
  try {
    const response = await menuService.admin.createMenuItem(newItem.value)
    createResponse.value = response
    newItem.value = { name: '', name_amharic: '', description: '', category_id: 1, price: 0 }
  } catch (err: any) {
    error.value = err.message || 'Failed to create item'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.api-test {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.test-section {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h2 {
  color: #2c3e50;
}

h3 {
  color: #42b983;
  margin-top: 0;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}

button:hover:not(:disabled) {
  background-color: #359268;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

input {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
}

.result {
  margin-top: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.item {
  padding: 8px;
  margin: 5px 0;
  background-color: white;
  border-radius: 4px;
}

.error {
  color: #e74c3c;
  padding: 10px;
  background-color: #fadbd8;
  border-radius: 4px;
  margin-top: 10px;
}

pre {
  overflow-x: auto;
}
</style>
