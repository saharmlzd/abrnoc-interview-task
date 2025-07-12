<template>
  <div class="cart-page">
    <div class="cart-container">
      <EmptyCart v-if="isEmpty" />

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div v-if="!isEmpty" class="cart-content">
        <div class="product-list__grid">
          <ProductCard
            v-for="item in cartItems"
            :key="item.id"
            :product="item"
            :show-remove="true"
            @increase-quantity="increaseQuantity"
            @decrease-quantity="decreaseQuantity"
            @remove="removeFromCart"
          />
        </div>

        <SummaryBar
          :total-cost="totalCost"
          :can-checkout="cartItems.length > 0"
          @checkout="checkout"
          :is-processing="isProcessing"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../products/ProductCard.vue'
import ActionButtons from '../../common/product-card/ActionButtons.vue'
import EmptyCart from './EmptyCart.vue'
import SummaryBar from './SummaryBar.vue'
import { useCart } from '../../../composables/useCart'
import { useThrottle } from '../../../composables/useThrottle'
import { formatPrice, toPersianDigits } from '../../../utils/formatters'
import { ArrowRightIcon } from '../../../assets'
import { checkout as checkoutAPI } from '../../../api/cart'

export default defineComponent({
  name: 'CartPage',
  components: {
    ProductCard,
    ActionButtons,
    EmptyCart,
    SummaryBar,
  },
  setup() {
    const router = useRouter()

    const isProcessing = ref(false)
    const errorMessage = ref('')

    const {
      cart: cartItems,
      totalCost,
      isEmpty,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
    } = useCart()

    const { createThrottledFunction } = useThrottle(2000)

    /**
     * Handle checkout process
     */
    const handleCheckout = async () => {
      try {
        isProcessing.value = true
        errorMessage.value = ''

        const response = await checkoutAPI(cartItems.value)

        if (response.success) {
          localStorage.setItem('lastOrderId', response.orderId)

          clearCart()

          router.push('/payment')
        } else {
          throw new Error('Checkout failed')
        }
      } catch (error) {
        if (error instanceof Error) {
          errorMessage.value = `خطا در ثبت سفارش: ${error.message}`
        } else {
          errorMessage.value = 'خطا در ثبت سفارش. لطفا دوباره امتحان کنید.'
        }
      } finally {
        isProcessing.value = false
      }
    }

    const checkout = createThrottledFunction(handleCheckout)

    return {
      cartItems,
      totalCost,
      isEmpty,
      isProcessing,
      errorMessage,

      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      checkout,

      formatPrice,
      toPersianDigits,
      ArrowRightIcon,
    }
  },
})
</script>

<style>
@import './Cart.css';
</style>
