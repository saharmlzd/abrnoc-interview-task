<template>
  <div class="action-buttons">
    <button
      v-if="showCheckout"
      class="checkout-btn"
      :disabled="!canCheckout || isProcessing"
      @click="$emit('checkout')"
    >
      <span v-if="!isProcessing">پرداخت</span>
      <span v-else class="loading-spinner"></span>
    </button>
    <router-link v-if="showContinueShopping" to="/" class="continue-shopping-btn">
      ادامه خرید
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
    isProcessing: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['checkout'],
})
</script>

<style>
@import './ActionButtons.css';
</style>
