import { ref } from 'vue'

// Global error state
export const globalError = ref<Error | null>(null)
export const hasGlobalError = ref(false)

// Error types
export const ErrorType = {
  NETWORK: 'network',
  API: 'api',
  RUNTIME: 'runtime',
  UNKNOWN: 'unknown',
} as const

export type ErrorType = (typeof ErrorType)[keyof typeof ErrorType]

export interface AppError {
  type: ErrorType
  message: string
  originalError?: Error
  context?: string
}

// Global error handler
export const handleGlobalError = (error: Error | AppError, context?: string) => {
  const appError: AppError = {
    type: ErrorType.UNKNOWN,
    message: error instanceof Error ? error.message : error.message,
    originalError: error instanceof Error ? error : undefined,
    context,
  }

  // Determine error type
  if (error instanceof Error) {
    const errorMessage = error.message
    const isNetworkError =
      errorMessage.includes('fetch') ||
      errorMessage.includes('network') ||
      errorMessage.includes('Failed to fetch') ||
      errorMessage.includes('timeout') ||
      errorMessage.includes('سرور پاسخ نمی‌دهد')

    if (isNetworkError) {
      appError.type = ErrorType.NETWORK
      appError.message = 'خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.'
    } else if (errorMessage.includes('404')) {
      appError.type = ErrorType.API
      appError.message = 'منبع مورد نظر یافت نشد.'
    } else if (errorMessage.includes('500')) {
      appError.type = ErrorType.API
      appError.message = 'خطای سرور. لطفاً بعداً تلاش کنید.'
    } else if (errorMessage.includes('خطا در اتصال به سرور')) {
      appError.type = ErrorType.NETWORK
      appError.message = errorMessage
    } else {
      appError.type = ErrorType.RUNTIME
    }
  }

  globalError.value = new Error(appError.message)
  hasGlobalError.value = true

  // Dispatch custom event for error boundary
  window.dispatchEvent(
    new CustomEvent('app-error', {
      detail: { error: appError },
    })
  )
}

// Clear global error
export const clearGlobalError = () => {
  globalError.value = null
  hasGlobalError.value = false
}

// Network error handler
export const handleNetworkError = (error: Error, context?: string) => {
  const networkError = new Error(`Network error in ${context}: ${error.message}`)
  handleGlobalError(networkError, context)
}

// API error handler
export const handleApiError = (error: Error, endpoint?: string) => {
  const apiError = new Error(`API error at ${endpoint}: ${error.message}`)
  handleGlobalError(apiError, endpoint)
}

// Setup global error listeners
export const setupGlobalErrorHandling = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    handleGlobalError(new Error(event.reason), 'unhandled-promise')
  })

  // Handle global errors
  window.addEventListener('error', (event) => {
    handleGlobalError(event.error || new Error(event.message), 'global-error')
  })
}
