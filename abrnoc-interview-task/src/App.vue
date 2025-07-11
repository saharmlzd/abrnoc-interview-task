<template>
  <div id="app">
    <ErrorBoundary>
      <div class="app-container">
        <Header />
        <router-view />
      </div>
    </ErrorBoundary>
  </div>
</template>

<script lang="ts">
import Header from './components/common/Header.vue'
import ErrorBoundary from './components/common/ErrorBoundary.vue'

export default {
  name: 'App',
  components: {
    Header,
    ErrorBoundary,
  },
}
</script>
