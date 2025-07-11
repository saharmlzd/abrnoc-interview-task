<template>
  <div class="cart-page">
    <div class="cart-container">

      <div v-if="cartItems.length === 0" class="empty-cart">
        <div class="empty-cart-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </div>
        <h2>سبد خرید شما خالی است</h2>
        <p>محصولات مورد نظر خود را به سبد خرید اضافه کنید</p>
        <router-link to="/" class="shop-now-btn">
          <span>شروع خرید</span>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 20l1.41-1.41L7.83 13H20v-2H7.83l5.58-5.59L12 4l-8 8z"/>
          </svg>
        </router-link>
      </div>

        <div class="product-list__grid">
          <ProductCard
            v-for="item in sortedCartItems"
            :key="item.id"
            :product="item"
            :show-remove="true"
            @increase-quantity="increaseQuantity"
            @decrease-quantity="decreaseQuantity"
            @remove="removeFromCart"
          />
        </div>

        <div class="order-summary-bar">
          <div class="order-summary-bar__content">
            <div class="order-summary-bar__row order-summary-bar__row--total">
              <span>مجموع کل:</span>
              <span class="order-summary-bar__total">{{ formatPrice(totalCost) }} تومان</span>
              <div class="order-summary-bar__actions">
                <ActionButtons
                  :show-checkout="true"
                  :show-continue-shopping="true"
                  :can-checkout="cartItems.length > 0"
                  @checkout="checkout"
                />
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../products/ProductCard.vue'
import ActionButtons from '../../ui/ActionButtons.vue'
import { useCart } from '../../../hooks/useCart'
import { useThrottle } from '../../../hooks/useThrottle'
import { formatPrice, toPersianDigits } from '../../../utils/formatters'
import './Cart.css'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ShoppingCart',
  components: {
    ProductCard,
    ActionButtons,
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const { cart: cartItems, totalCost, increaseQuantity, decreaseQuantity, removeFromCart } = useCart()
    const { createThrottledFunction } = useThrottle(2000)

    const products = store.state.products
    // Sort cartItems to match the order of products
    const sortedCartItems = computed(() => {
      return [...cartItems.value].sort((a, b) => {
        const indexA = products.findIndex((p: any) => p.id === a.id)
        const indexB = products.findIndex((p: any) => p.id === b.id)
        return indexA - indexB
      })
    })

    const handleCheckout = () => {
      router.push('/payment')
    }

    const checkout = createThrottledFunction(handleCheckout)

    return {
      cartItems,
      sortedCartItems,
      totalCost,
      formatPrice,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      checkout,
      toPersianDigits,
    }
  },
})
</script>
