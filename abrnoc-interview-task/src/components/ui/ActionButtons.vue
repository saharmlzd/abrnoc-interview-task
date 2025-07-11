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
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .action-buttons {
    flex-direction: row;
    gap: 0.75rem;
    justify-content: center;
    width: 100%;
  }
}
.checkout-btn {
  background: #059669;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1.2rem 2.2rem;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  min-width: 180px;
  box-shadow: 0 2px 8px rgba(5,150,105,0.08);
}

@media (max-width: 768px) {
  .checkout-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    min-width: 120px;
    border-radius: 6px;
  }
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
  padding: 1rem 1.5rem;
}

@media (max-width: 768px) {
  .continue-shopping-btn {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 600;
    min-width: 100px;
    border-radius: 6px;
  }
}
.continue-shopping-btn:hover {
  background: #3b82f6;
  color: white;
}
</style> 