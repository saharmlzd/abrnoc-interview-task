<template>
  <div class="product-card">
    <!-- Header Section -->
    <div class="product-card__header">
      <div class="product-card__title-section">
        <h3 class="product-card__title">{{ product.name }}</h3>
      </div>

      <!-- Stock Status -->
      <div class="product-card__stock-status" :class="{ 'out-of-stock': product.quantity <= 0 }">
        <div class="product-card__stock-indicator"></div>
        <span class="product-card__stock-text">
          {{ product.quantity > 0 ? 'موجود' : 'ناموجود' }}
        </span>
      </div>
    </div>

    <!-- Price Section -->
    <div class="product-card__price-section">
      <div class="product-card__price-header">
        <h4 class="product-card__price-title">قیمت محصول</h4>
        <div class="product-card__quantity-info">
          {{
            product.quantity > 0
              ? `${toPersianDigits(product.quantity)} عدد موجود`
              : 'موجودی تمام شده'
          }}
        </div>
      </div>

      <div class="product-card__price-display">
        <span class="product-card__price-value">{{ formattedPrice }}</span>
        <span class="product-card__price-currency">تومان</span>
      </div>
    </div>

    <!-- Action Section -->
    <div class="product-card__action-section">
      <!-- Quantity Controls -->
      <div v-if="cartItem" class="product-card__quantity-controls">
        <QuantityControls
          :quantity="cartItem.cartQuantity"
          :max-quantity="cartItem.quantity"
          @increase="increaseQuantity"
          @decrease="decreaseQuantity"
        />
      </div>

      <!-- Action Buttons -->
      <div class="product-card__buttons">
        <!-- Add to Cart Button -->
        <button
          v-if="!cartItem && !showRemove"
          @click="addToCart"
          class="product-card__button product-card__button--add"
          type="button"
          :disabled="product.quantity <= 0"
        >
          <span>
            {{ product.quantity > 0 ? 'افزودن به سبد خرید' : 'ناموجود' }}
          </span>
        </button>

        <!-- Remove from Cart Button -->
        <button
          v-if="showRemove"
          @click="removeFromCart"
          class="product-card__button product-card__button--remove"
          type="button"
        >
          <svg class="product-card__button-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            />
          </svg>
          <span>حذف از سبد</span>
        </button>

        <!-- Remove from List Button -->
        <button
          v-if="showRemoveFromList"
          @click="removeFromList"
          class="product-card__button product-card__button--delete"
          type="button"
        >
          <svg class="product-card__button-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            />
          </svg>
          <span>حذف از لیست</span>
        </button>
      </div>
    </div>
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
import { toPersianDigits } from '../../../utils/formatters'

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
      toPersianDigits,
    }
  },
})
</script>
