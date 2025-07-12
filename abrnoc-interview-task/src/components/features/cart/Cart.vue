<template>
  <div class="cart-page">
    <div class="cart-container">
      <EmptyCart v-if="cartItems.length === 0" />

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../products/ProductCard.vue'
import ActionButtons from '../../common/product-card/ActionButtons.vue'
import EmptyCart from './EmptyCart.vue'
import SummaryBar from './SummaryBar.vue'
import { useCart } from '../../../hooks/useCart'
import { useThrottle } from '../../../hooks/useThrottle'
import { formatPrice, toPersianDigits } from '../../../utils/formatters'
import './Cart.css'
import { ArrowRightIcon } from '../../../assets'
import { checkout as checkoutAPI } from '../../../api/cart'

export default defineComponent({
  name: 'ShoppingCart',
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
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
    } = useCart()
    const { createThrottledFunction } = useThrottle(2000)

    const handleCheckout = async () => {
      try {
        isProcessing.value = true;
        errorMessage.value = '';
        
        const response = await checkoutAPI(cartItems.value);
        
        if (response.success) {
          localStorage.setItem('lastOrderId', response.orderId);
          
          clearCart();
          
          router.push('/payment');
        } else {
          throw new Error('Checkout failed');
        }
      } catch (error) {
        if (error instanceof Error) {
          errorMessage.value = `خطا در ثبت سفارش: ${error.message}`;
        } else {
          errorMessage.value = 'خطا در ثبت سفارش. لطفا دوباره امتحان کنید.';
        }
      } finally {
        isProcessing.value = false;
      }
    }

    const checkout = createThrottledFunction(handleCheckout)

    return {
      cartItems,
      totalCost,
      formatPrice,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      checkout,
      toPersianDigits,
      ArrowRightIcon,
      isProcessing,
      errorMessage,
    }
  },
})
</script>

<style>
.error-message {
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  text-align: center;
  font-weight: 500;
  border: 1px solid rgba(220, 38, 38, 0.2);
}
</style>
