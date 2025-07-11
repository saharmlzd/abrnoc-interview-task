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

<style scoped>
.error-test {
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin: 1rem 0;
}

.error-test__button {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  cursor: pointer;
}

.error-test__button:hover {
  background-color: #dc2626;
}
</style>
