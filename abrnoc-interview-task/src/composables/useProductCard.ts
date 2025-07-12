import { computed } from 'vue'
import { formatPrice } from '../utils/formatters'
import { canAddToCart, canIncreaseQuantity } from '../utils/validation'
import type { Product, CartProduct } from '../types/cart-store'

export const useProductCard = (
  product: Product,
  findCartItemById: (id: string) => CartProduct | undefined
) => {
  const formattedPrice = computed(() => {
    return formatPrice(product.price)
  })

  const cartItem = computed(() => {
    return findCartItemById(product.id)
  })

  const canAdd = computed(() => {
    return canAddToCart(product)
  })

  const canIncrease = computed(() => {
    if (!cartItem.value) return false
    return canIncreaseQuantity(cartItem.value, product.quantity)
  })

  return {
    formattedPrice,
    cartItem,
    canAdd,
    canIncrease,
  }
}
