<template>
  <header class="header">
    <router-link to="/" class="header__title">Product List</router-link>
    <router-link to="/cart" class="header__cart">
      🛒
      <span>{{ cartItemCount }}</span>
    </router-link>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Header',
  setup() {
    const store = useStore()
    const cartItemCount = computed(() => store.getters.cartItemCount)
    return { cartItemCount }
  }
})
</script> 