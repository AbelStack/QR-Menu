<template>
  <div class="app-container">
    <!-- Header -->
    <div class="page-header">
      <button class="back-btn" @click="$router.back()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <h1 class="page-title">About Us</h1>
    </div>

    <!-- Content -->
    <div class="page-content">
      <div class="about-card">
        <div class="logo-container">
          <svg class="crown-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z"/>
          </svg>
        </div>

        <h2 class="restaurant-name">Yummy Cafe & Restaurant</h2>
        <p class="tagline">Yum, Every Time!</p>

        <div class="info-section">
          <h3 class="section-title">Our Story</h3>
          <p class="section-text">
            Welcome to Yummy Cafe & Restaurant, where every dish tells a story of passion, 
            tradition, and culinary excellence. Since our establishment, we've been dedicated 
            to serving the finest Ethiopian and international cuisine with a modern twist.
          </p>
        </div>

        <div class="info-section">
          <h3 class="section-title">Our Mission</h3>
          <p class="section-text">
            To provide our guests with an unforgettable dining experience through exceptional 
            food, warm hospitality, and a welcoming atmosphere that feels like home.
          </p>
        </div>

        <div class="info-section">
          <h3 class="section-title">Contact Us</h3>
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Addis Ababa, Ethiopia</span>
          </div>
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>+251 11 123 4567</span>
          </div>
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>info@yummycafe.et</span>
          </div>
        </div>

        <div class="info-section">
          <h3 class="section-title">Opening Hours</h3>
          <div class="hours-item">
            <span class="day">Monday - Friday</span>
            <span class="time">8:00 AM - 10:00 PM</span>
          </div>
          <div class="hours-item">
            <span class="day">Saturday</span>
            <span class="time">9:00 AM - 11:00 PM</span>
          </div>
          <div class="hours-item">
            <span class="day">Sunday</span>
            <span class="time">9:00 AM - 9:00 PM</span>
          </div>
        </div>

        <div class="social-section">
          <h3 class="section-title">Follow Us</h3>
          <div class="social-links">
            <button class="social-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button class="social-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>
            <button class="social-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: #000;
  color: #fff;
}

.page-header {
  position: relative;
  padding: 60px 20px 20px;
  background: #000;
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  width: 40px;
  height: 40px;
  background: #1a1a1a;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.back-btn svg {
  width: 20px;
  height: 20px;
  stroke-width: 2.5;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: #fff;
}

.page-content {
  padding: 20px;
}

.about-card {
  background: #1a1a1a;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
}

.logo-container {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #8B1A1A, #be123c);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.crown-icon {
  width: 40px;
  height: 40px;
  color: #fff;
}

.restaurant-name {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #fff;
}

.tagline {
  font-size: 16px;
  color: #999;
  margin: 0 0 32px 0;
}

.info-section {
  text-align: left;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #2a2a2a;
}

.info-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #fff;
}

.section-text {
  font-size: 14px;
  line-height: 1.6;
  color: #999;
  margin: 0;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  color: #999;
}

.contact-icon {
  width: 20px;
  height: 20px;
  stroke-width: 2;
  color: #fff;
  flex-shrink: 0;
}

.hours-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  color: #999;
}

.day {
  font-weight: 500;
}

.time {
  color: #fff;
}

.social-section {
  text-align: left;
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-btn {
  width: 48px;
  height: 48px;
  background: #2a2a2a;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.3s;
}

.social-btn:hover {
  background: #333;
  transform: scale(1.1);
}

.social-btn svg {
  width: 20px;
  height: 20px;
}
</style>
