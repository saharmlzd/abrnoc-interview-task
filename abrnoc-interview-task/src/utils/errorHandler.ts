import { ref } from 'vue'

// Global error state
export const globalError = ref<Error | null>(null)
export const hasGlobalError = ref(false)

// Error types
export const ErrorType = {
  NETWORK: 'network',
  API: 'api',
  RUNTIME: 'runtime',
  UNKNOWN: 'unknown'
} as const

export type ErrorType = typeof ErrorType[keyof typeof ErrorType]

export interface AppError {
  type: ErrorType
  message: string
  originalError?: Error
  context?: string
}

// Global error handler
export const handleGlobalError = (error: Error | AppError, context?: string) => {
  console.error('Global error caught:', error)
  
  const appError: AppError = {
    type: ErrorType.UNKNOWN,
    message: error instanceof Error ? error.message : error.message,
    originalError: error instanceof Error ? error : undefined,
    context
  }

  // Determine error type
  if (error instanceof Error) {
    if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('Failed to fetch') || error.message.includes('timeout') || error.message.includes('سرور پاسخ نمی‌دهد')) {
      appError.type = ErrorType.NETWORK
      appError.message = 'خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.'
    } else if (error.message.includes('404')) {
      appError.type = ErrorType.API
      appError.message = 'منبع مورد نظر یافت نشد.'
    } else if (error.message.includes('500')) {
      appError.type = ErrorType.API
      appError.message = 'خطای سرور. لطفاً بعداً تلاش کنید.'
    } else if (error.message.includes('خطا در اتصال به سرور')) {
      appError.type = ErrorType.NETWORK
      appError.message = error.message
    } else {
      appError.type = ErrorType.RUNTIME
    }
  }

  globalError.value = new Error(appError.message)
  hasGlobalError.value = true

  // Dispatch custom event for error boundary
  window.dispatchEvent(new CustomEvent('app-error', { 
    detail: { error: appError } 
  }))
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
    console.error('Unhandled promise rejection:', event.reason)
    handleGlobalError(new Error(event.reason), 'unhandled-promise')
  })

  // Handle global errors
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error)
    handleGlobalError(event.error || new Error(event.message), 'global-error')
  })
} 