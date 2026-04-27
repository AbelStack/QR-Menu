import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '../views/MenuView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import FeedbackView from '../views/FeedbackView.vue'
import ProfileView from '../views/ProfileView.vue'
import AboutView from '../views/AboutView.vue'

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
    // Admin routes
    {
      path: '/admin',
      redirect: '/admin/login',
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/admin/LoginView.vue'),
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/admin/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/categories',
      name: 'admin-categories',
      component: () => import('../views/admin/CategoriesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/menu-items',
      name: 'admin-menu-items',
      component: () => import('../views/admin/MenuItemsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/feedback',
      name: 'admin-feedback',
      component: () => import('../views/admin/FeedbackManagementView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/settings',
      name: 'admin-settings',
      component: () => import('../views/admin/SettingsView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// Navigation guard for admin routes
router.beforeEach((to) => {
  const isAuthenticated = localStorage.getItem('admin_token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/admin/login'
  } else if (to.path === '/admin/login' && isAuthenticated) {
    return '/admin/dashboard'
  }
  
  return true
})

export default router
