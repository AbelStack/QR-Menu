<template>
  <div class="app-container">
    <!-- Header -->
    <div class="page-header">
      <h1 class="page-title">Favorite</h1>
    </div>

    <!-- Content -->
    <div class="page-content">
      <div v-if="favoriteItems.length === 0" class="empty-state">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <p class="empty-text">No favorites yet</p>
        <p class="empty-subtext">Start adding items to your favorites!</p>
      </div>

      <div v-else class="favorites-grid">
        <div 
          v-for="(item, index) in favoriteItems" 
          :key="index"
          class="menu-item"
        >
          <div class="item-image-container">
            <img 
              v-if="item.image"
              :src="item.image.startsWith('http') ? item.image : `http://localhost:8000${item.image}`" 
              :alt="item.name"
              class="item-image"
            />
            <button 
              class="favorite-btn active"
              @click="removeFavorite(item)"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
          <div class="item-info">
            <h4 class="item-name">{{ item.name }}</h4>
            <p class="item-price">{{ currencySymbol }} {{ convertPrice(item.price) }}</p>
          </div>
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
      
      <router-link to="/favorites" class="nav-btn active">
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </router-link>
      
      <router-link to="/feedback" class="nav-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
import { ref, onMounted } from 'vue';
import { useMenuStore } from '@/stores/menuStore';
import { useCurrency } from '@/composables/useCurrency';

const menuStore = useMenuStore();
const { convertPrice, currencySymbol } = useCurrency();
const favoriteItems = ref<any[]>([]);

onMounted(async () => {
  await menuStore.loadAll();
  loadFavorites();
});

const loadFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const allItems: any[] = [];
  
  menuStore.menuItems.forEach(item => {
    if (favorites.includes(item.name)) {
      allItems.push({ ...item, isFavorite: true });
    }
  });
  
  favoriteItems.value = allItems;
};

const removeFavorite = (item: any) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const index = favorites.indexOf(item.name);
  if (index > -1) {
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
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
  padding: 60px 20px 20px;
  background: var(--bg-primary);
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
}

.page-content {
  padding: 20px;
  min-height: calc(100vh - 180px);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  width: 80px;
  height: 80px;
  stroke-width: 1.5;
  color: #333;
  margin-bottom: 20px;
}

.empty-text {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.empty-subtext {
  font-size: 14px;
  color: var(--text-quaternary);
  margin: 0;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.menu-item {
  display: flex;
  flex-direction: column;
}

.item-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 8px;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background: rgba(0,0,0,0.5);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  backdrop-filter: blur(10px);
}

.favorite-btn.active {
  color: #ff4757;
}

.favorite-btn svg {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}

.item-info {
  padding: 0 4px;
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text-primary);
}

.item-price {
  font-size: 14px;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
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
