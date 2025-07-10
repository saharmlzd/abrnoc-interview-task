<template>
  <div class="cart">
    <div v-if="cartItems.length === 0" class="cart__empty">
      <p>سبد خرید شما خالی است</p>
    </div>
    <div v-else class="cart__items">
      <CartItem
        v-for="item in cartItems"
        :key="item.id"
        :item="item"
        @increase="increaseQuantity"
        @decrease="decreaseQuantity"
        @remove="removeFromCart"
      />
      
      <div class="cart__summary">
        <div class="cart__total">
          <span class="cart__total-label">مجموع کل:</span>
          <span class="cart__total-value">{{ formatPrice(totalCost) }}</span>
        </div>
        <button 
          @click="checkout"
          class="cart__checkout-btn"
          type="button"
        >
          تکمیل خرید
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { ActionTypes } from '../store'
import CartItem from './CartItem.vue'

export default defineComponent({
  name: 'Cart',
  components: {
    CartItem,
  },
  setup() {
    const store = useStore()

    const cartItems = computed(() => store.state.cart)
    const totalCost = computed(() => store.getters.totalCost)

    const formatPrice = (price: number) => {
      return price.toLocaleString('fa-IR')
    }

    const increaseQuantity = (productId: number) => {
      store.dispatch(ActionTypes.INCREASE_QUANTITY, productId)
    }

    const decreaseQuantity = (productId: number) => {
      store.dispatch(ActionTypes.DECREASE_QUANTITY, productId)
    }

    const removeFromCart = (productId: number) => {
      store.dispatch(ActionTypes.REMOVE_FROM_CART, productId)
    }

    const checkout = () => {
      alert('سفارش شما با موفقیت ثبت شد!')
      // Clear cart after checkout
      cartItems.value.forEach((item: any) => {
        store.dispatch(ActionTypes.REMOVE_FROM_CART, item.id)
      })
    }

    return {
      cartItems,
      totalCost,
      formatPrice,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      checkout
    }
  }
})
</script>

<style scoped>
.cart {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  direction: rtl;
  text-align: right;
}

.cart__empty {
  text-align: center;
  padding: var(--spacing-xl);
  color: #7c6f57;
  font-size: 1.2rem;
}

.cart__items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.cart__summary {
  background: var(--color-bg-card);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: 0 4px 16px rgba(44, 62, 80, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.cart__total {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2em;
}

.cart__total-label {
  font-size: 1rem;
  color: #7c6f57;
}

.cart__total-value {
  font-size: 1.5rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
}

.cart__checkout-btn {
  background: var(--color-accent);
  color: var(--color-button-text);
  border: none;
  border-radius: 999px;
  padding: 0.8em 2em;
  font-size: 1.1rem;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background 0.2s;
}

.cart__checkout-btn:hover {
  background: var(--color-accent-hover);
}

@media (max-width: 768px) {
  .cart__summary {
    flex-direction: column;
    align-items: stretch;
  }
}
</style> 