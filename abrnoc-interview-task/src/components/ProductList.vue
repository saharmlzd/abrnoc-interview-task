<template>
  <div class="product-list">
    <div v-if="loading" class="loading">در حال بارگذاری...</div>
    <div v-else>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ProductCard from './ProductCard.vue'
import type { Product } from '../types/cart-store'

export default defineComponent({
  name: 'ProductList',
  components: {
    ProductCard
  },
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

    onMounted(() => {
      store.dispatch('fetchProducts')
    })

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

.loading,
.error {
  font-size: 18px;
  color: red;
}
</style>