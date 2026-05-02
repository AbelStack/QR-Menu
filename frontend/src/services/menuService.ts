import api from './api'

export interface MenuItem {
  id: number
  category_id: number
  name: string
  name_amharic: string
  description?: string
  description_amharic?: string
  ingredients?: string
  ingredients_amharic?: string
  price: number | null
  image?: string
  tags?: string[]
  is_available: boolean
  is_featured: boolean
  sort_order: number
  category?: Category
  created_at?: string
  updated_at?: string
}

export interface Category {
  id: number
  name: string
  name_amharic: string
  type?: 'Food' | 'Drink'
  slug: string
  sort_order: number
  is_active: boolean
  menu_items?: MenuItem[]
  menu_items_count?: number
  created_at?: string
  updated_at?: string
}

export interface RestaurantSettings {
  id: number
  name: string
  tagline?: string
  slug: string
  logo?: string
  phone?: string
  email?: string
  address?: string
  currency: string
  language: string
  is_active: boolean
  business_hours?: any
  created_at?: string
  updated_at?: string
}

export const menuService = {
  // Public endpoints (for customers)
  async getCategories() {
    const response = await api.get<{ data: Category[] }>('/public/categories')
    return response.data
  },

  async getMenuItems(params?: { category_id?: number; featured?: boolean; search?: string }) {
    const response = await api.get<{ data: MenuItem[] }>('/public/menu-items', { params })
    return response.data
  },

  async getMenuItem(id: number) {
    const response = await api.get<{ data: MenuItem }>(`/public/menu-items/${id}`)
    return response.data
  },

  async getSettings() {
    const response = await api.get<{ data: RestaurantSettings }>('/public/settings')
    return response.data
  },

  // Admin endpoints
  admin: {
    // Categories
    async getCategories() {
      const response = await api.get<{ data: Category[] }>('/admin/categories')
      return response.data
    },

    async createCategory(data: Partial<Category>) {
      const response = await api.post<{ data: Category }>('/admin/categories', data)
      return response.data
    },

    async updateCategory(id: number, data: Partial<Category>) {
      const response = await api.put<{ data: Category }>(`/admin/categories/${id}`, data)
      return response.data
    },

    async deleteCategory(id: number) {
      const response = await api.delete(`/admin/categories/${id}`)
      return response.data
    },

    async reorderCategories(categories: { id: number; sort_order: number }[]) {
      const response = await api.post('/admin/categories/reorder', { categories })
      return response.data
    },

    // Menu Items
    async getMenuItems(params?: { category_id?: number }) {
      const response = await api.get<{ data: MenuItem[] }>('/admin/menu-items', { params })
      return response.data
    },

    async createMenuItem(data: Partial<MenuItem>) {
      const response = await api.post<{ data: MenuItem }>('/admin/menu-items', data)
      return response.data
    },

    async updateMenuItem(id: number, data: Partial<MenuItem>) {
      const response = await api.put<{ data: MenuItem }>(`/admin/menu-items/${id}`, data)
      return response.data
    },

    async deleteMenuItem(id: number) {
      const response = await api.delete(`/admin/menu-items/${id}`)
      return response.data
    },

    async toggleAvailability(id: number) {
      const response = await api.post<{ data: MenuItem }>(`/admin/menu-items/${id}/toggle-availability`)
      return response.data
    },

    async toggleFeatured(id: number) {
      const response = await api.post<{ data: MenuItem }>(`/admin/menu-items/${id}/toggle-featured`)
      return response.data
    },

    async uploadImage(file: File) {
      const formData = new FormData()
      formData.append('image', file)

      const response = await api.post<{ url: string; path: string }>('/admin/menu-items/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    },

    // Settings
    async getSettings() {
      const response = await api.get<{ data: RestaurantSettings }>('/admin/settings')
      return response.data
    },

    async updateSettings(data: Partial<RestaurantSettings>) {
      const response = await api.put<{ data: RestaurantSettings }>('/admin/settings', data)
      return response.data
    },

    async uploadLogo(file: File) {
      const formData = new FormData()
      formData.append('logo', file)

      const response = await api.post<{ url: string; path: string }>('/admin/settings/upload-logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    },
  },
}
