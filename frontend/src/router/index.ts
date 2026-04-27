import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '../views/MenuView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import FeedbackView from '../views/FeedbackView.vue'
import ProfileView from '../views/ProfileView.vue'
import AboutView from '../views/AboutView.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MenuView,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView,
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: FeedbackView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    // Admin login route
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/admin/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    // Admin routes
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../views/admin/DashboardView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'categories',
          name: 'admin-categories',
          component: () => import('../views/admin/CategoriesView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'menu-items',
          name: 'admin-menu-items',
          component: () => import('../views/admin/MenuItemsView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('../views/admin/SettingsView.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
})

// Navigation guards
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    // Check if user is authenticated
    const isAuthenticated = await authStore.checkAuth()
    
    if (!isAuthenticated) {
      // Redirect to login page
      return '/admin/login'
    }
  }
  
  // Check if route requires guest (not authenticated)
  if (to.meta.requiresGuest) {
    const isAuthenticated = authStore.isAuthenticated
    
    if (isAuthenticated) {
      // Redirect to admin dashboard if already logged in
      return '/admin'
    }
  }
  
  // Allow navigation to continue
  return true
})

export default router
