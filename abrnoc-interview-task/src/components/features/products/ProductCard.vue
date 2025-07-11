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
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed } from 'vue'
import { useStore } from 'vuex'
import QuantityControls from '../../ui/QuantityControls.vue'
import type { CartProduct, Product } from '../../../types/cart-store'
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
  },
  emits: ['add-to-cart', 'increase-quantity', 'decrease-quantity', 'remove'],
  setup(props, { emit }) {
    const store = useStore()

    const formattedPrice = computed(() => {
      return props.product.price.toLocaleString('fa-IR')
    })

    const cartItem = computed(() => {
      return store.state.cart.find((item: CartProduct) => item.id === props.product.id)
    })

    const addToCart = () => {
      if (props.product.quantity > 0) {
        emit('add-to-cart', props.product)
      }
    }

    const increaseQuantity = () => {
      if (cartItem.value && cartItem.value.cartQuantity < props.product.quantity) {
        emit('increase-quantity', props.product.id)
      }
    }

    const decreaseQuantity = () => {
      emit('decrease-quantity', props.product.id)
    }

    const removeFromCart = () => {
      emit('remove', props.product.id)
    }

    return {
      formattedPrice,
      addToCart,
      cartItem,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
    }
  },
})
</script>
