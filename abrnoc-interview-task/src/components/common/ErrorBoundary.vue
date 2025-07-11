<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-boundary__content">
      <h2 class="error-boundary__title">خطایی رخ داده است</h2>
      <p class="error-boundary__message">
        {{ errorMessage }}
      </p>
      <div class="error-boundary__details" v-if="showDetails">
        <details>
          <summary>جزئیات خطا</summary>
          <pre>{{ errorDetails }}</pre>
        </details>
      </div>
      <button @click="resetError" class="error-boundary__button">
        تلاش مجدد
      </button>
    </div>
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onErrorCaptured, computed, onMounted, onUnmounted } from 'vue'
import { globalError, hasGlobalError, clearGlobalError } from '../../utils/errorHandler'

export default defineComponent({
  name: 'ErrorBoundary',
  setup() {
    const hasError = ref(false)
    const error = ref<Error | null>(null)
    const showDetails = ref(false)

    const errorMessage = computed(() => {
      if (!error.value) return 'متأسفانه مشکلی در بارگذاری این بخش پیش آمده است.'
      
      // Handle different types of errors
      if (error.value.message.includes('fetch') || error.value.message.includes('network')) {
        return 'خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.'
      }
      
      if (error.value.message.includes('404')) {
        return 'منبع مورد نظر یافت نشد.'
      }
      
      if (error.value.message.includes('500')) {
        return 'خطای سرور. لطفاً بعداً تلاش کنید.'
      }
      
      return error.value.message || 'متأسفانه مشکلی در بارگذاری این بخش پیش آمده است.'
    })

    const errorDetails = computed(() => {
      if (!error.value) return ''
      return JSON.stringify({
        message: error.value.message,
        stack: error.value.stack,
        name: error.value.name
      }, null, 2)
    })

    const resetError = () => {
      hasError.value = false
      error.value = null
      showDetails.value = false
      clearGlobalError()
    }

    // Handle component errors
    onErrorCaptured((err: Error, instance, info) => {
      console.error('ErrorBoundary caught an error:', err)
      console.error('Error info:', info)
      
      hasError.value = true
      error.value = err
      
      // Return false to prevent the error from propagating further
      return false
    })

    // Handle global errors
    const handleGlobalError = () => {
      if (hasGlobalError.value && globalError.value) {
        hasError.value = true
        error.value = globalError.value
      }
    }

    // Listen for global errors
    const handleAppError = (event: CustomEvent) => {
      const appError = event.detail.error
      hasError.value = true
      error.value = new Error(appError.message)
    }

    onMounted(() => {
      // Check for existing global errors
      handleGlobalError()
      
      // Listen for new global errors
      window.addEventListener('app-error', handleAppError as EventListener)
    })

    onUnmounted(() => {
      window.removeEventListener('app-error', handleAppError as EventListener)
    })

    return {
      hasError,
      error,
      errorMessage,
      errorDetails,
      showDetails,
      resetError
    }
  }
})
</script>

<style scoped>
.error-boundary {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 2rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  margin: 1rem 0;
}

.error-boundary__content {
  text-align: center;
  max-width: 400px;
}

.error-boundary__title {
  color: #dc2626;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.error-boundary__message {
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.error-boundary__details {
  margin-bottom: 1.5rem;
  text-align: left;
}

.error-boundary__details summary {
  cursor: pointer;
  color: #dc2626;
  font-weight: 500;
}

.error-boundary__details pre {
  background-color: #f3f4f6;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  overflow-x: auto;
  margin-top: 0.5rem;
}

.error-boundary__button {
  background-color: #dc2626;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.error-boundary__button:hover {
  background-color: #b91c1c;
}

.error-boundary__button:focus {
  outline: 2px solid #dc2626;
  outline-offset: 2px;
}
</style> 