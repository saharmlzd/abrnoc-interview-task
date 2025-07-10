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
        <button @click="checkout" class="cart__checkout-btn" type="button">تکمیل خرید</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import CartItem from './CartItem.vue'
import { ActionTypes } from '../../../store'
import type { CartProduct } from '../../../types/cart-store'
import './Cart.css'


export default defineComponent({
  name: 'ShoppingCart',
  components: {
    CartItem,
  },
  setup() {
    const store = useStore()
    const cartItems = computed(() => store.state.cart)
    const totalCost = computed(() => store.getters.totalCost)
    const formatPrice = (price: number) => price.toLocaleString('fa-IR')
    const increaseQuantity = (productId: number) => 
      store.dispatch(ActionTypes.INCREASE_QUANTITY, productId)
    const decreaseQuantity = (productId: number) => 
      store.dispatch(ActionTypes.DECREASE_QUANTITY, productId)
    const removeFromCart = (productId: number) => 
      store.dispatch(ActionTypes.REMOVE_FROM_CART, productId)
    const checkout = () => {
      alert('سفارش شما با موفقیت ثبت شد!')
      cartItems.value.forEach((item: CartProduct) => {
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
  },
})
</script>
