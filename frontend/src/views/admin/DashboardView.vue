<template>
  <div class="dashboard">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1>Dashboard</h1>
        <p class="subtitle">Welcome back! Here's what's happening with your menu today.</p>
      </div>
      <button @click="refreshData" class="refresh-btn" :disabled="loading">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" :class="{ spinning: loading }">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
        </svg>
        Refresh
      </button>
    </div>

    <div v-if="loading && !adminStore.categories.length" class="loading-state">
      <div class="spinner"></div>
      <p>Loading dashboard...</p>
    </div>

    <div v-else>
      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon categories">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Total Categories</p>
            <h3 class="stat-value">{{ adminStore.categories.length }}</h3>
            <p class="stat-change positive">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
              Active and organized
            </p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon items">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Total Menu Items</p>
            <h3 class="stat-value">{{ adminStore.menuItems.length }}</h3>
            <p class="stat-change">
              {{ availableItems }} available
            </p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon available">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Available Items</p>
            <h3 class="stat-value">{{ availableItems }}</h3>
            <p class="stat-change positive">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
              {{ availablePercentage }}% of total
            </p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon featured">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Featured Items</p>
            <h3 class="stat-value">{{ featuredItems }}</h3>
            <p class="stat-change">
              Highlighted for customers
            </p>
          </div>
        </div>
      </div>

      <!-- Quick Actions & Recent Activity -->
      <div class="content-grid">
        <!-- Quick Actions -->
        <div class="card quick-actions-card">
          <div class="card-header">
            <h2>Quick Actions</h2>
            <p>Common tasks and shortcuts</p>
          </div>
          <div class="quick-actions">
            <router-link to="/admin/menu-items" class="action-btn primary">
              <div class="action-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </div>
              <div class="action-content">
                <h3>Add Menu Item</h3>
                <p>Create a new dish or drink</p>
              </div>
            </router-link>

            <router-link to="/admin/categories" class="action-btn secondary">
              <div class="action-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div class="action-content">
                <h3>Manage Categories</h3>
                <p>Organize your menu</p>
              </div>
            </router-link>

            <router-link to="/admin/settings" class="action-btn tertiary">
              <div class="action-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
                </svg>
              </div>
              <div class="action-content">
                <h3>Restaurant Settings</h3>
                <p>Update your information</p>
              </div>
            </router-link>

            <router-link to="/" class="action-btn view">
              <div class="action-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div class="action-content">
                <h3>View Customer Menu</h3>
                <p>See what customers see</p>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Categories Overview -->
        <div class="card categories-overview">
          <div class="card-header">
            <h2>Categories Overview</h2>
            <router-link to="/admin/categories" class="view-all">View All →</router-link>
          </div>
          <div class="categories-list">
            <div v-for="category in topCategories" :key="category.id" class="category-item">
              <div class="category-info">
                <h4>{{ category.name }}</h4>
                <p>{{ category.name_amharic }}</p>
              </div>
              <div class="category-stats">
                <span class="item-count">{{ category.menu_items_count || 0 }} items</span>
                <span :class="['status-badge', category.is_active ? 'active' : 'inactive']">
                  {{ category.is_active ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </div>
            <div v-if="!topCategories.length" class="empty-state-small">
              <p>No categories yet</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Items -->
      <div class="card recent-items">
        <div class="card-header">
          <h2>Recent Menu Items</h2>
          <router-link to="/admin/menu-items" class="view-all">View All →</router-link>
        </div>
        <div class="items-grid">
          <div v-for="item in recentItems" :key="item.id" class="item-card-small">
            <div class="item-image-small">
              <img v-if="item.image" :src="item.image" :alt="item.name" />
              <div v-else class="image-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
            </div>
            <div class="item-info-small">
              <h4>{{ item.name }}</h4>
              <p class="item-category">{{ item.category?.name }}</p>
              <div class="item-meta-small">
                <span class="price">{{ item.price ? `${item.price} ETB` : 'Price varies' }}</span>
                <span :class="['status-dot', item.is_available ? 'available' : 'unavailable']"></span>
              </div>
            </div>
          </div>
          <div v-if="!recentItems.length" class="empty-state-small">
            <p>No menu items yet</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAdminStore } from '@/stores/adminStore'

const adminStore = useAdminStore()
const loading = ref(true)

const availableItems = computed(() => {
  return adminStore.menuItems.filter(item => item.is_available).length
})

const featuredItems = computed(() => {
  return adminStore.menuItems.filter(item => item.is_featured).length
})

const availablePercentage = computed(() => {
  if (adminStore.menuItems.length === 0) return 0
  return Math.round((availableItems.value / adminStore.menuItems.length) * 100)
})

const topCategories = computed(() => {
  return adminStore.categories.slice(0, 5)
})

const recentItems = computed(() => {
  return adminStore.menuItems.slice(0, 6)
})

async function refreshData() {
  loading.value = true
  try {
    await adminStore.loadAll()
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await refreshData()
})
</script>

<style scoped>
.dashboard {
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

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  color: #495057;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.refresh-btn:hover:not(:disabled) {
  border-color: #42b983;
  color: #42b983;
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.refresh-btn svg {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}

.refresh-btn svg.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Loading State */
.loading-state {
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

.loading-state p {
  margin-top: 20px;
  color: #6c757d;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 20px;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 28px;
  height: 28px;
  stroke-width: 2;
}

.stat-icon.categories {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.stat-icon.items {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.stat-icon.available {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.stat-icon.featured {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-label {
  margin: 0 0 8px 0;
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
}

.stat-value {
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
}

.stat-change {
  margin: 0;
  font-size: 13px;
  color: #6c757d;
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-change.positive {
  color: #28a745;
}

.stat-change svg {
  width: 14px;
  height: 14px;
  stroke-width: 2;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

/* Card */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-header {
  padding: 24px 24px 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0 0 4px 0;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.card-header p {
  margin: 0;
  font-size: 13px;
  color: #6c757d;
}

.view-all {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s;
}

.view-all:hover {
  color: #359268;
}

/* Quick Actions */
.quick-actions {
  padding: 16px;
  display: grid;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.action-btn.secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.action-btn.tertiary {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.action-btn.view {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: white;
}

.action-btn:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-icon svg {
  width: 24px;
  height: 24px;
  stroke-width: 2;
}

.action-content h3 {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
}

.action-content p {
  margin: 0;
  font-size: 13px;
  opacity: 0.9;
}

/* Categories Overview */
.categories-list {
  padding: 16px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 8px;
  background: #f8f9fa;
  transition: all 0.3s;
}

.category-item:hover {
  background: #e9ecef;
}

.category-info h4 {
  margin: 0 0 4px 0;
  font-size: 15px;
  font-weight: 600;
  color: #2c3e50;
}

.category-info p {
  margin: 0;
  font-size: 13px;
  color: #6c757d;
}

.category-stats {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-count {
  font-size: 13px;
  color: #6c757d;
  font-weight: 500;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.active {
  background: #d4edda;
  color: #155724;
}

.status-badge.inactive {
  background: #f8d7da;
  color: #721c24;
}

/* Recent Items */
.recent-items {
  grid-column: 1 / -1;
}

.items-grid {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.item-card-small {
  background: #f8f9fa;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
}

.item-card-small:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.item-image-small {
  width: 100%;
  height: 140px;
  overflow: hidden;
  background: #e9ecef;
}

.item-image-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #adb5bd;
}

.image-placeholder svg {
  width: 40px;
  height: 40px;
  stroke-width: 1.5;
}

.item-info-small {
  padding: 12px;
}

.item-info-small h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-category {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #6c757d;
}

.item-meta-small {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 14px;
  font-weight: 600;
  color: #42b983;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot.available {
  background: #28a745;
}

.status-dot.unavailable {
  background: #dc3545;
}

.empty-state-small {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  color: #6c757d;
}

/* Responsive */
@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 16px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .items-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
