import type { CartProduct, Product } from '../types/cart-store'

/**
 * Finds a cart item by product ID
 * @param cart - Array of cart items
 * @param productId - The product ID to find
 * @returns The cart item or undefined if not found
 */
export const findCartItem = (cart: CartProduct[], productId: string): CartProduct | undefined => {
  return cart.find((item) => item.id === productId)
}

/**
 * Calculates the total cost of cart items
 * @param cart - Array of cart items
 * @returns Total cost
 */
export const calculateTotalCost = (cart: CartProduct[]): number => {
  return cart.reduce((total, item) => total + item.price * item.cartQuantity, 0)
}

/**
 * Calculates the total number of items in cart
 * @param cart - Array of cart items
 * @returns Total item count
 */
export const calculateCartItemCount = (cart: CartProduct[]): number => {
  return cart.reduce((count, item) => count + item.cartQuantity, 0)
}

/**
 * Checks if cart is empty
 * @param cart - Array of cart items
 * @returns True if cart is empty
 */
export const isCartEmpty = (cart: CartProduct[]): boolean => {
  return cart.length === 0
} 