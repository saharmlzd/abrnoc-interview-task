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

export default defineComponent({
  name: 'PaymentPage',
  setup() {
    const router = useRouter()
    const { clearCart } = useCart()

    // Automatically clear cart when component mounts
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

<style scoped>
.payment-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 2rem;
}

.success-message {
  text-align: center;
  background: #f0f9ff;
  padding: 3rem;
  border-radius: 12px;
  border: 1px solid #bae6fd;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

.success-message h2 {
  color: #059669;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.success-message p {
  color: #374151;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.home-button {
  background: #059669;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.2s,
    transform 0.2s;
  margin-top: 1.5rem;
}

.home-button:hover {
  background: #047857;
  transform: translateY(-2px);
}

.home-button:focus {
  outline: 2px solid #059669;
  outline-offset: 2px;
}

@media (max-width: 480px) {
  .success-message {
    padding: 2rem 1rem;
  }

  .success-message h2 {
    font-size: 1.5rem;
  }

  .success-message p {
    font-size: 1rem;
  }
}
</style>
