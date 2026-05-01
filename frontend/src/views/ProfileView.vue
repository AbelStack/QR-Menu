<template>
  <div class="app-container">
    <!-- Header -->
    <div class="page-header">
      <h1 class="page-title">{{ t('preferences') }}</h1>
    </div>

    <!-- Content -->
    <div class="page-content">
      <!-- Preferences Section -->
      <div class="preferences-section">
        <!-- Dark Mode -->
        <div class="preference-item">
          <div class="preference-left">
            <svg class="preference-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <span class="preference-label">{{ t('darkMode') }}</span>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="preferences.darkMode" @change="toggleDarkMode">
            <span class="toggle-slider"></span>
          </label>
        </div>

        <!-- Language -->
        <button class="preference-item" @click="showLanguageModal = true">
          <div class="preference-left">
            <svg class="preference-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span class="preference-label">{{ t('language') }}</span>
          </div>
          <div class="preference-right">
            <span class="preference-value">{{ currentLanguage }}</span>
            <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </button>

        <!-- Currency -->
        <button class="preference-item" @click="showCurrencyModal = true">
          <div class="preference-left">
            <svg class="preference-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <span class="preference-label">{{ t('currency') }}</span>
          </div>
          <div class="preference-right">
            <span class="preference-value">{{ currentCurrency }}</span>
            <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </button>
      </div>

      <!-- About Section -->
      <div class="about-section">
        <button class="about-item" @click="$router.push('/about')">
          <div class="about-left">
            <svg class="about-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            <span class="about-label">{{ t('aboutUs') }}</span>
          </div>
          <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Language Modal -->
    <div v-if="showLanguageModal" class="modal-overlay" @click="showLanguageModal = false">
      <div class="modal-content" @click.stop>
        <h3 class="modal-title">{{ t('selectLanguage') }}</h3>
        <div class="modal-options">
          <button 
            v-for="lang in languages" 
            :key="lang.code"
            class="modal-option"
            :class="{ active: currentLanguage === lang.code }"
            @click="selectLanguage(lang.code)"
          >
            {{ lang.name }}
            <svg v-if="currentLanguage === lang.code" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Currency Modal -->
    <div v-if="showCurrencyModal" class="modal-overlay" @click="showCurrencyModal = false">
      <div class="modal-content" @click.stop>
        <h3 class="modal-title">{{ t('selectCurrency') }}</h3>
        <div class="modal-options">
          <button 
            v-for="curr in currencies" 
            :key="curr.code"
            class="modal-option"
            :class="{ active: currentCurrency === curr.code }"
            @click="selectCurrency(curr.code)"
          >
            {{ curr.name }} ({{ curr.code }})
            <svg v-if="currentCurrency === curr.code" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
      <router-link to="/" class="nav-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </router-link>
      
      <router-link to="/favorites" class="nav-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </router-link>
      
      <router-link to="/feedback" class="nav-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </router-link>
      
      <router-link to="/profile" class="nav-btn active">
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
        </svg>
      </router-link>
    </nav>

    <!-- Footer Credit -->
    <div class="footer-credit">
      Developed by Mela Technologies | 
      <a href="tel:+251996979757" class="footer-phone">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        +251 996 979 757
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTranslation } from '@/composables/useTranslation';
import { useCurrency } from '@/composables/useCurrency';
import { useTheme } from '@/composables/useTheme';

const { t, setLanguage, currentLanguage } = useTranslation();
const { setCurrency, currentCurrency } = useCurrency();
const { isDarkMode, toggleTheme } = useTheme();

const preferences = ref({
  darkMode: true,
});

const showLanguageModal = ref(false);
const showCurrencyModal = ref(false);

const languages = [
  { code: 'EN', name: 'English' },
  { code: 'AM', name: 'አማርኛ (Amharic)' },
];

