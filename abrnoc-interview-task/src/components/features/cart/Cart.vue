<template>
  <div class="cart-page">
    <div class="cart-container">
      <div v-if="cartItems.length === 0" class="empty-cart">
        <div class="empty-cart-icon">
          <img :src="CartIcon" alt="سبد خرید خالی" class="empty-cart-svg" />
        </div>
        <h2>سبد خرید شما خالی است</h2>
        <p>محصولات مورد نظر خود را به سبد خرید اضافه کنید</p>
        <router-link to="/" class="shop-now-btn">
          <span>شروع خرید</span>
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
import type { Product } from '../../../types/cart-store'
import { CartIcon, ArrowRightIcon } from '../../../assets'

export default defineComponent({
  name: 'ShoppingCart',
  components: {
    ProductCard,
    ActionButtons,
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    const {
      cart: cartItems,
      totalCost,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
    } = useCart()
    const { createThrottledFunction } = useThrottle(2000)

    const products = store.state.products
    // Sort cartItems to match the order of products
    const sortedCartItems = computed(() => {
      return [...cartItems.value].sort((a, b) => {
        const indexA = products.findIndex((p: Product) => p.id === a.id)
        const indexB = products.findIndex((p: Product) => p.id === b.id)
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
      CartIcon,
      ArrowRightIcon,
    }
  },
})
</script>
