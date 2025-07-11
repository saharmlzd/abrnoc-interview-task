import { computed } from 'vue'
import { useStore } from 'vuex'
import { ActionTypes } from '../store'
import { findCartItem, calculateTotalCost, calculateCartItemCount } from '../utils/cart'
import type { CartProduct, Product } from '../types/cart-store'

export const useCart = () => {
  const store = useStore()

  const cart = computed(() => store.state.cart)
  const cartItemCount = computed(() => calculateCartItemCount(cart.value))
  const totalCost = computed(() => calculateTotalCost(cart.value))

  const addToCart = (product: Product) => {
    store.dispatch(ActionTypes.ADD_TO_CART, {
      productId: product.id,
      quantity: 1,
    })
  }

  const increaseQuantity = (productId: string) => {
    store.dispatch(ActionTypes.INCREASE_QUANTITY, productId)
  }

  const decreaseQuantity = (productId: string) => {
    store.dispatch(ActionTypes.DECREASE_QUANTITY, productId)
  }

  const removeFromCart = (productId: string) => {
    store.dispatch(ActionTypes.REMOVE_FROM_CART, productId)
  }

  const findCartItemById = (productId: string) => {
    return findCartItem(cart.value, productId)
  }

  const clearCart = () => {
    cart.value.forEach((item: CartProduct) => {
      store.dispatch(ActionTypes.REMOVE_FROM_CART, item.id)
    })
  }

  return {
    cart,
    cartItemCount,
    totalCost,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    findCartItemById,
    clearCart,
  }
} 