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

        <router-link to="/admin/menu-items" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span v-if="!sidebarCollapsed">Menu Items</span>
        </router-link>

        <router-link to="/admin/feedback" class="nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span v-if="!sidebarCollapsed">Feedback</span>
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
          <h1 class="page-title">Customer Feedback</h1>
        </div>
        <div class="top-bar-right">
          <select v-model="filterStatus" class="filter-select">
            <option value="">All Feedback</option>
            <option value="unread">Unread</option>
            <option value="unresolved">Unresolved</option>
          </select>
        </div>
      </header>

      <!-- Feedback Content -->
      <div class="dashboard-content">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading feedback...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p>{{ error }}</p>
          <button @click="loadFeedback" class="retry-btn">Retry</button>
        </div>

        <!-- Feedback List -->
        <div v-else>
          <div v-if="feedbackList.length === 0" class="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <p>No feedback yet</p>
          </div>

          <div v-else class="feedback-grid">
            <div 
              v-for="feedback in feedbackList" 
              :key="feedback.id" 
              class="feedback-card"
              :class="{ unread: !feedback.is_read }"
            >
              <div class="feedback-header">
                <div class="feedback-category">
                  <span class="category-badge" :class="`category-${feedback.category}`">
                    {{ feedback.category }}
                  </span>
                  <div class="rating-stars">
                    <svg 
                      v-for="star in 5" 
                      :key="star"
                      viewBox="0 0 24 24" 
                      :fill="star <= feedback.rating ? '#fbbf24' : 'none'"
                      stroke="#fbbf24"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </div>
                </div>
                <div class="feedback-date">
                  {{ formatDate(feedback.created_at) }}
                </div>
              </div>

              <div class="feedback-body">
                <p class="feedback-message">{{ feedback.message }}</p>
              </div>

              <div class="feedback-footer">
                <div class="customer-info" v-if="feedback.customer_name">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>{{ feedback.customer_name }}</span>
                </div>
                
                <div class="feedback-actions">
                  <button 
                    v-if="!feedback.is_read"
                    @click="markAsRead(feedback.id)"
                    class="action-btn"
                    title="Mark as read"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </button>
                  
                  <button 
                    v-if="!feedback.is_resolved"
                    @click="markAsResolved(feedback.id)"
                    class="action-btn"
                    title="Mark as resolved"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </button>
                  
                  <button 
                    @click="deleteFeedback(feedback.id)"
                    class="action-btn delete"
                    title="Delete"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div v-if="feedback.is_resolved" class="resolved-badge">
                ✓ Resolved
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import { useFeedbackCount } from '@/composables/useFeedbackCount';

const router = useRouter();
const sidebarCollapsed = ref(false);
const showMobileSidebar = ref(false);
const loading = ref(false);
const error = ref('');
const feedbackList = ref<any[]>([]);
const filterStatus = ref('');
const { loadFeedbackCount } = useFeedbackCount();

const loadFeedback = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const params: any = {};
    
    if (filterStatus.value === 'unread') {
      params.is_read = false;
    } else if (filterStatus.value === 'unresolved') {
      params.is_resolved = false;
    }
    
    const response = await api.get('/admin/feedback', { params });
    feedbackList.value = response.data.data;
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load feedback';
  } finally {
    loading.value = false;
  }
};

const markAsRead = async (id: number) => {
  try {
    await api.post(`/admin/feedback/${id}/mark-read`);
    await loadFeedback();
    // Refresh the unread count in the notification badge
    await loadFeedbackCount();
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to mark as read');
  }
};

const markAsResolved = async (id: number) => {
  try {
    await api.post(`/admin/feedback/${id}/mark-resolved`);
    await loadFeedback();
    // Refresh the unread count in the notification badge
    await loadFeedbackCount();
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to mark as resolved');
  }
};

const deleteFeedback = async (id: number) => {
  if (!confirm('Are you sure you want to delete this feedback?')) {
    return;
  }
  
  try {
    await api.delete(`/admin/feedback/${id}`);
    await loadFeedback();
    // Refresh the unread count in the notification badge
    await loadFeedbackCount();
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to delete feedback');
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
};

watch(filterStatus, () => {
  loadFeedback();
});

onMounted(() => {
  loadFeedback();
});

const logout = () => {
  localStorage.removeItem('admin_token');
  router.push('/admin/login');
};
</script>

<style scoped src="./admin.css"></style>
<style scoped>
.filter-select {
  height: 40px;
  padding: 0 16px;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  min-width: 180px;
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

.retry-btn {
  margin-top: 16px;
  padding: 12px 24px;
  background: #fbbf24;
  border: none;
  border-radius: 8px;
  color: #000;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.feedback-grid {
  display: grid;
  gap: 20px;
}

.feedback-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  transition: all 0.3s;
}

.feedback-card.unread {
  border-left: 4px solid #fbbf24;
  background: #1f1f1f;
}

.feedback-card:hover {
  border-color: #3a3a3a;
  transform: translateY(-2px);
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.feedback-category {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-badge {
  padding: 4px 12px;
  background: #2a2a2a;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.category-food { color: #10b981; }
.category-service { color: #3b82f6; }
.category-ambiance { color: #8b5cf6; }
.category-other { color: #6b7280; }

.rating-stars {
  display: flex;
  gap: 2px;
}

.rating-stars svg {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

.feedback-date {
  font-size: 13px;
  color: #666;
}

.feedback-body {
  margin-bottom: 16px;
}

.feedback-message {
  font-size: 14px;
  line-height: 1.6;
  color: #ccc;
  margin: 0;
}

.feedback-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #2a2a2a;
}

.customer-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #999;
}

.customer-info svg {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

.feedback-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 32px;
  height: 32px;
  background: #2a2a2a;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  background: #3a3a3a;
  color: #fff;
}

.action-btn.delete:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.action-btn svg {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

.resolved-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 6px 12px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #10b981;
}

@media (max-width: 768px) {
  .feedback-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
