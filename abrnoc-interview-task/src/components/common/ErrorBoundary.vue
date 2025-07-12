<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-boundary__content">
      <h2 class="error-boundary__title">{{ errorTitle }}</h2>
      <p class="error-boundary__message">
        {{ errorMessage }}
      </p>
      <div class="error-boundary__details" v-if="showDetails">
        <details>
          <summary>جزئیات خطا</summary>
          <pre>{{ errorDetails }}</pre>
        </details>
      </div>
      <div class="error-boundary__actions">
        <button @click="goHome" class="error-boundary__button error-boundary__button--primary">
          بازگشت به صفحه اصلی
        </button>
        <button @click="retry" class="error-boundary__button">تلاش مجدد</button>
      </div>
    </div>
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useErrorBoundary } from '../../hooks/useErrorBoundary'

export default defineComponent({
  name: 'ErrorBoundary',
  props: {
    showDetails: {
      type: Boolean as () => boolean,
      default: true,
    },
  },
  emits: ['error-caught', 'retry'],
  setup(props, { emit }) {
    const errorBoundary = useErrorBoundary(props.showDetails, emit)

    return {
      ...errorBoundary,
    }
  },
})
</script>

<style>
@import './ErrorBoundary.css';
</style>
