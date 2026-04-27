<template>
  <div class="menu-items-view">
    <div class="header">
      <h1>Menu Items</h1>
      <button @click="showCreateModal = true" class="btn-primary">
        ➕ Add Menu Item
      </button>
    </div>

    <div class="filters">
      <select v-model="selectedCategory" @change="filterByCategory">
        <option value="">All Categories</option>
        <option v-for="cat in adminStore.categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <div v-if="adminStore.loading" class="loading">Loading...</div>

    <div v-else class="items-grid">
      <div v-for="item in adminStore.menuItems" :key="item.id" class="item-card">
        <div v-if="item.image" class="item-image">
          <img :src="item.image" :alt="item.name" />
        </div>
        <div class="item-content">
          <h3>{{ item.name }}</h3>
          <p class="amharic">{{ item.name_amharic }}</p>
          <p class="description">{{ item.description }}</p>
          <div class="item-meta">
            <span class="price">{{ item.price ? `${item.price} ETB` : 'Price varies' }}</span>
            <span v-if="item.category" class="category-badge">{{ item.category.name }}</span>
          </div>
          <div class="item-tags">
            <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div class="item-status">
            <button 
              @click="toggleAvailability(item.id)" 
              :class="['status-btn', item.is_available ? 'available' : 'unavailable']"
            >
              {{ item.is_available ? '✓ Available' : '✗ Unavailable' }}
            </button>
            <button 
              @click="toggleFeatured(item.id)" 
              :class="['status-btn', item.is_featured ? 'featured' : '']"
            >
              {{ item.is_featured ? '⭐ Featured' : '☆ Feature' }}
            </button>
          </div>
          <div class="item-actions">
            <button @click="editItem(item)" class="btn-edit">✏️ Edit</button>
            <button @click="deleteItem(item.id)" class="btn-delete">🗑️ Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || editingItem" class="modal" @click.self="closeModal">
      <div class="modal-content large">
        <h2>{{ editingItem ? 'Edit Menu Item' : 'Create Menu Item' }}</h2>
        <form @submit.prevent="saveItem">
          <div class="form-row">
            <div class="form-group">
              <label>Name (English) *</label>
              <input v-model="formData.name" type="text" required />
            </div>
            <div class="form-group">
              <label>Name (Amharic) *</label>
              <input v-model="formData.name_amharic" type="text" required />
            </div>
          </div>

          <div class="form-group">
            <label>Category *</label>
            <select v-model="formData.category_id" required>
              <option value="">Select category</option>
              <option v-for="cat in adminStore.categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Description (English)</label>
              <textarea v-model="formData.description" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Description (Amharic)</label>
              <textarea v-model="formData.description_amharic" rows="3"></textarea>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Price (ETB)</label>
              <input v-model.number="formData.price" type="number" step="0.01" />
            </div>
            <div class="form-group">
              <label>Sort Order</label>
              <input v-model.number="formData.sort_order" type="number" />
            </div>
          </div>

          <div class="form-group">
            <label>Image URL</label>
            <input v-model="formData.image" type="text" />
          </div>

          <div class="form-group">
            <label>Tags (comma separated)</label>
            <input v-model="tagsInput" type="text" placeholder="e.g., Vegan, Spicy, Popular" />
          </div>

          <div class="form-checkboxes">
            <label>
              <input v-model="formData.is_available" type="checkbox" />
              Available
            </label>
            <label>
              <input v-model="formData.is_featured" type="checkbox" />
              Featured
            </label>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import { useAdminStore } from '@/stores/adminStore'
import type { MenuItem } from '@/services/menuService'

const adminStore = useAdminStore()
const showCreateModal = ref(false)
const editingItem = ref<MenuItem | null>(null)
const selectedCategory = ref('')

const formData = reactive({
  category_id: null as number | null,
  name: '',
  name_amharic: '',
  description: '',
  description_amharic: '',
  price: null as number | null,
  image: '',
  tags: [] as string[],
  is_available: true,
  is_featured: false,
  sort_order: 0,
})

const tagsInput = computed({
  get: () => formData.tags.join(', '),
  set: (value: string) => {
    formData.tags = value.split(',').map(t => t.trim()).filter(t => t)
  }
})

onMounted(async () => {
  await adminStore.fetchCategories()
  await adminStore.fetchMenuItems()
})

async function filterByCategory() {
  const params = selectedCategory.value ? { category_id: Number(selectedCategory.value) } : undefined
  await adminStore.fetchMenuItems(params)
}

function editItem(item: MenuItem) {
  editingItem.value = item
  formData.category_id = item.category_id
  formData.name = item.name
  formData.name_amharic = item.name_amharic
  formData.description = item.description || ''
  formData.description_amharic = item.description_amharic || ''
  formData.price = item.price
  formData.image = item.image || ''
  formData.tags = item.tags || []
  formData.is_available = item.is_available
  formData.is_featured = item.is_featured
  formData.sort_order = item.sort_order
}

function closeModal() {
  showCreateModal.value = false
  editingItem.value = null
  resetForm()
}

function resetForm() {
  formData.category_id = null
  formData.name = ''
  formData.name_amharic = ''
  formData.description = ''
  formData.description_amharic = ''
  formData.price = null
  formData.image = ''
  formData.tags = []
  formData.is_available = true
  formData.is_featured = false
  formData.sort_order = 0
}

async function saveItem() {
  try {
    if (editingItem.value) {
      await adminStore.updateMenuItem(editingItem.value.id, formData)
    } else {
      await adminStore.createMenuItem(formData)
    }
    closeModal()
  } catch (error) {
    console.error('Failed to save menu item:', error)
  }
}

async function deleteItem(id: number) {
  if (confirm('Are you sure you want to delete this menu item?')) {
    try {
      await adminStore.deleteMenuItem(id)
    } catch (error) {
      console.error('Failed to delete menu item:', error)
    }
  }
}

async function toggleAvailability(id: number) {
  try {
    await adminStore.toggleAvailability(id)
  } catch (error) {
    console.error('Failed to toggle availability:', error)
  }
}

async function toggleFeatured(id: number) {
  try {
    await adminStore.toggleFeatured(id)
  } catch (error) {
    console.error('Failed to toggle featured:', error)
  }
}
</script>

<style scoped>
.menu-items-view {
  max-width: 1400px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  margin: 0;
  color: #2c3e50;
}

.filters {
  margin-bottom: 20px;
}

.filters select {
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.item-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-content {
  padding: 15px;
}

.item-content h3 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.amharic {
  color: #666;
  margin: 0 0 10px 0;
  font-size: 14px;
}

.description {
  color: #666;
  font-size: 13px;
  margin: 0 0 10px 0;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.price {
  font-weight: bold;
  color: #42b983;
  font-size: 16px;
}

.category-badge {
  background: #e9ecef;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
}

.item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}

.tag {
  background: #ffc107;
  color: #000;
  padding: 3px 10px;
  border-radius: 10px;
  font-size: 11px;
}

.item-status {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}

.status-btn {
  flex: 1;
  padding: 6px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.status-btn.available {
  background: #d4edda;
  color: #155724;
}

.status-btn.unavailable {
  background: #f8d7da;
  color: #721c24;
}

.status-btn.featured {
  background: #fff3cd;
  color: #856404;
}

.item-actions {
  display: flex;
  gap: 10px;
}

.btn-primary {
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-edit {
  flex: 1;
  background: #ffc107;
  color: #000;
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-delete {
  flex: 1;
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content h2 {
  margin-top: 0;
  color: #2c3e50;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #495057;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
}

.form-checkboxes {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-checkboxes label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
