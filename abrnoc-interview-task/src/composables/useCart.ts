import { computed } from 'vue'
import { useStore } from 'vuex'
import { ActionTypes, MutationTypes } from '../store'
import { findCartItem, calculateTotalCost, calculateCartItemCount } from '../utils/cart'
import type { Product } from '../types/cart-store'

/**
 * Hook for cart operations
 * @returns Cart-related state and methods
 */
export const useCart = () => {
  const store = useStore()

  const cart = computed(() => store.state.cart)
  const cartItemCount = computed(() => calculateCartItemCount(cart.value))
  const totalCost = computed(() => calculateTotalCost(cart.value))
  const isEmpty = computed(() => cart.value.length === 0)

  /**
   * Add a product to the cart
   * @param product - The product to add
   */
  const addToCart = (product: Product) => {
    store.dispatch(ActionTypes.ADD_TO_CART, {
      productId: product.id,
      quantity: 1,
    })
  }

  /**
   * Increase the quantity of a product in the cart
   * @param productId - ID of the product
   */
  const increaseQuantity = (productId: string) => {
    store.dispatch(ActionTypes.INCREASE_QUANTITY, productId)
  }

  /**
   * Decrease the quantity of a product in the cart
   * @param productId - ID of the product
   */
  const decreaseQuantity = (productId: string) => {
    store.dispatch(ActionTypes.DECREASE_QUANTITY, productId)
  }

  /**
   * Remove a product from the cart
   * @param productId - ID of the product to remove
   */
  const removeFromCart = (productId: string) => {
    store.dispatch(ActionTypes.REMOVE_FROM_CART, productId)
  }

  /**
   * Find a cart item by product ID
   * @param productId - ID of the product to find
   * @returns The cart item if found, otherwise null
   */
  const findCartItemById = (productId: string) => {
    return findCartItem(cart.value, productId)
  }

  /**
   * Clear the entire cart
   */
  const clearCart = () => {
    store.commit(MutationTypes.CLEAR_CART)
  }

  return {
    cart,
    cartItemCount,
    totalCost,
    isEmpty,

    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    findCartItemById,
    clearCart,
  }
}
