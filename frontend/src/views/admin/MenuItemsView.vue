<template>
  <div class="admin-container">
    <!-- Mobile Sidebar Overlay -->
    <div class="sidebar-overlay" :class="{ show: showMobileSidebar }" @click="showMobileSidebar = false"></div>
    
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed, 'show-mobile': showMobileSidebar }">
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

        <router-link to="/admin/categories" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>
          </svg>
          <span v-if="!sidebarCollapsed">Categories</span>
        </router-link>

        <router-link to="/admin/menu-items" class="nav-item active">
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
          <button class="mobile-menu-toggle" @click="showMobileSidebar = !showMobileSidebar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <h1 class="page-title">Menu Items</h1>
        </div>
        <div class="top-bar-right">
          <select v-model="selectedCategory" class="category-filter">
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
          <button class="add-btn" @click="openAddModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Item
          </button>
        </div>
      </header>

      <!-- Menu Items Content -->
      <div class="dashboard-content">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading menu items...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p>{{ error }}</p>
          <button @click="loadMenuItems" class="retry-btn">Retry</button>
        </div>

        <!-- Menu Items by Category -->
        <div v-else>
          <div v-for="category in filteredCategories" :key="category.id" class="category-section">
            <div class="category-section-header">
              <h2 class="category-section-title">{{ category.name }}</h2>
              <span class="item-count-badge">{{ category.items.length }} items</span>
            </div>

            <div class="menu-items-grid">
              <div v-for="item in category.items" :key="item.id" class="menu-item-card">
                <div class="item-image-wrapper">
                  <img 
                    v-if="item.image" 
                    :src="getImageUrl(item.image)" 
                    :alt="item.name"
                    class="item-image"
                    @error="(e) => { console.error('Failed to load image:', item.image); (e.target as HTMLImageElement).style.display = 'none'; }"
                  />
                  <div v-else class="item-image-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                  <div class="item-status" :class="{ available: item.is_available }">
                    {{ item.is_available ? 'Available' : 'Unavailable' }}
                  </div>
                </div>

                <div class="item-details">
                  <h3 class="item-name">{{ item.name }}</h3>
                  <p class="item-name-amharic">{{ item.name_amharic }}</p>
                  <p class="item-description">{{ item.description || 'No description' }}</p>
                  
                  <div class="item-footer">
                    <span class="item-price">{{ item.price }} ETB</span>
                    <div class="item-actions">
                      <button class="icon-btn" title="Edit" @click="openEditModal(item)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button class="icon-btn delete" title="Delete" @click="openDeleteModal(item)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredCategories.length === 0" class="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p>No menu items found</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ isEditing ? 'Edit Menu Item' : 'Add New Menu Item' }}</h2>
          <button class="close-btn" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveItem" class="modal-body">
          <!-- Error Message -->
          <div v-if="formError" class="error-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>{{ formError }}</span>
            <button type="button" @click="formError = ''" class="close-error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <!-- Success Message -->
          <div v-if="formSuccess" class="success-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span>{{ formSuccess }}</span>
          </div>

          <!-- Image Upload -->
          <div class="form-group">
            <label>Item Image</label>
            <div class="image-upload-area">
              <!-- Debug info -->
              <div style="color: yellow; font-size: 11px; margin-bottom: 8px;">
                DEBUG: imagePreview={{ !!imagePreview }}, formData.image={{ !!formData.image }}, imageFile={{ !!imageFile }}, shouldShow={{ shouldShowPreview }}
              </div>
              
              <div v-if="shouldShowPreview" class="image-preview">
                <img 
                  :src="imagePreview || (formData.image ? (formData.image.startsWith('http') ? formData.image : `http://localhost:8000${formData.image}`) : '')" 
                  alt="Preview" 
                  @error="handleImageError"
                  @load="handleImageLoad"
                />
                <button type="button" class="remove-image-btn" @click="removeImage">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <div v-else class="upload-placeholder" @click="triggerFileInput">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <p>Click to upload image</p>
                <span>JPG, PNG, GIF (max 2MB)</span>
              </div>
              <input 
                ref="fileInput"
                type="file" 
                accept="image/jpeg,image/png,image/gif,image/jpg" 
                @change="handleImageUpload"
                style="display: none"
              />
            </div>
            <p v-if="uploadingImage" class="upload-status">Uploading image...</p>
          </div>

          <!-- Category -->
          <div class="form-group">
            <label>Category *</label>
            <select v-model="formData.category_id" required>
              <option value="">Select a category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
            <p v-if="!formData.category_id && formTouched" class="field-error">Category is required</p>
          </div>

          <!-- Name -->
          <div class="form-group">
            <label>Name (English) *</label>
            <input 
              v-model="formData.name" 
              type="text" 
              placeholder="e.g., Margherita Pizza"
              required
              @blur="formTouched = true"
            />
            <p v-if="!formData.name && formTouched" class="field-error">Name is required</p>
          </div>

          <!-- Name Amharic -->
          <div class="form-group">
            <label>Name (Amharic) *</label>
            <input 
              v-model="formData.name_amharic" 
              type="text" 
              placeholder="e.g., ማርጋሪታ ፒዛ"
              required
              @blur="formTouched = true"
            />
            <p v-if="!formData.name_amharic && formTouched" class="field-error">Amharic name is required</p>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label>Description (English)</label>
            <textarea 
              v-model="formData.description" 
              placeholder="Describe the item..."
              rows="3"
            ></textarea>
          </div>

          <!-- Description Amharic -->
          <div class="form-group">
            <label>Description (Amharic)</label>
            <textarea 
              v-model="formData.description_amharic" 
              placeholder="የምግቡን መግለጫ..."
              rows="3"
            ></textarea>
          </div>

          <!-- Ingredients -->
          <div class="form-group">
            <label>Ingredients (English)</label>
            <textarea 
              v-model="formData.ingredients" 
              placeholder="List ingredients separated by commas (e.g., Tomato, Cheese, Basil)"
              rows="2"
            ></textarea>
          </div>

          <!-- Ingredients Amharic -->
          <div class="form-group">
            <label>Ingredients (Amharic)</label>
            <textarea 
              v-model="formData.ingredients_amharic" 
              placeholder="ንጥረ ነገሮችን በኮማ ይለዩ (ለምሳሌ፡ ቲማቲም፣ ቺዝ፣ ባዚል)"
              rows="2"
            ></textarea>
          </div>

          <!-- Price -->
          <div class="form-group">
            <label>Price (ETB)</label>
            <input 
              v-model.number="formData.price" 
              type="number" 
              step="0.01"
              min="0"
              placeholder="0.00"
            />
            <p v-if="formData.price < 0" class="field-error">Price cannot be negative</p>
          </div>

          <!-- Availability -->
          <div class="form-group checkbox-group">
            <label>
              <input type="checkbox" v-model="formData.is_available" />
              <span>Available for customers</span>
            </label>
          </div>

          <!-- Featured -->
          <div class="form-group checkbox-group">
            <label>
              <input type="checkbox" v-model="formData.is_featured" />
              <span>Featured item</span>
            </label>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="closeModal">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="saving">
              {{ saving ? 'Saving...' : (isEditing ? 'Update Item' : 'Add Item') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeDeleteModal">
      <div class="modal modal-small">
        <div class="modal-header">
          <h2>Delete Menu Item</h2>
          <button class="close-btn" @click="closeDeleteModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <div class="delete-confirmation">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="warning-icon">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <p>Are you sure you want to delete <strong>{{ itemToDelete?.name }}</strong>?</p>
            <p class="warning-text">This action cannot be undone.</p>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="closeDeleteModal">Cancel</button>
            <button type="button" class="btn-danger" @click="confirmDelete" :disabled="deleting">
              {{ deleting ? 'Deleting...' : 'Delete Item' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/stores/menuStore';
import { useFeedbackCount } from '@/composables/useFeedbackCount';
import api from '@/services/api';

const router = useRouter();
const menuStore = useMenuStore();
const { unreadCount: unreadFeedbackCount } = useFeedbackCount();
const sidebarCollapsed = ref(false);
const showMobileSidebar = ref(false);
const selectedCategory = ref('');
const loading = ref(false);
const error = ref('');

// Modal states
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const saving = ref(false);
const deleting = ref(false);
const itemToDelete = ref<any>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const imagePreview = ref('');
const imageFile = ref<File | null>(null);
const formError = ref('');
const formSuccess = ref('');
const formTouched = ref(false);
const uploadingImage = ref(false);

// Form data
const formData = ref({
  id: null as number | null,
  category_id: '',
  name: '',
  name_amharic: '',
  description: '',
  description_amharic: '',
  ingredients: '',
  ingredients_amharic: '',
  price: 0,
  image: '',
  is_available: true,
  is_featured: false,
});

const categories = computed(() => menuStore.categories);

const filteredCategories = computed(() => {
  const categoriesWithItems = menuStore.categoriesWithItems;
  
  if (selectedCategory.value) {
    return categoriesWithItems.filter(cat => cat.id === parseInt(selectedCategory.value));
  }
  
  return categoriesWithItems;
});

// Debug computed for image preview
const shouldShowPreview = computed(() => {
  const result = !!(imagePreview.value || (formData.value.image && !imageFile.value));
  console.log('shouldShowPreview computed:', {
    result,
    hasImagePreview: !!imagePreview.value,
    hasFormDataImage: !!formData.value.image,
    hasImageFile: !!imageFile.value,
    imagePreviewLength: imagePreview.value?.length,
    formDataImage: formData.value.image
  });
  return result;
});

const loadMenuItems = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    await menuStore.loadAll();
  } catch (err: any) {
    error.value = err.message || 'Failed to load menu items';
  } finally {
    loading.value = false;
  }
};

// Modal functions
const openAddModal = () => {
  isEditing.value = false;
  resetForm();
  showModal.value = true;
};

const openEditModal = (item: any) => {
  console.log('Opening edit modal for item:', item.name, 'Image:', item.image);
  isEditing.value = true;
  formData.value = {
    id: item.id,
    category_id: item.category_id,
    name: item.name,
    name_amharic: item.name_amharic || '',
    description: item.description || '',
    description_amharic: item.description_amharic || '',
    ingredients: item.ingredients || '',
    ingredients_amharic: item.ingredients_amharic || '',
    price: item.price || 0,
    image: item.image || '',
    is_available: item.is_available !== false,
    is_featured: item.is_featured || false,
  };
  imagePreview.value = '';
  imageFile.value = null;
  formError.value = '';
  formSuccess.value = '';
  formTouched.value = false;
  console.log('formData.image set to:', formData.value.image);
  showModal.value = true;
};

const openDeleteModal = (item: any) => {
  itemToDelete.value = item;
  showDeleteModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  setTimeout(() => {
    resetForm();
  }, 300);
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  itemToDelete.value = null;
};

const resetForm = () => {
  formData.value = {
    id: null,
    category_id: '',
    name: '',
    name_amharic: '',
    description: '',
    description_amharic: '',
    ingredients: '',
    ingredients_amharic: '',
    price: 0,
    image: '',
    is_available: true,
    is_featured: false,
  };
  imagePreview.value = '';
  imageFile.value = null;
  formError.value = '';
  formSuccess.value = '';
  formTouched.value = false;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  console.log('=== handleImageUpload called ===');
  console.log('File:', file);
  
  if (!file) {
    console.log('No file selected');
    return;
  }
  
  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    console.log('Invalid file type:', file.type);
    formError.value = 'Invalid file type. Please upload JPG, PNG, or GIF image.';
    if (fileInput.value) {
      fileInput.value.value = '';
    }
    return;
  }
  
  // Validate file size (2MB)
  if (file.size > 2 * 1024 * 1024) {
    console.log('File too large:', file.size);
    formError.value = 'Image size must be less than 2MB. Please choose a smaller image.';
    if (fileInput.value) {
      fileInput.value.value = '';
    }
    return;
  }
  
  // Clear any previous errors
  formError.value = '';
  
  // Store the file
  imageFile.value = file;
  console.log('imageFile.value set to:', imageFile.value?.name);
  
  console.log('Reading file:', file.name, 'Size:', file.size, 'Type:', file.type);
  
  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target?.result as string;
    console.log('=== FileReader onload ===');
    console.log('Result type:', typeof result);
    console.log('Result length:', result?.length);
    console.log('Result preview:', result?.substring(0, 100));
    
    imagePreview.value = result;
    
    console.log('imagePreview.value after assignment:', imagePreview.value?.substring(0, 100));
    console.log('imagePreview.value length:', imagePreview.value?.length);
    
    // Force a re-render
    console.log('Current reactive state:');
    console.log('- imagePreview:', !!imagePreview.value);
    console.log('- imageFile:', !!imageFile.value);
    console.log('- formData.image:', formData.value.image);
  };
  reader.onerror = (error) => {
    console.error('=== FileReader error ===', error);
    formError.value = 'Failed to read image file. Please try again.';
    imageFile.value = null;
  };
  
  console.log('Starting FileReader.readAsDataURL...');
  reader.readAsDataURL(file);
  console.log('FileReader.readAsDataURL called');
};

