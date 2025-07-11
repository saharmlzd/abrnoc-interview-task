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
    <router-link
      v-if="showContinueShopping"
      to="/"
      class="continue-shopping-btn"
    >
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
  },
  emits: ['checkout'],
})
</script>

<style scoped>
.action-buttons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
@media (max-width: 600px) {
  .action-buttons {
    flex-direction: column;
  }
}
.checkout-btn {
  background: #059669;
  color: white;
  border: none;
  border-radius: 8px;
    padding: 0.85rem 1.2rem;

  padding: 1.2rem 2.2rem;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  min-width: 180px;
  box-shadow: 0 2px 8px rgba(5,150,105,0.08);
}
.checkout-btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}
.continue-shopping-btn {
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  min-width: 110px;
}
.continue-shopping-btn:hover {
  background: #3b82f6;
  color: white;
}
</style> 