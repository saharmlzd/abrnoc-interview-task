<template>
  <div class="error-test">
    <h3>Error Test Component</h3>
    <p>This component is used to test the error boundary.</p>
    <button @click="throwError" class="error-test__button">Throw Error</button>
    <button @click="throwAsyncError" class="error-test__button">Throw Async Error</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import './ErrorTest.css'

export default defineComponent({
  name: 'ErrorTest',
  setup() {
    const throwError = () => {
      throw new Error('This is a test error from ErrorTest component')
    }

    const throwAsyncError = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
      throw new Error('This is an async test error from ErrorTest component')
    }

    return {
      throwError,
      throwAsyncError,
    }
  },
})
</script>
