<template>
  <div class="product-card">
    <div class="product-card__info">
      <h3 class="product-card__title">{{ product.name }}</h3>
      <div class="product-card__price">
        <span class="product-card__price-label">قیمت:</span>
        <span class="product-card__price-value">{{ formattedPrice }}</span>
      </div>
      <div class="product-card__stock">
        <span class="product-card__stock-label">موجودی:</span>
        <span class="product-card__stock-value">{{ product.quantity }}</span>
      </div>
    </div>

    <!-- Show quantity controls if item is in cart -->
    <QuantityControls
      v-if="cartItem"
      :quantity="cartItem.cartQuantity"
      :max-quantity="cartItem.quantity"
      @increase="increaseQuantity"
      @decrease="decreaseQuantity"
    />

    <!-- Show remove button if in cart and showRemove is true -->
    <button
      v-if="showRemove"
      @click="removeFromCart"
      class="cart-remove-btn"
      type="button"
    >
      حذف
    </button>

    <!-- Show add button if item is not in cart -->
    <button
      v-else
      @click="addToCart"
      class="product-card__button"
      type="button"
      :disabled="product.quantity <= 0"
    >
      {{ product.quantity > 0 ? 'افزودن به سبد خرید' : 'ناموجود' }}
    </button>

    <!-- Show remove from list button if showRemoveFromList is true -->
    <button
      v-if="showRemoveFromList"
      @click="removeFromList"
      class="product-card__remove-btn"
      type="button"
    >
      حذف از لیست
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import QuantityControls from '../../ui/QuantityControls.vue'
import { useCart } from '../../../hooks/useCart'
import { useProductCard } from '../../../hooks/useProductCard'
import { useThrottle } from '../../../hooks/useThrottle'
import type { Product } from '../../../types/cart-store'
import './ProductCard.css'

export default defineComponent({
  name: 'ProductCard',
  components: {
    QuantityControls,
  },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
    showRemove: {
      type: Boolean,
      default: false,
    },
    showRemoveFromList: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['add-to-cart', 'increase-quantity', 'decrease-quantity', 'remove', 'remove-from-list'],
  setup(props, { emit }) {
    const { findCartItemById } = useCart()
    const { formattedPrice, cartItem, canAdd, canIncrease } = useProductCard(
      props.product, 
      findCartItemById
    )
    const { createThrottledFunction } = useThrottle(500) // 500ms throttle

    const handleAddToCart = () => {
      if (canAdd.value) {
        emit('add-to-cart', props.product)
      }
    }

    const handleIncreaseQuantity = () => {
      if (canIncrease.value) {
        emit('increase-quantity', props.product.id)
      }
    }

    const handleDecreaseQuantity = () => {
      emit('decrease-quantity', props.product.id)
    }

    const handleRemoveFromCart = () => {
      emit('remove', props.product.id)
    }

    const handleRemoveFromList = () => {
      emit('remove-from-list', props.product.id)
    }

    const addToCart = createThrottledFunction(handleAddToCart)
    const increaseQuantity = createThrottledFunction(handleIncreaseQuantity)
    const decreaseQuantity = createThrottledFunction(handleDecreaseQuantity)
    const removeFromCart = createThrottledFunction(handleRemoveFromCart)
    const removeFromList = createThrottledFunction(handleRemoveFromList)

    return {
      formattedPrice,
      addToCart,
      cartItem,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      removeFromList,
    }
  },
})
</script>
