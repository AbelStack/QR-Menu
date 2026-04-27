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

  // Getters
  const categoriesWithItems = computed(() => {
    return categories.value.map(category => ({
      ...category,
      items: menuItems.value.filter(item => item.category_id === category.id && item.is_available)
    }))
  })

  const featuredItems = computed(() => {
    return menuItems.value.filter(item => item.is_featured && item.is_available)
  })

  // Actions
  async function fetchCategories() {
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

  async function fetchMenuItems(params?: { category_id?: number; featured?: boolean; search?: string }) {
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

  async function fetchSettings() {
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

  async function loadAll() {
    await Promise.all([
      fetchCategories(),
      fetchMenuItems(),
      fetchSettings()
    ])
  }

  function getItemsByCategory(categoryId: number) {
    return menuItems.value.filter(item => item.category_id === categoryId && item.is_available)
  }

  function getCategoryBySlug(slug: string) {
    return categories.value.find(cat => cat.slug === slug)
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
  }
})
