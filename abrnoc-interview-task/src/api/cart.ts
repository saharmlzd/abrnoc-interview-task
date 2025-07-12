import apiRequest from './index'
import type { CartProduct } from '../types/cart-store'

export const syncCart = async (cartItems: CartProduct[]): Promise<boolean> => {
  try {
    return await apiRequest('/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during cart sync'
    throw new Error(`Failed to sync cart: ${errorMessage}`)
  }
}

export const getCart = async (): Promise<CartProduct[]> => {
  try {
    return await apiRequest('/cart')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error fetching cart'
    throw new Error(`Failed to get cart: ${errorMessage}`)
  }
}

export const clearCart = async (): Promise<boolean> => {
  try {
    return await apiRequest('/cart', {
      method: 'DELETE',
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error clearing cart'
    throw new Error(`Failed to clear cart: ${errorMessage}`)
  }
}

export const checkout = async (
  cartItems: CartProduct[]
): Promise<{ success: boolean; orderId: string }> => {
  try {
    await apiRequest('/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    })

    const orderId = `ord-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    return {
      success: true,
      orderId,
    }
  } catch (error) {
    const errorDetails = error instanceof Error ? error.message : String(error)
    throw new Error(`Checkout failed: ${errorDetails}`)
  }
}
