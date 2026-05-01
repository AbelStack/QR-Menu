<template>
  <div class="app-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      
      <!-- Image Slider -->
      <div class="hero-slider">
        <img 
          v-for="(image, index) in heroImages" 
          :key="index"
          :src="image" 
          :alt="`Hero ${index + 1}`"
          class="hero-image"
          :class="{ active: currentSlide === index }"
        />
      </div>
      
      <div class="hero-content">
        <div class="hero-header">
          <div class="brand">
            <img 
              src="/logo.jpg" 
              alt="Yummy Cafe Logo"
              class="brand-logo"
            />
            <span class="brand-name">Amore Cafe<br/> አሞር ካፌ</span>
          </div>
          <button class="lang-btn" @click="$router.push('/profile')">
            {{ currentLanguage }}
            <svg class="globe-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </button>
        </div>

        <div class="hero-text">
          <h1 class="hero-title">
            {{ t('heroTitle1') }}<br/>
            {{ t('heroTitle2') }}
          </h1>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Search Bar -->
      <div class="search-container">
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input 
            v-model="searchQuery"
            type="text" 
            :placeholder="t('searchPlaceholder')"
            class="search-input"
          />
        </div>
        <button class="filter-btn" @click="showFilterModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="4" y1="12" x2="20" y2="12"/>
            <line x1="4" y1="18" x2="20" y2="18"/>
            <circle cx="8" cy="6" r="2" fill="currentColor"/>
            <circle cx="16" cy="12" r="2" fill="currentColor"/>
            <circle cx="12" cy="18" r="2" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <!-- Menu Header -->
      <div class="menu-header">
        <h2 class="menu-title">{{ t('menu') }}</h2>
        <div class="menu-tabs">
          <button 
            :class="['tab', { active: activeTab === 'all' }]"
            @click="activeTab = 'all'"
          >
            {{ t('all') }}
          </button>
          <button 
            :class="['tab', { active: activeTab === 'food' }]"
            @click="activeTab = 'food'"
          >
            {{ t('food') }}
          </button>
          <button 
            :class="['tab', { active: activeTab === 'drinks' }]"
            @click="activeTab = 'drinks'"
          >
            {{ t('drinks') }}
          </button>
        </div>
      </div>

      <!-- Categories -->
      <div class="categories">
        <div 
          v-for="category in filteredCategories" 
          :key="category.id"
          class="category-section"
        >
          <button 
            class="category-header"
            @click="toggleCategory(category.slug)"
          >
            <h3 class="category-title">{{ (currentLanguage === 'AM' && category.name_amharic ? category.name_amharic : category.name).toUpperCase() }}</h3>
            <svg 
              class="chevron-icon"
              :class="{ expanded: expandedCategories.includes(category.slug) }"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

          <!-- Category Items -->
          <transition name="expand">
            <div v-if="expandedCategories.includes(category.slug)" class="category-items">
              <div 
                v-for="(item, index) in getFilteredItems(category)" 
                :key="index"
                class="menu-item"
                @click="openItemDetail(item)"
              >
                <div class="item-image-container">
                  <img 
                    v-if="item.image"
                    :src="getImageUrl(item.image)" 
                    :alt="item.name"
                    class="item-image"
                  />
                  <button 
                    class="favorite-btn"
                    :class="{ active: isFavorite(item) }"
                    @click.stop="toggleFavorite(item)"
                  >
                    <svg viewBox="0 0 24 24" :fill="isFavorite(item) ? 'currentColor' : 'none'" stroke="currentColor">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                </div>
                <div class="item-info">
                  <h4 class="item-name">{{ currentLanguage === 'AM' && item.name_amharic ? item.name_amharic : item.name }}</h4>
                  <p class="item-price">{{ currencySymbol }} {{ convertPrice(item.price) }}</p>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Filter Modal -->
    <div v-if="showFilterModal" class="modal-overlay" @click="showFilterModal = false">
      <div class="filter-modal" @click.stop>
        <div class="filter-header">
          <h3 class="filter-title">{{ t('filters') }}</h3>
          <button class="reset-btn" @click="resetFilters">{{ t('reset') }}</button>
        </div>

        <div class="filter-content">
          <!-- Sort By -->
          <div class="filter-section">
            <label class="filter-label">{{ t('sortBy') }}</label>
            <div class="filter-options">
              <button 
                :class="['filter-option', { active: sortBy === 'recommended' }]"
                @click="sortBy = 'recommended'"
              >
                {{ t('recommended') }}
              </button>
              <button 
                :class="['filter-option', { active: sortBy === 'priceLowHigh' }]"
                @click="sortBy = 'priceLowHigh'"
              >
                {{ t('priceLowHigh') }}
              </button>
              <button 
                :class="['filter-option', { active: sortBy === 'priceHighLow' }]"
                @click="sortBy = 'priceHighLow'"
              >
                {{ t('priceHighLow') }}
              </button>
            </div>
          </div>

          <!-- Max Price -->
          <div class="filter-section">
            <div class="price-header">
              <label class="filter-label">{{ t('maxPrice') }}</label>
              <span class="price-value">{{ currencySymbol }} {{ maxPrice }}</span>
            </div>
            <input 
              type="range" 
              v-model="maxPrice" 
              :min="0" 
              :max="10000" 
              :step="50"
              class="price-slider"
            />
          </div>

          <!-- Show Results Button -->
          <button class="show-results-btn" @click="applyFilters">
            {{ t('showResults') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Item Detail Modal -->
    <div v-if="selectedItem" class="modal-overlay" @click="selectedItem = null">
      <div class="detail-modal" @click.stop>
        <button class="back-btn" @click="selectedItem = null">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>

        <div class="detail-image-container">
          <img 
            v-if="selectedItem.image"
            :src="getImageUrl(selectedItem.image)" 
            :alt="selectedItem.name"
            class="detail-image"
          />
          <button 
            class="detail-favorite-btn"
            :class="{ active: isFavorite(selectedItem) }"
            @click="toggleFavorite(selectedItem)"
          >
            <svg viewBox="0 0 24 24" :fill="isFavorite(selectedItem) ? 'currentColor' : 'none'" stroke="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        <div class="detail-content">
          <div class="detail-category">
            <svg class="category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
            {{ getCategoryType(selectedItem).toUpperCase() }}
          </div>

          <h2 class="detail-name">{{ currentLanguage === 'AM' && selectedItem.name_amharic ? selectedItem.name_amharic : selectedItem.name }}</h2>
          <p class="detail-price">{{ currencySymbol }} {{ convertPrice(selectedItem.price) }}</p>
          <p class="detail-description">{{ (currentLanguage === 'AM' && selectedItem.description_amharic) ? selectedItem.description_amharic : (selectedItem.description || (currentLanguage === 'AM' ? selectedItem.name_amharic : selectedItem.name)) }}</p>

          <div v-if="selectedItem.tags && selectedItem.tags.length" class="detail-tags">
            <span v-for="tag in selectedItem.tags" :key="tag" class="detail-tag">
              {{ tag }}
            </span>
          </div>

          <div class="detail-ingredients">
            <h3 class="ingredients-title">{{ t('ingredients') }}:</h3>
            <template v-if="selectedItem.ingredients || selectedItem.ingredients_amharic">
              <div 
                v-for="(ingredient, index) in getIngredientsList(selectedItem)" 
                :key="index"
                class="ingredient-item"
              >
                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>{{ ingredient }}</span>
              </div>
            </template>
            <template v-else>
              <div class="ingredient-item">
                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>{{ currentLanguage === 'AM' && selectedItem.name_amharic ? selectedItem.name_amharic : selectedItem.name }}</span>
              </div>
              <div class="ingredient-item">
                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>{{ t('freshIngredients') }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
      <router-link to="/" class="nav-btn" :class="{ active: $route.path === '/' }">
        <svg viewBox="0 0 24 24" :fill="$route.path === '/' ? 'currentColor' : 'none'" stroke="currentColor">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </router-link>
      
      <router-link to="/favorites" class="nav-btn" :class="{ active: $route.path === '/favorites' }">
        <svg viewBox="0 0 24 24" :fill="$route.path === '/favorites' ? 'currentColor' : 'none'" stroke="currentColor">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </router-link>
      
      <router-link to="/feedback" class="nav-btn" :class="{ active: $route.path === '/feedback' }">
        <svg viewBox="0 0 24 24" :fill="$route.path === '/feedback' ? 'currentColor' : 'none'" stroke="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </router-link>
      
      <router-link to="/profile" class="nav-btn" :class="{ active: $route.path === '/profile' }">
        <svg viewBox="0 0 24 24" :fill="$route.path === '/profile' ? 'currentColor' : 'none'" stroke="currentColor">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useMenuStore } from '@/stores/menuStore';
import { useTranslation } from '@/composables/useTranslation';
import { useCurrency } from '@/composables/useCurrency';

const { t, currentLanguage } = useTranslation();
const { convertPrice, currencySymbol } = useCurrency();
const menuStore = useMenuStore();

const searchQuery = ref('');
const activeTab = ref('all');
const showFilterModal = ref(false);
const selectedItem = ref<any>(null);
const expandedCategories = ref<string[]>([]);

// Filter state
const sortBy = ref('recommended');
const maxPrice = ref(10000);

// Favorites
const favorites = ref<string[]>([]);

// Hero Image Slider
const heroImages = ['/hero.jpg', '/pizza.jpg', '/juice.jpg', '/shawarma.jpg', '/chicken.jpg'];
const currentSlide = ref(0);
let slideInterval: number;

onMounted(async () => {
  favorites.value = JSON.parse(localStorage.getItem('favorites') || '[]');
  await menuStore.loadAll();
  
  // Expand first two categories by default
  if (menuStore.categories.length > 0) {
    expandedCategories.value = menuStore.categories.slice(0, 2).map(cat => cat.slug);
  }
  
  // Start hero image slider
  slideInterval = window.setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % heroImages.length;
  }, 3000); // Change image every 3 seconds
});

