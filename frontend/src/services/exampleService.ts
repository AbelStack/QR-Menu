import api from './api'

// Example service demonstrating how to use the API
export const exampleService = {
  // GET request example
  async getItems() {
    try {
      const response = await api.get('/items')
      return response.data
    } catch (error) {
      console.error('Error fetching items:', error)
      throw error
    }
  },

  // GET single item by ID
  async getItem(id: number | string) {
    try {
      const response = await api.get(`/items/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching item ${id}:`, error)
      throw error
    }
  },

  // POST request example
  async createItem(data: any) {
    try {
      const response = await api.post('/items', data)
      return response.data
    } catch (error) {
      console.error('Error creating item:', error)
      throw error
    }
  },

  // PUT request example
  async updateItem(id: number | string, data: any) {
    try {
      const response = await api.put(`/items/${id}`, data)
      return response.data
    } catch (error) {
      console.error(`Error updating item ${id}:`, error)
      throw error
    }
  },

  // DELETE request example
  async deleteItem(id: number | string) {
    try {
      const response = await api.delete(`/items/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting item ${id}:`, error)
      throw error
    }
  },
}
