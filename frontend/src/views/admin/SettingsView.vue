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

        <router-link to="/admin/feedback" class="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span v-if="!sidebarCollapsed">Feedback</span>
          <span v-if="unreadFeedbackCount > 0 && !sidebarCollapsed" class="notification-badge">{{ unreadFeedbackCount }}</span>
        </router-link>

        <router-link to="/admin/settings" class="nav-item active">
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
          <h1 class="page-title">Settings</h1>
        </div>
      </header>

      <!-- Settings Content -->
      <div class="dashboard-content">
        <div class="settings-grid">
          <!-- Cafe Information -->
          <div class="settings-card">
            <div class="settings-card-header">
              <h3 class="settings-card-title">Cafe Information</h3>
              <p class="settings-card-subtitle">Update your cafe details displayed in About Us page</p>
            </div>

            <form @submit.prevent="saveCafeInfo" class="settings-form">
              <div class="form-group">
                <label class="form-label">Cafe Name</label>
                <input
                  v-model="cafeInfo.name"
                  type="text"
                  class="form-input"
                  placeholder="Amore Cafe"
                  required
                />
              </div>

              <div class="form-group">
                <label class="form-label">Tagline</label>
                <input
                  v-model="cafeInfo.tagline"
                  type="text"
                  class="form-input"
                  placeholder="Premium Dining Experience"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Short Description</label>
                <textarea
                  v-model="cafeInfo.description"
                  class="form-textarea"
                  rows="3"
                  placeholder="Brief description for hero section..."
                ></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">Our Story</label>
                <textarea
                  v-model="cafeInfo.story"
                  class="form-textarea"
                  rows="5"
                  placeholder="Tell your cafe's story..."
                ></textarea>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Our Mission</label>
                  <textarea
                    v-model="cafeInfo.mission"
                    class="form-textarea"
                    rows="4"
                    placeholder="Your mission statement..."
                  ></textarea>
                </div>

                <div class="form-group">
                  <label class="form-label">Our Vision</label>
                  <textarea
                    v-model="cafeInfo.vision"
                    class="form-textarea"
                    rows="4"
                    placeholder="Your vision statement..."
                  ></textarea>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Phone</label>
                  <input
                    v-model="cafeInfo.phone"
                    type="tel"
                    class="form-input"
                    placeholder="+251 11 123 4567"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input
                    v-model="cafeInfo.email"
                    type="email"
                    class="form-input"
                    placeholder="info@amorecafe.com"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Full Address</label>
                <input
                  v-model="cafeInfo.address"
                  type="text"
                  class="form-input"
                  placeholder="Street address, City, Country"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Location (Short)</label>
                <input
                  v-model="cafeInfo.location"
                  type="text"
                  class="form-input"
                  placeholder="Addis Ababa, Ethiopia"
                />
              </div>

              <div class="form-section-title">Opening Hours</div>

              <div class="form-group">
                <label class="form-label">Monday - Friday</label>
                <input
                  v-model="cafeInfo.hours_weekday"
                  type="text"
                  class="form-input"
                  placeholder="8:00 AM - 10:00 PM"
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Saturday</label>
                  <input
                    v-model="cafeInfo.hours_saturday"
                    type="text"
                    class="form-input"
                    placeholder="9:00 AM - 11:00 PM"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Sunday</label>
                  <input
                    v-model="cafeInfo.hours_sunday"
                    type="text"
                    class="form-input"
                    placeholder="9:00 AM - 9:00 PM"
                  />
                </div>
              </div>

              <div class="form-section-title">Social Media</div>

              <div class="form-group">
                <label class="form-label">Facebook URL</label>
                <input
                  v-model="cafeInfo.facebook_url"
                  type="url"
                  class="form-input"
                  placeholder="https://facebook.com/amorecafe"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Instagram URL</label>
                <input
                  v-model="cafeInfo.instagram_url"
                  type="url"
                  class="form-input"
                  placeholder="https://instagram.com/amorecafe"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Twitter URL</label>
                <input
                  v-model="cafeInfo.twitter_url"
                  type="url"
                  class="form-input"
                  placeholder="https://twitter.com/amorecafe"
                />
              </div>

              <button type="submit" class="save-btn" :disabled="saving">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                {{ saving ? 'Saving...' : 'Save Changes' }}
              </button>
            </form>
          </div>

          <!-- Change Password -->
          <div class="settings-card">
            <div class="settings-card-header">
              <h3 class="settings-card-title">Change Password</h3>
              <p class="settings-card-subtitle">Update your admin password</p>
            </div>

            <form @submit.prevent="changePassword" class="settings-form">
              <div class="form-group">
                <label class="form-label">Current Password</label>
                <input
                  v-model="passwordForm.current"
                  type="password"
                  class="form-input"
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div class="form-group">
                <label class="form-label">New Password</label>
                <input
                  v-model="passwordForm.new"
                  type="password"
                  class="form-input"
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div class="form-group">
                <label class="form-label">Confirm New Password</label>
                <input
                  v-model="passwordForm.confirm"
                  type="password"
                  class="form-input"
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <button type="submit" class="save-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Update Password
              </button>
            </form>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="showSuccess" class="success-toast">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          {{ successMessage }}
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useFeedbackCount } from '@/composables/useFeedbackCount';
import api from '@/services/api';