// Cleanup interval on unmount
import { onUnmounted } from 'vue';
onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
});

// Food categories
const foodCategories = ['burgers', 'pizza', 'sandwich', 'snacks', 'breakfast', 'lunch', 'fish', 'salad'];
const drinkCategories = ['juice-shake'];

const filteredCategories = computed(() => {
  let categories = menuStore.categoriesWithItems;
  
  if (activeTab.value === 'food') {
    categories = categories.filter(cat => foodCategories.includes(cat.slug));
  } else if (activeTab.value === 'drinks') {
    categories = categories.filter(cat => drinkCategories.includes(cat.slug));
  }
  
  return categories;
});

const getFilteredItems = (category: any) => {
  let items = category.items || [];
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    items = items.filter((item: any) => 
      item.name.toLowerCase().includes(query) ||
      (item.name_amharic && item.name_amharic.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      (item.description_amharic && item.description_amharic.toLowerCase().includes(query))
    );
  }
  
  // Price filter
  items = items.filter((item: any) => !item.price || item.price <= maxPrice.value);
  
  // Sort
  if (sortBy.value === 'priceLowHigh') {
    items = [...items].sort((a: any, b: any) => (a.price || 0) - (b.price || 0));
  } else if (sortBy.value === 'priceHighLow') {
    items = [...items].sort((a: any, b: any) => (b.price || 0) - (a.price || 0));
  }
  
  return items;
};

