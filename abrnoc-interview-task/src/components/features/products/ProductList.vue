<template>
  <div class="product-list">
    <div v-if="loading" class="product-list__loading">در حال بارگذاری...</div>
    <div v-else class="product-list__grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
        @increase-quantity="increaseQuantity"
        @decrease-quantity="decreaseQuantity"
      />
    </div>
    <div v-if="error" class="product-list__error">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ProductCard from './ProductCard.vue'
import type { Product } from '../../../types/cart-store'
import './ProductList.css'

export default defineComponent({
  name: 'ProductList',
  components: {
    ProductCard,
  },
  setup() {
    const store = useStore()
    const products = computed(() => store.state.products)
    const loading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    const addToCart = (product: Product) => {
      store.dispatch('addToCartAction', {
        productId: product.id,
        quantity: 1,
      })
    }
    const increaseQuantity = (productId: string) => { 
      store.dispatch('increaseQuantity', productId) 
    }
    const decreaseQuantity = (productId: string) => { 
      store.dispatch('decreaseQuantity', productId) 
    }
    onMounted(() => { store.dispatch('fetchProducts') })
    return { products, loading, error, addToCart, increaseQuantity, decreaseQuantity }
  },
})
</script>
