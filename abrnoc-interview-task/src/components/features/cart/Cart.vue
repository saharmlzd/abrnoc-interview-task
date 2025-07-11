<template>
  <div class="cart">
    <div v-if="cartItems.length === 0" class="cart__empty">
      <p>سبد خرید شما خالی است</p>
    </div>
    <div v-else class="cart__items">
      <ProductCard
        v-for="item in cartItems"
        :key="item.id"
        :product="item"
        :showRemove="true"
        @increase-quantity="increaseQuantity"
        @decrease-quantity="decreaseQuantity"
        @remove="removeFromCart"
      />
      <div class="cart__summary">
        <div class="cart__total">
          <span class="cart__total-label">مجموع کل:</span>
          <span class="cart__total-value">{{ formatPrice(totalCost) }}</span>
        </div>
        <button @click="checkout" class="cart__checkout-btn" type="button">تکمیل خرید</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from '../../features/products/ProductCard.vue'
import { useCart } from '../../../hooks/useCart'
import { useThrottle } from '../../../hooks/useThrottle'
import { formatPrice } from '../../../utils/formatters'
import './Cart.css'

export default defineComponent({
  name: 'ShoppingCart',
  components: {
    ProductCard,
  },
  setup() {
    const { 
      cart: cartItems, 
      totalCost, 
      increaseQuantity, 
      decreaseQuantity, 
      removeFromCart, 
      clearCart 
    } = useCart()

    const { createThrottledFunction } = useThrottle(2000) // 2 second throttle

    const handleCheckout = () => {
      alert('سفارش شما با موفقیت ثبت شد!')
      clearCart()
    }

    const checkout = createThrottledFunction(handleCheckout)

    return { 
      cartItems, 
      totalCost, 
      formatPrice, 
      increaseQuantity, 
      decreaseQuantity, 
      removeFromCart, 
      checkout 
    }
  },
})
</script>
