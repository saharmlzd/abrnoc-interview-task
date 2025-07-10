<template>
  <div class="cart-item">
    <div class="cart-item__info">
      <h3 class="cart-item__title">{{ item.name }}</h3>
      <div class="cart-item__price">
        <span class="cart-item__price-label">قیمت:</span>
        <span class="cart-item__price-value">{{ formatPrice(item.price) }}</span>
      </div>
    </div>

    <div class="cart-item__controls">
      <div class="cart-quantity-controls">
        <button
          @click="$emit('decrease', item.id)"
          class="cart-quantity-btn cart-quantity-btn--decrease"
          type="button"
          :disabled="item.quantity <= 1"
        >
          -
        </button>
        <span class="cart-quantity">{{ item.quantity }}</span>
        <button
          @click="$emit('increase', item.id)"
          class="cart-quantity-btn cart-quantity-btn--increase"
          type="button"
        >
          +
        </button>
      </div>

      <button @click="$emit('remove', item.id)" class="cart-remove-btn" type="button">حذف</button>
    </div>

    <div class="cart-item__total">
      <span class="cart-item__total-label">مجموع:</span>
      <span class="cart-item__total-value">{{ formatPrice(item.price * item.quantity) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { CartProduct } from '../types/cart-store'
import './CartItem.css'

export default defineComponent({
  name: 'CartItem',
  props: {
    item: {
      type: Object as PropType<CartProduct>,
      required: true,
    },
  },
  emits: ['increase', 'decrease', 'remove'],
  setup() {
    const formatPrice = (price: number) => {
      return price.toLocaleString('fa-IR')
    }

    return { formatPrice }
  },
})
</script>
