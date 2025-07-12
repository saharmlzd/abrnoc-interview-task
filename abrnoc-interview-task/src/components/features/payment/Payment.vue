<template>
  <div class="payment-page">
    <div class="success-message">
      <h2>پرداخت موفق</h2>
      <p>پرداخت شما با موفقیت انجام شد!</p>
      <p>سفارش شما ثبت شده است.</p>
      <button @click="goToHome" class="home-button">بازگشت به صفحه اصلی</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../../../hooks/useCart'
import './Payment.css'

export default defineComponent({
  name: 'PaymentPage',
  setup() {
    const router = useRouter()
    const { clearCart } = useCart()

    clearCart()

    const goToHome = () => {
      router.push('/')
    }

    return {
      goToHome,
    }
  },
})
</script>
