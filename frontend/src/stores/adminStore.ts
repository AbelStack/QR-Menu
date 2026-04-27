import { defineStore } from 'pinia'
import { ref } from 'vue'
import { menuService, type Category, type MenuItem, type RestaurantSettings } from '@/services/menuService'

export const useAdminStore = defineStore('admin', () => {
  // State
  const categories = ref<Category[]>([])
  const menuItems = ref<MenuItem[]>([])
  const settings = ref<RestaurantSettings | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Categories
  async function fetchCategories() {
    loading.value = true
    error.value = null
    try {
      const response = await menuService.admin.getCategories()
      categories.value = response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch categories'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createCategory(data: Partial<Category>) {
    loading.value = true
    error.value = null
    try {
      const response = await menuService.admin.createCategory(data)
      categories.value.push(response.data)
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to create category'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateCategory(id: number, data: Partial<Category>) {
    loading.value = true
    error.value = null
    try {
      const response = await menuService.admin.updateCategory(id, data)
      const index = categories.value.findIndex(c => c.id === id)
      if (index !== -1) {
        categories.value[index] = response.data
      }
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to update category'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteCategory(id: number) {
    loading.value = true
    error.value = null
    try {
      await menuService.admin.deleteCategory(id)
      categories.value = categories.value.filter(c => c.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete category'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Menu Items
  async function fetchMenuItems(params?: { category_id?: number }) {
    loading.value = true
    error.value = null
    try {
      const response = await menuService.admin.getMenuItems(params)
      menuItems.value = response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch menu items'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createMenuItem(data: Partial<MenuItem>) {
    loading.value = true
    error.value = null
    try {
      const response = await menuService.admin.createMenuItem(data)
      menuItems.value.push(response.data)
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to create menu item'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateMenuItem(id: number, data: Partial<MenuItem>) {
    loading.value = true
    error.value = null
    try {
      const response = await menuService.admin.updateMenuItem(id, data)
      const index = menuItems.value.findIndex(item => item.id === id)
      if (index !== -1) {
        menuItems.value[index] = response.data
      }
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to update menu item'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteMenuItem(id: number) {
    loading.value = true
    error.value = null
    try {
      await menuService.admin.deleteMenuItem(id)
      menuItems.value = menuItems.value.filter(item => item.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete menu item'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function toggleAvailability(id: number) {
    loading.value = true
    error.value = null
    try {
      const response = await menuService.admin.toggleAvailability(id)
      const index = menuItems.value.findIndex(item => item.id === id)
      if (index !== -1) {
        menuItems.value[index] = response.data
      }
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to toggle availability'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function toggleFeatured(id: number) {
    loading.value = true
    error.value = null
    try {
      const response = await menuService.admin.toggleFeatured(id)
      const index = menuItems.value.findIndex(item => item.id === id)
      if (index !== -1) {
        menuItems.value[index] = response.data
      }
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to toggle featured'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Settings
  async function fetchSettings() {
    loading.value = true
    error.value = null
    try {
      const response = await menuService.admin.getSettings()
      settings.value = response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch settings'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateSettings(data: Partial<RestaurantSettings>) {
    loading.value = true
    error.value = null
    try {
      const response = await menuService.admin.updateSettings(data)
      settings.value = response.data
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to update settings'
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

  return {
    // State
    categories,
    menuItems,
    settings,
    loading,
    error,
    // Actions
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    fetchMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailability,
    toggleFeatured,
    fetchSettings,
    updateSettings,
    loadAll,
  }
})
