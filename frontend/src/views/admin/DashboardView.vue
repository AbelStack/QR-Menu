<template>
  <div class="admin-container">
    <!-- Sidebar -->
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
        <router-link to="/admin/dashboard" class="nav-item" :class="{ active: $route.path === '/admin/dashboard' }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span v-if="!sidebarCollapsed">Dashboard</span>
        </router-link>

        <router-link to="/admin/categories" class="nav-item" :class="{ active: $route.path === '/admin/categories' }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>
          </svg>
          <span v-if="!sidebarCollapsed">Categories</span>
        </router-link>

        <router-link to="/admin/menu-items" class="nav-item" :class="{ active: $route.path === '/admin/menu-items' }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span v-if="!sidebarCollapsed">Menu Items</span>
        </router-link>

        <router-link to="/admin/feedback" class="nav-item" :class="{ active: $route.path === '/admin/feedback' }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span v-if="!sidebarCollapsed">Feedback</span>
          <span v-if="unreadFeedbackCount > 0 && !sidebarCollapsed" class="notification-badge">{{ unreadFeedbackCount }}</span>
        </router-link>

        <router-link to="/admin/settings" class="nav-item" :class="{ active: $route.path === '/admin/settings' }">
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
          <h1 class="page-title">Dashboard</h1>
        </div>
        <div class="top-bar-right">
          <div class="admin-profile">
            <div class="admin-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div class="admin-info">
              <span class="admin-name">Admin</span>
              <span class="admin-role">Administrator</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <div class="dashboard-content">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading dashboard...</p>
        </div>

        <!-- Stats Cards -->
        <div v-else class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(251, 191, 36, 0.1);">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24">
                <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>
              </svg>
            </div>
            <div class="stat-content">
              <p class="stat-label">Total Categories</p>
              <h3 class="stat-value">{{ stats.totalCategories }}</h3>
              <p class="stat-change positive">All menu categories</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(74, 222, 128, 0.1);">
              <svg viewBox="0 0 24 24" fill="none" stroke="#4ade80">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div class="stat-content">
              <p class="stat-label">Food Categories</p>
              <h3 class="stat-value">{{ stats.foodCategories }}</h3>
              <p class="stat-change positive">Burgers, Pizza, Sandwich, etc.</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(147, 197, 253, 0.1);">
              <svg viewBox="0 0 24 24" fill="none" stroke="#93c5fd">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                <line x1="6" y1="1" x2="6" y2="4"/>
                <line x1="10" y1="1" x2="10" y2="4"/>
                <line x1="14" y1="1" x2="14" y2="4"/>
              </svg>
            </div>
            <div class="stat-content">
              <p class="stat-label">Drink Categories</p>
              <h3 class="stat-value">{{ stats.drinkCategories }}</h3>
              <p class="stat-change positive">Juice & Shake</p>
            </div>
          </div>
        </div>

        <!-- Recent Orders & Popular Items -->
        <div class="content-grid">
          <!-- Category Breakdown -->
          <div class="content-card">
            <div class="card-header">
              <h3 class="card-title">Category Breakdown</h3>
              <router-link to="/admin/categories" class="view-all-btn">Manage</router-link>
            </div>
            <div class="category-list">
              <div v-for="category in categories" :key="category.id" class="category-item">
                <div class="category-info">
                  <p class="category-name">{{ category.name }}</p>
                  <p class="category-type">{{ category.type }}</p>
                </div>
                <div class="category-count">{{ category.itemCount }} items</div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="content-card">
            <div class="card-header">
              <h3 class="card-title">Quick Actions</h3>
            </div>
            <div class="actions-list">
              <router-link to="/admin/categories" class="action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>
                </svg>
                <div class="action-content">
                  <p class="action-title">Manage Categories</p>
                  <p class="action-desc">Add or edit food & drink categories</p>
                </div>
              </router-link>

              <router-link to="/admin/menu-items" class="action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <div class="action-content">
                  <p class="action-title">View Menu Items</p>
                  <p class="action-desc">Browse all menu items by category</p>
                </div>
              </router-link>

              <router-link to="/admin/settings" class="action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
                </svg>
                <div class="action-content">
                  <p class="action-title">Settings</p>
                  <p class="action-desc">Update cafe info & change password</p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const sidebarCollapsed = ref(false);
const unreadFeedbackCount = ref(0);
const categories = ref<any[]>([]);
const loading = ref(false);

const stats = computed(() => {
  const totalCategories = categories.value.length;
  const drinkCategories = categories.value.filter(cat => cat.type === 'Drink').length;
  const foodCategories = totalCategories - drinkCategories;
  
  return {
    totalCategories,
    foodCategories,
    drinkCategories
  };
});

const loadCategories = async () => {
  loading.value = true;
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
  } catch (err) {
    console.error('Failed to load categories:', err);
  } finally {
    loading.value = false;
  }
};

const loadFeedbackCount = async () => {
  try {
    const response = await api.get('/admin/feedback/statistics');
    unreadFeedbackCount.value = response.data.data.unread;
  } catch (err) {
    console.error('Failed to load feedback count:', err);
  }
};

onMounted(async () => {
  await loadCategories();
  await loadFeedbackCount();
  
  // Refresh counts every 30 seconds
  setInterval(() => {
    loadCategories();
    loadFeedbackCount();
  }, 30000);
});

const logout = () => {
  localStorage.removeItem('admin_token');
  router.push('/admin/login');
};
</script>

<style scoped src="./admin.css"></style>
