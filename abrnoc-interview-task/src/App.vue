<template>
  <div id="app">
    <ErrorBoundary>
      <Header />
      <div class="app-container">
        <router-view />
      </div>
    </ErrorBoundary>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/common/Header.vue'
import ErrorBoundary from './components/common/ErrorBoundary.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    ErrorBoundary,
  },
  setup() {
    return {}
  },
})
</script>
