import { globalError, hasGlobalError } from './errorHandler'

export const handleGlobalError = (isRetrying: boolean, setError: (error: Error) => void) => {
  if (hasGlobalError.value && globalError.value && !isRetrying) {
    setError(globalError.value)
  }
}

export const handleAppError = (
  event: CustomEvent,
  isRetrying: boolean,
  setError: (error: Error) => void
) => {
  if (!isRetrying) {
    const appError = event.detail.error
    setError(new Error(appError.message))
  }
}

export const handleNavigationError = (
  event: ErrorEvent,
  isRetrying: boolean,
  setError: (error: Error) => void
) => {
  if (event.type === 'error' && event.error?.message?.includes('navigation') && !isRetrying) {
    setError(new Error('صفحه مورد نظر یافت نشد'))
  }
}

export const setupErrorListeners = (setError: (error: Error) => void, isRetrying: boolean) => {
  const handleAppErrorEvent = (event: CustomEvent) => handleAppError(event, isRetrying, setError)
  const handleNavigationErrorEvent = (event: ErrorEvent) =>
    handleNavigationError(event, isRetrying, setError)

  window.addEventListener('app-error', handleAppErrorEvent as EventListener)
  window.addEventListener('error', handleNavigationErrorEvent)

  return {
    removeListeners: () => {
      window.removeEventListener('app-error', handleAppErrorEvent as EventListener)
      window.removeEventListener('error', handleNavigationErrorEvent)
    },
  }
}