const removeImage = () => {
  imagePreview.value = '';
  imageFile.value = null;
  formData.value.image = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  formError.value = '';
};

const handleImageError = (event: Event) => {
  console.error('=== Image Load Error ===');
  console.error('formData.image:', formData.value.image);
  const img = event.target as HTMLImageElement;
  console.error('Failed src:', img.src);
  console.error('imagePreview:', imagePreview.value?.substring(0, 100));
};

const handleImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement;
  console.log('=== Image Loaded Successfully ===');
  console.log('Loaded src:', img.src);
  console.log('Image dimensions:', img.naturalWidth, 'x', img.naturalHeight);
};

const uploadImage = async (): Promise<string> => {
  if (!imageFile.value) return formData.value.image;
  
  uploadingImage.value = true;
  const formDataToSend = new FormData();
  formDataToSend.append('image', imageFile.value);
  
  try {
    console.log('Uploading image:', imageFile.value.name, 'Size:', imageFile.value.size);
    
    const response = await api.post('/admin/menu-items/upload-image', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('Upload response:', response.data);
    uploadingImage.value = false;
    
    // Return the URL from response
    return response.data.url || response.data.path;
  } catch (err: any) {
    uploadingImage.value = false;
    console.error('Image upload failed:', err);
    console.error('Error response:', err.response?.data);
    console.error('Error code:', err.code);
    
    let errorMsg = 'Failed to upload image';
    
    // Handle timeout errors specifically
    if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
      errorMsg = 'Upload timeout. The image is taking too long to upload. Please try:\n' +
                 '1. Use a smaller image (compress it first)\n' +
                 '2. Check your internet connection\n' +
                 '3. Try again in a moment';
    } else if (err.response?.data?.message) {
      errorMsg = err.response.data.message;
    } else if (err.response?.data?.errors) {
      const errors = err.response.data.errors;
      const firstError = Object.values(errors)[0];
      if (Array.isArray(firstError)) {
        errorMsg = firstError[0] as string;
      }
    } else if (err.message) {
      errorMsg = err.message;
    }
    
    throw new Error(errorMsg);
  }
};