const currencies = [
  { code: 'ETB', name: 'Ethiopian Birr' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
];

onMounted(() => {
  preferences.value.darkMode = isDarkMode.value;
});

const selectLanguage = (code: string) => {
  setLanguage(code);
  showLanguageModal.value = false;
  window.location.reload(); // Reload to apply language
};

const selectCurrency = (code: string) => {
  setCurrency(code);
  showCurrencyModal.value = false;
  window.location.reload(); // Reload to apply currency
};

const toggleDarkMode = () => {
  toggleTheme();
  preferences.value.darkMode = isDarkMode.value;
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  padding-bottom: 80px;
  transition: all 0.3s ease;
}

.page-header {
  padding: 60px 20px 20px;
  background: var(--bg-primary);
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: var(--text-tertiary);
  letter-spacing: 1px;
}

.page-content {
  padding: 20px;
}

.preferences-section,
.about-section {
  background: var(--bg-secondary);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid var(--bg-tertiary);
}

.preference-item,
.about-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: none;
  border: none;
  border-bottom: 1px solid var(--bg-tertiary);
  color: var(--text-primary);
  text-align: left;
}

.preference-item:last-child,
.about-item:last-child {
  border-bottom: none;
}

.preference-left,
.about-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.preference-icon,
.about-icon {
  width: 24px;
  height: 24px;
  stroke-width: 2;
  color: var(--text-primary);
}

.preference-label,
.about-label {
  font-size: 16px;
  font-weight: 500;
}

.preference-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.preference-value {
  font-size: 14px;
  color: var(--text-tertiary);
}

.chevron-icon {
  width: 20px;
  height: 20px;
  stroke-width: 2;
  color: var(--text-quaternary);
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  width: 52px;
  height: 32px;
  display: inline-block;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: var(--bg-tertiary);
  border-radius: 32px;
  transition: 0.3s;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 4px;
  background: var(--text-primary);
  border-radius: 50%;
  transition: 0.3s;
}

input:checked + .toggle-slider {
  background: #4ade80;
}

input:checked + .toggle-slider:before {
  transform: translateX(20px);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  width: 100%;
  max-width: 480px;
  background: var(--bg-secondary);
  border-radius: 24px 24px 0 0;
  padding: 24px;
  animation: slideUp 0.3s;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 20px 0;
  color: var(--text-primary);
}

.modal-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal-option {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: var(--bg-tertiary);
  border: none;
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 16px;
  text-align: left;
  transition: all 0.2s;
}

.modal-option.active {
  background: var(--accent);
  color: #000;
}

.check-icon {
  width: 20px;
  height: 20px;
  stroke-width: 3;
  color: #4ade80;
}

.modal-option.active .check-icon {
  color: #000;
}

/* Bottom Navigation */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: 480px;
  width: 100%;
  height: 70px;
  background: var(--nav-bg);
  border-radius: 24px 24px 0 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
  z-index: 100;
}

.nav-btn {
  width: 56px;
  height: 56px;
  background: none;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--nav-text);
  transition: all 0.3s;
  text-decoration: none;
}

.nav-btn.active {
  background: var(--nav-active-bg);
  color: var(--nav-active-text);
}

.nav-btn svg {
  width: 24px;
  height: 24px;
  stroke-width: 2;
}

/* Footer Credit */
.footer-credit {
  position: fixed;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 480px;
  width: 100%;
  padding: 12px 20px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-tertiary);
  background: var(--bg-primary);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-wrap: wrap;
}

.footer-phone {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--text-tertiary);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-phone:hover {
  color: #fbbf24;
}

.footer-phone svg {
  width: 14px;
  height: 14px;
  stroke-width: 2;
}

@media (max-width: 480px) {
  .bottom-nav {
    left: 0;
    transform: none;
  }
  
  .footer-credit {
    left: 0;
    transform: none;
    font-size: 11px;
  }
  
  .footer-phone svg {
    width: 12px;
    height: 12px;
  }
}
</style>
