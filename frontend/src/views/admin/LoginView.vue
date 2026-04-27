<template>
  <div class="login-page">
    <!-- Left Side - Branding Section -->
    <div class="branding-side">
      <!-- Background Pattern -->
      <div class="background-pattern"></div>
      
      <!-- Logo Container with Modern Background -->
      <div class="logo-container">
        <div class="logo-background">
          <img src="/logo.jpg" alt="Yummy Cafe Logo" class="company-logo" />
        </div>
      </div>

      <!-- Company Information -->
      <div class="company-info">
        <div class="company-logo-small">
          <img src="/logo.jpg" alt="Yummy Cafe" />
        </div>
        <h1 class="company-name">Yummy Cafe<br>& Restaurant</h1>
        <p class="company-subtitle">Admin Dashboard</p>
        
        <div class="features-list">
          <div class="feature-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Manage Menu Items</span>
          </div>
          <div class="feature-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Organize Categories</span>
          </div>
          <div class="feature-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Update Settings</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="form-side">
      <div class="form-container">
        <!-- Welcome Header -->
        <div class="welcome-header">
          <h2>Welcome Back</h2>
          <p>Sign in to access your admin dashboard</p>
        </div>

        <!-- Company Logo (Small) -->
        <div class="form-logo">
          <img src="/logo.jpg" alt="Yummy Cafe" />
          <div class="form-logo-text">
            <h3>Yummy Cafe<br>& Restaurant</h3>
            <span>Admin Dashboard</span>
          </div>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Email Address</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <input
                id="email"
                v-model="credentials.email"
                type="email"
                placeholder="fitsum"
                required
                :disabled="authStore.loading"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                id="password"
                v-model="credentials.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                required
                :disabled="authStore.loading"
              />
              <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
                :disabled="authStore.loading"
              >
                <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
          </div>

          <div v-if="authStore.error" class="error-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {{ authStore.error }}
          </div>

          <button type="submit" class="sign-in-button" :disabled="authStore.loading">
            <span v-if="!authStore.loading">Sign In</span>
            <span v-else class="loading-spinner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              Signing in...
            </span>
          </button>
        </form>

        <!-- Demo Credentials -->
        <div class="demo-credentials">
          <div class="demo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
          </div>
          <div class="demo-content">
            <strong>Demo Credentials:</strong>
            <p>Email: admin@yummycafe.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const showPassword = ref(false)
const credentials = reactive({
  email: '',
  password: ''
})

async function handleLogin() {
  try {
    await authStore.login(credentials)
    router.push('/admin')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  background: #f8f9fa;
}

/* Left Side - Branding */
.branding-side {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  overflow: hidden;
}

.background-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.06) 0%, transparent 50%);
  z-index: 1;
}

.logo-container {
  position: relative;
  z-index: 2;
  margin-bottom: 40px;
}

.logo-background {
  width: 280px;
  height: 280px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.company-logo {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 16px;
  filter: brightness(1.1) contrast(1.1);
}

.company-info {
  text-align: center;
  color: white;
  position: relative;
  z-index: 2;
}

.company-logo-small {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.company-logo-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.company-name {
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 8px 0;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.company-subtitle {
  font-size: 18px;
  opacity: 0.9;
  margin: 0 0 40px 0;
  font-weight: 300;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  max-width: 280px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  opacity: 0.95;
}

.feature-item svg {
  width: 20px;
  height: 20px;
  stroke-width: 2.5;
  color: #4ade80;
  flex-shrink: 0;
}

/* Right Side - Form */
.form-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  background: #ffffff;
}

.form-container {
  width: 100%;
  max-width: 420px;
}

.welcome-header {
  text-align: center;
  margin-bottom: 32px;
}

.welcome-header h2 {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.welcome-header p {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.form-logo {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  margin-bottom: 32px;
  border: 1px solid #e2e8f0;
}

.form-logo img {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
}

.form-logo-text h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
  line-height: 1.2;
}

.form-logo-text span {
  font-size: 14px;
  color: #6b7280;
}

/* Form Styles */
.login-form {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #374151;
  font-weight: 500;
  font-size: 14px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 16px;
  width: 20px;
  height: 20px;
  stroke-width: 2;
  color: #9ca3af;
  pointer-events: none;
  z-index: 1;
}

.input-wrapper input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s;
  background: #ffffff;
  color: #1f2937;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.input-wrapper input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.toggle-password {
  position: absolute;
  right: 16px;
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  border-radius: 8px;
  transition: all 0.3s;
  z-index: 1;
}

.toggle-password:hover:not(:disabled) {
  background: #f3f4f6;
  color: #374151;
}

.toggle-password svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 20px;
}

.error-message svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
  flex-shrink: 0;
}

.sign-in-button {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.sign-in-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
}

.sign-in-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.loading-spinner svg {
  width: 20px;
  height: 20px;
  stroke-width: 2.5;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Demo Credentials */
.demo-credentials {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  font-size: 13px;
  color: #1e40af;
}

.demo-icon svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
  flex-shrink: 0;
  margin-top: 2px;
  color: #3b82f6;
}

.demo-content strong {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
}

.demo-content p {
  margin: 2px 0;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  font-size: 12px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .branding-side {
    padding: 40px 30px;
  }
  
  .logo-background {
    width: 240px;
    height: 240px;
  }
  
  .company-logo {
    width: 160px;
    height: 160px;
  }
  
  .company-name {
    font-size: 28px;
  }
}

@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
  }
  
  .branding-side {
    flex: 0 0 auto;
    padding: 40px 20px;
    min-height: 40vh;
  }
  
  .logo-background {
    width: 180px;
    height: 180px;
  }
  
  .company-logo {
    width: 120px;
    height: 120px;
  }
  
  .company-name {
    font-size: 24px;
  }
  
  .features-list {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }
  
  .feature-item {
    font-size: 14px;
  }
  
  .form-side {
    padding: 30px 20px;
  }
  
  .welcome-header h2 {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .branding-side {
    padding: 30px 15px;
  }
  
  .form-side {
    padding: 20px 15px;
  }
  
  .login-form {
    padding: 0;
  }
  
  .welcome-header h2 {
    font-size: 24px;
  }
}
</style>