const saveItem = async () => {
  // Validate required fields
  formTouched.value = true;
  
  if (!formData.value.category_id) {
    formError.value = 'Please select a category';
    return;
  }
  
  if (!formData.value.name.trim()) {
    formError.value = 'Please enter item name in English';
    return;
  }
  
  if (!formData.value.name_amharic.trim()) {
    formError.value = 'Please enter item name in Amharic';
    return;
  }
  
  if (formData.value.price < 0) {
    formError.value = 'Price cannot be negative';
    return;
  }
  
  saving.value = true;
  formError.value = '';
  
  try {
    // Upload image if there's a new one
    let imageUrl = formData.value.image;
    if (imageFile.value) {
      try {
        imageUrl = await uploadImage();
      } catch (err: any) {
        formError.value = err.message || 'Failed to upload image';
        saving.value = false;
        return;
      }
    }
    
    const dataToSend = {
      ...formData.value,
      image: imageUrl,
      category_id: parseInt(formData.value.category_id as any),
    };
    
    if (isEditing.value && formData.value.id) {
      // Update existing item
      await api.put(`/admin/menu-items/${formData.value.id}`, dataToSend);
      formSuccess.value = 'Menu item updated successfully!';
      
      // Clear cache and reload to show updates immediately
      menuStore.clearCache();
      await menuStore.loadAll();
    } else {
      // Create new item
      await api.post('/admin/menu-items', dataToSend);
      formSuccess.value = 'Menu item added successfully!';
      
      // Clear cache and reload to show new item immediately
      menuStore.clearCache();
      await menuStore.loadAll();
    }
    
    // Close modal after short delay to show success message
    setTimeout(() => {
      closeModal();
    }, 1500);
  } catch (err: any) {
    console.error('Save failed:', err);
    
    // Extract error message from response
    let errorMessage = 'Failed to save menu item';
    
    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.response?.data?.errors) {
      // Handle validation errors
      const errors = err.response.data.errors;
      const firstError = Object.values(errors)[0];
      if (Array.isArray(firstError) && firstError.length > 0) {
        errorMessage = firstError[0] as string;
      }
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    formError.value = errorMessage;
  } finally {
    saving.value = false;
  }
};

