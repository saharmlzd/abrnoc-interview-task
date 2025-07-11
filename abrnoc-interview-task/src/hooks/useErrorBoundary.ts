import { ref, onErrorCaptured } from 'vue'

export function useErrorBoundary() {
  const hasError = ref(false)
  const error = ref<Error | null>(null)

  const resetError = () => {
    hasError.value = false
    error.value = null
  }

  const captureError = (err: Error, instance: any, info: string) => {
    console.error('ErrorBoundary caught an error:', err)
    console.error('Error info:', info)
    
    hasError.value = true
    error.value = err
    
    // Return false to prevent the error from propagating further
    return false
  }

  onErrorCaptured(captureError)

  return {
    hasError,
    error,
    resetError,
    captureError
  }
} 