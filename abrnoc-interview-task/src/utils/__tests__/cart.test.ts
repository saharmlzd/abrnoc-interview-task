import { findCartItem, calculateTotalCost, calculateCartItemCount, isCartEmpty } from '../cart'
import type { CartProduct } from '../../types/cart-store'

describe('cart utils', () => {
  const cart: CartProduct[] = [
    { id: '1', name: 'A', price: 100, quantity: 10, cartQuantity: 2 },
    { id: '2', name: 'B', price: 200, quantity: 5, cartQuantity: 1 },
  ]

  test('findCartItem returns the correct item', () => {
    expect(findCartItem(cart, '1')).toEqual(cart[0])
    expect(findCartItem(cart, '2')).toEqual(cart[1])
    expect(findCartItem(cart, '3')).toBeUndefined()
  })

  test('calculateTotalCost sums up all items', () => {
    expect(calculateTotalCost(cart)).toBe(100 * 2 + 200 * 1)
    expect(calculateTotalCost([])).toBe(0)
  })

  test('calculateCartItemCount sums up all quantities', () => {
    expect(calculateCartItemCount(cart)).toBe(3)
    expect(calculateCartItemCount([])).toBe(0)
  })

  test('isCartEmpty returns true only for empty cart', () => {
    expect(isCartEmpty([])).toBe(true)
    expect(isCartEmpty(cart)).toBe(false)
  })
}) 