const confirmDelete = async () => {
  if (!itemToDelete.value) return;
  
  deleting.value = true;
  
  try {
    await api.delete(`/admin/menu-items/${itemToDelete.value.id}`);
    
    // Clear cache and reload to show deletion immediately
    menuStore.clearCache();
    await menuStore.loadAll();
    
    closeDeleteModal();
    
    // Show success notification
    console.log('Menu item deleted successfully');
  } catch (err: any) {
    console.error('Delete failed:', err);
    
    // Extract error message
    let errorMessage = 'Failed to delete menu item';
    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    alert(errorMessage);
  } finally {
    deleting.value = false;
  }
};

onMounted(() => {
  loadMenuItems();
});

const logout = () => {
  localStorage.removeItem('admin_token');
  router.push('/admin/login');
};

const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://yummycafe.clearsightinitiative.org';
  return `${baseUrl}${imagePath}`;
};
</script>

<style scoped src="./admin.css"></style>
<style scoped>
.category-filter {
  height: 40px;
  padding: 0 16px;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  min-width: 200px;
}

.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #999;
}

.loading-state .spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #2a2a2a;
  border-top-color: #fbbf24;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state svg,
.empty-state svg {
  width: 64px;
  height: 64px;
  stroke-width: 1.5;
  color: #666;
  margin-bottom: 16px;
}

