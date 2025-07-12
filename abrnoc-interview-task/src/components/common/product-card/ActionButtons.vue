<template>
  <div class="action-buttons">
    <button
      v-if="showCheckout"
      class="checkout-btn"
      :disabled="!canCheckout"
      @click="$emit('checkout')"
    >
      پرداخت
    </button>
    <router-link v-if="showContinueShopping" to="/" class="continue-shopping-btn">
      ادامه خرید
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import './ActionButtons.css'

export default defineComponent({
  name: 'ActionButtons',
  props: {
    showCheckout: {
      type: Boolean,
      default: false,
    },
    showContinueShopping: {
      type: Boolean,
      default: false,
    },
    canCheckout: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['checkout'],
})
</script>
