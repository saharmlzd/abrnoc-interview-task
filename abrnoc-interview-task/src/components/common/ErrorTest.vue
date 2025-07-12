<template>
  <div class="error-test">
    <h3>{{ title }}</h3>
    <p>{{ description || 'This component is used to test the error boundary.' }}</p>
    <button @click="throwError" class="error-test__button">{{ errorButtonText }}</button>
    <button @click="throwAsyncError" class="error-test__button">{{ asyncErrorButtonText }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorTest',
  props: {
    title: {
      type: String as () => string,
      default: 'Error Test Component',
    },
    description: {
      type: String as () => string,
      default: '',
    },
    errorButtonText: {
      type: String as () => string,
      default: 'Throw Error',
    },
    asyncErrorButtonText: {
      type: String as () => string,
      default: 'Throw Async Error',
    },
    errorMessage: {
      type: String as () => string,
      default: 'This is a test error from ErrorTest component',
    },
    asyncErrorMessage: {
      type: String as () => string,
      default: 'This is an async test error from ErrorTest component',
    },
  },
  emits: ['error-thrown', 'async-error-thrown'],
  setup(props, { emit }) {
    const throwError = (): never => {
      const error = new Error(props.errorMessage)
      emit('error-thrown', error)
      throw error
    }

    const throwAsyncError = async (): Promise<never> => {
      await new Promise((resolve) => setTimeout(resolve, 100))
      const error = new Error(props.asyncErrorMessage)
      emit('async-error-thrown', error)
      throw error
    }

    return {
      throwError,
      throwAsyncError,
    }
  },
})
</script>

<style>
@import './ErrorTest.css';
</style>
