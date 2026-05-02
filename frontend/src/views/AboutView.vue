<template>
  <div class="app-container">
    <!-- Hero Header with Logo -->
    <div class="hero-header">
      <button class="back-btn" @click="$router.back()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      
      <div class="hero-content">
        <div class="logo-wrapper">
          <img src="/logo.jpg" alt="Yummy Cafe Logo" class="hero-logo" />
        </div>
        <h1 class="hero-title">{{ settings.name }}</h1>
        <p class="hero-subtitle">አሞር ካፌ</p>
        <div class="hero-tagline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span>{{ settings.tagline }}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="page-content">
      <!-- Story Section -->
      <div class="content-card story-card">
        <div class="card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <h2 class="card-title">Our Story</h2>
        <p class="card-text">
          {{ settings.story }}
        </p>
      </div>

      <!-- Mission & Vision -->
      <div class="dual-cards">
        <div class="content-card mini-card">
          <div class="mini-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h3 class="mini-title">Our Mission</h3>
          <p class="mini-text">
            {{ settings.mission }}
          </p>
        </div>

        <div class="content-card mini-card">
          <div class="mini-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <h3 class="mini-title">Our Vision</h3>
          <p class="mini-text">
            {{ settings.vision }}
          </p>
        </div>
      </div>

      <!-- Features -->
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h4 class="feature-title">Premium Quality</h4>
          <p class="feature-text">Fresh ingredients sourced daily</p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h4 class="feature-title">Expert Chefs</h4>
          <p class="feature-text">Skilled culinary professionals</p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <h4 class="feature-title">Cozy Ambiance</h4>
          <p class="feature-text">Warm and welcoming atmosphere</p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h4 class="feature-title">Fast Service</h4>
          <p class="feature-text">Quick and efficient delivery</p>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="content-card contact-card">
        <h2 class="card-title">Get In Touch</h2>
        
        <div class="contact-grid">
          <div class="contact-item">
            <div class="contact-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div class="contact-info">
              <p class="contact-label">Location</p>
              <p class="contact-value">{{ settings.location }}</p>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div class="contact-info">
              <p class="contact-label">Phone</p>
              <p class="contact-value">{{ settings.phone }}</p>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div class="contact-info">
              <p class="contact-label">Email</p>
              <p class="contact-value">{{ settings.email }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Hours Section -->
      <div class="content-card hours-card">
        <div class="hours-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <h2 class="card-title">Opening Hours</h2>
        </div>
        
        <div class="hours-list">
          <div class="hours-row">
            <span class="day">Monday - Friday</span>
            <span class="time">{{ settings.hours_weekday }}</span>
          </div>
          <div class="hours-row">
            <span class="day">Saturday</span>
            <span class="time">{{ settings.hours_saturday }}</span>
          </div>
          <div class="hours-row">
            <span class="day">Sunday</span>
            <span class="time">{{ settings.hours_sunday }}</span>
          </div>
        </div>
      </div>

      <!-- Social Section -->
      <div class="content-card social-card">
        <h2 class="card-title">Connect With Us</h2>
        <p class="social-subtitle">Follow us on social media for updates and special offers</p>
        
        <div class="social-links">
          <a v-if="settings.facebook_url && settings.facebook_url !== '#'" :href="settings.facebook_url" target="_blank" class="social-btn telegram">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.155.232.171.326.016.094.036.308.02.475z"/>
            </svg>
            <span>Telegram</span>
          </a>
          
          <a v-if="settings.instagram_url && settings.instagram_url !== '#'" :href="settings.instagram_url" target="_blank" class="social-btn instagram">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
              <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Instagram</span>
          </a>
          
          <a v-if="settings.twitter_url && settings.twitter_url !== '#'" :href="settings.twitter_url" target="_blank" class="social-btn tiktok">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            <span>TikTok</span>
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div class="about-footer">
        <p class="footer-text">© 2026 {{ settings.name }}. All rights reserved.</p>
        <p class="footer-subtext">Developed by Mela Technologies</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const settings = ref<any>({
  name: 'Amore Cafe',
  tagline: 'Premium Dining Experience',
  description: '',
  story: '',
  mission: '',
  vision: '',
  phone: '+251 11 123 4567',
  email: 'info@amorecafe.et',
  address: 'Addis Ababa, Ethiopia',
  location: 'Addis Ababa, Ethiopia',
  facebook_url: '',
  instagram_url: '',
  twitter_url: '',
  hours_weekday: '8:00 AM - 10:00 PM',
  hours_saturday: '9:00 AM - 11:00 PM',
  hours_sunday: '9:00 AM - 9:00 PM'
});

const loading = ref(true);

onMounted(async () => {
  try {
    const response = await api.get('/admin/settings');
    const data = response.data.data;
    
    // Update settings with API data
    settings.value = {
      name: data.name || 'Amore Cafe',
      tagline: data.tagline || 'Premium Dining Experience',
      description: data.description || 'Welcome to Amore Cafe, where culinary artistry meets Ethiopian hospitality.',
      story: data.story || 'Welcome to Amore Cafe, where culinary artistry meets Ethiopian hospitality. Since our establishment, we\'ve been crafting unforgettable dining experiences that blend traditional Ethiopian flavors with contemporary international cuisine. Every dish is a celebration of fresh ingredients, authentic recipes, and passionate craftsmanship.',
      mission: data.mission || 'Delivering exceptional culinary experiences through quality, innovation, and warm hospitality.',
      vision: data.vision || 'To be the premier destination for authentic Ethiopian and international cuisine.',
      phone: data.phone || '+251 11 123 4567',
      email: data.email || 'info@amorecafe.et',
      address: data.address || 'Addis Ababa, Ethiopia',
      location: data.location || 'Addis Ababa, Ethiopia',
      facebook_url: data.facebook_url || '#',
      instagram_url: data.instagram_url || '#',
      twitter_url: data.twitter_url || '#',
      hours_weekday: data.hours_weekday || '8:00 AM - 10:00 PM',
      hours_saturday: data.hours_saturday || '9:00 AM - 11:00 PM',
      hours_sunday: data.hours_sunday || '9:00 AM - 9:00 PM'
    };
  } catch (err) {
    console.error('Failed to load settings:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
}

/* Hero Header */
.hero-header {
  position: relative;
  padding: 60px 20px 40px;
  background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
  text-align: center;
}

.back-btn {
  position: absolute;
  top: 60px;
  left: 20px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  transition: all 0.3s;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.back-btn svg {
  width: 20px;
  height: 20px;
  stroke-width: 2.5;
}

.hero-content {
  padding-top: 20px;
}

.logo-wrapper {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #fbbf24;
  box-shadow: 0 8px 32px rgba(251, 191, 36, 0.3);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #fbbf24;
}

.hero-tagline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 14px;
  color: var(--text-tertiary);
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.hero-tagline svg {
  width: 16px;
  height: 16px;
  fill: #fbbf24;
  stroke: none;
}

/* Content */
.page-content {
  padding: 20px;
}

.content-card {
  background: var(--bg-secondary);
  border: 1px solid var(--bg-tertiary);
  border-radius: 20px;
  padding: 28px;
  margin-bottom: 20px;
  transition: all 0.3s;
}

.content-card:hover {
  border-color: var(--bg-tertiary);
  transform: translateY(-2px);
}

/* Story Card */
.story-card {
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
  border: 1px solid #fbbf24;
}

.card-icon {
  width: 56px;
  height: 56px;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.card-icon svg {
  width: 28px;
  height: 28px;
  stroke-width: 2;
  color: #fbbf24;
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: var(--text-primary);
}

.card-text {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
}

/* Dual Cards */
.dual-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.mini-card {
  padding: 20px;
  margin-bottom: 0;
}

.mini-icon {
  width: 48px;
  height: 48px;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.mini-icon svg {
  width: 24px;
  height: 24px;
  stroke-width: 2;
  color: #fbbf24;
}

.mini-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: var(--text-primary);
}

.mini-text {
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-tertiary);
  margin: 0;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.feature-item {
  background: var(--bg-secondary);
  border: 1px solid var(--bg-tertiary);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s;
}

.feature-item:hover {
  border-color: #fbbf24;
  transform: translateY(-4px);
}

.feature-icon {
  width: 48px;
  height: 48px;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}

.feature-icon svg {
  width: 24px;
  height: 24px;
  stroke-width: 2;
  color: #fbbf24;
}

.feature-title {
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--text-primary);
}

.feature-text {
  font-size: 12px;
  color: var(--text-tertiary);
  margin: 0;
}

/* Contact Card */
.contact-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--bg-tertiary);
  border-radius: 12px;
  transition: all 0.3s;
}

.contact-item:hover {
  background: var(--bg-tertiary);
  transform: translateX(4px);
}

.contact-icon-wrapper {
  width: 48px;
  height: 48px;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-icon-wrapper svg {
  width: 24px;
  height: 24px;
  stroke-width: 2;
  color: #fbbf24;
}

.contact-info {
  flex: 1;
}

.contact-label {
  font-size: 12px;
  color: var(--text-tertiary);
  margin: 0 0 4px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-value {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

/* Hours Card */
.hours-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.hours-header svg {
  width: 28px;
  height: 28px;
  stroke-width: 2;
  color: #fbbf24;
}

.hours-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hours-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: var(--bg-tertiary);
  border-radius: 12px;
}

.day {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
}

.time {
  font-size: 14px;
  font-weight: 700;
  color: #fbbf24;
}

/* Social Card */
.social-subtitle {
  font-size: 14px;
  color: var(--text-tertiary);
  margin: 0 0 24px 0;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.social-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: var(--bg-tertiary);
  border: 1px solid var(--bg-tertiary);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.social-btn:hover {
  transform: translateX(8px);
}

.social-btn.telegram:hover {
  background: rgba(0, 136, 204, 0.1);
  border-color: #0088cc;
}

.social-btn.instagram:hover {
  background: rgba(225, 48, 108, 0.1);
  border-color: #e1306c;
}

.social-btn.tiktok:hover {
  background: rgba(0, 0, 0, 0.1);
  border-color: #000;
}

.social-btn svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

/* Footer */
.about-footer {
  text-align: center;
  padding: 32px 0;
  border-top: 1px solid var(--bg-tertiary);
  margin-top: 20px;
}

.footer-text {
  font-size: 14px;
  color: var(--text-tertiary);
  margin: 0 0 8px 0;
}

.footer-subtext {
  font-size: 13px;
  color: var(--text-quaternary);
  margin: 0;
}

@media (max-width: 400px) {
  .dual-cards,
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
