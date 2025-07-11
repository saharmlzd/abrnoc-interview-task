import { 
  isProductAvailable, 
  canAddToCart, 
  canIncreaseQuantity, 
  canDecreaseQuantity 
} from '../validation'
import type { Product, CartProduct } from '../../types/cart-store'

describe('validation utils', () => {
  const product: Product = { id: '1', name: 'Test', price: 1000, quantity: 5 }
  const unavailableProduct: Product = { ...product, quantity: 0 }
  const cartItem: CartProduct = { ...product, cartQuantity: 2 }

  test('isProductAvailable returns true for available product', () => {
    expect(isProductAvailable(product)).toBe(true)
    expect(isProductAvailable(unavailableProduct)).toBe(false)
  })

  test('canAddToCart returns true only if product is available', () => {
    expect(canAddToCart(product)).toBe(true)
    expect(canAddToCart(unavailableProduct)).toBe(false)
  })

  test('canIncreaseQuantity returns true if cartQuantity < maxQuantity', () => {
    expect(canIncreaseQuantity(cartItem, 5)).toBe(true)
    expect(canIncreaseQuantity({ ...cartItem, cartQuantity: 5 }, 5)).toBe(false)
  })

  test('canDecreaseQuantity returns true if cartQuantity > 1', () => {
    expect(canDecreaseQuantity(cartItem)).toBe(true)
    expect(canDecreaseQuantity({ ...cartItem, cartQuantity: 1 })).toBe(false)
  })
}) 