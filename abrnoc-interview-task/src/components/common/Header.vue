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
import { defineComponent } from 'vue'
import { useCart } from '../../hooks/useCart'
import './Header.css'

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const { cartItemCount } = useCart()
    return { cartItemCount }
  },
})
</script>