const router = useRouter();
const { unreadCount: unreadFeedbackCount } = useFeedbackCount();
const sidebarCollapsed = ref(false);
const showSuccess = ref(false);
const successMessage = ref('');
const loading = ref(false);
const saving = ref(false);

const cafeInfo = ref({
  name: '',
  tagline: '',
  description: '',
  story: '',
  mission: '',
  vision: '',
  phone: '',
  email: '',
  address: '',
  location: '',
  facebook_url: '',
  instagram_url: '',
  twitter_url: '',
  hours_weekday: '',
  hours_saturday: '',
  hours_sunday: ''
});

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
});

// Load settings from API
const loadSettings = async () => {
  loading.value = true;
  try {
    const response = await api.get('/admin/settings');
    const settings = response.data.data;
    
    cafeInfo.value = {
      name: settings.name || '',
      tagline: settings.tagline || '',
      description: settings.description || '',
      story: settings.story || '',
      mission: settings.mission || '',
      vision: settings.vision || '',
      phone: settings.phone || '',
      email: settings.email || '',
      address: settings.address || '',
      location: settings.location || '',
      facebook_url: settings.facebook_url || '',
      instagram_url: settings.instagram_url || '',
      twitter_url: settings.twitter_url || '',
      hours_weekday: settings.hours_weekday || '',
      hours_saturday: settings.hours_saturday || '',
      hours_sunday: settings.hours_sunday || ''
    };
  } catch (err: any) {
    console.error('Failed to load settings:', err);
    // Fallback to default values if API fails
    cafeInfo.value = {
      name: 'Amore Cafe',
      tagline: 'Premium Dining Experience',
      description: 'Welcome to Amore Cafe, where every dish is crafted with love and the finest ingredients.',
      story: '',
      mission: '',
      vision: '',
      phone: '+251 11 123 4567',
      email: 'info@amorecafe.com',
      address: 'Addis Ababa, Ethiopia',
      location: 'Addis Ababa, Ethiopia',
      facebook_url: '',
      instagram_url: '',
      twitter_url: '',
      hours_weekday: '8:00 AM - 10:00 PM',
      hours_saturday: '9:00 AM - 11:00 PM',
      hours_sunday: '9:00 AM - 9:00 PM'
    };
  } finally {
    loading.value = false;
  }
};

const saveCafeInfo = async () => {
  saving.value = true;
  try {
    await api.put('/admin/settings', cafeInfo.value);
    showSuccessMessage('Cafe information updated successfully!');
  } catch (err: any) {
    console.error('Failed to save settings:', err);
    alert(err.response?.data?.message || 'Failed to save settings');
  } finally {
    saving.value = false;
  }
};

const changePassword = async () => {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    alert('New passwords do not match!');
    return;
  }

  if (passwordForm.value.new.length < 6) {
    alert('Password must be at least 6 characters long!');
    return;
  }

  saving.value = true;
  try {
    await api.post('/auth/change-password', {
      current_password: passwordForm.value.current,
      new_password: passwordForm.value.new,
      new_password_confirmation: passwordForm.value.confirm
    });
    
    showSuccessMessage('Password updated successfully!');
    passwordForm.value = {
      current: '',
      new: '',
      confirm: ''
    };
  } catch (err: any) {
    console.error('Failed to change password:', err);
    alert(err.response?.data?.message || 'Failed to change password');
  } finally {
    saving.value = false;
  }
};

const showSuccessMessage = (message: string) => {
  successMessage.value = message;
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000);
};

onMounted(() => {
  loadSettings();
});

const logout = () => {
  localStorage.removeItem('admin_token');
  router.push('/admin/login');
};
</script>

<style scoped src="./admin.css"></style>
<style scoped>
.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;
  max-width: 1200px;
}

.settings-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  padding: 32px;
}

.settings-card-header {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #2a2a2a;
}

.settings-card-title {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px 0;
}

.settings-card-subtitle {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-section-title {
  font-size: 16px;
  font-weight: 700;
  color: #fbbf24;
  margin-top: 12px;
  padding-top: 20px;
  border-top: 1px solid #2a2a2a;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  transition: all 0.3s;
}

.form-input {
  height: 48px;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
  font-family: 'Quicksand', sans-serif;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #fbbf24;
  background: #333;
  outline: none;
}

.save-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 48px;
  background: #fbbf24;
  border: none;
  border-radius: 12px;
  color: #000;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
  margin-top: 8px;
}

.save-btn:hover {
  background: #fcd34d;
}

.save-btn svg {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}

.success-toast {
  position: fixed;
  bottom: 32px;
  right: 32px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.2);
  border-radius: 12px;
  color: #4ade80;
  font-size: 14px;
  font-weight: 500;
  animation: slideIn 0.3s;
  z-index: 1000;
}

.success-toast svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .success-toast {
    bottom: 16px;
    right: 16px;
    left: 16px;
  }
}
</style>