.error-state p,
.empty-state p {
  font-size: 16px;
  margin: 0;
}

.retry-btn {
  margin-top: 16px;
  padding: 12px 24px;
  background: #fbbf24;
  border: none;
  border-radius: 8px;
  color: #000;
  font-size: 14px;
  font-weight: 600;
}

.category-section {
  margin-bottom: 40px;
}

.category-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #2a2a2a;
}

.category-section-title {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.item-count-badge {
  padding: 6px 12px;
  background: #2a2a2a;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #fbbf24;
}

.menu-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.menu-item-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
}

.menu-item-card:hover {
  border-color: #3a3a3a;
  transform: translateY(-2px);
}

.item-image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  background: #2a2a2a;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.item-image-placeholder svg {
  width: 64px;
  height: 64px;
  stroke-width: 1.5;
}

.item-status {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  background: rgba(239, 68, 68, 0.9);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}

.item-status.available {
  background: rgba(74, 222, 128, 0.9);
}

.item-details {
  padding: 16px;
}

.item-name {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 4px 0;
}

.item-name-amharic {
  font-size: 14px;
  color: #999;
  margin: 0 0 8px 0;
}

.item-description {
  font-size: 13px;
  color: #666;
  margin: 0 0 12px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #2a2a2a;
}

.item-price {
  font-size: 18px;
  font-weight: 700;
  color: #fbbf24;
}

