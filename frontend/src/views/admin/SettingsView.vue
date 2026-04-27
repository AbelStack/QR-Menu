<template>
  <div class="settings-view">
    <h1>Restaurant Settings</h1>

    <div v-if="adminStore.loading" class="loading">Loading...</div>

    <div v-else-if="adminStore.settings" class="settings-form">
      <form @submit.prevent="saveSettings">
        <div class="form-section">
          <h2>Basic Information</h2>
          
          <div class="form-row">
            <div class="form-group">
              <label>Restaurant Name *</label>
              <input v-model="formData.name" type="text" required />
            </div>
            <div class="form-group">
              <label>Tagline</label>
              <input v-model="formData.tagline" type="text" />
            </div>
          </div>

          <div class="form-group">
            <label>Slug *</label>
            <input v-model="formData.slug" type="text" required />
            <small>Used in URLs (e.g., yoursite.com/{{ formData.slug }})</small>
          </div>
        </div>

        <div class="form-section">
          <h2>Contact Information</h2>
          
          <div class="form-row">
            <div class="form-group">
              <label>Phone</label>
              <input v-model="formData.phone" type="tel" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="formData.email" type="email" />
            </div>
          </div>

          <div class="form-group">
            <label>Address</label>
            <textarea v-model="formData.address" rows="3"></textarea>
          </div>
        </div>

        <div class="form-section">
          <h2>Preferences</h2>
          
          <div class="form-row">
            <div class="form-group">
              <label>Currency</label>
              <select v-model="formData.currency">
                <option value="ETB">ETB (Ethiopian Birr)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Language</label>
              <select v-model="formData.language">
                <option value="en">English</option>
                <option value="am">Amharic</option>
              </select>
            </div>
          </div>

          <div class="form-group checkbox">
            <label>
              <input v-model="formData.is_active" type="checkbox" />
              Restaurant is Active
            </label>
          </div>
        </div>

        <div class="form-section">
          <h2>Logo</h2>
          <div v-if="formData.logo" class="logo-preview">
            <img :src="formData.logo" alt="Restaurant Logo" />
          </div>
          <div class="form-group">
            <label>Logo URL</label>
            <input v-model="formData.logo" type="text" />
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="saving">
            {{ saving ? 'Saving...' : 'Save Settings' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import { useAdminStore } from '@/stores/adminStore'

const adminStore = useAdminStore()
const saving = ref(false)

const formData = reactive({
  name: '',
  tagline: '',
  slug: '',
  logo: '',
  phone: '',
  email: '',
  address: '',
  currency: 'ETB',
  language: 'en',
  is_active: true,
})

onMounted(async () => {
  await adminStore.fetchSettings()
  if (adminStore.settings) {
    Object.assign(formData, adminStore.settings)
  }
})

watch(() => adminStore.settings, (settings) => {
  if (settings) {
    Object.assign(formData, settings)
  }
})

async function saveSettings() {
  saving.value = true
  try {
    await adminStore.updateSettings(formData)
    alert('Settings saved successfully!')
  } catch (error) {
    console.error('Failed to save settings:', error)
    alert('Failed to save settings')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.settings-view {
  max-width: 800px;
}

h1 {
  margin-bottom: 30px;
  color: #2c3e50;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.settings-form {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e9ecef;
}

.form-section:last-of-type {
  border-bottom: none;
}

.form-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
  font-size: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
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

.form-group small {
  display: block;
  margin-top: 5px;
  color: #6c757d;
  font-size: 12px;
}

.form-group.checkbox label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-preview {
  margin-bottom: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
}

.logo-preview img {
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.btn-primary {
  background: #42b983;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background: #359268;
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
