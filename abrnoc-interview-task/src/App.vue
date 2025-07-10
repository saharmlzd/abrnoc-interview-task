<template>
  <div id="app">
    <div class="app-container">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: { Header }
}
</script>