.item-actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  width: 32px;
  height: 32px;
  background: #2a2a2a;
  border: none;
  border-radius: 6px;
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

@media (max-width: 768px) {
  .menu-items-grid {
    grid-template-columns: 1fr;
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
}

.modal {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-small {
  max-width: 450px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #2a2a2a;
}

.modal-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.3s;
}

.close-btn:hover {
  background: #2a2a2a;
  color: #fff;
}

.close-btn svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.modal-body {
  padding: 24px;
}

.error-message,
.success-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  position: relative;
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
}

.success-message {
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.3);
  color: #86efac;
}

.error-message svg,
.success-message svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  stroke-width: 2;
}

.error-message svg {
  color: #ef4444;
}

.success-message svg {
  color: #4ade80;
}

.error-message span,
.success-message span {
  flex: 1;
  line-height: 1.5;
}

.close-error {
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  color: #fca5a5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  flex-shrink: 0;
}

.close-error:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.close-error svg {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

.field-error {
  font-size: 12px;
  color: #ef4444;
  margin: 6px 0 0 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.upload-status {
  font-size: 13px;
  color: #fbbf24;
  margin: 8px 0 0 0;
  font-weight: 500;
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #ef4444;
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8px;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  font-family: 'Quicksand', sans-serif;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #fbbf24;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-group span {
  font-size: 14px;
  color: #ccc;
}

.image-upload-area {
  margin-top: 8px;
}

.image-preview {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 6px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.remove-image-btn:hover {
  background: rgba(239, 68, 68, 0.9);
}

.remove-image-btn svg {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

.upload-placeholder {
  width: 100%;
  height: 200px;
  background: #2a2a2a;
  border: 2px dashed #3a3a3a;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-placeholder:hover {
  border-color: #fbbf24;
  background: #2f2f2f;
}

.upload-placeholder svg {
  width: 48px;
  height: 48px;
  color: #666;
  stroke-width: 1.5;
  margin-bottom: 12px;
}

.upload-placeholder p {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
}

.upload-placeholder span {
  font-size: 12px;
  color: #999;
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #2a2a2a;
}

.btn-primary,
.btn-secondary,
.btn-danger {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #fbbf24;
  color: #000;
}

.btn-primary:hover:not(:disabled) {
  background: #f59e0b;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #2a2a2a;
  color: #fff;
}

.btn-secondary:hover {
  background: #3a3a3a;
}

.btn-danger {
  background: #ef4444;
  color: #fff;
}

.btn-danger:hover:not(:disabled) {
  background: #dc2626;
}

.btn-danger:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.delete-confirmation {
  text-align: center;
  padding: 20px 0;
}

.warning-icon {
  width: 64px;
  height: 64px;
  color: #f59e0b;
  stroke-width: 1.5;
  margin: 0 auto 20px;
}

.delete-confirmation p {
  font-size: 15px;
  color: #ccc;
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.delete-confirmation strong {
  color: #fff;
  font-weight: 700;
}

.warning-text {
  font-size: 13px;
  color: #999;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #fbbf24;
  border: none;
  border-radius: 8px;
  color: #000;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.add-btn:hover {
  background: #f59e0b;
}

.add-btn svg {
  width: 18px;
  height: 18px;
  stroke-width: 2.5;
}

.top-bar-right {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
