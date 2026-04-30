<template>
  <div class="admin-container">
    <!-- Sidebar (same as Dashboard) -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <img src="/logo.jpg" alt="Logo" class="sidebar-logo" v-if="!sidebarCollapsed" />
        <h2 class="sidebar-title" v-if="!sidebarCollapsed">Amore Cafe</h2>
        <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/admin/dashboard" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span v-if="!sidebarCollapsed">Dashboard</span>
        </router-link>

        <router-link to="/admin/categories" class="nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>
          </svg>
          <span v-if="!sidebarCollapsed">Categories</span>
        </router-link>

        <router-link to="/admin/menu-items" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span v-if="!sidebarCollapsed">Menu Items</span>
        </router-link>

        <router-link to="/admin/feedback" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span v-if="!sidebarCollapsed">Feedback</span>
          <span v-if="unreadFeedbackCount > 0 && !sidebarCollapsed" class="notification-badge">{{ unreadFeedbackCount }}</span>
        </router-link>

        <router-link to="/admin/settings" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
          </svg>
          <span v-if="!sidebarCollapsed">Settings</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button class="logout-btn" @click="logout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          <span v-if="!sidebarCollapsed">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content" :class="{ expanded: sidebarCollapsed }">
      <!-- Top Bar -->
      <header class="top-bar">
        <div class="top-bar-left">
          <h1 class="page-title">Categories</h1>
        </div>
        <div class="top-bar-right">
          <button class="add-btn" @click="showAddModal = true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Category
          </button>
        </div>
      </header>

      <!-- Categories Content -->
      <div class="dashboard-content">
        <div class="categories-grid">
          <div v-for="category in categories" :key="category.id" class="category-card">
            <div class="category-card-header">
              <div class="category-badge" :class="category.type.toLowerCase()">
                {{ category.type }}
              </div>
              <div class="category-actions">
                <button class="icon-btn" @click="editCategory(category)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button class="icon-btn delete" @click="deleteCategory(category)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </div>
            <h3 class="category-card-title">{{ category.name }}</h3>
            <p class="category-card-subtitle">{{ category.nameAmharic }}</p>
            <div class="category-card-footer">
              <span class="item-count">{{ category.itemCount }} items</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || editingCategory" class="modal-overlay" @click="closeModal">
      <div class="modal-card" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">{{ editingCategory ? 'Edit Category' : 'Add New Category' }}</h2>
          <button class="close-btn" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveCategory" class="modal-form">
          <div class="form-group">
            <label class="form-label">Category Name (English)</label>
            <input
              v-model="formData.name"
              type="text"
              class="form-input"
              placeholder="e.g., Burgers"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">Category Name (Amharic)</label>
            <input
              v-model="formData.nameAmharic"
              type="text"
              class="form-input"
              placeholder="e.g., በርገር"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">Type</label>
            <select v-model="formData.type" class="form-select" required>
              <option value="">Select type</option>
              <option value="Food">Food</option>
              <option value="Drink">Drink</option>
            </select>
          </div>

          <div class="modal-actions">
            <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
            <button type="submit" class="save-btn">
              {{ editingCategory ? 'Update' : 'Add' }} Category
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useFeedbackCount } from '@/composables/useFeedbackCount';
import { useMenuStore } from '@/stores/menuStore';
import api from '@/services/api';

const router = useRouter();
const { unreadCount: unreadFeedbackCount } = useFeedbackCount();
const menuStore = useMenuStore();
const sidebarCollapsed = ref(false);
const showAddModal = ref(false);
const editingCategory = ref<any>(null);
const loading = ref(false);
const error = ref('');

const formData = ref({
  name: '',
  nameAmharic: '',
  type: ''
});

const categories = ref<any[]>([]);

onMounted(async () => {
  await loadCategories();
});

