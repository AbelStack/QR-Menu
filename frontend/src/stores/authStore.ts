import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService, type User, type LoginCredentials } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(authService.getUser())
  const isAuthenticated = ref(authService.isAuthenticated())
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function login(credentials: LoginCredentials) {
    loading.value = true
    error.value = null
    
    try {
      const response = await authService.login(credentials)
      user.value = response.user
      isAuthenticated.value = true
      return response
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed. Please check your credentials.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    error.value = null
    
    try {
      await authService.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      isAuthenticated.value = false
      loading.value = false
    }
  }

  async function checkAuth() {
    if (!authService.isAuthenticated()) {
      user.value = null
      isAuthenticated.value = false
      return false
    }

    try {
      const userData = await authService.me()
      user.value = userData
      isAuthenticated.value = true
      return true
    } catch (err) {
      authService.clearAuth()
      user.value = null
      isAuthenticated.value = false
      return false
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    checkAuth,
  }
})
