import { ref } from 'vue'

export const globalError = ref<Error | null>(null)
export const hasGlobalError = ref(false)

export const ErrorType = {
  NETWORK: 'network',
  API: 'api',
  RUNTIME: 'runtime',
  NAVIGATION: 'navigation',
  NOT_FOUND: 'not_found',
  UNKNOWN: 'unknown',
} as const

export type ErrorType = (typeof ErrorType)[keyof typeof ErrorType]

export interface AppError {
  type: ErrorType
  message: string
  originalError?: Error
  context?: string
}

export const handleGlobalError = (error: Error | AppError, context?: string) => {
  const appError: AppError = {
    type: ErrorType.UNKNOWN,
    message: error instanceof Error ? error.message : error.message,
    originalError: error instanceof Error ? error : undefined,
    context,
  }

  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase()
    const isNetworkError =
      errorMessage.includes('fetch') ||
      errorMessage.includes('network') ||
      errorMessage.includes('failed to fetch') ||
      errorMessage.includes('timeout') ||
      errorMessage.includes('سرور پاسخ نمی‌دهد')

    const isNavigationError =
      errorMessage.includes('navigation') ||
      errorMessage.includes('route not found') ||
      errorMessage.includes('page not found') ||
      errorMessage.includes('404') ||
      errorMessage.includes('not found')

    if (isNavigationError) {
      appError.type = ErrorType.NAVIGATION
      appError.message = 'صفحه مورد نظر یافت نشد. ممکن است آدرس اشتباه باشد یا صفحه حذف شده باشد.'
    } else if (isNetworkError) {
      appError.type = ErrorType.NETWORK
      appError.message = 'خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.'
    } else if (errorMessage.includes('404')) {
      appError.type = ErrorType.NOT_FOUND
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

  window.dispatchEvent(
    new CustomEvent('app-error', {
      detail: { error: appError },
    })
  )
}

export const clearGlobalError = () => {
  globalError.value = null
  hasGlobalError.value = false
}

export const handleNetworkError = (error: Error, context?: string) => {
  const networkError = new Error(`Network error in ${context}: ${error.message}`)
  handleGlobalError(networkError, context)
}

export const handleApiError = (error: Error, endpoint?: string) => {
  const apiError = new Error(`API error at ${endpoint}: ${error.message}`)
  handleGlobalError(apiError, endpoint)
}

export const handleNavigationError = (error: Error, path?: string) => {
  const navigationError = new Error(`Navigation error to ${path}: ${error.message}`)
  handleGlobalError(navigationError, path)
}

export const setupGlobalErrorHandling = () => {
  window.addEventListener('unhandledrejection', (event) => {
    handleGlobalError(new Error(event.reason), 'unhandled-promise')
  })

  window.addEventListener('error', (event) => {
    handleGlobalError(event.error || new Error(event.message), 'global-error')
  })
}
