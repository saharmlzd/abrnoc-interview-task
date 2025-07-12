<template>
  <div class="quantity-controls">
    <button
      @click="$emit('decrease')"
      class="quantity-btn quantity-btn--decrease"
      type="button"
      :disabled="quantity <= 0"
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
    <span class="quantity-value">{{ toPersianDigits(quantity) }}</span>
    <button
      @click="$emit('increase')"
      class="quantity-btn quantity-btn--increase"
      type="button"
      :disabled="quantity >= maxQuantity"
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { toPersianDigits } from '../../../utils/formatters'
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
  setup() {
    return { toPersianDigits }
  },
})
</script>