const loadCategories = async () => {
  loading.value = true;
  error.value = '';
  try {
    const response = await api.get('/admin/categories');
    categories.value = response.data.data.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      nameAmharic: cat.name_amharic || '',
      slug: cat.slug,
      type: cat.slug === 'juice-shake' ? 'Drink' : 'Food',
      itemCount: cat.menu_items_count || 0
    }));
  } catch (err: any) {
    error.value = err.message || 'Failed to load categories';
    console.error('Failed to load categories:', err);
  } finally {
    loading.value = false;
  }
};

const editCategory = async (category: any) => {
  editingCategory.value = category;
  formData.value = {
    name: category.name,
    nameAmharic: category.nameAmharic,
    type: category.type
  };
};

const deleteCategory = async (category: any) => {
  if (!confirm(`Are you sure you want to delete "${category.name}"?`)) {
    return;
  }

  try {
    await api.delete(`/categories/${category.id}`);
    await loadCategories();
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to delete category');
    console.error('Failed to delete category:', err);
  }
};

const saveCategory = async () => {
  try {
    const slug = formData.value.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const categoryData = {
      name: formData.value.name,
      name_amharic: formData.value.nameAmharic,
      slug: slug,
      is_active: true
    };

    if (editingCategory.value) {
      // Update existing category
      await api.put(`/categories/${editingCategory.value.id}`, categoryData);
    } else {
      // Add new category
      await api.post('/categories', categoryData);
    }
    
    await loadCategories();
    closeModal();
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to save category');
    console.error('Failed to save category:', err);
  }
};

const closeModal = () => {
  showAddModal.value = false;
  editingCategory.value = null;
  formData.value = {
    name: '',
    nameAmharic: '',
    type: ''
  };
};

const logout = () => {
  localStorage.removeItem('admin_token');
  router.push('/admin/login');
};
</script>

<style scoped src="./admin.css"></style>
<style scoped>
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.category-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s;
}

.category-card:hover {
  border-color: #3a3a3a;
  transform: translateY(-2px);
}

.category-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.category-badge {
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.category-badge.food {
  background: rgba(74, 222, 128, 0.1);
  color: #4ade80;
}

.category-badge.drink {
  background: rgba(147, 197, 253, 0.1);
  color: #93c5fd;
}

.category-actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  width: 32px;
  height: 32px;
  background: #2a2a2a;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  transition: all 0.3s;
}

.icon-btn:hover {
  background: #3a3a3a;
  color: #fff;
}

.icon-btn.delete:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.icon-btn svg {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

.category-card-title {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px 0;
}

.category-card-subtitle {
  font-size: 14px;
  color: #999;
  margin: 0 0 16px 0;
}

.category-card-footer {
  padding-top: 16px;
  border-top: 1px solid #2a2a2a;
}

.item-count {
  font-size: 14px;
  font-weight: 600;
  color: #fbbf24;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #fbbf24;
  border: none;
  border-radius: 12px;
  color: #000;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
}

.add-btn:hover {
  background: #fcd34d;
}

.add-btn svg {
  width: 18px;
  height: 18px;
  stroke-width: 2.5;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s;
}

.modal-card {
  width: 100%;
  max-width: 500px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  padding: 32px;
  animation: slideUp 0.3s;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  background: #2a2a2a;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  transition: all 0.3s;
}

.close-btn:hover {
  background: #3a3a3a;
  color: #fff;
}

.close-btn svg {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.form-input,
.form-select {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  transition: all 0.3s;
}

.form-input:focus,
.form-select:focus {
  border-color: #fbbf24;
  background: #333;
  outline: none;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 20px;
  padding-right: 40px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.cancel-btn,
.save-btn {
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
}

.cancel-btn {
  background: #2a2a2a;
  color: #999;
}

.cancel-btn:hover {
  background: #3a3a3a;
  color: #fff;
}

.save-btn {
  background: #fbbf24;
  color: #000;
}

.save-btn:hover {
  background: #fcd34d;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
