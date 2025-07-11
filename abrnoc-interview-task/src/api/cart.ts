import apiRequest from './index'
import type { CartProduct } from '../types/cart-store'

export const syncCart = async (cartItems: CartProduct[]): Promise<boolean> => {
  return await apiRequest('/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItems),
  })
}

export const getCart = async (): Promise<CartProduct[]> => {
  return await apiRequest('/cart')
}

export const clearCart = async (): Promise<boolean> => {
  return await apiRequest('/cart', {
    method: 'DELETE',
  })
}
