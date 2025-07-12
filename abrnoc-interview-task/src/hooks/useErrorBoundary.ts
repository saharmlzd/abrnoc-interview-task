import { ref, onErrorCaptured, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { clearGlobalError } from '../utils/errorHandler'
import {
  isNotFoundError,
  getErrorTitle,
  getErrorMessage,
  getErrorDetails,
} from '../utils/errorDetection'
import { handleGlobalError, setupErrorListeners } from '../utils/errorHandlers'

export function useErrorBoundary() {
  const router = useRouter()
  const hasError = ref(false)
  const error = ref<Error | null>(null)
  const showDetails = ref(false)
  const isRetrying = ref(false)

  const errorTitle = computed(() => getErrorTitle(error.value))
  const errorMessage = computed(() => getErrorMessage(error.value))
  const errorDetails = computed(() => getErrorDetails(error.value))

  const setError = (err: Error) => {
    hasError.value = true
    error.value = err
  }

  const resetError = () => {
    hasError.value = false
    error.value = null
    showDetails.value = false
    isRetrying.value = false
    clearGlobalError()
  }

  const retry = async () => {
    isRetrying.value = true
    resetError()

    await nextTick()

    if (isNotFoundError(error.value)) {
      router.go(0)
    } else {
      setTimeout(() => {
        isRetrying.value = false
      }, 100)
    }
  }

  const goHome = async () => {
    resetError()
    await nextTick()

    const currentPath = window.location.pathname
    const validRoutes = ['/', '/cart', '/payment', '/test-error']

    if (!validRoutes.includes(currentPath)) {
      window.location.href = '/'
    } else {
      try {
        await router.push('/')
      } catch {
        window.location.href = '/'
      }
    }
  }

  onErrorCaptured((err: Error) => {
    if (!isRetrying.value) {
      setError(err)
    }
    return false
  })

  onMounted(() => {
    handleGlobalError(isRetrying.value, setError)
    const { removeListeners } = setupErrorListeners(setError, isRetrying.value)

    onUnmounted(() => {
      removeListeners()
    })
  })

  return {
    hasError,
    error,
    errorTitle,
    errorMessage,
    errorDetails,
    showDetails,
    resetError,
    retry,
    goHome,
  }
}