const toggleCategory = (categorySlug: string) => {
  const index = expandedCategories.value.indexOf(categorySlug);
  if (index > -1) {
    expandedCategories.value.splice(index, 1);
  } else {
    expandedCategories.value.push(categorySlug);
  }
};

const isFavorite = (item: any) => {
  return favorites.value.includes(item.name);
};

const toggleFavorite = (item: any) => {
  const index = favorites.value.indexOf(item.name);
  if (index > -1) {
    favorites.value.splice(index, 1);
  } else {
    favorites.value.push(item.name);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites.value));
};

const openItemDetail = (item: any) => {
  console.log('Opening item detail:', item);
  console.log('Has ingredients?', item.ingredients);
  console.log('Has ingredients_amharic?', item.ingredients_amharic);
  selectedItem.value = item;
};

const resetFilters = () => {
  sortBy.value = 'recommended';
  maxPrice.value = 10000;
};

const applyFilters = () => {
  showFilterModal.value = false;
};

const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://yummycafe.clearsightinitiative.org';
  return `${baseUrl}${imagePath}`;
};

const getCategoryType = (item: any) => {
  // First try to find by category_id
  if (item.category_id) {
    const category = menuStore.categories.find((cat: any) => cat.id === item.category_id);
    if (category && drinkCategories.includes(category.slug)) {
      return t('drinks');
    }
    if (category) {
      return t('food');
    }
  }
  
  // Fallback: search through all categories
  const category = menuStore.categories.find((cat: any) => 
    cat.items?.some((i: any) => i.id === item.id || i.name === item.name)
  );
  
  if (category && drinkCategories.includes(category.slug)) {
    return t('drinks');
  }
  return t('food');
};

const getIngredientsList = (item: any) => {
  const ingredientsText = currentLanguage.value === 'AM' && item.ingredients_amharic 
    ? item.ingredients_amharic 
    : item.ingredients;
  
  if (!ingredientsText) return [];
  
  // Split by comma and trim whitespace
  return ingredientsText.split(',').map((ing: string) => ing.trim()).filter((ing: string) => ing);
};
</script>

<style scoped>
@import './MenuView.css';
</style>
