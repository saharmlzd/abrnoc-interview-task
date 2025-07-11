import type { Product, CartProduct } from '../types/cart-store'

/**
 * Checks if a product is available for purchase
 * @param product - The product to check
 * @returns True if product is available
 */
export const isProductAvailable = (product: Product): boolean => {
  return product.quantity > 0
}

/**
 * Checks if a product can be added to cart
 * @param product - The product to check
 * @returns True if product can be added
 */
export const canAddToCart = (product: Product): boolean => {
  return isProductAvailable(product)
}

/**
 * Checks if quantity can be increased
 * @param cartItem - The cart item to check
 * @param maxQuantity - Maximum allowed quantity
 * @returns True if quantity can be increased
 */
export const canIncreaseQuantity = (cartItem: CartProduct, maxQuantity: number): boolean => {
  return cartItem.cartQuantity < maxQuantity
}

/**
 * Checks if quantity can be decreased
 * @param cartItem - The cart item to check
 * @returns True if quantity can be decreased
 */
export const canDecreaseQuantity = (cartItem: CartProduct): boolean => {
  return cartItem.cartQuantity > 1
}
