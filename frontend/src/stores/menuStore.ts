import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { menuService, type Category, type MenuItem, type RestaurantSettings } from '@/services/menuService'

export const useMenuStore = defineStore('menu', () => {
  // State
  const categories = ref<Category[]>([])
  const menuItems = ref<MenuItem[]>([])
  const settings = ref<RestaurantSettings | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const lastFetch = ref<number>(0)
  const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes cache

  // Getters
  const categoriesWithItems = computed(() => {
    return categories.value.map(category => ({
      ...category,
      items: menuItems.value.filter(item => String(item.category_id) === String(category.id) && item.is_available)
    }))
  })

  const featuredItems = computed(() => {
    return menuItems.value.filter(item => item.is_featured && item.is_available)
  })

  // Check if cache is still valid
  const isCacheValid = () => {
    return Date.now() - lastFetch.value < CACHE_DURATION
  }

  // Actions
  async function fetchCategories(force = false) {
    if (!force && categories.value.length > 0 && isCacheValid()) {
      return // Use cached data
    }
    
    loading.value = true
    error.value = null
    try {
      const response = await menuService.getCategories()
      categories.value = response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch categories'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchMenuItems(params?: { category_id?: number; featured?: boolean; search?: string }, force = false) {
    if (!force && menuItems.value.length > 0 && isCacheValid() && !params) {
      return // Use cached data
    }
    
    loading.value = true
    error.value = null
    try {
      const response = await menuService.getMenuItems(params)
      menuItems.value = response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch menu items'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchSettings(force = false) {
    if (!force && settings.value && isCacheValid()) {
      return // Use cached data
    }
    
    loading.value = true
    error.value = null
    try {
      const response = await menuService.getSettings()
      settings.value = response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch settings'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function loadAll(force = false) {
    // If cache is valid and we have data, skip loading
    if (!force && isCacheValid() && categories.value.length > 0 && menuItems.value.length > 0) {
      return
    }
    
    await Promise.all([
      fetchCategories(force),
      fetchMenuItems(undefined, force),
      fetchSettings(force)
    ])
    
    lastFetch.value = Date.now()
  }

  function getItemsByCategory(categoryId: number) {
    return menuItems.value.filter(item => String(item.category_id) === String(categoryId) && item.is_available)
  }

  function getCategoryBySlug(slug: string) {
    return categories.value.find(cat => cat.slug === slug)
  }

  function clearCache() {
    lastFetch.value = 0
  }

  return {
    // State
    categories,
    menuItems,
    settings,
    loading,
    error,
    // Getters
    categoriesWithItems,
    featuredItems,
    // Actions
    fetchCategories,
    fetchMenuItems,
    fetchSettings,
    loadAll,
    getItemsByCategory,
    getCategoryBySlug,
    clearCache,
  }
})
