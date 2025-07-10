<template>
  <div class="product-list">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <div v-for="product in products" :key="product.id" class="product-card">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }} USD</p>
        <button @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex';  // وارد کردن صحیح از vuex
import type { Product } from '../types/cart-store'

export default defineComponent({
  name: 'ProductList',
  setup() {
    const store = useStore()

    const products = computed(() => store.state.products)
    const loading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)

    const addToCart = (product: Product) => {
      store.dispatch('addToCartAction', {
        productId: product.id,
        quantity: 1
      })
    }

    store.dispatch('fetchProducts')

    return { products, loading, error, addToCart }
  }
})
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  border: 1px solid #ccc;
  padding: 15px;
  width: 200px;
  text-align: center;
}

.product-card h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.product-card p {
  font-size: 16px;
  margin-bottom: 10px;
}

button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.loading,
.error {
  font-size: 18px;
  color: red;
}
</style>
