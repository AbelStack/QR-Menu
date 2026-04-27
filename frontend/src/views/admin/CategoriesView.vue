<template>
  <div class="categories-view">
    <div class="page-header">
      <div>
        <h1>Categories Management</h1>
        <p class="subtitle">Organize your menu into categories for better navigation</p>
      </div>
      <button @click="showCreateModal = true" class="btn-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Add Category
      </button>
    </div>

    <div v-if="adminStore.loading" class="loading">
      <div class="spinner"></div>
      <p>Loading categories...</p>
    </div>

    <div v-else class="categories-container">
      <div class="categories-grid">
        <div v-for="category in adminStore.categories" :key="category.id" class="category-card">
          <div class="category-header">
            <div class="category-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div class="category-status">
              <span :class="['status-badge', category.is_active ? 'active' : 'inactive']">
                {{ category.is_active ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>
          
          <div class="category-content">
            <h3>{{ category.name }}</h3>
            <p class="amharic">{{ category.name_amharic }}</p>
            <div class="category-meta">
              <div class="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                <span>{{ category.menu_items_count || 0 }} items</span>
              </div>
              <div class="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
                <span>Order: {{ category.sort_order }}</span>
              </div>
            </div>
          </div>

          <div class="category-actions">
            <button @click="editCategory(category)" class="btn-icon edit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button @click="deleteCategory(category.id)" class="btn-icon delete">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!adminStore.categories.length" class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
          </svg>
          <h3>No categories yet</h3>
          <p>Create your first category to start organizing your menu</p>
          <button @click="showCreateModal = true" class="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create Category
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || editingCategory" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ editingCategory ? 'Edit Category' : 'Create New Category' }}</h2>
          <button @click="closeModal" class="close-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveCategory" class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>Name (English) *</label>
              <input v-model="formData.name" type="text" required placeholder="e.g., Burgers" />
            </div>
            <div class="form-group">
              <label>Name (Amharic) *</label>
              <input v-model="formData.name_amharic" type="text" required placeholder="e.g., በርገር" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Slug</label>
              <input v-model="formData.slug" type="text" placeholder="e.g., burgers (auto-generated if empty)" />
              <small>URL-friendly identifier</small>
            </div>
            <div class="form-group">
              <label>Sort Order</label>
              <input v-model.number="formData.sort_order" type="number" placeholder="0" />
              <small>Lower numbers appear first</small>
            </div>
          </div>

          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input v-model="formData.is_active" type="checkbox" />
              <span class="checkbox-text">
                <strong>Active</strong>
                <small>Category will be visible to customers</small>
              </span>
            </label>
          </div>

          <div class="modal-footer">
            <button type="button" @click="closeModal" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {{ editingCategory ? 'Update Category' : 'Create Category' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useAdminStore } from '@/stores/adminStore'
import type { Category } from '@/services/menuService'

const adminStore = useAdminStore()
const showCreateModal = ref(false)
const editingCategory = ref<Category | null>(null)

const formData = reactive({
  name: '',
  name_amharic: '',
  slug: '',
  sort_order: 0,
  is_active: true,
})

onMounted(async () => {
  await adminStore.fetchCategories()
})

function editCategory(category: Category) {
  editingCategory.value = category
  formData.name = category.name
  formData.name_amharic = category.name_amharic
  formData.slug = category.slug
  formData.sort_order = category.sort_order
  formData.is_active = category.is_active
}

function closeModal() {
  showCreateModal.value = false
  editingCategory.value = null
  resetForm()
}

function resetForm() {
  formData.name = ''
  formData.name_amharic = ''
  formData.slug = ''
  formData.sort_order = 0
  formData.is_active = true
}

async function saveCategory() {
  try {
    if (editingCategory.value) {
      await adminStore.updateCategory(editingCategory.value.id, formData)
    } else {
      await adminStore.createCategory(formData)
    }
    closeModal()
  } catch (error) {
    console.error('Failed to save category:', error)
    alert('Failed to save category. Please try again.')
  }
}

async function deleteCategory(id: number) {
  if (confirm('Are you sure you want to delete this category? All menu items in this category will also be affected.')) {
    try {
      await adminStore.deleteCategory(id)
    } catch (error) {
      console.error('Failed to delete category:', error)
      alert('Failed to delete category. Please try again.')
    }
  }
}
</script>

<style scoped>
.categories-view {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.page-header h1 {
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
}

.subtitle {
  margin: 0;
  color: #6c757d;
  font-size: 15px;
}

/* Loading */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading p {
  margin-top: 20px;
  color: #6c757d;
}

/* Categories Grid */
.categories-container {
  width: 100%;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.category-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  position: relative;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.category-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.category-icon svg {
  width: 28px;
  height: 28px;
  stroke-width: 2;
}

.category-status {
  display: flex;
  gap: 8px;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.active {
  background: #d4edda;
  color: #155724;
}

.status-badge.inactive {
  background: #f8d7da;
  color: #721c24;
}

.category-content h3 {
  margin: 0 0 8px 0;
  font-size: 22px;
  font-weight: 700;
  color: #2c3e50;
}

.amharic {
  color: #6c757d;
  margin: 0 0 16px 0;
  font-size: 16px;
}

.category-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6c757d;
  font-size: 14px;
}

.meta-item svg {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

.category-actions {
  display: flex;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.btn-icon {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon svg {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}

.btn-icon.edit {
  background: #fff3cd;
  color: #856404;
}

.btn-icon.edit:hover {
  background: #ffc107;
  color: white;
}

.btn-icon.delete {
  background: #f8d7da;
  color: #721c24;
}

.btn-icon.delete:hover {
  background: #dc3545;
  color: white;
}

/* Empty State */
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 80px 20px;
}

.empty-state svg {
  width: 80px;
  height: 80px;
  stroke-width: 1.5;
  color: #dee2e6;
  margin-bottom: 24px;
}

.empty-state h3 {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
}

.empty-state p {
  margin: 0 0 24px 0;
  color: #6c757d;
  font-size: 15px;
}

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #359268;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
}

.btn-primary svg {
  width: 18px;
  height: 18px;
  stroke-width: 2.5;
}

.btn-secondary {
  padding: 12px 24px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #5a6268;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
}

.close-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  transition: all 0.3s;
}

.close-btn:hover {
  background: #e9ecef;
  color: #2c3e50;
}

.close-btn svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.form-group small {
  display: block;
  margin-top: 6px;
  color: #6c757d;
  font-size: 13px;
}

.checkbox-group {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  margin-top: 2px;
  cursor: pointer;
}

.checkbox-text {
  flex: 1;
}

.checkbox-text strong {
  display: block;
  color: #2c3e50;
  font-size: 15px;
  margin-bottom: 4px;
}

.checkbox-text small {
  color: #6c757d;
  font-size: 13px;
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

/* Responsive */
@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .page-header {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
