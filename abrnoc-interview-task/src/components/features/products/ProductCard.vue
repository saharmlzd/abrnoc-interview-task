<template>
  <div class="product-card">
    <div class="product-card__header">
      <div class="product-card__title-section">
        <h3 class="product-card__title">{{ product.name }}</h3>
      </div>

      <StockStatus :quantity="product.quantity" />
    </div>

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

    <div class="product-card__action-section">
      <ProductCardButtons
        :cart-item="cartItem"
        :show-remove="showRemove"
        :show-remove-from-list="showRemoveFromList"
        :quantity="product.quantity"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
        @remove-from-list="removeFromList"
        @increase-quantity="increaseQuantity"
        @decrease-quantity="decreaseQuantity"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import StockStatus from '../../common/product-card/StockStatus.vue'
import ProductCardButtons from '../../common/product-card/ProductCardButtons.vue'
import { useCart } from '../../../hooks/useCart'
import { useProductCard } from '../../../hooks/useProductCard'
import { useThrottle } from '../../../hooks/useThrottle'
import type { Product } from '../../../types/cart-store'
import './ProductCard.css'
import { toPersianDigits } from '../../../utils/formatters'

export default defineComponent({
  name: 'ProductCard',
  components: {
    StockStatus,
    ProductCardButtons,
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
    const { createThrottledFunction } = useThrottle(500)

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
