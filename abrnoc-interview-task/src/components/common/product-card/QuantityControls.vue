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
      <span class="quantity-value">{{ toPersianDigits(quantity) }}</span>
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
