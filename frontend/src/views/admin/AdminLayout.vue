<template>
  <div class="admin-layout">
    <!-- Top Navigation Bar -->
    <header class="top-navbar">
      <div class="navbar-left">
        <div class="brand">
          <img v-if="settings?.logo" :src="settings.logo" alt="Logo" class="brand-logo" />
          <span class="brand-name">{{ settings?.name || 'QR Menu' }}</span>
        </div>
      </div>

      <nav class="navbar-center">
        <router-link to="/admin" class="nav-link" exact-active-class="active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          Dashboard
        </router-link>
        <router-link to="/admin/categories" class="nav-link" active-class="active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
          </svg>
          Categories
        </router-link>
        <router-link to="/admin/menu-items" class="nav-link" active-class="active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          Menu Items
        </router-link>
        <router-link to="/admin/settings" class="nav-link" active-class="active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
          </svg>
          Settings
        </router-link>
      </nav>

      <div class="navbar-right">
        <router-link to="/" class="view-menu-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
          </svg>
          View Menu
        </router-link>
        <div class="user-menu">
          <button @click="openLogoutModal" class="logout-btn" :disabled="authStore.loading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
          <div class="user-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="main-content">
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>

    <transition name="modal-fade">
      <div
        v-if="showLogoutModal"
        class="modal-overlay"
        @click="closeLogoutModal"
      >
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="logout-modal-title" @click.stop>
          <div class="modal-icon-wrap">
            <div class="modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
          </div>

          <h3 id="logout-modal-title">Confirm Logout</h3>
          <p>You are about to end your admin session. Do you want to continue?</p>

          <div class="modal-actions">
            <button
              class="modal-btn modal-btn-secondary"
              type="button"
              @click="closeLogoutModal"
              :disabled="isLoggingOut"
            >
              Stay Logged In
            </button>
            <button
              class="modal-btn modal-btn-danger"
              type="button"
              @click="confirmLogout"
              :disabled="isLoggingOut"
            >
              <span v-if="!isLoggingOut">Logout</span>
              <span v-else class="modal-loading">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Logging out...
              </span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { menuService } from '@/services/menuService'
import { useAuthStore } from '@/stores/authStore'
import type { RestaurantSettings } from '@/services/menuService'

const router = useRouter()
const authStore = useAuthStore()
const settings = ref<RestaurantSettings | null>(null)
const showLogoutModal = ref(false)
const isLoggingOut = ref(false)

function openLogoutModal() {
  if (authStore.loading) {
    return
  }
  showLogoutModal.value = true
}

function closeLogoutModal() {
  if (isLoggingOut.value) {
    return
  }
  showLogoutModal.value = false
}

async function confirmLogout() {
  isLoggingOut.value = true
  try {
    await authStore.logout()
    showLogoutModal.value = false
    router.push('/admin/login')
  } catch (error) {
    console.error('Logout failed:', error)
  } finally {
    isLoggingOut.value = false
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && showLogoutModal.value) {
    closeLogoutModal()
  }
}

onMounted(async () => {
  window.addEventListener('keydown', onKeydown)
  try {
    const response = await menuService.getSettings()
    settings.value = response.data
  } catch (error) {
    console.error('Failed to load settings:', error)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background: #f8f9fa;
}

/* Top Navigation Bar */
.top-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: #ffffff;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.navbar-left {
  flex: 0 0 250px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-logo {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
}

.brand-name {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
}

.navbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  color: #6c757d;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.3s;
}

.nav-link svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.nav-link:hover {
  background: #f8f9fa;
  color: #2c3e50;
}

.nav-link.active {
  background: #42b983;
  color: white;
}

.navbar-right {
  flex: 0 0 250px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
}

.view-menu-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #2c3e50;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s;
}

.view-menu-btn svg {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}

.view-menu-btn:hover {
  background: #1a252f;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-btn:hover:not(:disabled) {
  background: #c82333;
  transform: translateY(-1px);
}

.logout-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.logout-btn svg {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: #e9ecef;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s;
}

.user-avatar:hover {
  background: #dee2e6;
}

.user-avatar svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

/* Main Content */
.main-content {
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  padding: 30px;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(8, 15, 28, 0.45);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  width: 100%;
  max-width: 440px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 24px 56px rgba(17, 24, 39, 0.28);
  border: 1px solid #eef2f7;
  padding: 28px;
  text-align: center;
}

.modal-icon-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 14px;
}

.modal-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #b91c1c;
}

.modal-icon svg {
  width: 26px;
  height: 26px;
  stroke-width: 2;
}

.modal-card h3 {
  margin: 0;
  font-size: 24px;
  color: #111827;
}

.modal-card p {
  margin: 10px 0 0;
  color: #4b5563;
  font-size: 15px;
  line-height: 1.5;
}

.modal-actions {
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.modal-btn {
  padding: 11px 14px;
  border-radius: 10px;
  border: 1px solid transparent;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.modal-btn-secondary {
  background: #f8fafc;
  border-color: #e5e7eb;
  color: #334155;
}

.modal-btn-secondary:hover:not(:disabled) {
  background: #f1f5f9;
}

.modal-btn-danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: #ffffff;
  box-shadow: 0 8px 18px rgba(220, 38, 38, 0.25);
}

.modal-btn-danger:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(220, 38, 38, 0.3);
}

.modal-loading {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.modal-loading svg {
  width: 16px;
  height: 16px;
  stroke-width: 2.3;
  animation: spin 0.9s linear infinite;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1200px) {
  .navbar-center {
    gap: 4px;
  }

  .nav-link {
    padding: 10px 15px;
    font-size: 14px;
  }

  .nav-link svg {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 992px) {
  .top-navbar {
    padding: 0 20px;
  }

  .navbar-left,
  .navbar-right {
    flex: 0 0 auto;
  }

  .brand-name {
    display: none;
  }

  .nav-link span {
    display: none;
  }

  .nav-link {
    padding: 10px;
  }

  .view-menu-btn span {
    display: none;
  }

  .view-menu-btn {
    padding: 10px;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 20px 15px;
  }

  .navbar-center {
    gap: 2px;
  }

  .modal-card {
    padding: 22px;
  }

  .modal-actions {
    grid-template-columns: 1fr;
  }
}
</style>
