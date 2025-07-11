import { ref, computed } from 'vue'
import { handleGlobalError } from '../utils/errorHandler'

export interface QueryOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: string) => void
  immediate?: boolean
}

export const useBaseQuery = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const data = ref<unknown>(null)

  const hasError = computed(() => error.value !== null)
  const isLoading = computed(() => loading.value)

  const executeQuery = async <T>(
    queryFn: () => Promise<T>,
    options: QueryOptions<T> = {}
  ): Promise<T | null> => {
    loading.value = true
    error.value = null

    try {
      // Add timeout to handle unresponsive API calls
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error('Request timeout - سرور پاسخ نمی‌دهد'))
        }, 10000) // 10 second timeout
      })

      const result = await Promise.race([queryFn(), timeoutPromise])
      data.value = result
      options.onSuccess?.(result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      error.value = errorMessage
      options.onError?.(errorMessage)

      // Handle global error for network/API failures
      if (err instanceof Error) {
        handleGlobalError(err, 'api-query')
      }

      return null
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const clearData = () => {
    data.value = null
  }

  const reset = () => {
    loading.value = false
    error.value = null
    data.value = null
  }

  return {
    loading: isLoading,
    error: computed(() => error.value),
    data: computed(() => data.value),
    hasError,
    executeQuery,
    clearError,
    clearData,
    reset,
  }
}
