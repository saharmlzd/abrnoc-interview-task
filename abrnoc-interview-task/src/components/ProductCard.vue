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
      :max-quantity="product.quantity"
      @increase="increaseQuantity"
      @decrease="decreaseQuantity"
    />
    
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
import type { Product } from '../types/cart-store'
import QuantityControls from './QuantityControls.vue'

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
  },
  setup(props, { emit }) {
    const store = useStore()
    
    const formattedPrice = computed(() => {
      return props.product.price.toLocaleString('fa-IR');  
    });

    const cartItem = computed(() => {
      return store.state.cart.find((item: any) => item.id === props.product.id)
    });

    const addToCart = () => {
      if (props.product.quantity > 0) {
        emit('add-to-cart', props.product);
      }
    };

    const increaseQuantity = () => {
      if (cartItem.value && cartItem.value.cartQuantity < props.product.quantity) {
        emit('increase-quantity', props.product.id);
      }
    };

    const decreaseQuantity = () => {
      emit('decrease-quantity', props.product.id);
    };

    return { 
      formattedPrice, 
      addToCart, 
      cartItem,
      increaseQuantity,
      decreaseQuantity
    };
  }
})
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 320px;
  background: var(--color-bg-card);
  padding: var(--spacing-lg) var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 16px rgba(44, 62, 80, 0.08);
  box-sizing: border-box;
  transition: transform 0.2s, box-shadow 0.2s;
  height: fit-content;
  direction: rtl;
  text-align: center;
  margin: 0 auto;
}

.product-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 24px rgba(44, 62, 80, 0.12);
}

.product-card__info {
  width: 100%;
  margin-bottom: var(--spacing-md);
}

.product-card__title {
  font-size: 1.4rem;
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-xs);
  color: var(--color-primary);
  text-align: center;
}

.product-card__price {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2em;
  margin-bottom: var(--spacing-md);
}

.product-card__price-label {
  font-size: 1rem;
  color: #7c6f57;
}

.product-card__price-value {
  font-size: 1.2rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
}

.product-card__button {
  width: 100%;
  padding: 0.7em 0;
  background: var(--color-accent);
  color: var(--color-button-text);
  border: none;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background 0.2s;
  margin-top: auto;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
}

.product-card__button:hover {
  background: var(--color-accent-hover);
}

.product-card__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #ccc;
}

.product-card__stock {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-xs);
}

.product-card__stock-label {
  font-size: 0.9rem;
  color: #7c6f57;
}

.product-card__stock-value {
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
}

@media (max-width: 480px) {
  .product-card {
    max-width: 100%;
    padding: var(--spacing-md) var(--spacing-xs);
  }
}
</style>
