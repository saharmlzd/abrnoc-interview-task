<template>
  <div class="product-list">
    <div v-if="loading" class="product-list__loading">
      در حال بارگذاری...
    </div>
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

    const increaseQuantity = (productId: string) => {
      store.dispatch('increaseQuantity', productId)
    }

    const decreaseQuantity = (productId: string) => {
      store.dispatch('decreaseQuantity', productId)
    }

    onMounted(() => {
      store.dispatch('fetchProducts')
    })

    return { products, loading, error, addToCart, increaseQuantity, decreaseQuantity }
  }
})
</script>

<style scoped>
.product-list {
  width: 100%;
  direction: rtl;
  text-align: right;
}
.product-list__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
  width: 100%;
  justify-items: center;
  margin: 0 auto;
}
.product-list__loading,
.product-list__error {
  font-size: 1.2rem;
  color: #e74c3c;
  text-align: center;
  padding: var(--spacing-lg) 0;
  width: 100%;
  background: none;
}
@media (min-width: 768px) {
  .product-list__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-xxl);
    max-width: 100%;
  }
}
@media (min-width: 1024px) {
  .product-list__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-xxl);
    max-width: 100%;
  }
}
@media (min-width: 1440px) {
  .product-list__grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
    max-width: 100%;
  }
}
@media (min-width: 1920px) {
  .product-list__grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 3.5rem;
    max-width: 100%;
  }
}
</style>