import api from './api'

export interface User {
  id: number
  name: string
  email: string
  role: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  user: User
  token: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials)
    
    // Store token and user
    if (response.data.token) {
      localStorage.setItem('admin_token', response.data.token)
      localStorage.setItem('admin_user', JSON.stringify(response.data.user))
    }
    
    return response.data
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
    }
  },

  async me(): Promise<User> {
    const response = await api.get<{ user: User }>('/auth/me')
    return response.data.user
  },

  getToken(): string | null {
    return localStorage.getItem('admin_token')
  },

  getUser(): User | null {
    const userStr = localStorage.getItem('admin_user')
    return userStr ? JSON.parse(userStr) : null
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  },

  clearAuth(): void {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
  }
}
