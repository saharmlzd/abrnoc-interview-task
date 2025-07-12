<template>
  <div class="product-card-buttons">
    <div v-if="cartItem" class="product-card-buttons__quantity-controls">
      <QuantityControls
        :quantity="cartItem.cartQuantity"
        :max-quantity="cartItem.quantity"
        @increase="$emit('increase-quantity')"
        @decrease="$emit('decrease-quantity')"
      />
    </div>

    <div class="product-card-buttons__buttons">
      <button
        v-if="!cartItem && !showRemove"
        @click="$emit('add-to-cart')"
        class="product-card-buttons__button product-card-buttons__button--add"
        type="button"
        :disabled="!isInStock"
      >
        <span>
          {{ isInStock ? 'افزودن به سبد خرید' : 'ناموجود' }}
        </span>
      </button>

      <button
        v-if="showRemove"
        @click="$emit('remove-from-cart')"
        class="product-card-buttons__button product-card-buttons__button--remove"
        type="button"
      >
        <svg class="product-card-buttons__button-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
        <span>حذف از سبد</span>
      </button>

      <button
        v-if="showRemoveFromList"
        @click="$emit('remove-from-list')"
        class="product-card-buttons__button product-card-buttons__button--delete"
        type="button"
      >
        <svg class="product-card-buttons__button-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
        <span>حذف از لیست</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import QuantityControls from './QuantityControls.vue'
import './ProductCardButtons.css'

export default defineComponent({
  name: 'ProductCardButtons',
  components: {
    QuantityControls,
  },
  props: {
    cartItem: {
      type: Object,
      default: null,
    },
    showRemove: {
      type: Boolean,
      default: false,
    },
    showRemoveFromList: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  emits: [
    'add-to-cart',
    'remove-from-cart',
    'remove-from-list',
    'increase-quantity',
    'decrease-quantity',
  ],
  setup(props) {
    const isInStock = computed(() => props.quantity > 0)

    return {
      isInStock,
    }
  },
})
</script>
