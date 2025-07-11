<template>
  <div class="payment-page">
    <div class="success-message">
      <h2>پرداخت موفق</h2>
      <p>پرداخت شما با موفقیت انجام شد!</p>
      <p>سفارش شما ثبت شده است.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCart } from '../../../hooks/useCart'
import { formatPrice } from '../../../utils/formatters'

export default defineComponent({
  name: 'Payment',
  setup() {
    const { clearCart } = useCart()
    
    // Automatically clear cart when component mounts
    clearCart()
    
    return {}
  }
})
</script> 