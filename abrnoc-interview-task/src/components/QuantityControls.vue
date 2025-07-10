<template>
  <div class="quantity-controls">
    <div class="quantity-buttons">
      <button 
        @click="$emit('decrease')"
        class="quantity-btn quantity-btn--decrease"
        type="button"
        :disabled="quantity <= 0"
      >
        -
      </button>
      <span class="quantity-value">{{ quantity }}</span>
      <button 
        @click="$emit('increase')"
        class="quantity-btn quantity-btn--increase"
        type="button"
        :disabled="quantity >= maxQuantity"
      >
        +
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import './QuantityControls.css'

export default defineComponent({
  name: 'QuantityControls',
  props: {
    quantity: {
      type: Number,
      required: true,
    },
    maxQuantity: {
      type: Number,
      required: true,
    },
  },
  emits: ['increase', 'decrease'],
})
</script> 