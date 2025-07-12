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
import { defineComponent, onMounted, computed } from 'vue'
import ProductCard from './ProductCard.vue'
import { useProductsQuery } from '../../../api/products'
import { useCart } from '../../../composables/useCart'
import { useStore } from 'vuex'
import type { Product } from '../../../types/cart-store'

export default defineComponent({
  name: 'ProductList',
  components: {
    ProductCard,
  },
  setup() {
    const store = useStore()
    const { fetchProducts, updateProductQuantityInList } = useProductsQuery()
    const { addToCart, increaseQuantity, decreaseQuantity } = useCart()

    onMounted(async () => {
      await fetchProducts({
        onSuccess: (data) => {
          store.commit('setProducts', data)
        },
      })
    })

    const storeProducts = computed(() => store.state.products)
    const storeLoading = computed(() => store.state.loading)
    const storeError = computed(() => store.state.error)

    const handleUpdateProductQuantity = async (productId: string, newQuantity: number) => {
      await updateProductQuantityInList(productId, newQuantity, {
        onSuccess: (updatedProduct) => {
          const updatedProducts = storeProducts.value.map((p: Product) =>
            p.id === productId ? updatedProduct : p
          )
          store.commit('setProducts', updatedProducts)
        },
        onError: (error) => {
          alert(`خطا در بروزرسانی موجودی: ${error}`)
        },
      })
    }

    return {
      products: storeProducts,
      loading: storeLoading,
      error: storeError,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      handleUpdateProductQuantity,
    }
  },
})
</script>

<style>
@import './ProductList.css';
</style>
