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
      <button @click="resetError" class="error-boundary__button">تلاش مجدد</button>
    </div>
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onErrorCaptured, computed, onMounted, onUnmounted } from 'vue'
import { globalError, hasGlobalError, clearGlobalError } from '../../utils/errorHandler'
import './ErrorBoundary.css'

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
      return JSON.stringify(
        {
          message: error.value.message,
          stack: error.value.stack,
          name: error.value.name,
        },
        null,
        2
      )
    })

    const resetError = () => {
      hasError.value = false
      error.value = null
      showDetails.value = false
      clearGlobalError()
    }

    // Handle component errors
    onErrorCaptured((err: Error) => {
      hasError.value = true
      error.value = err

      // Return false to prevent the error from propagating further
      return false
    })

    
    const handleGlobalError = () => {
      if (hasGlobalError.value && globalError.value) {
        hasError.value = true
        error.value = globalError.value
      }
    }

    const handleAppError = (event: CustomEvent) => {
      const appError = event.detail.error
      hasError.value = true
      error.value = new Error(appError.message)
    }

    onMounted(() => {
      handleGlobalError()
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
      resetError,
    }
  },
})
</script>
