<template>
  <div class="app-container">
    <!-- Header -->
    <div class="page-header">
      <div class="feedback-icon-container">
        <svg class="feedback-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <h1 class="page-title">{{ t('shareFeedback') }}</h1>
      <p class="page-subtitle">{{ t('helpImprove') }}</p>
    </div>

    <!-- Content -->
    <div class="page-content">
      <form @submit.prevent="submitFeedback" class="feedback-form">
        <!-- Category -->
        <div class="form-group">
          <label class="form-label">{{ t('category') }}</label>
          <select v-model="feedback.category" class="form-select" required>
            <option value="">{{ t('selectCategory') }}</option>
            <option value="food">{{ t('foodQuality') }}</option>
            <option value="service">{{ t('service') }}</option>
            <option value="ambiance">{{ t('ambiance') }}</option>
            <option value="cleanliness">{{ t('cleanliness') }}</option>
            <option value="other">{{ t('other') }}</option>
          </select>
        </div>

        <!-- Rating -->
        <div class="form-group">
          <label class="form-label">{{ t('overallRating') }}</label>
          <div class="rating-stars">
            <button
              v-for="star in 5"
              :key="star"
              type="button"
              class="star-btn"
              :class="{ active: star <= feedback.rating }"
              @click="feedback.rating = star"
            >
              <svg viewBox="0 0 24 24" :fill="star <= feedback.rating ? 'currentColor' : 'none'" stroke="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Feedback Text -->
        <div class="form-group">
          <label class="form-label">{{ t('yourFeedback') }}</label>
          <textarea
            v-model="feedback.message"
            class="form-textarea"
            :placeholder="t('shareFeedbackPlaceholder')"
            rows="6"
            required
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          {{ isSubmitting ? t('submitting') : t('submitFeedback') }}
        </button>
      </form>

      <!-- Success Message -->
      <div v-if="showSuccess" class="success-message">
        <svg class="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <p>{{ t('thankYou') }}</p>
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
      
      <router-link to="/feedback" class="nav-btn active">
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </router-link>
      
      <router-link to="/profile" class="nav-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
import { ref } from 'vue';
import api from '@/services/api';
import { useTranslation } from '@/composables/useTranslation';

const { t } = useTranslation();

const feedback = ref({
  category: '',
  rating: 0,
  message: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

const submitFeedback = async () => {
  if (!feedback.value.category || !feedback.value.rating || !feedback.value.message) {
    alert('Please fill in all required fields');
    return;
  }

  isSubmitting.value = true;
  
  try {
    // Send to backend API
    await api.post('/public/feedback', {
      category: feedback.value.category,
      rating: feedback.value.rating,
      message: feedback.value.message
    });
    
    // Show success message
    showSuccess.value = true;
    
    // Reset form
    feedback.value = {
      category: '',
      rating: 0,
      message: ''
    };
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  } catch (error: any) {
    console.error('Failed to submit feedback:', error);
    alert(error.response?.data?.message || 'Failed to submit feedback. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  padding-bottom: 80px;
}

.page-header {
  padding: 60px 20px 30px;
  background: var(--bg-primary);
  text-align: center;
}

.feedback-icon-container {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: var(--bg-tertiary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback-icon {
  width: 40px;
  height: 40px;
  stroke-width: 2;
  color: var(--text-primary);
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--text-primary);
}

.page-subtitle {
  font-size: 14px;
  color: var(--text-quaternary);
  margin: 0;
}

.page-content {
  padding: 20px;
}

.feedback-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-tertiary);
  letter-spacing: 0.5px;
}

.form-select {
  width: 100%;
  height: 56px;
  padding: 0 16px;
  background: var(--bg-tertiary);
  border: none;
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 14px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 20px;
}

.form-select option {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.rating-stars {
  display: flex;
  gap: 12px;
}

.star-btn {
  width: 48px;
  height: 48px;
  background: none;
  border: none;
  padding: 0;
  color: #333;
  transition: all 0.2s;
}

.star-btn.active {
  color: #fbbf24;
}

.star-btn svg {
  width: 100%;
  height: 100%;
  stroke-width: 1.5;
}

.form-textarea {
  width: 100%;
  padding: 16px;
  background: var(--bg-tertiary);
  border: none;
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
}

.form-textarea::placeholder {
  color: var(--text-quaternary);
}

.submit-btn {
  width: 100%;
  height: 56px;
  background: var(--text-tertiary);
  border: none;
  border-radius: 12px;
  color: var(--bg-primary);
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s;
}

.submit-btn:not(:disabled):hover {
  background: var(--text-secondary);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.success-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--bg-tertiary);
  padding: 32px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  z-index: 1000;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.success-icon {
  width: 64px;
  height: 64px;
  stroke-width: 2;
  color: #4ade80;
  margin: 0 auto 16px;
}

.success-message p {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
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
