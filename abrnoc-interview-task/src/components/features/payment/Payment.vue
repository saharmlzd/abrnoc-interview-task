<template>
  <div class="payment-page">
    <div class="success-message">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <p v-if="orderId">{{ orderIdMessage }}: {{ orderId }}</p>
      <button @click="goToHome" class="home-button">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../../../hooks/useCart'

export default defineComponent({
  name: 'PaymentPage',
  props: {
    title: {
      type: String as () => string,
      default: 'پرداخت موفق',
    },
    message: {
      type: String as () => string,
      default: 'پرداخت شما با موفقیت انجام شد!',
    },
    buttonText: {
      type: String as () => string,
      default: 'بازگشت به صفحه اصلی',
    },
    orderIdMessage: {
      type: String as () => string,
      default: 'شماره سفارش',
    },
    redirectDelay: {
      type: Number as () => number,
      default: 0,
    },
  },
  emits: ['payment-complete', 'navigate-home'],
  setup(props, { emit }) {
    const router = useRouter()
    const { clearCart } = useCart()
    const orderId = ref<string | null>(null)

    onMounted(() => {
      clearCart()

      orderId.value = localStorage.getItem('lastOrderId')
      emit('payment-complete', orderId.value)

      if (props.redirectDelay > 0) {
        setTimeout(() => {
          router.push('/')
        }, props.redirectDelay)
      }
    })

    const goToHome = (): void => {
      emit('navigate-home')
      router.push('/')
    }

    return {
      goToHome,
      orderId,
    }
  },
})
</script>

<style>
@import './Payment.css';
</style>
