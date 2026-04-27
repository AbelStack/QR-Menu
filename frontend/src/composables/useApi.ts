import { ref } from 'vue'
import type { Ref } from 'vue'

interface UseApiOptions {
  immediate?: boolean
}

interface UseApiReturn<T> {
  data: Ref<T | null>
  error: Ref<string | null>
  loading: Ref<boolean>
  execute: (...args: any[]) => Promise<void>
}

/**
 * Composable for handling API calls with loading and error states
 * 
 * @example
 * const { data, loading, error, execute } = useApi(menuService.getMenuItems)
 * await execute()
 */
export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<string | null>(null)
  const loading = ref(false)

  const execute = async (...args: any[]) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await apiFunction(...args)
      data.value = result
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message || 'An error occurred'
      console.error('API Error:', err)
    } finally {
      loading.value = false
    }
  }

  if (options.immediate) {
    execute()
  }

  return {
    data,
    error,
    loading,
    execute,
  }
}
